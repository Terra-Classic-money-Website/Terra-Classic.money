# Product and decentralization viewport height correction

Created: 2026-05-18

## Purpose

Adjust the Staking, Swap, Forex, and `Efficiency driven by decentralization` sections so their non-mobile layouts use a viewport-height-based composition instead of the previous fixed `1208px` desktop panel height or `auto` compact-desktop height.

## Scope

- Product protocol panels now use `95vh` outside the mobile breakpoint.
- The decentralization stats panel now uses `95vh` outside the mobile breakpoint.
- The product visual compositions were converted from fixed pixel-positioned absolute layers to scalable percentage-positioned layers inside a dedicated visual row.
- Product planet centers are aligned to the panel center line across desktop, tablet, and mobile; the wider UI composition is offset per product so overlays stay locked to the planet without pulling the planet off-center.
- The stats planet composition is now split into two native-resolution layers:
  - `stats-small-planets.png` is capped at the original `1161 x 636` export size, starts `40px` below the copy block, has no bottom spacing constraint, and can sit behind the metric cards.
  - `stats-big-planet.png` is capped at its native crop size and is independently aligned to the decagon/web center point.
- Mobile remains auto-height and keeps the existing mobile-specific absolute visual positioning.

## Layout model

The affected non-mobile sections now use three vertical rows:

1. Header/copy.
2. Scalable planet and UI composition.
3. Bottom cards/actions or metrics/CTA.

The visual row is the compressible layer. Text content, product steps, metric cards, and CTAs keep their normal type scale and layout behavior while the planet/UI artwork scales proportionally to fit the available `95vh` panel height.

## Spacing target

At Desktop Big (`1632 x 1200` QA viewport), the product and stats panels now keep `40px` above and below the visual composition:

- Staking: `40px` header-to-visual and `40px` visual-to-bottom.
- Swap: `40px` header-to-visual and `40px` visual-to-bottom.
- Forex: `40px` header-to-visual and `40px` visual-to-bottom.
- Decentralization stats: `40px` copy-to-planets and `40px` planets-to-bottom.

At smaller non-mobile heights, the same structure remains in place with the same `40px` visual spacing so the sections keep the `95vh` requirement without overflowing horizontally.

## Validation plan

Run:

```bash
npm run check
```

Rendered QA should inspect:

- Desktop Big: `1632 x 1200`.
- Desktop Small: `1440 x 900`.
- Tablet/navigation breakpoint: `1199 x 900`.
- Mobile control check: `390 x 844`.
- No horizontal document overflow.
- Product planet/UI layers remain proportional while scaling.
- Mobile remains auto-height rather than `95vh`.
