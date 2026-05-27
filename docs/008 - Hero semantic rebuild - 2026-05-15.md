# Hero semantic rebuild

Created: 2026-05-15

## Purpose

This pass starts the transition from raster-backed desktop fidelity toward a real, production-quality frontend by rebuilding the hero section as semantic React/HTML and CSS while retaining the exported Figma hero section PNG as the comparison target.

## Source Of Truth

- Figma file: `dZxJU7AlVV2k9ovNmmbeLI`
- Target frame: `1612:1342`
- Hero node: `1612:1347`
- Figma hero size: `1288 x 776`
- Figma hero position in desktop frame: `x=328`, `y=104`

## Implemented Values

- Hero panel: `1288 x 776`, `16px` radius, `64px` padding.
- Headline block: `x=64`, `y=64`, `w=703`, `h=383`.
- H1: Figtree, `72px`, `72px` line-height, `600`.
- Supporting copy: Figtree, `24px`, `32px` line-height, `600`.
- Background image: Figma-exported image at `left=-161`, `top=-596`, `2048 x 2048`.
- Main 3D orb: Figma-exported image at `left=848`, `top=-80`, `924.49 x 918.31`.
- Hero grid lines: exact Figma x positions `257`, `515`, `773`, `1031`.
- CTA group row: `x=64`, `y=520`, `w=1160`, `gap=8`.
- CTA cards:
  - Users: `381.33 x 192`
  - Developers: `381.33 x 146`
  - Institutions: `381.33 x 147`
- CTA card logos and link arrow are Figma-exported SVG assets.

## Assets Added

- `public/assets/hero-bg-figma.png`
- `public/assets/hero-orb-figma.png`
- `public/assets/hero-users-logos.svg`
- `public/assets/hero-developers-logos.svg`
- `public/assets/hero-institution-logo.svg`
- `public/assets/link-arrow.svg`

Removed the older approximate `hero-bg.png` and `hero-orb.png` assets so the hero has one canonical Figma-derived asset path.

Also replaced the broken single-file announcement logo export with the exact five-layer Figma workshop mark because it sits directly above the hero and affects every hero comparison screenshot. The announcement close control is visible again using the Figma dotted X geometry, but it remains disabled so the announcement cannot be dismissed during QA.

## Validation Notes

- Browser viewport: `1632 x 1000`.
- Implementation screenshot saved to `docs/audit-screenshots/hero-semantic-pass-2026-05-15.png`.
- Browser-measured semantic hero:
  - hero: `x=328`, `y=104`, `w=1288`, `h=776`
  - headline: `x=392`, `y=168`, `w=703`, `h=216`
  - headline block: `x=392`, `y=168`, `w=703`, `h=383`
  - orb: `x=1176`, `y=24`, `w=924`, `h=918`
  - cards: `381px` wide, heights `192`, `146`, `147`

## Known Scope Boundary

This pass only rebuilds the hero section as real frontend. Other sections still need the same treatment in later passes.
