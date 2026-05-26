# Static route entrypoint performance pass - 2026-05-26

## Scope

This pass continues the route bundle split from `112 - Route bundle split performance pass - 2026-05-26.md`.

The lazy `RoutePages` chunk improved the homepage entry bundle, but it introduced a subpage waterfall: subpages first loaded the homepage entry, then loaded the route chunk. Ecosystem and Markets showed that cost in Lighthouse with LCP drifting toward the 3s range.

## Implementation

Added a shared shell component:

- `src/components/SiteShell.tsx`

The shell owns the sidebar, mobile drawer, language selector, shared base-path asset helper, and app layout wrapper.

Added a static route entrypoint:

- `src/main-routes.tsx`

Updated subpage HTML files to load `src/main-routes.tsx` directly:

- `ecosystem.html`
- `markets.html`
- `roadmap.html`
- `open-work.html`
- `open-work-detail.html`
- `decentralization.html`
- `about.html`
- `privacy.html`

The homepage keeps using `src/main.tsx`.

Updated `src/App.tsx` so it is homepage-only and no longer imports the non-home route module.

Updated `scripts/check-performance-budget.mjs` again so static budgets measure:

- homepage initial JS gzip
- largest page initial JS gzip
- total JS gzip
- total CSS gzip

This is the correct model for a multi-entry static GitHub Pages site.

## Build result

Current production build emits:

- homepage entry: `main` at 28.30 kB raw / 7.34 KiB gzip
- route entry: `main-routes` at 157.96 kB raw / 41.22 KiB gzip
- shared runtime/content chunk: `global` at 223.19 kB raw / 70.33 KiB gzip
- CSS: 214.32 kB raw / 33.23 KiB gzip

Budget summary after this pass:

- homepage initial JS gzip: 75.8 KiB / 85.0 KiB
- largest page initial JS gzip: About at 108.9 KiB / 125.0 KiB
- total JS gzip: 116.1 KiB / 130.0 KiB

## Validation

Executed:

- `npm run typecheck` passed.
- `npm run check` passed.
- Browser smoke QA confirmed:
  - Home renders `#hero-title`.
  - Home does not load `main-routes` and does not load a lazy `Routes` chunk.
  - Ecosystem, Markets, Roadmap, Open Work, Open Work Detail, Decentralization, About, and Privacy render their page titles.
  - Every subpage loads `main-routes`.
  - No subpage loads a lazy `Routes` chunk.
  - No failed requests were observed during the entrypoint smoke pass.

`npm run perf:audit` passed.

Final Lighthouse snapshot after this pass:

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 96 | 1452 ms | 2701 ms | 33 ms | 0.000 | 1025 KiB | 60 |
| Ecosystem | 96 | 1813 ms | 2644 ms | 19 ms | 0.000 | 387 KiB | 50 |
| Markets | 96 | 1815 ms | 2497 ms | 12 ms | 0.000 | 317 KiB | 57 |
| Roadmap | 97 | 1809 ms | 2338 ms | 0 ms | 0.000 | 178 KiB | 14 |
| Open Work | 97 | 1821 ms | 2357 ms | 13 ms | 0.000 | 271 KiB | 25 |
| Open Work Detail | 97 | 1811 ms | 2266 ms | 0 ms | 0.000 | 178 KiB | 15 |
| Decentralization | 91 | 1812 ms | 3019 ms | 17 ms | 0.000 | 327 KiB | 27 |
| About | 92 | 1810 ms | 3240 ms | 10 ms | 0.000 | 411 KiB | 31 |
| Privacy | 97 | 1811 ms | 2267 ms | 0 ms | 0.000 | 176 KiB | 13 |

## Outcome

The static route entrypoint keeps the homepage JavaScript reduction from the lazy split while removing the subpage lazy-route waterfall.

The strongest remaining performance constraint is now CSS: the site still ships one 214 kB raw / 33.23 KiB gzip stylesheet to every page. The next optimization pass should evaluate CSS containment/splitting carefully because visual regression risk is higher than the JavaScript entrypoint work.
