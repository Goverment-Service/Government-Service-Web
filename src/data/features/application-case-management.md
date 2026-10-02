---
title: Application & Case Management
icon: FileText
order: 3
group: agent3
homeFeatured: true
summary: Dynamic multi-stage forms, document uploads, saved drafts, Agent 3's pre-filled drafts, and natural-language collection bookings.
---

- POST /api/ActionAgent/draft and /orchestrate: Agent 3 calculates the stage fee, proposes an appointment slot, and pre-fills the form
- POST /api/ActionAgent/book-appointment: Book or reschedule a collection appointment in plain language against live slot capacity
- POST /api/templates/create: Officers build dynamic application templates, linked to a catalog service and its stages
- GET /api/applications/form/{serviceId} and /stages/{serviceId}: Load the form and stage list for a service
- POST /api/applications/documents and /save-draft: Upload supporting documents and save a stage to finish later
- POST /api/applications/submit-stage: Submit one workflow stage; Agent 4 validates it on the way in
- /api/admin/collection-slots: Department Admin manages weekly counter hours, holidays, and a real-time daily timeline
