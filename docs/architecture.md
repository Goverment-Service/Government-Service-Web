---
id: architecture
title: Architecture
sidebar_label: Architecture
---

# GOVERNMENT SERVICE NAVIGATOR
## Team Task Division & Agentic AI Architecture

### 4-Member Vertical Slice Plan - Backend · Agents · Web (React) · Mobile (Flutter)

---

## 1. Team & Role Overview

| # | Member | Owned Component | Owned Agent |
|---|---|---|---|
| 1 | Supun | Service Catalog & Eligibility Guidance | Agent 1 - Intake & Planning |
| 2 | Krishmal | Application & Case Management | Agent 3 - Action / Tool |
| 3 | Chathuka | Verification & Compliance | Agent 4 - Validation & Safety |
| 4 | Parami | Payments, Refunds & Financial Analytics | Agent 2 - Eligibility & Document Analysis (+ Workflow Orchestrator) |

---

## System User Roles

| Role | Responsibilities | Platform |
|---|---|---|
| **Citizen / Applicant** | Primary Client. Search services, get guidance, submit applications, upload documents, pay fees, track status | Mobile (Flutter) |
| **Verifying Officer** | Review submitted applications, verify documents, approve / reject / revise agent drafts | Web (React) |
| **Finance Officer** | Verify deposit slips and online payments, manage the payment ledger, refunds, and installment plans | Web (React) |
| **Department Admin** | Manage service catalog, fees, eligibility rules, form templates, collection slots and holidays, officers, analytics | Web (React) |
| **System Admin** | Manage departments, officers across all departments, and system settings | Web (React) |

---

## 2. How the Agent Pipeline Works

Each citizen request flows through all four agents in sequence, forming a single automated pipeline. Every agent has one narrow, well-defined job and only the tools it is allow-listed to use - this keeps each stage easy to test, debug, and secure.

**Pipeline Flow:**
`Citizen Query` → `Agent 1` → `Agent 2` → `Agent 3` → `Agent 4` → `Officer Review`

### Agent 1 - Intake & Planning
- **Owned by:** Supun (Member A)
- **Role in pipeline:** Understands the citizen's request and builds a plan
- **Input:** Free-text citizen query (e.g. "I need to renew my passport")
- **Output:** Structured plan - matched service ID, processing steps, assigned agents
- **Allow-listed tools:** `search_service_catalog` (done directly through the vector retriever)
- **Description:** Acts as the first point of contact. It interprets what the citizen is actually asking for, matches it to the correct government service, and lays out the sequence of steps the request will follow. The service name is then snapped to the live catalog and the catalog's document requirements are merged in. When nothing relevant is retrieved it answers "Service Not Found" rather than guessing.

### Agent 2 - Eligibility & Document Analysis (+ Workflow Orchestrator)
- **Owned by:** Parami (Member D)
- **Role in pipeline:** Checks eligibility and orchestrates the entire pipeline
- **Input:** Plan from Agent 1 + citizen profile data
- **Output:** Eligibility result (score / pass-fail) and list of missing documents
- **Allow-listed tools:** `check_eligibility_rules`, `get_document_requirements`
- **Description:** Verifies whether the citizen qualifies for the matched service and identifies any missing documentation, auditing only the documents required for the current workflow stage. Uploads whose file names suggest something unrelated are flagged as suspicious for the officer. It also functions as the Workflow Orchestrator - triggering Agents 1, 3 and 4 in order and persisting the state of the workflow so progress is never lost.

### Agent 3 - Action / Tool Agent
- **Owned by:** Krishmal (Member B)
- **Role in pipeline:** Takes real action - fills out and prepares the application
- **Input:** Eligibility result from Agent 2
- **Output:** Draft application object - pre-filled fields, calculated fee, proposed appointment slot
- **Allow-listed tools:** `calculate_fee`, `find_appointment_slot`, `prefill_application`
- **Description:** Performs the concrete actions needed to move the case forward: calculating the applicable fee, finding an open appointment slot, and pre-filling the application form wherever possible. It also books collection appointments from plain language ("next Tuesday around 10") against the department's live slots, capacity, and working hours.

### Agent 4 - Validation & Safety
- **Owned by:** Chathuka (Member C)
- **Role in pipeline:** Final quality and safety check before human review
- **Input:** Draft application from Agent 3
- **Output:** A validated, clean application ready for officer review with a risk level and officer briefing, or a structured rejection with specific reasons
- **Allow-listed tools:** `validate_schema`, `check_duplicate_application`
- **Description:** Performs a final sanity check - validating the data format, screening for prompt injection, masking PII, and flagging duplicate submissions - before the case ever reaches a human Verifying Officer. It can also compile a case dossier with a risk score and queue tier, and draft a determination order for the officer.

---

## 3. How It Runs Today

The agents aren't a separate service. `agentic-ai/AgenticAi.csproj` is a class library that the backend references directly, and every agent, tool, and orchestrator is registered in `backend/src/Program.cs`'s dependency-injection container ([ADR-0008](/docs/adr/0008)).

| Stage | Entry point | Called from |
|---|---|---|
| Agent 1 - Intake & Planning | `POST /api/IntakeAgent/ask` | Mobile "Describe your need" screen → intake plan result |
| Agent 2 - Eligibility & Documents | `POST /api/EligibilityAgent/evaluate`, `/orchestrate` | Mobile eligibility self-check with the AI document inspector; the officer's agent draft |
| Agent 3 - Action / Tool | `POST /api/ActionAgent/draft`, `/orchestrate`, `/book-appointment` | The officer's agent draft (`POST /api/verification/tasks/{id}/agent-draft`); mobile natural-language booking |
| Agent 4 - Validation & Safety | Runs inside `POST /api/applications/submit` and `submit-stage`; also `/api/ValidationAgent/*` | Every stage a citizen submits; dossier, briefing, and decision order in the officer workspace |
| Human review | `/api/verification/tasks/*` | Officer verification workspace on the web dashboard |

### The LLM layer

Every agent runs its deterministic tools first. When `GROQ_API_KEY` is set, each agent also sends the tool results and retrieved policy text to a Groq-hosted LLM (`GroqLlmService`, default model `openai/gpt-oss-120b`, JSON mode, 30 s timeout) for the judgement or the wording. With no key, or when the call fails or returns unusable JSON, the agent returns its deterministic answer ([ADR-0015](/docs/adr/0015)).

- Agent 1's LLM writes the whole plan, grounded in the retrieved chunks.
- Agent 2's LLM decides eligibility and missing documents; a code guardrail then removes anything that matches an upload.
- Agent 3's LLM only rewrites the reasoning and adds officer notes - the draft, fee, and slot always come from the tools.
- Agent 4's LLM can't clear a submission that failed a deterministic check, but its consistency flags that survive a code filter do reject a submission.

### Retrieval

Agents 1-3 retrieve context from a `KnowledgeChunks` table in a separate PostgreSQL database with the pgvector extension (`VectorDbContext`, HNSW cosine index). Embeddings are computed locally by `LocalEmbeddingService`, which hashes keyword unigrams and bigrams into a 768-dimension vector, so only text generation ever uses the network. The knowledge base is seeded from the live catalog and `backend/src/Data/KnowledgeDocuments/` through the `/api/RagSetup/*` endpoints, and admins can upload policy documents per service.

### Safety configuration

Agent 4 is configured in `Program.cs` through `ValidationSafetyConfig`:

- `BlockDuplicateSubmissions = false` - duplicates are recorded as a check and flagged for the officer, not hard-blocked
- `MinimumLegalAge = 16`
- `EnableAdversarialDefense = true`

Every tool call Agents 3 and 4 make is logged with its input and output, stored with the draft, and shown to the officer.

### Human in the loop

No agent can approve an application. Agent output becomes a verification task in the submitting department's queue, and a Verifying Officer approves it, rejects it with a rejection code, or requests a revision. Each decision is written to the audit log. The one exception is Agent 3's appointment booking, which confirms a collection slot without an officer.

### Realtime and performance

- **Push, not polling.** An EF Core change interceptor clears affected cache entries after each commit and sends a SignalR message on `/hubs/applications`; clients then refetch over REST ([ADR-0012](/docs/adr/0012)).
- **Cache.** `HybridCache` holds the service catalog and each citizen's application list, in process memory and in Redis when `REDIS_URL` is set ([ADR-0013](/docs/adr/0013)).
- **Bounded lists.** Growing lists are paged on the server ([ADR-0014](/docs/adr/0014)).
- **Protection.** A per-caller rate limit (default 120 requests/min) and Brotli/gzip compression.

With Redis configured, the API can run as several instances. Without it, run a single instance.

### Known gaps

The ADRs record these openly. Verification, finance, and refunds are now scoped by department on the server, but department scoping for admin, departments, the catalog, templates, and collection slots is still enforced only in the web client ([ADR-0004](/docs/adr/0004)). Several controllers - including Admin, Departments, Services, Templates, RagSetup, and all the agent endpoints - don't require authentication, which matters more now that the API is publicly hosted.
