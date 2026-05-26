# Avatar asset localization performance pass - 2026-05-26

## Scope

This pass implements the performance-plan item to reduce third-party avatar requests on directory-style pages without changing layout, copy, interaction behavior, or visual hierarchy.

Affected data sources:

- `src/data/ecosystem.ts`
- `src/data/markets.ts`
- `src/data/roadmap.ts`

## Implementation

Added `scripts/localize-avatars.mjs` and the package script:

```bash
npm run assets:avatars
```

The script scans avatar fields in the Ecosystem, Markets, and Roadmap data, downloads only remote avatar URLs, converts them to small WebP assets, stores them in `public/assets/avatars`, and rewrites the data to base-path-safe local asset references.

The one-time run generated 126 local WebP avatar files. Total local avatar directory weight is approximately 620 KiB.

Updated `src/App.tsx` with a small avatar asset resolver so local avatar paths are served through `import.meta.env.BASE_URL`. This preserves the GitHub Pages base-path behavior already used for other local assets.

Updated `- START.md` so future remote avatar additions have an operator-friendly localization command.

## Performance effect

This removes direct browser dependency on:

- `framerusercontent.com` avatar assets
- `s2.coinmarketcap.com` exchange logo assets

Expected benefits:

- fewer third-party network origins during page rendering
- more predictable GitHub Pages delivery
- less external-request volatility in Lighthouse
- lower privacy leakage from page views to avatar CDNs

This does add approximately 620 KiB of tracked local avatar assets, but those files are lazy-loaded per visible directory entry and are smaller than the prior external delivery set.

## Constraints

The build does not fetch remote avatars. `npm run assets:avatars` is a maintenance command for data updates, not part of `npm run build`, because GitHub Pages builds must remain deterministic and should not fail because a third-party image host is slow or unavailable.

The visual presentation remains unchanged: the same avatar artwork is displayed in the same 44-48px circular containers.

## Validation plan

Required checks:

1. Confirm no remote avatar URLs remain in source data.
2. Run `npm run check`.
3. Run browser smoke checks for Ecosystem, Markets, and Roadmap to confirm local avatars render.
4. Run `npm run perf:audit` before final handoff if this pass is included in a performance release bundle.

## Validation results

Executed checks:

- `rg "\"?avatar\"?\\s*:\\s*[\"']https?://|https://s2.coinmarketcap.com|https://framerusercontent.com" src/data -n` returned no matches.
- `rg "framerusercontent.com|s2.coinmarketcap.com" dist src/data public -n` returned no matches after build.
- `npm run check` passed.
- Browser smoke via an ephemeral Playwright runner confirmed:
  - Ecosystem: 90 avatar images, 90 local, 0 old avatar CDN requests, 0 broken avatar images.
  - Markets: 75 avatar images, 75 local, 0 old avatar CDN requests, 0 broken avatar images.
  - Roadmap: 1 avatar image, 1 local, 0 old avatar CDN requests, 0 broken avatar images.
- `npm run perf:audit` passed with the page-level Lighthouse budget gate.

Final Lighthouse snapshot after this pass:

| Page | Score | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 95 | 2857 ms | 61 ms | 0.000 | 1062 KiB | 59 |
| Ecosystem | 97 | 2367 ms | 33 ms | 0.000 | 391 KiB | 49 |
| Markets | 97 | 2368 ms | 27 ms | 0.000 | 321 KiB | 56 |
| Roadmap | 98 | 2280 ms | 0 ms | 0.000 | 182 KiB | 13 |
| Open Work | 97 | 2354 ms | 19 ms | 0.000 | 275 KiB | 24 |
| Open Work Detail | 97 | 2298 ms | 10 ms | 0.000 | 181 KiB | 14 |
| Decentralization | 90 | 3032 ms | 49 ms | 0.000 | 331 KiB | 26 |
| About | 91 | 3409 ms | 11 ms | 0.050 | 415 KiB | 30 |
| Privacy | 98 | 2165 ms | 0 ms | 0.000 | 180 KiB | 12 |
