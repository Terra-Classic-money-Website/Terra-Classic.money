# Validation workflow research - 2026-06-05

## Scope

This research audits the validation, test, performance, visual, i18n, and deployment checks currently present in the Terra Classic Website repository.

The question is not whether validation should be removed. It should not. The current checks protect real production risks: GitHub Pages artifact hygiene, i18n publication safety, bundle size, performance, visual regressions, and static-only deploy correctness.

The problem is that the repo has strong full-site validators but weak targeted validators. That makes small edits feel like production releases.

## Executive finding

The website does not currently have a conventional test suite.

There is a `tests/` folder, but it contains no test files. Quality control is handled through validation scripts in `scripts/`, npm commands in `package.json`, browser-based audits, and GitHub Actions deployment gates.

The stack is not too strict for production. It is too coarse for everyday editing.

The main workflow problem is that `npm run build` and `npm run check` are broad commands:

- `npm run build` runs i18n generation, i18n validation, metadata cleanup, image generation, TypeScript build, and Vite production build.
- `npm run check` runs `npm run build`, then rendered i18n browser auditing, then static performance budgets.
- GitHub Pages deployment also runs `npm run check`, which is correct for live publishing.

For a small CSS or roadmap layout fix, paying the full local `check` cost before every handoff is usually excessive. A smaller targeted route check should exist, with the full gate reserved for deploy, merge, or high-risk shared changes.

## Current project phase

The project is in silent-launch / public-readiness hardening.

The website is already live on `terra-classic.money`, so validation has production impact. The correct goal is not to relax safety. The correct goal is to make validation tiered:

- fast enough for narrow edits
- strict enough before live deployment
- understandable enough for a non-developer owner
- explicit about which checks prove what

## Repository validation inventory

### npm scripts

Current scripts in `package.json`:

| Script | What it does | Cost profile | Current role |
| --- | --- | --- | --- |
| `npm run dev` | Generates localized HTML templates, then starts Vite dev server. | Low to medium. | Local development. |
| `npm run clean:metadata` | Removes `.DS_Store`, `Thumbs.db`, `desktop.ini`, `ehthumbs.db`, and AppleDouble `._*` files outside ignored folders. | Low. | Artifact hygiene. |
| `npm run i18n:generate` | Generates published localized HTML templates and removes unpublished localized templates. | Low. | Required before local dev/build. |
| `npm run i18n:validate` | Validates locale config, route coverage, localized HTML presence, publication status, source hashes, chrome modules, and rendered text inventory. | Low to medium. | Static i18n safety gate. |
| `npm run i18n:report` | Writes `.i18n-reports/latest.md` with locale and route lifecycle status. | Low. | Operator-readable translation report. |
| `npm run i18n:audit-rendered` | Starts a static server from `dist`, renders every published localized route in Playwright, compares English and localized visible text, and writes `.i18n-reports/rendered-latest.md`. | High. | Browser-level i18n safety gate. |
| `npm run assets:build` | Generates responsive WebP/AVIF assets from `asset-sources/assets` into `public/assets` using Sharp. | Medium; often lower when outputs are current. | Production image pipeline. |
| `npm run assets:avatars` | Downloads remote avatar URLs from ecosystem, markets, and roadmap data, converts them to local WebP assets, and rewrites data files. | Medium; network-dependent. | Manual asset localization when remote avatars are introduced. |
| `npm run analytics:generate` | Generates `public/data/website-analytics.json`; in strict GitHub Actions mode requires GA4 credentials. | Low locally without credentials; network-dependent in CI. | Analytics feed generation. |
| `npm run build` | Runs i18n generation, i18n validation, metadata cleanup, asset build, TypeScript build, and Vite production build. | Medium to high. | Production build. |
| `npm run typecheck` | Runs `tsc -b --pretty`. | Low to medium. | Type safety. |
| `npm run preview` | Serves the production build with Vite preview. | Low. | Local production preview. |
| `npm run perf:budget` | Checks built `dist` size, initial JS/CSS gzip budgets, total JS/CSS gzip, largest runtime asset, and local metadata leakage. | Low after build. | Deterministic performance/artifact gate. |
| `npm run perf:lh-budget` | Checks saved Lighthouse JSON reports in `.performance-reports` against page-level budgets. | Low, but requires prior Lighthouse reports. | Report validation after `perf:audit`. |
| `npm run perf:audit` | Builds, starts preview, runs Lighthouse via `npx lighthouse@latest` across production pages and desktop spot checks, then checks budgets. | Very high. | Deep performance audit. |
| `npm run visual:snapshots` | Builds, starts preview, captures Playwright screenshots across production routes/viewports, optionally compares to baseline. | High. | Visual regression QA. |
| `npm run visual:baseline` | Builds, captures screenshots, and updates persistent visual baselines. | High and should be deliberate. | Baseline management. |
| `npm run check` | Runs build, rendered i18n audit, and static performance budget. | High. | Current full local and CI gate. |

### GitHub Actions

`.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch:

- checkout
- Node 22 setup
- `npm ci`
- `npx playwright install --with-deps chromium`
- `node scripts/generate-website-analytics.mjs` in strict GA4 mode
- `npm run check`
- upload `dist`
- deploy to GitHub Pages

This is the correct place for a heavy production gate.

`.github/workflows/website-analytics.yml` runs hourly and manually:

- checkout
- Node 22 setup
- `npm ci`
- `npx playwright install --with-deps chromium`
- analytics feed generation in strict GA4 mode
- `npm run check`
- upload and deploy Pages artifact

This keeps the live analytics feed current, but it also means the heavy website check can run hourly. That is safe, but operationally expensive.

### PR template

`.github/pull_request_template.md` already recognizes that not every change requires the same proof:

- `npm run check`
- `npm run i18n:validate` for translation or route metadata changes
- `npm run i18n:report` for translation or route metadata changes
- narrower relevant check
- unable to run local checks

This is a good signal. The tooling just does not yet provide enough narrow scripts to make the "narrower relevant check" path easy.

## Script-level findings

### `scripts/validate-i18n.mjs`

This is an important static safety gate.

It validates:

- default locale existence
- locale `htmlLang`, `dir`, and `pathPrefix`
- route status coverage
- generated localized HTML presence
- unpublished localized HTML removal
- published route lifecycle status
- current source hashes for published non-default locales
- localized metadata
- typed chrome modules
- rendered body text JSON
- minimum translated rendered-text volume
- suspicious copied English prefixes

The source-hash behavior is strict. Any route source file listed in `translation-status.json` can make a localized route stale, even if the edit is visual or structural rather than copy-related.

That strictness protects translation integrity, but it increases friction for design-only route edits. The better fix is not to remove source hashes. The better fix is to support a route-aware or intent-aware validation mode that can distinguish "copy changed" from "route component CSS/layout changed" where possible.

### `scripts/audit-rendered-i18n.mjs`

This is one of the heaviest checks.

It:

- requires a built `dist`
- starts a static local server
- launches Playwright Chromium
- renders every published non-default locale
- visits every published route
- waits for localized DOM readiness
- extracts visible English and localized text
- flags exact untranslated English strings that should translate
- writes `.i18n-reports/rendered-latest.md`

This is valuable before deployment and after translation changes. It is too broad as a routine proof for a small roadmap CSS fix.

The script should support filters:

- route filter, for example `I18N_AUDIT_ROUTES=roadmap`
- locale filter, for example `I18N_AUDIT_LOCALES=tr,id,de`
- viewport filter if future localized layout checks are added

### `scripts/check-performance-budget.mjs`

This is a good deterministic post-build budget check.

It checks:

- total runtime `dist` size
- largest runtime asset
- largest downloadable brand asset
- homepage initial JS gzip
- largest page initial JS gzip
- largest page initial CSS gzip
- total JS gzip
- total CSS gzip
- local metadata leakage

This is much cheaper than Lighthouse and should remain part of the final gate.

For narrow CSS work, it can be deferred until the final build unless the change touches:

- shared CSS imports
- page entrypoints
- asset generation
- image payloads
- bundle splitting
- global layout runtime

### `scripts/perf-audit.mjs`

This is the deepest performance validation.

It:

- runs `npm run build`
- starts Vite preview
- runs `npx lighthouse@latest`
- audits production pages in mobile profile
- runs desktop spot checks for Home, Decentralization, and About
- retries selected outliers
- writes `.performance-reports/*.json`

Audited pages include:

- home
- ecosystem
- markets
- roadmap
- open work
- open work detail
- decentralization
- about
- analytics
- privacy
- 404
- selected desktop variants

This should not run routinely for small layout changes. It should run when:

- performance work is being done
- image or asset delivery changes
- entrypoints or CSS splitting changes
- a deploy/release requires refreshed Lighthouse evidence
- a route appears visually or interactively degraded

### `scripts/check-lighthouse-budget.mjs`

This validates saved Lighthouse reports from `.performance-reports`.

It does not run Lighthouse itself. It checks page-level budgets for:

- performance score
- FCP
- LCP
- TBT
- CLS
- transfer weight
- request count

This is useful as a second step after `perf:audit`, but it is not useful by itself unless reports already exist and are current.

### `scripts/visual-regression.mjs`

This is valuable visual QA, but it is broad.

It currently captures:

- home at five viewports
- ecosystem at mobile and desktop
- markets at mobile and desktop
- roadmap at mobile, tablet, and desktop
- open work at mobile and desktop
- open work detail at mobile and desktop
- decentralization at mobile and desktop
- about at mobile and desktop
- analytics at mobile, tablet, and desktop
- privacy at mobile and desktop
- 404 at mobile, tablet, and desktop

It can compare against a baseline through `VISUAL_BASELINE_DIR` and writes reports to `.visual-reports`.

This is the right tool for visual regressions. It needs filters:

- route filter, for example `VISUAL_ROUTES=roadmap`
- viewport filter, for example `VISUAL_VIEWPORTS=mobile-390,desktop-1632`
- skip build option when a preview server is already running

Without filters, every narrow visual task becomes a whole-site screenshot run.

### `scripts/build-images.mjs`

This is a real production asset pipeline, not just validation.

It uses Sharp to generate responsive image variants from source masters. It supports:

- AVIF and WebP output
- multiple widths per image family
- concurrency control through `ASSET_BUILD_CONCURRENCY`
- forced regeneration through `FORCE_ASSET_BUILD=1`

It already avoids unnecessary rewrites when outputs are current, but it still runs during every `npm run build`.

For pure code or copy edits, this is usually unnecessary. The deploy build should keep it. Local quick checks should not always pay for it.

### `scripts/clean-local-metadata.mjs`

This is cheap and valuable.

It removes local OS metadata files that should not leak into a GitHub Pages artifact. It can stay inside production build/check.

### `scripts/generate-i18n-html.mjs`

This is required because localized route templates are generated from canonical HTML files.

It:

- reads `src/i18n/site-i18n.json`
- generates published non-default locale HTML files
- applies localized `html lang`, `dir`, title, description, canonical, Open Graph, and Twitter metadata
- removes unpublished locale directories

This should remain in `dev`, `build`, and any i18n-aware local check.

### `scripts/report-i18n.mjs`

This is cheap and useful as an operator-readable report.

It should stay separate, not inside every local check. It is most useful when translation or route publication status changes.

### `scripts/localize-avatars.mjs`

This is not a validation command. It is an asset ingestion utility.

It should only run when new remote avatar URLs are added to ecosystem, markets, or roadmap data.

### `scripts/generate-website-analytics.mjs`

This is deployment/runtime data generation, not everyday validation.

Locally, without credentials, it writes a setup placeholder. In GitHub Actions strict mode, it requires GA4 secrets and fails if generation fails.

This should remain in CI/deploy and in analytics-specific work.

## Runbook finding

`- START.md` documents the commands, but it presents many of them in one "Build and checks" block.

That block is accurate but not decision-oriented. For a non-developer owner and for faster agent work, it should be reorganized into validation tiers:

- quick local edit check
- route/page check
- i18n check
- visual check
- performance check
- full production gate
- deploy behavior

The current runbook does not make it obvious which command is enough for a small CSS-only change.

## Cost drivers

The biggest sources of validation time are:

1. Rendered i18n audit.
   It launches Playwright and checks all published localized routes.

2. Lighthouse audit.
   It builds, previews, runs `npx lighthouse@latest`, and audits many page/form-factor combinations.

3. Visual snapshots.
   It builds, previews, launches Playwright, scroll-settles every route, captures many full-page screenshots, and optionally compares pixels.

4. Production build bundling.
   `npm run build` includes image generation and static i18n validation before TypeScript/Vite.

5. Asset image generation.
   It is often incremental, but it still belongs to full build/deploy more than to every narrow local edit.

6. Translation source hashes.
   They are correct for publication safety, but they can force translation-status updates after route source edits that are not semantically translation changes.

## What should not be removed

Do not remove:

- GitHub Pages `npm run check` deployment gate.
- Static i18n validation.
- Rendered i18n audit before publishing translation changes or deployment.
- Static performance budgets.
- Lighthouse audit capability.
- Visual regression capability.
- Metadata cleanup.
- Asset image pipeline.

These exist for valid reasons.

The optimization should be command design, filtering, and clearer workflow rules.

## Recommended validation tiers

### Tier 0: docs-only

Use for documentation-only changes that do not change runtime code, public HTML, data, translations, or assets.

Recommended validation:

```bash
git status --short
```

No npm validation is required unless the documentation references commands that need verification.

### Tier 1: quick edit check

Use for small TypeScript, CSS, layout, or data edits while iterating.

Recommended script to add:

```bash
npm run check:quick
```

Recommended implementation:

```bash
npm run i18n:generate && npm run typecheck
```

This catches broken generated locale templates and TypeScript errors without running browser i18n audit, performance budgets, or image generation.

### Tier 2: route/page check

Use for changes scoped to one page or component family, for example roadmap-only layout work.

Recommended scripts to add:

```bash
npm run check:route -- roadmap
npm run visual:route -- roadmap
```

Recommended behavior:

- generate i18n templates
- typecheck
- build or use existing preview
- render the changed route at relevant desktop/tablet/mobile widths
- optionally run rendered i18n audit only for that route
- optionally run visual screenshot capture only for that route

This is the missing tier that would have made the recent roadmap work much faster.

### Tier 3: domain check

Use when the changed area has domain-specific risk.

Recommended examples:

```bash
npm run check:i18n
npm run check:assets
npm run check:performance-static
```

Possible mappings:

- `check:i18n`: `npm run i18n:generate && npm run i18n:validate && npm run i18n:report`
- `check:i18n-rendered`: `npm run build && npm run i18n:audit-rendered`
- `check:assets`: `npm run assets:build && npm run build && npm run perf:budget`
- `check:performance-static`: `npm run build && npm run perf:budget`

### Tier 4: full local gate

Use before handoff when the change affects shared runtime, multiple routes, production data, route metadata, translation publication, performance, or deployment readiness.

Current command:

```bash
npm run check
```

This should remain the canonical full local production gate.

### Tier 5: deep audits

Use deliberately, not automatically.

Current commands:

```bash
npm run perf:audit
npm run visual:snapshots
```

Run these when the work justifies them:

- major visual changes
- CSS splitting or shared layout changes
- image pipeline changes
- performance work
- final release hardening
- before/after evidence is needed

## Recommended new scripts

Add these npm scripts in a future implementation task:

```json
{
  "check:quick": "npm run i18n:generate && npm run typecheck",
  "check:build": "npm run build && npm run perf:budget",
  "check:i18n": "npm run i18n:generate && npm run i18n:validate && npm run i18n:report",
  "check:i18n-rendered": "npm run build && npm run i18n:audit-rendered",
  "check:deploy": "npm run check"
}
```

Then extend scripts with route filters:

```bash
I18N_AUDIT_ROUTES=roadmap npm run i18n:audit-rendered
VISUAL_ROUTES=roadmap VISUAL_VIEWPORTS=mobile-390,desktop-1632 npm run visual:snapshots
```

Once filters exist, add operator-friendly wrappers:

```json
{
  "check:roadmap": "npm run check:quick && npm run build && I18N_AUDIT_ROUTES=roadmap npm run i18n:audit-rendered",
  "visual:roadmap": "VISUAL_ROUTES=roadmap VISUAL_VIEWPORTS=mobile-390,tablet-1024,desktop-1632 npm run visual:snapshots"
}
```

The exact route wrappers can be added only for pages that are edited often. Do not create many unused scripts prematurely.

## Recommended script changes

### Add filters to rendered i18n audit

Modify `scripts/audit-rendered-i18n.mjs` to accept:

- `I18N_AUDIT_ROUTES`
- `I18N_AUDIT_LOCALES`

Expected behavior:

- default remains all published localized routes
- filtered mode validates only selected route IDs/locales
- report clearly states filters used
- CI still runs unfiltered through `npm run check`

### Add filters to visual regression

Modify `scripts/visual-regression.mjs` to accept:

- `VISUAL_ROUTES`
- `VISUAL_VIEWPORTS`

Expected behavior:

- default remains full matrix
- filtered mode captures only selected pages/viewports
- report clearly states filters used
- missing route or viewport names fail with a readable error

### Add a quick check script

Add `check:quick` for iteration:

```bash
npm run i18n:generate && npm run typecheck
```

This will make small edits faster without weakening final validation.

### Keep `npm run check` unchanged

The production gate should stay broad unless future evidence shows one part is redundant.

Current `npm run check` is appropriate for:

- live deployment
- release branches
- changes touching shared CSS/runtime
- route publication changes
- translation changes
- performance-sensitive changes
- before merging substantial work

## Recommended workflow by change type

| Change type | Inner-loop validation | Final local validation | Deep audit trigger |
| --- | --- | --- | --- |
| Documentation-only | `git status --short` | none, unless command docs changed | none |
| Single CSS/component tweak | `npm run check:quick` plus browser route inspection | route-filtered visual/i18n if available; otherwise `npm run build` | full `visual:snapshots` only if shared layout changes |
| Roadmap data/layout | `npm run check:quick` | route-filtered roadmap check; `npm run build` before handoff | full `check` before deploy |
| Translation copy/status | `npm run check:i18n` | `npm run check:i18n-rendered` | full `check` before deploy |
| New localized language | `npm run check:i18n`, rendered audit | `npm run check` | visual snapshots across localized high-risk routes |
| Asset/image changes | `npm run assets:build` | `npm run build && npm run perf:budget` | `npm run perf:audit` if payload/LCP changes materially |
| Shared CSS split/runtime | `npm run check:quick` | `npm run check` | `npm run visual:snapshots` and `npm run perf:audit` |
| Deployment/live update | none as shortcut | `npm run check` locally when practical; GitHub Actions runs it again | `perf:audit` only when release includes performance-sensitive work |

## GitHub Actions recommendation

Keep `.github/workflows/deploy.yml` strict.

For `.github/workflows/website-analytics.yml`, consider whether the hourly analytics refresh truly needs the full rendered i18n browser audit every time.

Safer optimized option:

- Keep full `npm run check` in the production deploy workflow on `main` pushes.
- For hourly analytics refresh, run a narrower static build gate unless the site code changed.

Possible future workflow:

```text
main push deploy:
- analytics generate
- npm run check
- deploy

hourly analytics refresh:
- analytics generate
- npm run build
- npm run perf:budget
- deploy
```

This preserves deploy safety for code changes while reducing hourly CI cost. The risk is that hourly deploys could publish from `main` without rerunning rendered i18n. That is acceptable only if `main` already passed the full deploy gate for the same code revision.

## Operator documentation recommendation

Update `- START.md` in a future implementation task to separate:

- first-time setup
- normal local start
- quick validation
- route validation
- translation validation
- visual validation
- performance validation
- full deploy gate
- troubleshooting

The current command list is accurate, but it encourages over-validation because it does not rank the commands by use case.

## Recommended implementation sequence

1. Add `check:quick`, `check:build`, `check:i18n`, `check:i18n-rendered`, and `check:deploy` aliases.
2. Add route and locale filters to `scripts/audit-rendered-i18n.mjs`.
3. Add route and viewport filters to `scripts/visual-regression.mjs`.
4. Add one or two route wrappers for frequently edited surfaces, starting with roadmap.
5. Update `- START.md` with a tiered validation decision tree.
6. Optionally optimize the hourly analytics workflow after the local tiering is stable.

## Final recommendation

Do not reduce the production standard.

The website is live and static-only through GitHub Pages. The current full gate is valuable because it catches failures before GitHub Pages receives a bad artifact.

But the local workflow needs tiering. The repo should keep strict full validation for deployment while adding targeted validators for the common editing cases: route-specific visual work, route-specific i18n checks, and quick TypeScript/i18n-template checks.

That gives the project the right operating model: strong production safety without making every small improvement feel like a release audit.
