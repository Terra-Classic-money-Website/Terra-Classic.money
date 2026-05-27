# Founder Stories Semantic Rebuild

## Scope

Rebuilt the `Build your own app on Terra Classic` section as real React/HTML/CSS instead of the earlier rough card layout.

## Figma Source

- Frame: `Founders stories`
- Node: `1612:2144`
- Target size: `1288 x 1219`
- Founder story component source: `1612:909`

## Exported Assets

- `public/assets/founder-story-portrait.png`
- `public/assets/founder-button-arrow.svg`
- `public/assets/founder-arrow-left.svg`
- `public/assets/founder-arrow-right.svg`
- `public/assets/founder-play-dot.svg`
- `public/assets/founder-play-dot-alt.svg`

## Implementation Notes

- The desktop section now matches Figma geometry:
  - section: `1288 x 1219`
  - intro: `64 / 120 / 917 / 336`
  - documentation button: `64 / 400 / 366 / 56`
  - founder header: `64 / 520 / 1160 / 56`
  - founder grid: `64 / 592 / 1160 / 567`
  - cards: `376 x 567`, `16px` gap
- Founder cards use semantic article markup with real names and project labels.
- Portrait crop and play-dot overlay are built from exported Figma assets rather than CSS approximations.
- Responsive overrides preserve readable layout below the desktop frame.

## Validation

- `npm run build`
- Browser QA at a fixed `1632 x 1200` viewport confirmed the extracted section and child geometry.
- QA screenshots:
  - Figma reference: `docs/audit-screenshots/founders-figma-reference-2026-05-15.png`
  - Implementation: `docs/audit-screenshots/founders-rebuild-1632-2026-05-15.png`
