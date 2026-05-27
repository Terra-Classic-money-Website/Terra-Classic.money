# Decentralization stats glow animation

Created: 2026-05-17

## Purpose

Apply the product-section animated glow treatment to the `Efficiency driven by decentralization` stats section.

## Scope

- Only the stats panel was changed.
- No planet hover animation was added for this section.
- The decagon/web pattern now uses the dedicated `public/assets/decagon.svg` asset.
- The planet composition now uses a clean transparent Figma export: `public/assets/stats-planets-figma.png`.

## Layer model

The stats panel now uses:

1. `--lunc-black` panel background.
2. Animated `.stats-glow` cyan/blue glow stack.
3. `decagon.svg` web pattern layer.
4. `stats-planets-figma.png` planet composition.
5. Copy, metric cards, and CTA button.

This replaces the previous dependency on the flattened `stats-visual-bg.png` layer for this section implementation.

## Motion model

- Three animated glow layers were added:
  - large dark-blue atmospheric field,
  - brighter cyan core centered toward the lower section,
  - smaller cyan source layer for concentrated light.
- The top of the glow is masked so the headline/copy region stays closer to clean `--lunc-black`.
- The glow animations are covered by the reduced-motion guard.

## Validation plan

Run:

```bash
npm run check
```

Rendered QA should inspect:

- Desktop stats panel at `1632 x 1000`.
- Mobile stats panel at `390 x 844`.
- Console errors and missing assets.
- Presence of three `.stats-glow` layers.
- Layout stability for copy, metric cards, and CTA.

## Validation record

- `npm run check` passed.
- Browser QA desktop viewport: `1632 x 1000`.
- Browser QA mobile viewport: `390 x 844`.
- Browser console errors/warnings: `0` relevant entries.
- Confirmed `.stats-glow` renders three layers using `stats-blue-field`, `stats-cyan-core`, and `stats-cyan-source`.
- Confirmed layer order: animated glow at `z-index: 1`, `decagon.svg` at `z-index: 2`, `stats-planets-figma.png` at `z-index: 3`, copy and metric cards at `z-index: 4`.
- Confirmed the stats section no longer relies on the flattened `stats-visual-bg.png` for the visible decagon/planet composition.
- Confirmed `decagon.svg` is the existing Figma-sized section asset: `1288 x 1208`.
- Exported the Figma planets group `1612:2093` as `stats-planets-figma.png` at its exact design size: `1161 x 636`.
- Confirmed mobile stats layout remains stable: metric cards are full-width, CTA remains inside the panel, and the copy-to-bottom spacing is preserved.
- Note: the in-app browser QA environment reports `prefers-reduced-motion: reduce`, so computed glow animations are intentionally suppressed there by the project accessibility guard even though the animation rules are present.
- Saved QA screenshots:
  - `docs/audit-screenshots/stats-glow-desktop-2026-05-17.png`
  - `docs/audit-screenshots/stats-glow-mobile-2026-05-17.png`
