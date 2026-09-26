---
id: intro
title: Introduction
sidebar_label: Introduction
---

# Government Service Navigator (GSN)

Government Service Navigator is a cross-platform system for delivering and managing digital government services. It was built as an SE3090 group project for five kinds of users — **Citizens**, **Verifying Officers**, **Department Admins**, **Finance staff**, and **System Admins** — served by three client apps on top of one shared API, with a four-agent AI pipeline preparing each case before a human decides on it.

- **Backend API** — ASP.NET Core (.NET 10) on PostgreSQL, JWT-authenticated, with Stripe for online payments
- **Agentic AI** — four agents (Intake & Planning, Eligibility & Document Analysis, Action/Tool, Validation & Safety) compiled into the backend, using a pgvector knowledge base for retrieval
- **Web dashboard** — React 19 + TypeScript + Vite with the Carbon Design System, for officers, department admins, finance staff, and system admins; also packaged with Electron as Windows, macOS, and Linux desktop apps
- **Mobile app** — Flutter, for citizens to describe a need, check eligibility, apply in stages, pay, request refunds, and track their applications

---

## What's implemented

| Area | What it covers |
|---|---|
| **Service Catalog & Eligibility** | Services with eligibility rules, document checklists, fee schedules, and multi-stage workflows; eligibility scoring; a rule builder and simulator for admins |
| **Application & Case Management** | Officer-built dynamic application templates, staged submissions with document uploads, finalization, and agent-prepared drafts |
| **Verification & Compliance** | Department-scoped review queue, verification workspace with a deposit-slip viewer, approve / reject / revise decisions with rejection codes, bulk verification, audit logs |
| **Payments, Refunds & Analytics** | Stripe Checkout, bank deposit slips, and online-reference payments; payment ledgers; installment plans with a background monitor; refunds; daily-to-yearly analytics, report snapshots, anomaly detection, and approval-likelihood estimates |
| **Notifications** | In-app citizen notifications, with SMTP settings for email |
| **Agentic AI pipeline** | All four agents, their allow-listed tools, orchestrators for Agents 2–4, and xUnit tests with golden cases |

The AI agents don't call an external LLM. Retrieval uses an offline embedding (hashed keyword unigrams and bigrams into a 768-dimension vector) stored in pgvector, and eligibility, fee, and validation logic is deterministic. That keeps results reproducible and testable.

---

## Repository structure

```text
Government_Service_Navigator/
├── backend/src/                 # ASP.NET Core Web API (single project)
│   ├── Controllers/             # Auth, Admin, Services, Template, Applications, Verification,
│   │                            # Payments, Refunds, InstallmentPlans, Analytics, AnomalyDetection,
│   │                            # AuditLogs, Notifications, IntakeAgent, EligibilityAgent,
│   │                            # ActionAgent, RagSetup
│   ├── Services/                # Business logic (+ Services/Interfaces)
│   ├── Models/Entities/         # EF Core entities
│   ├── Data/                    # AppDbContext, VectorDbContext, KnowledgeDocuments/ for RAG
│   ├── Migrations/              # Applied automatically on startup
│   └── .env.example             # Required environment variables
│
├── agentic-ai/                  # Agent library, referenced by the backend project
│   ├── agents/                  # 01-intake-planning … 04-validation-safety
│   ├── tools/                   # calculate-fee, check-duplicate-application, validate-schema, …
│   ├── orchestration/           # Agent 2, Agent 3, and validation orchestrators
│   ├── schemas/  state/  config/
│   └── tests/                   # xUnit tests + golden-cases/
│
├── web/                         # React dashboard (Vite, Carbon, Tailwind) + electron/
│   └── src/  Officer/  Admin/  Finance/
│
├── mobile/                      # Flutter citizen app (Riverpod)
│   └── lib/  screens/  services/  providers/  config/app_config.dart
│
├── docs/                        # api.md, adr/, diagrams/, project plan
├── tui-runner/                  # Split-pane terminal runner for backend + web (+ mobile)
├── launch.bat / launch.command  # Double-click launchers for tui-runner
└── .github/workflows/           # CI per app + Android, iOS, Windows, macOS, Linux builds
```

---

## Where to go next

- **[Setup Walkthrough](/docs/setup)** — get the API, dashboard, and mobile app running
- **[Local Development Setup](/docs/contributing)** — branches, CI, tests, and how to contribute
- **[Architecture](/docs/architecture)** — the team split, user roles, and the four-agent pipeline
- **[Architecture Decision Records](/docs/adr)** — the decisions behind the codebase, including known gaps
