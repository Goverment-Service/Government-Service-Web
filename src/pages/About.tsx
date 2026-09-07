import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ShieldCheck, MapPinned, Code, TrendingUp, Building2, Presentation, UsersRound, GraduationCap, ArrowRight} from 'lucide-react';
import SeoHead from '@site/src/components/SeoHead';
import styles from './about.module.css';

const principles = [
  {
    icon: ShieldCheck,
    title: 'Secure by Default',
    desc: 'Role-based access control, rate limiting, and comprehensive audit logs for all sensitive system and application changes.',
  },
  {
    icon: MapPinned,
    title: 'Agentic AI Architecture',
    desc: 'Four specialized AI agents sequence citizen workflows — taking requests from intake and eligibility to action and validation.',
  },
  {
    icon: Code,
    title: 'Open Source & Self-Hosted',
    desc: 'Apache 2.0 licensed, with the full source available. Run your own instance and keep public sector data completely under your control.',
  },
  {
    icon: TrendingUp,
    title: 'Multi-Platform Delivery',
    desc: 'An ASP.NET Core backend serving a Flutter mobile app for citizens and a React web dashboard for officers and administrators.',
  },
];

const audiences = [
  {icon: UsersRound, title: 'Citizen / Applicant', desc: 'Primary Client. Search services, get guidance, submit applications, upload documents, pay fees, and track status.'},
  {icon: Presentation, title: 'Verifying Officer', desc: 'Review submitted applications, verify documents, and approve, reject, or revise AI agent drafts.'},
  {icon: Building2, title: 'Department Admin', desc: 'Manage the service catalog, fees, eligibility rules, appointment capacity, and analytics.'},
  {icon: ShieldCheck, title: 'System Admin', desc: 'Manage users, roles, audit logs, anomaly review, and global system configuration.'},
];

export default function About(): React.ReactElement {
  const introPhotoSrc = useBaseUrl('img/school/school5.webp');

  return (
    <Layout
      title="About"
      description="Why Government Service Navigator exists: a multi-platform agentic AI system for managing public services.">
      <SeoHead
        path="/about"
        title="About Us - Government Service Navigator"
        description="Why Government Service Navigator exists: a multi-platform agentic AI system for managing public services."
      />
      <header className="os-page-header">
        <div className="os-container">
          <div className={styles.introGrid}>
            <div className={styles.introInner}>
              <h1 className={`os-heading ${styles.title}`}>
                A connected ecosystem for public services
              </h1>
              <p className={`os-lead ${styles.lead}`}>
                Government Service Navigator is a multi-platform system purpose-built for the public sector.
                It replaces disconnected portals and paper forms with a centralized ASP.NET Core backend, an Agentic AI pipeline for smart citizen routing, a Flutter app for citizens, and a React dashboard for officers.
              </p>
            </div>
            <div className={styles.introPhotoWrap}>
              <img
                src={introPhotoSrc}
                alt="Students at a morning assembly in a Sri Lankan school"
                className={styles.introPhoto}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="os-section os-section--tight">
        <div className="os-container">
          <div className="os-grid os-grid--2">
            <div className={`os-card ${styles.storyCard}`}>
              <span className="os-eyebrow">Our Mission</span>
              <h3 className={styles.cardTitle}>Give citizens a unified service portal</h3>
              <p className={styles.cardText}>
                Citizens shouldn't have to navigate 15 different department websites to get things done. 
                Our mission is to provide a single, intelligent portal that understands what a citizen needs, verifies their eligibility, and orchestrates the application process automatically.
              </p>
            </div>
            <div className={`os-card ${styles.storyCard}`}>
              <span className="os-eyebrow">Our Vision</span>
              <h3 className={styles.cardTitle}>Agentic workflows, human verification</h3>
              <p className={styles.cardText}>
                We believe AI should do the heavy lifting of routing, validation, and fee calculation,
                while leaving final approvals and complex edge cases to human officers.
                This hybrid approach scales government efficiency safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="os-section os-section--alt">
        <div className="os-container">
          <span className="os-eyebrow">What guides us</span>
          <h2 className="os-heading" style={{marginBottom: '2.5rem'}}>Principles behind the platform</h2>
          <div className="os-grid os-grid--4">
            {principles.map((p) => (
              <div key={p.title} className={`os-card ${styles.principleCard}`}>
                <div className={styles.principleIcon}>
                  <p.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="os-section os-section--tight">
        <div className="os-container">
          <span className="os-eyebrow">Who it&apos;s for</span>
          <h2 className="os-heading" style={{marginBottom: '2.5rem'}}>Built for everyone around the system</h2>
          <div className="os-grid os-grid--4">
            {audiences.map((a) => (
              <div key={a.title} className={`os-card ${styles.audienceCard}`}>
                <div className={styles.audienceIcon}>
                  <a.icon size={20} strokeWidth={1.75} />
                </div>
                <h3 className={styles.audienceTitle}>{a.title}</h3>
                <p className={styles.audienceDesc}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="os-section">
        <div className="os-container">
          <div className={`os-panel ${styles.ctaBanner}`}>
            <div>
              <h2 className="os-heading" style={{marginBottom: '0.5rem'}}>Want to deploy this platform?</h2>
              <p className={styles.ctaText}>The setup guide walks through every module hands-on.</p>
            </div>
            <Link className="os-btn os-btn--primary" to="/docs/setup">
              Read the Setup Guide
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
