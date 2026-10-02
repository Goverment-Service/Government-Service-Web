---
id: setup
title: Setup Walkthrough
sidebar_label: Setup Walkthrough
---

# Setup Walkthrough

## Prerequisites

- [Git](https://git-scm.com/)
- [.NET SDK 10.x](https://dotnet.microsoft.com/en-us/download) — the backend and `agentic-ai` both target `net10.0`
- [Node.js 20+](https://nodejs.org/) — for `web/` and `tui-runner/`
- [Flutter SDK](https://docs.flutter.dev/get-started/install) (Dart 3.12+) — only needed for the mobile app
- **PostgreSQL** for the app database — a local install or a [Neon](https://neon.tech/) project
- **PostgreSQL with the [pgvector](https://github.com/pgvector/pgvector) extension** for the agents' knowledge base

Optional:

- Docker, for a local Redis or to build the API image
- A [Groq](https://groq.com/) API key, for LLM reasoning in the agents
- A Stripe test-mode secret key, if you want card payments to work
- SMTP credentials, for email notifications

---

## 1. Clone the repository

```bash
git clone https://github.com/Goverment-Service/Government_Service_Navigator.git
cd Government_Service_Navigator
```

---

## 2. Configure the backend

```bash
cd backend/src
cp .env.example .env
```

Fill in `backend/src/.env`. The essentials:

| Variable | Needed for |
|---|---|
| `DATABASE_URL` (or all of `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`) | The app database. Startup fails without one of them. With Neon, use the pooled connection string |
| `JWT_KEY`, `JWT_ISSUER`, `JWT_AUDIENCE` | Sign-in. Without `JWT_KEY` no token is accepted |
| `GROQ_API_KEY`, `GROQ_MODEL` | Optional LLM reasoning for the agents (default model `openai/gpt-oss-120b`) |
| `STRIPE_SECRET_KEY` | Card payments (use a `sk_test_...` key) |
| `SMTP_*` | Email notifications |
| `REDIS_URL` | Optional shared cache — needed only for more than one API instance |
| `RATE_LIMIT_PER_MINUTE` | Per-user request limit (default 120) |
| `BANK_NAME`, `BANK_BRANCH`, `BANK_ACCOUNT_NAME`, `BANK_ACCOUNT_NUMBER` | Bank details shown for installment transfers |

The vector database connection string is `ConnectionStrings:VectorDb` in `appsettings.json`, or set it as an environment variable so it never gets committed:

```bash
export ConnectionStrings__VectorDb="Host=…;Database=gsn_vectordb;Username=…;Password=…;SSL Mode=Require"
```

> Never commit real secrets. `.env` is gitignored.

---

## 3. Run everything with the terminal runner (recommended)

```bash
cd tui-runner
npm install
npm start
```

Or double-click `launch.bat` (Windows) or `launch.command` (macOS) in the repo root. It frees ports `5119` and `5173`, runs the API and the web dev server, and offers to launch the Flutter app on an emulator. Press `Tab` to switch panes, and `q` or `Ctrl+C` to stop everything.

---

## 4. Or run each piece yourself

### API

```bash
cd backend/src
dotnet run
```

- The API listens on **`http://localhost:5119`** (port 8080 inside Docker). Swagger UI is at `/swagger` in Development.
- On startup it applies migrations plus idempotent schema SQL, so a fresh database is set up automatically, and it seeds the initial departments ([ADR-0005](/docs/adr/0005)).
- The `agentic-ai` project is compiled in through a project reference, so there is no separate agent service to start.

Then load the agents' knowledge base once:

```bash
curl -X POST http://localhost:5119/api/RagSetup/seed
curl -X POST http://localhost:5119/api/RagSetup/seed-action-agent
curl -X POST http://localhost:5119/api/RagSetup/ingest-local-documents
```

Re-run these after changing services, fees or templates — the chunks are a snapshot.

### Web dashboard

```bash
cd web
npm install
npm run dev
```

The dashboard runs at `http://localhost:5173`. `npm run dev` reads the API address from `web/.env` (`BASE_URL=http://localhost:5119`); production builds read `web/.env.production`, which points at the hosted API.

The same dashboard ships as an Electron desktop app:

```bash
npm run desktop      # build and launch locally
npm run dist:win     # NSIS installer + portable .exe
npm run dist:mac     # .dmg + .zip (unsigned)
npm run dist:linux   # AppImage + .tar.gz
```

### Mobile app (LankaServe)

```bash
cd mobile
flutter pub get
flutter run --dart-define=API_URL=http://localhost:5119
```

Without `--dart-define` the app uses the hosted API. On the Android emulator use `http://10.0.2.2:5119`; on a phone, use your computer's LAN IP and allow port 5119 through the firewall.

### Redis (optional)

```bash
docker compose -f docker-compose.redis.yml up -d
# then set REDIS_URL=localhost:6379 in backend/src/.env
```

---

## Accounts

- **Citizens** register in the mobile app with their NIC.
- **The first System Admin** is a row in the `Admins` table; add one directly in the database with a BCrypt password hash. System Admins then create departments and officers from the web dashboard.
- **Officers** sign in at `/officer/login`, and the dashboard opens the pages for their role and department.

---

## Install the desktop app (Windows)

Staff can install the dashboard as a Windows app without admin rights. This downloads the latest installer from GitHub Releases; running it again updates to the newest version:

```powershell
irm https://raw.githubusercontent.com/Goverment-Service/Government_Service_Navigator/main/install/install.ps1 | iex
```

The desktop app uses the hosted API. The installer isn't code-signed yet, so Windows SmartScreen may show a warning.

---

## Troubleshooting

| Problem | Check |
|---|---|
| API won't start: "required database environment variables are missing" | Set `DATABASE_URL`, or all five `DB_*` variables, in `backend/src/.env` |
| Every request returns `401` | `JWT_KEY` is missing, or the API restarted with a new key; sign in again |
| `429 Too Many Requests` | The per-user limit (`RATE_LIMIT_PER_MINUTE`, default 120) was hit; raise it for load tests |
| Agents answer "Service Not Found" for everything | The knowledge base is empty; run the three `RagSetup` requests above |
| Agent answers are plain and repetitive | `GROQ_API_KEY` isn't set, so the agents use their deterministic answers |
| Web dashboard calls the wrong API | Check `BASE_URL` in `web/.env` (dev) or `web/.env.production` (build), then restart Vite |
| Mobile app can't reach a local API | Pass `--dart-define=API_URL=...`: `10.0.2.2` on the Android emulator, your LAN IP on a phone |
| `tui-runner` says a port is in use | Stop whatever holds 5119 or 5173 and run `npm start` again |
