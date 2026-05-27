# Final website performance completion pass - 2026-05-27

## Scope

This pass closes the incomplete items identified after implementing `106 - Website performance optimization audit and plan - 2026-05-26.md`.

Completed items:

- Full production CSS split with per-entry imports.
- Enforced per-page initial CSS budget.
- Responsive AVIF/WebP image matrix for rendered raster visuals.
- Generic responsive image helper for reusable `<picture>` delivery.
- Screenshot-based visual regression workflow.
- Operator runbook updates for visual checks.

## CSS Completion

Production entries now import only the shared and page-specific CSS they need. `src/styles/global.css` remains as a local design-system aggregate so `designsystem.html` can still load the complete component library.

Dead pre-v2 glow rules were removed after confirming the app always renders the v2 glow variants:

- `HERO_GLOW_VARIANT = "v2"`
- `BOTTOM_GLOW_VARIANT = "v2"`

The performance budget script now calculates initial CSS gzip per HTML page from built stylesheet links and fails if any page exceeds 25 KiB.

Latest measured largest page initial CSS:

- `index.html`: 24.2 KiB gzip / 25.0 KiB budget

## Image Matrix Completion

`scripts/build-images.mjs` now declares a responsive image matrix and emits both AVIF and WebP outputs with stable filenames.

The matrix covers the main visual asset families:

- Homepage hero orb.
- What-is-Terra-Classic orb/surface visuals.
- What-is-Terra-Classic avatar portraits.
- Capability card visuals.
- Protocol orb and UI overlay visuals.
- Native LUNC, token icons, strengths, stats, founder, community, and About page visuals.
- Rendered partner/support logo rasters.

The image script also prunes stale generated matrix outputs so removed oversized variants do not continue shipping in `public/assets`.

Small PNG-only render assets were moved into `asset-sources/assets` as reproducible source inputs and removed from `public/assets` once their AVIF/WebP outputs were generated. The social preview image remains PNG because Open Graph and Twitter image consumers still expect broadly compatible raster URLs.

After the cleanup, the only PNG left in `public/assets` is `figma-reference-home.png`, used by the page social preview meta tags.

The deployed asset budget is aligned with doc 106:

- `dist`: 14.77 MiB / 15.00 MiB budget

## Responsive Media Helper

Added `src/components/ResponsiveImage.tsx` with:

- `ResponsiveImage` for eager or normal responsive `<picture>` delivery.
- `DeferredResponsiveImage` for IntersectionObserver-triggered lazy image delivery.
- `responsiveImageBase` for deriving matrix base names from existing asset filenames.
- AVIF-first delivery with WebP fallback.
- Support for art-directed sources, used by About page visual bands.

The helper is now used across the major raster visuals without changing the source artwork or visual hierarchy.

The homepage "What is Terra Classic" avatars now use `DeferredResponsiveImage`, which keeps the same visible layout while removing those below-fold assets from initial Lighthouse transfer. This reduced the latest homepage Lighthouse transfer from the previous 433 KiB range to 263 KiB.

## Visual Regression Workflow

Added `scripts/visual-regression.mjs` plus package scripts:

- `npm run visual:snapshots`
- `npm run visual:baseline`

The workflow builds the site, starts Vite preview, captures screenshots across production routes and responsive breakpoints, and optionally compares against a provided baseline using `pixelmatch`.

Visual reports are written to `.visual-reports`, which is ignored by Git.

The operator runbook `- START.md` now documents:

- Playwright Chromium setup.
- Screenshot capture.
- Before/after visual comparison.
- Deliberate persistent baseline updates.

## Validation Record

Executed final validation:

```bash
npm run check
npm run perf:audit
VISUAL_OUTPUT_DIR=.visual-reports/final-current npm run visual:snapshots
VISUAL_BASELINE_DIR=.visual-reports/final-current/screenshots VISUAL_OUTPUT_DIR=.visual-reports/final-repeat npm run visual:snapshots
```

Current build and performance-budget result:

```text
Total dist: 14.77 MiB / 15.00 MiB
Homepage initial JS gzip: 77.3 KiB / 85.0 KiB
Largest page initial JS gzip: decentralization.html (84.4 KiB) / 125.0 KiB
Largest page initial CSS gzip: index.html (24.2 KiB) / 25.0 KiB
JS gzip total: 125.9 KiB / 130.0 KiB
CSS gzip total: 36.8 KiB / 45.0 KiB
```

Current Lighthouse result:

```text
home: 96 performance, LCP 2505 ms, transfer 263 KiB
ecosystem: 96 performance, LCP 2562 ms
markets: 97 performance, LCP 2487 ms
roadmap: 99 performance, LCP 1887 ms
open-work: 98 performance, LCP 2067 ms
open-work-detail: 99 performance, LCP 1910 ms
decentralization: 95 performance, LCP 2518 ms
about: 98 performance, LCP 2189 ms
privacy: 99 performance, LCP 1890 ms
Lighthouse budgets passed.
```

Current visual regression result:

- Baseline capture: `.visual-reports/final-current/summary.md`
- Final comparison after full render-asset matrix: `.visual-reports/final-full-matrix/summary.md`
- All configured routes and viewports passed.
- Console column was clean for every capture.
- Largest final diff was 0.143%, below the 1.000% threshold.
