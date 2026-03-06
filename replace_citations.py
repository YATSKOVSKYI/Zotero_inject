#!/usr/bin/env python3
"""
Замена числовых ссылок в .docx:
1) в Pandoc-формат: [@key; @key2]
2) в Scannable Cite маркеры Zotero ODF Scan: { |key| | |zu:...}{ |key2| | |zu:...}

Ограничение текущей версии:
- При изменении абзаца используется paragraph.text = ..., поэтому форматирование
  внутри измененного абзаца (run-level формат) упрощается до одного run.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path
from typing import Dict, Iterator, List, Optional, Set, Tuple

from docx import Document
from docx.document import Document as _Document
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P
from docx.table import Table, _Cell
from docx.text.paragraph import Paragraph


DEFAULT_REFS_HEADINGS = [
    "references",
    "reference",
    "bibliography",
    "литература",
    "список литературы",
]

# Ищем любые [] блоки, затем валидируем содержимое как числовую цитату.
BRACKET_BLOCK_RE = re.compile(r"\[(?P<inner>[^\[\]]+)\]")

# Склейка соседних ссылок: [1], [2] / [1][2]
ADJACENT_BRACKETS_RE = re.compile(r"\[(?P<a>[^\[\]]+)\](?P<sep>\s*,?\s*)\[(?P<b>[^\[\]]+)\]")

# Разрешенный формат: [1], [1,2], [1-3], [1–3], [1,3-5, 8]
NUMERIC_CITATION_INNER_RE = re.compile(
    r"^\s*\d+\s*(?:[-–—]\s*\d+)?\s*(?:,\s*\d+\s*(?:[-–—]\s*\d+)?\s*)*$"
)

# Для plain .bib: ключ после @type{
BIB_ENTRY_KEY_RE = re.compile(r"@\w+\s*\{\s*([^,\s]+)\s*,", flags=re.IGNORECASE)

# Для annotated-blocks: маркер # [n]
ANNOTATED_MARK_RE = re.compile(r"^\s*#\s*\[(\d+)\]\s*$")

# URI для Scannable Cite
ZOTERO_URI_RE = re.compile(r"(zu:[^\s\}\]]+)")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Замена числовых ссылок в .docx на Pandoc или Scannable Cite маркеры."
    )
    parser.add_argument("--docx", required=True, help="Путь к входному .docx")
    parser.add_argument("--bib", required=True, help="Путь к .bib или кастомному текстовому файлу")
    parser.add_argument("--out", required=True, help="Путь к выходному .docx")
    parser.add_argument("--report", required=True, help="Путь к отчету (.txt/.tsv)")
    parser.add_argument(
        "--mode",
        choices=["body-only", "all-text"],
        default="body-only",
        help="Режим обработки: body-only или all-text",
    )
    parser.add_argument(
        "--bib-format",
        choices=["auto", "plain-bib", "annotated-blocks"],
        default="auto",
        help="Формат библиографического файла",
    )
    parser.add_argument(
        "--refs-heading",
        default="",
        help="Список заголовков раздела литературы через запятую",
    )
    parser.add_argument(
        "--citation-format",
        choices=["pandoc", "scannable"],
        default="pandoc",
        help="Формат выходных цитат: pandoc или scannable",
    )
    parser.add_argument(
        "--uri-map",
        default="",
        help=(
            "Путь к файлу соответствий для Scannable режима. "
            "Поддержка строк: 'number<TAB>zu:...', 'key<TAB>zu:...', "
            "или просто 'zu:...' построчно (тогда по порядку)."
        ),
    )
    return parser.parse_args()


def normalize_heading(text: str) -> str:
    return re.sub(r"\s+", " ", text.strip()).rstrip(":").strip().lower()


def parse_refs_headings(arg_value: str) -> Set[str]:
    if not arg_value.strip():
        return {normalize_heading(x) for x in DEFAULT_REFS_HEADINGS}
    return {normalize_heading(x) for x in arg_value.split(",") if x.strip()}


def detect_bib_format(content: str) -> str:
    if re.search(r"^\s*#\s*\[\d+\]\s*$", content, flags=re.MULTILINE):
        return "annotated-blocks"
    if BIB_ENTRY_KEY_RE.search(content):
        return "plain-bib"
    return "plain-bib"


def parse_plain_bib(content: str) -> Dict[int, str]:
    keys = [m.group(1).strip() for m in BIB_ENTRY_KEY_RE.finditer(content)]
    return {idx: key for idx, key in enumerate(keys, start=1)}


def parse_annotated_blocks(content: str) -> Dict[int, str]:
    lines = content.splitlines()
    positions: List[Tuple[int, int]] = []
    for i, line in enumerate(lines):
        m = ANNOTATED_MARK_RE.match(line)
        if m:
            positions.append((i, int(m.group(1))))

    mapping: Dict[int, str] = {}
    if not positions:
        return mapping

    for pos_idx, (line_idx, number) in enumerate(positions):
        next_line_idx = positions[pos_idx + 1][0] if pos_idx + 1 < len(positions) else len(lines)
        block_text = "\n".join(lines[line_idx + 1 : next_line_idx])
        m = BIB_ENTRY_KEY_RE.search(block_text)
        if m:
            mapping[number] = m.group(1).strip()
    return mapping


def load_number_to_key_map(bib_path: Path, bib_format: str) -> Dict[int, str]:
    content = bib_path.read_text(encoding="utf-8")
    fmt = detect_bib_format(content) if bib_format == "auto" else bib_format

    if fmt == "plain-bib":
        return parse_plain_bib(content)
    if fmt == "annotated-blocks":
        return parse_annotated_blocks(content)
    raise ValueError(f"Неподдерживаемый формат bib: {fmt}")


def load_uri_map(uri_map_path: Path) -> Tuple[Dict[int, str], Dict[str, str]]:
    """
    Загружает URI-мэппинг для Scannable режима.
    Поддерживаемые строки:
    - number<TAB>zu:...
    - key<TAB>zu:...
    - number;zu:...
    - key,zu:...
    - zu:...                      (в этом случае нумерация идет по порядку: 1,2,3...)
    """
    number_to_uri: Dict[int, str] = {}
    key_to_uri: Dict[str, str] = {}
    sequential_index = 1

    for raw_line in uri_map_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or line.startswith("%"):
            continue

        uri_match = ZOTERO_URI_RE.search(line)
        if not uri_match:
            continue
        uri = uri_match.group(1)

        left = line[: uri_match.start()].strip()
        left = left.strip("{}[]()|,; ")

        if not left:
            number_to_uri[sequential_index] = uri
            sequential_index += 1
            continue

        # Сначала пробуем выделить "идентификатор" слева от URI.
        id_token = left
        for splitter in ("\t", ";", ","):
            if splitter in left:
                id_token = left.split(splitter, 1)[0].strip()
                break
        id_token = id_token.strip("{}[]()| ")

        if id_token.isdigit():
            number_to_uri[int(id_token)] = uri
        else:
            key_to_uri[id_token] = uri

    return number_to_uri, key_to_uri


def iter_block_paragraphs(parent) -> Iterator[Paragraph]:
    """Итерирует абзацы в документе и внутри таблиц в порядке следования."""
    if isinstance(parent, _Document):
        parent_elm = parent.element.body
    elif isinstance(parent, _Cell):
        parent_elm = parent._tc
    else:
        raise TypeError(f"Неподдерживаемый тип parent: {type(parent)!r}")

    for child in parent_elm.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, parent)
        elif isinstance(child, CT_Tbl):
            table = Table(child, parent)
            for row in table.rows:
                for cell in row.cells:
                    yield from iter_block_paragraphs(cell)


def parse_numeric_citation_inner(inner: str) -> Optional[List[int]]:
    if not NUMERIC_CITATION_INNER_RE.fullmatch(inner):
        return None

    numbers: List[int] = []
    seen: Set[int] = set()
    parts = [p.strip() for p in inner.split(",") if p.strip()]
    for part in parts:
        if re.search(r"[-–—]", part):
            left, right = re.split(r"\s*[-–—]\s*", part, maxsplit=1)
            start = int(left)
            end = int(right)
            seq = range(start, end + 1) if start <= end else range(start, end - 1, -1)
            for n in seq:
                if n not in seen:
                    seen.add(n)
                    numbers.append(n)
        else:
            n = int(part)
            if n not in seen:
                seen.add(n)
                numbers.append(n)
    return numbers


def is_probable_bibliography_line(text: str) -> bool:
    stripped = text.strip()
    if not stripped:
        return False
    return bool(re.match(r"^\[\d+\]\s+\S+", stripped))


def merge_adjacent_numeric_citations(text: str, counters: Dict[str, int]) -> str:
    def _merge_once(s: str) -> Tuple[str, int]:
        merges = 0

        def _repl(match: re.Match[str]) -> str:
            nonlocal merges
            left_nums = parse_numeric_citation_inner(match.group("a"))
            right_nums = parse_numeric_citation_inner(match.group("b"))
            if left_nums is None or right_nums is None:
                return match.group(0)

            merged: List[int] = []
            seen: Set[int] = set()
            for n in left_nums + right_nums:
                if n not in seen:
                    seen.add(n)
                    merged.append(n)

            merges += 1
            return "[" + ", ".join(str(n) for n in merged) + "]"

        new_s = ADJACENT_BRACKETS_RE.sub(_repl, s)
        return new_s, merges

    total_merges = 0
    while True:
        text, merged_count = _merge_once(text)
        total_merges += merged_count
        if merged_count == 0:
            break

    counters["merged_groups"] = counters.get("merged_groups", 0) + total_merges
    return text


def resolve_scannable_uri(
    number: int,
    key: str,
    number_to_uri: Dict[int, str],
    key_to_uri: Dict[str, str],
) -> Optional[str]:
    if number in number_to_uri:
        return number_to_uri[number]
    return key_to_uri.get(key)


def build_scannable_marker(readable: str, uri: str) -> str:
    # Формат ODF Scan: {prefix|cite|locator|suffix|uri}
    return "{ |" + readable + "| | |" + uri + "}"


def replace_citations_in_text(
    text: str,
    number_to_key: Dict[int, str],
    missing_numbers: Set[int],
    missing_uri_numbers: Set[int],
    warnings: List[str],
    counters: Dict[str, int],
    citation_format: str,
    number_to_uri: Dict[int, str],
    key_to_uri: Dict[str, str],
) -> str:
    text = merge_adjacent_numeric_citations(text, counters)

    def _replace(match: re.Match[str]) -> str:
        raw = match.group(0)
        inner = match.group("inner")
        nums = parse_numeric_citation_inner(inner)
        if nums is None:
            return raw

        counters["found"] += 1
        missing = [n for n in nums if n not in number_to_key]
        if missing:
            counters["skipped"] += 1
            missing_numbers.update(missing)
            warnings.append(f"Пропуск {raw}: нет соответствия для номеров {missing}")
            return raw

        if citation_format == "pandoc":
            counters["replaced"] += 1
            return "[" + "; ".join(f"@{number_to_key[n]}" for n in nums) + "]"

        # scannable
        markers: List[str] = []
        missing_uri: List[int] = []
        for n in nums:
            key = number_to_key[n]
            uri = resolve_scannable_uri(n, key, number_to_uri, key_to_uri)
            if not uri:
                missing_uri.append(n)
                continue
            markers.append(build_scannable_marker(readable=key, uri=uri))

        if missing_uri:
            counters["skipped"] += 1
            missing_uri_numbers.update(missing_uri)
            warnings.append(f"Пропуск {raw}: нет zu: URI для номеров {missing_uri}")
            return raw

        counters["replaced"] += 1
        return "".join(markers)

    return BRACKET_BLOCK_RE.sub(_replace, text)


def process_document(
    doc_path: Path,
    out_path: Path,
    number_to_key: Dict[int, str],
    mode: str,
    refs_headings: Set[str],
    citation_format: str,
    number_to_uri: Dict[int, str],
    key_to_uri: Dict[str, str],
) -> Tuple[Dict[str, int], Set[int], Set[int], List[str]]:
    doc = Document(str(doc_path))
    counters = {"found": 0, "replaced": 0, "skipped": 0}
    missing_numbers: Set[int] = set()
    missing_uri_numbers: Set[int] = set()
    warnings: List[str] = []

    in_body = True
    for paragraph in iter_block_paragraphs(doc):
        original = paragraph.text
        if not original.strip():
            continue

        heading_norm = normalize_heading(original)
        if mode == "body-only" and in_body and heading_norm in refs_headings:
            in_body = False
            continue

        if mode == "body-only" and not in_body:
            continue

        if mode == "all-text" and is_probable_bibliography_line(original):
            continue

        updated = replace_citations_in_text(
            text=original,
            number_to_key=number_to_key,
            missing_numbers=missing_numbers,
            missing_uri_numbers=missing_uri_numbers,
            warnings=warnings,
            counters=counters,
            citation_format=citation_format,
            number_to_uri=number_to_uri,
            key_to_uri=key_to_uri,
        )
        if updated != original:
            paragraph.text = updated

    out_path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out_path))
    return counters, missing_numbers, missing_uri_numbers, warnings


def write_report(
    report_path: Path,
    number_to_key: Dict[int, str],
    missing_numbers: Set[int],
    missing_uri_numbers: Set[int],
    citation_format: str,
    number_to_uri: Dict[int, str],
    key_to_uri: Dict[str, str],
) -> None:
    report_path.parent.mkdir(parents=True, exist_ok=True)
    with report_path.open("w", encoding="utf-8", newline="") as f:
        f.write("number\tcitation_key\tzu_uri\tstatus\tnote\n")
        for number in sorted(number_to_key):
            key = number_to_key[number]
            uri = resolve_scannable_uri(number, key, number_to_uri, key_to_uri) or ""
            status = "OK"
            note = ""

            if citation_format == "scannable" and not uri:
                status = "MISSING_URI"
                note = "no zu URI found for this item"
            if number in missing_numbers:
                status = "MISSING_KEY"
                note = "number used in text but not found in bib mapping"
            if number in missing_uri_numbers:
                status = "MISSING_URI_IN_TEXT"
                note = "number used in text but has no zu URI"

            f.write(f"{number}\t{key}\t{uri}\t{status}\t{note}\n")

        for number in sorted(missing_numbers):
            if number not in number_to_key:
                f.write(
                    f"{number}\t\t\tMISSING_KEY_IN_TEXT\tnumber used in text but absent in bib mapping\n"
                )


def main() -> int:
    args = parse_args()

    docx_path = Path(args.docx)
    bib_path = Path(args.bib)
    out_path = Path(args.out)
    report_path = Path(args.report)
    refs_headings = parse_refs_headings(args.refs_heading)

    if not docx_path.exists():
        raise FileNotFoundError(f"Файл .docx не найден: {docx_path}")
    if not bib_path.exists():
        raise FileNotFoundError(f"Файл .bib/текст не найден: {bib_path}")

    number_to_key = load_number_to_key_map(bib_path, args.bib_format)
    if not number_to_key:
        raise ValueError("Не удалось построить mapping номер -> citation key (пустой результат).")

    number_to_uri: Dict[int, str] = {}
    key_to_uri: Dict[str, str] = {}
    if args.citation_format == "scannable":
        if not args.uri_map:
            raise ValueError(
                "Для --citation-format scannable нужен --uri-map с zu: URI соответствиями."
            )
        uri_map_path = Path(args.uri_map)
        if not uri_map_path.exists():
            raise FileNotFoundError(f"Файл uri-map не найден: {uri_map_path}")
        number_to_uri, key_to_uri = load_uri_map(uri_map_path)
        if not number_to_uri and not key_to_uri:
            raise ValueError("Не удалось прочитать ни одного zu: URI из --uri-map.")

    counters, missing_numbers, missing_uri_numbers, warnings = process_document(
        doc_path=docx_path,
        out_path=out_path,
        number_to_key=number_to_key,
        mode=args.mode,
        refs_headings=refs_headings,
        citation_format=args.citation_format,
        number_to_uri=number_to_uri,
        key_to_uri=key_to_uri,
    )

    write_report(
        report_path=report_path,
        number_to_key=number_to_key,
        missing_numbers=missing_numbers,
        missing_uri_numbers=missing_uri_numbers,
        citation_format=args.citation_format,
        number_to_uri=number_to_uri,
        key_to_uri=key_to_uri,
    )

    print("Готово.")
    print(f"Режим: {args.mode}")
    print(f"Формат цитат: {args.citation_format}")
    print(f"Источник ключей: {bib_path}")
    print(f"Записей в mapping: {len(number_to_key)}")
    if args.citation_format == "scannable":
        print(f"URI по номерам: {len(number_to_uri)}")
        print(f"URI по ключам: {len(key_to_uri)}")
    print(f"Найдено числовых цитат: {counters['found']}")
    print(f"Заменено цитат: {counters['replaced']}")
    print(f"Пропущено цитат: {counters['skipped']}")
    print(f"Склеено соседних цитатных блоков: {counters.get('merged_groups', 0)}")
    print(f"Отсутствующих номеров в bib: {len(missing_numbers)}")
    if args.citation_format == "scannable":
        print(f"Отсутствующих zu URI: {len(missing_uri_numbers)}")
    if warnings:
        print("\nПредупреждения:")
        for w in warnings:
            print(f"- {w}")
    print(f"\nВыходной .docx: {out_path}")
    print(f"Отчет: {report_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

