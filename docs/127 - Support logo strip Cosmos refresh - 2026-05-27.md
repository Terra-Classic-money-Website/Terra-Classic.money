# Support logo strip Cosmos refresh

Created: 2026-05-27

## Scope

Refreshed the homepage `Decentralization supported by:` logo strip after the Figma source changed again.

## Source

- Figma file: `dZxJU7AlVV2k9ovNmmbeLI`
- Homepage frame: `1612:1342`
- Support strip node: `1612:1391`

## Implementation Notes

- Re-exported the rendered Figma logo nodes so local assets match the visible Figma strip.
- Added the new COSMOS logo between HTX and SolidProof.
- Updated changed logo dimensions:
  - MEXC: `97 x 15`
  - HTX: `49 x 24`
  - COSMOS: `107 x 20`
- Updated `scripts/build-images.mjs` so the static image pipeline generates WebP and AVIF outputs for the new COSMOS source and refreshed dimensions.
- Updated the homepage logo-strip data in `src/App.tsx`.
- Updated the support-logo CSS to use per-logo CSS dimensions and a breakpoint scale variable, so desktop-small and tablet rows use the full available row width instead of collapsing into a left-aligned cluster.
- Adjusted the mobile grid to three columns so nine logos remain stable without overlap.

## Validation

Executed:

```bash
npm run build
npm run check
git diff --check
```

Results:

- `npm run build` passed.
- `npm run check` passed.
- `git diff --check` passed.
- Performance budget stayed inside the static GitHub Pages budget:
  - Total dist: `14.77 MiB / 15.00 MiB`
  - Homepage initial JS gzip: `77.6 KiB / 85.0 KiB`
  - Largest page initial CSS gzip: `index.html 24.5 KiB / 25.0 KiB`

Rendered QA:

- Production preview URL: `http://127.0.0.1:4175/`
- All nine logos loaded from local `/assets/*.webp` files.
- Console warnings/errors were clean for all checked widths.
- Desktop Big `1632 x 1200`:
  - Row: `1160 x 28`
  - First logo offset: `0`
  - Last logo offset: `0`
  - Minimum same-row gap: `43.92px`
  - Screenshot: `docs/audit-screenshots/support-logo-strip-cosmos-desktop-big-2026-05-27.png`
- Desktop Small `1491 x 1080`:
  - Row: `1051 x 28`
  - First logo offset: `0`
  - Last logo offset: `0`
  - Minimum same-row gap: `30.29px`
  - Screenshot: `docs/audit-screenshots/support-logo-strip-cosmos-desktop-small-1491-2026-05-27.png`
- Tablet `1233 x 1080`:
  - Row: `1105 x 28`
  - First logo offset: `0`
  - Last logo offset: `0`
  - Minimum same-row gap: `37.04px`
  - Screenshot: `docs/audit-screenshots/support-logo-strip-cosmos-tablet-1233-2026-05-27.png`
- Narrow Tablet `768 x 900`:
  - Row: `640 x 28`
  - First logo offset: `0`
  - Last logo offset: `0`
  - Minimum same-row gap: `14.3px`
  - Screenshot: `docs/audit-screenshots/support-logo-strip-cosmos-tablet-768-2026-05-27.png`
- Mobile `390 x 900`:
  - Row: `326 x 172`
  - Three-column grid remained stable with no visible overlap.
  - Screenshot: `docs/audit-screenshots/support-logo-strip-cosmos-mobile-390-2026-05-27.png`
