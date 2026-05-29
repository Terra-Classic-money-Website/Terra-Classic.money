# Favicon source hardening

Created: 2026-05-29

## Scope

Hardened the favicon setup after the browser still displayed the previous LUNC SVG icon.

## Changes

- Added root-level `public/favicon.png` using the approved Terra Classic Money favicon artwork.
- Added root-level `public/favicon.ico` generated from the same approved PNG, so legacy browser fallback requests resolve to the correct icon.
- Updated production HTML pages to reference the root favicon files with a cache-busting query string.
- Added `apple-touch-icon` references using the same approved favicon artwork.
- Removed `public/assets/lunc-logo.svg`, which was the old generic SVG asset previously used as the favicon.
- Replaced the only in-page `lunc-logo.svg` usage with the specific `native-lunc-logo.svg` asset.

## Validation Plan

- Confirm source contains no remaining active references to `lunc-logo.svg`.
- Run `npm run check`.
- Confirm built HTML references `/favicon.ico?v=20260529` and `/favicon.png?v=20260529`.
- Confirm the built output does not contain `assets/lunc-logo.svg`.
