#!/usr/bin/env python3
"""
zotero_inject.py
Вставляет настоящие поля ADDIN ZOTERO_ITEM в .docx,
группируя смежные ссылки [5][6][7][8] в одно поле.
После открытия в Word: Zotero → Refresh → получаешь [5–8].

Использование:
  python zotero_inject.py --docx input.docx --bib references.bib \
         --uri-map uri-map.tsv --out output_zotero.docx

Опции:
  --library-type  users | groups  (default: users)
"""

from __future__ import annotations

import argparse
import copy
import json
import random
import re
import string
import sys
from pathlib import Path
from typing import Dict, Iterator, List, Optional, Set, Tuple

from docx import Document
from docx.document import Document as _Document
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P
from docx.table import Table, _Cell
from docx.text.paragraph import Paragraph
from lxml import etree

# ── Namespaces ────────────────────────────────────────────────────────────────

W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
XML_SPACE = "{http://www.w3.org/XML/1998/namespace}space"
ZOTERO_SCHEMA = "https://github.com/citation-style-language/schema/raw/master/csl-citation.json"

DEFAULT_REFS_HEADINGS = {
    "references", "reference", "bibliography",
    "литература", "список литературы",
}

# ── Regex ─────────────────────────────────────────────────────────────────────

BRACKET_RE = re.compile(r"\[(?P<inner>[^\[\]]+)\]")
ADJACENT_RE = re.compile(r"\[(?P<a>[^\[\]]+)\](?P<sep>\s*,?\s*)\[(?P<b>[^\[\]]+)\]")
NUMERIC_INNER_RE = re.compile(
    r"^\s*\d+\s*(?:[-–—]\s*\d+)?\s*(?:,\s*\d+\s*(?:[-–—]\s*\d+)?\s*)*$"
)
BIB_HEADER_RE = re.compile(r"@(\w+)\s*\{\s*([^,\s]+)\s*,", re.IGNORECASE)
BIB_NUM_RE = re.compile(r"^\s*%\s*\[(\d+)\]\s*$")
BIBTEX_TO_CSL = {
    "article": "article-journal",
    "inproceedings": "paper-conference",
    "conference": "paper-conference",
    "book": "book",
    "incollection": "chapter",
    "phdthesis": "thesis",
    "mastersthesis": "thesis",
    "techreport": "report",
    "misc": "article",
    "unpublished": "manuscript",
}

# ── BibTeX parser ─────────────────────────────────────────────────────────────

def _extract_value(text: str, pos: int) -> Tuple[str, int]:
    """Extract {} or "" value starting at pos, return (value, next_pos)."""
    if pos >= len(text):
        return "", pos
    ch = text[pos]
    if ch == "{":
        depth, i = 0, pos
        while i < len(text):
            if text[i] == "{":
                depth += 1
            elif text[i] == "}":
                depth -= 1
                if depth == 0:
                    return text[pos + 1 : i], i + 1
            i += 1
        return text[pos + 1 :], len(text)
    if ch == '"':
        i = pos + 1
        while i < len(text):
            if text[i] == '"':
                return text[pos + 1 : i], i + 1
            i += 1
        return text[pos + 1 :], len(text)
    # bare number/string
    i = pos
    while i < len(text) and text[i] not in ",}\n":
        i += 1
    return text[pos:i].strip(), i


def _clean(s: str) -> str:
    s = re.sub(r"\\[a-zA-Z]+\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\{([^}]*)\}", r"\1", s)
    s = re.sub(r"\\(.)", r"\1", s)
    s = s.replace("---", "—").replace("--", "–")
    return s.strip()


def parse_bib(content: str) -> List[Dict[str, str]]:
    entries = []
    for m in BIB_HEADER_RE.finditer(content):
        entry: Dict[str, str] = {"_type": m.group(1).lower(), "_key": m.group(2)}
        pos = m.end()
        while pos < len(content):
            while pos < len(content) and content[pos] in " \t\n\r,":
                pos += 1
            if pos >= len(content) or content[pos] == "}":
                break
            fm = re.match(r"(\w+)\s*=\s*", content[pos:])
            if not fm:
                break
            fname = fm.group(1).lower()
            pos += fm.end()
            while pos < len(content) and content[pos] in " \t":
                pos += 1
            val, pos = _extract_value(content, pos)
            entry[fname] = _clean(val)
        entries.append(entry)
    return entries


def _parse_name(name: str) -> Dict[str, str]:
    name = name.strip()
    if "," in name:
        parts = name.split(",", 1)
        return {"family": parts[0].strip(), "given": parts[1].strip()}
    parts = name.rsplit(" ", 1)
    if len(parts) == 2:
        return {"family": parts[1].strip(), "given": parts[0].strip()}
    return {"family": name, "given": ""}


def _parse_authors(s: str) -> List[Dict[str, str]]:
    return [_parse_name(a) for a in re.split(r"\s+and\s+", s, flags=re.IGNORECASE) if a.strip()]


def bib_entry_to_csl(entry: Dict[str, str], item_uri: str) -> Dict:
    csl: Dict = {
        "id": item_uri,
        "type": BIBTEX_TO_CSL.get(entry.get("_type", "misc"), "article"),
    }
    if "title" in entry:
        csl["title"] = entry["title"]
    if "author" in entry:
        csl["author"] = _parse_authors(entry["author"])
    if "year" in entry:
        m = re.search(r"\d{4}", entry["year"])
        if m:
            csl["issued"] = {"date-parts": [[int(m.group())]]}
    if "journal" in entry:
        csl["container-title"] = entry["journal"]
    elif "booktitle" in entry:
        csl["container-title"] = entry["booktitle"]
    for bib_f, csl_f in [("volume", "volume"), ("doi", "DOI"),
                          ("publisher", "publisher"), ("abstract", "abstract"),
                          ("issn", "ISSN"), ("isbn", "ISBN")]:
        if bib_f in entry:
            csl[csl_f] = entry[bib_f]
    if "number" in entry:
        csl["issue"] = entry["number"]
    if "pages" in entry:
        csl["page"] = entry["pages"].replace("--", "–")
    return csl

# ── Loaders ───────────────────────────────────────────────────────────────────

def load_number_to_key(bib_content: str) -> Dict[int, str]:
    lines = bib_content.splitlines()
    mapping: Dict[int, str] = {}
    pending: Optional[int] = None
    for line in lines:
        m = BIB_NUM_RE.match(line)
        if m:
            pending = int(m.group(1))
            continue
        km = BIB_HEADER_RE.match(line)
        if km and pending is not None:
            mapping[pending] = km.group(2)
            pending = None
    if not mapping:
        keys = [m.group(2) for m in BIB_HEADER_RE.finditer(bib_content)]
        mapping = {i + 1: k for i, k in enumerate(keys)}
    return mapping


def load_uri_map(path: Path) -> Dict[int, str]:
    mapping: Dict[int, str] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) >= 2 and parts[0].strip().isdigit():
            num = int(parts[0].strip())
            uri = parts[1].strip().split("#")[0].strip()
            if uri.startswith("zu:"):
                mapping[num] = uri
    return mapping

# ── Citation parsing ──────────────────────────────────────────────────────────

def parse_nums(inner: str) -> Optional[List[int]]:
    if not NUMERIC_INNER_RE.fullmatch(inner):
        return None
    nums: List[int] = []
    seen: Set[int] = set()
    for part in [p.strip() for p in inner.split(",") if p.strip()]:
        if re.search(r"[-–—]", part):
            lo, hi = re.split(r"\s*[-–—]\s*", part, 1)
            seq = range(int(lo), int(hi) + 1) if int(lo) <= int(hi) else range(int(lo), int(hi) - 1, -1)
            for n in seq:
                if n not in seen:
                    seen.add(n); nums.append(n)
        else:
            n = int(part)
            if n not in seen:
                seen.add(n); nums.append(n)
    return nums


def merge_adjacent(text: str) -> str:
    def _once(s: str) -> Tuple[str, int]:
        count = 0
        def repl(m: re.Match) -> str:
            nonlocal count
            a = parse_nums(m.group("a"))
            b = parse_nums(m.group("b"))
            if a is None or b is None:
                return m.group(0)
            merged: List[int] = []
            seen: Set[int] = set()
            for n in a + b:
                if n not in seen:
                    seen.add(n); merged.append(n)
            count += 1
            return "[" + ", ".join(str(n) for n in merged) + "]"
        return ADJACENT_RE.sub(repl, s), count

    while True:
        text, n = _once(text)
        if n == 0:
            break
    return text


def split_segments(
    text: str,
    number_to_key: Dict[int, str],
    number_to_uri: Dict[int, str],
) -> Optional[List]:
    """Split text into [str | List[int]] segments. Returns None if no citations found."""
    text = merge_adjacent(text)
    segments = []
    last = 0
    found = False
    for m in BRACKET_RE.finditer(text):
        nums = parse_nums(m.group("inner"))
        if nums is None:
            continue
        if any(n not in number_to_key or n not in number_to_uri for n in nums):
            continue
        found = True
        if m.start() > last:
            segments.append(text[last : m.start()])
        segments.append(nums)
        last = m.end()
    if not found:
        return None
    if last < len(text):
        segments.append(text[last:])
    return segments

# ── Word XML helpers ──────────────────────────────────────────────────────────

def _make_run(parent, rPr=None) -> etree._Element:
    r = etree.SubElement(parent, f"{{{W}}}r")
    if rPr is not None:
        r.insert(0, copy.deepcopy(rPr))
    return r


def _fldChar(parent, char_type: str, rPr=None) -> None:
    r = _make_run(parent, rPr)
    fc = etree.SubElement(r, f"{{{W}}}fldChar")
    fc.set(f"{{{W}}}fldCharType", char_type)


def _instrText(parent, text: str, rPr=None) -> None:
    r = _make_run(parent, rPr)
    instr = etree.SubElement(r, f"{{{W}}}instrText")
    instr.set(XML_SPACE, "preserve")
    instr.text = text


def _textRun(parent, text: str, rPr=None) -> None:
    r = _make_run(parent, rPr)
    t = etree.SubElement(r, f"{{{W}}}t")
    t.text = text
    if text != text.strip():
        t.set(XML_SPACE, "preserve")


def _citation_id() -> str:
    return "".join(random.choices(string.ascii_letters + string.digits, k=8))


def zu_to_uri(zu: str, lib_type: str) -> str:
    """zu:10627734:B6PEFHRK → http://zotero.org/users/10627734/items/B6PEFHRK"""
    parts = zu[3:].split(":")
    if len(parts) == 2:
        return f"http://zotero.org/{lib_type}/{parts[0]}/items/{parts[1]}"
    return zu


def build_instr(
    nums: List[int],
    number_to_key: Dict[int, str],
    number_to_uri: Dict[int, str],
    key_to_csl: Dict[str, Dict],
    lib_type: str,
) -> str:
    items = []
    for n in nums:
        key = number_to_key[n]
        uri = zu_to_uri(number_to_uri[n], lib_type)
        item_data = dict(key_to_csl.get(key, {}))
        item_data["id"] = uri
        items.append({"id": uri, "uris": [uri], "itemData": item_data})

    payload = {
        "citationID": _citation_id(),
        "properties": {
            "formattedCitation": "?",
            "plainCitation": "?",
            "noteIndex": 0,
        },
        "citationItems": items,
        "schema": ZOTERO_SCHEMA,
    }
    return " ADDIN ZOTERO_ITEM CSL_CITATION " + json.dumps(payload, ensure_ascii=False) + " "


def rebuild_paragraph(
    para: Paragraph,
    segments: List,
    number_to_key: Dict[int, str],
    number_to_uri: Dict[int, str],
    key_to_csl: Dict[str, Dict],
    lib_type: str,
) -> None:
    p = para._p

    # Save paragraph properties and first run's character properties
    pPr = p.find(f"{{{W}}}pPr")
    rPr = None
    first_r = p.find(f"{{{W}}}r")
    if first_r is not None:
        rPr = first_r.find(f"{{{W}}}rPr")

    # Remove all children except pPr
    for child in list(p):
        if child.tag not in (f"{{{W}}}pPr",):
            p.remove(child)

    for seg in segments:
        if isinstance(seg, str):
            if seg:
                _textRun(p, seg, rPr)
        else:
            instr = build_instr(seg, number_to_key, number_to_uri, key_to_csl, lib_type)
            _fldChar(p, "begin", rPr)
            _instrText(p, instr, rPr)
            _fldChar(p, "separate", rPr)
            _textRun(p, "?", rPr)
            _fldChar(p, "end", rPr)


def add_zotero_pref(doc: _Document) -> None:
    """Insert ZOTERO_PREF field before first paragraph."""
    # Check if already present
    body = doc.element.body
    for child in body[:5]:
        if b"ZOTERO_PREF" in etree.tostring(child):
            return

    pref = {
        "dataVersion": 4,
        "zoteroVersion": "7.0",
        "prefUpdateDelay": 3000,
        "_versionchanged": False,
        "_needsRefresh": False,
    }
    instr_text = " ADDIN ZOTERO_PREF " + json.dumps(pref) + " "

    new_p = etree.Element(f"{{{W}}}p")
    _fldChar(new_p, "begin")
    _instrText(new_p, instr_text)
    _fldChar(new_p, "separate")
    _textRun(new_p, "")
    _fldChar(new_p, "end")

    body.insert(0, new_p)

# ── Paragraph iteration ───────────────────────────────────────────────────────

def iter_paragraphs(parent) -> Iterator[Paragraph]:
    if isinstance(parent, _Document):
        elm = parent.element.body
    elif isinstance(parent, _Cell):
        elm = parent._tc
    else:
        return
    for child in elm.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, parent)
        elif isinstance(child, CT_Tbl):
            tbl = Table(child, parent)
            for row in tbl.rows:
                for cell in row.cells:
                    yield from iter_paragraphs(cell)

# ── Main processing ───────────────────────────────────────────────────────────

def process(
    docx_path: Path,
    out_path: Path,
    number_to_key: Dict[int, str],
    number_to_uri: Dict[int, str],
    key_to_csl: Dict[str, Dict],
    lib_type: str,
    refs_headings: Set[str],
) -> Dict[str, int]:
    doc = Document(str(docx_path))
    stats = {"replaced": 0, "groups": 0, "skipped": 0}

    in_body = True
    for para in iter_paragraphs(doc):
        text = para.text
        if not text.strip():
            continue

        heading = re.sub(r"\s+", " ", text.strip()).rstrip(":").strip().lower()
        if in_body and heading in refs_headings:
            in_body = False
            continue
        if not in_body:
            continue

        # Skip probable bibliography lines [N]  Author...
        if re.match(r"^\[\d+\]\s+\S+", text.strip()):
            continue

        segments = split_segments(text, number_to_key, number_to_uri)
        if segments is None:
            continue

        citation_groups = [s for s in segments if isinstance(s, list)]
        stats["groups"] += len(citation_groups)
        stats["replaced"] += sum(len(g) for g in citation_groups)

        rebuild_paragraph(para, segments, number_to_key, number_to_uri, key_to_csl, lib_type)

    add_zotero_pref(doc)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out_path))
    return stats

# ── CLI ───────────────────────────────────────────────────────────────────────

def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(
        description="Вставляет ADDIN ZOTERO_ITEM поля напрямую в .docx."
    )
    p.add_argument("--docx", required=True)
    p.add_argument("--bib", required=True)
    p.add_argument("--uri-map", required=True)
    p.add_argument("--out", required=True)
    p.add_argument("--library-type", choices=["users", "groups"], default="users")
    p.add_argument("--refs-heading", default="")
    return p.parse_args()


def main() -> int:
    args = parse_args()
    docx_path = Path(args.docx)
    bib_path = Path(args.bib)
    uri_map_path = Path(args.uri_map)
    out_path = Path(args.out)

    for p, name in [(docx_path, "docx"), (bib_path, "bib"), (uri_map_path, "uri-map")]:
        if not p.exists():
            print(f"Ошибка: файл не найден: {p}", file=sys.stderr)
            return 1

    bib_content = bib_path.read_text(encoding="utf-8")
    number_to_key = load_number_to_key(bib_content)
    number_to_uri = load_uri_map(uri_map_path)

    entries = parse_bib(bib_content)
    key_to_entry = {e["_key"]: e for e in entries}

    # Build CSL-JSON for each key (uri needed for id field, set later)
    key_to_csl: Dict[str, Dict] = {}
    for num, key in number_to_key.items():
        entry = key_to_entry.get(key)
        if entry and num in number_to_uri:
            uri = zu_to_uri(number_to_uri[num], args.library_type)
            key_to_csl[key] = bib_entry_to_csl(entry, uri)

    refs_headings = (
        {re.sub(r"\s+", " ", x.strip()).rstrip(":").strip().lower()
         for x in args.refs_heading.split(",") if x.strip()}
        if args.refs_heading.strip()
        else DEFAULT_REFS_HEADINGS
    )

    stats = process(
        docx_path=docx_path,
        out_path=out_path,
        number_to_key=number_to_key,
        number_to_uri=number_to_uri,
        key_to_csl=key_to_csl,
        lib_type=args.library_type,
        refs_headings=refs_headings,
    )

    print("Готово.")
    print(f"Групп цитирования вставлено: {stats['groups']}")
    print(f"Ссылок заменено: {stats['replaced']}")
    print(f"Выходной файл: {out_path}")
    print()
    print("Следующий шаг: откройте в Word -> Zotero -> Refresh Citations")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
