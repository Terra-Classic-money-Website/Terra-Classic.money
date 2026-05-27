# Mobile glow and strengths spacing correction

Created: 2026-05-20

## Scope

Follow-up mobile breakpoint correction for the three protocol product panels, the decentralization stats panel, and the `Terra Classic strenghts:` section.

## Changes

- Reworked mobile glow positioning for the Staking, Swap, Forex, and Efficiency panels to use the hero section's broader mobile geometry and slower animation timing.
- Preserved existing glow color identity:
  - Staking keeps the yellow glow.
  - Swap and Forex keep the blue/cyan glow.
  - Efficiency keeps the blue/cyan stats glow and existing planet artwork.
- Tightened the mobile `Terra Classic strenghts:` rhythm:
  - headline to intro text: `16px`
  - intro text to cards: `24px`

## Validation Notes

Rendered mobile QA at `360x900` via local Chrome DevTools Protocol against the Vite dev server.

Measured results:

- document width: `360px`
- strengths headline-to-text gap: `16px`
- strengths text-to-boxes gap: `24px`
- staking core glow keeps yellow gradient while using `hero-glow-core`
- swap core glow keeps cyan gradient while using `hero-glow-core`
- stats core glow keeps cyan gradient while using `hero-glow-core`

Final project gate:

- `npm run check` passed.

Audit screenshots:

- `docs/audit-screenshots/mobile-glow-staking-2026-05-20.png`
- `docs/audit-screenshots/mobile-glow-swap-2026-05-20.png`
- `docs/audit-screenshots/mobile-glow-forex-2026-05-20.png`
- `docs/audit-screenshots/mobile-glow-stats-2026-05-20.png`
- `docs/audit-screenshots/mobile-strengths-spacing-2026-05-20.png`
