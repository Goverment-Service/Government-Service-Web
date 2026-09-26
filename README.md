# Government Service Navigator — Website

The project website for [Government Service Navigator](https://github.com/Goverment-Service/Government_Service_Navigator), a multi-platform system for delivering and managing digital government services. It has an ASP.NET Core API, a React officer dashboard, a Flutter citizen app, and a four-agent AI pipeline.

This repo is only the marketing and docs site. The product itself lives in the main repo.

## Stack

React 19, TypeScript, Vite, React Router, `react-markdown`. The pages were ported from a Docusaurus site, so `@docusaurus/*` and `@theme/*` imports resolve to small local shims in `src/mocks/` (see `vite.config.ts`).

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run lint
```

## Where content lives

| Content | Source |
|---|---|
| Features and Modules cards | `src/data/features/*.md`, one per component/agent. Run `npm run generate:content` to rebuild `src/data/generated/features.ts`. |
| Docs pages | `docs/*.md`, rendered by `src/pages/docs.tsx` |
| Architecture Decision Records | `docs/adr/`, copied from the main repo's `docs/adr/`. Re-copy them when they change there. |
| Navbar and footer links | `src/mocks/docusaurus/theme-common.ts` |
| Main repo URL | `src/data/site.ts` |

`npm run generate:content` also refreshes the changelog data from the main repo's GitHub Releases. The main repo has no releases yet, so the `/changelog` route stays disabled in `src/main.tsx`.
