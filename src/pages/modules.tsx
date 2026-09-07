import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight} from 'lucide-react';
import DynamicIcon from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import features, {type FeatureGroup} from '@site/src/data/generated/features';
import styles from './modules.module.css';

const layerMeta: Record<FeatureGroup, {order: number; eyebrow: string; title: string; desc: string}> = {
  foundation: {
    order: 1,
    eyebrow: 'Layer 01 · Foundation',
    title: 'Platform Foundation',
    desc: 'The base every other module sits on - the school profile, ThunderID-backed identity, the in-app leadership hierarchy, and the audit log.',
  },
  structure: {
    order: 2,
    eyebrow: 'Layer 02 · Academic Structure',
    title: 'Academic Structure',
    desc: 'How a school year is organized before a single student is enrolled - years, the full Grade 1-13 flow, streams, mediums, and curriculum.',
  },
  people: {
    order: 3,
    eyebrow: 'Layer 03 · People & Classes',
    title: 'People & Classes',
    desc: 'Where the academic structure meets real people - students, teachers, guardians, non-academic staff, houses, and the prefect board.',
  },
  operations: {
    order: 4,
    eyebrow: 'Layer 04 · Daily Operations',
    title: 'Daily Operations',
    desc: 'What runs every school day, once the structure and people are in place - attendance, records, promotion, timetables, notifications, and reports.',
  },
};

const layers = Object.entries(layerMeta)
  .map(([group, meta]) => ({
    group: group as FeatureGroup,
    ...meta,
    modules: features.filter((f) => f.group === group),
  }))
  .sort((a, b) => a.order - b.order);

export default function Modules(): React.ReactElement {
  return (
    <Layout
      title="Modules"
      description={`A layered look at how OpenSchool's ${features.length} modules build on each other, from the school profile up to daily operations.`}>
      <SeoHead
        path="/modules"
        title="Modules Architecture - Platform Layers"
        description={`A layered look at how OpenSchool's ${features.length} modules build on each other, from the school profile up to daily operations.`}
      />
      <header className="os-page-header">
        <div className="os-container">
          <div className={styles.introInner}>
            <h1 className={`os-heading ${styles.title}`}>How the {features.length} modules build on each other</h1>
            <p className={`os-lead ${styles.lead}`}>
              OpenSchool isn&apos;t {features.length} disconnected features - it&apos;s four layers
              that build on one another: a secured foundation, the academic structure for a year,
              the people inside it, and the daily operations that run on top.
            </p>
          </div>
        </div>
      </header>

      <section className="os-section os-section--tight">
        <div className="os-container">
          <div className={styles.layerStack}>
            {layers.map((layer, i) => (
              <div key={layer.group} className={styles.layerRow}>
                <div className={`os-panel ${styles.layerPanel}`}>
                  <div className={styles.layerHeader}>
                    <span className="os-eyebrow">{layer.eyebrow}</span>
                    <h2 className={styles.layerTitle}>{layer.title}</h2>
                    <p className={styles.layerDesc}>{layer.desc}</p>
                  </div>
                  <div className={styles.moduleGrid}>
                    {layer.modules.map((m) => (
                      <div key={m.slug} className={`os-card ${styles.moduleCard}`}>
                        <span className={styles.moduleIconWrap}>
                          <DynamicIcon name={m.icon} size={20} strokeWidth={1.75} />
                        </span>
                        <div className={styles.moduleTitle}>{m.title}</div>
                        <div className={styles.moduleDesc}>{m.summary}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {i < layers.length - 1 && <div className={styles.layerConnector} aria-hidden="true" />}
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
                Want the full capability list?
              </h2>
              <p className={styles.ctaText}>See every action available in each module.</p>
            </div>
            <Link className="os-btn os-btn--primary" to="/features">
              View All Features
              <ArrowRight size={17} strokeWidth={2.25} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
