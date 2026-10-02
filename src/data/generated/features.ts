// GENERATED FILE - do not edit directly.
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
      "Describe a need in plain language and get a matched service, document list, and step-by-step plan",
      "Create and edit service procedures, with a searchable procedure picker",
      "Manage each service's eligibility rules, document checklist, and fee schedule",
      "Define the ordered departments a multi-stage service moves through",
      "Score a citizen's profile against a service's rules, with a match percentage and missing criteria",
      "Create departments that go active only once they have a Verifying Officer and a Finance Officer",
      "Attach policy documents to a service so the agents can give policy-aware answers"
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
      "Check eligibility and the current stage's documents, flagging uploads that look unrelated",
      "Pay stage fees online by card through Stripe Checkout",
      "Upload bank deposit slips for Finance Officers to verify",
      "View a full payment ledger with fee breakdown, partial payments, and refund history",
      "Split a fee into installments, each payable by card or bank transfer receipt",
      "Request refunds, reviewed and completed by department finance staff",
      "Daily, weekly, monthly, and yearly reports with anomaly flags for review"
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
      "Agent 3 calculates the stage fee, proposes an appointment slot, and pre-fills the form",
      "Book or reschedule a collection appointment in plain language, or choose postal delivery",
      "Officers build dynamic application form templates linked to a service and its stages",
      "Fill in multi-stage application forms one stage at a time",
      "Upload supporting documents and save a stage as a draft to finish later",
      "Every submitted stage is checked by Agent 4 before it reaches an officer",
      "Manage weekly counter hours, holidays, and a real-time daily collection timeline"
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
      "Validates the NIC and form data, enforces a minimum legal age, and screens for prompt injection",
      "Masks sensitive details and flags duplicate applications for the officer",
      "Department-scoped review queue that updates live",
      "AI-prepared draft, risk-scored case dossier, and draft determination order for each case",
      "Approve, reject, or request revision with a rejection code",
      "Decide several queued applications at once with bulk verification",
      "Searchable audit trail of every officer decision"
    ]
  }
];

export default features;
