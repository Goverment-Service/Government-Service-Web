---
id: contributing
title: Local Development Setup
sidebar_label: Local Development Setup
---

# Local Development Setup

This guide covers how the **Government Service Navigator** repo is organised for day-to-day work: who owns what, how branches and CI work, and what to run before opening a pull request. To get everything running for the first time, start with the [Setup Walkthrough](/docs/setup).

## Ownership

Each of the four team members owns one component and one agent (see [Architecture](/docs/architecture)). `.github/CODEOWNERS` routes pull-request reviews to the right owner, so expect a review from the person whose area you touch.

## Branches and pull requests

- `main` is protected. Changes land through pull requests using `.github/pull_request_template.md`.
- Work happens on feature branches (for example `feature/verification-compliance`). The longer-lived `Backend-Dev`, `Front-Dev`, and `Testing` branches also trigger CI.
- Commit messages follow a Conventional-Commits style scoped by app, for example `feat(web): …`, `fix(backend): …`, `feat(mobile,api): …`, or `feat(agentic-ai): …`.

## CI

Each app has its own workflow in `.github/workflows/`, and each one skips its build when nothing under its folder changed:

| Workflow | What it does |
|---|---|
| `backend-ci.yml` | Restores and builds `backend/src` with .NET 10 (Release), then runs `test/Backend.Tests` |
| `agentic-ai.yml` | Builds the agent project, checks its folder structure, and runs `test/AgenticAi.Tests` |
| `web-ci.yml` | `npm ci`, lint, `tsc --noEmit`, `npm test` (Vitest), and `npm run build`, then uploads `web/dist` |
| `mobile-ci.yml` | `flutter pub get` and `flutter analyze` |
| `main_gsn-api.yml` | Builds the API Docker image, pushes it to Azure Container Registry, and deploys it to App Service |
| `build-android.yml`, `ios-build.yml` | APK and unsigned IPA builds |
| `windows-software-build.yml`, `mac-build.yml`, `linux-build.yml` | Electron desktop builds of the web dashboard; the Windows build publishes a GitHub Release on `v*` tags |

## Before you open a PR

Run the checks for whatever you touched. None of the test suites need a database, Groq, Stripe, or a network connection - they run against in-memory fakes.

```bash
# Backend (use -c Release while the API is running locally, since it locks bin/Debug)
dotnet test test/Backend.Tests -c Release

# Agents and tools (xUnit, including golden cases and a stub LLM)
dotnet test test/AgenticAi.Tests

# Web dashboard
cd web && npm run lint && npx tsc --noEmit && npm test && npm run build

# Mobile
cd mobile && flutter analyze && flutter test
```

Some tests deliberately pin known gaps - for example, the authorization matrix test lists today's unauthenticated endpoints. If you fix one of those gaps, update the test and the docs together. `test/README.md` in the main repo explains each suite.

## Adding to the backend

The backend is one project layered by folder ([ADR-0002](/docs/adr/0002)). A new feature usually means:

1. An entity in `Models/Entities/` and a `DbSet` in `AppDbContext`
2. A migration: `dotnet ef migrations add <Name>` (applied automatically on the next run)
3. A service interface in `Services/Interfaces/`, its implementation, and a DI registration in `Program.cs`
4. Request and response DTOs, plus a controller action - with `[Authorize]` (or a role) unless the endpoint is meant to be public

Validation rules live in three places - `backend/src/Validation`, `mobile/lib/utils/validators.dart`, and `web/src/utils/validation.ts` - and are summarised in `docs/api.md`. Change all of them together.

Migrations are gitignored, so schema changes that must reach every environment also need idempotent SQL in the startup schema setup ([ADR-0005](/docs/adr/0005)).

## Adding an agent tool

Tools live in `agentic-ai/tools/<tool-name>/`, each with a README describing its contract. Add the tool, register it in `Program.cs`, allow-list it only for the agent that needs it, and cover it with a test in `test/AgenticAi.Tests/Tools/`.

## Architecture decisions

If your change makes a real design decision - or knowingly leaves a gap - record it as an ADR in `docs/adr/` using the Context / Options Considered / Decision / Consequences template. When a later change alters an earlier decision, add an *Amended* section to that ADR rather than rewriting it. See the [ADR index](/docs/adr).
