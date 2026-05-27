# Mobile width scaling correction

Created: 2026-05-20

## Scope

Follow-up mobile breakpoint correction for wider mobile widths around `500px` to `661px`.

## Changes

- Reworked the `What is Terra Classic?` visual so planets and avatars use fixed center-anchored mobile offsets instead of width-percentage positioning. Wider mobile screens now reveal more of the side planets without changing the composition spacing.
- Corrected `Explore what Terra Classic enables:` cards on wider mobile by removing inherited image-wrapper aspect ratios and reserving explicit, bounded image areas.
- Tightened `Efficiency driven by decentralization` headline-to-copy spacing from `32px` to `24px`.
- Reduced wider-mobile stats panel height and bottom slack.
- Repositioned stats planets for the wider mobile layout so the central planet cluster aligns with the web pattern.

## Validation Notes

Rendered at `360px`, `500px`, and `661px` mobile widths.

Measured at `661x900`:

- What visual width: `630px`
- What main planet width: `260px`
- What side planets keep fixed center offsets and reveal more side artwork as width increases.
- Capability card heights:
  - Staking: `410px`
  - DeFi: `560px`
  - Build: `480px`
  - Ecosystem: `460px`
- Stats headline-to-copy gap: `24px`
- Stats panel height: `760px`
- Stats CTA-to-panel-bottom spacing: `46px`
- Browser console warnings/errors: none.

Final project gate:

- `npm run check` passed.

Audit screenshots:

- `docs/audit-screenshots/mobile-width-661-what-visual-2026-05-20.png`
- `docs/audit-screenshots/mobile-width-661-capability-defi-2026-05-20.png`
- `docs/audit-screenshots/mobile-width-661-capability-build-2026-05-20.png`
- `docs/audit-screenshots/mobile-width-661-stats-2026-05-20.png`
