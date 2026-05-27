# Homepage Protocol Step Padding Correction

Created: 2026-05-27

## Scope

Corrected the perceived bottom padding imbalance in the homepage protocol step cards for Swap Protocol and Forex Protocol.

## Change

- Preserved the intended equal-height row behavior: step cards still stretch to the tallest card in their row.
- Removed fixed surplus row heights from Swap Protocol and Forex Protocol so each row sizes to the tallest actual card content instead of an over-reserved static height.
- Kept Staking Protocol unchanged because its existing card padding and row rhythm were already correct.
- Kept the existing `--tc-spacing-card-dense` card padding token unchanged.
- Kept mobile and smaller responsive behavior unchanged, because those layouts already use auto-height cards.

## Validation Plan

- Run the production build to confirm the CSS-only change does not break the static GitHub Pages artifact.
- Inspect the rendered homepage protocol section at the affected desktop breakpoint.
