# Website performance implementation audit - 2026-05-27

## Scope

This document audits the implementation work done against:

- `docs/106 - Website performance optimization audit and plan - 2026-05-26.md`

The audit checks whether each planned phase has actually been completed and records the remaining gaps instead of treating budget-pass status as full strategy completion.

## Fixes completed during this audit

Three low-risk gaps were closed:

- `.github/workflows/deploy.yml` now runs `npm run check` before uploading the GitHub Pages artifact.
- `index.html` now loads `src/entries/home.tsx`; the stale `src/main.tsx` entry was removed.
- `src/designsystem.tsx` no longer references a remote Framer avatar in the local design-system previews.

The operator runbook was also updated:

- `- START.md` now states that GitHub Pages deployment runs `npm run check`.

## Phase-by-phase status

| Phase from doc 106 | Status | Audit result |
| --- | --- | --- |
| Phase 0: performance diagnostics | Complete | Budget, Lighthouse, metadata cleanup, avatar localization, image build, and runbook commands exist. `npm run check` and `npm run perf:audit` are operator-friendly. |
| Phase 1: static image optimization pipeline | Partially complete | The largest production payload problem is fixed. Source masters are outside the deploy path, optimized WebP assets are generated, remote data avatars are localized, and `dist` is small. The original full AVIF plus complete responsive-width matrix and generic `ResponsiveImage` helper were not fully implemented. |
| Phase 2: split production entrypoints by page | Complete for production pages | Production pages use route-specific entries, and the homepage now has its own entry. Route data ownership was tightened so Decentralization does not import the full Ecosystem catalog. |
| Phase 3: split CSS by shared and page-specific surfaces | Not complete | Only render containment was added. The site still ships one global stylesheet: `global-CJma3wqx.css`, 216.21 kB raw / 33.61 KiB gzip. This misses the doc 106 target of initial CSS gzip below 25 KiB per page. |
| Phase 4: self-host Figtree | Complete | Font files are local, production HTML preloads them, and source scan finds no Google Fonts dependency. |
| Phase 5: defer non-critical runtime work | Complete | APR loading is gated behind `IntersectionObserver`; runtime avatar fetching from third-party hosts was removed from production data. |
| Phase 6: CI and operator safeguards | Complete after this audit | GitHub Pages deployment now runs `npm run check`; `- START.md` documents local checks, audits, and deployment gate behavior. |

## Current validation

Executed after the fixes above:

```bash
npm run check
npm run perf:audit
```

Both passed.

Deterministic budget result:

| Budget | Current | Limit |
| --- | ---: | ---: |
| Total dist | 6.15 MiB | 12.00 MiB |
| Largest file | 588.2 KiB | 900.0 KiB |
| Homepage initial JS gzip | 75.8 KiB | 85.0 KiB |
| Largest page initial JS gzip | 85.8 KiB | 125.0 KiB |
| JS gzip total | 123.2 KiB | 130.0 KiB |
| CSS gzip total | 32.8 KiB | 45.0 KiB |

Latest local Lighthouse result:

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 96 | 1405 ms | 2663 ms | 23 ms | 0.000 | 1026 KiB | 60 |
| Ecosystem | 96 | 1662 ms | 2643 ms | 13 ms | 0.000 | 360 KiB | 53 |
| Markets | 97 | 1662 ms | 2493 ms | 9 ms | 0.000 | 286 KiB | 59 |
| Roadmap | 99 | 1507 ms | 2036 ms | 0 ms | 0.000 | 145 KiB | 15 |
| Open Work | 99 | 1660 ms | 2041 ms | 0 ms | 0.000 | 242 KiB | 27 |
| Open Work Detail | 99 | 1657 ms | 2035 ms | 0 ms | 0.000 | 146 KiB | 17 |
| Decentralization | 92 | 1808 ms | 3012 ms | 6 ms | 0.000 | 306 KiB | 31 |
| About | 97 | 1661 ms | 2342 ms | 4 ms | 0.000 | 279 KiB | 31 |
| Privacy | 99 | 1508 ms | 2036 ms | 0 ms | 0.000 | 144 KiB | 14 |

## Target-budget gaps

The implementation passes the current deterministic and Lighthouse guardrails, but it does not fully satisfy the stricter aspirational budgets from doc 106:

| Doc 106 target | Current status |
| --- | --- |
| Mobile Lighthouse 95+ for every production page | Not met. Decentralization is 92. |
| LCP <= 2500 ms on every page | Not met. Home is 2663 ms, Ecosystem is 2643 ms, Decentralization is 3012 ms. |
| Initial CSS gzip per page <= 25 KiB | Not met. Current global CSS gzip is 33.61 KiB for every page. |
| Full responsive AVIF/WebP image matrix | Not complete. The most important payloads are optimized, but the full matrix was not built. |
| Screenshot-based no-visual-change QA | Not complete. Browser tooling was not exposed in the session and the repo does not include a Playwright visual QA workflow. |

## Remaining strategy work

The only major unfinished strategy item is the full CSS split. It should not be done as a blind mechanical edit because `src/styles/global.css` interleaves base styles, shared components, page styles, responsive overrides, and interactive states.

Recommended next implementation sequence:

1. Add a committed visual QA workflow or expose the Browser tool for route screenshots.
2. Capture baseline screenshots for all production pages and `designsystem.html`.
3. Split `global.css` into shared base/chrome/component CSS and page-specific CSS.
4. Import only needed CSS from each page entry.
5. Re-run `npm run check`, `npm run perf:audit`, and visual screenshot comparisons.
6. Tighten the CSS budget from 45 KiB gzip total toward the doc 106 target of 25 KiB initial CSS per page.

## Completion verdict

The implemented performance work is strong and materially improves the site, but the full doc 106 strategy is not fully complete.

Completed:

- diagnostics and budgets
- image payload reduction for deployed assets
- route entrypoint split
- route data ownership cleanup
- font self-hosting
- APR defer
- avatar localization
- render containment
- Decentralization/About hero discovery improvements
- GitHub Pages `npm run check` deployment gate
- operator runbook updates

Not completed:

- full CSS split
- full AVIF/responsive image matrix
- generic responsive media helper
- screenshot-based visual regression workflow

Therefore the correct status is: performance implementation is validated and deploy-gated, but the original "best possible performance" plan still has unfinished CSS and visual-QA work.
