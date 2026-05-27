# Directory Navigation Button Design System Component

Created: 2026-05-26

## Scope

Added a new `Directory navigation button` component specimen to the `designsystem.html` Components section.

This component is used for in-page directory/category navigation and subpage section jumps. It is not a filter control because it scrolls users to an existing section instead of changing the visible dataset.

## Implementation Notes

- Added the `Directory navigation button` specimen to `src/designsystem.tsx`.
- Used the Ecosystem category labels and counts from `src/data/ecosystem.ts` so the specimen matches the supplied screenshot:
  - Applications `(15)`
  - Entertainment `(12)`
  - Blockchain information `(7)`
  - Wallets `(9)`
  - Blockchain tools `(16)`
  - Bridges `(6)`
  - Validators `(4)`
  - For developers `(16)`
  - Infrastructure & service providers `(5)`
- Promoted the existing page-specific `ecosystem-index` classes to neutral `directory-nav` and `directory-nav__button` classes.
- Updated Ecosystem and Markets directory navigation to use the neutral class names.
- Adjusted design-system-only component card index styles so `Open work card` and `Roadmap timeline` keep their preview behavior after the new component insertion.

No layout behavior change is intended for production pages.

## Validation Plan

- Run `npm run check`.
- Open `designsystem.html#components` locally and confirm the new component renders the supplied button set.
- Check Ecosystem and Markets pages still render directory navigation buttons with no old `ecosystem-index` selectors.

## Validation Results

- `npm run check` passed.
- Local browser QA passed at `http://127.0.0.1:5174/designsystem.html#components`.
- Confirmed the `Directory navigation button` component rendered 9 buttons:
  - `Applications (15)`
  - `Entertainment (12)`
  - `Blockchain information (7)`
  - `Wallets (9)`
  - `Blockchain tools (16)`
  - `Bridges (6)`
  - `Validators (4)`
  - `For developers (16)`
  - `Infrastructure & service providers (5)`
- Confirmed `ecosystem.html` renders the same 9 directory navigation buttons.
- Confirmed `markets.html` renders its two directory navigation buttons: `CEX (64)` and `DEX (11)`.
- Confirmed zero `.ecosystem-index` elements in the checked DOM.
- Confirmed no page-level horizontal overflow in the checked viewport.
