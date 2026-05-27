# Route data ownership performance cleanup - 2026-05-26

## Scope

This pass continues the page-entry and route-module performance work by removing an accidental runtime dependency from the Decentralization page.

After the per-page entrypoint split, `decentralization.html` still imported the full Ecosystem catalog through `src/data/ecosystem.ts` just to reuse three small groups of verification links. That made Decentralization pay for data it does not render.

## Implementation

Added a dedicated ecosystem type module:

- `src/data/ecosystemTypes.ts`

Added a focused shared verification data module:

- `src/data/ecosystemVerification.ts`

Moved the shared verification link groups into that focused module:

- `validatorVisibilityEntries`
- `networkInspectionEntries`
- `developerInfrastructureEntries`

Updated:

- `src/data/decentralization.ts` now imports only the focused verification groups instead of the full `ecosystemCategories` catalog.
- `src/data/ecosystem.ts` imports the same verification groups so Ecosystem and Decentralization still share one source of truth.
- `src/data/markets.ts` imports only the shared ecosystem type file, keeping it independent from the Ecosystem runtime catalog.

This preserves DRY content ownership while keeping page bundles isolated.

## Build Result

The focused verification data now emits as its own small shared chunk:

- `ecosystemVerification`: 4.29 kB raw / 1.40 KiB gzip

Relevant page/data chunks after the cleanup:

- `ecosystem`: 19.44 kB raw / 6.08 KiB gzip
- `decentralization`: 36.30 kB raw / 11.17 KiB gzip

Deterministic performance budget result after this pass:

- total `dist`: 6.08 MiB / 12.00 MiB
- largest file: `assets/hero-orb-figma.webp` at 588.2 KiB / 900.0 KiB
- homepage initial JS gzip: 75.8 KiB / 85.0 KiB
- largest page initial JS gzip: `decentralization.html` at 85.7 KiB / 125.0 KiB
- total JS gzip: 123.0 KiB / 130.0 KiB
- total CSS gzip: 32.5 KiB / 45.0 KiB

## Validation

Executed:

- `npm run check` passed.
- `npm run perf:audit` passed after one clean rerun.

The first Lighthouse attempt failed on `privacy.html` with `Unable to connect to Chrome`. A stale audit-owned Chrome process was left behind and terminated. The clean rerun completed successfully and Lighthouse budgets passed.

Final Lighthouse snapshot after the clean rerun:

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 96 | 1508 ms | 2712 ms | 14 ms | 0.000 | 1025 KiB | 60 |
| Ecosystem | 96 | 1658 ms | 2712 ms | 8 ms | 0.000 | 360 KiB | 54 |
| Markets | 97 | 1658 ms | 2487 ms | 6 ms | 0.000 | 287 KiB | 60 |
| Roadmap | 99 | 1505 ms | 2032 ms | 0 ms | 0.000 | 144 KiB | 15 |
| Open Work | 98 | 1658 ms | 2112 ms | 0 ms | 0.000 | 242 KiB | 28 |
| Open Work Detail | 99 | 1656 ms | 2033 ms | 0 ms | 0.000 | 145 KiB | 17 |
| Decentralization | 93 | 1806 ms | 3009 ms | 4 ms | 0.000 | 306 KiB | 31 |
| About | 93 | 1656 ms | 3159 ms | 0 ms | 0.000 | 380 KiB | 33 |
| Privacy | 99 | 1506 ms | 2034 ms | 0 ms | 0.000 | 144 KiB | 14 |

## Outcome

The route data ownership model is cleaner:

- Decentralization no longer imports the full Ecosystem catalog at runtime.
- Shared verification links remain maintained in one source file.
- Markets no longer references the Ecosystem runtime module for type-only needs.

The remaining performance bottleneck is still CSS delivery. The site continues to ship one global stylesheet to every page:

- `global-DxywElVP.css`: 214.32 kB raw / 33.23 KiB gzip

CSS splitting is the next major optimization pass, but it should be handled as a deliberate visual-regression-sensitive task because responsive overrides and shared component states are interleaved in `src/styles/global.css`.
