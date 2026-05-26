# Card Design System Component

Created: 2026-05-26

## Scope

Added a new `Card` component specimen to the `designsystem.html` Components section.

The component documents the main reusable card families already used across the website.

## Variants

The specimen includes three variants matching the supplied screenshots:

- Media card: image-led capability card using the `Passive income` Staking Protocol content.
- Text/action card: text card with optional button using the `Decentralization` strength content.
- Numbered card: number and text card using the `Corrections` About page contribution content.

## Implementation Notes

- Added `Card` to the design-system component index after `Avatar`.
- Reused current production classes:
  - `capability-card`
  - `strength-card`
  - `about-indexed-card`
- Added design-system-only sizing and layout rules in `src/styles/designsystem.css` so the variants can sit together as a specimen without changing production page behavior.
- Adjusted design-system-only component card index styles so `Open work card` and `Roadmap timeline` keep their preview behavior after the new component insertion.

No production page behavior change is intended.

## Validation Plan

- Run `npm run check`.
- Open `designsystem.html#components` locally and confirm the `Card` component renders all three variants.

## Validation Results

- `npm run check` passed.
- Local browser QA passed at `http://127.0.0.1:5174/designsystem.html#components`.
- Confirmed the `Card` component rendered 3 variants:
  - `Passive income` media card with image and `More about Staking Protocol` button.
  - `Decentralization` text/action card with `Find out more` button.
  - `01` / `Corrections` numbered text card.
- Confirmed variant dimensions in the checked viewport:
  - media card: `392px` by `680px`
  - text/action card: `392px` by `384px`
  - numbered card: `392px` by `384px`
- Confirmed no page-level horizontal overflow in the checked viewport.

## Spacing Correction

After review, the card specimen copy spacing was tightened:

- Headline-to-body spacing is explicitly controlled with `gap: 16px` in the card specimen copy blocks.
- Paragraph default margins are removed inside the card specimen so the 16px spacing is deterministic.
- The card specimen variants explicitly keep `padding-bottom: 32px`.
- The media image placement remains centered as originally intended; the spacing correction does not bottom-align the image.

Validation after this correction:

- `npm run check` passed.
