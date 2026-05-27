# Native assets semantic rebuild - 2026-05-15

## Scope

Rebuilt the `Terra Classic native assets` homepage section as structured React and CSS, using Figma node `1612:1822` as the source of truth.

## Figma alignment

- Matched the desktop section frame at `1288 x 2164`.
- Applied the Figma section padding of `120px 64px 60px` and the `64px` vertical rhythm between major blocks.
- Rebuilt the header, speculative asset row, multi-currency phase groups, final copy, and contact CTA as editable HTML text.
- Recreated the LUNC row with Figma dimensions, dark background, exported LUNC logo, exported market icons, and the clipped native background image.
- Rebuilt all Forex Protocol phases as semantic token lists rather than a flattened screenshot.

## Assets

Exported the native assets icon set from Figma into `public/assets`:

- `native-lunc-logo.svg`
- `native-lunc-bg.png`
- `native-cmc-icon.svg`
- `native-cg-icon.svg`
- `native-phase-icon.svg`
- `native-ustc-icon.svg`
- `native-button-arrow.svg`
- `native-token-*.png` for the multi-currency suite rows

The LUNC background was resized from the raw Figma export to `898 x 900` to preserve sharpness at the rendered crop while avoiding a large static payload.

## Implementation notes

- Token labels remain real text, with split code styling for the large base letters and smaller `TC` suffix seen in Figma.
- Phase badges use fixed Figma widths: `148px` for `IN PROGRESS`, `170px` for `COMMING SOON`.
- The Australian Dollar row intentionally keeps the Figma-visible `HKTC` code until the design/content source is corrected.
- Market/contact destinations are centralized in `src/data/links.ts` as TODO placeholders.

## Validation plan

- Run TypeScript/build validation.
- Use browser QA at desktop width to inspect the rebuilt section against the Figma reference overlay.
- Verify responsive behavior does not break the section below desktop sizes.
