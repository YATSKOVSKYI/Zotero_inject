#!/usr/bin/env python3
"""
Замена числовых ссылок в .docx на citation keys из .bib.

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
from docx.table import _Cell, Table
from docx.text.paragraph import Paragraph


DEFAULT_REFS_HEADINGS = [
    "references",
    "reference",
    "bibliography",
    "литература",
    "список литературы",
]

# Ищем любые [] блоки, а затем валидируем содержимое как числовую цитату.
BRACKET_BLOCK_RE = re.compile(r"\[(?P<inner>[^\[\]]+)\]")

# Разрешенный формат числовой ссылки:
# [1], [1,2], [1-3], [1–3], [1,3-5, 8]
NUMERIC_CITATION_INNER_RE = re.compile(
    r"^\s*\d+\s*(?:[-–—]\s*\d+)?\s*(?:,\s*\d+\s*(?:[-–—]\s*\d+)?\s*)*$"
)

# Для plain .bib: ключ после @type{
BIB_ENTRY_KEY_RE = re.compile(r"@\w+\s*\{\s*([^,\s]+)\s*,", flags=re.IGNORECASE)

# Для annotated-blocks: маркер # [n]
ANNOTATED_MARK_RE = re.compile(r"^\s*#\s*\[(\d+)\]\s*$")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Заменяет числовые ссылки в .docx на citation keys (Pandoc-стиль)."
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
    return parser.parse_args()


def normalize_heading(text: str) -> str:
    normalized = re.sub(r"\s+", " ", text.strip()).rstrip(":").strip().lower()
    return normalized


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
    positions: List[Tuple[int, int]] = []  # (line_index, citation_number)
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


def iter_block_paragraphs(parent) -> Iterator[Paragraph]:
    """Итерирует абзацы в теле документа и внутри таблиц в порядке следования."""
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
            if start <= end:
                seq = range(start, end + 1)
            else:
                seq = range(start, end - 1, -1)
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
    # Пример: [12] Author, Title...
    return bool(re.match(r"^\[\d+\]\s+\S+", stripped))


def replace_citations_in_text(
    text: str,
    number_to_key: Dict[int, str],
    missing_numbers: Set[int],
    warnings: List[str],
    counters: Dict[str, int],
) -> str:
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

        new_citation = "[" + "; ".join(f"@{number_to_key[n]}" for n in nums) + "]"
        counters["replaced"] += 1
        return new_citation

    return BRACKET_BLOCK_RE.sub(_replace, text)


def process_document(
    doc_path: Path,
    out_path: Path,
    number_to_key: Dict[int, str],
    mode: str,
    refs_headings: Set[str],
) -> Tuple[Dict[str, int], Set[int], List[str]]:
    doc = Document(str(doc_path))
    counters = {"found": 0, "replaced": 0, "skipped": 0}
    missing_numbers: Set[int] = set()
    warnings: List[str] = []

    in_body = True
    for idx, paragraph in enumerate(iter_block_paragraphs(doc), start=1):
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
            original, number_to_key, missing_numbers, warnings, counters
        )
        if updated != original:
            paragraph.text = updated

    out_path.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(out_path))
    return counters, missing_numbers, warnings


def write_report(report_path: Path, number_to_key: Dict[int, str], missing_numbers: Set[int]) -> None:
    report_path.parent.mkdir(parents=True, exist_ok=True)
    with report_path.open("w", encoding="utf-8", newline="") as f:
        f.write("number\tcitation_key\tstatus\tnote\n")
        for number in sorted(number_to_key):
            f.write(f"{number}\t{number_to_key[number]}\tOK\t\n")
        for number in sorted(missing_numbers):
            f.write(f"{number}\t\tMISSING\tnumber not found in bib mapping\n")


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

    counters, missing_numbers, warnings = process_document(
        doc_path=docx_path,
        out_path=out_path,
        number_to_key=number_to_key,
        mode=args.mode,
        refs_headings=refs_headings,
    )

    write_report(report_path, number_to_key, missing_numbers)

    print("Готово.")
    print(f"Режим: {args.mode}")
    print(f"Источник ключей: {bib_path}")
    print(f"Записей в mapping: {len(number_to_key)}")
    print(f"Найдено числовых цитат: {counters['found']}")
    print(f"Заменено цитат: {counters['replaced']}")
    print(f"Пропущено цитат: {counters['skipped']}")
    print(f"Отсутствующих номеров: {len(missing_numbers)}")
    if warnings:
        print("\nПредупреждения:")
        for w in warnings:
            print(f"- {w}")
    print(f"\nВыходной .docx: {out_path}")
    print(f"Отчет: {report_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
