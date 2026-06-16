# Terra-Classic.money local runbook

## Prerequisites

- Node.js 22 or newer.
- npm.

## First-time setup

```bash
npm install
```

For screenshot-based visual regression checks, install the bundled Chromium browser once:

```bash
npx playwright install chromium
```

## Normal start

```bash
npm run dev
```

Vite prints the local URL, normally `http://127.0.0.1:5173/`.

`npm run dev` generates localized static route templates before starting Vite.

Open the Ecosystem subpage locally at:

```text
http://127.0.0.1:5173/ecosystem.html
```

Open the Decentralization subpage locally at:

```text
http://127.0.0.1:5173/decentralization.html
```

Open the Roadmap subpage locally at:

```text
http://127.0.0.1:5173/roadmap.html
```

Open the Markets subpage locally at:

```text
http://127.0.0.1:5173/markets.html
```

Open the Open Work subpage locally at:

```text
http://127.0.0.1:5173/open-work.html
```

Open the About terra-classic.money subpage locally at:

```text
http://127.0.0.1:5173/about.html
```

Open the Website analytics subpage locally at:

```text
http://127.0.0.1:5173/analytics.html
```

Open the Privacy Policy subpage locally at:

```text
http://127.0.0.1:5173/privacy.html
```

Open the Terra Classic brand assets subpage locally at:

```text
http://127.0.0.1:5173/brand-assets.html
```

Open the Error 404 page locally at:

```text
http://127.0.0.1:5173/404.html
```

Open an Open Work detail page locally at:

```text
http://127.0.0.1:5173/open-work-detail.html?work=forex-protocol-implementation
```

Open the internal local design-system tool at:

```text
http://127.0.0.1:5173/designsystem.html
```

`designsystem.html` is intentionally a local Vite-served tool. The GitHub Pages workflow uploads only `dist` from `npm run build`, and this page is not part of that production build.

Open the Turkish localized homepage locally at:

```text
http://127.0.0.1:5173/tr/
```

Open a Turkish localized subpage locally at:

```text
http://127.0.0.1:5173/tr/ecosystem.html
```

Open the Arabic localized homepage locally at:

```text
http://127.0.0.1:5173/ar/
```

Open an Arabic localized subpage locally at:

```text
http://127.0.0.1:5173/ar/ecosystem.html
```

## Build and checks

Use the narrowest check that credibly covers the change, then run the full gate before deployment or broad shared changes.

### Quick edit check

Use this while iterating on small TypeScript, CSS, layout, or data changes:

```bash
npm run check:quick
```

This generates localized route templates and runs TypeScript checking. It does not run browser i18n audits, image generation, performance budgets, Lighthouse, or visual snapshots.

### Production build check

Use this when the change should prove that the production artifact still builds and stays inside deterministic size budgets:

```bash
npm run check:build
```

This runs the production build and `npm run perf:budget`.

### Translation checks

Use this for translation copy, locale metadata, publication status, or route hash work:

```bash
npm run check:i18n
```

`npm run check:i18n` runs generation, static i18n validation, and the human-readable i18n report.

For browser-rendered translation safety, run:

```bash
npm run check:i18n-rendered
```

To audit only selected rendered routes or locales after a production build:

```bash
I18N_AUDIT_ROUTES=roadmap npm run i18n:audit-rendered
I18N_AUDIT_ROUTES=roadmap I18N_AUDIT_LOCALES=tr,id npm run i18n:audit-rendered
```

Route IDs include `home`, `ecosystem`, `markets`, `roadmap`, `decentralization`, `openWork`, `openWorkDetail`, `about`, `analytics`, `privacy`, `brandAssets`, and `notFound`.

Rendered i18n reports are written to `.i18n-reports/rendered-latest.md`, which is intentionally ignored by Git.

### Roadmap route check

Use this for roadmap-only layout or data changes:

```bash
npm run check:roadmap
```

This runs the quick check, builds the site, then audits rendered i18n only for the roadmap route.

### Asset checks

If new remote avatar URLs are added to the Ecosystem, Markets, or Roadmap data, localize them before handoff so GitHub Pages does not depend on third-party avatar hosts:

```bash
npm run assets:avatars
```

If image sources or generated production assets changed, run:

```bash
npm run assets:build
npm run check:build
```

### Visual checks

Run screenshot capture across all configured production pages and responsive breakpoints:

```bash
npm run visual:snapshots
```

Run roadmap-only visual snapshots:

```bash
npm run visual:roadmap
```

Or filter manually:

```bash
VISUAL_ROUTES=roadmap VISUAL_VIEWPORTS=mobile-390,desktop-1632 npm run visual:snapshots
```

Visual reports are written to `.visual-reports`, which is intentionally ignored by Git.

To compare a change against a previously captured run:

```bash
VISUAL_OUTPUT_DIR=.visual-reports/before-change npm run visual:snapshots
VISUAL_BASELINE_DIR=.visual-reports/before-change/screenshots VISUAL_OUTPUT_DIR=.visual-reports/after-change npm run visual:snapshots
```

Only update persistent baselines deliberately:

```bash
npm run visual:baseline
```

### Performance checks

Run deterministic built-asset budgets:

```bash
npm run perf:budget
```

Run a local Lighthouse performance audit for all production pages:

```bash
npm run perf:audit
```

Reports are written to `.performance-reports`, which is intentionally ignored by Git. The audit command checks all production pages in the mobile Lighthouse profile, then runs desktop spot checks for Home, Decentralization, and About. Saved reports are checked against page-level Lighthouse budgets for performance score, FCP, LCP, TBT, CLS, transfer weight, and request count.

To re-check the latest saved Lighthouse reports without running a fresh audit:

```bash
npm run perf:lh-budget
```

### Analytics feed

Generate the public Website analytics JSON locally:

```bash
npm run analytics:generate
```

Without `GA4_PROPERTY_ID` and `GOOGLE_ANALYTICS_SERVICE_ACCOUNT_JSON`, this writes a setup-pending placeholder to `public/data/website-analytics.json`. In GitHub Actions, both secrets are required for the live feed.

The hourly `.github/workflows/website-analytics.yml` refresh runs `npm run check:build` after generating the analytics feed. This keeps the scheduled refresh lighter than a code deploy while still requiring a production build and deterministic performance budgets.

### Full production gate

Use the full local gate before deployment, release, broad shared-layout changes, route publication changes, or any change that may affect multiple production pages:

```bash
npm run check
```

`npm run check:deploy` is an explicit alias for the same full production gate.

## Preview production build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

Deployment is static-only through GitHub Pages. The workflow is `.github/workflows/deploy.yml` and runs from `main`.

The deployment build runs `npm run check`, so type checking, production build, image generation, metadata cleanup, and deterministic performance budgets must pass before GitHub Pages receives a new artifact.

The scheduled Website analytics workflow also deploys to GitHub Pages, but it is intended only to refresh the analytics JSON from the already-published `main` code. It runs `npm run check:build`, not the full rendered i18n browser audit.

For the production domain `terra-classic.money`, use base path `/`. For temporary repository-path hosting, set the GitHub repository variable `VITE_BASE_PATH`, for example `/Terra-Classic.money/`.

## Troubleshooting

- If install fails, rerun `npm install` and send Codex the full terminal output.
- If a page loads without images, run `npm run assets:build`, then `npm run build`, and send Codex the error output plus a screenshot.
- If performance looks worse after an image-source change, run `FORCE_ASSET_BUILD=1 npm run assets:build`, then `npm run check`, and send Codex the full output.
- If GitHub Pages deploy fails, open the failed Actions run and send Codex the failed step log.
