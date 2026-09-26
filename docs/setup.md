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
- [Flutter SDK](https://docs.flutter.dev/get-started/install) (Dart `^3.12`) — only needed for the mobile app
- **PostgreSQL** — a local install or a hosted instance such as Neon. There is no Docker Compose file in the repo.
- A **second PostgreSQL database with the [pgvector](https://github.com/pgvector/pgvector) extension** for the agents' knowledge base

Optional:

- `dotnet-ef` (`dotnet tool install --global dotnet-ef`) if you'll author migrations
- A Stripe test-mode secret key, if you want online checkout to work
- pgAdmin, psql, or DBeaver for inspecting data

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

Fill in `backend/src/.env`:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Optional. A full Postgres URL (for example, from Neon). When set, it is used instead of the `DB_*` values, with SSL required. |
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | Main database. All five are required when `DATABASE_URL` is not set; the API throws on startup otherwise. |
| `JWT_KEY`, `JWT_ISSUER`, `JWT_AUDIENCE`, `JWT_EXPIRY_HOURS` | Token signing and validation. `JWT_KEY` must be set for authentication to work. |
| `STRIPE_SECRET_KEY` | Stripe Checkout for online payments (use a `sk_test_…` key locally). |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM_EMAIL`, `SMTP_FROM_NAME`, `SMTP_USE_SSL` | Outgoing email for notifications. |

The vector database is read from the `VectorDb` connection string. Set it without committing credentials by using an environment variable:

```bash
export ConnectionStrings__VectorDb="Host=…;Database=gsn_vectordb;Username=…;Password=…;SSL Mode=Require"
```

> Never commit real secrets. `.env` is gitignored — keep connection strings out of `appsettings.json` too.

---

## 3. Run the backend

```bash
cd backend/src
dotnet restore
dotnet run
```

- Migrations for the main database are **applied automatically on startup** (see [ADR-0005](/docs/adr/0005)).
- The API listens on **`http://0.0.0.0:5119`**. Swagger UI is at `http://localhost:5119/swagger` in Development.
- The `agentic-ai` project is compiled in through a project reference, so there is no separate agent service to start.

### Seed the agents' knowledge base

The Intake and Eligibility agents retrieve from policy documents in `backend/src/Data/KnowledgeDocuments/`, and the Action agent has its own knowledge set. Seed both once the API is running:

```bash
curl -X POST http://localhost:5119/api/RagSetup/seed
curl -X POST http://localhost:5119/api/RagSetup/seed-action-agent
```

Re-run these whenever the documents or the embedding algorithm change.

---

## 4. Run the web dashboard

```bash
cd web
npm install
npm run dev
```

The dashboard runs at `http://localhost:5173`, and `/` redirects to `/officer/login`.

| Area | Routes |
|---|---|
| Officer | `/officer/dashboard`, `/officer/pending-reviews`, `/officer/verification-workspace/:taskId`, `/officer/bulk-verification`, `/officer/applications`, `/officer/builder`, `/officer/rejection-codes`, `/officer/audit-logs` |
| Admin | `/admin/dashboard`, `/admin/:deptSlug/dashboard`, `/admin/manage-officers`, `/admin/services` (+ `/rules`, `/config`, `/builder`, `/simulator`), `/admin/analytics`, `/admin/anomaly-review`, `/admin/installment-plans`, `/admin/audit-logs` |
| Finance | `/finance/dashboard`, `/finance/ledger`, `/finance/refunds`, `/finance/profile` |

The dashboard calls the API at `http://localhost:5119` directly. There's no `VITE_API_BASE_URL` yet, so pointing it elsewhere means editing those URLs in `web/src/**`.

### Desktop builds

The same dashboard ships as an Electron desktop app:

```bash
npm run desktop      # build and launch locally
npm run dist:win     # NSIS installer + portable .exe
npm run dist:mac     # .dmg + .zip (unsigned)
npm run dist:linux   # AppImage + .tar.gz
```

---

## 5. Run the mobile app

```bash
cd mobile
flutter pub get
flutter run
```

`mobile/lib/config/app_config.dart` picks the API base URL per platform:

| Target | Base URL |
|---|---|
| Web (Chrome), Windows, iOS simulator | `http://localhost:5119/api` |
| Android emulator | `http://10.0.2.2:5119/api` |
| Physical device | Change it to your machine's LAN IP and open port `5119` in your firewall |

---

## One-command dev runner

Instead of running steps 3–5 in separate terminals, use the bundled split-pane runner:

```bash
cd tui-runner
npm install
npm start
```

Or double-click `launch.bat` (Windows) or `launch.command` (macOS) in the repo root. It frees ports `5119` and `5173`, starts `dotnet run` and `npm run dev`, and optionally asks which emulator to run `flutter run` on. Press `Tab` to switch panes, and `q` or `Ctrl+C` to stop everything. You still need `backend/src/.env` configured first.

---

## Troubleshooting

**API cannot connect to the database**
- Check that PostgreSQL is reachable at `DB_HOST`/`DB_PORT`, or that `DATABASE_URL` is valid.
- Look for "An error occurred while migrating the database" in the console. The API still starts when a migration fails, so a later SQL error usually means a missed migration.

**401 Unauthorized from the web or mobile app**
- Make sure `JWT_KEY` is set. After changing it, sign in again, because old tokens were signed with the previous key.
- Logged-out tokens are revoked server-side ([ADR-0001](/docs/adr/0001)), so sign in again rather than reusing a stored token.

**Agents return no matches**
- Check that `ConnectionStrings__VectorDb` points to a database with pgvector, then re-run the two `RagSetup` seed calls.

**Flutter cannot reach the API**
- Android emulators need `10.0.2.2`. Physical devices need your LAN IP and an open port `5119`.

**`tui-runner` says a port is in use**
- Stop whatever is bound to `5119` or `5173`, then run `npm start` again.
