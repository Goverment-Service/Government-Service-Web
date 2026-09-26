import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {GitBranch, GitPullRequest, Bug, ShieldAlert, type LucideProps} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import {GITHUB_URL} from '@site/src/data/site';
import styles from './community.module.css';

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
    desc: 'Set up the dev environment, branch off main, and open a PR using the repo\'s pull request template. CI runs per app (backend, web, mobile, agentic AI) on every PR.',
    linkLabel: 'Local Development Setup',
    linkTo: '/docs/contributing',
  },
  {
    icon: GitPullRequest,
    title: 'Review work in progress',
    desc: 'Feature branches land through pull requests reviewed by the component owners listed in CODEOWNERS.',
    linkLabel: 'Open pull requests',
    linkHref: `${GITHUB_URL}/pulls`,
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
    desc: 'Please don\'t open a public issue for a vulnerability. Contact the maintainers privately through GitHub instead - see the repository\'s Security tab.',
    linkLabel: 'Open the Security tab',
    linkHref: `${GITHUB_URL}/security`,
  },
];

export default function Community(): React.ReactElement {
  return (
    <Layout
      title="Community"
      description="Government Service Navigator is built in the open. Here's how to contribute code, follow the work, report a bug, or reach the maintainers.">
      <SeoHead
        path="/community"
        title="Community - Contribute, Ask, or Report"
        description="Government Service Navigator is built in the open. Here's how to contribute code, follow the work, report a bug, or reach the maintainers."
      />
      <header className="os-page-header">
        <div className="os-container">
          <div className={styles.introInner}>
            <h1 className={`os-heading ${styles.title}`}>Get involved</h1>
            <p className={`os-lead ${styles.lead}`}>
              Government Service Navigator is an SE3090 group project built in the open. There&apos;s no
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
                    <Link className={styles.channelLink} to={c.linkTo || '#'}>
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
            A four-person team, each owning one component and one agent (see the Architecture docs) - see the{' '}
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
