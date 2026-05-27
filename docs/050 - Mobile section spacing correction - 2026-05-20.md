# Mobile section spacing correction

Created: 2026-05-20

## Scope

Correct mobile breakpoint section rhythm after the first implementation incorrectly applied `48px` to wrapper margins without accounting for existing section padding.

## Correction

The intended rule is visual spacing between section content, not blindly adding `48px` margins to every wrapper.

Implemented mobile spacing so the visible distance is:

- `48px` between major sections.
- `8px` only between the three protocol product panels.

## Measured Mobile Results

Rendered at `360x900`:

- What visual -> Explore headline: `48px`
- Explore grid -> Staking panel: `48px`
- Staking panel -> Swap panel: `8px`
- Swap panel -> Forex panel: `8px`
- Protocols -> Native assets headline: `48px`
- Native assets button -> Strengths headline: `48px`
- Strengths grid -> Efficiency panel: `48px`
- Efficiency panel -> Founders headline: `48px`
- Founder grid -> Community headline: `48px`
- Community buttons -> FAQ divider: `48px`
- FAQ divider -> FAQ headline: `48px`

Browser validation:

- In-app Browser used for rendered mobile measurement and console health.
- Console warnings/errors: none.
- Corrected audit screenshots were regenerated with local Chrome DevTools Protocol because exact scroll-position screenshot capture is more reliable for deep-page boundaries.

Final project gate:

- `npm run check` passed.

Audit screenshots:

- `docs/audit-screenshots/mobile-section-spacing-what-capabilities-2026-05-20.png`
- `docs/audit-screenshots/mobile-section-spacing-protocols-native-2026-05-20.png`
- `docs/audit-screenshots/mobile-section-spacing-native-strengths-2026-05-20.png`
- `docs/audit-screenshots/mobile-section-spacing-lower-2026-05-20.png`
