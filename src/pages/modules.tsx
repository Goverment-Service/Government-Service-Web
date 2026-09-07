import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {ArrowRight} from 'lucide-react';
import DynamicIcon from '@site/src/components/DynamicIcon';
import SeoHead from '@site/src/components/SeoHead';
import features, {type FeatureGroup} from '@site/src/data/generated/features';
import styles from './modules.module.css';

const layerMeta: Record<FeatureGroup, {order: number; eyebrow: string; title: string; desc: string}> = {
  agent1: {
    order: 1,
    eyebrow: 'Agent 1 · Supun',
    title: 'Intake & Planning',
    desc: 'Acts as the first point of contact. It interprets what the citizen is actually asking for, matches it to the correct government service, and lays out the sequence of steps.',
  },
  agent2: {
    order: 2,
    eyebrow: 'Agent 2 · Parami',
    title: 'Eligibility, Payments & Orchestrator',
    desc: 'Verifies whether the citizen qualifies for the matched service, handles payments and refunds, and functions as the Workflow Orchestrator triggering Agents 1, 3, and 4 in order.',
  },
  agent3: {
    order: 3,
    eyebrow: 'Agent 3 · Krishmal',
    title: 'Action & Tool Agent',
    desc: 'Performs the concrete actions needed to move the case forward: calculating the applicable fee, finding an open appointment slot, and pre-filling the application form.',
  },
  agent4: {
    order: 4,
    eyebrow: 'Agent 4 · Chathuka',
    title: 'Validation & Safety',
    desc: 'Performs a final sanity check — validating data format and screening for duplicates — before the case ever reaches a human Verifying Officer.',
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
      title="Architecture & Agents"
      description={`A look at how Government Service Navigator's Agentic AI Architecture orchestrates workflows.`}>
      <SeoHead
        path="/modules"
        title="Agentic AI Architecture - Government Service Navigator"
        description={`A look at how Government Service Navigator's Agentic AI Architecture orchestrates workflows.`}
      />
      <header className="os-page-header">
        <div className="os-container">
          <div className={styles.introInner}>
            <h1 className={`os-heading ${styles.title}`}>The 4-Agent Pipeline</h1>
            <p className={`os-lead ${styles.lead}`}>
              Each citizen request flows through four agents in sequence, forming a single automated pipeline. Every agent has one narrow, well-defined job and only the tools it is allow-listed to use.
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
