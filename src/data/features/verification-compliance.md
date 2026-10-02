---
title: Verification & Compliance
icon: ShieldCheck
order: 4
group: agent4
homeFeatured: true
summary: Agent 4's validation and safety guardrails, then the human officer review queue, case dossier, and audit trail.
---

- Agent 4 validates the NIC and schema, enforces a minimum legal age, masks PII, screens for prompt injection, and flags duplicates for the officer
- GET /api/verification/tasks/pending: The officer's department-scoped review queue, updated live over SignalR
- POST /api/verification/tasks/{id}/agent-draft: Run Agents 2 and 3 on an application and store the draft for review
- POST /api/ValidationAgent/dossier and /decision-order: Compile a risk-scored case dossier and draft a determination order
- PUT /api/verification/tasks/{id}/decision: Approve, reject, or request revision with a rejection code
- POST /api/verification/tasks/bulk-verify: Decide several queued tasks in one call
- GET /api/audit-logs: Searchable audit trail by performer, action, or recency
