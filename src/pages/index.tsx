import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ArrowRight, Terminal, GitBranch, Bug, MessageCircle} from 'lucide-react';
import Reveal from '@site/src/components/Reveal';
import DynamicIcon, {type IconName} from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import {GITHUB_URL} from '@site/src/data/site';
import styles from './index.module.css';

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
  {value: '4', label: 'Pipeline Agents'},
  {value: '3', label: 'Client Apps'},
  {value: 'LK', label: 'Built for Sri Lanka'},
];

const badges = [
  {label: 'Backend CI', workflow: 'backend-ci.yml'},
  {label: 'Web CI', workflow: 'web-ci.yml'},
  {label: 'Mobile CI', workflow: 'mobile-ci.yml'},
  {label: 'Agentic AI CI', workflow: 'agentic-ai.yml'},
].map((b) => ({
  label: b.label,
  href: `${GITHUB_URL}/actions/workflows/${b.workflow}`,
  src: `${GITHUB_URL}/actions/workflows/${b.workflow}/badge.svg`,
}));

const services: {slug: string; title: string; icon: IconName; summary: string}[] = [
  {
    slug: 'citizen-portal',
    title: 'Citizen Portal',
    icon: 'UserRound',
    summary: 'LankaServe, a Flutter app for citizens to describe a need, check eligibility, apply in stages, pay fees, book a collection time, and track status live.',
  },
  {
    slug: 'officer-dashboard',
    title: 'Officer Dashboard',
    icon: 'Briefcase',
    summary: 'A React + Carbon dashboard on Vercel (also a Windows, macOS, and Linux desktop app) for officers, finance staff, and admins.',
  },
  {
    slug: 'ai-agents',
    title: 'AI Agent Workflows',
    icon: 'Bot',
    summary: 'Four agents - intake, eligibility, action, and validation - prepare each case before a human officer decides.',
  },
  {
    slug: 'unified-api',
    title: 'Unified Backend API',
    icon: 'Building2',
    summary: 'One ASP.NET Core (.NET 10) API on PostgreSQL + pgvector, with JWT auth, Stripe payments, and SignalR live updates, hosted on Azure.',
  },
];

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
    desc: 'Help shape Government Service Navigator by submitting features, fixes, or improvements.',
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
    title: 'Follow the Work',
    desc: 'See what the team is working on right now and review open pull requests.',
    linkLabel: 'Open pull requests',
    linkHref: `${GITHUB_URL}/pulls`,
  },
];

const QUICK_START = `git clone ${GITHUB_URL}.git
cd Government_Service_Navigator

# Configure the API (PostgreSQL, JWT, optional Groq + Stripe)
cp backend/src/.env.example backend/src/.env

# Run the API (:5119) and web dashboard (:5173) together
cd tui-runner && npm install && npm start`;

export default function Home(): React.ReactElement {
  const heroPhotoSrc = useBaseUrl('img/gsn/gsn1.jpg');
  const aboutPhotoSrc1 = useBaseUrl('img/gsn/gsn2.jpg');
  const aboutPhotoSrc2 = useBaseUrl('img/gsn/gsn3.jpg');

  return (
    <Layout
      title="Government Service Navigator"
      description="Multi-platform system for delivering and managing digital government services. Backend API, Web Dashboard, Mobile App, and Agent Layer.">
      <SeoHead
        path="/"
        title="Digital Government Service Navigator"
        description="Multi-platform system for delivering and managing digital government services."
      />

      <header className={styles.hero}>
        <div className="os-container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1 className={`os-heading ${styles.heroTitle}`}>
                Deliver and manage digital government services
              </h1>
              <p className={`os-lead ${styles.heroLead}`}>
                A multi-platform system connecting citizens and officers. Featuring an ASP.NET Core backend, React web dashboard, Flutter mobile app, and AI agent layer.
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
                alt="Officials reviewing a city services dashboard with residents"
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
                  Ready to deploy Government Service Navigator?
                </h2>
                <p className={styles.quickstartText}>
                  Clone the repo, point the API at a PostgreSQL database, and start the .NET backend and React
                  dashboard together with the bundled terminal runner. The setup guide covers the rest - including the Flutter app.
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
                  Every public service, one platform
                </h2>
                <p className={styles.servicesDesc}>
                  From processing citizen requests to AI-assisted identity verification, GSN
                  replaces disconnected tools with one consistent, API-driven system shared by
                  citizens, officers, and finance staff.
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



      <section className="os-section">
        <div className="os-container">
          <Reveal>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutPhotoGrid}>
                <img src={aboutPhotoSrc1} alt="A citizen checking an approved application on their phone" className={styles.aboutPhoto} loading="lazy" decoding="async" />
                <img src={aboutPhotoSrc2} alt="An officer reviewing applications on a web dashboard" className={styles.aboutPhoto} loading="lazy" decoding="async" />
              </div>
              <div className={styles.aboutCopy}>
                <span className="os-eyebrow">About Government Service Navigator</span>
                <h2 className={`os-heading ${styles.aboutTitle}`}>
                  Infrastructure built for modern digital government
                </h2>
                <p className={styles.aboutText}>
                  Moving beyond paper forms and disconnected departments. Government Service Navigator
                  provides a structured, secure system of record for public services-offering citizens a mobile
                  app to track their applications, while equipping officers with the dashboard and AI tools
                  needed to process them efficiently.
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
                We&apos;re building Government Service Navigator with you
              </h2>
              <p className={styles.communityDesc}>
                It&apos;s an SE3090 group project built in the open.
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
                    <Link className={styles.communityCardLink} to={c.linkTo || '#'}>
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
