import {GITHUB_URL} from '@site/src/data/site';

export function useThemeConfig() {
  return {
    footer: {
      style: 'dark',
      logo: { src: 'img/brand/logo.webp' },
      copyright: `© ${new Date().getFullYear()} Government Service Navigator - an SE3090 group project.`,
      links: [
        {
          title: 'Platform',
          items: [
            { label: 'About', to: '/about' },
            { label: 'Features', to: '/features' },
            { label: 'Modules', to: '/modules' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Docs', to: '/docs' },
            { label: 'Changelog', to: '/changelog' },
            { label: 'Community', to: '/community' },
            { label: 'Privacy Policy', to: '/privacy' },
          ],
        },
        {
          title: 'Project',
          items: [
            { label: 'GitHub', href: GITHUB_URL },
            { label: 'Report an Issue', href: `${GITHUB_URL}/issues` },
            { label: 'Pull Requests', href: `${GITHUB_URL}/pulls` },
            { label: 'Contributors', href: `${GITHUB_URL}/graphs/contributors` },
          ],
        },
      ],
    },
    navbar: {
      hideOnScroll: false,
      items: [
        { label: 'Home', to: '/', position: 'left', className: 'navbar__link' },
        { label: 'About', to: '/about', position: 'left', className: 'navbar__link' },
        { label: 'Features', to: '/features', position: 'left', className: 'navbar__link' },
        { label: 'Modules', to: '/modules', position: 'left', className: 'navbar__link' },
        { label: 'Docs', to: '/docs', position: 'left', className: 'navbar__link' },
        { label: 'Changelog', to: '/changelog', position: 'left', className: 'navbar__link' },
        { label: 'Community', to: '/community', position: 'left', className: 'navbar__link' },
        {
          href: GITHUB_URL,
          position: 'right',
          className: 'navbar-github-group navbar-icon-link',
          html: `<svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>`
        },
        { label: 'Get Started', to: '/docs/intro', position: 'right', className: 'navbar-cta-button navbar__link' },
      ],
    },
  };
}

export function ErrorCauseBoundary({ children }: any) { return children; }

export const ThemeClassNames = { 
  wrapper: { navbar: '' },
  layout: { navbar: { containerLeft: '', containerRight: '' } }
};

export type MultiColumnFooter = {
  style: string;
  logo: { src: string };
  copyright: string;
  links: Array<{
    title: string;
    items: Array<{ label: string; to?: string; href?: string }>;
  }>;
};
