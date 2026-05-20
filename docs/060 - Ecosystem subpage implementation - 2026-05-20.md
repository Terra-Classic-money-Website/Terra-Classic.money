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

- Fixed the mobile intro grid so the paragraph uses the full mobile content width.
- Hid mobile row arrow dots so resource rows without badges do not create stray marker rows.

## Follow-Up Corrections

- Removed the non-market resource count summary box from the hero intro.
- Removed category header icons so category headings rely on text hierarchy only.
- Replaced the custom black ecosystem row badges with the existing `native-phase__badge` design-system badge style.
- Replaced dotted category separators with standard solid rules.

## Follow-Up Validation Results

- `npm run check` passed after the follow-up corrections.
- Browser QA checked desktop `1500 x 1000` and mobile `390 x 844`.
- Follow-up browser assertions confirmed no summary box, no category icons, solid separator rules, reused badge styling, no horizontal overflow, and no console errors.
- QA screenshots were refreshed:
  - `docs/audit-screenshots/ecosystem-desktop-2026-05-20.png`
  - `docs/audit-screenshots/ecosystem-mobile-2026-05-20.png`

## Navigation And Spacing Corrections

- Made the sidebar Terra Classic logotype, collapsed sidebar symbol, and mobile topbar brand link back to the homepage.
- Kept the collapsed-sidebar expand control as a separate button so the symbol can navigate home without removing the sidebar affordance.
- Reduced the Ecosystem hero top padding from the large homepage editorial rhythm to the tighter subpage rhythm.
- Tightened the `Help make Terra Classic easier to navigate.` share section top padding.
- Added an inset separator between the share section and footer, aligned to the footer/content side padding instead of running full bleed.
- Added Ecosystem-only footer top padding so the footer content does not sit directly against the share/footer separator.
- Locked the back-to-top footer pill to a non-shrinking `56px` height so added footer spacing cannot collapse the control.

## Navigation And Spacing Validation Results

- `npm run check` passed after navigation and spacing corrections.
- Browser QA checked desktop `1500 x 1000` and mobile `390 x 844`.
- Desktop assertions confirmed `64px` Ecosystem hero top padding, `65px` share-section top spacing, inset share/footer separator with `64px` left and right offsets, no horizontal overflow, and no console warnings or errors.
- Desktop footer follow-up assertion confirmed a `32px` gap between the share/footer separator and footer links.
- Back-to-top follow-up assertion confirmed the footer pill renders at `56px` high with `56px` flex basis.
- Mobile assertions confirmed `48px` Ecosystem hero top padding, `49px` share-section top spacing, inset share/footer separator with `24px` left and right offsets, no horizontal overflow, and no console warnings or errors.
- Interaction QA confirmed the expanded sidebar logotype, collapsed sidebar symbol, and mobile topbar brand navigate from `ecosystem.html` back to the homepage hero.
- QA screenshots saved:
  - `docs/audit-screenshots/ecosystem-top-spacing-2026-05-20.png`
  - `docs/audit-screenshots/ecosystem-share-footer-spacing-2026-05-20.png`
  - `docs/audit-screenshots/ecosystem-mobile-spacing-2026-05-20.png`

## Category Navigation Correction

- Replaced default category hash jumps with an explicit in-page scroll handler.
- Replaced native `scrollIntoView({ behavior: "smooth" })` with a small `requestAnimationFrame` scroll animator because Safari did not reliably execute the native smooth-scroll path for the category chips.
- Preserved reduced-motion behavior by switching to instant scrolling only when the visitor has `prefers-reduced-motion: reduce`.
- Cancelled any previous category-scroll animation before starting a new one, so repeated chip clicks cannot compete.
- Added category `scroll-margin-top` rules so clicked sections land with the correct visual offset on desktop and mobile.

## Category Navigation Validation Results

- `npm run check` passed after the category navigation correction.
- Browser QA clicked the desktop `For developers` category chip and confirmed the page moves, the URL updates to `ecosystem.html#developers`, the section lands at the `32px` desktop scroll margin, no horizontal overflow occurs, and no console warnings or errors are emitted.
- Browser QA clicked the mobile `Blockchain tools` category chip and confirmed the page moves, the URL updates to `ecosystem.html#tools`, the section lands at the `72px` mobile scroll margin under the topbar, no horizontal overflow occurs, and no console warnings or errors are emitted.
- QA screenshot saved:
  - `docs/audit-screenshots/ecosystem-category-scroll-2026-05-20.png`
