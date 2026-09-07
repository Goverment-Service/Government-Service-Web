import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig, type MultiColumnFooter} from '@docusaurus/theme-common';
import styles from './styles.module.css';

function Footer(): ReactNode {
  const {footer} = useThemeConfig();
  if (!footer) {
    return null;
  }

  const {links, logo, copyright} = footer as MultiColumnFooter;
  const columns = links ?? [];
  const logoSrc = useBaseUrl(logo?.src ?? '');

  return (
    <footer className={`footer footer--${footer.style}`}>
      <div className="os-container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.brandRow}>
              {logo && <img src={logoSrc} alt="" aria-hidden="true" className={styles.brandLogo} width={26} height={26} />}
              <span className={styles.brandName}>
                <span className={styles.brandNameOpen}>Open</span>
                <span className={styles.brandNameSchool}>School</span>
              </span>
            </Link>
            <p className={styles.brandTagline}>
              Digital infrastructure for Sri Lankan schools.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className={styles.column}>
              <div className={styles.columnTitle}>{col.title}</div>
              <ul className={styles.columnList}>
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      href={item.href}
                      className={styles.columnLink}
                      target={item.href ? '_blank' : undefined}
                      rel={item.href ? 'noopener noreferrer' : undefined}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomWrap}>
        <div className="os-container">
          <div className={styles.bottom}>
            <span className={styles.copyright}>{copyright}</span>
            <span className={styles.maintainedBy}>Maintained by open source contributors</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
