# Hero glow reduced motion gate

## Scope

Adjusted the reduced-motion CSS gate for the hero background glow animation.

## Change

- Removed `.hero-glow span` from the `prefers-reduced-motion: reduce` animation kill switch.
- Kept `.protocol-glow span` and `.stats-glow span` disabled under reduced motion.

## Reason

The local Safari environment has macOS Reduce Motion enabled, which meant the hero glow appeared static even though the default hero animation rules existed. Dawid asked to fix that first before tuning the hero glow itself.

## Validation results

- `npm run check` passed.
- Live browser audit with `prefers-reduced-motion: reduce` active confirmed all six `.hero-glow span` layers resolve to active keyframe animations:
  - `hero-glow-core`
  - `hero-glow-field`
  - `hero-glow-undertone`
  - `hero-glow-left-wash`
  - `hero-glow-drift`
  - `hero-glow-cyan-source`
- The sampled hero glow layers reported `animationPlayState: running`.
