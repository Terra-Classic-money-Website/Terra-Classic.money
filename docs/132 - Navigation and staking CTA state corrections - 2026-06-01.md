# Navigation and staking CTA state corrections

Created: 2026-06-01

## Scope

This task applies two homepage/sidebar corrections:

- Keep the `Layer 2` external navigation item visible, but make it disabled, non-clickable, and non-hoverable using the `LUNC LIGHT GRAY` visual state.
- Remove the `Staking rewards calculator` CTA from the Staking Protocol action row.

## Implementation Notes

- `Layer 2` is now marked with `disabled: true` in shared navigation data.
- The sidebar renderer now outputs disabled external navigation as a semantic non-link element with `aria-disabled="true"`.
- The disabled state preserves the external-link icon, with both text and icon visually grayed out.
- The design-system left-section preview consumes the same disabled state, so the local source-of-truth preview stays aligned with production.
- The Staking Protocol action list now contains only `Find a wallet and stake` and `Staking Protocol docs`.

## Validation

Completed validation:

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run check` passed, including the production build and performance budget.
- Browser QA passed on `http://127.0.0.1:5174/`:
  - Desktop viewport confirmed `Layer 2` renders as a disabled non-anchor item with the icon preserved.
  - Mobile drawer confirmed `Layer 2` renders as a disabled non-anchor item with the icon preserved.
  - Staking Protocol section confirmed `Staking rewards calculator` is absent and the remaining two CTA buttons render.
  - Browser console had no warnings or errors.
