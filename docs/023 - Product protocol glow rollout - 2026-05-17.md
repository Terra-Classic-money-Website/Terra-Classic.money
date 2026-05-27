# Product protocol glow rollout

Created: 2026-05-17

## Purpose

Extend the Staking Protocol animated background treatment to the remaining product protocol panels: Swap Protocol and Forex Protocol.

## Scope

- Staking, Swap, and Forex now share the same product-section layer model.
- The product-specific difference is the brighter glow color:
  - Staking: LUNC yellow.
  - Swap: saturated cyan-blue.
  - Forex: slightly cooler cyan-blue.
- The old static gradient backgrounds for Swap and Forex were removed in favor of animated HTML/CSS glow layers.

## Layer model

Each product protocol panel now uses:

1. `--lunc-black` panel background.
2. Animated `.protocol-glow--{id}` glow stack.
3. Decorative `.protocol-lines` vertical separators.
4. Product planet image.
5. Product UI images.
6. Copy, status badge, steps, and action buttons.

## Motion model

- All product panels use the same dark-blue atmospheric glow animation.
- Each panel has a brighter animated core and source layer in its product color.
- Each product planet uses the same 16px total hover loop via `protocol-orb-hover`.
- UI images stay fixed so the planet appears to float behind the interface rather than moving the entire composition.

## Validation plan

Run:

```bash
npm run check
```

Rendered QA should inspect:

- Desktop product protocol panels at `1632 x 1000`.
- One mobile viewport at `390 x 844`.
- Console errors and missing assets.
- Animation presence for all three protocol glow stacks and all three planet images.
- Layout stability: no intro-copy/visual overlap and no visual/How-it-works overlap.

## Validation record

- `npm run check` passed.
- Browser QA desktop viewport: `1632 x 1000`.
- Browser QA mobile viewport: `390 x 844`.
- Browser console errors/warnings: `0` relevant entries.
- Confirmed Staking, Swap, and Forex each render three glow layers.
- Confirmed Staking uses yellow bright glow layers, while Swap and Forex use blue/cyan bright glow layers.
- Confirmed Staking, Swap, and Forex planet images run `protocol-orb-hover` with `7s` duration.
- Confirmed planet Y positions change during browser sampling while UI card Y positions stay fixed.
- Fixed mobile-specific copy/visual overlap for Swap and Forex by lowering their mobile visual compositions below the longer intro copy.
- Confirmed final mobile spacing:
  - Staking: `36px` between intro copy and visual.
  - Swap: `52px` between intro copy and visual.
  - Forex: `52px` between intro copy and visual.
- Saved QA screenshots:
  - `docs/audit-screenshots/protocol-glow-rollout-desktop-2026-05-17.png`
  - `docs/audit-screenshots/protocol-glow-rollout-swap-desktop-2026-05-17.png`
  - `docs/audit-screenshots/protocol-glow-rollout-forex-desktop-2026-05-17.png`
  - `docs/audit-screenshots/protocol-glow-rollout-mobile-2026-05-17.png`
