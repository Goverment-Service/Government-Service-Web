import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ArrowRight, Check} from 'lucide-react';
import DynamicIcon from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import features from '@site/src/data/generated/features';
import styles from './features.module.css';

export default function Features(): React.ReactElement {
  const introPhotoSrc = useBaseUrl('img/school/school4.webp');

  return (
    <Layout
      title="Features"
      description={`${features.length} integrated modules covering academic years, classes, students, guardians, attendance, timetables, and more.`}>
      <SeoHead
        path="/features"
        title={`Features - ${features.length} Integrated School Management Modules`}
        description={`${features.length} integrated modules covering academic years, classes, students, guardians, attendance, timetables, and more.`}
      />
      <header className="os-page-header">
        <div className="os-container">
          <div className={styles.introGrid}>
            <div className={styles.introInner}>
              <h1 className={`os-heading ${styles.title}`}>{features.length} modules. One school system.</h1>
              <p className={`os-lead ${styles.lead}`}>
                Every capability your school office, teachers, and admin team need - from opening
                an academic year to marking today&apos;s attendance - built into one consistent
                admin, teacher, student, and parent experience.
              </p>
            </div>
            <div className={styles.introPhotoWrap}>
              <img
                src={introPhotoSrc}
                alt="A teacher and students in a classroom in Sri Lanka"
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
          <div className="os-grid os-grid--3">
            {features.map((f) => (
              <div key={f.slug} className={`os-card ${styles.featureCard}`}>
                <div className={styles.featureIcon}>
                  <DynamicIcon name={f.icon} size={22} strokeWidth={1.75} />
                </div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <ul className={styles.featureList}>
                  {f.items.map((item) => (
                    <li key={item}>
                      <Check className={styles.checkMark} size={15} strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="os-section">
        <div className="os-container">
          <div className={`os-panel ${styles.ctaBanner}`}>
            <div>
              <h2 className="os-heading" style={{marginBottom: '0.5rem'}}>
                Want to see how the modules connect?
              </h2>
              <p className={styles.ctaText}>Explore the architecture on the Modules page.</p>
            </div>
            <Link className="os-btn os-btn--primary" to="/modules">
              View Modules
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
