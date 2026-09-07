import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig, ErrorCauseBoundary, ThemeClassNames} from '@docusaurus/theme-common';
import {splitNavbarItems, useNavbarMobileSidebar} from '@docusaurus/theme-common/internal';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';

import styles from './styles.module.css';

function NavbarBrand(): ReactNode {
  const mark = useBaseUrl('img/brand/logo.webp');
  return (
    <Link to="/" className={clsx('navbar__brand', 'navbar-brand')}>
      <span className="navbar-brand-mark">
        <img src={mark} className="navbar-brand-mark-img" alt="OpenSchool" width={44} height={44} decoding="async" fetchPriority="high" />
      </span>
      <span className="navbar-brand-text">
        <span className="navbar-brand-text-open">Gov</span>
        <span className="navbar-brand-text-school">Navigator</span>
      </span>
    </Link>
  );
}

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error: any) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

// Brand/toggle, links, and the right-hand controls each get their own
// `.navbar__items` box so the links can be centered against the FULL width
// of the bar (see .navbar__itemsCenter in custom.css) instead of only the
// leftover space next to the right-hand group, which reads as off-center
// whenever the right side is wider or narrower than the brand.
function NavbarContentLayout({
  brand,
  links,
  right,
}: {
  brand: ReactNode;
  links: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div className={clsx(ThemeClassNames.layout.navbar.containerLeft, 'navbar__items', 'navbar__items--brand')}>
        {brand}
      </div>
      <div className="navbar__items navbar__items--center">{links}</div>
      <div className={clsx(ThemeClassNames.layout.navbar.containerRight, 'navbar__items navbar__items--right')}>
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <>
      <NavbarContentLayout
        brand={
          <>
            <button
              className="navbar__mobile-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation bar"
            >
              <svg viewBox="0 0 30 30" width="22" height="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M4 7h22M4 15h22M4 23h22" />
              </svg>
            </button>
            <NavbarBrand />
          </>
        }
        links={<NavbarItems items={leftItems} />}
        right={
          <>
            <NavbarItems items={rightItems} />
          </>
        }
      />
      
      {/* Mobile Sidebar/Menu */}
      {mobileMenuOpen && (
        <div className="navbar-sidebar">
          <div className="navbar-sidebar__brand">
            <NavbarBrand />
            <button
              className="navbar-sidebar__close"
              type="button"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="navbar-sidebar__items">
            <div className="navbar-sidebar__item menu">
              <ul className="menu__list">
                {items.map((item, i) => (
                  <li key={i} className="menu__list-item" onClick={() => setMobileMenuOpen(false)}>
                    <NavbarItem {...item} className={clsx(item.className, "menu__link")} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
