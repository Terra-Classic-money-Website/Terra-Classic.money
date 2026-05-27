# Mobile lower section spacing correction

## Scope

This note records the next Mobile breakpoint correction batch for the native assets intro, LUNC feature row readability, founder stories grid, community section rhythm, and FAQ spacing.

## Current phase

The project remains in responsive correction and implementation hardening. This is a Mobile-only refinement pass and does not change the product concept, homepage section order, roadmap scope, or GitHub Pages-only static delivery model.

## Relevant constraints

- Mobile corrections must preserve the already-correct desktop, desktop-small, tablet, and opened Mobile navigation work.
- `designsystem.html` and shared typography tokens remain the baseline, but compact repeated cards may use component-specific sizing when the Mobile container requires it.
- The founders section should show two founder story cards at a time on Mobile, without creating a second visible row.
- Section rhythm should follow the already-correct `What is Terra Classic?` Mobile pattern: tight headline-to-copy spacing and consistent major-block spacing.

## Implementation notes

- Reduced the Mobile `Terra Classic native assets:` headline-to-copy spacing from `32px` to `16px`.
- Reduced the Mobile LUNC background planet opacity to keep the asset row atmospheric but readable.
- Tightened the handoff from the native-assets CTA into `Terra Classic strengths:` by reducing the Mobile native-assets bottom padding and strengths top padding to a compact section boundary.
- Converted Mobile founder stories to a two-column, two-visible-card layout:
  - the third story is hidden on Mobile until carousel behavior is implemented
  - card padding, media height, play dots, and copy type are reduced for the two-column viewport
- Tightened `Build your own app on Terra Classic:` internals to match the same 16px headline-to-copy rhythm and a 48px handoff into the founder stories block.
- Set `Join Terra Classic community:` to a 16px headline-to-copy gap and 48px copy-to-buttons gap.
- Reduced the Mobile FAQ headline-to-question spacing and tightened FAQ group rhythm.

## Validation plan

- Render Mobile widths and inspect the affected sections visually.
- Verify there is no horizontal overflow or text overflow at narrow Mobile widths.
- Verify the founder grid shows exactly two visible cards in one row on Mobile.
- Verify LUNC row text remains readable over the dimmed background image.
- Run the final project gate: `npm run check`.

## Validation results

Rendered Mobile validation at `360px x 900px`:

- Page identity: homepage title matched `Terra Classic — Blockchain so decentralized, it’s out of this world`.
- Document width matched viewport width: `360px`, with no page-level horizontal overflow.
- Native assets headline-to-copy spacing rendered with `16px` top margin on the intro copy.
- LUNC row background image rendered at `0.42` opacity.
- Native-assets CTA to `Terra Classic strengths:` headline gap rendered at `32px`.
- Founder grid rendered as two columns (`144px 144px`) with exactly two visible founder cards.
- Founder cards rendered at content height (`321px`) instead of the old inherited `567px`.
- Community section rendered with `16px` headline-to-copy rhythm and `48px` copy-to-buttons rhythm.
- FAQ grid rendered with `32px` headline-to-question spacing and `40px` group spacing.
- Console warnings/errors: none captured during rendered validation.

Final project gate:

- `npm run check` passed.

Audit screenshots:

- `docs/audit-screenshots/mobile-native-assets-header-2026-05-20.png`
- `docs/audit-screenshots/mobile-lunc-row-readability-2026-05-20.png`
- `docs/audit-screenshots/mobile-native-to-strengths-gap-2026-05-20.png`
- `docs/audit-screenshots/mobile-founder-two-column-2026-05-20.png`
- `docs/audit-screenshots/mobile-community-spacing-2026-05-20.png`
- `docs/audit-screenshots/mobile-faq-spacing-2026-05-20.png`
