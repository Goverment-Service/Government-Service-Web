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
    "summary": "The service catalog, eligibility rules, and the Intake & Planning agent that matches a citizen's need to a service.",
    "items": [
      "POST /api/IntakeAgent/ask: Agent 1 turns a free-text need into a matched service and step plan (pgvector retrieval)",
      "POST /api/services and PUT /api/services/{id}: Department Admin creates and edits a service procedure",
      "PUT /api/services/{id}/eligibility-rules, /documents, /fees: Manage the rules, document checklist, and fee schedule",
      "PUT /api/services/{id}/workflow: Define the multi-stage workflow a service moves through",
      "POST /api/services/eligibility-score: Score a citizen profile against a service's rules — match % plus missing criteria",
      "DELETE /api/services/{id}: Retire a procedure (soft delete)"
    ]
  },
  {
    "slug": "payments-orchestration",
    "title": "Eligibility, Payments & Analytics",
    "icon": "CreditCard",
    "order": 2,
    "group": "agent2",
    "homeFeatured": true,
    "summary": "Agent 2's eligibility and document analysis, plus payments, refunds, installments, and financial analytics.",
    "items": [
      "POST /api/EligibilityAgent/evaluate and /orchestrate: Agent 2 checks eligibility and missing documents, then runs the pipeline",
      "POST /api/payments/checkout: Stripe Checkout for online fees, alongside bank deposit-slip and online-reference payments",
      "GET /api/payments/{id}/ledger: Full ledger for a payment — fee breakdown, partial payments, refund history",
      "PUT /api/payments/{id}/installment-plan: Split a fee into installments, monitored by a background service",
      "POST /api/refunds: Citizen refund request, then approve → process → complete by finance staff",
      "GET /api/analytics/{daily|weekly|monthly|yearly} and POST /api/analytics/anomaly-detection: Reports and anomaly flags for review"
    ]
  },
  {
    "slug": "application-case-management",
    "title": "Application & Case Management",
    "icon": "FileText",
    "order": 3,
    "group": "agent3",
    "homeFeatured": true,
    "summary": "Dynamic application forms, staged submissions with document uploads, and Agent 3's pre-filled drafts.",
    "items": [
      "POST /api/ActionAgent/draft and /orchestrate: Agent 3 calculates the fee, proposes an appointment slot, and pre-fills the form",
      "POST /api/templates/create: Officers build dynamic application templates, optionally linked to a catalog service",
      "GET /api/applications/form/{serviceId} and /stages/{serviceId}: Load the form and stage list for a service",
      "POST /api/applications/documents: Upload supporting documents for a submission",
      "POST /api/applications/submit-stage: Submit one workflow stage; Agent 4 validates it on the way in",
      "POST /api/applications/{id}/finalize: Finalize a completed multi-stage application"
    ]
  },
  {
    "slug": "verification-compliance",
    "title": "Verification & Compliance",
    "icon": "ShieldCheck",
    "order": 4,
    "group": "agent4",
    "homeFeatured": true,
    "summary": "Agent 4's validation and duplicate screening, then the human officer review queue and its audit trail.",
    "items": [
      "Agent 4 validates the draft schema, enforces a minimum legal age, and blocks duplicate submissions",
      "GET /api/verification/tasks/pending: The officer's department-scoped review queue",
      "GET and POST /api/verification/tasks/{id}/agent-draft: Review and revise the agent-prepared draft",
      "PUT /api/verification/tasks/{id}/decision: Approve, reject, or request revision with a rejection code",
      "POST /api/verification/tasks/bulk-verify: Decide several queued tasks in one call",
      "GET /api/audit-logs: Searchable audit trail by performer, action, or recency"
    ]
  }
];

export default features;
