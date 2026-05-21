# Decentralization Subpage Implementation

Created: 2026-05-21

## Scope

This task adds the `decentralization.html` static subpage for the Terra Classic Website.

The supplied lo-fi wireframe is treated as an information-architecture reference, not a literal visual design. The page now contains the final Decentralization article copy supplied by the project owner, rendered through the existing editorial section pattern.

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
- The page now uses Dawid's supplied final article content for the Decentralization article body.
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
- Replaced the Decentralization article hero with the homepage `Efficiency driven by decentralization` stats-panel structure and assets.
- Preserved the Decentralization page headline, intro, and last-update badge inside the stats-panel copy area.
- Replaced the homepage stats-panel CTA button with the Decentralization article actions: `Listen to the article`, `15 MIN READ`, and `Share on`.
- Rendered QA confirmed the hero now uses stats-panel assets (`decagon`, `stats-small-planets`, `stats-big-planet`), has three metric cards, and no longer includes the custom Decentralization visual inside the hero.
- Fixed the bottom-edge glow/white-fringe defect on the shared stats-panel used by the homepage and Decentralization page by adding a real bottom-edge floor layer to the panel background instead of a visual overlay.
- Fixed the same bottom-edge defect on the Staking Protocol product panel with a staking-specific floor layer and edge tint.
- Left the Swap and Forex Protocol product panels unchanged because their bottom glow treatment was already rendering correctly.
- Re-ran `npm run check`; type-check and production build passed.
- Confirmed `designsystem.html`, `src/designsystem.tsx`, and `src/styles/designsystem.css` have no diff.
- Scoped the stats-planet image placement on the Decentralization hero so the decorative planets do not collide with the longer article headline/intro at intermediate breakpoints.
- Tuned the Decentralization-only planet offset after visual QA so the asset sits closer to the copy without crossing into the text area.
- Checked the corrected hero at `1455 x 1081`, `1096 x 1081`, and `759 x 1081`; the headline and paragraph remain clear of the planet layer.
- Replaced the Decentralization hero Listen and Share buttons with the Figma-designed article button variants from node `1612:964`.
- Added local Figma-derived mask assets for the article play and X icons so the implementation does not depend on expiring Figma asset URLs.
- Corrected the dotted play icon orientation to face right and constrained both article icons to their Figma dimensions in default and hover states.
- Moved `15 MIN READ` into the hero metadata row as a second `native-phase__badge` beside the last-update badge.
- Replaced the two white-background bottom Share on X buttons on the Ecosystem and Decentralization pages with X-share pills using black default and gray hover states.
- Replaced the Decentralization article placeholder blocks with the final 11-section article content supplied by Dawid.
- Updated the hero subtitle to the final guide wording and removed the obsolete article lede placeholder.
- Updated the bottom Decentralization share CTA so it no longer refers to unfinished final copy.
- Re-ran `npm run check`; type-check and production build passed.
- Rendered `http://127.0.0.1:5174/decentralization.html` through headless Chrome and confirmed 11 article sections, the final "out of this world" line, and no old placeholder article copy.
- Saved the rendered content QA screenshot at `docs/audit-screenshots/decentralization-content-2026-05-21.png`.
- Restored the article lede block above section 01 using the first two supplied paragraphs.
- Removed those same opening paragraphs from `01 Opening thesis` so the article does not repeat them.
- Changed Decentralization article section paragraph text to the explicit `--lunc-dark-gray` token (`#737373`) instead of the lighter gray, while keeping the restored lede block in normal black.
- Kept article section paragraphs on the Body type scale but reduced their scoped weight from the default Body `600` to `500`.
- Temporarily changed Decentralization article section paragraph color to normal black for visual comparison.
- Updated the References / bibliography list to the final eight-source set supplied by Dawid, omitting the mistaken `Use` note.
- Added support for a non-linked bibliography row for source material that does not have a public URL in the supplied list.
- Removed the article tab / visual explainer section for now and cleaned up its unused React data and CSS.
- Replaced the Decentralization hero's shared three homepage stats with six Decentralization-specific black metric cards.
- Made the six-card metric row responsive so it stays in one row when space allows and wraps into additional rows at narrower viewport widths, without changing the existing Decentralization hero height rule.
- Fixed Decentralization metric card label placement so two-line labels keep the correct bottom padding.
- Restored the original metric-card number-to-label rhythm by keeping the same fixed number block height used by the prior three-card design.
- Set an explicit `16px` gap between Decentralization metric numbers and labels.
- Increased Decentralization metric card height to `168px` so cards with two-line labels keep the same `24px` bottom padding as the top/side padding while preserving the `16px` number-to-label gap.
- Increased only the mobile Decentralization hero visual row height so the six-card grid, planet imagery, intro copy, and article action buttons no longer overlap at mobile breakpoints.
- Fixed narrow mobile overflow by using explicit 2-column metric cards below `640px` and 3-column metric cards from `640px` to `767px`.
- Matched the Decentralization mobile metric-card internals to the homepage mobile stats cards: compact mobile padding, `120px` height, `12px` content gap, and `44px` number block.
- Linked the homepage Decentralization strength-card CTA and the homepage stats-panel CTA to `decentralization.html`.
- Replaced the Decentralization resources intro copy with public-facing verification language focused on validators, staking, governance, explorers, tooling, documentation, and developer infrastructure.
