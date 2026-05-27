# GitHub Pages Deployment Preparation

Created: 2026-05-20

## Scope

Prepare the current `dev` branch for promotion to `main` so the Terra Classic Website can be tested through GitHub Pages.

## Deployment Model

- `main` is the publishing branch.
- GitHub Pages deployment is handled by `.github/workflows/deploy.yml`.
- The workflow runs `npm ci` and `npm run build` on `main`.
- Only the generated `dist` folder is uploaded to GitHub Pages.
- Internal repository files such as docs, source files, runbooks, and design-system tooling are not served by GitHub Pages.

## Artifact Check

- Local production build emitted:
  - `dist/index.html`
  - `dist/ecosystem.html`
  - hashed CSS and JavaScript under `dist/assets`
  - public visual assets under `dist/assets`
- Local macOS `.DS_Store` metadata was removed from `public/assets` before the final local build so it cannot be copied into the local `dist` artifact.
- The final local `dist` scan found no internal docs, prompts, knowledge-folder references, design-system page, AGENTS instructions, or runbook files.

## Validation

- `npm run check` passed before promotion.
- A follow-up `npm run build` passed after removing local metadata from the public asset folder.

## Deployment Attempt

- Local `main` was fast-forwarded to the prepared `dev` commit.
- Remote push to `origin/main` was attempted with `git push origin main`.
- The push was blocked by local GitHub authentication, not by build, merge, or validation failure:
  - `fatal: could not read Username for 'https://github.com': Device not configured`
- The working context was returned to `dev`.
- A GitHub CLI fallback was not available because `gh` is not installed in this environment.
