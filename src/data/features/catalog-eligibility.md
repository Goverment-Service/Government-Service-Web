---
title: Service Catalog & Intake
icon: ClipboardList
order: 1
group: agent1
homeFeatured: true
summary: The service catalog, eligibility rules, and the Intake & Planning agent that matches a citizen's need to a service.
---

- POST /api/IntakeAgent/ask: Agent 1 turns a free-text need into a matched service and step plan (pgvector retrieval)
- POST /api/services and PUT /api/services/{id}: Department Admin creates and edits a service procedure
- PUT /api/services/{id}/eligibility-rules, /documents, /fees: Manage the rules, document checklist, and fee schedule
- PUT /api/services/{id}/workflow: Define the multi-stage workflow a service moves through
- POST /api/services/eligibility-score: Score a citizen profile against a service's rules — match % plus missing criteria
- DELETE /api/services/{id}: Retire a procedure (soft delete)
