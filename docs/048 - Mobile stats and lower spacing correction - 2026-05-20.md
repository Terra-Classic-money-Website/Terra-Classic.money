# Mobile stats and lower spacing correction

## Scope

This note records the follow-up Mobile breakpoint fixes for the decentralization stats CTA, Figma-aligned metric cards, founder-to-community spacing, and text-to-button spacing in the founders and community sections.

## Current phase

The project remains in responsive correction and implementation hardening. This is a Mobile-only refinement pass and does not change the product concept, homepage section order, roadmap scope, or GitHub Pages-only static delivery model.

## Relevant constraints

- Mobile corrections must preserve the existing desktop, desktop-small, tablet, and opened Mobile menu work.
- `designsystem.html` and shared typography tokens remain the baseline.
- Figma node `1756:3418` is used as the visual authority for the Mobile decentralization stats card layout.
- No new runtime dependency or hosting behavior is introduced.

## Figma reference

- Node: `1756:3418`
- Frame: `344px x 590px`
- Panel padding: `24px`
- Stat row gap: `8px`
- Metric card padding: `16px`
- Metric card radius: `16px`
- Metric number: `40px / 44px / 600`
- Metric label: `12px / 16px / 600`
- Metric card widths: content-driven, matching approximately `125px`, `146px`, and `184px`
- LUNC icon inside the third metric: `32px`

## Implementation notes

- Added a Mobile-specific stats CTA label: `More about Terra classic decentralization`.
- Rebuilt the Mobile metric cards to match the Figma sizing and wrapping:
  - first metric: `125px x 120px`
  - second metric: `146px x 120px`
  - third metric: `184px x 120px`
  - all use `16px` padding and `12px` internal gap
  - third metric icon is reduced to `32px`
- Preserved the existing Mobile stats planet artwork and section composition. The Figma implementation scope is limited to the three metric cards, per Dawid's correction.
- Reduced the founder intro text-to-button gap by removing the extra Mobile button top margin.
- Reduced the founder cards to community section handoff by lowering Mobile founders bottom padding and community top padding to a compact `32px` section handoff.
- Reduced the community copy-to-buttons gap from `48px` to `32px`.

## Validation plan

- Render the homepage at Mobile width and inspect the stats panel, founders section, and community section.
- Verify the Mobile stats CTA label changes without changing the desktop label.
- Verify metric card dimensions and third-card icon size against the Figma node.
- Verify founder-to-community and copy-to-button spacing are visibly tighter.
- Check console health and horizontal overflow.
- Run the final project gate: `npm run check`.

## Validation results

Rendered Mobile validation at `360px x 900px`:

- Mobile stats CTA label rendered as `More about Terra classic decentralization`.
- Desktop/tablet stats CTA label remained `Find out more about Terra Classic decentralization`.
- Existing Mobile stats planets remained visible:
  - `.stats-small-planets`: `display: block`
  - `.stats-big-planet`: `display: block`
- Metric card dimensions matched the Figma card model:
  - first metric: `125px x 120px`
  - second metric: `146px x 120px`
  - third metric: `184px x 120px`
  - third metric icon: `32px x 32px`
- Founder intro text-to-button gap rendered at `16px`.
- Founder cards to community headline gap rendered at `32px`.
- Community copy-to-buttons gap rendered at `32px`.
- Mobile founder grid still renders exactly two visible cards.
- Document width matched viewport width: `360px`.
- Console warnings/errors: none captured during rendered validation.

Final project gate:

- `npm run check` passed.

Audit screenshots:

- `docs/audit-screenshots/mobile-stats-cards-2026-05-20.png`
- `docs/audit-screenshots/mobile-founders-button-spacing-2026-05-20.png`
- `docs/audit-screenshots/mobile-founders-community-gap-2026-05-20.png`
- `docs/audit-screenshots/mobile-community-button-spacing-2-2026-05-20.png`
