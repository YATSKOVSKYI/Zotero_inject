#!/usr/bin/env python3
"""
Enrich BibTeX records with DOI and metadata from Crossref.

Usage:
  python crossref_enrich_bib.py "C:\\project\\referance\\Referances.bib" --mailto you@example.com
"""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import threading
import time
from collections import OrderedDict
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from difflib import SequenceMatcher
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable, Optional
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen


DOI_PATTERN = re.compile(r"10\.\d{4,9}/\S+", re.IGNORECASE)
BIBCHECK_PATTERN = re.compile(r"\[\s*BIBCHECK\s*:\s*([^\]]*)\]", re.IGNORECASE)


_emit_lock = threading.Lock()

def _emit_event(data: dict) -> None:
    """Print a newline-delimited JSON event to stdout for --json-events mode (thread-safe)."""
    with _emit_lock:
        print(json.dumps(data, ensure_ascii=False), flush=True)


@dataclass
class BibEntry:
    entry_type: str
    key: str
    fields: "OrderedDict[str, str]"


def normalize_whitespace(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def strip_outer_braces(value: str) -> str:
    value = value.strip()
    if value.startswith("{") and value.endswith("}"):
        return value[1:-1].strip()
    if value.startswith('"') and value.endswith('"'):
        return value[1:-1].strip()
    return value


def normalize_title(value: str) -> str:
    value = value.lower()
    value = value.replace("{", "").replace("}", "")
    value = re.sub(r"\\[a-zA-Z]+\*?(?:\[[^\]]*\])?(?:\{[^}]*\})?", " ", value)
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return normalize_whitespace(value)


def strip_bibcheck_marker(note: str) -> str:
    cleaned = BIBCHECK_PATTERN.sub("", note or "")
    return normalize_whitespace(cleaned).strip(" ;,")


def extract_bibcheck_tags(note: str) -> set[str]:
    match = BIBCHECK_PATTERN.search(note or "")
    if not match:
        return set()
    raw = match.group(1)
    return {x.strip() for x in raw.split(",") if x.strip()}


def update_problem_tags_in_note(entry: BibEntry, tags: set[str], enabled: bool) -> bool:
    current_note = entry.fields.get("note", "")
    base_note = strip_bibcheck_marker(current_note)
    if not enabled:
        new_note = base_note
    elif tags:
        marker = f"[BIBCHECK:{','.join(sorted(tags))}]"
        new_note = f"{base_note} {marker}".strip()
    else:
        new_note = base_note

    old_norm = normalize_whitespace(current_note)
    new_norm = normalize_whitespace(new_note)
    if old_norm == new_norm:
        return False

    if new_note:
        entry.fields["note"] = new_note
    elif "note" in entry.fields:
        del entry.fields["note"]
    return True


def extract_work_title(work: dict) -> str:
    title_arr = work.get("title") or []
    if title_arr:
        return normalize_whitespace(str(title_arr[0]))
    return ""


def clean_crossref_abstract(raw: str) -> str:
    if raw is None:
        return ""
    if not isinstance(raw, str):
        raw = str(raw)
    if not raw.strip():
        return ""
    text = html.unescape(raw)
    text = re.sub(r"</?(?:jats:)?p\b[^>]*>", " ", text, flags=re.IGNORECASE)
    text = re.sub(r"<[^>]+>", " ", text)
    text = normalize_whitespace(text)
    if text.lower() in {"none", "null", "n/a", "na"}:
        return ""
    return text


def title_similarity(entry: BibEntry, work: dict) -> Optional[float]:
    entry_title = normalize_title(strip_outer_braces(entry.fields.get("title", "")))
    work_title = normalize_title(extract_work_title(work))
    if not entry_title or not work_title:
        return None
    return SequenceMatcher(None, entry_title, work_title).ratio()


def normalize_doi(value: str) -> Optional[str]:
    if not value:
        return None
    value = value.strip()
    value = re.sub(r"^https?://(?:dx\.)?doi\.org/", "", value, flags=re.IGNORECASE)
    value = re.sub(r"^doi:\s*", "", value, flags=re.IGNORECASE)
    match = DOI_PATTERN.search(value)
    if not match:
        return None
    return match.group(0).rstrip(".,; ")


def parse_bibtex_entries(text: str) -> list[BibEntry]:
    entries: list[BibEntry] = []
    i = 0
    n = len(text)
    while i < n:
        at_pos = text.find("@", i)
        if at_pos == -1:
            break
        brace_pos = text.find("{", at_pos)
        if brace_pos == -1:
            break

        entry_type = text[at_pos + 1 : brace_pos].strip().lower()
        comma_pos = text.find(",", brace_pos)
        if comma_pos == -1:
            break
        key = text[brace_pos + 1 : comma_pos].strip()

        depth = 1
        j = comma_pos + 1
        in_quotes = False
        escape = False
        while j < n:
            ch = text[j]
            if in_quotes:
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == '"':
                    in_quotes = False
            else:
                if ch == '"':
                    in_quotes = True
                elif ch == "{":
                    depth += 1
                elif ch == "}":
                    depth -= 1
                    if depth == 0:
                        break
            j += 1
        body = text[comma_pos + 1 : j]
        fields = parse_fields(body)
        entries.append(BibEntry(entry_type=entry_type, key=key, fields=fields))
        i = j + 1
    return entries


def parse_fields(body: str) -> "OrderedDict[str, str]":
    fields: "OrderedDict[str, str]" = OrderedDict()
    i = 0
    n = len(body)

    while i < n:
        while i < n and body[i] in " \t\r\n,":
            i += 1
        if i >= n:
            break

        start_name = i
        while i < n and body[i] not in "=\r\n":
            i += 1
        name = body[start_name:i].strip().lower()
        if not name:
            break

        while i < n and body[i].isspace():
            i += 1
        if i >= n or body[i] != "=":
            break
        i += 1
        while i < n and body[i].isspace():
            i += 1
        if i >= n:
            break

        if body[i] == "{":
            depth = 1
            i += 1
            value_start = i
            while i < n and depth > 0:
                if body[i] == "{":
                    depth += 1
                elif body[i] == "}":
                    depth -= 1
                    if depth == 0:
                        break
                i += 1
            value = body[value_start:i]
            i += 1
        elif body[i] == '"':
            i += 1
            value_start = i
            escape = False
            while i < n:
                ch = body[i]
                if escape:
                    escape = False
                elif ch == "\\":
                    escape = True
                elif ch == '"':
                    break
                i += 1
            value = body[value_start:i]
            i += 1
        else:
            value_start = i
            while i < n and body[i] not in ",\r\n":
                i += 1
            value = body[value_start:i].strip()

        fields[name] = normalize_whitespace(value)

        while i < n and body[i] != ",":
            i += 1
        if i < n and body[i] == ",":
            i += 1
    return fields


def format_entry(entry: BibEntry) -> str:
    lines = [f"@{entry.entry_type}{{{entry.key},"]
    for field, value in entry.fields.items():
        lines.append(f"  {field:<9}= {{{value}}},")
    lines.append("}")
    return "\n".join(lines)


def build_bibtex(entries: Iterable[BibEntry]) -> str:
    return "\n\n".join(format_entry(e) for e in entries) + "\n"


def http_json(url: str, user_agent: str, timeout: float = 8.0) -> dict:
    req = Request(url, headers={"User-Agent": user_agent, "Accept": "application/json"})
    with urlopen(req, timeout=timeout) as resp:
        return json.loads(resp.read().decode("utf-8"))


def crossref_get_work_by_doi(
    doi: str,
    user_agent: str,
    mailto: str = "",
    retries: int = 1,
    timeout: float = 8.0,
) -> Optional[dict]:
    encoded = quote(doi, safe="")
    url = f"https://api.crossref.org/works/{encoded}"
    if mailto:
        url += f"?{urlencode({'mailto': mailto})}"
    for attempt in range(retries + 1):
        try:
            data = http_json(url, user_agent=user_agent, timeout=timeout)
            return data.get("message")
        except HTTPError as exc:
            if exc.code == 404:
                return None
            if attempt >= retries:
                raise
            time.sleep(0.5 * (attempt + 1))
        except URLError:
            if attempt >= retries:
                raise
            time.sleep(0.5 * (attempt + 1))
    return None


def crossref_search(
    entry: BibEntry,
    user_agent: str,
    mailto: str = "",
    rows: int = 5,
    retries: int = 1,
    timeout: float = 8.0,
    exclude_dois: Optional[set[str]] = None,
) -> Optional[dict]:
    title = strip_outer_braces(entry.fields.get("title", ""))
    if not title:
        return None

    author = entry.fields.get("author", "")
    author_head = author.split(" and ")[0] if author else ""
    year = entry.fields.get("year", "")
    journal = entry.fields.get("journal", "") or entry.fields.get("booktitle", "")
    query_text = normalize_whitespace(" ".join(x for x in [title, author_head, journal, year] if x))
    if not query_text:
        return None

    params = {
        "rows": str(rows),
        "query.bibliographic": query_text,
        "select": "DOI,title,author,container-title,published-print,published-online,issued,volume,issue,page,publisher,type,score",
    }
    if mailto:
        params["mailto"] = mailto
    url = f"https://api.crossref.org/works?{urlencode(params)}"

    for attempt in range(retries + 1):
        try:
            data = http_json(url, user_agent=user_agent, timeout=timeout)
            items = data.get("message", {}).get("items", [])
            return pick_best_candidate(entry, items, exclude_dois=exclude_dois)
        except (HTTPError, URLError):
            if attempt >= retries:
                raise
            time.sleep(0.5 * (attempt + 1))
    return None


def openalex_abstract_from_inverted_index(data: dict) -> str:
    if not isinstance(data, dict) or not data:
        return ""
    max_pos = -1
    for positions in data.values():
        if not isinstance(positions, list) or not positions:
            continue
        max_pos = max(max_pos, max(int(p) for p in positions if isinstance(p, int)))
    if max_pos < 0:
        return ""

    words = [""] * (max_pos + 1)
    for token, positions in data.items():
        if not isinstance(token, str) or not isinstance(positions, list):
            continue
        for p in positions:
            if isinstance(p, int) and 0 <= p <= max_pos and not words[p]:
                words[p] = token
    text = " ".join(w for w in words if w)
    return normalize_whitespace(text)


def fetch_abstract_from_openalex(doi: str, user_agent: str, retries: int = 1, timeout: float = 8.0) -> str:
    params = {
        "filter": f"doi:https://doi.org/{doi}",
        "select": "abstract_inverted_index",
        "per-page": "1",
    }
    url = f"https://api.openalex.org/works?{urlencode(params)}"
    for attempt in range(retries + 1):
        try:
            data = http_json(url, user_agent=user_agent, timeout=timeout)
            results = data.get("results") or []
            if not results:
                return ""
            inv = results[0].get("abstract_inverted_index")
            return openalex_abstract_from_inverted_index(inv)
        except (HTTPError, URLError):
            if attempt >= retries:
                return ""
            time.sleep(0.5 * (attempt + 1))
    return ""


def fetch_abstract_from_semanticscholar(doi: str, user_agent: str, retries: int = 1, timeout: float = 8.0) -> str:
    encoded = quote(f"DOI:{doi}", safe="")
    url = f"https://api.semanticscholar.org/graph/v1/paper/{encoded}?fields=abstract"
    for attempt in range(retries + 1):
        try:
            data = http_json(url, user_agent=user_agent, timeout=timeout)
            raw = data.get("abstract", "")
            if not isinstance(raw, str):
                return ""
            out = normalize_whitespace(raw)
            if out.lower() in {"none", "null"}:
                return ""
            return out
        except HTTPError as exc:
            if exc.code == 404:
                return ""
            if attempt >= retries:
                return ""
            time.sleep(0.5 * (attempt + 1))
        except URLError:
            if attempt >= retries:
                return ""
            time.sleep(0.5 * (attempt + 1))
    return ""


class _MetaAbstractParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.candidates: dict[str, str] = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, Optional[str]]]) -> None:
        if tag.lower() != "meta":
            return
        attrs_dict = {k.lower(): (v or "") for k, v in attrs}
        key = (attrs_dict.get("name") or attrs_dict.get("property") or "").lower().strip()
        content = normalize_whitespace(html.unescape(attrs_dict.get("content", "")))
        if not key or not content:
            return
        self.candidates[key] = content


def fetch_abstract_from_doi_landing(doi: str, user_agent: str, retries: int = 1, timeout: float = 10.0) -> str:
    url = f"https://doi.org/{quote(doi, safe='')}"
    for attempt in range(retries + 1):
        try:
            req = Request(
                url,
                headers={
                    "User-Agent": user_agent,
                    "Accept": "text/html,application/xhtml+xml",
                },
            )
            with urlopen(req, timeout=timeout) as resp:
                raw = resp.read()
            html_text = raw.decode("utf-8", errors="ignore")
            parser = _MetaAbstractParser()
            parser.feed(html_text)

            priorities = [
                "citation_abstract",
                "dc.description",
                "description",
                "og:description",
                "twitter:description",
            ]
            for key in priorities:
                val = normalize_whitespace(parser.candidates.get(key, ""))
                if len(val) >= 80:
                    return val

            # JSON-LD fallback
            m = re.search(r'"description"\s*:\s*"([^"]{80,})"', html_text, flags=re.IGNORECASE)
            if m:
                return normalize_whitespace(html.unescape(m.group(1)))
            return ""
        except (HTTPError, URLError):
            if attempt >= retries:
                return ""
            time.sleep(0.6 * (attempt + 1))
    return ""


def add_fallback_abstract_to_work(
    work: dict,
    doi: str,
    user_agent: str,
    retries: int = 1,
    timeout: float = 8.0,
) -> dict:
    if clean_crossref_abstract(work.get("abstract", "")):
        return work
    if not doi:
        return work

    abstract = fetch_abstract_from_openalex(doi=doi, user_agent=user_agent, retries=retries, timeout=timeout)
    if not abstract:
        abstract = fetch_abstract_from_semanticscholar(doi=doi, user_agent=user_agent, retries=retries, timeout=timeout)
    if not abstract:
        abstract = fetch_abstract_from_doi_landing(doi=doi, user_agent=user_agent, retries=retries, timeout=timeout)
    if not abstract:
        return work

    updated = dict(work)
    updated["abstract"] = abstract
    return updated


def pick_best_candidate(entry: BibEntry, items: list[dict], exclude_dois: Optional[set[str]] = None) -> Optional[dict]:
    if not items:
        return None
    excluded = {d.lower() for d in (exclude_dois or set())}
    target_title = normalize_title(strip_outer_braces(entry.fields.get("title", "")))
    target_year = entry.fields.get("year", "").strip()

    best_item = None
    best_score = -1.0
    for item in items:
        item_doi = normalize_doi(item.get("DOI", ""))
        if item_doi and item_doi.lower() in excluded:
            continue

        item_title = ""
        title_arr = item.get("title") or []
        if title_arr:
            item_title = title_arr[0]
        norm_item_title = normalize_title(item_title)
        title_ratio = SequenceMatcher(None, target_title, norm_item_title).ratio() if target_title and norm_item_title else 0.0

        score = float(item.get("score", 0.0))
        score += title_ratio * 80.0

        item_year = extract_year(item)
        if target_year and item_year:
            try:
                dy = abs(int(target_year) - int(item_year))
            except ValueError:
                dy = 99
            if dy == 0:
                score += 20
            elif dy == 1:
                score += 8

        if title_ratio < 0.55:
            continue
        if score > best_score:
            best_score = score
            best_item = item

    return best_item


def extract_year(work: dict) -> str:
    for field in ("issued", "published-print", "published-online", "published"):
        date_parts = work.get(field, {}).get("date-parts", [])
        if date_parts and date_parts[0]:
            y = date_parts[0][0]
            if isinstance(y, int):
                return str(y)
    return ""


def format_crossref_authors(work: dict) -> str:
    authors = work.get("author") or []
    out = []
    for a in authors:
        family = normalize_whitespace(a.get("family", ""))
        given = normalize_whitespace(a.get("given", ""))
        name = ", ".join(p for p in [family, given] if p)
        if not name:
            literal = normalize_whitespace(a.get("name", ""))
            if literal:
                name = literal
        if name:
            out.append(name)
    return " and ".join(out)


def crossref_field_values(entry: BibEntry, work: dict, include_abstract: bool = False) -> dict[str, str]:
    values: dict[str, str] = {}
    doi = normalize_doi(work.get("DOI", "") or "")
    if doi:
        values["doi"] = doi

    title = extract_work_title(work)
    if title:
        values["title"] = title

    authors = format_crossref_authors(work)
    if authors:
        values["author"] = authors

    year = extract_year(work)
    if year:
        values["year"] = year

    container = (work.get("container-title") or [""])[0]
    container = normalize_whitespace(str(container))
    if container:
        if entry.entry_type in {"incollection", "inproceedings"}:
            values["booktitle"] = container
        else:
            values["journal"] = container

    volume = normalize_whitespace(str(work.get("volume", "")).strip())
    if volume:
        values["volume"] = volume

    number = normalize_whitespace(str(work.get("issue", "")).strip())
    if number:
        values["number"] = number

    pages = normalize_whitespace(str(work.get("page", "")).strip())
    if pages:
        values["pages"] = pages

    publisher = normalize_whitespace(str(work.get("publisher", "")).strip())
    if publisher:
        values["publisher"] = publisher

    if include_abstract:
        abstract = clean_crossref_abstract(work.get("abstract", ""))
        if abstract:
            values["abstract"] = abstract

    return values


def normalize_for_compare(field: str, value: str) -> str:
    value = normalize_whitespace(value)
    if not value:
        return ""
    out = value.lower()
    out = out.replace("{", "").replace("}", "")
    if field in {"author"}:
        out = out.replace(" and ", ";")
    out = re.sub(r"\s+", " ", out)
    return out.strip()


def find_mismatch_fields(entry: BibEntry, api_values: dict[str, str]) -> list[str]:
    mismatches: list[str] = []
    for field, api_val in api_values.items():
        local_val = entry.fields.get(field, "")
        if not local_val or not api_val:
            continue
        if normalize_for_compare(field, local_val) != normalize_for_compare(field, api_val):
            mismatches.append(field)
    return mismatches


def set_field(entry: BibEntry, field: str, value: str, overwrite: bool) -> bool:
    value = normalize_whitespace(value)
    if not value:
        return False
    current = entry.fields.get(field, "").strip()
    if current and not overwrite:
        return False
    if current == value:
        return False
    entry.fields[field] = value
    return True


def enrich_entry_from_crossref(entry: BibEntry, work: dict, overwrite: bool, include_abstract: bool = False) -> int:
    changed = 0
    values = crossref_field_values(entry, work, include_abstract=include_abstract)
    for field, value in values.items():
        if field == "doi":
            if set_field(entry, field, value, overwrite=True):
                changed += 1
        else:
            if set_field(entry, field, value, overwrite=overwrite):
                changed += 1

    return changed


def _process_one_entry(
    idx: int,
    total: int,
    entry: BibEntry,
    user_agent: str,
    mailto: str,
    rows: int,
    sleep_seconds: float,
    retries: int,
    timeout: float,
    doi_title_threshold: float,
    overwrite: bool,
    include_abstract: bool,
    json_events: bool,
    progress: bool,
) -> tuple[dict, set[str]]:
    """Process a single BibTeX entry against Crossref. Returns (stat_deltas, issues)."""
    stat_delta = {
        "processed": 1,
        "doi_valid": 0,
        "doi_added": 0,
        "doi_corrected": 0,
        "doi_title_mismatch": 0,
        "unresolved": 0,
        "metadata_mismatch_seen": 0,
        "metadata_mismatch_unfixed": 0,
        "abstract_added": 0,
        "entries_changed": 0,
        "fields_changed": 0,
    }
    issues: set[str] = set()

    if progress:
        print(f"[{idx}/{total}] {entry.key}", flush=True)
    if json_events:
        _emit_event({
            "type": "entry_start",
            "idx": idx,
            "total": total,
            "key": entry.key,
            "title": strip_outer_braces(entry.fields.get("title", ""))[:120],
        })

    original_doi = normalize_doi(entry.fields.get("doi", ""))
    raw_doi = entry.fields.get("doi", "").strip()
    if raw_doi and not original_doi:
        issues.add("doi_invalid_format")

    work = None
    doi_from_crossref = None

    if original_doi:
        try:
            work = crossref_get_work_by_doi(
                original_doi,
                user_agent=user_agent,
                mailto=mailto,
                retries=retries,
                timeout=timeout,
            )
        except Exception as exc:
            print(f"[WARN] {entry.key}: DOI check failed ({exc})", file=sys.stderr)
            issues.add("crossref_error")
        if work:
            sim = title_similarity(entry, work)
            if sim is not None and sim < doi_title_threshold:
                stat_delta["doi_title_mismatch"] += 1
                issues.add("doi_title_mismatch")
                print(
                    f"[WARN] {entry.key}: DOI/title mismatch (sim={sim:.2f}, doi={original_doi})",
                    file=sys.stderr,
                )
                work = None
            else:
                stat_delta["doi_valid"] += 1
                doi_from_crossref = normalize_doi(work.get("DOI", "")) or original_doi
        else:
            issues.add("doi_not_found")

    if not work:
        try:
            work = crossref_search(
                entry,
                user_agent=user_agent,
                mailto=mailto,
                rows=rows,
                retries=retries,
                timeout=timeout,
            )
        except Exception as exc:
            print(f"[WARN] {entry.key}: Crossref search failed ({exc})", file=sys.stderr)
            issues.add("crossref_error")
        if work:
            doi_from_crossref = normalize_doi(work.get("DOI", ""))

    if not work:
        stat_delta["unresolved"] += 1
        issues.add("crossref_unresolved")
        if json_events:
            _emit_event({
                "type": "entry_done",
                "idx": idx,
                "key": entry.key,
                "status": "error",
                "issues": sorted(issues),
                "fields": dict(entry.fields),
            })
        if sleep_seconds > 0:
            time.sleep(sleep_seconds)
        return stat_delta, issues

    if include_abstract:
        doi_for_abs = normalize_doi(work.get("DOI", "")) or original_doi or normalize_doi(entry.fields.get("doi", ""))
        work = add_fallback_abstract_to_work(
            work=work,
            doi=doi_for_abs or "",
            user_agent=user_agent,
            retries=retries,
            timeout=timeout,
        )

    before_doi = normalize_doi(entry.fields.get("doi", ""))
    before_has_abstract = bool(strip_outer_braces(entry.fields.get("abstract", "")).strip())
    api_values = crossref_field_values(entry, work, include_abstract=include_abstract)
    pre_mismatches = find_mismatch_fields(entry, api_values)
    if pre_mismatches:
        stat_delta["metadata_mismatch_seen"] += 1

    fields_changed = enrich_entry_from_crossref(
        entry,
        work,
        overwrite=overwrite,
        include_abstract=include_abstract,
    )
    post_mismatches = find_mismatch_fields(entry, api_values)
    if post_mismatches:
        stat_delta["metadata_mismatch_unfixed"] += 1
        issues.add("metadata_not_corrected")
        for f in post_mismatches:
            issues.add(f"mismatch_{f}")

    after_doi = normalize_doi(entry.fields.get("doi", "")) or doi_from_crossref
    after_has_abstract = bool(strip_outer_braces(entry.fields.get("abstract", "")).strip())

    if after_doi and not before_doi:
        stat_delta["doi_added"] += 1
    elif before_doi and after_doi and before_doi.lower() != after_doi.lower():
        stat_delta["doi_corrected"] += 1
    if include_abstract and (not before_has_abstract and after_has_abstract):
        stat_delta["abstract_added"] += 1

    if fields_changed > 0:
        stat_delta["entries_changed"] += 1
        stat_delta["fields_changed"] += fields_changed

    if json_events:
        _entry_status = (
            "error" if {"crossref_unresolved", "doi_not_found", "doi_invalid_format"} & issues
            else "warn" if issues
            else "ok"
        )
        _emit_event({
            "type": "entry_done",
            "idx": idx,
            "key": entry.key,
            "status": _entry_status,
            "issues": sorted(issues),
            "fields": dict(entry.fields),
        })

    if sleep_seconds > 0:
        time.sleep(sleep_seconds)

    return stat_delta, issues


def process_entries(
    entries: list[BibEntry],
    allowed_types: set[str],
    user_agent: str,
    mailto: str,
    rows: int,
    sleep_seconds: float,
    retries: int,
    timeout: float,
    progress: bool,
    doi_title_threshold: float,
    overwrite: bool,
    include_abstract: bool,
    json_events: bool = False,
    workers: int = 1,
) -> tuple[dict, dict[str, set[str]]]:
    stats = {
        "processed": 0,
        "doi_valid": 0,
        "doi_added": 0,
        "doi_corrected": 0,
        "doi_title_mismatch": 0,
        "unresolved": 0,
        "metadata_mismatch_seen": 0,
        "metadata_mismatch_unfixed": 0,
        "abstract_added": 0,
        "entries_changed": 0,
        "fields_changed": 0,
        "problem_entries": 0,
    }

    eligible = [e for e in entries if e.entry_type in allowed_types]
    issues_by_key: dict[str, set[str]] = {e.key: set() for e in eligible}
    total = len(eligible)

    if json_events:
        _emit_event({"type": "start", "total": total})

    entry_kwargs = dict(
        user_agent=user_agent,
        mailto=mailto,
        rows=rows,
        sleep_seconds=sleep_seconds,
        retries=retries,
        timeout=timeout,
        doi_title_threshold=doi_title_threshold,
        overwrite=overwrite,
        include_abstract=include_abstract,
        json_events=json_events,
        progress=progress,
    )

    if workers > 1:
        with ThreadPoolExecutor(max_workers=workers) as executor:
            futures = {
                executor.submit(_process_one_entry, idx, total, entry, **entry_kwargs): entry
                for idx, entry in enumerate(eligible, start=1)
            }
            for future in as_completed(futures):
                entry = futures[future]
                stat_delta, issues = future.result()
                for k, v in stat_delta.items():
                    if k in stats:
                        stats[k] += v
                issues_by_key[entry.key] = issues
    else:
        for idx, entry in enumerate(eligible, start=1):
            stat_delta, issues = _process_one_entry(idx, total, entry, **entry_kwargs)
            for k, v in stat_delta.items():
                if k in stats:
                    stats[k] += v
            issues_by_key[entry.key] = issues

    return stats, issues_by_key


def find_duplicate_doi_groups(entries: list[BibEntry], allowed_types: set[str]) -> dict[str, list[BibEntry]]:
    doi_map: dict[str, list[BibEntry]] = {}
    for entry in entries:
        if entry.entry_type not in allowed_types:
            continue
        doi = normalize_doi(entry.fields.get("doi", ""))
        if not doi:
            continue
        doi_map.setdefault(doi.lower(), []).append(entry)
    return {d: group for d, group in doi_map.items() if len(group) > 1}


def resolve_duplicate_dois(
    entries: list[BibEntry],
    allowed_types: set[str],
    user_agent: str,
    mailto: str,
    rows: int,
    retries: int,
    timeout: float,
    sleep_seconds: float,
    overwrite: bool,
    include_abstract: bool,
    issues_by_key: dict[str, set[str]],
    progress: bool,
) -> dict:
    stats = {
        "duplicate_groups_before": 0,
        "duplicate_groups_after": 0,
        "duplicate_entries_after": 0,
        "doi_deduplicated": 0,
        "entries_changed": 0,
        "fields_changed": 0,
    }

    groups = find_duplicate_doi_groups(entries, allowed_types)
    stats["duplicate_groups_before"] = len(groups)
    if not groups:
        return stats

    for doi_lc, group in groups.items():
        excluded = {doi_lc}
        for entry in group:
            try:
                alt_work = crossref_search(
                    entry,
                    user_agent=user_agent,
                    mailto=mailto,
                    rows=rows,
                    retries=retries,
                    timeout=timeout,
                    exclude_dois=excluded,
                )
            except Exception as exc:
                print(f"[WARN] {entry.key}: duplicate DOI resolve failed ({exc})", file=sys.stderr)
                issues_by_key.setdefault(entry.key, set()).add("crossref_error")
                alt_work = None

            if not alt_work:
                continue

            if include_abstract:
                doi_for_abs = normalize_doi(alt_work.get("DOI", "")) or normalize_doi(entry.fields.get("doi", ""))
                alt_work = add_fallback_abstract_to_work(
                    work=alt_work,
                    doi=doi_for_abs or "",
                    user_agent=user_agent,
                    retries=retries,
                    timeout=timeout,
                )

            old_doi = normalize_doi(entry.fields.get("doi", ""))
            changed = enrich_entry_from_crossref(
                entry,
                alt_work,
                overwrite=overwrite,
                include_abstract=include_abstract,
            )
            new_doi = normalize_doi(entry.fields.get("doi", ""))

            if new_doi and old_doi and new_doi.lower() != old_doi.lower():
                stats["doi_deduplicated"] += 1
            if changed > 0:
                stats["entries_changed"] += 1
                stats["fields_changed"] += changed

            if sleep_seconds > 0:
                time.sleep(sleep_seconds)
            if progress:
                print(f"[DEDUP] {entry.key}: {old_doi} -> {new_doi}", flush=True)

    remaining = find_duplicate_doi_groups(entries, allowed_types)
    stats["duplicate_groups_after"] = len(remaining)
    stats["duplicate_entries_after"] = sum(len(g) for g in remaining.values())

    for entry in [e for e in entries if e.entry_type in allowed_types]:
        issues = issues_by_key.setdefault(entry.key, set())
        issues.discard("doi_duplicate")

    for _, group in remaining.items():
        for entry in group:
            issues_by_key.setdefault(entry.key, set()).add("doi_duplicate")

    return stats


def apply_problem_tags(
    entries: list[BibEntry],
    allowed_types: set[str],
    issues_by_key: dict[str, set[str]],
    enabled: bool,
) -> dict:
    stats = {
        "problem_entries": 0,
        "problem_tag_updates": 0,
        "entries_changed": 0,
        "fields_changed": 0,
    }
    for entry in entries:
        if entry.entry_type not in allowed_types:
            continue
        issues = issues_by_key.get(entry.key, set())
        if issues:
            stats["problem_entries"] += 1
        if update_problem_tags_in_note(entry, issues, enabled=enabled):
            stats["problem_tag_updates"] += 1
            stats["entries_changed"] += 1
            stats["fields_changed"] += 1
    return stats


def parse_types(types_arg: str) -> set[str]:
    return {t.strip().lower() for t in types_arg.split(",") if t.strip()}


def main() -> int:
    parser = argparse.ArgumentParser(description="Add/validate DOI and enrich BibTeX via Crossref API.")
    parser.add_argument("bibfile", type=Path, help="Path to .bib file")
    parser.add_argument("--out", type=Path, default=None, help="Output .bib path (default: overwrite input)")
    parser.add_argument("--types", default="article", help="Comma-separated entry types to process (default: article)")
    parser.add_argument(
        "--overwrite",
        dest="overwrite",
        action="store_true",
        help="Use Crossref as source of truth and overwrite mismatched fields (default: enabled)",
    )
    parser.add_argument(
        "--no-overwrite",
        dest="overwrite",
        action="store_false",
        help="Do not overwrite existing fields (not recommended)",
    )
    parser.set_defaults(overwrite=True)
    parser.add_argument("--backup", action="store_true", help="Create .bak backup when overwriting input")
    parser.add_argument("--rows", type=int, default=5, help="How many Crossref search results to inspect")
    parser.add_argument("--sleep", type=float, default=0.1, help="Delay between API requests in seconds")
    parser.add_argument("--retries", type=int, default=1, help="How many times to retry failed API requests")
    parser.add_argument("--timeout", type=float, default=8.0, help="HTTP timeout per API request (seconds)")
    parser.add_argument("--no-progress", action="store_true", help="Disable per-entry progress output")
    parser.add_argument(
        "--doi-title-threshold",
        type=float,
        default=0.70,
        help="Title similarity threshold for DOI validation (0..1, default: 0.70)",
    )
    parser.add_argument(
        "--no-problem-tags",
        action="store_true",
        help="Do not write BIBCHECK problem tags into note field",
    )
    parser.add_argument(
        "--include-abstract",
        action="store_true",
        help="Fetch and write abstract field from Crossref (if available)",
    )
    parser.add_argument("--workers", type=int, default=1, help="Number of parallel worker threads for Crossref requests (default: 1)")
    parser.add_argument("--mailto", default="", help="Email for Crossref etiquette (recommended)")
    parser.add_argument(
        "--json-events",
        action="store_true",
        help="Emit newline-delimited JSON events to stdout for real-time UI streaming",
    )
    args = parser.parse_args()

    if not args.bibfile.exists():
        print(f"[ERROR] File not found: {args.bibfile}", file=sys.stderr)
        return 1

    raw = args.bibfile.read_text(encoding="utf-8")
    entries = parse_bibtex_entries(raw)
    if not entries:
        print("[ERROR] No BibTeX entries found.", file=sys.stderr)
        return 1

    allowed_types = parse_types(args.types)
    mail_part = args.mailto if args.mailto else "unknown@example.com"
    user_agent = f"crossref-bib-updater/1.0 (mailto:{mail_part})"

    stats, issues_by_key = process_entries(
        entries=entries,
        allowed_types=allowed_types,
        user_agent=user_agent,
        mailto=args.mailto,
        rows=max(args.rows, 1),
        sleep_seconds=max(args.sleep, 0.0),
        retries=max(args.retries, 0),
        timeout=max(args.timeout, 1.0),
        progress=not args.no_progress and not args.json_events,
        doi_title_threshold=min(max(args.doi_title_threshold, 0.0), 1.0),
        overwrite=args.overwrite,
        include_abstract=args.include_abstract,
        json_events=args.json_events,
        workers=max(args.workers, 1),
    )

    dedup_stats = resolve_duplicate_dois(
        entries=entries,
        allowed_types=allowed_types,
        user_agent=user_agent,
        mailto=args.mailto,
        rows=max(args.rows, 1),
        retries=max(args.retries, 0),
        timeout=max(args.timeout, 1.0),
        sleep_seconds=max(args.sleep, 0.0),
        overwrite=args.overwrite,
        include_abstract=args.include_abstract,
        issues_by_key=issues_by_key,
        progress=not args.no_progress,
    )
    stats["entries_changed"] += dedup_stats["entries_changed"]
    stats["fields_changed"] += dedup_stats["fields_changed"]

    tag_stats = apply_problem_tags(
        entries=entries,
        allowed_types=allowed_types,
        issues_by_key=issues_by_key,
        enabled=not args.no_problem_tags,
    )
    stats["problem_entries"] = tag_stats["problem_entries"]
    stats["entries_changed"] += tag_stats["entries_changed"]
    stats["fields_changed"] += tag_stats["fields_changed"]
    stats["problem_tag_updates"] = tag_stats["problem_tag_updates"]

    output = build_bibtex(entries)
    out_path = args.out or args.bibfile

    if out_path.resolve() == args.bibfile.resolve() and args.backup:
        backup_path = args.bibfile.with_suffix(args.bibfile.suffix + ".bak")
        backup_path.write_text(raw, encoding="utf-8")
        print(f"[INFO] Backup created: {backup_path}")

    out_path.write_text(output, encoding="utf-8")

    if args.json_events:
        eligible_final = [e for e in entries if e.entry_type in allowed_types]
        final_entries = []
        for entry in eligible_final:
            issues = issues_by_key.get(entry.key, set())
            _st = (
                "error" if {"crossref_unresolved", "doi_not_found", "doi_invalid_format"} & issues
                else "warn" if issues
                else "ok"
            )
            final_entries.append({
                "key": entry.key,
                "entry_type": entry.entry_type,
                "status": _st,
                "issues": sorted(issues),
                "fields": dict(entry.fields),
            })
        _emit_event({
            "type": "done",
            "stats": {k: str(v) for k, v in stats.items()},
            "entries": final_entries,
        })
        return 0

    print("[DONE] Crossref enrichment finished.")
    print(f"  Processed entries: {stats['processed']}")
    print(f"  DOI validated:     {stats['doi_valid']}")
    print(f"  DOI added:         {stats['doi_added']}")
    print(f"  DOI corrected:     {stats['doi_corrected']}")
    print(f"  Abstract added:    {stats['abstract_added']}")
    print(f"  DOI/title mismatch:{stats['doi_title_mismatch']}")
    print(f"  Metadata mismatch: {stats['metadata_mismatch_seen']}")
    print(f"  Unfixed mismatch:  {stats['metadata_mismatch_unfixed']}")
    print(f"  Unresolved:        {stats['unresolved']}")
    print(f"  Dedupe fixed:      {dedup_stats['doi_deduplicated']}")
    print(f"  Dup groups left:   {dedup_stats['duplicate_groups_after']}")
    print(f"  Dup entries left:  {dedup_stats['duplicate_entries_after']}")
    print(f"  Problem entries:   {stats['problem_entries']}")
    print(f"  Problem tags set:  {stats['problem_tag_updates']}")
    print(f"  Entries changed:   {stats['entries_changed']}")
    print(f"  Fields changed:    {stats['fields_changed']}")
    print(f"  Output file:       {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
