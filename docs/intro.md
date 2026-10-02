---
id: intro
title: Introduction
sidebar_label: Introduction
---

# Government Service Navigator (GSN)

Government Service Navigator helps citizens find, apply for, pay for and track Sri Lankan government services, and gives officers one place to review and decide those applications. It was built as an SE3090 group project and is released under the MIT License.

A citizen describes what they need in plain language. AI agents match it to a service, check eligibility and documents, and prepare the case. Officers in the relevant department review it, and the citizen follows every step live in the mobile app, then books a time to collect the result.

**Current release:** v3.0.1 - the citizen mobile app now ships as **LankaServe**.

| Piece | Built with | Used by |
|---|---|---|
| **Backend API** (`backend/`) | ASP.NET Core on .NET 10, EF Core, PostgreSQL (Neon), SignalR, optional Redis | Everything below |
| **Agentic AI** (`agentic-ai/`) | C# class library compiled into the API, pgvector, optional Groq LLM | The API |
| **Web dashboard** (`web/`) | React 19, TypeScript, Vite, Carbon Design System, Tailwind, TanStack Query; also an Electron desktop app | Verifying Officers, Finance Officers, Department Admins, System Admins |
| **Mobile app** (`mobile/`) - LankaServe | Flutter, Riverpod | Citizens |

---

## What's implemented

**Citizens (LankaServe mobile app)**
- Describe a need in plain language and get a matched service, a document list and a step-by-step plan
- Search and filter services, and run an eligibility self-check with an AI document inspector
- Fill in multi-stage application forms, upload documents and save drafts
- Pay stage fees by card (Stripe), bank deposit slip or installment plan, and request refunds
- Follow application status in real time, with in-app notifications and email
- Book a collection appointment in plain language ("next Tuesday morning"), reschedule it, or ask for postal delivery
- Stay signed in between launches - the session is kept in the platform's encrypted storage

**Officers and administrators (web dashboard and desktop app)**
- **Verifying Officer:** department queue, verification workspace with the citizen's answers, documents and AI draft, AI case dossier and decision order, approve / reject / request revision, bulk verification, rejection codes, verified records, audit logs
- **Finance Officer:** deposit slip verification, online payments, payment ledger, refunds, installment plans
- **Department Admin:** service catalog with a searchable procedure picker, eligibility rule builder and simulator, application form templates, collection slots with a daily timeline and holidays, officer management, analytics and anomaly review
- **System Admin:** departments (a department needs a Verifying Officer and a Finance Officer before it can go active), officers across all departments, system settings

### The four agents

| Agent | Job |
|---|---|
| 1 Intake & Planning | Turns the citizen's request into a matched service and plan |
| 2 Eligibility & Documents | Checks eligibility rules and the documents required for the current stage against the uploads |
| 3 Action / Tool | Prefills the application, calculates the fee, proposes and books appointment slots |
| 4 Validation & Safety | Blocks invalid or adversarial submissions before they reach an officer, and briefs the officer |

Every agent runs deterministic tools first. When `GROQ_API_KEY` is set, a Groq-hosted LLM reasons over the tool results; without it, the agents still work on the tools alone ([ADR-0015](/docs/adr/0015)). Retrieval always runs locally: keyword embeddings are hashed into 768-dimension vectors and stored in pgvector, so no embedding API is called. An officer makes every decision on an application.

---

## Where it runs

| Piece | Where |
|---|---|
| API + agents | One Docker image on Azure App Service, deployed by GitHub Actions on every push to `main` that touches the backend |
| Web dashboard | Vercel |
| App database | Neon PostgreSQL |
| Desktop app | GitHub Releases, built when a `v*` tag is pushed |

The mobile app and desktop app use the hosted API by default. See [ADR-0016](/docs/adr/0016) for why.

---

## Repository structure

```text
Government_Service_Navigator/
├── backend/src/                 # ASP.NET Core Web API (single project, folder layering)
│   ├── Controllers/             # Auth, Admin, Departments, Services, Templates, Applications, Verification,
│   │                            # Payments, InstallmentPlans, Refunds, Notifications, AuditLogs, Analytics,
│   │                            # Anomalies, CollectionSlots, the four agent controllers, RagSetup
│   ├── Services/                # Business logic, background jobs, email templates, cache and realtime helpers
│   ├── Validation/              # Shared request rules (NIC, phone, email, password, money, ...)
│   ├── Models/Entities/  DTOs/  Data/  Hubs/
│   ├── Data/KnowledgeDocuments/ # Policy documents ingested into the vector database
│   ├── Program.cs               # DI, auth, caching, rate limiting, schema setup
│   └── .env.example             # Environment variables
├── agentic-ai/                  # agents/, tools/, orchestration/, schemas/, services/ (Groq)
├── web/                         # React dashboard + Electron shell (electron/main.cjs)
├── mobile/                      # Flutter citizen app (LankaServe)
├── test/                        # Backend.Tests, AgenticAi.Tests (xUnit) and web (Vitest)
├── docs/                        # Architecture, API reference, hosting, diagrams, ADRs
├── load/                        # k6 load test
├── tui-runner/                  # Split-pane terminal runner for local development
├── install/install.ps1          # Windows desktop app installer
├── Dockerfile  .dockerignore    # API + agents image
├── docker-compose.redis.yml     # Optional local Redis
└── launch.bat / launch.command  # Double-click launchers for tui-runner
```

---

## Known limitations

The project documents these openly:

- Several endpoint groups have no authentication: officer and department management, the service catalog, templates, the agent endpoints and the RAG setup. Department scoping for them is only done in the web UI ([ADR-0004](/docs/adr/0004)).
- Collection appointments are confirmed by the booking agent without an officer.
- Stripe payments are confirmed by the app polling Stripe; there is no webhook ([ADR-0011](/docs/adr/0011)).
- CORS allows any origin.
- With `GROQ_API_KEY` set, citizen details are sent to Groq.

---

## Where to go next

- **[Setup Walkthrough](/docs/setup)** - get the API, dashboard, and mobile app running
- **[Local Development Setup](/docs/contributing)** - branches, CI, tests, and how to contribute
- **[Architecture](/docs/architecture)** - the team split, user roles, and the four-agent pipeline
- **[Architecture Decision Records](/docs/adr)** - 16 decisions behind the codebase, including known gaps
