#!/usr/bin/env python3
"""FastAPI backend for Zotero Inject UI."""

import asyncio
import json
import os
import re
import shutil
import subprocess
import sys
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

app = FastAPI(title="Zotero Inject API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _save(upload: UploadFile, dest: Path) -> None:
    with dest.open("wb") as f:
        shutil.copyfileobj(upload.file, f)


def _run(cmd: list[str], cwd: Path) -> tuple[int, str]:
    env = {**os.environ, "PYTHONIOENCODING": "utf-8", "PYTHONUTF8": "1"}
    result = subprocess.run(
        cmd, cwd=str(cwd), capture_output=True, text=True,
        encoding="utf-8", errors="replace", env=env,
    )
    output = result.stdout + result.stderr
    return result.returncode, output


def _make_bib(entries_data: list[dict]) -> str:
    """Build a BibTeX string from a list of entry dicts."""
    parts = []
    for e in entries_data:
        key = e.get("key", "unknown")
        entry_type = e.get("entry_type", "article")
        fields: dict = e.get("fields", {})
        lines = [f"@{entry_type}{{{key},"]
        for field, value in fields.items():
            if value:
                lines.append(f"  {field:<12}= {{{value}}},")
        lines.append("}")
        parts.append("\n".join(lines))
    return "\n\n".join(parts) + "\n"


@app.post("/api/validate-stream")
async def validate_stream(
    bib: UploadFile = File(...),
    mailto: str = Form(""),
):
    """Stream reference validation progress as Server-Sent Events."""
    job = WORK_DIR / uuid.uuid4().hex
    job.mkdir()
    _save(bib, job / "references.bib")
    job_id = job.name

    async def event_gen():
        try:
            proc = await asyncio.create_subprocess_exec(
                PYTHON, "-u",
                str(SCRIPTS_DIR / "crossref_enrich_bib.py"),
                str(job / "references.bib"),
                "--out", str(job / "references_enriched.bib"),
                "--mailto", mailto or "user@example.com",
                "--types", "article,book,inproceedings,incollection,misc,phdthesis,mastersthesis,techreport,unpublished,proceedings,conference",
                "--sleep", "0",
                "--timeout", "6",
                "--workers", "3",
                "--json-events",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.DEVNULL,
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
            await proc.wait()
            yield (
                f"data: {json.dumps({'type': 'end', 'job_id': job_id, 'code': proc.returncode})}\n\n"
            )
        except Exception as exc:
            yield f"data: {json.dumps({'type': 'stream_error', 'message': str(exc)})}\n\n"

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
    job = WORK_DIR / uuid.uuid4().hex
    job.mkdir()
    try:
        _save(bib, job / "references.bib")

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

        summary = {}
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
    try:
        data = await request.json()
        entries_data: list[dict] = data.get("entries", [])
        bib_content = _make_bib(entries_data)
        return Response(
            content=bib_content.encode("utf-8"),
            media_type="text/plain; charset=utf-8",
            headers={"Content-Disposition": 'attachment; filename="references_edited.bib"'},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/inject")
async def inject(
    docx: UploadFile = File(...),
    bib: UploadFile = File(...),
    uri_map: UploadFile = File(...),
    library_type: str = Form("users"),
):
    job = WORK_DIR / uuid.uuid4().hex
    job.mkdir()
    try:
        _save(docx, job / "input.docx")
        _save(bib, job / "references.bib")
        _save(uri_map, job / "uri-map.tsv")

        code, log = _run(
            [
                PYTHON, str(SCRIPTS_DIR / "zotero_inject.py"),
                "--docx", str(job / "input.docx"),
                "--bib", str(job / "references.bib"),
                "--uri-map", str(job / "uri-map.tsv"),
                "--out", str(job / "output_zotero.docx"),
                "--library-type", library_type,
            ],
            cwd=SCRIPTS_DIR,
        )

        if code != 0:
            raise HTTPException(status_code=500, detail=log)

        groups = 0
        replaced = 0
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
    job = WORK_DIR / uuid.uuid4().hex
    job.mkdir()
    try:
        _save(html, job / "zotero.html")
        _save(bib, job / "references.bib")

        code, log = _run(
            [
                PYTHON, str(SCRIPTS_DIR / "parse_zotero_html.py"),
                "--html", str(job / "zotero.html"),
                "--bib", str(job / "references.bib"),
                "--out", str(job / "uri-map.tsv"),
            ],
            cwd=SCRIPTS_DIR,
        )

        if code != 0:
            raise HTTPException(status_code=500, detail=log)

        # Parse structured info from log output
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
    if "/" in job_id or "\\" in job_id or "/" in filename or "\\" in filename:
        raise HTTPException(status_code=400, detail="Invalid path")
    path = WORK_DIR / job_id / filename
    if not path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    media = "application/octet-stream"
    if filename.endswith(".bib"):
        media = "text/plain; charset=utf-8"
    elif filename.endswith(".tsv"):
        media = "text/tab-separated-values; charset=utf-8"
    elif filename.endswith(".docx"):
        media = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    return FileResponse(path, media_type=media, filename=filename)


# Serve landing page at root
@app.get("/")
def root():
    path = Path(__file__).parent.parent / "frontend" / "dist" / "landing.html"
    if path.exists():
        return FileResponse(str(path), media_type="text/html")
    raise HTTPException(status_code=404, detail="Landing page not found")


# Serve built frontend
frontend_dist = Path(__file__).parent.parent / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/app", StaticFiles(directory=str(frontend_dist), html=True), name="app")
    app.mount("/assets", StaticFiles(directory=str(frontend_dist / "assets")), name="assets")
