# Strengths semantic rebuild - 2026-05-15

## Scope

Rebuilt the `Terra Classic strenghts:` section as measured React and CSS using Figma node `1612:2023` as the source of truth.

## Figma alignment

- Matched the section frame at `1288 x 1628`.
- Applied section padding equivalent to the Figma layout: `60px 64px 120px`.
- Rebuilt the heading and intro copy as real text with the Figma `771px` intro width.
- Replaced the rough CSS grid with the Figma card matrix:
  - card size: `384 x 384`
  - boxes area: `1160 x 1168`
  - row/column positions from Figma metadata
  - special visual card at `x=390`, `y=392`
- Rebuilt card text and buttons as real HTML.

## Assets

- Exported `strength-visual-card.png` from Figma node `1612:2046`.
- Added `strength-button-arrow.svg` derived from the existing Figma dot-arrow SVG with the white-card grey fill treatment.

## Validation plan

- Run production build.
- Browser-check desktop geometry at the `1632px` target viewport.
- Verify no broken images and that the section top remains aligned at Figma y-position `10585`.
