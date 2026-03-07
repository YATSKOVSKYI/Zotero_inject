# Zotero Inject

**Zotero Inject** is a free, open-source web tool that automates academic reference management — validating BibTeX entries against the Crossref database and replacing Zotero citation placeholders inside `.docx` files with properly formatted references.

Built for students, researchers, and academics who want clean, verified citations without manual work.

---

## Features

- **BibTeX validation** — Upload a `.bib` file and a Zotero HTML export; the tool checks every entry against the [Crossref](https://www.crossref.org/) API in real time, showing DOI match confidence and field-level enrichment.
- **Live streaming progress** — Results stream via Server-Sent Events as each source is checked — no waiting for a full batch to finish.
- **DOCX citation injection** — Paste a `.bib` file directly and upload a `.docx` containing Zotero citation placeholders (`{ | Author, Year | ... }`); the tool replaces them with formatted in-text citations and appends a reference list.
- **Citation style support** — ГОСТ 7.0.5-2008, APA 7th, MLA 9th, Vancouver, Chicago, Harvard, IEEE, Nature, and more.
- **Security-first** — File type validation, size limits (1 MB DOCX / 5 MB BIB), concurrent job limiting (max 5 simultaneous), input sanitization, and security headers on every response.
- **Fully self-hosted** — One Docker container, no external services required beyond the public Crossref API.

---

## How It Works

```
┌──────────────────────────────────────────────────────┐
│  Step 1 · Upload                                     │
│  .bib file + Zotero HTML export                      │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────┐
│  Step 2 · Validate (streaming)                       │
│  Each DOI is checked against the Crossref API        │
│  Title similarity scored · Fields enriched           │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────┐
│  Step 3 · Review table                               │
│  OK / WARN / ERROR per entry · enriched .bib ready   │
└───────────────────┬──────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────┐
│  Step 4 · Inject into DOCX                           │
│  Zotero placeholders → formatted citations           │
│  Reference list appended at end of document          │
└──────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | [LitElement](https://lit.dev/) · TypeScript · Vite |
| Backend | [FastAPI](https://fastapi.tiangolo.com/) · Python 3.11 · asyncio |
| Crossref lookup | `urllib` (stdlib) — no external HTTP libraries |
| DOCX processing | `python-docx` · `lxml` |
| QR code (donate) | `qrcode` (npm) |
| Deploy | Docker · [Railway](https://railway.app/) |

---

## Self-Hosting

### Docker (recommended)

```bash
git clone https://github.com/YATSKOVSKYI/Zotero_inject.git
cd Zotero_inject
docker build -t zotero-inject .
docker run -p 8080:8080 zotero-inject
```

Open `http://localhost:8080`.

### Railway

1. Fork this repository.
2. Create a new Railway project → **Deploy from GitHub repo**.
3. Railway auto-detects the `Dockerfile` and builds the image.
4. Add environment variable: `PORT=8080` (Railway provides this automatically).
5. Generate a public domain under **Settings → Networking**.

---

## Local Development

**Requirements:** Python 3.11+, Node.js 20+

```bash
# Clone
git clone https://github.com/YATSKOVSKYI/Zotero_inject.git
cd Zotero_inject

# Backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cd app/backend && uvicorn server:app --reload --port 8001

# Frontend (separate terminal)
cd app/frontend
npm install
npm run dev                    # http://localhost:5173 (proxies /api → 8001)
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/validate-stream` | Streaming SSE validation of `.bib` + Zotero HTML |
| `POST` | `/api/validate` | Non-streaming validation (returns JSON) |
| `POST` | `/api/generate-bib` | Generate a `.bib` entry from manual fields |
| `POST` | `/api/inject` | Replace citations in `.docx` using enriched `.bib` |
| `POST` | `/api/parse-html` | Parse Zotero HTML export → citation key map |
| `GET` | `/api/download/{job_id}/{filename}` | Download a processed file |

---

## Security

- **File validation** — DOCX max 1 MB, BIB max 5 MB, HTML max 10 MB; magic-byte and content checks on every upload.
- **Concurrent job limit** — Maximum 5 simultaneous validation jobs; excess requests receive `429 Too Many Requests`.
- **Input sanitization** — All user-supplied strings are stripped of null bytes, control characters, and shell-injectable patterns before being passed to subprocesses.
- **Job isolation** — Each request runs in a dedicated temp directory (UUID-named); cleaned up automatically after 1 hour.
- **Security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection` on every response.

---

## License

[MIT](LICENSE) — free to use, modify, and distribute.

---

## Support

If this tool saved you time on your thesis or paper, consider supporting development:

**USDT (TRC-20 · TRON network)**
```
TG52nkCuupK1dwVkiQXCjLDmNd4zoyfbA3
```
