# Website performance optimization audit and plan

Created: 2026-05-26

## Scope

Audit the full Terra Classic Website implementation and define the exact optimization plan for best possible page speed without changing the visual design.

This document is a plan, not an implementation pass. No production UI, CSS, routing, or asset behavior was changed in this task.

## Product context

Terra-classic.money is an independent, community-maintained, open-source public information layer for Terra Classic. Performance work fits the roadmap because trust depends on the site feeling fast, reliable, and production-grade. The work must not turn into a redesign, must not weaken the visual system, and must stay compatible with static GitHub Pages hosting only.

## Constraints

- Hosting remains GitHub Pages only.
- No image CDN, runtime optimizer, edge middleware, server cache rules, or third-party hosting layer should be introduced.
- Visual output must remain unchanged at the supported breakpoints:
  - Desktop Big: 1500px and up
  - Desktop Small: 1300-1499px
  - Tablet: 768-1299px
  - Mobile: 767px and below
- `DESIGN.md`, `designsystem.html`, shared tokens, and the current homepage remain the visual source of truth.
- Optimization must improve actual page delivery, not just Lighthouse cosmetics.
- All new diagnostic/tooling workflow must be operator-friendly and documented in `- START.md` during implementation.

## Sources inspected

- `-- 1. OG BRIEF - 2026.05.14.md`
- `DESIGN.md`
- `designsystem.html`
- `src/designsystem.tsx`
- `src/App.tsx`
- `src/main.tsx`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/designsystem.css`
- `src/data/*.ts`
- `src/components/*.tsx`
- `public/assets`
- `vite.config.ts`
- `package.json`
- `.github/workflows/deploy.yml`
- `- START.md`
- `- GITHUB FLOW.md`
- `docs`
- `tests`
- `- KNOWLEDGE`

`- KNOWLEDGE` currently contains only `.DS_Store`, so there was no owner-provided performance reference material to reconcile.

## Current implementation facts

- The production site is a Vite/React static build with multiple HTML files:
  - `index.html`
  - `ecosystem.html`
  - `markets.html`
  - `roadmap.html`
  - `open-work.html`
  - `open-work-detail.html`
  - `decentralization.html`
  - `about.html`
- Every HTML page loads the same `src/main.tsx`.
- `src/App.tsx` contains the shared chrome, homepage, all subpages, article logic, roadmap logic, modals, data imports, and route switching.
- Vite currently emits one shared production JS bundle and one shared production CSS bundle for all pages.
- Local design system CSS is correctly excluded from `src/main.tsx`, but the production CSS is still one global file.
- Most large images live under `public/assets`, so Vite copies the whole asset folder into `dist` whether each page needs the asset or not.
- The website imports Figtree through a CSS `@import` from Google Fonts in `src/styles/global.css`.
- Homepage APR data is fetched client-side from `https://validator.info/api/terra-classic/blockchain/apr-info`.
- Ecosystem, markets, and roadmap data include 166 remote avatar URLs across `framerusercontent.com` and `s2.coinmarketcap.com`.

## Build baseline

Command run:

```bash
npm run build
```

Result: passed.

Vite output:

```text
dist/assets/main-CCLR-rrQ.css  212.41 kB, gzip 33.06 kB
dist/assets/main-BGyU4AcY.js   390.29 kB, gzip 110.80 kB
```

Asset folder size:

```text
public/assets: 69.9 MiB
dist/assets:   71.1 MiB
```

Largest source assets:

| Asset | Size | Dimensions |
| --- | ---: | ---: |
| `hero-orb-figma.png` | 22 MiB | 3293 x 3271 |
| `what-main-orb.png` | 5.6 MiB | 2000 x 1986 |
| `what-surface.png` | 3.7 MiB | 1205 x 1600 |
| `what-right-orb.png` | 3.4 MiB | 1569 x 1600 |
| `what-left-orb.png` | 3.2 MiB | 1596 x 1600 |
| `protocol-swap-figma.png` | 3.5 MiB | 1400 x 1400 |
| `protocol-staking-figma.png` | 2.9 MiB | 1391 x 1400 |
| `protocol-forex-figma.png` | 2.6 MiB | 1373 x 1400 |
| `strength-orb.png` | 2.7 MiB | 1400 x 1390 |
| `stats-orb.png` | 2.7 MiB | 1400 x 1390 |

Important: `public/assets/.DS_Store` is copied into local `dist/assets`. It is ignored by Git and should not deploy from CI, but the local build still copies it when present. This should be cleaned during the performance tooling pass.

## Lighthouse baseline

Commands used:

```bash
npm run preview -- --port 4173
npx --yes lighthouse@latest http://127.0.0.1:4173/ --output=json --output-path=/tmp/tcm-lighthouse-home.json --only-categories=performance --chrome-flags='--headless=new --no-sandbox' --quiet
```

The same Lighthouse command was run for all production HTML pages. Reports were written to `/tmp`, not into the repo.

The numbers below are local lab metrics from Vite preview. They are useful for relative diagnosis, but final implementation should also be tested after GitHub Pages deployment because network and cache behavior will differ.

### Mobile baseline

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests | LCP element |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Home | 83 | 3144 ms | 3620 ms | 96 ms | 0.000 | 40318 KiB | 72 | Hero H1 text |
| Ecosystem | 89 | 2824 ms | 3049 ms | 54 ms | 0.010 | 1167 KiB | 54 | Intro paragraph |
| Markets | 89 | 2822 ms | 3047 ms | 47 ms | 0.000 | 679 KiB | 61 | Intro paragraph |
| Roadmap | 89 | 2810 ms | 3035 ms | 0 ms | 0.001 | 204 KiB | 19 | Intro paragraph |
| Open Work | 90 | 2824 ms | 2899 ms | 0 ms | 0.001 | 621 KiB | 30 | Intro paragraph |
| Open Work Detail | 91 | 2819 ms | 2819 ms | 0 ms | 0.000 | 199 KiB | 20 | Detail intro paragraph |
| Decentralization | 71 | 2811 ms | 6264 ms | 0 ms | 0.000 | 1057 KiB | 32 | Hero decorative image |
| About | 71 | 2812 ms | 5967 ms | 0 ms | 0.000 | 1330 KiB | 36 | Hero body paragraph |

Note: `- START.md` currently documents `open-work-detail.html?work=wallet-staking-governance-guide`, but that ID no longer exists. The valid audit URL used here was `open-work-detail.html?work=forex-protocol-implementation`. This is not a performance issue, but it is a runbook accuracy issue to fix during the next runbook update.

### Desktop spot check

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests | LCP element |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Home | 74 | 799 ms | 28013 ms | 39 ms | 0.001 | 42292 KiB | 74 | `hero-orb-figma.png` |
| Decentralization | 81 | 1680 ms | 1710 ms | 0 ms | 0.001 | 1057 KiB | 32 | `stats-small-planets.png` |
| About | 97 | 794 ms | 1170 ms | 0 ms | 0.000 | 1143 KiB | 36 | `about-hero-planet2.png` |

The homepage desktop result is the strongest warning in the audit: the 22 MiB hero image becomes the LCP element and pushes desktop LCP to 28 seconds.

## Main findings

### 1. The largest performance problem is raster image delivery

The homepage currently transfers roughly 40 MiB on mobile and 42 MiB on desktop during a local Lighthouse run. The largest individual problem is `hero-orb-figma.png`:

- Source file: 22 MiB.
- Source dimensions: 3293 x 3271.
- Lighthouse displayed dimensions: approximately 568 x 564 desktop, approximately 325 x 323 mobile.
- Estimated saving from Lighthouse: roughly 22 MiB for that one image.

The homepage also loads several multi-megabyte below-fold visuals:

- `what-main-orb.png`: 5.6 MiB.
- `what-surface.png`: 3.7 MiB.
- `what-right-orb.png`: 3.4 MiB.
- `what-left-orb.png`: 3.2 MiB.

Native `loading="lazy"` is not enough here. Browsers can still fetch near-below-fold lazy images early, and the payload is far too large even when the lazy behavior works.

### 2. All pages pay for the same JS and most page code

Current build:

- One JS bundle: 390.29 kB raw, 110.80 kB gzip.
- One CSS bundle: 212.41 kB raw, 33.06 kB gzip.

Because every page enters through `src/main.tsx` and `src/App.tsx`, content pages pay for homepage, roadmap, article, directory, open-work, about, modal, and data logic at startup. Lighthouse reports around 40-47 KiB unused JS on each page even after gzip.

This is not a React problem. It is a bundling shape problem.

### 3. CSS is render-blocking and over-shared

`main-CCLR-rrQ.css` is loaded by every page and Lighthouse reports 14-27 KiB unused CSS depending on route.

The CSS is not enormous after gzip, but it sits on the critical render path. For text-LCP pages, render delay is a bigger issue than raw transfer size.

### 4. Google Fonts `@import` is a render-blocking dependency

All audited pages show `https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;800&display=swap` as render-blocking. Lighthouse estimated roughly 825 ms of render-blocking duration on mobile.

The site already depends on Figtree visually. The right fix is not to change the typeface. The right fix is to self-host the same font file from GitHub Pages, preload it correctly, and remove the CSS `@import`.

### 5. Remote avatars create third-party performance and reliability risk

Data files reference 166 remote avatar URLs:

- 102 from `framerusercontent.com`.
- 64 from `s2.coinmarketcap.com`.

These are not critical for first paint, but they create external origin cost, privacy leakage, brittle page behavior, and inconsistent Lighthouse results. GitHub Pages can host optimized local copies.

### 6. Some image tags lack explicit intrinsic dimensions

Homepage Lighthouse found 13 unsized image elements. Examples include:

- What-section orb images.
- Capability card images.
- Hero group SVG logos.

Current CLS is low, but missing dimensions still create avoidable layout uncertainty and make future edits riskier.

### 7. Homepage APR fetch should not be in the initial critical path

The homepage requests `https://validator.info/api/terra-classic/blockchain/apr-info` through `useAprInfo`. This is below the initial hero experience, but it appears in the dependency tree. It should be deferred until the protocol section is near the viewport.

### 8. Local build copies ignored metadata into `dist`

Local `.DS_Store` files exist in several folders. `public/assets/.DS_Store` is copied into `dist/assets` during local builds. This is small, but it is a hygiene issue and a sign that build diagnostics should include metadata cleanup.

## What not to do

- Do not remove visual richness to get a fast score. Optimize delivery, not art direction.
- Do not replace the brand font with a system font unless Dawid explicitly chooses that trade-off.
- Do not add an image CDN or any hosted optimizer. GitHub Pages only.
- Do not lazy-load the actual LCP image once it remains visually above the fold.
- Do not inline huge images as base64.
- Do not blindly purge CSS without screenshot QA against `designsystem.html` and all production pages.
- Do not remove motion globally. First optimize asset size, request priority, and bundle shape.

## Target performance budgets

These are the recommended acceptance budgets after implementation:

| Budget | Target |
| --- | ---: |
| Mobile Lighthouse performance score | 95+ for every production page |
| Desktop Lighthouse performance score | 95+ for every production page |
| LCP | <= 2500 ms on mobile and desktop lab runs |
| TBT | <= 100 ms |
| CLS | <= 0.05 |
| Homepage mobile transfer | <= 1500 KiB |
| Homepage desktop transfer | <= 2000 KiB |
| Normal content-page transfer | <= 750 KiB |
| Deployed `dist/assets` size | <= 15 MiB after optimized assets |
| Initial JS gzip per page | <= 80 KiB, lower for text-only pages |
| Initial CSS gzip per page | <= 25 KiB |
| Largest initially loaded raster | <= 350 KiB, ideally <= 200 KiB |

These budgets are intentionally strict but realistic. The current site is visually strong; the problem is delivery discipline.

## Exact optimization plan

### Phase 0: Add performance diagnostics before optimization

Purpose: make future performance work measurable and repeatable for a non-developer owner.

Planned changes:

1. Add `scripts/check-performance-budget.mjs`.
   - Reads `dist`.
   - Reports JS, CSS, image, and total artifact sizes.
   - Fails deterministic budgets.
   - Flags `.DS_Store` and other local metadata in deploy output.

2. Add `scripts/perf-audit.mjs`.
   - Builds the site.
   - Starts Vite preview.
   - Runs Lighthouse against every production HTML page.
   - Runs desktop spot checks for Home, Decentralization, and About.
   - Writes JSON artifacts outside normal source files, with a markdown summary when explicitly requested.

3. Add `scripts/clean-local-metadata.mjs`.
   - Removes `.DS_Store` from deployable folders before local build.
   - This avoids requiring Dawid to manually clean macOS metadata.

4. Add package scripts:

```json
{
  "clean:metadata": "node scripts/clean-local-metadata.mjs",
  "perf:budget": "node scripts/check-performance-budget.mjs",
  "perf:audit": "node scripts/perf-audit.mjs",
  "build": "npm run clean:metadata && tsc -b && vite build",
  "check": "npm run typecheck && npm run build && npm run perf:budget"
}
```

5. Update `- START.md`.
   - Document normal checks.
   - Document full performance audit.
   - Fix the stale Open Work detail URL.

Validation:

```bash
npm run typecheck
npm run build
npm run perf:budget
npm run check
```

### Phase 1: Build a static image optimization pipeline

Purpose: remove the biggest payload problem without visual change.

Recommended implementation:

1. Add a dev-only image build script using `sharp`.
   - This is a development dependency, not a production runtime dependency.
   - It runs locally and in CI.
   - It emits static files that GitHub Pages can serve.

2. Keep source/original images out of the deploy path.
   - Do not leave oversized masters in `public/assets`.
   - Either replace served assets with optimized files or move source masters to a non-public source folder.
   - The deployed `dist` must not copy a 70 MiB public asset folder.

3. Generate AVIF and WebP for raster visuals.
   - Keep PNG fallback only where needed.
   - Use perceptual quality settings and screenshot comparison, not aggressive compression.

4. Generate responsive widths for each visual family.

Recommended first-pass responsive widths:

| Asset family | Widths |
| --- | --- |
| Hero orb | 480, 768, 1024, 1440, 1848 |
| What-section orb layers | 320, 480, 720, 1024 |
| What surface | 480, 768, 1024, 1440 |
| Capability visuals | 360, 720, 1024 |
| Protocol visuals | 480, 768, 1024, 1400 |
| Stats planets | 360, 540, 720, 1161 |
| About hero/open-source/contribute visuals | 360, 720, 1067 |
| Community button PNGs | 64, 128, 256 |
| Founder portrait | 360, 512, 768 |
| Directory avatars | 48, 96 |

5. Add a small media helper.

Recommended file:

```text
src/components/media/ResponsiveImage.tsx
```

Responsibilities:

- Render `<picture>` with AVIF/WebP/fallback sources.
- Set `width`, `height`, `sizes`, `loading`, `decoding`, and optional `fetchPriority`.
- Preserve existing class names so CSS and visuals do not drift.

6. Fix image priority:

- Homepage hero orb:
  - Use optimized responsive image.
  - Keep eager loading.
  - Use `fetchpriority="high"` only after confirming it remains the desktop LCP element.
- Homepage below-fold visuals:
  - Keep lazy loading.
  - Add real `sizes` and dimensions.
  - Do not rely on lazy loading as the main optimization.
- Decentralization and About hero art:
  - Optimize first.
  - Then tune `fetchpriority` only if Lighthouse still shows image or text LCP delay.
- Community button PNGs:
  - Add `loading="lazy"` and optimized variants.

7. Replace remote avatars with local optimized files.
   - Create a fetch-and-freeze script for remote avatars.
   - Store local 48/96 assets.
   - Update data files to local paths.
   - Keep the original remote URL as metadata only if useful for maintenance.

Validation:

```bash
npm run assets:build
npm run build
npm run perf:budget
npm run perf:audit
```

Visual QA:

- Home at 390, 768, 1024, 1400, 1632.
- Decentralization at 390 and 1632.
- About at 390 and 1632.
- One directory page with avatars.
- One market page with exchange logos.

Acceptance criteria:

- No visible difference in layout, color, crop, sharpness, glow behavior, or image positioning.
- Homepage transfer drops from roughly 40 MiB to below 1.5 MiB mobile.
- Desktop homepage LCP drops from 28 s to below 2.5 s.

### Phase 2: Split production entrypoints by page

Purpose: stop every page from loading all page code and all page data.

Recommended implementation:

1. Extract route pages:

```text
src/pages/HomePage.tsx
src/pages/EcosystemPage.tsx
src/pages/MarketsPage.tsx
src/pages/RoadmapPage.tsx
src/pages/OpenWorkPage.tsx
src/pages/OpenWorkDetailPage.tsx
src/pages/DecentralizationPage.tsx
src/pages/AboutPage.tsx
```

2. Extract shared chrome and reusable components:

```text
src/components/chrome/Sidebar.tsx
src/components/chrome/Footer.tsx
src/components/common/LinkButton.tsx
src/components/common/ShareOnXButton.tsx
src/components/common/DirectoryListItem.tsx
src/components/common/DotArrowIcon.tsx
```

3. Create one entry file per HTML page:

```text
src/entries/home.tsx
src/entries/ecosystem.tsx
src/entries/markets.tsx
src/entries/roadmap.tsx
src/entries/openWork.tsx
src/entries/openWorkDetail.tsx
src/entries/decentralization.tsx
src/entries/about.tsx
```

4. Update each HTML file to load its matching entry instead of `/src/main.tsx`.

Example:

```html
<script type="module" src="/src/entries/home.tsx"></script>
```

5. Keep Vite multi-page input in `vite.config.ts`.
   - Vite officially supports multiple HTML entry points for multi-page apps.
   - Rollup will still extract shared chunks where useful.

6. Remove the `window.location.pathname` route switch from `App.tsx`.
   - There should no longer be a single `App` that imports every page.

7. Move route-specific data imports into route-specific pages.
   - Home should not import ecosystem directory data.
   - Roadmap should not import homepage protocol data.
   - Open Work Detail should not import unrelated page sections unless rendered.

Validation:

```bash
npm run typecheck
npm run build
npm run perf:budget
```

Acceptance criteria:

- Every current URL still works exactly:
  - `/`
  - `/ecosystem.html`
  - `/markets.html`
  - `/roadmap.html`
  - `/open-work.html`
  - `/open-work-detail.html?work=forex-protocol-implementation`
  - `/decentralization.html`
  - `/about.html`
- `VITE_BASE_PATH` still works for GitHub Pages repository-path previews.
- Initial JS gzip drops materially on content pages.
- No page pulls another page's unique data unless it renders shared lower sections.

### Phase 3: Split CSS by shared and page-specific surfaces

Purpose: reduce render-blocking CSS while keeping the design system intact.

Recommended implementation:

1. Keep these shared:

```text
src/styles/tokens.css
src/styles/base.css
src/styles/chrome.css
src/styles/shared-sections.css
```

2. Move route/page-specific styles:

```text
src/styles/pages/home.css
src/styles/pages/directory.css
src/styles/pages/roadmap.css
src/styles/pages/open-work.css
src/styles/pages/article.css
src/styles/pages/about.css
```

3. Each entry imports only the needed shared and page CSS.

4. Keep `designsystem.html` in sync.
   - If component styles move, the design system must import the same shared component CSS.
   - Do not create a second design-system-only version of production components.

5. Consider `content-visibility: auto` only after image and route splitting.
   - Candidate sections: lower homepage sections, directory groups, open-work boards, about lower sections.
   - Must use `contain-intrinsic-size` to preserve scroll stability.
   - Must not break anchor navigation or measurement-based roadmap behavior.

Validation:

```bash
npm run typecheck
npm run build
npm run perf:budget
npm run perf:audit
```

Visual QA:

- All pages at mobile and desktop.
- Roadmap horizontal scroll.
- Sidebar collapsed and expanded.
- Mobile drawer.
- FAQ open/close.
- Donation modal.
- Article listen/share actions.

Acceptance criteria:

- No missing hover states, animation states, or responsive styles.
- Initial CSS gzip per page is below 25 KiB.
- Lighthouse no longer reports high unused CSS on normal content pages.

### Phase 4: Self-host Figtree and remove Google Fonts `@import`

Purpose: remove the render-blocking external font CSS request without changing typography.

Recommended implementation:

1. Download the same Figtree font family as WOFF2.
   - Prefer a variable font if it covers the used weights cleanly.
   - Required weights: 400, 500, 600, 800.

2. Host font files locally through GitHub Pages.

Recommended path:

```text
public/fonts/figtree-latin-variable.woff2
```

3. Replace CSS `@import` with `@font-face`.

Example:

```css
@font-face {
  font-family: "Figtree";
  src: url("/fonts/figtree-latin-variable.woff2") format("woff2");
  font-weight: 400 800;
  font-style: normal;
  font-display: swap;
}
```

4. Add preload links in each production HTML page:

```html
<link rel="preload" href="/fonts/figtree-latin-variable.woff2" as="font" type="font/woff2" crossorigin>
```

5. If `VITE_BASE_PATH` is required for repository-path hosting, generate the font URL through Vite or keep it under the same base-safe asset strategy as other static assets.

Validation:

```bash
npm run build
npm run perf:audit
```

Visual QA:

- Compare text rendering before/after on Home, About, Decentralization, and Roadmap.
- Check line wraps at mobile widths because font loading changes can expose subtle wrap differences.

Acceptance criteria:

- No Google Fonts request remains.
- Figtree visual rendering remains effectively identical.
- Render-blocking insight no longer flags Google Fonts.

### Phase 5: Defer non-critical runtime work

Purpose: keep below-fold dynamic behavior without making initial load pay for it.

Recommended implementation:

1. Defer APR fetch.
   - Trigger when `ProtocolShowcase` is near the viewport.
   - Use `IntersectionObserver`.
   - Keep current visible badge behavior once the section is reached.
   - Keep structured warning logs such as `APR_INFO_FETCH_FAILED`.

2. Do not preconnect to `validator.info` unless the fetch still happens early.

3. Do not fetch remote avatars at runtime after Phase 1. Use local assets.

4. Keep share links as normal anchors. Do not preload or preconnect to X.

Validation:

```bash
npm run build
npm run perf:audit
```

Browser QA:

- Homepage initial load should not call `validator.info`.
- Scrolling near Protocol Showcase should trigger APR request.
- APR badge states still work: loading, ready, error.

Acceptance criteria:

- No above-fold visual change.
- APR fetch removed from initial network dependency tree.

### Phase 6: Add CI and operator safeguards

Purpose: make performance durable and low-maintenance.

Recommended implementation:

1. Change GitHub Pages workflow from:

```yaml
run: npm run build
```

to:

```yaml
run: npm run check
```

only after `npm run check` includes deterministic performance budgets and remains fast enough for CI.

2. Keep Lighthouse as a local or optional CI audit unless the runtime is stable.
   - Lighthouse can be noisy in CI.
   - Deterministic budgets should block regressions.
   - Lighthouse should guide improvements and release checks.

3. Add a generated performance summary file only when a task asks for it.
   - Do not commit every JSON trace by default.
   - Keep meaningful markdown summaries in `docs` using the existing numbered naming convention.

4. Update `- START.md` with:
   - Normal start.
   - Normal build/check.
   - Full performance audit.
   - How to send a generated performance summary back into Codex.

Validation:

```bash
npm run check
npm run perf:audit
```

Acceptance criteria:

- A future non-developer operator can run one documented command and get a clear performance report.
- Regressions in bundle size, image payload, `.DS_Store`, and accidental huge files fail locally before deployment.

## Recommended implementation sequence

1. Add diagnostics and budgets first.
2. Optimize image pipeline and replace oversized homepage assets.
3. Self-host fonts.
4. Split JS by page entry.
5. Split CSS by page/shared surface.
6. Defer APR and clean runtime dependencies.
7. Localize remote avatars.
8. Tighten CI and update runbook.

This order is deliberate. The image pipeline gives the largest immediate gain and the least architectural risk. Route and CSS splitting are next because they reshape the codebase. Runtime deferral and CI gates should happen after the site has better delivery fundamentals.

## Expected impact

Expected first implementation milestone:

- Homepage transfer: from roughly 40 MiB to below 1.5 MiB mobile.
- Desktop homepage LCP: from 28 s to below 2.5 s.
- Mobile About and Decentralization LCP: from around 6 s to below 2.5 s.
- All pages: Lighthouse performance 95+ in local mobile lab runs.
- `dist/assets`: from 71 MiB to below 15 MiB.

These are realistic because the current bottleneck is not complex app logic. It is mostly asset payload and route over-delivery.

## Quality gates for "no visual change"

Before accepting any optimization implementation:

1. Capture before/after screenshots for:
   - Home: 390, 768, 1024, 1400, 1632.
   - Ecosystem: 390, 1632.
   - Markets: 390, 1632.
   - Roadmap: 390, 1024, 1632.
   - Open Work: 390, 1632.
   - Open Work Detail: 390, 1632.
   - Decentralization: 390, 1632.
   - About: 390, 1632.
   - `designsystem.html`: at least 390 and 1632.

2. Validate interactions:
   - Sidebar collapse/expand.
   - Mobile drawer.
   - Language menu.
   - FAQ expansion.
   - Donation modal.
   - Article listen button.
   - Directory category scrolling.
   - Roadmap horizontal scrolling and tooltips.

3. Run checks:

```bash
npm run typecheck
npm run build
npm run perf:budget
npm run check
```

4. Run Lighthouse:

```bash
npm run perf:audit
```

5. Compare output:
   - No visual drift.
   - No broken image crops.
   - No missing assets.
   - No new console warnings/errors.
   - No broken base path behavior.

## Official references used

- [Largest Contentful Paint](https://web.dev/articles/lcp)
- [Optimize Largest Contentful Paint](https://web.dev/articles/optimize-lcp)
- [Image performance](https://web.dev/learn/performance/image-performance)
- [Code-split JavaScript](https://web.dev/learn/performance/code-split-javascript)
- [Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)
- [Vite production build and multi-page app guide](https://vite.dev/guide/build)

## Final recommendation

Do not start with CSS pruning or small JS micro-optimizations. The first serious pass should be an asset pipeline plus responsive image replacement, because the homepage is currently paying tens of megabytes for visuals displayed at a fraction of their source dimensions.

After that, split the app into real page entrypoints. The current one-entry React structure is convenient during rapid buildout, but it is now the wrong shape for a polished static GitHub Pages website.
