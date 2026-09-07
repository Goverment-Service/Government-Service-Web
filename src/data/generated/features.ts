export type FeatureIcon =
  | 'Building2'
  | 'KeyRound'
  | 'IdCard'
  | 'History'
  | 'Calendar'
  | 'GraduationCap'
  | 'Waves'
  | 'Languages'
  | 'BookOpen'
  | 'UserRound'
  | 'UserCog'
  | 'UsersRound'
  | 'Briefcase'
  | 'House'
  | 'Trophy'
  | 'Flag'
  | 'CalendarCheck'
  | 'FileText'
  | 'Shuffle'
  | 'CalendarClock'
  | 'Bell'
  | 'BarChart3'
  | 'Bot'
  | 'Search'
  | 'CheckSquare'
  | 'CreditCard'
  | 'ClipboardList';

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
    slug: "catalog-eligibility",
    title: "Catalog & Eligibility Guidance",
    icon: "ClipboardList",
    order: 1,
    group: "agent1",
    homeFeatured: true,
    summary: "Service catalog management and citizen eligibility scoring.",
    items: [
      "POST /api/services: Admin adds a new government service/procedure",
      "GET /api/services/{id}: Fetch procedure details + document checklist",
      "PUT /api/services/{id}/eligibility-rules: Update eligibility criteria for a service",
      "DELETE /api/services/{id}: Retire/deactivate a procedure",
      "POST /api/services/eligibility-score: Scores a citizen's profile against a service's rules, returns match % + missing criteria"
    ]
  },
  {
    slug: "payments-orchestration",
    title: "Payments, Refunds & Analytics (+ Orchestrator)",
    icon: "CreditCard",
    order: 2,
    group: "agent2",
    homeFeatured: true,
    summary: "Financial transactions, analytics, and workflow orchestration.",
    items: [
      "POST /api/payments/{id}/refund-request: Citizen requests a refund on a rejected/withdrawn application — creates an auditable refund case",
      "GET /api/payments/{id}/ledger: Full transaction ledger for a payment: fee breakdown, partial payments, refund history",
      "PUT /api/payments/{id}/installment-plan: Converts a fee into a multi-installment schedule and recalculates due dates/amounts",
      "DELETE /api/report-snapshots/{id}: Remove an outdated saved analytics report",
      "POST /api/analytics/anomaly-detection: Scans payment/usage patterns for anomalies and flags cases for officer review"
    ]
  },
  {
    slug: "application-case-management",
    title: "Application & Case Management",
    icon: "FileText",
    order: 3,
    group: "agent3",
    homeFeatured: true,
    summary: "Application submission, document handling, and slot reservation.",
    items: [
      "POST /api/applications: Citizen submits a new application",
      "GET /api/applications/{id}/status-history: Timeline of status changes for tracking",
      "PUT /api/applications/{id}/documents: Upload/replace a document on an existing application",
      "DELETE /api/applications/{id}: Withdraw a draft/unsubmitted application",
      "POST /api/applications/{id}/reserve-slot: Reserves an appointment slot with concurrency-safe locking"
    ]
  },
  {
    slug: "verification-compliance",
    title: "Verification & Compliance",
    icon: "ShieldCheck",
    order: 4,
    group: "agent4",
    homeFeatured: true,
    summary: "Officer verification tasks, audit trails, and bulk processing.",
    items: [
      "POST /api/verification-tasks: System/agent creates a task for officer review",
      "GET /api/audit-logs?applicationId=: Retrieve full audit trail for a case",
      "PUT /api/verification-tasks/{id}/decision: Officer records approve/reject/revise + reason code",
      "DELETE /api/verification-tasks/{id}: Remove a duplicate/erroneous task",
      "POST /api/verification-tasks/bulk-verify: Officer approves/rejects multiple queued tasks in one call"
    ]
  }
];

export default features;
