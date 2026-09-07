import {readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const outDir = join(dataDir, 'generated');

const CHANGELOG_OWNER = 'openschool-org';
const CHANGELOG_REPO = 'openschool';

function generateFeatures() {
  const featuresDir = join(dataDir, 'features');
  const outFile = join(outDir, 'features.ts');

  const files = readdirSync(featuresDir).filter((f) => f.endsWith('.md'));

  const items = files.map((file) => {
    const raw = readFileSync(join(featuresDir, file), 'utf8');
    const {data, content} = matter(raw);
    const items = content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('- '))
      .map((line) => line.slice(2).trim());

    return {
      slug: file.replace(/\.md$/, ''),
      title: data.title,
      icon: data.icon,
      order: data.order,
      group: data.group,
      homeFeatured: Boolean(data.homeFeatured),
      summary: data.summary,
      items,
    };
  });

  items.sort((a, b) => a.order - b.order);

  const banner = '// GENERATED FILE — do not edit directly.\n// Source of truth: src/data/features/*.md\n// Regenerate with `npm run generate:content`.\n\n';

  const body = `export type FeatureIcon =
${[...new Set(items.map((i) => `  | '${i.icon}'`))].join('\n')};

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

const features: Feature[] = ${JSON.stringify(items, null, 2)};

export default features;
`;

  writeFileSync(outFile, banner + body);
  console.log(`Generated ${outFile} from ${items.length} markdown files.`);
}

function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .trim();
}

// GitHub release bodies are one freeform markdown blob of `## `-headed
// sections mixing prose paragraphs and bullet lists, in whatever order the
// author wrote them (often a lead-in paragraph, then a list, then a closing
// paragraph) - each section is kept as an ordered list of paragraph/list
// blocks so that order survives, instead of bucketing all paragraphs before
// all items. The very first section's prose is lifted out to use as the
// card's lead summary so it isn't shown twice.
function parseGithubBody(body) {
  const preHeadingLines = [];
  const sections = [];
  let current = null;
  let sawHeading = false;

  const addBlock = (blocks, block) => {
    const last = blocks[blocks.length - 1];
    if (block.type === 'list' && last?.type === 'list') {
      last.items.push(...block.items);
    } else {
      blocks.push(block);
    }
  };

  for (const rawLine of (body || '').replace(/\r\n/g, '\n').split('\n')) {
    const line = rawLine.trim();
    if (line.startsWith('## ')) {
      sawHeading = true;
      current = {heading: stripMarkdown(line.slice(3)), blocks: []};
      sections.push(current);
    } else if (line.startsWith('# ')) {
      // top-level title - not a section
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (current) addBlock(current.blocks, {type: 'list', items: [stripMarkdown(line.slice(2))]});
    } else if (current) {
      if (line) addBlock(current.blocks, {type: 'paragraph', text: stripMarkdown(line)});
    } else if (!sawHeading && line) {
      preHeadingLines.push(stripMarkdown(line));
    }
  }

  const usableSections = sections.filter((s) => s.blocks.length > 0);

  let summary = preHeadingLines.join(' ');
  let cardSections = usableSections;
  const firstSectionProse = usableSections[0]?.blocks.filter((b) => b.type === 'paragraph');
  if (!summary && firstSectionProse?.length) {
    summary = firstSectionProse.map((b) => b.text).join(' ');
    cardSections = usableSections.slice(1);
  }

  // Keep sections that actually list concrete changes; drop purely narrative
  // ones (e.g. "Project Status", "Open Source", "What's Next") that read
  // like blog copy rather than a changelog entry. "Contributors" is also
  // dropped here even when hand-written with bullets, since the page
  // already builds its own contributor row from @mentions anywhere in the
  // body - keeping it too would just duplicate that as a plain list.
  cardSections = cardSections.filter(
    (s) => s.blocks.some((b) => b.type === 'list') && !/^contributors$/i.test(s.heading),
  );

  return {
    summary: summary.replace(/\s+/g, ' ').slice(0, 500),
    sections: cardSections,
  };
}

async function fetchGithubReleases() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'openschool-web-build',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const res = await fetch(
    `https://api.github.com/repos/${CHANGELOG_OWNER}/${CHANGELOG_REPO}/releases?per_page=100`,
    {headers},
  );
  if (!res.ok) {
    throw new Error(`GitHub API responded with ${res.status} ${res.statusText}`);
  }

  const raw = await res.json();

  return raw
    .filter((r) => !r.draft)
    .map((r) => {
      const {summary, sections} = parseGithubBody(r.body);
      const mentions = [...(r.body || '').matchAll(/@([a-zA-Z0-9-]+)/g)].map((m) => m[1]);
      const contributors = [...new Set([r.author?.login, ...mentions].filter(Boolean))];

      return {
        slug: r.tag_name,
        version: r.tag_name,
        name: r.name || r.tag_name,
        date: (r.published_at || r.created_at).slice(0, 10),
        tag: r.tag_name,
        prerelease: Boolean(r.prerelease),
        githubUrl: r.html_url,
        summary,
        contributors,
        sections,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

async function generateChangelog() {
  const outFile = join(outDir, 'changelog.ts');
  const cacheFile = join(dataDir, 'changelog-cache.json');

  let releases;
  try {
    releases = await fetchGithubReleases();
    writeFileSync(cacheFile, JSON.stringify(releases, null, 2) + '\n');
    console.log(`Fetched ${releases.length} releases from GitHub (${CHANGELOG_OWNER}/${CHANGELOG_REPO}) and refreshed the cache.`);
  } catch (err) {
    if (existsSync(cacheFile)) {
      releases = JSON.parse(readFileSync(cacheFile, 'utf8'));
      console.warn(`Could not fetch releases from GitHub (${err.message}). Falling back to ${cacheFile}.`);
    } else {
      releases = [];
      console.warn(`Could not fetch releases from GitHub (${err.message}) and no cache exists - changelog will be empty.`);
    }
  }

  const banner = `// GENERATED FILE — do not edit directly.\n// Source of truth: the GitHub Releases API for ${CHANGELOG_OWNER}/${CHANGELOG_REPO}, cached at src/data/changelog-cache.json.\n// Regenerate with \`npm run generate:content\`.\n\n`;

  const body = `export type ChangelogBlock =
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

const changelog: ChangelogRelease[] = ${JSON.stringify(releases, null, 2)};

export default changelog;
`;

  writeFileSync(outFile, banner + body);
  console.log(`Generated ${outFile} from ${releases.length} releases.`);
}

mkdirSync(outDir, {recursive: true});
generateFeatures();
await generateChangelog();
