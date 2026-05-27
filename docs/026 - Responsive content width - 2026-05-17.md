# Responsive content width

Created: 2026-05-17

## Purpose

This task removes the fixed right-content width from the homepage so the website content area expands and contracts with the available viewport width while preserving the existing left sidebar behavior.

## Scope

- Updated the main content column to use normal block sizing beside the fixed sidebar instead of the old fixed `--content-width` cap.
- Removed the `1288px` max-width cap from the major homepage panels.
- Converted fixed `1160px` inner rows and grids to fluid `100%` widths where the section should scale with the content area.
- Made product protocol panels, product step rows, capabilities cards, native asset rows, strengths cards, stats metrics, founder cards, community buttons, FAQ columns, and footer CTA fill their available section width.
- Kept the desktop sidebar width, collapsed sidebar width, and mobile drawer model unchanged.

## Responsive behavior

- Large desktop: the right content area now fills the viewport area remaining after the fixed sidebar and 16px page padding.
- Intermediate desktop/tablet: product protocol panels and capabilities cards switch to their responsive layouts before fixed internals can overflow the narrower right column.
- Mobile: the existing top bar and off-canvas sidebar behavior remains active below `1200px`.
- Decorative glow/orb layers are clipped at page level so visual effects cannot create horizontal document scroll.

## Implementation notes

- Removed the unused `--content-width` token after replacing its only production usage.
- Centered product protocol visual compositions inside wider product panels.
- Anchored the native LUNC row background from the right so it stays inside the row as the row width changes.
- The internal Figma comparison layer remains available, but the semantic content layer is now viewport-fluid.

## Validation plan

Run:

```bash
npm run check
```

Rendered QA should verify:

- The right content column widens on large desktop viewports.
- Product panels and step grids widen with the section.
- The sidebar geometry and mobile drawer behavior remain unchanged.
- No horizontal document scroll appears on desktop, intermediate, or mobile widths.

## Validation record

Initial validation completed during implementation:

- `npm run typecheck` passed.
- `npm run build` passed.
- Browser QA at `1920 x 1080` confirmed:
  - sidebar width: `312px`
  - main width: `1593px`
  - hero/product panel width: `1561px`
  - product steps width: `1433px`
  - document scroll width equals client width: `1905px`
- Browser QA at `390 x 844` confirmed:
  - mobile top bar remains visible
  - sidebar remains off-canvas until opened
  - main width equals client width: `375px`
  - document scroll width equals client width: `375px`
  - drawer open state still works
- Browser console warnings/errors during QA: none.

Final gate:

```bash
npm run check
```

Result: passed.
