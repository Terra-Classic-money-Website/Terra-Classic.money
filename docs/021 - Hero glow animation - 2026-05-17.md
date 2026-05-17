# Hero glow animation

Created: 2026-05-17

## Purpose

This task replaces the semantic hero section's static blue glow bitmap with a CSS-only animated glow layer inspired by the Figma glow reference.

## Research decision

Reviewed current free/open animation options before implementation:

- shadcn.io Aurora Background: useful pure-CSS technique, but visually reads as aurora ribbons rather than the right-side volumetric blue bloom needed here.
- shadcn.io Background Gradient Animation: useful layered-orb technique, but it adds React state/mouse tracking patterns and is too broad/colorful for the locked hero art direction.
- `@nauverse/react-aurora-background`: MIT package, but adding a production dependency for a single section background is not justified and its default visual model is closer to glassmorphism bubbles than the Figma glow.
- GradientCraft: useful MIT CSS background studio reference because it exports pure CSS with no runtime, but the final hero needed manual tuning against the actual Figma glow image.

Decision: no new dependency. The implementation uses the proven pattern from modern CSS background libraries: stacked radial gradients, blend mode, blur, and slow transform/opacity keyframes.

## Layer model

The semantic hero layer order is now:

1. `--lunc-black` hero background.
2. `.hero-glow` animated CSS glow.
3. `.hero-lines` decorative vertical separators.
4. `.hero-orb` Figma planet asset.
5. Hero copy and CTA cards.

## Implementation notes

- Added `.hero-glow` with three animated gradient blobs:
  - cyan core bloom from the right,
  - wider deep-blue field above/right,
  - subtle violet-blue undertone below center.
- Animations are slow and transform/opacity-based to avoid abrupt motion and preserve layout stability.
- Follow-up tuning enlarged the glow field leftward, strengthened the right-side bloom, added a fourth low/wide wash so the glow is visible behind and below the Users card area, and made motion more visible through shape, blur, opacity, scale, and translation changes.
- Second tuning pass added a fifth slow drift layer and increased animation amplitude across all glow layers so the background reads as alive without increasing tempo.
- Third tuning pass moved the brightest energy source downward and slightly inward so the glow reads as coming from behind the planet body instead of from the top-right corner.
- Replaced the attempted planet overlay with a sixth cyan source inside the background `.hero-glow` stack, preserving the required layer model: the light stays behind the planet image.
- Added a `prefers-reduced-motion` rule that freezes the glow while keeping the static layered visual.
- Removed the semantic hero's `hero-bg-figma.png` image usage. The asset remains in `public/assets` only because the original Figma-derived documentation still references it.
- Corrected the responsive hero headline rule so the shared `tc-type-h1` class no longer overrides the intended mobile/tablet type size inside the hero.

## Validation plan

Use the project gate:

```bash
npm run check
```

Rendered QA should inspect:

- Desktop hero at `1632 x 1000` with the local comparison/reference layer hidden.
- One smaller viewport to confirm the glow does not cover or destabilize hero text/cards.
- Console errors and missing assets.

## Validation record

- `npm run check` passed.
- Browser QA desktop viewport: `1632 x 1000`.
- Browser QA mobile viewport: `390 x 844`.
- Browser console errors/warnings: `0` relevant entries in both checked viewports.
- Desktop hero measured at `x=328`, `y=104`, `w=1288`, `h=776`.
- Confirmed `.hero-glow` is present, has six active keyframe animations, and the design reference overlay was hidden during semantic hero validation.
- Confirmed animation movement by sampling `.hero-glow` child transforms, opacity, blur, and border radius before and after a short delay.
- Saved QA screenshots:
  - `docs/audit-screenshots/hero-glow-desktop-2026-05-17.png`
  - `docs/audit-screenshots/hero-glow-mobile-2026-05-17.png`
