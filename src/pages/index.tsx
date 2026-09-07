import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ArrowRight, Terminal, GitBranch, Bug, MessageCircle} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import DynamicIcon from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import TechLogos from '@site/src/components/TechLogos';
import features from '@site/src/data/generated/features';
import styles from './index.module.css';

const GITHUB_URL = 'https://github.com/openschool-org/openschool';

function GithubIcon(): React.ReactElement {
  return (
    <svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

const stats = [
  {value: '4', label: 'Role-Based Portals'},
  {value: 'LK', label: 'Built for Sri Lanka'},
];

const badges = [
  {
    label: 'Backend CI',
    href: `${GITHUB_URL}/actions/workflows/backend-ci.yml`,
    src: `${GITHUB_URL}/actions/workflows/backend-ci.yml/badge.svg`,
  },
  {
    label: 'Frontend CI',
    href: `${GITHUB_URL}/actions/workflows/frontend-ci.yml`,
    src: `${GITHUB_URL}/actions/workflows/frontend-ci.yml/badge.svg`,
  },
  {
    label: 'Apache 2.0 License',
    href: `${GITHUB_URL}/blob/main/LICENSE`,
    src: 'https://img.shields.io/badge/license-Apache%202.0-blue.svg',
  },
  {
    label: 'Contributor Covenant 2.1',
    href: `${GITHUB_URL}/blob/main/CODE_OF_CONDUCT.md`,
    src: 'https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg',
  },
];

const services = features.filter((f) => f.homeFeatured);

type CommunityCard = {
  icon: React.ComponentType<{size?: number; strokeWidth?: number}>;
  title: string;
  desc: string;
  linkLabel: string;
  linkTo?: string;
  linkHref?: string;
};

const communityCards: CommunityCard[] = [
  {
    icon: GitBranch,
    title: 'Contribute',
    desc: 'Help shape OpenSchool by submitting features, fixes, or improvements.',
    linkLabel: 'Local Development Setup',
    linkTo: '/docs/contributing',
  },
  {
    icon: Bug,
    title: 'Report an Issue',
    desc: 'Found a bug or have an idea? Open an issue and help make the platform better.',
    linkLabel: 'Open an issue',
    linkHref: `${GITHUB_URL}/issues`,
  },
  {
    icon: MessageCircle,
    title: 'Join the Discussion',
    desc: 'Ask questions, share ideas, and talk with other people running OpenSchool.',
    linkLabel: 'GitHub Discussions',
    linkHref: `${GITHUB_URL}/discussions`,
  },
];

const QUICK_START = `git clone https://github.com/openschool-org/openschool.git
cd openschool

# Postgres
cd backend && docker compose up -d

# Backend - migrations run automatically
go run ./cmd/api/main.go

# Frontend
cd ../frontend && pnpm install && pnpm dev`;

export default function Home(): React.ReactElement {
  const heroPhotoSrc = useBaseUrl('img/school/school1.webp');
  const aboutPhotoSrc1 = useBaseUrl('img/school/school2.webp');
  const aboutPhotoSrc2 = useBaseUrl('img/school/school3.webp');

  return (
    <Layout
      title="OpenSchool"
      description="A free, open-source, self-hosted school management system covering academic years, students, guardians, attendance, timetables, and more — built for Sri Lankan schools.">
      <SeoHead
        path="/"
        title="Open Source School Management for Sri Lankan Schools"
        description="A free, open-source, self-hosted school management system covering academic years, students, guardians, attendance, timetables, and more — built for Sri Lankan schools."
      />

      <header className={styles.hero}>
        <div className="os-container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 className={`os-heading ${styles.heroTitle}`}>
                One platform for your entire school&apos;s records
              </h1>
              <p className={`os-lead ${styles.heroLead}`}>
                Academic years, classes, students, guardians, attendance, and timetables - in one
                self-hosted system. No more spreadsheets. No more paper registers.
              </p>
              <div className={styles.heroActions}>
                <Link className="os-btn os-btn--primary" to="/docs/intro">
                  Get Started
                </Link>
                <a
                  className="os-btn os-btn--ghost"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer">
                  <GithubIcon />
                  View on GitHub
                </a>
              </div>

              <div className={styles.badgeRow}>
                {badges.map((b) => (
                  <a
                    key={b.label}
                    href={b.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={b.label}
                    className={styles.badgeLink}>
                    <img src={b.src} alt={b.label} className={styles.badgeImg} loading="lazy" decoding="async" />
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.heroPhotoWrap}>
              <img
                src={heroPhotoSrc}
                alt="Students at a Sri Lankan school"
                className={styles.heroPhoto}
                width={1536}
                height={1024}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

          <div className={styles.statBar}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <section className="os-section os-section--tight">
        <div className="os-container">
          <Reveal>
            <div className={styles.quickstartGrid}>
              <div className={styles.quickstartCopy}>
                <span className="os-eyebrow">
                  <Terminal size={14} strokeWidth={2.25} style={{verticalAlign: '-2px', marginRight: '0.4rem'}} />
                  Quick Start
                </span>
                <h2 className={`os-heading ${styles.quickstartTitle}`}>
                  Ready to self-host OpenSchool for your school?
                </h2>
                <p className={styles.quickstartText}>
                  Clone the repo, start Postgres, and run the backend and frontend locally in a
                  few commands. The setup guide walks through the rest - first-run admin
                  registration, the school setup wizard, and every module hands-on.
                </p>
                <Link className="os-btn os-btn--primary" to="/docs/setup">
                  Read the Setup Guide
                </Link>
              </div>
              <div className={styles.quickstartCode}>
                <CodeBlock language="bash" title="Run it locally">
                  {QUICK_START}
                </CodeBlock>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="os-section os-section--alt">
        <div className="os-container">
          <Reveal>
            <div className={styles.servicesIntro}>
              <span className="os-eyebrow">What We Automate</span>
              <div className={styles.servicesIntroGrid}>
                <h2 className={`os-heading ${styles.servicesTitle}`}>
                  Every school operation, one platform
                </h2>
                <p className={styles.servicesDesc}>
                  From opening an academic year to marking today&apos;s attendance, OpenSchool
                  replaces disconnected tools with one consistent, API-driven system that scales
                  with your school.
                </p>
              </div>
            </div>

            <div className="os-grid os-grid--3">
              {services.map((s, i) => (
                <div key={s.slug} className={`os-card ${styles.serviceCard}`}>
                  <span className={styles.serviceNumber}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.serviceIcon}>
                    <DynamicIcon name={s.icon} size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.summary}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="os-section os-section--tight">
        <div className="os-container">
          <Reveal>
            <div className={styles.techIntro}>
              <span className="os-eyebrow" style={{textAlign: 'center'}}>
                Built On Open Standards
              </span>
            </div>
            <TechLogos />
          </Reveal>
        </div>
      </section>

      <section className="os-section">
        <div className="os-container">
          <Reveal>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutPhotoGrid}>
                <img src={aboutPhotoSrc1} alt="Students talking together at school" className={styles.aboutPhoto} loading="lazy" decoding="async" />
                <img src={aboutPhotoSrc2} alt="Students playing together at school" className={styles.aboutPhoto} loading="lazy" decoding="async" />
              </div>
              <div className={styles.aboutCopy}>
                <span className="os-eyebrow">About OpenSchool</span>
                <h2 className={`os-heading ${styles.aboutTitle}`}>
                  Infrastructure built for how Sri Lankan schools actually run
                </h2>
                <p className={styles.aboutText}>
                  Most schools still track students, grades, and attendance across paper
                  registers and disconnected spreadsheets. OpenSchool gives every school a
                  structured, secure, self-hosted system of record - modeled around the full
                  Grade 1-13 flow, from Scholarship years through O/Level and A/Level streams,
                  and the people who keep a school running.
                </p>
                <Link className={styles.aboutLink} to="/about">
                  Learn more about our mission
                  <ArrowRight size={16} strokeWidth={2.25} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="os-section os-section--alt">
        <div className="os-container">
          <Reveal>
            <div className={styles.communityIntro}>
              <span className="os-eyebrow">Join the Community</span>
              <h2 className={`os-heading ${styles.communityTitle}`}>
                We&apos;re building OpenSchool with you
              </h2>
              <p className={styles.communityDesc}>
                It&apos;s a volunteer-run, open-source project - no sales team, no support inbox.
                Everything happens on GitHub.
              </p>
            </div>

            <div className="os-grid os-grid--3">
              {communityCards.map((c) => (
                <div key={c.title} className={`os-card ${styles.communityCard}`}>
                  <div className={styles.communityCardIcon}>
                    <c.icon size={20} strokeWidth={1.75} />
                  </div>
                  <h3 className={styles.communityCardTitle}>{c.title}</h3>
                  <p className={styles.communityCardDesc}>{c.desc}</p>
                  {c.linkHref ? (
                    <a
                      className={styles.communityCardLink}
                      href={c.linkHref}
                      target="_blank"
                      rel="noopener noreferrer">
                      {c.linkLabel} <ArrowRight size={14} strokeWidth={2.25} />
                    </a>
                  ) : (
                    <Link className={styles.communityCardLink} to={c.linkTo}>
                      {c.linkLabel} <ArrowRight size={14} strokeWidth={2.25} />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.communityMore}>
              <Link to="/community">
                See all the ways to get involved <ArrowRight size={15} strokeWidth={2.25} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
