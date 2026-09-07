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
        <span className="navbar-brand-text-open">Open</span>
        <span className="navbar-brand-text-school">School</span>
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
          onError={(error) =>
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
  const mobileSidebar = useNavbarMobileSidebar();

  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      brand={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarBrand />
        </>
      }
      links={<NavbarItems items={leftItems} />}
      right={
        // TODO stop hardcoding items?
        // Ask the user to add the respective navbar items => more flexible
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
