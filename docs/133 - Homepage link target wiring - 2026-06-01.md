# Homepage link target wiring

Created: 2026-06-01

## Scope

This task wires the annotated homepage text links and CTA buttons to their intended internal sections, subpages, or documentation URLs.

## Implementation Notes

- Added shared link constants for ecosystem section anchors and documentation deep links.
- Hero group links now route to wallet, staking, developer, and institutional destinations instead of the generic `#about` fallback.
- Popular topic links now route to the staking documentation, Ecosystem subpage, and Roadmap subpage.
- Capability CTA links now route to protocol sections, ecosystem sections, or documentation as annotated.
- The `Explore Layer-2 projects` capability CTA is intentionally rendered as a disabled non-link with hover disabled.
- The disabled capability CTA state is represented in the local design-system card preview.
- Protocol CTA buttons now link to the Ecosystem wallets section and exact protocol documentation overview pages.
- Native asset, strengths, stats, and founder documentation CTAs now use their annotated destinations.
- LUNC market icon buttons now link to CoinMarketCap and CoinGecko.
- Added stable hash anchors for the homepage protocol panels: `#staking-protocol`, `#swap-protocol`, and `#forex-protocol`.
- The disabled Layer-2 capability CTA now uses gray text and reduced icon opacity so the disabled state is clearer.

## Validation

Completed validation:

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run check` passed, including the production build and performance budget.
- Browser QA passed on `http://127.0.0.1:5174/`:
  - Verified annotated homepage links against their expected `href` values.
  - Verified LUNC market icon links point to CoinMarketCap and CoinGecko.
  - Confirmed `Explore Layer-2 projects` renders as a disabled non-link CTA.
  - Confirmed the disabled Layer-2 CTA has no clickable anchor and uses the disabled CSS state.
  - Click-tested `Stake your LUNC` from the hero and confirmed it routes to `#staking-protocol`.
  - Browser console had no warnings or errors.
