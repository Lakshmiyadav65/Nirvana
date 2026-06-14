# Nirvana Builders — Backend (FastAPI + MongoDB)

Async API powering the **"Book a Site Visit"** feature: it serves the 16 projects
("plans"), computes available appointment slots, accepts race-safe bookings, and
emails the admin on each new booking.

- **Stack:** FastAPI · Motor (async MongoDB) · Pydantic v2 · aiosmtplib
- **Slots:** Mon–Sat, 10:00–18:00 IST hourly, next 14 days (computed in
  `Asia/Kolkata` — the authoritative business clock; India has no DST).
- **No double-booking:** a unique compound index `(plan_id, slot_start)` makes
  concurrent bookings of the same slot atomically impossible (loser → `409`).

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Liveness + Mongo ping |
| `GET` | `/plans` | All 16 plans (full `Project` shape) |
| `GET` | `/plans/{id}` | One plan + its available slots |
| `POST` | `/bookings` | Create a booking (`201`; `409` if the slot was just taken) |

Errors use a stable envelope: `{"detail": {"code": "<CODE>", "message": "..."}}`.
A slot is identified by `slot_id` — a canonical UTC instant, e.g.
`2026-06-15T04:30:00Z` (== 10:00 IST). The API also returns preformatted IST
`label` / `date_label` strings that the frontend renders **verbatim** (so every
visitor sees Hyderabad wall-clock times regardless of their browser timezone).

## Prerequisites

- Python 3.11+
- A MongoDB instance. Either:
  - **Local:** install MongoDB Community Server (default `mongodb://localhost:27017`), or
  - **Cloud:** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster — put its
    `mongodb+srv://…` connection string in `MONGO_URI`.

## Setup

```bash
cd backend
python -m venv .venv
# Windows PowerShell:  .venv\Scripts\Activate.ps1
# macOS/Linux:         source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env          # then edit .env with real values (never commit it)
python -m app.seed            # load the 16 plans into Mongo (idempotent)
uvicorn app.main:app --reload --port 8000
```

Open <http://localhost:8000/docs> for interactive OpenAPI docs.

## Configuration

All settings come from the environment (see `.env.example`). Highlights:

| Var | Default | Notes |
| --- | --- | --- |
| `MONGO_URI` | `mongodb://localhost:27017` | Local or Atlas `mongodb+srv://…` |
| `MONGO_DB` | `nirvana` | Database name |
| `SEED_ON_STARTUP` | `false` | If `true`, upsert plans on boot |
| `CORS_ORIGINS` | `localhost:3000,3100` | Comma-separated; add the prod origin |
| `SMTP_HOST` | _(empty)_ | Empty ⇒ dev fallback: emails are **logged**, not sent |
| `ADMIN_EMAIL` | _(empty)_ | Inbox that receives booking notifications |

**Email:** leave `SMTP_HOST` empty for local dev (the mailer logs the message).
For real delivery via Gmail, set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, and
use a **Gmail App Password** (not your account password). Secrets live only in
`.env`, which is gitignored — `.env.example` ships placeholders.

## Tests

```bash
pip install -r requirements-dev.txt
pytest
```

Tests use an in-memory Mongo (`mongomock-motor`) and need **no** database or SMTP
server. They cover the slot grid (Sundays/past/horizon/IST/round-trip), the
validation ladder (`422`/`404`), the `409` double-booking race, and availability.

## Frontend wiring

The Next.js app calls this API via `NEXT_PUBLIC_API_URL` (see
`frontend/.env.local.example`). The booking widget fetches slots from
`GET /plans/{id}` and submits to `POST /bookings`, surfacing a `409` as
"that slot is no longer available."

## Docker

```bash
docker build -t nirvana-backend .
docker run --rm -p 8000:8000 --env-file .env nirvana-backend
```
