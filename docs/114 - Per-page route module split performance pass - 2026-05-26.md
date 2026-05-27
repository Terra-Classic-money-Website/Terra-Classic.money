# Per-page route module split performance pass - 2026-05-26

## Scope

This pass completes the JavaScript route-splitting work from the performance plan.

The previous static subpage entrypoint removed the homepage-to-route lazy waterfall, but all subpages still imported one shared `Routes` module. That meant every subpage still paid for every route component and route data source.

## Implementation

Added dedicated static entry modules:

- `src/entries/ecosystem.tsx`
- `src/entries/markets.tsx`
- `src/entries/roadmap.tsx`
- `src/entries/openWork.tsx`
- `src/entries/openWorkDetail.tsx`
- `src/entries/decentralization.tsx`
- `src/entries/about.tsx`
- `src/entries/privacy.tsx`
- `src/entries/mountPage.tsx`

Updated each HTML page to load its matching entry module.

Deleted the old shared route resolver:

- `src/main-routes.tsx`
- `src/pages/Routes.tsx`

Split the route module into page-scoped modules:

- `src/pages/EcosystemPage.tsx`
- `src/pages/MarketsPage.tsx`
- `src/pages/RoadmapPage.tsx`
- `src/pages/OpenWorkPage.tsx`
- `src/pages/OpenWorkDetailPage.tsx`
- `src/pages/DecentralizationPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/PrivacyPolicyPage.tsx`

Added shared page modules only where the pages actually render those sections:

- `src/pages/shared.tsx`
- `src/pages/community.tsx`
- `src/pages/directory.tsx`

This keeps shared visual/components behavior centralized while allowing page-specific data to stay out of unrelated page boot paths.

## Build result

The previous build emitted a shared `Routes` chunk:

- `Routes`: 157.07 kB raw / 41.07 KiB gzip

After this pass, that shared route chunk is gone. Vite now emits smaller page and shared chunks:

- `shared`: 7.16 kB raw / 2.73 KiB gzip
- `community`: 4.75 kB raw / 1.45 KiB gzip
- `directory`: 1.98 kB raw / 0.72 KiB gzip
- `openWorkDetail`: 3.14 kB raw / 1.03 KiB gzip
- `roadmap`: 10.37 kB raw / 3.19 KiB gzip
- `openWork`: 7.69 kB raw / 2.03 KiB gzip
- `openWork` data/detail shared chunk: 10.86 kB raw / 3.77 KiB gzip
- `markets` page/data chunk: 15.45 kB raw / 4.03 KiB gzip
- `privacy` page/data chunk: 17.99 kB raw / 5.39 KiB gzip
- `about` page/data chunk: 19.57 kB raw / 5.30 KiB gzip
- `ecosystem` page/data chunk: 21.44 kB raw / 5.98 KiB gzip
- `decentralization`: 36.39 kB raw / 11.22 KiB gzip

Deterministic performance budget result after this pass:

- total `dist`: 6.08 MiB / 12.00 MiB
- largest file: `assets/hero-orb-figma.webp` at 588.2 KiB / 900.0 KiB
- homepage initial JS gzip: 75.8 KiB / 85.0 KiB
- largest page initial JS gzip: `decentralization.html` at 90.3 KiB / 125.0 KiB
- total JS gzip: 122.6 KiB / 130.0 KiB
- total CSS gzip: 32.5 KiB / 45.0 KiB

## Validation

Executed:

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run perf:budget` passed.
- `npm run check` passed.
- `npm run perf:audit` passed.

Final Lighthouse snapshot after this pass:

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 96 | 1421 ms | 2680 ms | 43 ms | 0.000 | 1025 KiB | 60 |
| Ecosystem | 97 | 1663 ms | 2494 ms | 13 ms | 0.000 | 360 KiB | 54 |
| Markets | 97 | 1665 ms | 2347 ms | 9 ms | 0.000 | 287 KiB | 60 |
| Roadmap | 99 | 1516 ms | 2048 ms | 0 ms | 0.000 | 144 KiB | 15 |
| Open Work | 98 | 1671 ms | 2119 ms | 4 ms | 0.000 | 242 KiB | 28 |
| Open Work Detail | 99 | 1660 ms | 2039 ms | 0 ms | 0.000 | 145 KiB | 17 |
| Decentralization | 92 | 1809 ms | 3014 ms | 14 ms | 0.000 | 310 KiB | 31 |
| About | 93 | 1661 ms | 3167 ms | 9 ms | 0.000 | 380 KiB | 33 |
| Privacy | 99 | 1508 ms | 2036 ms | 0 ms | 0.000 | 144 KiB | 14 |

Lighthouse budgets passed.

## Outcome

The JavaScript architecture now matches the static GitHub Pages model better: each HTML page has its own entrypoint, and page data is imported by the page that renders it.

The remaining front-end delivery bottleneck is still CSS. The site ships one global stylesheet to every page:

- `global-DxywElVP.css`: 214.32 kB raw / 33.23 KiB gzip

CSS splitting should be the next optimization pass, but it carries more visual regression risk than this JavaScript split and needs broader screenshot QA.
