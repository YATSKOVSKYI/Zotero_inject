#!/usr/bin/env python3
"""
Парсит HTML-файл Zotero (Scannable Cite) и создает uri-map.tsv.

Формат маркеров в HTML:
  { | Author, Year | | |zu:LIBID:ITEMKEY}

Использование:
  python parse_zotero_html.py --html zotero.html --out uri-map.tsv
  python parse_zotero_html.py --html zotero.html --out uri-map.tsv --bib references.bib
"""

import argparse
import re
import sys
from pathlib import Path

# Маркер Scannable Cite: { |любой текст| |локатор| |zu:...|  }
SCANNABLE_RE = re.compile(r"\{[^{}]*?\|([^|]*zu:[^\s\}|]+)[^{}]*?\}")

# Извлечь только zu: URI
ZU_URI_RE = re.compile(r"zu:[^\s\}\]|]+")

# Ключ из .bib
BIB_KEY_RE = re.compile(r"@\w+\s*\{\s*([^,\s]+)\s*,", flags=re.IGNORECASE)
BIB_NUM_RE = re.compile(r"^\s*%\s*\[(\d+)\]\s*$")


def extract_uris_from_html(html_text: str) -> list[str]:
    """Извлекает zu: URI из HTML в порядке появления, без дублей."""
    uris = []
    seen = set()
    for match in SCANNABLE_RE.finditer(html_text):
        group = match.group(1)
        uri_m = ZU_URI_RE.search(group)
        if uri_m:
            uri = uri_m.group(0).rstrip(".,;) ")
            if uri not in seen:
                seen.add(uri)
                uris.append(uri)
    return uris


def load_bib_order(bib_path: Path) -> list[str]:
    """Возвращает список citation key в порядке % [1], % [2], ..."""
    lines = bib_path.read_text(encoding="utf-8").splitlines()
    keys_by_num: dict[int, str] = {}
    pending_num: int | None = None

    for line in lines:
        num_m = BIB_NUM_RE.match(line)
        if num_m:
            pending_num = int(num_m.group(1))
            continue
        key_m = BIB_KEY_RE.match(line)
        if key_m and pending_num is not None:
            keys_by_num[pending_num] = key_m.group(1).strip()
            pending_num = None

    if not keys_by_num:
        # Fallback: просто по порядку @entry
        keys = [m.group(1).strip() for m in BIB_KEY_RE.finditer(
            bib_path.read_text(encoding="utf-8")
        )]
        return keys

    return [keys_by_num[n] for n in sorted(keys_by_num)]


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Извлекает zu: URI из Zotero HTML и создает uri-map.tsv"
    )
    parser.add_argument("--html", required=True, help="HTML файл из Zotero (Scannable Cite)")
    parser.add_argument("--out", required=True, help="Путь к выходному uri-map.tsv")
    parser.add_argument("--bib", default="", help="(опционально) .bib файл для проверки совпадения числа записей")
    args = parser.parse_args()

    html_path = Path(args.html)
    out_path = Path(args.out)

    if not html_path.exists():
        print(f"Ошибка: файл не найден: {html_path}", file=sys.stderr)
        return 1

    html_text = html_path.read_text(encoding="utf-8", errors="replace")
    uris = extract_uris_from_html(html_text)

    if not uris:
        print("Ошибка: не найдено ни одного zu: URI в файле.", file=sys.stderr)
        print("Убедитесь что файл экспортирован из Zotero как Scannable Cite.", file=sys.stderr)
        return 1

    bib_keys: list[str] = []
    if args.bib:
        bib_path = Path(args.bib)
        if bib_path.exists():
            bib_keys = load_bib_order(bib_path)

    # Предупреждение если количество не совпадает
    if bib_keys and len(uris) != len(bib_keys):
        print(
            f"Предупреждение: в HTML {len(uris)} URI, в .bib {len(bib_keys)} записей.",
            file=sys.stderr,
        )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    with out_path.open("w", encoding="utf-8", newline="") as f:
        f.write("# number\tzu_uri\n")
        for i, uri in enumerate(uris, start=1):
            key_comment = f"\t# {bib_keys[i - 1]}" if bib_keys and i <= len(bib_keys) else ""
            f.write(f"{i}\t{uri}{key_comment}\n")

    print(f"Готово. Записей: {len(uris)}")
    print(f"Файл: {out_path}")
    if bib_keys and len(uris) == len(bib_keys):
        print("Количество записей совпадает с .bib.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
