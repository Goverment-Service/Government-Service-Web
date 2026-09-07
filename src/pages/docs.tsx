import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Layout from '@theme/Layout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Use Vite's ?raw to import the markdown file as a string
import introMd from '../../docs/intro.md?raw';
import setupMd from '../../docs/setup.md?raw';
import contributingMd from '../../docs/contributing.md?raw';
import architectureMd from '../../docs/architecture.md?raw';

function stripFrontmatter(md: string) {
  return md.replace(/^---\n.*?\n---\n/s, '');
}

const docsFiles = {
  '/docs': { title: 'Introduction', content: stripFrontmatter(introMd) },
  '/docs/intro': { title: 'Introduction', content: stripFrontmatter(introMd) },
  '/docs/setup': { title: 'Setup Walkthrough', content: stripFrontmatter(setupMd) },
  '/docs/contributing': { title: 'Local Development Setup', content: stripFrontmatter(contributingMd) },
  '/docs/architecture': { title: 'Architecture', content: stripFrontmatter(architectureMd) },
};

function DocViewer() {
  const location = useLocation();
  const doc = docsFiles[location.pathname as keyof typeof docsFiles] || { title: 'Not Found', content: '# Page Not Found\n\nThe requested documentation page could not be found.' };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px - 200px)' }}>
      {/* Basic Docs Sidebar */}
      <aside style={{ width: '250px', borderRight: '1px solid var(--os-border)', padding: '2rem' }}>
        <h3 style={{ fontFamily: 'var(--os-font-display)', marginBottom: '1rem', fontSize: '1rem', color: 'var(--os-text-muted)' }}>Documentation</h3>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <li><Link to="/docs/intro" style={{ color: location.pathname === '/docs/intro' || location.pathname === '/docs' ? 'var(--os-accent)' : 'var(--os-text)' }}>Introduction</Link></li>
          <li><Link to="/docs/contributing" style={{ color: location.pathname === '/docs/contributing' ? 'var(--os-accent)' : 'var(--os-text)' }}>Local Development Setup</Link></li>
          <li><Link to="/docs/setup" style={{ color: location.pathname === '/docs/setup' ? 'var(--os-accent)' : 'var(--os-text)' }}>Setup Walkthrough</Link></li>
          <li><Link to="/docs/architecture" style={{ color: location.pathname === '/docs/architecture' ? 'var(--os-accent)' : 'var(--os-text)' }}>Architecture</Link></li>
        </ul>
      </aside>

      {/* Doc Content */}
      <main style={{ flex: 1, padding: '2rem 4rem', maxWidth: '800px' }}>
        <div className="markdown-body" style={{ lineHeight: '1.6' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
