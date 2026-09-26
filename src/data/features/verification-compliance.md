---
title: Verification & Compliance
icon: ShieldCheck
order: 4
group: agent4
homeFeatured: true
summary: Agent 4's validation and duplicate screening, then the human officer review queue and its audit trail.
---

- Agent 4 validates the draft schema, enforces a minimum legal age, and blocks duplicate submissions
- GET /api/verification/tasks/pending: The officer's department-scoped review queue
- GET and POST /api/verification/tasks/{id}/agent-draft: Review and revise the agent-prepared draft
- PUT /api/verification/tasks/{id}/decision: Approve, reject, or request revision with a rejection code
- POST /api/verification/tasks/bulk-verify: Decide several queued tasks in one call
- GET /api/audit-logs: Searchable audit trail by performer, action, or recency
