# Stats glow refinement

Created: 2026-05-21

## Scope

Refined the glow animation used by:

- Home page "Efficiency driven by decentralization" stats section
- Decentralization subpage hero

The product section glow animation was left unchanged.

## Finding

Both affected sections already had animated glow layers and those layers were running, including while macOS `prefers-reduced-motion: reduce` was active. The issue was visual, not functional:

- The stats panel had a strong static cyan floor glow baked into the panel background.
- The animated glow layers sat behind the decagon grid and planet assets, so the motion was visually flattened.
- The decentralization subpage hero reused the same stats glow but has a taller copy block, so the light needed lower positioning.
- Mobile had a specificity conflict: the subpage-specific desktop glow offsets overrode the shared mobile glow sizing.

## Implementation

- Reduced the static cyan floor glow on `.stats-panel` so the animated glow layers carry more of the visible light.
- Added stats-specific v2 keyframes for the cyan core, cyan source, and diagonal floor wash.
- Increased opacity contrast and positional drift for the stats glow while preserving dark readability behind the copy.
- Added desktop offsets for `.decentralization-stats-hero` so the brightest motion sits lower, around the visual/stat area.
- Added explicit mobile overrides for `.decentralization-stats-hero .stats-glow--v2` to prevent desktop layer heights from leaking into mobile.

## Validation

- `npm run check` passed.
- Browser QA at 1440 x 900:
  - Home stats section: 4 glow layers present, animations running.
  - Decentralization hero: 4 glow layers present, animations running.
- Browser QA at 390 x 844:
  - Home stats section: 4 glow layers present, animations running.
  - Decentralization hero: 4 glow layers present, mobile sizing active, animations running.
- Browser console: 0 errors.

Screenshots captured during QA:

- `/tmp/terra-stats-glow-home-desktop.png`
- `/tmp/terra-stats-glow-subpage-desktop.png`
- `/tmp/terra-stats-glow-home-mobile.png`
- `/tmp/terra-stats-glow-subpage-mobile-fixed.png`
