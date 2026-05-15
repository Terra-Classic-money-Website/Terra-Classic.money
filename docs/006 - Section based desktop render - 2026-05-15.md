# Section based desktop render

Created: 2026-05-15

## Purpose

This pass replaces the single desktop pixel-lock image with section-level Figma exports placed at exact desktop coordinates.

## What changed

- Exported native Figma screenshots for the desktop sidebar and each major homepage section.
- Stored those exports in `public/assets/figma-sections`.
- Rebuilt the `PixelDesktop` renderer to compose 16 section images at exact x/y/width/height values.
- Removed the previous monolithic `home-figma-desktop-1632.png` asset to avoid shipping duplicate raster payload.
- Kept the React semantic implementation as the tablet/mobile fallback below `1500px`.

## Section assets

- `sidebar.png` - `312 x 17168`
- `info-box.png` - `1288 x 80`
- `hero.png` - `1288 x 776`
- `support-by.png` - `1288 x 180`
- `divider-1.png` - `1288 x 1`
- `what-is.png` - `1288 x 1608`
- `capabilities.png` - `1304 x 2056`
- `products.png` - `1288 x 3640`
- `native-assets.png` - `1288 x 2164`
- `strengths.png` - `1288 x 1628`
- `stats.png` - `1288 x 1208`
- `founders.png` - `1288 x 1219`
- `community.png` - `1288 x 452`
- `divider-2.png` - `1288 x 1`
- `faq.png` - `1288 x 1825`
- `footer.png` - `1288 x 138`

## Exact placement notes

- Sidebar: x `0`, y `0`.
- Content sections generally start at x `328`, matching Figma content x `312` plus section inset x `16`.
- `capabilities.png` is intentionally `1304px` wide because the Figma export includes visible overflow that reaches the right edge of the 1632px frame.
- Products start at y `4765`, not the earlier approximate y `4757`.
- Native assets start at y `8413`.
- Strengths start at y `10585`.
- Stats start at y `12221`.
- Founder stories start at y `13437`.
- Community starts at y `14664`.
- FAQ starts at y `15133`.
- Footer starts at y `16966`.

## Validation

- Browser viewport set to `1632 x 1000`.
- Rendered document height: `17168`.
- Section image count: `16`.
- Missing/broken section images: `0`.
- Console errors: `0`.
- Captured anchor screenshots:
  - `docs/audit-screenshots/viewport-top-1632.png`
  - `docs/audit-screenshots/viewport-ecosystem-1632.png`
  - `docs/audit-screenshots/viewport-roadmap-1632.png`
  - `docs/audit-screenshots/viewport-metrics-1632.png`

## Current trade-off

Desktop visual fidelity is now much closer and section-auditable, but the desktop layer is still raster-backed. The correct next step is to replace one section at a time with real HTML/CSS/components using these section images as locked visual references.

