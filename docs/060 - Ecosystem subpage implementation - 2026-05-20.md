# Ecosystem Subpage Implementation

Created: 2026-05-20

## Scope

This task creates the `ecosystem.html` static subpage for the Terra Classic Website.

The page follows the supplied lo-fi wireframe at `/Users/dawidskinder/Library/CloudStorage/Dropbox/Projekty/LUNC/LUNC Website/UX:UI/Terra Classic www 2026 - Lo-fi - Ecoystem.png` and translates the content into the current homepage/design-system language.

## Product Rules Applied

- The Ecosystem page is a neutral, non-paid resource directory.
- Listings are informational and do not imply endorsement, audit, official status, safety, or investment merit.
- CEX and DEX markets from the Framer source were intentionally excluded because Markets will have its own subpage.
- The lower page sections reuse homepage sections: founder stories, community, FAQ, and footer.
- A restrained share section was added after FAQ because the wireframe includes a final share CTA, but the copy avoids hype and frames sharing as ecosystem wayfinding.

## Implementation Notes

- `ecosystem.html` was added as a Vite multi-page static entry so the URL works on GitHub Pages without server infrastructure.
- Ecosystem entries live in `src/data/ecosystem.ts`.
- The page copies non-market project/tool names, URLs, badges, and avatar sources from `https://weekly-fade-606479.framer.app/`.
- The reusable ecosystem resource row pattern was added to `designsystem.html` through the local design-system React surface.
- `- START.md` now includes the local Ecosystem subpage URL.

## Validation Plan

- Run `npm run check`.
- Render-check `http://127.0.0.1:5173/ecosystem.html` at desktop, tablet, and mobile widths.
- Check for console errors, horizontal overflow, broken links/empty hrefs, image loading failures, and text overlap.

## Validation Results

- `npm run check` passed after implementation.
- Vite selected local dev port `5174` because `5173` was already in use.
- Browser QA checked:
  - Desktop: `1500 x 1000` viewport capability, no horizontal overflow, sidebar layout active.
  - Tablet: `900 x 1000`, no horizontal overflow, topbar layout active, two-column resource grid active.
  - Mobile: `390 x 844`, no horizontal overflow, one-column resource grid active.
- Browser console showed only expected Vite development logs and the React DevTools informational message; no runtime errors were observed.
- QA screenshots saved:
  - `docs/audit-screenshots/ecosystem-desktop-2026-05-20.png`
  - `docs/audit-screenshots/ecosystem-mobile-2026-05-20.png`

## Corrections During QA

- Fixed the mobile intro grid so the paragraph and count panel use the full mobile content width.
- Hid mobile row arrow dots so resource rows without badges do not create stray marker rows.
