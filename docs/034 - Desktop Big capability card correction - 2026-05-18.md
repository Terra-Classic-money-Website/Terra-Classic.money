# Desktop Big capability card correction

Created: 2026-05-18

## Purpose

This document records the Desktop Big correction for the `Explore what Terra Classic enables` capability card grid.

The issue appeared at Desktop Big widths around `1500px-1680px`, especially `1520px`: the section kept the desired three-column layout, but card internals were still too fixed.

## Problem

The failure was inside the capability cards, not in the three-column grid itself:

- images used fixed pixel sizes and fixed `top` / `left` placement;
- tall-card images sat too close to card edges;
- wide-card images could occupy the same visual zone as copy and buttons;
- CTA buttons used a fixed `320px` width plus fixed margins, which failed in the narrowest Desktop Big columns.

Dropping the section to fewer columns would solve the symptom but weaken the Desktop Big layout. That was rejected.

## Implemented fix

The Desktop Big correction is scoped to `min-width: 1500px`.

For Desktop Big:

- tall cards keep images centered inside the available media zone below the CTA, with max size constraints and explicit edge whitespace;
- wide cards reserve a right-side media zone and keep copy/buttons in the left zone;
- images use max target sizes inside their reserved media zones instead of only fixed pixel placement;
- capability CTA buttons use local padding/gap adjustments so labels fit without changing the global button system.
- wide-card heights are content-driven where needed so Layer-2 and NFT cards keep proper bottom padding without shrinking images.

For `1500px-1680px`:

- capability card copy uses slightly tighter side spacing;
- capability CTA buttons use smaller horizontal padding and gap;
- the CTA width becomes fluid inside single-column cards;
- wide-card CTAs remain capped so they do not compete with right-side images.

## Scope boundary

This is a Desktop Big section-level fix.

It does not redefine Desktop Small, Tablet, or Mobile behavior. Those breakpoints will be handled separately.

## Validation plan

Before handoff:

```bash
npm run check
```

Rendered QA should verify:

- Desktop Big keeps the three-column capability grid;
- `1500px`, `1520px`, `1680px`, and wider Desktop Big widths have no CTA overflow;
- images do not touch card edges;
- images do not sit underneath copy or buttons;
- no horizontal document overflow appears.

## Validation result

Passed on 2026-05-18.

Command gate:

```bash
npm run check
```

Result:

- TypeScript project build passed.
- Vite production build passed.

Rendered Browser QA:

- Checked Desktop Big widths: `1520`, `1545`, `1680`, and `1920`.
- Confirmed the capability section keeps the three-column Desktop Big layout.
- Confirmed all capability CTAs fit inside their cards.
- Confirmed all capability images stay inside their cards.
- Confirmed first-row/tall-card images are centered in their available media zones rather than bottom-anchored.
- Confirmed the Forex image is no longer high in its card; it resolves to a `0px` measured vertical center offset inside its media zone at the checked widths.
- Confirmed Layer-2 and NFT wide-card CTAs keep the intended bottom padding at `1545px` and wider.
- Confirmed no horizontal document overflow at the checked widths.
- Browser console warning/error log was empty during the checked pass.
