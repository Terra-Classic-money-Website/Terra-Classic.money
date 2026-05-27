# Render containment performance pass - 2026-05-27

## Scope

This pass continues the website performance plan after the page-entry and route-data cleanup work.

The remaining major bottleneck is still CSS delivery, but a full CSS split is high risk because `src/styles/global.css` contains interleaved base rules, shared component states, page rules, and responsive overrides. This pass intentionally avoids moving CSS rules. It adds browser-level render containment to long, below-fold sections so layout and paint work can be deferred without changing visuals.

## Implementation

Added a guarded `@supports (content-visibility: auto)` block in:

- `src/styles/global.css`

The block applies:

- `content-visibility: auto`
- `contain-intrinsic-size: auto var(--tc-contain-intrinsic-size, 720px)`

Targets include known long or below-fold surfaces:

- homepage lower sections: support strip, what section, capabilities, protocol showcase, native assets, strengths, metrics, founders, community, FAQ, footer
- shared lower sections: founders, community, FAQ, share bands, footer
- Open Work lower boards and process sections
- Decentralization article body sections, resources, and share section
- About lower content sections, indexed grids, contributor groups, FAQ, and share section
- Privacy/legal body sections

The block deliberately excludes visible page heroes and top-level content surfaces that can become LCP elements:

- homepage hero
- Decentralization hero
- About hero
- top-level route intro sections

Unsupported browsers ignore the block and render the previous layout path.

## Build Result

The CSS bundle grew slightly because this is a rendering optimization, not a CSS transfer split:

- before: `global-DxywElVP.css` 214.32 kB raw / 33.23 KiB gzip
- after: `global-CJma3wqx.css` 216.21 kB raw / 33.61 KiB gzip

Deterministic performance budget result after this pass:

- total `dist`: 6.08 MiB / 12.00 MiB
- largest file: `assets/hero-orb-figma.webp` at 588.2 KiB / 900.0 KiB
- homepage initial JS gzip: 75.8 KiB / 85.0 KiB
- largest page initial JS gzip: `decentralization.html` at 85.7 KiB / 125.0 KiB
- total JS gzip: 123.0 KiB / 130.0 KiB
- total CSS gzip: 32.8 KiB / 45.0 KiB

## Validation

Executed:

- `npm run check` passed.
- `npm run perf:audit` passed.

Final Lighthouse snapshot:

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 96 | 1404 ms | 2664 ms | 24 ms | 0.000 | 1026 KiB | 60 |
| Ecosystem | 97 | 1660 ms | 2415 ms | 8 ms | 0.000 | 360 KiB | 53 |
| Markets | 97 | 1660 ms | 2414 ms | 11 ms | 0.000 | 286 KiB | 59 |
| Roadmap | 99 | 1506 ms | 2034 ms | 0 ms | 0.000 | 145 KiB | 15 |
| Open Work | 99 | 1657 ms | 2035 ms | 0 ms | 0.000 | 242 KiB | 27 |
| Open Work Detail | 99 | 1657 ms | 2035 ms | 0 ms | 0.000 | 146 KiB | 17 |
| Decentralization | 92 | 1812 ms | 3018 ms | 15 ms | 0.000 | 306 KiB | 31 |
| About | 94 | 1659 ms | 2938 ms | 0 ms | 0.000 | 311 KiB | 31 |
| Privacy | 99 | 1510 ms | 2040 ms | 0 ms | 0.000 | 144 KiB | 14 |

Lighthouse budgets passed.

Visual regression note:

- No layout selectors were moved.
- No markup or component hierarchy changed.
- CLS remained `0.000` across every audited page.
- The in-app Browser tool was not exposed in this session and the repo does not include Playwright, so screenshot QA was not added as a dependency for this narrow CSS-only pass.

## Outcome

The render path is more efficient for long pages without changing the visual system or committing to a risky stylesheet split.

Useful improvements in the local Lighthouse run:

- Ecosystem score moved from 96 to 97.
- Open Work score moved from 98 to 99.
- About score moved from 93 to 94 and transfer dropped from the prior 380 KiB snapshot to 311 KiB.
- CLS stayed at 0.000 on all pages.

Decentralization remains the weakest page:

- score: 92
- LCP: 3018 ms

The next high-value pass should focus on Decentralization/About hero LCP and then a carefully staged CSS split. The CSS split should not be done mechanically; it needs route-by-route screenshot QA because responsive overrides and shared states are still interleaved in `src/styles/global.css`.
