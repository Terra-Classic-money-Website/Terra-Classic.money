# Terra-Classic.money local runbook

## Prerequisites

- Node.js 22 or newer.
- npm.

## First-time setup

```bash
npm install
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

Open the internal local design-system tool at:

```text
http://127.0.0.1:5173/designsystem.html
```

`designsystem.html` is intentionally a local Vite-served tool. The GitHub Pages workflow uploads only `dist` from `npm run build`, and this page is not part of that production build.

## Build and checks

```bash
npm run typecheck
npm run build
```

Use the full local gate before handoff:

```bash
npm run check
```

## Preview production build

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

Deployment is static-only through GitHub Pages. The workflow is `.github/workflows/deploy.yml` and runs from `main`.

For the production domain `terra-classic.money`, use base path `/`. For temporary repository-path hosting, set the GitHub repository variable `VITE_BASE_PATH`, for example `/Terra-Classic.money/`.

## Troubleshooting

- If install fails, rerun `npm install` and send Codex the full terminal output.
- If a page loads without images, run `npm run build` and send Codex the error output plus a screenshot.
- If GitHub Pages deploy fails, open the failed Actions run and send Codex the failed step log.
