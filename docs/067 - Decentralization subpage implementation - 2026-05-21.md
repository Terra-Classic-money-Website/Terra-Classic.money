# Decentralization Subpage Implementation

Created: 2026-05-21

## Scope

This task adds the `decentralization.html` static subpage for the Terra Classic Website.

The supplied lo-fi wireframe is treated as an information-architecture reference, not a literal visual design. The page is implemented as an article-ready front-end shell because the final article copy will be written later by the project owner.

## Implementation Notes

- Added `decentralization.html` as a Vite multi-page static entry for GitHub Pages compatibility.
- Added `src/data/decentralization.ts` for replacement-friendly article blocks, tabs, references, FAQ copy, and resource group configuration.
- Reused existing homepage and Ecosystem page components where appropriate:
  - sidebar
  - founder stories
  - community CTA
  - footer
  - existing ecosystem resource rows
- Reused the existing Framer-derived `src/data/ecosystem.ts` link and avatar base for validator, explorer, and developer resource rows.
- Added a working Web Speech API article-listen control instead of a fake audio placeholder.
- Updated `- START.md` with the local Decentralization subpage URL.
- Kept all design-system source files unchanged after Dawid clarified that the Decentralization page should only consume existing patterns, not add new design-system examples.

## Product Rules Applied

- The page remains static-only and GitHub Pages-compatible.
- The page does not claim official Terra Classic status.
- The page avoids writing the final article content in this implementation pass.
- References are included as source slots and can be adjusted when the final article is written.
- Interactive controls use deliberate hover/state motion consistent with the current design system.

## Validation Plan

- Run `npm run check`.
- Render-check `http://127.0.0.1:5173/decentralization.html` at desktop, tablet, and mobile widths.
- Check for console errors, horizontal overflow, broken image layout, text overlap, and interactive state issues.
- Capture QA screenshots under `docs/audit-screenshots`.

## Validation Results

- `npm run check` passed after implementation.
- Vite selected local dev port `5174` because `5173` was already in use.
- The Browser plugin tools were not exposed in this session, so rendered QA used installed Chrome through the DevTools Protocol / headless screenshots.
- Chrome QA checked:
  - Desktop: `1500 x 1000`, no horizontal overflow, no runtime or console errors, article tab changes from `Network view` to `Community view`, FAQ toggles closed, and 20 copied resource rows render.
  - Tablet: `900 x 1000`, no horizontal overflow, no runtime or console errors, tab and FAQ interactions work.
  - Mobile: `390 x 844`, no horizontal overflow, no runtime or console errors, tab and FAQ interactions work.
- Added the missing favicon link on `decentralization.html` so local Chrome does not report a favicon 404 on the new page.
- QA screenshots saved:
  - `docs/audit-screenshots/decentralization-desktop-2026-05-21.png`
  - `docs/audit-screenshots/decentralization-tablet-2026-05-21.png`
  - `docs/audit-screenshots/decentralization-mobile-2026-05-21.png`

## QA Corrections

- Raised the Decentralization visual label layer above the orb asset.
- Darkened visual label backgrounds so labels remain readable over bright asset areas.
- Removed the two hero topic badges and kept only the last-update badge, styled through the existing `native-phase__badge` pattern.
- Removed the hero visual outline and the divider between the visual and article actions.
- Updated the listen/share controls to use existing pill-button behavior with right-side icons.
- Reworked the article tabs into a segmented tab control with a changing visual panel below it.
- Removed the full "Visual explainer slot" section.
- Re-ran rendered desktop, tablet, and mobile QA after these changes; checks confirmed no horizontal overflow, the requested sections were removed, the visual border and action divider are gone, and the tab image changes when selecting `Community view`.
- Updated the last-update badge to use the exact uppercase, letter-spaced `native-phase__badge` typography.
- Changed article action buttons to the normal design-system pill behavior for dark surfaces: white default button, black hover button, with inverted right-side dot icons.
- Added the homepage hero glow animation and four vertical hero divider lines so the Decentralization hero is divided into five equal columns.
- Replaced the Decentralization-specific FAQ content with the same FAQ component and questions used on the homepage.
- Re-ran `npm run check`; type-check and production build passed.
- Re-ran in-app browser QA on `http://127.0.0.1:5174/decentralization.html`; checks confirmed no console warnings/errors, the badge has `10px` text with `5px` letter spacing, action buttons render white by default, the hero has four divider lines and seven glow spans, and the homepage FAQ renders 39 items.
- Interaction QA confirmed the article tabs switch to `Community view` and the homepage FAQ question `Who controls Terra Classic?` expands.
- Refreshed desktop, tablet, and mobile audit screenshots.
