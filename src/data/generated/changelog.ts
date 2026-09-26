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

const changelog: ChangelogRelease[] = [];

export default changelog;
