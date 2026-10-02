// GENERATED FILE — do not edit directly.
// Source of truth: the GitHub Releases API for Goverment-Service/Government_Service_Navigator, cached at src/data/changelog-cache.json.
// Regenerate with `npm run generate:content`.

export type ChangelogBlock =
  | {type: 'paragraph'; text: string}
  | {type: 'list'; items: string[]};

export type ChangelogSection = {
  heading: string;
  blocks: ChangelogBlock[];
};

export type ChangelogRelease = {
  slug: string;
  version: string;
  name: string;
  date: string;
  tag: string;
  prerelease: boolean;
  githubUrl: string;
  summary: string;
  contributors: string[];
  sections: ChangelogSection[];
};

const changelog: ChangelogRelease[] = [
  {
    "slug": "v3.0.1",
    "version": "v3.0.1",
    "name": "LankaServe v3.0.1",
    "date": "2026-10-02",
    "tag": "v3.0.1",
    "prerelease": false,
    "githubUrl": "https://github.com/Goverment-Service/Government_Service_Navigator/releases/tag/v3.0.1",
    "summary": "This patch release removes the demo data from the admin, finance and mobile screens so they show only live records, fixes document attachment linking for uploads made from the browser, and adds automated test suites for the backend, AI agents, web portal and mobile app. ### Fixes ### Testing ### Documentation Full changelog: https://github.com/Goverment-Service/Government_Service_Navigator/compare/v3.0.0...v3.0.1",
    "contributors": [
      "Krishmal2004"
    ],
    "sections": []
  },
  {
    "slug": "v3.0.0",
    "version": "v3.0.0",
    "name": "LankaServe v3.0.0",
    "date": "2026-10-02",
    "tag": "v3.0.0",
    "prerelease": false,
    "githubUrl": "https://github.com/Goverment-Service/Government_Service_Navigator/releases/tag/v3.0.0",
    "summary": "This major release rebrands the mobile app as LankaServe, keeps citizens signed in between app launches, and makes the AI verification pipeline much stricter about which documents belong to which workflow stage. It also adds a service picker and search across the admin portal, and brings the web and mobile codebases back to a clean lint and analyzer state. ### Highlights ### AI agents and verification ### Backend ### Web portal ### Mobile app ### Documentation ### Upgrade notes Full changelog: h",
    "contributors": [
      "Krishmal2004"
    ],
    "sections": []
  }
];

export default changelog;
