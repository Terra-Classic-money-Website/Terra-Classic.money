# Hero LCP discovery and responsive image pass - 2026-05-27

## Scope

This pass follows the render-containment work and targets remaining hero LCP issues identified by Lighthouse.

Latest Lighthouse JSON showed:

- Decentralization LCP element: `stats-decagon-pattern` (`decagon.svg`)
- About LCP element: `about-hero__planet` (`about-hero-planet2.webp`)

Both were React-discovered images, so Lighthouse flagged LCP request discovery before this pass.

## Implementation

Added page-specific LCP preload hints:

- `decentralization.html` preloads `assets/decagon.svg`
- `about.html` preloads the About hero image using `imagesrcset` and `imagesizes`

Added matching `fetchPriority="high"` to the React-rendered LCP image elements:

- `src/pages/DecentralizationPage.tsx`
- `src/pages/AboutPage.tsx`

Extended the static image build pipeline:

- `scripts/build-images.mjs` now generates:
  - `public/assets/about-hero-planet2-640.webp`
  - `public/assets/about-hero-planet2-768.webp`
  - `public/assets/about-terraform-labs-logo-240.webp`

Updated About image markup:

- About hero uses `srcSet`/`sizes` while keeping the original `img` as the layout-owning element.
- Terraform Labs timeline logo uses a smaller responsive candidate.

No visual layout rules were changed.

## Build Result

Generated assets:

- `about-hero-planet2-640.webp`
- `about-hero-planet2-768.webp`
- `about-terraform-labs-logo-240.webp`

Deterministic performance budget result after this pass:

- total `dist`: 6.15 MiB / 12.00 MiB
- largest file: `assets/hero-orb-figma.webp` at 588.2 KiB / 900.0 KiB
- homepage initial JS gzip: 75.8 KiB / 85.0 KiB
- largest page initial JS gzip: `decentralization.html` at 85.8 KiB / 125.0 KiB
- total JS gzip: 123.2 KiB / 130.0 KiB
- total CSS gzip: 32.8 KiB / 45.0 KiB

## Validation

Executed:

- `npm run check` passed.
- `npm run perf:audit` passed.

Final Lighthouse snapshot:

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 98 | 1403 ms | 2370 ms | 29 ms | 0.000 | 1026 KiB | 60 |
| Ecosystem | 96 | 1657 ms | 2636 ms | 15 ms | 0.000 | 360 KiB | 53 |
| Markets | 97 | 1658 ms | 2487 ms | 7 ms | 0.000 | 286 KiB | 59 |
| Roadmap | 99 | 1507 ms | 2035 ms | 0 ms | 0.000 | 145 KiB | 15 |
| Open Work | 99 | 1660 ms | 2040 ms | 0 ms | 0.000 | 242 KiB | 27 |
| Open Work Detail | 99 | 1655 ms | 2033 ms | 0 ms | 0.000 | 146 KiB | 17 |
| Decentralization | 93 | 1807 ms | 3010 ms | 5 ms | 0.000 | 306 KiB | 31 |
| About | 98 | 1656 ms | 2184 ms | 0 ms | 0.000 | 279 KiB | 31 |
| Privacy | 99 | 1506 ms | 2033 ms | 0 ms | 0.000 | 144 KiB | 14 |

Lighthouse budgets passed.

Additional insight checks:

- About LCP discovery passed.
- About image-delivery insight passed with no remaining image-delivery items.
- Decentralization LCP discovery passed.
- Decentralization still has a small image-delivery warning for `stats-big-planet.webp` with roughly 7 KiB estimated savings.
- Decentralization and About still report the global stylesheet as render-blocking.

## Outcome

About is now effectively inside the target LCP range in the local mobile Lighthouse run:

- before this LCP-focused pass: 2938 ms LCP / score 94 after render containment
- after preload and responsive image work: 2184 ms LCP / score 98

Decentralization request discovery is fixed, but its LCP remains around 3 seconds. The remaining issue is no longer asset discovery; it is the page's hero render path and the still-global render-blocking CSS.

Next recommended work:

- Optimize Decentralization hero render path carefully, especially the decorative SVG/image layering.
- Then perform a staged CSS split with screenshot QA, because the global CSS bundle remains the largest render-blocking bottleneck.
