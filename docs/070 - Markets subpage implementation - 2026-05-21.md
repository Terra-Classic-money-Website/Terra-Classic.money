# Markets Subpage Implementation

Created: 2026-05-21

## Scope

This task creates the `markets.html` static subpage for the Terra Classic Website.

The page is intentionally built as a Markets-specific copy of the existing Ecosystem directory pattern: category chips, source-aware directory rows, avatars, pair summaries, optional native badges, row arrows, lower community sections, FAQ, share CTA, and footer.

## Product Rules Applied

- Markets is a neutral wayfinding page for where LUNC can be bought or swapped.
- Listings are informational and do not imply endorsement, liquidity quality, custody safety, exchange safety, or investment advice.
- Production remains static-only for GitHub Pages. Market listings are a dated static snapshot, not a runtime API dependency.
- CEX listings are based on the CoinMarketCap Terra Classic Markets CEX Spot list fetched on 2026-05-21.
- CMC returned 64 CEX Spot entries for Terra Classic on 2026-05-21, matching the requested CEX count.
- DEX listings are copied from the `https://weekly-fade-606479.framer.app` Market - DEX section fetched on 2026-05-21.
- The Framer source exposed 11 DEX exchange rows. Its separate `Check all 17 markets` link points to CMC and was not included as an exchange row because it does not match the requested avatar/name/pair/badge/arrow row pattern.
- Obvious CMC referral and affiliate tracking parameters were removed from exchange URLs to preserve the site's neutrality and avoid hidden sponsorship leakage.

## Implementation Notes

- `markets.html` was added as a Vite multi-page static entry.
- Market entries live in `src/data/markets.ts`.
- The Markets page reuses the existing Ecosystem directory row component and styling instead of introducing a separate card system.
- `src/designsystem.tsx` now shows the directory resource row arrow in the local design-system preview, matching the production row behavior.
- `- START.md` now includes the local Markets subpage URL.

## Validation Plan

- Run `npm run check`.
- Render-check `http://127.0.0.1:5173/markets.html` at desktop, tablet, and mobile widths.
- Check for console warnings/errors, horizontal overflow, broken first meaningful render, row alignment issues, badge wrapping, and text overlap.

## Validation Results

- `npm run check` passed after implementation.
- Vite selected local dev port `5174` because `5173` was already in use.
- Browser QA checked:
  - Desktop: `1500 x 1000`, `64` CEX entries, `11` DEX entries, `75` market links total, no horizontal overflow, no framework error overlay.
  - Tablet: `900 x 1000`, same entry counts, no horizontal overflow, no framework error overlay.
  - Mobile: `390 x 844`, same entry counts, one-column resource rows, no horizontal overflow, no framework error overlay.
- Interaction QA clicked the mobile `DEX (11)` category chip and confirmed the page scrolls to `markets.html#dex` with the DEX section landing below the sticky topbar.
- A fresh post-fix browser console check returned no warnings or errors.
- QA screenshots saved:
  - `docs/audit-screenshots/markets-desktop-2026-05-21.png`
  - `docs/audit-screenshots/markets-tablet-2026-05-21.png`
  - `docs/audit-screenshots/markets-mobile-2026-05-21.png`
  - `docs/audit-screenshots/markets-mobile-dex-scroll-2026-05-21.png`

## Corrections During QA

- Fixed duplicate React row keys for repeated exchange destinations after referral parameters were stripped from CMC URLs. The row key now includes the pair summary, so repeated exchange pages with different LUNC pairs remain stable.
- Removed the visible source-note text block from the Markets page after review. Source provenance remains documented here instead of being shown in the page UI.
