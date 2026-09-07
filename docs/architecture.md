---
id: architecture
title: Architecture
sidebar_label: Architecture
---

# GOVERNMENT SERVICE NAVIGATOR
## Team Task Division & Agentic AI Architecture

### 4-Member Vertical Slice Plan — Backend · Agents · Web (React) · Mobile (Flutter)

---

## 1. Team & Role Overview

| # | Member | Owned Component | Owned Agent |
|---|---|---|---|
| 1 | Supun | Service Catalog & Eligibility Guidance | Agent 1 — Intake & Planning |
| 2 | Krishmal | Application & Case Management | Agent 3 — Action / Tool |
| 3 | Chathuka | Verification & Compliance | Agent 4 — Validation & Safety |
| 4 | Parami | Payments, Refunds & Financial Analytics | Agent 2 — Eligibility & Document Analysis (+ Workflow Orchestrator) |

---

## System User Roles

| Role | Responsibilities | Platform |
|---|---|---|
| **Citizen / Applicant** | Primary Client. Search services, get guidance, submit applications, upload documents, pay fees, track status | Mobile (Flutter) |
| **Verifying Officer** | Review submitted applications, verify documents, approve / reject / revise agent drafts | Web (React) |
| **Department Admin** | Manage service catalog, fees, eligibility rules, appointment capacity, analytics | Web (React) |
| **System Admin** | Manage users, roles, audit logs, anomaly review, system configuration | Web (React) |

---

## 2. How the Agent Pipeline Works

Each citizen request flows through all four agents in sequence, forming a single automated pipeline. Every agent has one narrow, well-defined job and only the tools it is allow-listed to use — this keeps each stage easy to test, debug, and secure.

**Pipeline Flow:**
`Citizen Query` → `Agent 1` → `Agent 2` → `Agent 3` → `Agent 4` → `Officer Review`

### Agent 1 — Intake & Planning
- **Owned by:** Supun (Member A)
- **Role in pipeline:** Understands the citizen's request and builds a plan
- **Input:** Free-text citizen query (e.g. "I need to renew my passport")
- **Output:** Structured plan — matched service ID, processing steps, assigned agents
- **Allow-listed tools:** `search_service_catalog`
- **Description:** Acts as the first point of contact. It interprets what the citizen is actually asking for, matches it to the correct government service, and lays out the sequence of steps the request will follow.

### Agent 2 — Eligibility & Document Analysis (+ Workflow Orchestrator)
- **Owned by:** Parami (Member D)
- **Role in pipeline:** Checks eligibility and orchestrates the entire pipeline
- **Input:** Plan from Agent 1 + citizen profile data
- **Output:** Eligibility result (score / pass-fail) and list of missing documents
- **Allow-listed tools:** `check_eligibility_rules`, `get_document_requirements`
- **Description:** Verifies whether the citizen qualifies for the matched service and identifies any missing documentation. It also functions as the Workflow Orchestrator — triggering Agents 1, 3 and 4 in order and persisting the state of the workflow so progress is never lost.

### Agent 3 — Action / Tool Agent
- **Owned by:** Krishmal (Member B)
- **Role in pipeline:** Takes real action — fills out and prepares the application
- **Input:** Eligibility result from Agent 2
- **Output:** Draft application object — pre-filled fields, calculated fee, proposed appointment slot
- **Allow-listed tools:** `calculate_fee`, `find_appointment_slot`, `prefill_application`
- **Description:** Performs the concrete actions needed to move the case forward: calculating the applicable fee, finding an open appointment slot, and pre-filling the application form wherever possible.

### Agent 4 — Validation & Safety
- **Owned by:** Chathuka (Member C)
- **Role in pipeline:** Final quality and safety check before human review
- **Input:** Draft application from Agent 3
- **Output:** A validated, clean application ready for officer review, or a structured rejection with specific reasons
- **Allow-listed tools:** `validate_schema`, `check_duplicate_application`
- **Description:** Performs a final sanity check — validating the data format and screening for duplicate submissions — before the case ever reaches a human Verifying Officer.
