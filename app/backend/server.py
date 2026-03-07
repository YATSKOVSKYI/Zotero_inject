#!/usr/bin/env python3
"""FastAPI backend for Zotero Inject UI."""

import asyncio
import contextlib
import json
import os
import re
import shutil
import subprocess
import sys
import time
import uuid
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, Response, StreamingResponse
from fastapi.staticfiles import StaticFiles

SCRIPTS_DIR = Path(__file__).parent.parent.parent
WORK_DIR = Path(__file__).parent / "work"
WORK_DIR.mkdir(exist_ok=True)

PYTHON = str(Path(sys.executable))

# ── Security limits ────────────────────────────────────────────────────────────
MAX_CONCURRENT  = 5
MAX_BIB_SIZE    = 5  * 1024 * 1024   # 5 MB
MAX_DOCX_SIZE   = 1  * 1024 * 1024   # 1 MB
MAX_HTML_SIZE   = 10 * 1024 * 1024   # 10 MB
MAX_TSV_SIZE    = 2  * 1024 * 1024   # 2 MB
MAX_JSON_SIZE   = 2  * 1024 * 1024   # 2 MB  (generate-bib body)
MAX_ENTRIES     = 500                 # max BibTeX entries in generate-bib
JOB_MAX_AGE     = 3600               # seconds — job dirs older than this are deleted
CLEANUP_INTERVAL = 1800              # seconds — background cleanup runs every 30 min

# Only these filenames may be downloaded
ALLOWED_FILENAMES = frozenset({
    "references.bib",
    "references_enriched.bib",
    "references_edited.bib",
    "uri-map.tsv",
    "output_zotero.docx",
})

# Allowed BibTeX field name pattern (letters and underscores only)
_FIELD_RE  = re.compile(r'^[a-zA-Z_]+$')
# Allowed BibTeX entry type
_ETYPE_RE  = re.compile(r'^[a-zA-Z]+$')
# Allowed BibTeX key (alphanumeric + safe punctuation)
_KEY_RE    = re.compile(r'^[\w:\-\.]+$')
# Valid hex job id (uuid4().hex)
_JOBID_RE  = re.compile(r'^[0-9a-f]{32}$')
# Simple email check
_EMAIL_RE  = re.compile(r'^[\w.%+\-]{1,64}@[\w.\-]{1,253}\.[a-zA-Z]{2,}$')

# ── Concurrent-job counter (asyncio single-threaded → no lock needed) ─────────
_active_jobs: int = 0


@contextlib.asynccontextmanager
async def _job_slot():
    """Acquire a processing slot; raise 429 if all slots occupied."""
    global _active_jobs
    if _active_jobs >= MAX_CONCURRENT:
        raise HTTPException(
            status_code=429,
            detail=(
                f"Server busy — {_active_jobs}/{MAX_CONCURRENT} jobs running. "
                "Please try again in a moment."
            ),
            headers={"Retry-After": "15"},
        )
    _active_jobs += 1
    try:
        yield
    finally:
        _active_jobs -= 1


# ── Input validators ───────────────────────────────────────────────────────────

def _read_limited(upload: UploadFile, max_bytes: int, label: str = "File") -> bytes:
    """Read upload file enforcing a size limit."""
    data = upload.file.read(max_bytes + 1)
    if len(data) > max_bytes:
        mb = max_bytes // (1024 * 1024)
        raise HTTPException(status_code=413, detail=f"{label} too large (max {mb} MB)")
    return data


def _check_bib(data: bytes) -> None:
    """Verify the bytes look like a BibTeX file."""
    try:
        text = data.decode("utf-8", errors="strict")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="BibTeX file must be UTF-8 encoded")
    if not re.search(r"@\w+\s*\{", text):
        raise HTTPException(status_code=400, detail="File does not appear to be a valid .bib file")
    # Reject suspiciously executable-looking content
    for bad in (b"<script", b"<?php", b"import os", b"subprocess", b"__import__"):
        if bad in data.lower():
            raise HTTPException(status_code=400, detail="File contains disallowed content")


def _check_docx(data: bytes) -> None:
    """Verify magic bytes for OOXML/ZIP (.docx)."""
    if not data.startswith(b"PK\x03\x04"):
        raise HTTPException(status_code=400, detail="File does not appear to be a valid .docx file")


def _check_html(data: bytes) -> None:
    """Verify the file is non-empty text (Zotero export or HTML)."""
    if not data.strip():
        raise HTTPException(status_code=400, detail="File is empty")
    try:
        data.decode("utf-8", errors="strict")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="File must be UTF-8 encoded")


def _check_tsv(data: bytes) -> None:
    """Verify the bytes look like a TSV file."""
    try:
        text = data.decode("utf-8", errors="strict")
    except UnicodeDecodeError:
        raise HTTPException(status_code=400, detail="TSV file must be UTF-8 encoded")
    lines = [l for l in text.splitlines() if l.strip()]
    if not lines:
        raise HTTPException(status_code=400, detail="TSV file is empty")
    # At least half of the first 20 lines should have a tab
    sample = lines[:20]
    if sum(1 for l in sample if "\t" not in l) > len(sample) // 2:
        raise HTTPException(status_code=400, detail="File does not appear to be a valid .tsv file")


def _sanitize_mailto(v: str) -> str:
    v = v.strip()[:254]
    if v and not _EMAIL_RE.match(v):
        return ""   # silently fall back to default; invalid email is not an error
    return v


def _sanitize_library_type(v: str) -> str:
    if v not in ("users", "groups"):
        raise HTTPException(status_code=400, detail="library_type must be 'users' or 'groups'")
    return v


def _validate_job_id(job_id: str) -> None:
    if not _JOBID_RE.match(job_id):
        raise HTTPException(status_code=400, detail="Invalid job id")


def _validate_filename(filename: str) -> None:
    if filename not in ALLOWED_FILENAMES:
        raise HTTPException(status_code=400, detail="File not available for download")


def _sanitize_bib_entry(e: dict) -> dict:
    """Validate and sanitize a single BibTeX entry dict."""
    key = str(e.get("key", "unknown"))[:128]
    if not _KEY_RE.match(key):
        key = re.sub(r'[^\w:\-\.]', '_', key)[:128]

    entry_type = str(e.get("entry_type", "article"))[:32]
    if not _ETYPE_RE.match(entry_type):
        entry_type = "misc"

    raw_fields: dict = e.get("fields", {})
    if not isinstance(raw_fields, dict):
        raw_fields = {}

    clean_fields: dict = {}
    for field, value in raw_fields.items():
        field = str(field)[:64]
        if not _FIELD_RE.match(field):
            continue
        value = str(value)[:4096]
        # Remove null bytes and bare closing braces that would break BibTeX
        value = value.replace("\x00", "").replace("\r", "")
        clean_fields[field] = value

    return {"key": key, "entry_type": entry_type, "fields": clean_fields}


# ── Helpers ────────────────────────────────────────────────────────────────────

def _save_bytes(data: bytes, dest: Path) -> None:
    dest.write_bytes(data)


def _run(cmd: list[str], cwd: Path) -> tuple[int, str]:
    env = {**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"}
    result = subprocess.run(
        cmd, cwd=str(cwd), capture_output=True, text=True,
        encoding="utf-8", errors="replace", env=env,
    )
    return result.returncode, result.stdout + result.stderr


def _make_bib(entries_data: list[dict]) -> str:
    """Build a BibTeX string from a list of sanitized entry dicts."""
    parts = []
    for raw in entries_data:
        e = _sanitize_bib_entry(raw)
        lines = [f"@{e['entry_type']}{{{e['key']},"]
        for field, value in e["fields"].items():
            if value:
                lines.append(f"  {field:<12}= {{{value}}},")
        lines.append("}")
        parts.append("\n".join(lines))
    return "\n\n".join(parts) + "\n"


def _cleanup_old_jobs() -> None:
    """Delete job directories older than JOB_MAX_AGE seconds."""
    now = time.time()
    try:
        for d in WORK_DIR.iterdir():
            if d.is_dir() and (now - d.stat().st_mtime) > JOB_MAX_AGE:
                shutil.rmtree(d, ignore_errors=True)
    except Exception:
        pass


# ── FastAPI app ────────────────────────────────────────────────────────────────

app = FastAPI(title="Zotero Inject API")


@app.on_event("startup")
async def _start_cleanup_task():
    async def _loop():
        while True:
            await asyncio.sleep(CLEANUP_INTERVAL)
            _cleanup_old_jobs()
    asyncio.create_task(_loop())


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def _security_middleware(request: Request, call_next):
    # Global request body size guard (100 MB hard cap)
    content_length = request.headers.get("content-length")
    if content_length and int(content_length) > 100 * 1024 * 1024:
        return Response("Request entity too large", status_code=413)

    response = await call_next(request)

    # Security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


# ── Endpoints ──────────────────────────────────────────────────────────────────

@app.post("/api/validate-stream")
async def validate_stream(
    bib: UploadFile = File(...),
    mailto: str = Form(""),
):
    """Stream reference validation progress as Server-Sent Events."""
    global _active_jobs

    # --- Concurrency gate (before any I/O so 429 is fast) ---
    if _active_jobs >= MAX_CONCURRENT:
        raise HTTPException(
            status_code=429,
            detail=f"Server busy ({_active_jobs}/{MAX_CONCURRENT} jobs running). Try again shortly.",
            headers={"Retry-After": "15"},
        )

    # --- Validate inputs ---
    mailto = _sanitize_mailto(mailto)
    bib_data = _read_limited(bib, MAX_BIB_SIZE, "BibTeX file")
    _check_bib(bib_data)

    # --- Create job ---
    _cleanup_old_jobs()
    job = WORK_DIR / uuid.uuid4().hex
    job.mkdir()
    _save_bytes(bib_data, job / "references.bib")
    job_id = job.name

    # Acquire slot — generator must release it in finally
    _active_jobs += 1

    async def event_gen():
        global _active_jobs
        try:
            _env = {**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"}
            proc = await asyncio.create_subprocess_exec(
                PYTHON, "-u",
                str(SCRIPTS_DIR / "crossref_enrich_bib.py"),
                str(job / "references.bib"),
                "--out", str(job / "references_enriched.bib"),
                "--mailto", mailto or "user@example.com",
                "--types", "article,book,inproceedings,incollection,misc,phdthesis,"
                           "mastersthesis,techreport,unpublished,proceedings,conference",
                "--sleep", "0",
                "--timeout", "10",
                "--workers", "3",
                "--retries", "2",
                "--doi-title-threshold", "0.4",
                "--json-events",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                env=_env,
                limit=10 * 1024 * 1024,
            )
            buf = b""
            while True:
                chunk = await proc.stdout.read(65536)
                if not chunk:
                    break
                buf += chunk
                while b"\n" in buf:
                    raw_line, buf = buf.split(b"\n", 1)
                    line = raw_line.decode("utf-8", errors="replace").strip()
                    if line:
                        yield f"data: {line}\n\n"
            stderr_raw = await proc.stderr.read()
            await proc.wait()
            stderr_text = stderr_raw.decode("utf-8", errors="replace")
            yield (
                f"data: {json.dumps({'type': 'end', 'job_id': job_id, 'code': proc.returncode, 'log': stderr_text})}\n\n"
            )
        except Exception as exc:
            yield f"data: {json.dumps({'type': 'stream_error', 'message': str(exc)})}\n\n"
        finally:
            _active_jobs -= 1

    return StreamingResponse(
        event_gen(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )


@app.post("/api/validate")
async def validate(
    bib: UploadFile = File(...),
    mailto: str = Form(""),
):
    async with _job_slot():
        mailto = _sanitize_mailto(mailto)
        bib_data = _read_limited(bib, MAX_BIB_SIZE, "BibTeX file")
        _check_bib(bib_data)

        _cleanup_old_jobs()
        job = WORK_DIR / uuid.uuid4().hex
        job.mkdir()
        _save_bytes(bib_data, job / "references.bib")

        try:
            code, log = _run(
                [
                    PYTHON, str(SCRIPTS_DIR / "crossref_enrich_bib.py"),
                    str(job / "references.bib"),
                    "--out", str(job / "references_enriched.bib"),
                    "--mailto", mailto or "user@example.com",
                    "--no-progress",
                ],
                cwd=SCRIPTS_DIR,
            )
            if code != 0:
                raise HTTPException(status_code=500, detail=log)

            summary: dict = {}
            for line in log.splitlines():
                for key in ("Processed", "DOI validated", "DOI added", "DOI corrected",
                            "Unresolved", "Problem entries", "Entries changed"):
                    if key.lower() in line.lower():
                        parts = line.split(":")
                        if len(parts) == 2:
                            summary[key] = parts[1].strip()

            return {"job_id": job.name, "log": log, "summary": summary}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/generate-bib")
async def generate_bib(request: Request):
    """Generate a .bib file from edited entry data."""
    async with _job_slot():
        body = await request.body()
        if len(body) > MAX_JSON_SIZE:
            raise HTTPException(status_code=413, detail="Request body too large")
        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            raise HTTPException(status_code=400, detail="Invalid JSON")

        if not isinstance(data, dict):
            raise HTTPException(status_code=400, detail="Expected JSON object")

        entries_data = data.get("entries", [])
        if not isinstance(entries_data, list):
            raise HTTPException(status_code=400, detail="'entries' must be a list")
        if len(entries_data) > MAX_ENTRIES:
            raise HTTPException(status_code=400, detail=f"Too many entries (max {MAX_ENTRIES})")

        bib_content = _make_bib(entries_data)
        return Response(
            content=bib_content.encode("utf-8"),
            media_type="text/plain; charset=utf-8",
            headers={"Content-Disposition": 'attachment; filename="references_edited.bib"'},
        )


@app.post("/api/inject")
async def inject(
    docx: UploadFile = File(...),
    bib: UploadFile = File(...),
    uri_map: UploadFile = File(...),
    library_type: str = Form("users"),
):
    async with _job_slot():
        library_type = _sanitize_library_type(library_type)

        docx_data = _read_limited(docx, MAX_DOCX_SIZE, "DOCX file")
        _check_docx(docx_data)

        bib_data = _read_limited(bib, MAX_BIB_SIZE, "BibTeX file")
        _check_bib(bib_data)

        tsv_data = _read_limited(uri_map, MAX_TSV_SIZE, "URI map file")
        _check_tsv(tsv_data)

        _cleanup_old_jobs()
        job = WORK_DIR / uuid.uuid4().hex
        job.mkdir()
        _save_bytes(docx_data, job / "input.docx")
        _save_bytes(bib_data,  job / "references.bib")
        _save_bytes(tsv_data,  job / "uri-map.tsv")

        try:
            code, log = _run(
                [
                    PYTHON, str(SCRIPTS_DIR / "zotero_inject.py"),
                    "--docx", str(job / "input.docx"),
                    "--bib",  str(job / "references.bib"),
                    "--uri-map", str(job / "uri-map.tsv"),
                    "--out",  str(job / "output_zotero.docx"),
                    "--library-type", library_type,
                ],
                cwd=SCRIPTS_DIR,
            )
            if code != 0:
                raise HTTPException(status_code=500, detail=log)

            groups = replaced = 0
            for line in log.splitlines():
                m = re.search(r"[Гг]рупп[^:]*:\s*(\d+)", line)
                if m:
                    groups = int(m.group(1))
                m = re.search(r"[Сс]сылок[^:]*:\s*(\d+)", line)
                if m:
                    replaced = int(m.group(1))

            return {"job_id": job.name, "log": log, "groups": groups, "replaced": replaced}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/parse-html")
async def parse_html(
    html: UploadFile = File(...),
    bib: UploadFile = File(...),
):
    async with _job_slot():
        html_data = _read_limited(html, MAX_HTML_SIZE, "HTML file")
        _check_html(html_data)

        bib_data = _read_limited(bib, MAX_BIB_SIZE, "BibTeX file")
        _check_bib(bib_data)

        _cleanup_old_jobs()
        job = WORK_DIR / uuid.uuid4().hex
        job.mkdir()
        _save_bytes(html_data, job / "zotero.html")
        _save_bytes(bib_data,  job / "references.bib")

        try:
            code, log = _run(
                [
                    PYTHON, str(SCRIPTS_DIR / "parse_zotero_html.py"),
                    "--html", str(job / "zotero.html"),
                    "--bib",  str(job / "references.bib"),
                    "--out",  str(job / "uri-map.tsv"),
                ],
                cwd=SCRIPTS_DIR,
            )
            if code != 0:
                raise HTTPException(status_code=500, detail=log)

            count = 0
            match: bool | None = None
            warning = ""
            for line in log.splitlines():
                m = re.search(r"Записей[:\s]+(\d+)", line)
                if m:
                    count = int(m.group(1))
                if "совпадает" in line.lower():
                    match = True
                if "предупреждение" in line.lower():
                    match = False
                    warning = line.strip()

            return {"job_id": job.name, "log": log, "count": count, "match": match, "warning": warning}
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/download/{job_id}/{filename}")
def download(job_id: str, filename: str):
    _validate_job_id(job_id)
    _validate_filename(filename)
    path = WORK_DIR / job_id / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    # Extra path-traversal guard: resolved path must be inside WORK_DIR
    if not path.resolve().is_relative_to(WORK_DIR.resolve()):
        raise HTTPException(status_code=400, detail="Invalid path")
    media = "application/octet-stream"
    if filename.endswith(".bib"):
        media = "text/plain; charset=utf-8"
    elif filename.endswith(".tsv"):
        media = "text/tab-separated-values; charset=utf-8"
    elif filename.endswith(".docx"):
        media = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    return FileResponse(path, media_type=media, filename=filename)


# ── Static serving ─────────────────────────────────────────────────────────────

@app.get("/")
def root():
    path = Path(__file__).parent.parent / "frontend" / "dist" / "landing.html"
    if path.exists():
        return FileResponse(str(path), media_type="text/html")
    raise HTTPException(status_code=404, detail="Landing page not found")


frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/app", StaticFiles(directory=str(frontend_dist), html=True), name="app")
    app.mount("/assets", StaticFiles(directory=str(frontend_dist / "assets")), name="assets")
