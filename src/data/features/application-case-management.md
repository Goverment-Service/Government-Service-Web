---
title: Application & Case Management
icon: FileText
order: 3
group: agent3
homeFeatured: true
summary: Dynamic application forms, staged submissions with document uploads, and Agent 3's pre-filled drafts.
---

- POST /api/ActionAgent/draft and /orchestrate: Agent 3 calculates the fee, proposes an appointment slot, and pre-fills the form
- POST /api/templates/create: Officers build dynamic application templates, optionally linked to a catalog service
- GET /api/applications/form/{serviceId} and /stages/{serviceId}: Load the form and stage list for a service
- POST /api/applications/documents: Upload supporting documents for a submission
- POST /api/applications/submit-stage: Submit one workflow stage; Agent 4 validates it on the way in
- POST /api/applications/{id}/finalize: Finalize a completed multi-stage application
