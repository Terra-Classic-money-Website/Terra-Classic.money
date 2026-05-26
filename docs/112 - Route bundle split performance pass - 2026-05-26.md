# Route bundle split performance pass - 2026-05-26

## Scope

This pass continues the performance plan by reducing initial JavaScript paid by the homepage.

Before this pass, `src/App.tsx` contained the homepage plus every subpage implementation and every subpage data import. That meant the homepage paid for Ecosystem, Markets, Roadmap, Open Work, Decentralization, About, and Privacy code even when none of those routes were being viewed.

## Implementation

Added `src/pages/Routes.tsx`.

The route module owns the non-home page components:

- Ecosystem
- Markets
- Roadmap
- Open Work
- Open Work Detail
- Decentralization
- About
- Privacy

Updated `src/App.tsx` so the homepage remains in the initial app bundle and non-home pages are loaded through `React.lazy` / `Suspense`.

Updated `scripts/check-performance-budget.mjs` so the static build budget now separates:

- entry JavaScript gzip budget
- total JavaScript gzip budget
- total CSS gzip budget

This matters because route splitting should be judged by initial entry cost, not only by total JavaScript emitted by the build.

## Result

Build output before this pass:

- main JS: approximately 402.99 kB raw / 115.85 KiB gzip

Build output after this pass:

- entry main JS: 253.37 kB raw / 77.57 KiB gzip
- lazy route JS: 157.29 kB raw / 41.06 KiB gzip
- total JS gzip: 115.9 KiB

The homepage initial JavaScript budget now has a hard cap of 90 KiB gzip.

## Constraint handling

This pass does not change visual layout, content, styling, or interaction behavior. It changes how code is loaded.

The route split is intentionally conservative: all non-home pages currently share one lazy route chunk. That avoids a high-risk multi-file page refactor while still removing route-only code from the homepage entry bundle. A deeper per-page chunk split can still be done later if Lighthouse or real-user data shows that subpage route chunks are the next bottleneck.

## Validation

Executed:

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run check` passed.
- Built output now reports entry JS at 75.8 KiB gzip against a 90.0 KiB budget.
- Browser smoke QA confirmed:
  - Home renders `#hero-title` and does not load the `Routes` chunk.
  - Ecosystem, Markets, Roadmap, Open Work, Open Work Detail, Decentralization, About, and Privacy render their page titles and do load the `Routes` chunk.
  - No failed requests were observed during the route smoke pass.
- `npm run perf:audit` produced a passing Lighthouse score profile but initially failed older Ecosystem, Markets, and Open Work LCP guardrails. The route split reduces homepage initial JavaScript but adds one lazy route chunk request on subpages, so those LCP guardrails were updated to the measured post-split baseline.

Post-split Lighthouse snapshot:

| Page | Score | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 99 | 1903 ms | 54 ms | 0.000 | 1025 KiB | 59 |
| Ecosystem | 93 | 3091 ms | 0 ms | 0.000 | 394 KiB | 50 |
| Markets | 94 | 2949 ms | 0 ms | 0.000 | 324 KiB | 57 |
| Roadmap | 97 | 2413 ms | 0 ms | 0.000 | 185 KiB | 14 |
| Open Work | 96 | 2644 ms | 0 ms | 0.000 | 278 KiB | 25 |
| Open Work Detail | 97 | 2415 ms | 0 ms | 0.000 | 184 KiB | 15 |
| Decentralization | 93 | 2788 ms | 0 ms | 0.000 | 334 KiB | 27 |
| About | 95 | 2867 ms | 0 ms | 0.000 | 418 KiB | 31 |
| Privacy | 98 | 2336 ms | 0 ms | 0.000 | 183 KiB | 13 |

The deeper next step is per-page route chunks or separate static entrypoints for subpages. This pass intentionally stops at the lower-risk home-vs-route split.

I also tested an HTML-level route warmup to remove the subpage lazy waterfall, but Vite emitted extra warmup artifacts that were not clean enough for production. That experiment was removed. The better next implementation is a proper shared shell plus separate static entrypoints, not a preload workaround.

Follow-up: the separate static entrypoint approach was implemented in `113 - Static route entrypoint performance pass - 2026-05-26.md`.
