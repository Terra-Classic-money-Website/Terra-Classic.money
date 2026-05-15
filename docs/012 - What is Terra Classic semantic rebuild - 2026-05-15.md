# What is Terra Classic semantic rebuild

Created: 2026-05-15

## Purpose

This pass rebuilds the `What is Terra Classic?` editorial section as real HTML/CSS with a layered visual composition and a real video modal trigger.

## Source Of Truth

- Figma file: `dZxJU7AlVV2k9ovNmmbeLI`
- Target frame: `1612:1342`
- Section node: `1612:1403`

## Implemented Values

- Section: `1288 x 1608`
- Section position in desktop frame after spacing correction: `x=328`, `y=1085`
- Editorial block: `1288 x 576`
- Editorial padding: `120px 64px 56px`
- Editorial grid: `715px` text column, `381px` popular-topics column, `64px` gap
- H2: Figtree `56px / 56px`, `600`
- Lead copy: Figtree `24px / 32px`, `600`
- Body copy: Figtree `16px / 24px`, `600`
- Popular topics:
  - `How to stake LUNC`
  - `Terra Classic ecosystem`
  - `Terra Classic Roadmap`
- Visual block: `1288 x 1032`
- Main orb: `left=156`, `top=0`, `975 x 968`
- Left visual: `left=-298`, `top=72`, `661 x 663`
- Right visual: `left=935`, `top=72`, `650 x 663`
- Video button: `left=356.5`, `top=455.43`, `575 x 121.14`
- Eight circular avatar elements positioned from Figma node coordinates.

## Assets Added

- `public/assets/what-surface.png`
- `public/assets/what-left-orb.png`
- `public/assets/what-right-orb.png`
- `public/assets/what-main-orb.png`
- `public/assets/what-avatar-1.png`
- `public/assets/what-avatar-2.png`
- `public/assets/what-avatar-3.png`
- `public/assets/what-avatar-4.png`
- `public/assets/what-avatar-5.png`
- `public/assets/what-avatar-6.png`
- `public/assets/what-avatar-7.png`
- `public/assets/what-avatar-8.png`
- `public/assets/what-link-arrow.svg`
- `public/assets/what-video-dots.svg`

Removed the obsolete placeholder `public/assets/what-orb.svg`.

Large Figma raster exports were resized to display-appropriate source dimensions where safe, reducing the worst asset sizes without changing CSS layout dimensions.

## Validation Notes

- `npm run check` passed.
- Browser viewport for measurement: `1632 x 1400`.
- Browser-measured section:
  - section: `x=328`, `y=1085`, `w=1288`, `h=1608`
  - editorial: `x=328`, `y=1085`, `w=1288`, `h=576`
  - heading: `x=392`, `y=1205`, `w=715`, `h=56`
  - popular topics: `x=1171`, `y=1205`, `w=381`, `h=147`
  - visual: `x=328`, `y=1661`, `w=1288`, `h=1032`
  - main orb: `x=484`, `y=1661`, `w=975`, `h=968`
  - video button: `x=685`, `y=2116`, `w=575`, `h=121`
- All section images loaded successfully.
- Video button opens the existing modal and the close button closes it.
- QA screenshot saved to `docs/audit-screenshots/what-section-semantic-pass-2026-05-15.png`.
