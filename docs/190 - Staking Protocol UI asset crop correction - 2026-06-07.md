# Staking Protocol UI asset crop correction

Created: 2026-06-07

## Scope

Corrected the displayed crop of the Staking Protocol `Configure your staking position` UI asset in the homepage product section.

## Finding

The Figma MCP image URL exposed for the staking-position UI asset was byte-identical to the existing repository source:

- Figma node: `1612:1623`
- Inner image source dimensions: `384 x 336`

The visible mismatch was caused by exporting/using the inner bitmap instead of the cropped Figma frame. Figma places that full image into a shorter `223 x 182` visual frame and top-aligns the image, clipping surplus content from the bottom. The website used the full inner image, which created a crop/padding mismatch around the `Configure your staking position` headline.

## Change

- Replaced `asset-sources/assets/protocol-staking-ui-figma.png` with a top-aligned cropped version matching the Figma frame ratio: `384 x 314`.
- Preserved rounded transparent corners on the corrected PNG.
- Updated the intrinsic dimension map in `src/App.tsx`.
- Set `.protocol-ui--staking-stake` to `object-position: top center` as a defensive match for Figma's top-aligned frame behavior.
- Kept all other protocol UI assets unchanged.

## Validation plan

- Regenerate/check static templates and TypeScript with `npm run check:quick`.
- Run the production asset/build gate with `npm run check:build`.
- Render-check the Staking Protocol section at the affected desktop width and confirm the headline top padding matches the Figma reference.

## Validation record

- `npm run check:quick` passed.
- `npm run check:build` passed.
- `npm run check:build` confirmed `assets:build` generated the optimized staking UI derivatives after the corrected source PNG was written.
- Browser QA ran against `http://127.0.0.1:5174/#staking-protocol` at a `1632 x 1000` viewport.
- Final Playwright QA confirmed rendered `.protocol-ui--staking-stake` loaded `protocol-staking-ui-figma.avif` with natural dimensions `384 x 314`.
- Rendered `.protocol-ui--staking-stake` and its child image both resolved to `object-position: 50% 0%`, confirming top-aligned crop behavior.
- Saved QA screenshots:
  - `docs/audit-screenshots/staking-protocol-ui-crop-correction-2026-06-07.png`
  - `docs/audit-screenshots/staking-protocol-ui-crop-close-2026-06-07.png`
  - `docs/audit-screenshots/staking-protocol-ui-crop-final-2026-06-07.png`
