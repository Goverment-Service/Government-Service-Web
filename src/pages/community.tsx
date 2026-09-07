import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {GitBranch, MessageCircle, Bug, ShieldAlert, type LucideProps} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import styles from './community.module.css';

const GITHUB_URL = 'https://github.com/openschool-org/openschool';

type Channel = {
  icon: React.ComponentType<LucideProps>;
  title: string;
  desc: string;
  linkLabel: string;
  linkTo?: string;
  linkHref?: string;
};

const channels: Channel[] = [
  {
    icon: GitBranch,
    title: 'Contribute',
    desc: 'Set up the dev environment and open a PR against the development branch - see the Local Development Setup guide and the repo\'s CONTRIBUTING.md for the full workflow.',
    linkLabel: 'Local Development Setup',
    linkTo: '/docs/contributing',
  },
  {
    icon: MessageCircle,
    title: 'Ask a question',
    desc: 'Use GitHub Discussions for questions, ideas, and general conversation about the project.',
    linkLabel: 'Open Discussions',
    linkHref: `${GITHUB_URL}/discussions`,
  },
  {
    icon: Bug,
    title: 'Report a bug',
    desc: 'Found something broken? Open an issue with steps to reproduce, what you expected, and what happened instead.',
    linkLabel: 'Open an issue',
    linkHref: `${GITHUB_URL}/issues`,
  },
  {
    icon: ShieldAlert,
    title: 'Report a security issue',
    desc: 'Please don\'t open a public issue for a vulnerability. Use GitHub\'s private vulnerability reporting (Security tab → Report a vulnerability) instead.',
    linkLabel: 'Read the Security Policy',
    linkHref: `${GITHUB_URL}/blob/main/SECURITY.md`,
  },
];

export default function Community(): React.ReactElement {
  return (
    <Layout
      title="Community"
      description="OpenSchool is built in the open. Here's how to contribute code, ask a question, report a bug, or reach the maintainers.">
      <SeoHead
        path="/community"
        title="Community - Contribute, Ask, or Report"
        description="OpenSchool is built in the open. Here's how to contribute code, ask a question, report a bug, or reach the maintainers."
      />
      <header className="os-page-header">
        <div className="os-container">
          <div className={styles.introInner}>
            <h1 className={`os-heading ${styles.title}`}>Get involved</h1>
            <p className={`os-lead ${styles.lead}`}>
              OpenSchool is built in the open, by volunteers. There&apos;s no sales team and no
              support inbox - everything happens on GitHub.
            </p>
          </div>
        </div>
      </header>

      <section className="os-section os-section--tight">
        <div className="os-container">
          <div className="os-grid os-grid--2">
            {channels.map((c) => (
              <div key={c.title} className={`os-card ${styles.channelCard}`}>
                <div className={styles.channelIcon}>
                  <c.icon size={19} strokeWidth={1.75} />
                </div>
                <div>
                  <div className={styles.channelTitle}>{c.title}</div>
                  <div className={styles.channelValue}>{c.desc}</div>
                  {c.linkHref ? (
                    <a
                      className={styles.channelLink}
                      href={c.linkHref}
                      target="_blank"
                      rel="noopener noreferrer">
                      {c.linkLabel} →
                    </a>
                  ) : (
                    <Link className={styles.channelLink} to={c.linkTo}>
                      {c.linkLabel} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="os-section os-section--alt">
        <div className="os-container">
          <span className="os-eyebrow">Maintainers</span>
          <h2 className="os-heading" style={{marginBottom: '0.5rem'}}>Started and maintained by</h2>
          <p className={styles.channelValue}>
            This project is fully maintained and operated by open source contributors - see the{' '}
            <a href={`${GITHUB_URL}/graphs/contributors`} target="_blank" rel="noopener noreferrer">
              contributors graph
            </a>
            .
          </p>
        </div>
      </section>
    </Layout>
  );
}
