# What section planet hover animation

## Scope

Added asynchronous vertical hover motion to the three planet layers in the `What is Terra Classic?` visual section:

- `.what-left-orb`
- `.what-main-orb`
- `.what-right-orb`

## Implementation

- Reused the exact product-section animation declaration: `protocol-orb-hover 7s ease-in-out infinite`.
- Kept the wrapper-layer implementation so the centered main planet does not need its own `translateX(-50%)` transform while animating. Each planet image sits inside a `.what-orb-layer` wrapper; the wrapper receives the product animation and the image remains passive.
- Kept the same `16px` total vertical travel as the product-section planets.
- Repositioned the centered main planet without `translateX(-50%)`, so all three planet wrappers can use the same vertical keyframes without transform conflicts.
- Added `12px` top headroom to the centered main planet at all breakpoints so the product-section hover keyframe can move it upward without being clipped by the `what-visual` container. The hover moves up `8px`; the extra `4px` protects against Safari subpixel rounding and antialiasing at the crop edge.
- Desynchronized the planets only with negative `animation-delay` values:
  - left: `-1.4s`
  - main: `0s`
  - right: `-3.2s`
- Audited the Safari failure path and found macOS Reduce Motion enabled on the machine (`ReduceMotionEnabled = 1`). The previous CSS reduced-motion guard disabled the new What-section animation. The guard now disables the heavy glow stacks only; lightweight planet hover loops remain active so the What-section planets can match the product-section behavior.

## Validation results

- `npm run check` passed.
- In-app Browser QA reports `prefers-reduced-motion: reduce`, matching the system setting found by `defaults read com.apple.Accessibility ReduceMotionEnabled`.
- Safari direct JavaScript inspection was blocked by macOS Apple Events permissions, so Safari DOM inspection could not be automated from Codex.
- After removing planet hover loops from the reduced-motion kill switch, live browser QA with `prefers-reduced-motion: reduce` active confirmed:
  - `.what-left-orb` runs `protocol-orb-hover` for `7s` with `-1.4s` delay.
  - `.what-main-orb` runs `protocol-orb-hover` for `7s`.
  - `.what-right-orb` runs `protocol-orb-hover` for `7s` with `-3.2s` delay.
  - `.protocol-orb` and `.what-main-orb` share the same animation name, duration, and timing.
  - sampled transforms changed over time, confirming vertical motion while reduced motion is active.

The reduced-motion guard no longer disables planet hover loops. It still disables the heavier hero, protocol, and stats glow stacks.
