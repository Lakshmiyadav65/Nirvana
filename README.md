# Nirvana Builders & Developers

Marketing website and site-visit booking platform for **Nirvana Builders & Developers**, a luxury real-estate builder and construction company in Hyderabad, India.

The site showcases the company's 16 projects (apartments, independent villas, and commercial spaces) and lets prospective buyers **book a site visit** online — with availability and bookings backed by a real API.

```
Nirvana/
├── frontend/   → Next.js (App Router) marketing site + booking UI
└── backend/    → FastAPI + MongoDB booking API
```

The frontend talks to the backend over HTTP (`NEXT_PUBLIC_API_URL`). They run and deploy independently.

---

## Tech stack

**Frontend** — [`frontend/`](frontend/)
- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · framer-motion · Lenis (smooth scroll) · Swiper
- Dark, editorial "gold-on-green" brand theme; full-screen video hero

**Backend** — [`backend/`](backend/)
- FastAPI · Motor (async MongoDB) · Pydantic v2 · aiosmtplib
- IST slot engine (Mon–Sat, 10:00–18:00, next 14 days)
- Race-safe bookings via a unique index; best-effort admin email on each booking
- See [`backend/README.md`](backend/README.md) for full API + setup docs

---

## Quick start

You'll run two processes — the API and the web app — in separate terminals.

### 1. Backend (API on :8000)

Requires Python 3.11+ and a MongoDB instance (local, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster).

```bash
cd backend
python -m venv .venv
# Windows PowerShell:  .venv\Scripts\Activate.ps1
# macOS/Linux:         source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env          # set MONGO_URI (+ SMTP for real emails) — never commit .env
python -m app.seed            # load the 16 projects into MongoDB
uvicorn app.main:app --reload --port 8000
```

API docs: <http://localhost:8000/docs>

### 2. Frontend (site on :3000)

Requires Node.js 18+.

```bash
cd frontend
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:8000
npm install
npm run dev
```

Open <http://localhost:3000>, go to any project → **Book a Site Visit**.

---

## Environment & secrets

- Each app has a committed example file — `frontend/.env.local.example` and `backend/.env.example` — with placeholders.
- Copy them to `.env.local` / `.env` and fill in real values. **Real `.env` files are gitignored and must never be committed.**
- Email is optional: leave `SMTP_HOST` empty in `backend/.env` for local dev (notifications are logged instead of sent). To deliver booking emails via Gmail, set `SMTP_HOST=smtp.gmail.com`, an app password, and `ADMIN_EMAIL`.

---

## Tests

```bash
cd backend
pip install -r requirements-dev.txt
pytest          # slot logic, validation, 409 race, HTTP envelopes (in-memory Mongo; no DB/SMTP needed)
```

---

## Deployment

- **Frontend → Vercel:** set the project's **Root Directory** to `frontend` (the Next.js app is not at the repo root). Add `NEXT_PUBLIC_API_URL` pointing at the deployed backend.
- **Backend → any container host** (Render, Railway, Fly, etc.): a `backend/Dockerfile` is provided. Set `MONGO_URI`, `CORS_ORIGINS` (include the Vercel domain), and SMTP/`ADMIN_EMAIL` as environment variables.
