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
    desc: 'ThunderID-backed authentication, server-side role checks on every action, rate limiting, and an audit log for sensitive changes.',
  },
  {
    icon: MapPinned,
    title: 'Built for the Sri Lankan System',
    desc: 'The full Grade 1-13 flow - Scholarship years, O/Level, and A/Level streams like Science, Commerce, and Arts - modeled the way local schools actually run.',
  },
  {
    icon: Code,
    title: 'Open Source & Self-Hosted',
    desc: 'Apache 2.0 licensed, with the full source available. Run your own instance on your own infrastructure and keep your data under your own control.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    desc: 'From a single classroom to a full multi-grade school, the same data model holds up as records grow.',
  },
];

const audiences = [
  {icon: Building2, title: 'Principals & Admins', desc: 'Manage the school profile, academic years, grades, and classes from one dashboarded structure.'},
  {icon: Presentation, title: 'Teachers', desc: 'View assigned classes, mark attendance, and see the students and subjects you’re responsible for.'},
  {icon: UsersRound, title: 'Guardians', desc: 'Stay linked to your child’s class, attendance, and subject selections as a primary or secondary contact.'},
  {icon: GraduationCap, title: 'Students', desc: 'Get a clear record of your class, subjects, electives, and attendance history over the academic year.'},
];

export default function About(): React.ReactElement {
  const introPhotoSrc = useBaseUrl('img/school/school5.webp');

  return (
    <Layout
      title="About"
      description="Why OpenSchool exists: a free, open-source, self-hosted school management system built specifically for the way Sri Lankan schools operate.">
      <SeoHead
        path="/about"
        title="About Us - Open Source School Management"
        description="Why OpenSchool exists: a free, open-source, self-hosted school management system built specifically for the way Sri Lankan schools operate."
      />
      <header className="os-page-header">
        <div className="os-container">
          <div className={styles.introGrid}>
            <div className={styles.introInner}>
              <h1 className={`os-heading ${styles.title}`}>
                Replacing paper registers with one secure system
              </h1>
              <p className={`os-lead ${styles.lead}`}>
                OpenSchool is a self-hosted school management system purpose-built for Sri Lankan
                schools - one secure application that models everything from academic years and
                grades - Scholarship through A/Level - to guardians and daily attendance, so school
                records stop living across notebooks, spreadsheets, and disconnected systems.
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
              <h3 className={styles.cardTitle}>Give every school a proper system of record</h3>
              <p className={styles.cardText}>
                Most Sri Lankan schools still track students, grades, and attendance across paper
                registers and disconnected spreadsheets. OpenSchool gives every school - regardless
                of size - a structured, secure, API-driven system of record for its academic data.
              </p>
            </div>
            <div className={`os-card ${styles.storyCard}`}>
              <span className="os-eyebrow">Our Vision</span>
              <h3 className={styles.cardTitle}>Community infrastructure, not a vendor</h3>
              <p className={styles.cardText}>
                We&apos;re building OpenSchool in the open, as software any school - or anyone
                building for schools - can run, inspect, and contribute to, instead of every
                school reinventing student records from scratch or depending on a closed vendor.
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
          <h2 className="os-heading" style={{marginBottom: '2.5rem'}}>Built for everyone around a school</h2>
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
              <h2 className="os-heading" style={{marginBottom: '0.5rem'}}>Want to run it for your school?</h2>
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
