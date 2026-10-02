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
    eyebrow: 'Agent 1',
    title: 'Intake & Planning',
    desc: 'The first point of contact. It interprets the citizen\'s free-text need, retrieves the closest services from a pgvector knowledge base, and lays out the steps and documents to follow, snapped to the live catalog. Answers "Service Not Found" rather than guessing. Tool: search_service_catalog.',
  },
  agent2: {
    order: 2,
    eyebrow: 'Agent 2',
    title: 'Eligibility & Document Analysis (+ Orchestrator)',
    desc: 'Checks whether the citizen qualifies for the matched service and which documents are missing for the current stage, using the eligibility rules plus retrieved policy text, and flags uploads that look unrelated. It also acts as the Workflow Orchestrator, triggering Agents 1, 3, and 4 in order. Tools: check_eligibility_rules, get_document_requirements.',
  },
  agent3: {
    order: 3,
    eyebrow: 'Agent 3',
    title: 'Action & Tool Agent',
    desc: 'Moves the case forward: calculates the stage fee, proposes an appointment slot, and pre-fills the application for the officer to review. It also books collection appointments from plain language against live slot capacity. Tools: calculate_fee, find_appointment_slot, prefill_application.',
  },
  agent4: {
    order: 4,
    eyebrow: 'Agent 4',
    title: 'Validation & Safety',
    desc: 'Checks every submitted stage - schema and NIC validation, a minimum legal age, prompt-injection screening, PII masking, and duplicate flags - then briefs the Verifying Officer with a risk level and case dossier. Tools: validate_schema, check_duplicate_application.',
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
              Each citizen request flows through four agents in sequence, forming a single automated pipeline. Every agent has one narrow, well-defined job and only the tools it is allow-listed to use. The tools are deterministic; when configured, a Groq-hosted LLM reasons over their results, and the agent falls back to the tool answer if it is off or fails.
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
