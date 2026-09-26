import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Layout from '@theme/Layout';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Use Vite's ?raw to import the markdown file as a string
import introMd from '../../docs/intro.md?raw';
import setupMd from '../../docs/setup.md?raw';
import contributingMd from '../../docs/contributing.md?raw';
import architectureMd from '../../docs/architecture.md?raw';
import adrIndexMd from '../../docs/adr/index.md?raw';

import styles from './docs.module.css';

function stripFrontmatter(md: string) {
  return md.replace(/^---\r?\n.*?\r?\n---\r?\n/s, '');
}

// ADRs are copied verbatim from the main repo's docs/adr/, so their titles
// come from the "# ADR-000N: ..." heading rather than frontmatter.
const adrFiles = import.meta.glob('../../docs/adr/0*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const adrs = Object.entries(adrFiles)
  .map(([file, content]) => {
    const number = file.match(/(\d{4})-[^/]*\.md$/)![1];
    const heading = content.match(/^#\s+ADR-\d+:\s*(.+)$/m)?.[1] ?? `ADR-${number}`;
    return { number, title: heading.replace(/`/g, ''), content: stripFrontmatter(content) };
  })
  .sort((a, b) => a.number.localeCompare(b.number));

type Doc = { title: string; content: string };

const docsFiles: Record<string, Doc> = {
  '/docs': { title: 'Introduction', content: stripFrontmatter(introMd) },
  '/docs/intro': { title: 'Introduction', content: stripFrontmatter(introMd) },
  '/docs/setup': { title: 'Setup Walkthrough', content: stripFrontmatter(setupMd) },
  '/docs/contributing': { title: 'Local Development Setup', content: stripFrontmatter(contributingMd) },
  '/docs/architecture': { title: 'Architecture', content: stripFrontmatter(architectureMd) },
  '/docs/adr': { title: 'Architecture Decisions', content: stripFrontmatter(adrIndexMd) },
  ...Object.fromEntries(adrs.map((a) => [`/docs/adr/${a.number}`, { title: a.title, content: a.content }])),
};

const sidebar = [
  { to: '/docs/intro', label: 'Introduction' },
  { to: '/docs/setup', label: 'Setup Walkthrough' },
  { to: '/docs/contributing', label: 'Local Development Setup' },
  { to: '/docs/architecture', label: 'Architecture' },
  { to: '/docs/adr', label: 'Architecture Decisions' },
];

// Map ADR-relative links ("0004-client-side-department-scoping.md") to their
// routes, and keep internal /docs links inside the router.
function resolveHref(href: string): string {
  const adr = href.match(/(?:^|\/)(\d{4})-[\w-]+\.md(#.*)?$/);
  if (adr) return `/docs/adr/${adr[1]}${adr[2] ?? ''}`;
  return href;
}

const markdownComponents: Components = {
  a({ href = '', children }) {
    const resolved = resolveHref(href);
    if (resolved.startsWith('/')) return <Link to={resolved}>{children}</Link>;
    return (
      <a href={resolved} target={resolved.startsWith('#') ? undefined : '_blank'} rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

function linkColor(active: boolean) {
  return { color: active ? 'var(--os-accent)' : 'var(--os-text)' };
}

function DocViewer() {
  const location = useLocation();
  const path = location.pathname.replace(/\/$/, '') || '/docs';
  const doc = docsFiles[path] || { title: 'Not Found', content: '# Page Not Found\n\nThe requested documentation page could not be found.' };
  const inAdr = path.startsWith('/docs/adr');

  return (
    <div className={styles.docsLayout}>
      {/* Basic Docs Sidebar */}
      <aside className={styles.docsSidebar}>
        <h3 style={{ fontFamily: 'var(--os-font-display)', marginBottom: '1rem', fontSize: '1rem', color: 'var(--os-text-muted)' }}>Documentation</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sidebar.map((item) => (
            <li key={item.to}>
              <Link to={item.to} style={linkColor(path === item.to || (item.to === '/docs/intro' && path === '/docs'))}>{item.label}</Link>
              {item.to === '/docs/adr' && inAdr && (
                <ul style={{ listStyle: 'none', padding: '0.5rem 0 0 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                  {adrs.map((a) => (
                    <li key={a.number}>
                      <Link to={`/docs/adr/${a.number}`} style={linkColor(path === `/docs/adr/${a.number}`)}>
                        {a.number} · {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Doc Content */}
      <main className={styles.docsMain}>
        <div className="markdown-body" style={{ lineHeight: '1.6' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {doc.content}
          </ReactMarkdown>
        </div>
      </main>
    </div>
  );
}

export default function Docs() {
  return (
    <Layout title="Documentation">
      <Routes>
        <Route path="*" element={<DocViewer />} />
      </Routes>
    </Layout>
  );
}
