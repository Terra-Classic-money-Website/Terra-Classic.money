# Capabilities semantic rebuild

## Scope

Rebuilt the `Explore what Terra Classic enables` section as semantic React/HTML with measured desktop layout from the Figma section node `1612:1458`.

## Figma alignment

- Section: `1288px` design area, `120px` vertical padding, `64px` horizontal padding, `64px` header-to-grid gap.
- Header: `895px` wide text block, `56px / 56px` heading, `24px / 32px` intro copy.
- Cards: positioned from the Figma card coordinates instead of a generic equal grid.
- CTA buttons: `320px x 56px` pill buttons with exported Figma SVG icons.
- Visuals: replaced the placeholder capability artwork with Figma-exported PNG assets.

## Assets exported

- `public/assets/capability-staking-figma.png`
- `public/assets/capability-forex-figma.png`
- `public/assets/capability-defi-figma.png`
- `public/assets/capability-build-figma.png`
- `public/assets/capability-ecosystem-figma.png`
- `public/assets/capability-layer2-figma.png`
- `public/assets/capability-nft-figma.png`
- `public/assets/capability-arrow.svg`
- `public/assets/capability-defi-arrow.svg`
- `public/assets/capability-forex-icon.svg`
- `public/assets/capability-layer2-icon.svg`
- `public/assets/capability-staking-icon.svg`

## Validation

- `npm run check` passed after implementation.
- Browser QA was run against `http://127.0.0.1:5173/#ecosystem`.
- At the desktop composition coordinates, card positions now follow the Figma grid: first row `384 / 376 / 384`, `8px` gutters, wide lower cards, and `1536px` grid height.

## Known follow-up

The section CTA destinations are centralized through `src/data/links.ts`. Final external URLs still need to replace the existing `TODO_REPLACE_*` placeholders once Dawid confirms the target destinations.
