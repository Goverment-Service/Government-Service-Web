// GENERATED FILE — do not edit directly.
// Source of truth: src/data/features/*.md
// Regenerate with `npm run generate:content`.

export type FeatureIcon =
  | 'ClipboardList'
  | 'CreditCard'
  | 'FileText'
  | 'ShieldCheck';

export type FeatureGroup = 'agent1' | 'agent2' | 'agent3' | 'agent4';

export type Feature = {
  slug: string;
  title: string;
  icon: FeatureIcon;
  order: number;
  group: FeatureGroup;
  homeFeatured: boolean;
  summary: string;
  items: string[];
};

const features: Feature[] = [
  {
    "slug": "catalog-eligibility",
    "title": "Service Catalog & Intake",
    "icon": "ClipboardList",
    "order": 1,
    "group": "agent1",
    "homeFeatured": true,
    "summary": "The service catalog, departments, eligibility rules, and the Intake & Planning agent that matches a citizen's need to a service.",
    "items": [
      "POST /api/IntakeAgent/ask: Agent 1 turns a free-text need into a matched service, document list, and step plan, grounded in the live catalog",
      "POST /api/services and PUT /api/services/{id}: Department Admin creates and edits a service procedure, with a searchable procedure picker",
      "PUT /api/services/{id}/eligibility-rules, /documents, /fees: Manage the rules, document checklist, and fee schedule",
      "PUT /api/services/{id}/workflow: Define the ordered departments a multi-stage service moves through",
      "POST /api/services/eligibility-score: Score a citizen profile against a service's rules — match % plus missing criteria",
      "POST /api/departments: System Admin creates departments; one goes active only once it has a Verifying Officer and a Finance Officer",
      "POST /api/RagSetup/upload-policy: Attach policy documents to a service for the agents' pgvector knowledge base"
    ]
  },
  {
    "slug": "payments-orchestration",
    "title": "Eligibility, Payments & Analytics",
    "icon": "CreditCard",
    "order": 2,
    "group": "agent2",
    "homeFeatured": true,
    "summary": "Agent 2's stage-scoped eligibility and document analysis, plus payments, refunds, installments, and financial analytics.",
    "items": [
      "POST /api/EligibilityAgent/evaluate and /orchestrate: Agent 2 checks eligibility and the current stage's documents, flagging uploads that look unrelated",
      "POST /api/payments/checkout: Stripe Checkout for online stage fees, alongside bank deposit slips verified by Finance",
      "GET /api/payments/{id}/ledger: Full ledger for a payment — fee breakdown, partial payments, refund history",
      "PUT /api/payments/{id}/installment-plan: Split a fee into installments, each payable by card or bank transfer receipt",
      "POST /api/refunds: Citizen refund request, then approve → process → complete by department-scoped finance staff",
      "GET /api/analytics/{daily|weekly|monthly|yearly} and POST /api/anomalies/scan: Reports and anomaly flags for review"
    ]
  },
  {
    "slug": "application-case-management",
    "title": "Application & Case Management",
    "icon": "FileText",
    "order": 3,
    "group": "agent3",
    "homeFeatured": true,
    "summary": "Dynamic multi-stage forms, document uploads, saved drafts, Agent 3's pre-filled drafts, and natural-language collection bookings.",
    "items": [
      "POST /api/ActionAgent/draft and /orchestrate: Agent 3 calculates the stage fee, proposes an appointment slot, and pre-fills the form",
      "POST /api/ActionAgent/book-appointment: Book or reschedule a collection appointment in plain language against live slot capacity",
      "POST /api/templates/create: Officers build dynamic application templates, linked to a catalog service and its stages",
      "GET /api/applications/form/{serviceId} and /stages/{serviceId}: Load the form and stage list for a service",
      "POST /api/applications/documents and /save-draft: Upload supporting documents and save a stage to finish later",
      "POST /api/applications/submit-stage: Submit one workflow stage; Agent 4 validates it on the way in",
      "/api/admin/collection-slots: Department Admin manages weekly counter hours, holidays, and a real-time daily timeline"
    ]
  },
  {
    "slug": "verification-compliance",
    "title": "Verification & Compliance",
    "icon": "ShieldCheck",
    "order": 4,
    "group": "agent4",
    "homeFeatured": true,
    "summary": "Agent 4's validation and safety guardrails, then the human officer review queue, case dossier, and audit trail.",
    "items": [
      "Agent 4 validates the NIC and schema, enforces a minimum legal age, masks PII, screens for prompt injection, and flags duplicates for the officer",
      "GET /api/verification/tasks/pending: The officer's department-scoped review queue, updated live over SignalR",
      "POST /api/verification/tasks/{id}/agent-draft: Run Agents 2 and 3 on an application and store the draft for review",
      "POST /api/ValidationAgent/dossier and /decision-order: Compile a risk-scored case dossier and draft a determination order",
      "PUT /api/verification/tasks/{id}/decision: Approve, reject, or request revision with a rejection code",
      "POST /api/verification/tasks/bulk-verify: Decide several queued tasks in one call",
      "GET /api/audit-logs: Searchable audit trail by performer, action, or recency"
    ]
  }
];

export default features;
