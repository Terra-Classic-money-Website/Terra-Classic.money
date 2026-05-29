# Website metadata and favicon update

Created: 2026-05-29

## Scope

Updated the production page metadata for the Terra Classic Website share and browser identity surface.

## Changes

- Replaced the production favicon reference with `public/assets/terra-classic-money-favicon.png`.
- Updated the homepage title and description to the new independent community-maintained website positioning.
- Replaced the production Open Graph and Twitter image references with `https://terra-classic.money/assets/terra-classic-money-ogimage.png`.
- Added Open Graph image dimensions and `og:site_name` where production pages already used social metadata.
- Added missing Open Graph and Twitter metadata to the Decentralization page.
- Added canonical links for production pages.

## Validation Plan

This is a static metadata change with no rendered layout impact. Validation should focus on HTML correctness and production build behavior:

- Run `npm run typecheck`.
- Run `npm run build`.
- Confirm built HTML contains the new favicon, canonical URL, homepage metadata, and social image URL.
