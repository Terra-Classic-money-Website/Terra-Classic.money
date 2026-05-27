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

Open the Privacy Policy subpage locally at:

```text
http://127.0.0.1:5173/privacy.html
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

## Build and checks

```bash
npm run clean:metadata
npm run assets:build
npm run typecheck
npm run build
npm run perf:budget
```

If new remote avatar URLs are added to the Ecosystem, Markets, or Roadmap data, localize them before handoff so GitHub Pages does not depend on third-party avatar hosts:

```bash
npm run assets:avatars
```

Use the full local gate before handoff:

```bash
npm run check
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

Run screenshot capture across the production pages and responsive breakpoints:

```bash
npm run visual:snapshots
```

Reports are written to `.visual-reports`, which is intentionally ignored by Git.

To compare a change against a previously captured run:

```bash
VISUAL_OUTPUT_DIR=.visual-reports/before-change npm run visual:snapshots
VISUAL_BASELINE_DIR=.visual-reports/before-change/screenshots VISUAL_OUTPUT_DIR=.visual-reports/after-change npm run visual:snapshots
```

Only update persistent baselines deliberately:

```bash
npm run visual:baseline
```

## Preview production build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

Deployment is static-only through GitHub Pages. The workflow is `.github/workflows/deploy.yml` and runs from `main`.

The deployment build runs `npm run check`, so type checking, production build, image generation, metadata cleanup, and deterministic performance budgets must pass before GitHub Pages receives a new artifact.

For the production domain `terra-classic.money`, use base path `/`. For temporary repository-path hosting, set the GitHub repository variable `VITE_BASE_PATH`, for example `/Terra-Classic.money/`.

## Troubleshooting

- If install fails, rerun `npm install` and send Codex the full terminal output.
- If a page loads without images, run `npm run assets:build`, then `npm run build`, and send Codex the error output plus a screenshot.
- If performance looks worse after an image-source change, run `FORCE_ASSET_BUILD=1 npm run assets:build`, then `npm run check`, and send Codex the full output.
- If GitHub Pages deploy fails, open the failed Actions run and send Codex the failed step log.
