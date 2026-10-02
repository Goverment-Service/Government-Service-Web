---
title: Service Catalog & Intake
icon: ClipboardList
order: 1
group: agent1
homeFeatured: true
summary: The service catalog, departments, eligibility rules, and the Intake & Planning agent that matches a citizen's need to a service.
---

- POST /api/IntakeAgent/ask: Agent 1 turns a free-text need into a matched service, document list, and step plan, grounded in the live catalog
- POST /api/services and PUT /api/services/{id}: Department Admin creates and edits a service procedure, with a searchable procedure picker
- PUT /api/services/{id}/eligibility-rules, /documents, /fees: Manage the rules, document checklist, and fee schedule
- PUT /api/services/{id}/workflow: Define the ordered departments a multi-stage service moves through
- POST /api/services/eligibility-score: Score a citizen profile against a service's rules — match % plus missing criteria
- POST /api/departments: System Admin creates departments; one goes active only once it has a Verifying Officer and a Finance Officer
- POST /api/RagSetup/upload-policy: Attach policy documents to a service for the agents' pgvector knowledge base
