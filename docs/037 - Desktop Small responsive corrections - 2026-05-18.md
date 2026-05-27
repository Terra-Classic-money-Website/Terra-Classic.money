# Desktop Small responsive corrections

## Scope

This note records the Desktop Small pass for the `max-width: 1499px` breakpoint, validated across the `1300px-1499px` range.

Desktop Small keeps the public desktop structure with the left sidebar, but uses breakpoint-specific layout and asset scaling corrections so dense sections do not collide or read as squeezed.

## Changes

- Hero: moved the hero planet farther right so it no longer sits below the text block at Desktop Small widths.
- Hero: allowed hero link rows to grow vertically when a link wraps, preserving the divider spacing below the wrapped Institutions link.
- Hero: kept the dot-arrow icons vertically centered inside each hero link row, including wrapped two-line links.
- Logo strip: reduced partner-logo visual scale and used explicit gaps so the temporary partner logos no longer touch.
- Popular topics: narrowed the right-side popular-topics column to give the editorial copy area more room.
- Capabilities: changed `Explore what Terra Classic enables:` to a 2-column Desktop Small grid.
- Product panels: centered product title-row items vertically so the product icon, name, APR badge, and active badge align consistently.
- Native assets: changed the stable-asset token grids to 2 columns so the currency cards fit without compression.
- Strengths: reduced the center planet visual inside the strengths grid so it keeps clear inset spacing from the card edges.
- Decentralization stats: added Desktop Small wrap-threshold overrides so the spacing between the text block and planet field remains 40px when the heading/body wrapping changes.

## Validation

Rendered QA was run against the local Vite app at `http://127.0.0.1:5175/`.

Measured widths:

- `1300px`
- `1323px`
- `1334px`
- `1335px`
- `1336px`
- `1337px`
- `1387px`
- `1388px`
- `1390px`
- `1499px`

Confirmed:

- Hero copy and hero planet do not overlap.
- Wrapped Institutions link keeps spacing before the next divider/link row.
- Logo strip has positive visual gaps between temporary logos.
- Popular topics column is reduced to `320px`.
- Capabilities grid resolves to 2 columns.
- Product header centers align across icon/title/status controls.
- Native assets phase grids resolve to 2 columns.
- Strengths planet keeps visible edge inset.
- Decentralization stats text-to-planet spacing remains 40px across Desktop Small wrap thresholds.
- No horizontal page overflow was detected in the tested Desktop Small widths.
