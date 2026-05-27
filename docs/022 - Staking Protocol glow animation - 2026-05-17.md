# Staking Protocol glow animation

Created: 2026-05-17

## Purpose

This task starts applying the hero-style layered animated background model to the product protocol sections, beginning with Staking Protocol.

## Scope

- Only the Staking Protocol panel was changed.
- Swap Protocol and Forex Protocol were intentionally left on their existing static background treatment for later focused passes.

## Layer model

The Staking Protocol panel now follows this order:

1. `--lunc-black` panel background.
2. `.protocol-glow--staking` animated glow stack.
3. `.protocol-lines` decorative vertical separators.
4. Staking planet asset.
5. Staking UI images.
6. Copy, status badge, steps, and action buttons.

## Art direction

The staking glow is intentionally not blue-only. The desired look from the reference is:

- A large dark-blue atmospheric layer spanning almost the whole product section.
- A stronger yellow/amber bloom centered at the bottom of the section, rising through the lower half of the planet and step cards.

The implementation uses three animated glow blobs:

- dark-blue field across the panel,
- main yellow/amber bloom from the bottom center,
- smaller yellow source at the lower center for stronger light concentration.

During mobile QA, the existing protocol responsive layout was also corrected so protocol visuals no longer overlap the body copy before the `How it works` section.

## Validation plan

Use the project gate:

```bash
npm run check
```

Rendered QA should inspect:

- Staking Protocol at desktop viewport `1632 x 1000`.
- One mobile viewport to confirm the glow does not destabilize layout.
- Console errors and missing assets.

## Validation record

- `npm run check` passed.
- Browser QA desktop viewport: `1632 x 1000`.
- Browser QA mobile viewport: `390 x 844`.
- Browser console errors/warnings: `0` relevant entries in both checked viewports.
- Desktop panel measured at `x=328`, `y=0`, `w=1288`, `h=1208` after navigating to the Roadmap/Staking anchor.
- Confirmed `.protocol-glow--staking` has three animated layers: dark-blue field, yellow core, and yellow source.
- Follow-up tuning made both glow families visibly animated, narrowed the yellow bloom, moved it closer to the planet, and strengthened the yellow toward `--lunc-yellow`.
- Follow-up color grading retuned the dark-blue field toward the Figma reference, then constrained it with a top fade so the headline and intro copy remain on clean `--lunc-black` instead of sitting over blue glow.
- Added a separate Staking planet hover loop on the orb asset only. It moves 16px total on the Y axis, leaving the UI cards stable while the planet feels suspended in space. The heavier background glow animations remain covered by the reduced-motion guard.
- Verified the hover loop in browser QA: `.protocol-panel--staking .protocol-orb` runs `protocol-staking-orb-hover` for `7s`, the planet Y position changes during sampling, and the staking UI card position remains fixed.
- Confirmed the mobile protocol visual no longer overlaps the body copy.
- Saved QA screenshots:
  - `docs/audit-screenshots/staking-glow-desktop-2026-05-17.png`
  - `docs/audit-screenshots/staking-glow-mobile-2026-05-17.png`
