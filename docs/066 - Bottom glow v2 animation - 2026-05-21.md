# Bottom glow v2 animation

## Scope

Implemented a second glow animation model for the three protocol/product panels and the `Efficiency driven by decentralization` section.

## Variant model

- `v1` remains the base three-layer bottom glow implementation.
- `v2` is activated from `src/App.tsx` through `BOTTOM_GLOW_VARIANT = "v2"`.
- Reverting these sections to the previous glow is a one-line change: set `BOTTOM_GLOW_VARIANT = "v1"`.

## V2 behavior

- Keeps the glow anchored as a bottom/horizon stage instead of copying the hero section's right-side glow composition.
- Adds a fourth soft directional floor-wash layer for more legible motion.
- Increases positional contrast through wider lateral drift and stronger opacity variation.
- Preserves section-specific color roles:
  - staking uses a warmer yellow/gold core and wash
  - swap and forex use cooler cyan/blue cores and washes
  - decentralization stats uses a broader cyan horizon glow behind the planets and metric cards
- Offsets animation delays per protocol panel so repeated product sections do not move in sync.

## Readability guard

The desktop masks still protect the heading and body-copy zone. The brighter motion is weighted toward the product visual, step cards, metrics, and lower panel area.

## Mobile tuning

Mobile uses dedicated `v2` placement instead of inheriting the old mobile hero glow keyframes. The glow remains below the primary copy and moves around the product visuals and lower cards.

## Reduced motion gate

The protocol and stats glow layers are no longer disabled by the `prefers-reduced-motion: reduce` rule, matching the hero glow behavior requested for Safari/macOS Reduce Motion.

## Validation results

- `npm run check` passed.
- Browser QA at desktop confirmed:
  - all three protocol panels render `protocol-glow--v2`
  - the decentralization panel renders `stats-glow--v2`
  - all four layers per target section are displayed and running
  - product panel delays are asynchronous: `-1.4s`, `-6.2s`, and `-11.1s`
  - `prefers-reduced-motion: reduce` can be active while the glow animations still run
- Browser QA at `390px` mobile confirmed:
  - all four protocol/stat glow layers remain active
  - mobile uses bottom-glow v2 keyframes instead of the old hero glow mobile keyframes
  - section headings and body copy remain on dark background while the stronger motion stays around the visual and lower content zones
