# Directory List Design System Component

Created: 2026-05-26

## Scope

Added a new `Directory list` component specimen to the `designsystem.html` Components section.

The component documents the full grouped list pattern, while `Directory list item` documents the single reusable row.

## Content

The specimen uses the `Applications` category from `src/data/ecosystem.ts`, matching the supplied screenshot:

- Title: `Applications`
- Description: `Apps, DeFi products, launchpads, marketplaces, and aggregators`
- Count: `15`
- Rows: BigbangX, Cookie.pay, Juris Protocol, LbunProject, Miata, NFT.lunc.tools, Orbit Wire, Selenium, Terra Casino, Terraport Token Factory, TERRA.pump, THEIA, Vyntrex, Coinhall, Sonic.

## Implementation Notes

- Added `Directory list` to the design-system component index after `Directory list item`.
- Reused the production `ecosystem-category`, `ecosystem-grid`, and `directory-list-item` classes so the specimen reflects the real implemented pattern.
- Imported `ecosystemCategories` into `src/designsystem.tsx` instead of duplicating row data inside the design-system file.
- Adjusted design-system-only component card index styles so `Open work card` and `Roadmap timeline` keep their existing preview behavior after the new component insertion.

No production page behavior change is intended.

## Validation Plan

- Run `npm run check`.
- Open `designsystem.html#components` locally and confirm the `Directory list` component renders with the supplied content and no horizontal overflow.

## Validation Results

- `npm run check` passed.
- Local browser QA passed at `http://127.0.0.1:5174/designsystem.html#components`.
- Confirmed the `Directory list` component rendered:
  - title `Applications`
  - description `Apps, DeFi products, launchpads, marketplaces, and aggregators`
  - count `15`
  - 15 rows, from `BigbangX` through `Sonic`
- Confirmed no page-level horizontal overflow in the checked viewport.
