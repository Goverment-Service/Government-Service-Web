// GENERATED FILE — do not edit directly.
// Source of truth: src/data/features/*.md
// Regenerate with `npm run generate:content`.

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
  | 'Bot';

export type FeatureGroup = 'foundation' | 'structure' | 'people' | 'operations';

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
    "slug": "school-management",
    "title": "School Management",
    "icon": "Building2",
    "order": 1,
    "group": "foundation",
    "homeFeatured": true,
    "summary": "The school profile and the first-run Setup wizard that gets a fresh instance from empty to operational.",
    "items": [
      "Guided School Setup wizard: school details → houses → grades → classes → mediums",
      "One authoritative school profile: name, address, contact info, inline logo",
      "Editable grade range (1-13) the school runs",
      "Resumable and idempotent - safe to skip steps and finish later from Settings"
    ]
  },
  {
    "slug": "identity-security",
    "title": "Identity & Password Lifecycle",
    "icon": "KeyRound",
    "order": 2,
    "group": "foundation",
    "homeFeatured": false,
    "summary": "Account provisioning and password lifecycle, backed by ThunderID.",
    "items": [
      "Every account authenticates through ThunderID - no locally stored login password",
      "NIC-based default passwords for teachers/guardians, index-number defaults for students",
      "Forced first-login password change via a full-page interstitial",
      "Self-service \"Forgot password?\" with a short-lived, single-use reset token",
      "Rate limiting, security headers, and CORS allow-listing API-wide"
    ]
  },
  {
    "slug": "roles-positions",
    "title": "Roles & Positions",
    "icon": "IdCard",
    "order": 3,
    "group": "foundation",
    "homeFeatured": false,
    "summary": "An in-app leadership hierarchy layered on top of the four ThunderID roles.",
    "items": [
      "Four base roles from ThunderID: admin, teacher, student, parent",
      "In-app position hierarchy: Principal → Vice Principal → Section Head → Class Teacher → Subject Teacher → Teacher",
      "Position determines notification reach and dashboard framing",
      "Principal/Vice Principal are permanent; Section Head/Class Teacher/Subject Teacher are year-scoped"
    ]
  },
  {
    "slug": "audit-log",
    "title": "Audit Log",
    "icon": "History",
    "order": 4,
    "group": "foundation",
    "homeFeatured": false,
    "summary": "An append-only record of sensitive changes, with actor and before/after state.",
    "items": [
      "House reassignments, attendance-lock overrides, and other sensitive actions logged",
      "Actor, before/after state, and an optional reason recorded per entry",
      "Admin-only, readable from Settings → Audit Log"
    ]
  },
  {
    "slug": "academic-year-management",
    "title": "Academic Year Management",
    "icon": "Calendar",
    "order": 5,
    "group": "structure",
    "homeFeatured": false,
    "summary": "Create academic years and flip exactly one to current - the scope almost every other module reads.",
    "items": [
      "Create and list academic years",
      "Set the single current academic year",
      "View every class tied to a given year",
      "Delete academic years"
    ]
  },
  {
    "slug": "grade-class-management",
    "title": "Grades & Classes",
    "icon": "GraduationCap",
    "order": 6,
    "group": "structure",
    "homeFeatured": false,
    "summary": "The full Grade 1-13 flow, with lettered class sections per grade.",
    "items": [
      "Model the full flow from Grade 1 to Grade 13, not just A/Level",
      "Covers Scholarship years (1-5), O/Level (10-11), and A/Level (12-13)",
      "Lettered class sections per grade (10-A, 10-B, …)",
      "Form and subject teacher assignment per class",
      "Full enrollment control: enroll and remove students"
    ]
  },
  {
    "slug": "stream-management",
    "title": "Streams & Stream Groups",
    "icon": "Waves",
    "order": 7,
    "group": "structure",
    "homeFeatured": false,
    "summary": "A/L streams and stream groups for Grade 12/13.",
    "items": [
      "Model streams like Physical Science, Bio Science, Commerce, Arts, Technology",
      "Editable short codes and section counts (12-M1, 13-C1, …)",
      "Stream groups for finer subject grouping (e.g. Physical vs. Bio Science)",
      "Section Head / teacher-in-charge assignment per grade or grade+stream"
    ]
  },
  {
    "slug": "medium-management",
    "title": "Mediums",
    "icon": "Languages",
    "order": 8,
    "group": "structure",
    "homeFeatured": false,
    "summary": "Sinhala, Tamil, English, or custom languages of instruction.",
    "items": [
      "Add Sinhala/Tamil/English or fully custom mediums",
      "Optionally pin a class to a medium",
      "Medium-pinned classes are excluded from promotion's auto-fill pools",
      "Medium-pinned students carry straight over to the same-medium class next grade"
    ]
  },
  {
    "slug": "subject-curriculum",
    "title": "Subjects & Curriculum",
    "icon": "BookOpen",
    "order": 9,
    "group": "structure",
    "homeFeatured": false,
    "summary": "The subject catalogue, curriculum levels, and elective selection groups.",
    "items": [
      "Subject catalogue: name and code",
      "Per-grade curriculum levels and selection groups",
      "Subject buckets for elective choices (e.g. \"choose 3 of these 6\")",
      "Per-student subject enrollment and selection tracking"
    ]
  },
  {
    "slug": "student-management",
    "title": "Student Management",
    "icon": "UserRound",
    "order": 10,
    "group": "people",
    "homeFeatured": false,
    "summary": "Student profiles, enrollment, and an 8-tab detail view covering their full school record.",
    "items": [
      "Profile, enrollment status, house, and up to 2 guardians per student",
      "8-tab detail view: Profile, Guardians, Subject Enrollment, Progress Reports, Activities, Leadership & Awards, Disciplinary, Records",
      "Shared guardians supported for siblings"
    ]
  },
  {
    "slug": "teacher-management",
    "title": "Teacher Management",
    "icon": "UserCog",
    "order": 11,
    "group": "people",
    "homeFeatured": false,
    "summary": "Teacher profiles, employment status, and position assignment.",
    "items": [
      "Profile: title, gender, NIC, auto-assigned employee number",
      "Employment status: active, resigned, transferred",
      "House and in-app position assignment",
      "Form and subject teacher assignment across classes"
    ]
  },
  {
    "slug": "guardian-management",
    "title": "Guardian Management",
    "icon": "UsersRound",
    "order": 12,
    "group": "people",
    "homeFeatured": true,
    "summary": "A searchable guardian directory with notification history and portal-login status.",
    "items": [
      "Dedicated, searchable directory - not just inline on a student page",
      "Notification history and portal-login status per guardian",
      "Shared guardians across siblings, linked from each child's Guardians tab",
      "Delete blocked while a guardian is still linked to a student"
    ]
  },
  {
    "slug": "non-academic-staff",
    "title": "Non-academic Staff",
    "icon": "Briefcase",
    "order": 13,
    "group": "people",
    "homeFeatured": false,
    "summary": "Lab assistants, librarians, office staff, and other non-teaching roles.",
    "items": [
      "Lab Assistant, Librarian, Office Staff, Development Officer, IT Officer, Security, Minor Employee",
      "Profiles with no login/IDP account",
      "Shares the employee-number sequence with teachers"
    ]
  },
  {
    "slug": "house-management",
    "title": "Houses",
    "icon": "House",
    "order": 14,
    "group": "people",
    "homeFeatured": false,
    "summary": "Named houses that students and staff self-balance into automatically.",
    "items": [
      "Named houses with an editable color",
      "Least-populated-house-with-random-tiebreak auto-assignment",
      "Manual reassignment, audit-logged"
    ]
  },
  {
    "slug": "prefect-board",
    "title": "Prefect Board",
    "icon": "Trophy",
    "order": 15,
    "group": "people",
    "homeFeatured": false,
    "summary": "Rank-based prefect appointments per academic year, with a read-only archive of past years.",
    "items": [
      "Rank-based appointments: Head Prefect down to House Captain / Vice House Captain",
      "Scoped per academic year",
      "Year selector switches past years into a read-only archive"
    ]
  },
  {
    "slug": "societies",
    "title": "Societies",
    "icon": "Flag",
    "order": 16,
    "group": "people",
    "homeFeatured": false,
    "summary": "Clubs and societies with a teacher-in-charge and a five-role student roster, archived by year.",
    "items": [
      "Science Society, Interact/Leo Club, Scouts, and other clubs, each with an admin-assigned Teacher-in-Charge",
      "Five-role student roster: Leader, Deputy Leader, Secretary, Treasurer, Member",
      "Year-scoped, with the same read-only past-year archive view as the prefect board",
      "Teacher-in-Charge manages their own society's roster from a \"My Society\" page; admins can manage any society"
    ]
  },
  {
    "slug": "attendance-management",
    "title": "Attendance Management",
    "icon": "CalendarCheck",
    "order": 17,
    "group": "operations",
    "homeFeatured": true,
    "summary": "Daily sessions for students and staff, with locking and guardian notifications.",
    "items": [
      "Per-class daily sessions: present/absent/late/excused",
      "Sessions lock 24 hours after creation; admin override is audit-logged",
      "Guardian notification on a newly-marked absence",
      "Separate staff attendance covering teachers and non-academic staff"
    ]
  },
  {
    "slug": "academic-records",
    "title": "Academic Records",
    "icon": "FileText",
    "order": 18,
    "group": "operations",
    "homeFeatured": false,
    "summary": "Term marks and a full student portfolio - reports, activities, leadership, awards, discipline.",
    "items": [
      "School's term/semester structure per academic year",
      "Per-subject term marks with aggregate ranking",
      "Progress reports, activities, leadership roles, awards, and disciplinary records per student"
    ]
  },
  {
    "slug": "promotion-class-reassignment",
    "title": "Promotion & Class Reassignment",
    "icon": "Shuffle",
    "order": 19,
    "group": "operations",
    "homeFeatured": true,
    "summary": "Preview-then-commit promotion between academic years, with marks-based or random auto-fill.",
    "items": [
      "Preview computes each student's next grade and a same-class/medium carryover suggestion",
      "Distribute-by-marks or assign-randomly bulk-assist per grade group",
      "Every assignment individually overridable before commit",
      "Nothing visible until the target year is separately flipped to current"
    ]
  },
  {
    "slug": "timetable",
    "title": "Timetable",
    "icon": "CalendarClock",
    "order": 20,
    "group": "operations",
    "homeFeatured": true,
    "summary": "A config → build → review → publish pipeline, one class at a time.",
    "items": [
      "Timetable Settings, Grade Sections, Classrooms, and Subject Period Requirements",
      "Grid editor with clash/availability/requirement validation",
      "Submit for Review → Section Head Approve/Reject → Publish",
      "Revise a published timetable into a new chained draft"
    ]
  },
  {
    "slug": "notifications",
    "title": "Notifications",
    "icon": "Bell",
    "order": 21,
    "group": "operations",
    "homeFeatured": true,
    "summary": "In-app notifications with role-scoped recipient targeting and a per-user Notification Center.",
    "items": [
      "Shared composer for admins and teachers, scoped server-side by role",
      "Recipient rules: Everyone, By Grade, By Class, By Grade Section, By Subject, or a specific person",
      "Send now or save as draft",
      "Notification Center with Unread/Read/Archived tabs and search"
    ]
  },
  {
    "slug": "reports-analytics",
    "title": "Reports & Analytics",
    "icon": "BarChart3",
    "order": 22,
    "group": "operations",
    "homeFeatured": false,
    "summary": "PDF report export and an aggregate analytics dashboard.",
    "items": [
      "PDF export: Attendance and Marks templates, admin-only",
      "Analytics dashboard: enrollment, attendance trends, performance, notification and timetable stats",
      "Rendered as stat tiles and lightweight charts, no charting library dependency"
    ]
  },
  {
    "slug": "automation",
    "title": "Automation & Watchers",
    "icon": "Bot",
    "order": 23,
    "group": "operations",
    "homeFeatured": false,
    "summary": "Scheduled background jobs that watch for data issues and nightly-back up the database, without sitting on any request's critical path.",
    "items": [
      "15 scheduled jobs covering nightly backups, data-consistency watchers, and cleanup tasks",
      "Findings surface as dismissible banners on the relevant admin page, plus a central Automation panel",
      "Every job independently toggleable except the nightly backup, which is always on",
      "Runs on its own schedule or via an admin-triggered \"Run now\" - never as part of a page load"
    ]
  }
];

export default features;
