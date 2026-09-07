import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const LOGOS = [
  {key: 'go', label: 'Go', src: 'img/tech/go.svg'},
  {key: 'react', label: 'React', src: 'img/tech/react.svg'},
  {key: 'typescript', label: 'TypeScript', src: 'img/tech/typescript.webp'},
  {key: 'postgresql', label: 'PostgreSQL', src: 'img/tech/postgresql.svg'},
  {key: 'vite', label: 'Vite', src: 'img/tech/vite.svg'},
  {key: 'docker', label: 'Docker', src: 'img/tech/docker.svg'},
  {key: 'swagger', label: 'Swagger / OpenAPI', src: 'img/tech/swagger.svg'},
  {key: 'thunderid', label: 'ThunderID', src: 'img/tech/thunderid.webp'},
];

// Repeated so the strip has enough items to loop seamlessly at any width.
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

function LogoChip({label, src}: {label: string; src: string}): React.ReactElement {
  const resolvedSrc = useBaseUrl(src);
  return (
    <span className={styles.chip} title={label}>
      <img src={resolvedSrc} alt={label} className={styles.logoImg} loading="lazy" decoding="async" />
    </span>
  );
}

export default function TechLogos(): React.ReactElement {
  return (
    <div className={styles.marqueeViewport} role="list" aria-label="Built on: Go, React, TypeScript, PostgreSQL, Vite, Docker, Swagger / OpenAPI, and ThunderID">
      <div className={styles.marqueeTrack} aria-hidden="true">
        {TRACK.map((item, i) => (
          <LogoChip key={`${item.key}-${i}`} label={item.label} src={item.src} />
        ))}
      </div>
    </div>
  );
}
