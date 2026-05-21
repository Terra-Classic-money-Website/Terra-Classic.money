# Hero glow v2 animation

## Scope

Implemented a second hero glow animation variant so the hero background motion is more visible while keeping a slow premium tempo.

## Variant model

- `v1` remains the base `.hero-glow` implementation.
- `v2` is activated from `src/App.tsx` through `HERO_GLOW_VARIANT = "v2"`.
- Reverting to the previous glow is a one-line change: set `HERO_GLOW_VARIANT = "v1"`.

## V2 behavior

- Keeps durations in the slow atmospheric range: `13s`, `17s`, `19s`, `22s`, `23s`, `24s`, and `26s`.
- Increases positional contrast by moving the blue body glow and cyan source farther behind the planet.
- Adds a seventh soft diagonal light-wash layer that is hidden in `v1`.
- Separates the glow roles:
  - broad deep-blue field
  - medium blue body glow
  - cyan source near the planet
  - restrained left spill behind the content area
  - subtle diagonal wash for more legible motion
- Uses stronger opacity variation so the background shifts between calmer and more charged states without speeding up.

## Readability guard

The brighter movement is weighted toward the center-right and planet edge. The left spill remains low-opacity and broad so headline and body copy stay readable.

## Mobile tuning

After checking the `390px` mobile breakpoint, `v2` now has mobile-specific glow placement. The seventh diagonal wash is repositioned into the mobile hero instead of inheriting the desktop placement, and the brighter cyan/body layers are pushed lower so the headline and intro stay dark while the motion remains visible around the cards and planet.

## Validation results

- `npm run check` passed.
- Live browser QA confirmed the hero glow renders with `class="hero-glow hero-glow--v2"`.
- Live browser QA confirmed seven hero glow layers are present and displayed.
- Live browser QA at `390px` confirmed the mobile breakpoint uses `v2`, all seven layers render, and the seventh light wash has mobile placement instead of remaining mostly off-canvas.
- Live browser QA confirmed all seven v2 animations are running while `prefers-reduced-motion: reduce` is active:
  - `hero-glow-v2-body`
  - `hero-glow-v2-field`
  - `hero-glow-v2-undertone`
  - `hero-glow-v2-left-spill`
  - `hero-glow-v2-drift`
  - `hero-glow-v2-cyan-source`
  - `hero-glow-v2-diagonal-wash`
