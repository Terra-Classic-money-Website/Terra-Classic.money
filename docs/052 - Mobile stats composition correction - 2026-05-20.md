# Mobile Stats Composition Correction - 2026-05-20

## Scope

Corrected the mobile breakpoint behavior for the product protocol planet motion and the "Efficiency driven by decentralization" section.

## Changes

- Restored protocol planet hover motion on mobile by replacing the previous `animation: none` override with a mobile-safe animation that preserves horizontal centering.
- Reworked the decentralization stats panel mobile layout from fixed absolute top offsets to a grid-based visual row.
- Kept the main blue planet horizontally centered inside the web-pattern composition across mobile widths.
- Left-aligned the three metric boxes inside the section instead of centering the metric group at wider mobile widths.
- Added protected space between the intro copy and planet composition so small mobile widths do not push planets into the text.
- Matched the metric-to-button gap to the button-to-section-bottom padding.

## Validation Notes

- Checked mobile widths at 360px, 390px, 600px, and 721px.
- Confirmed the mobile protocol planet animation resolves to `protocol-orb-hover-mobile`.
- Confirmed the metric-to-button gap and button-to-panel-bottom spacing are both 24px at 360px, 390px, and 721px.
- Saved visual audit screenshots in `docs/audit-screenshots`.
- `npm run check` passed after the CSS changes.
