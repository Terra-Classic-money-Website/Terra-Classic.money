# About Donation Modal

## Scope

Added a small donation-address modal to the `Make a donation` action in the `Support the public information layer` section on `about.html`.

## Implementation Notes

- Changed the `Make a donation` action from a self-link to a button that opens an accessible dialog.
- Added LUNC, BTC Native SegWit, and BNB donation addresses.
- Added copy buttons for each address to reduce manual selection errors.
- Added a fallback copy path for browsers that block the async clipboard API.
- Added optional attribution instructions inside the modal.
- Replaced the literal close glyph with the same five-dot X control used by the site infobar.
- Reused existing modal/backdrop behavior, pill-button styling, and design tokens.
- Kept the modal page-local; no `designsystem.html` changes were made.

## Validation

Commands run:

```bash
npm run check
```

Result: passed.

Rendered QA:
- modal opens from the `Make a donation` action on desktop and mobile
- all three donation addresses render
- optional attribution instructions render
- no horizontal overflow on desktop `1632 x 1100`
- no horizontal overflow on mobile `390 x 844`
- copy button changes to `Copied` after a real browser click

QA screenshots:
- `docs/audit-screenshots/about-donation-modal-desktop-2026-05-26.png`
- `docs/audit-screenshots/about-donation-modal-mobile-2026-05-26.png`
