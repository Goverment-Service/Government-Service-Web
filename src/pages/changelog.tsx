import React from 'react';
import Layout from '@theme/Layout';
import {
  ExternalLink,
  Sparkles,
  MapPinned,
  Code2,
  Info,
  Ban,
  Heart,
  Rocket,
  Download,
  FileArchive,
  type LucideProps,
} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import changelog, {type ChangelogRelease} from '@site/src/data/generated/changelog';
import styles from './changelog.module.css';

const GITHUB_URL = 'https://github.com/openschool-org/openschool';

function sourceArchiveUrl(release: ChangelogRelease, ext: 'zip' | 'tar.gz'): string {
  return `${GITHUB_URL}/archive/refs/tags/${release.tag}.${ext}`;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

const sectionIcons: {test: RegExp; icon: React.ComponentType<LucideProps>}[] = [
  {test: /sri lankan|built for/i, icon: MapPinned},
  {test: /technology|tech stack/i, icon: Code2},
  {test: /out of scope/i, icon: Ban},
  {test: /open source/i, icon: Heart},
  {test: /what.s next|roadmap/i, icon: Rocket},
  {test: /status/i, icon: Info},
];

function sectionIcon(heading: string): React.ComponentType<LucideProps> {
  return sectionIcons.find((s) => s.test.test(heading))?.icon ?? Sparkles;
}

export default function Changelog(): React.ReactElement {
  const latest = changelog[0];

  return (
    <Layout
      title="Changelog"
      description="Every OpenSchool release, with what changed and where to get the source.">
      <SeoHead
        path="/changelog"
        title="Changelog - Releases & Version History"
        description="Every OpenSchool release, with what changed and where to get the source."
      />
      <header className="os-page-header">
        <div className="os-container">
          <div className={styles.introInner}>
            <span className="os-eyebrow">Releases</span>
            <h1 className={`os-heading ${styles.title}`}>Changelog</h1>
            <p className={`os-lead ${styles.lead}`}>
              Every OpenSchool release, with what shipped and a link back to the source on GitHub.
            </p>
            {latest ? (
              <div className={styles.introMeta}>
                <span className="os-badge">Latest: {latest.version}</span>
                <span className={styles.introDate}>Released {formatDate(latest.date)}</span>
                <a
                  className="os-btn os-btn--ghost"
                  href={`${GITHUB_URL}/releases`}
                  target="_blank"
                  rel="noopener noreferrer">
                  All releases on GitHub
                  <ExternalLink size={15} strokeWidth={2.25} />
                </a>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section className="os-section os-section--tight">
        <div className="os-container">
          <div className={styles.layout}>
            <nav className={styles.versionNav} aria-label="Release versions">
              <div className={styles.versionNavLabel}>Versions</div>
              <ul className={styles.versionNavList}>
                {changelog.map((release, i) => (
                  <li key={release.slug}>
                    <a href={`#${release.slug}`} className={styles.versionNavLink}>
                      <span>{release.version}</span>
                      {i === 0 ? <span className={styles.versionNavLatest}>Latest</span> : null}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                className={styles.versionNavAll}
                href={`${GITHUB_URL}/releases`}
                target="_blank"
                rel="noopener noreferrer">
                View all on GitHub
                <ExternalLink size={13} strokeWidth={2.25} />
              </a>
            </nav>

            <div className={styles.releaseList}>
              {changelog.map((release, i) => (
                <article
                  key={release.slug}
                  id={release.slug}
                  className={`os-panel ${styles.releaseCard}`}>
                  <div className={styles.releaseHeader}>
                    <div>
                      <div className={styles.releaseVersionRow}>
                        <h2 className={styles.releaseVersion}>{release.version}</h2>
                        {i === 0 ? <span className="os-badge">Latest</span> : null}
                        {release.prerelease ? (
                          <span className={styles.prereleaseBadge}>Pre-release</span>
                        ) : null}
                      </div>
                      <p className={styles.releaseDate}>Released on {formatDate(release.date)}</p>
                    </div>
                    <a
                      className="os-btn os-btn--ghost"
                      href={release.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer">
                      View on GitHub
                      <ExternalLink size={15} strokeWidth={2.25} />
                    </a>
                  </div>

                  <p className={styles.releaseSummary}>{release.summary}</p>

                  <div className={styles.subheading}>Get this release</div>
                  <div className={styles.assetGrid}>
                    <a
                      className={styles.assetCard}
                      href={sourceArchiveUrl(release, 'zip')}
                      target="_blank"
                      rel="noopener noreferrer">
                      <FileArchive size={18} strokeWidth={1.75} />
                      <div>
                        <div className={styles.assetName}>Source code</div>
                        <div className={styles.assetMeta}>zip</div>
                      </div>
                      <Download size={15} strokeWidth={2} className={styles.assetDownloadIcon} />
                    </a>
                    <a
                      className={styles.assetCard}
                      href={sourceArchiveUrl(release, 'tar.gz')}
                      target="_blank"
                      rel="noopener noreferrer">
                      <FileArchive size={18} strokeWidth={1.75} />
                      <div>
                        <div className={styles.assetName}>Source code</div>
                        <div className={styles.assetMeta}>tar.gz</div>
                      </div>
                      <Download size={15} strokeWidth={2} className={styles.assetDownloadIcon} />
                    </a>
                  </div>
                  <p className={styles.assetHint}>
                    OpenSchool is self-hosted - clone the{' '}
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">repository</a>{' '}
                    and follow the <a href="/docs/setup">Setup Guide</a> to run this release.
                  </p>

                  <div className={styles.subheading}>What&apos;s Changed</div>
                  <div className={styles.sectionsList}>
                    {release.sections.map((section) => {
                      const Icon = sectionIcon(section.heading);
                      return (
                        <div key={section.heading} className={styles.sectionBlock}>
                          <div className={styles.sectionHeading}>
                            <Icon size={16} strokeWidth={1.75} />
                            <span>{section.heading}</span>
                          </div>
                          {section.blocks.map((block, blockIndex) =>
                            block.type === 'paragraph' ? (
                              <p key={blockIndex} className={styles.sectionParagraph}>
                                {block.text}
                              </p>
                            ) : (
                              <ul key={blockIndex} className={styles.sectionList}>
                                {block.items.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            ),
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {release.contributors.length > 0 ? (
                    <>
                      <div className={styles.subheading}>
                        Contributors ({release.contributors.length})
                      </div>
                      <div className={styles.contributorRow}>
                        {release.contributors.map((login) => (
                          <a
                            key={login}
                            className={styles.contributor}
                            href={`https://github.com/${encodeURIComponent(login)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={login}>
                            <img
                              className={styles.contributorAvatar}
                              src={`https://github.com/${encodeURIComponent(login)}.png?size=64`}
                              alt={login}
                              loading="lazy"
                              width={32}
                              height={32}
                            />
                            <span>{login}</span>
                          </a>
                        ))}
                      </div>
                    </>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="os-section">
        <div className="os-container">
          <div className={`os-panel ${styles.ctaBanner}`}>
            <div>
              <h2 className="os-heading" style={{marginBottom: '0.5rem'}}>Want the full history?</h2>
              <p className={styles.ctaText}>
                Every release, tag, and diff lives on GitHub - including source downloads.
              </p>
            </div>
            <a
              className="os-btn os-btn--primary"
              href={`${GITHUB_URL}/releases`}
              target="_blank"
              rel="noopener noreferrer">
              Browse releases on GitHub
              <ExternalLink size={17} strokeWidth={2.25} />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
