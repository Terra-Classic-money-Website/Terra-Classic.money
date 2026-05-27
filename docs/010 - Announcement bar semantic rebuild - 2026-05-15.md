# Announcement bar semantic rebuild

Created: 2026-05-15

## Purpose

This pass locks the top announcement/info bar as a real first-viewport component using the Figma node values and exported assets.

## Source Of Truth

- Figma file: `dZxJU7AlVV2k9ovNmmbeLI`
- Target frame: `1612:1342`
- Info box node: `1612:1346`

## Implemented Values

- Container: `1288 x 80`
- Position in desktop frame: `x=328`, `y=16`
- Border radius: `16px`
- Background: `#f3f3f3`
- Horizontal padding: `32px`
- Inner gap: `32px`
- Workshop mark: five Figma-exported SVG layers in a `118.496 x 32` composition
- Divider: `1 x 32`, black at `10%` opacity
- Text: Figtree `16px / 24px`, `600`
- Close visual: `16 x 16` dotted X

## Interaction Boundary

The close/X control is visible for design QA but intentionally non-interactive. It is rendered disabled and with pointer events disabled, so the announcement cannot be dismissed while the first-viewport implementation is being compared.

The component no longer changes background on hover because the inspected Figma info-box node exposes only the static/default state.

## Assets

- `public/assets/announcement-workshops-bottom.svg`
- `public/assets/announcement-workshops-main.svg`
- `public/assets/announcement-workshops-top.svg`
- `public/assets/announcement-workshops-dot-right.svg`
- `public/assets/announcement-workshops-dot-left.svg`
- `public/assets/announcement-close.svg`

## Validation Notes

- `npm run check` passed.
- Browser viewport: `1632 x 1000`.
- Browser-measured announcement bar:
  - bar: `x=328`, `y=16`, `w=1288`, `h=80`
  - logo: `118 x 32`
  - divider: `1 x 32`
  - text: Figtree `16px / 24px`, `600`
  - close visual: `16 x 16`
  - close is disabled and has `pointer-events: none`
- QA screenshot saved to `docs/audit-screenshots/announcement-semantic-pass-2026-05-15.png`.
