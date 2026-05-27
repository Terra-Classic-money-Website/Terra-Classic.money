# Roadmap Subpage Implementation

Created: 2026-05-21

## Scope

This task adds the `roadmap.html` static subpage for the Terra Classic Website.

The supplied lo-fi wireframe is treated as the content and interaction model: a horizontally scrollable decentralized roadmap timeline and a collapsed desktop sidebar default. The earlier submission CTA was removed during QA so the page now hands off directly from the roadmap separator into the shared footer spacing.

## Product Rules Applied

- The page remains static-only and GitHub Pages-compatible.
- Terra Classic public roadmap entries are separated from L2 / community project-submitted roadmap entries.
- Project-submitted and paid entries are clearly labeled so they do not imply official Terra Classic roadmap status.
- The timeline content is held in `src/data/roadmap.ts` so Dawid can update entries without touching layout code.

## Implementation Notes

- Added `roadmap.html` as a Vite multi-page static entry.
- Added `src/data/roadmap.ts` for month ranges, milestone rows, source labels, status labels, and paid-entry markers.
- Added the Roadmap route to `src/App.tsx`.
- Updated the sidebar so `roadmap.html` uses its own persisted collapsed-sidebar preference with collapsed as the default.
- Added a reusable `Roadmap timeline` specimen to `designsystem.html` through `src/designsystem.tsx` and `src/styles/designsystem.css`.
- Updated `- START.md` with the local Roadmap subpage URL.

## Validation Plan

- Run `npm run check`.
- Render-check `http://127.0.0.1:5173/roadmap.html` at desktop, tablet, and mobile widths.
- Confirm horizontal scrolling works inside the timeline on desktop and mobile.
- Confirm the desktop sidebar defaults to collapsed on the Roadmap page.
- Confirm the sticky project rail and sticky year/month axis remain synced during horizontal scrolling.
- Check for console errors, horizontal document overflow, text overlap, and broken layout at representative breakpoints.

## Validation Results

- `npm run check` passed after implementation and after the mobile sticky-label correction.
- Browser plugin QA loaded `http://127.0.0.1:5175/roadmap.html` successfully, confirmed the page title, non-empty Roadmap DOM, no console warnings/errors, 8 roadmap rows, 2 roadmap groups, paid-entry labels, and a horizontally scrollable roadmap region.
- Exact viewport QA used local headless Chrome because the in-app browser viewport was below the desktop breakpoint.
- Desktop `1500 x 1000`:
  - sidebar defaults to collapsed;
  - mobile topbar is hidden;
  - no document-level horizontal overflow;
  - timeline has internal horizontal scroll;
  - sticky project labels remain stable after horizontal scrolling;
  - CTA section is present.
- Tablet `900 x 1000`:
  - mobile/tablet topbar is active;
  - no document-level horizontal overflow;
  - timeline has internal horizontal scroll;
  - sticky project labels remain stable after horizontal scrolling.
- Mobile `390 x 844`:
  - mobile topbar is active;
  - no document-level horizontal overflow;
  - timeline keeps internal horizontal scroll;
  - sticky project labels remain stable and keep project text inside the sticky label column after horizontal scrolling.
- `designsystem.html` was opened locally and confirmed to include the new `Roadmap timeline` specimen with no console warnings/errors.
- QA screenshots saved:
  - `docs/audit-screenshots/roadmap-desktop-2026-05-21.png`
  - `docs/audit-screenshots/roadmap-tablet-2026-05-21.png`
  - `docs/audit-screenshots/roadmap-mobile-2026-05-21.png`
  - `docs/audit-screenshots/roadmap-mobile-timeline-2026-05-21.png`

## QA Corrections

- Fixed the mobile sticky project-label column so project names wrap/truncate inside the label cell instead of bleeding into roadmap milestone bars during horizontal scroll.
- Removed the large intro disclaimer card copy and left only the centered `UPDATED MAY 21, 2026` badge beside the Roadmap headline.
- Removed the separate `Decentralized roadmap` board header and legend block so the timeline starts directly after the page introduction.
- Doubled the roadmap project label column on desktop and allowed project names/categories to wrap naturally instead of truncating with ellipses.
- Added a dedicated spacer/mask column between sticky project labels and the scrollable timeline, widened month columns, and hid milestone labels whose start point is already offscreen during horizontal scroll so partially visible milestone text does not read as overlap.
- Matched the Roadmap submit-section-to-footer spacing pattern with the Ecosystem/Decentralization pages by adding footer content padding after the separator.
- Re-ran `npm run check`; it passed after the Roadmap correction pass.
- Re-captured Roadmap QA screenshots:
  - `docs/audit-screenshots/roadmap-desktop-2026-05-21.png`
  - `docs/audit-screenshots/roadmap-desktop-timeline-2026-05-21.png`
  - `docs/audit-screenshots/roadmap-mobile-timeline-2026-05-21.png`
  - `docs/audit-screenshots/roadmap-footer-2026-05-21.png`

## Follow-Up Roadmap QA Correction

- Reduced the sticky project label column from the earlier oversized width to `280px` on desktop/tablet, while keeping project names untruncated.
- Reduced the sticky label-to-timeline spacer to `32px` on desktop/tablet so the roadmap uses more of the viewport.
- Removed the inset stroke from all project-letter avatar circles.
- Added per-row milestone stacking for overlapping date ranges, so temporary overlapping roadmap phases are offset vertically instead of colliding.
- Re-ran `npm run check`; it passed after the follow-up correction.
- Re-captured the same Roadmap QA screenshots and verified:
  - no document-level horizontal overflow;
  - timeline still has internal horizontal scroll;
  - project avatar stroke/shadow is removed;
  - project label text does not overflow;
  - visible milestone metadata overlap count is `0` at desktop, scrolled desktop, and mobile timeline states;
  - footer content starts `32px` below the separator.
- Increased the milestone stack gap to keep overlapping phase labels clear of the previous phase bar.
- Reduced the desktop/tablet sticky label-to-roadmap spacer again from `32px` to `16px`; rendered QA still reports `0` label/bar overlaps.
- Changed the mobile roadmap project column into a `72px` icon rail. Mobile now shows only the project-letter circle, and tapping the circle opens an accessible tooltip with project name and category.
- Mobile tooltip QA verified: project identity text is hidden in the column, tapped circle reports `aria-expanded="true"`, tooltip content appears, no document-level horizontal overflow, timeline still scrolls horizontally, and visible milestone overlap count remains `0`.
- Removed the "Would you like to add your project..." Roadmap submission CTA section.
- Added direct `.roadmap-page + .footer` spacing so the footer still starts with `32px` top padding after the roadmap separator now that the CTA section is gone.

## Sticky Axis And Mobile Rail Correction

- Split the roadmap year/month axis out of the horizontally scrollable grid into a sticky `.roadmap-axis-shell`.
- Synced the axis month track to `.roadmap-scroll.scrollLeft`, so horizontal scrolling keeps years/months aligned with milestone columns.
- Set the axis sticky top to `0px` on desktop, `72px` on tablet, and `96px` on mobile so it pins under the active page chrome.
- Locked mobile text sizing with `text-size-adjust: 100%` and reduced temporary milestone metadata to `10px / 12px` titles and `8px / 10px` metadata on mobile.
- Expanded the actual mobile roadmap board to the viewport edge minus `8px` gutters while keeping document-level horizontal overflow disabled.
- Centered the mobile icon rail inside the `72px` first column, leaving `16px` on both sides of the `40px` project-letter circle.
- Re-ran `npm run check`; it passed after the sticky-axis and mobile-rail correction.
- Rendered QA at `http://127.0.0.1:5175/roadmap.html` verified:
  - desktop `1500 x 1000`: sticky axis top `0px`, scroll transform `-620px`, label width `280px`, no document-level horizontal overflow, internal timeline horizontal scroll active;
  - mobile `390 x 844`: sticky axis top `96px`, scroll transform `-160px`, label width `72px`, board gutters `8px / 8px`, icon rail padding `16px / 16px`, milestone title font `10px`, no document-level horizontal overflow, internal timeline horizontal scroll active;
  - no runtime exceptions or framework error overlay were detected during rendered QA.

## Axis Alignment And Mask Correction

- Removed the internal divider lines from the sticky axis corner so the fixed project-label area does not show unnecessary year/month guide lines.
- Kept the first scrollable year/month boundary lines visible at the actual timeline start.
- Aligned the first year label, first month label, group heading, group copy, and first milestone inset to the same content start on the unscrolled timeline.
- Kept the sticky corner above the scrolling axis track so horizontally scrolled year/month labels do not leak into the fixed project-label area.
- Updated the Roadmap design-system specimen to use the same sticky-axis structure as the production page.
- Re-ran `npm run check`; it passed after the axis alignment and mask correction.
- Rendered QA at desktop `1500 x 1000` with `scrollLeft = 620` verified sticky axis position, synced transform, first year/month boundary lines at `1px`, no framework overlay, and no document-level horizontal overflow.

## Default Timeline Start Correction

- Removed the visible layout spacer between the fixed project-label column and the scrollable timeline by setting the roadmap mask column to `0px`.
- Kept the mask behavior through stacking order instead of visible horizontal space, so scrolled axis labels still do not visually leak into the fixed project-label area.
- Re-ran `npm run check`; it passed after the default-position correction.
- Rendered QA at desktop `1500 x 1000` verified the default state:
  - fixed label edge, lane start, and axis track start all align at the same x-coordinate;
  - year, month, group title, group copy, first milestone text, and first milestone bar all start `24px` after that separator;
  - no framework overlay and no document-level horizontal overflow.

## Sticky Axis Separator Correction

- Added a `1px` bottom inset line to the sticky year/month axis shell so the pinned header remains separated from roadmap content while vertically scrolled.
- Re-ran `npm run check`; it passed after the sticky-axis separator correction.
- Rendered QA at desktop `1500 x 1000` with the page vertically scrolled and roadmap horizontally scrolled verified the sticky axis uses `inset 0 -1px 0 var(--color-grey-100)`, with no framework overlay and no document-level horizontal overflow.

## Mobile Density And Badge Alignment Correction

- Left-aligned the Roadmap `UPDATED MAY 21, 2026` badge on tablet and mobile breakpoints instead of centering it in the viewport.
- Reduced mobile roadmap month columns from `176px` to `88px`, making the same roadmap timeline 50% denser on mobile while preserving horizontal scrolling.
- Re-ran `npm run check`; it passed after the mobile density correction.
- Rendered QA verified:
  - tablet `900 x 1000`: badge wrapper uses `flex-start`, month width remains `220px`, roadmap still scrolls horizontally, no document-level horizontal overflow;
  - mobile `390 x 844`: badge wrapper uses `flex-start`, month width is `88px`, roadmap still scrolls horizontally, board gutters remain `8px / 8px`, no framework overlay, and no document-level horizontal overflow.

## Mobile Sticky Axis Offset Correction

- Changed the mobile Roadmap sticky axis offset from the tablet-style `96px` to `65px`, matching the scrolled mobile nav height (`64px`) plus the nav bottom separator (`1px`).
- Re-ran `npm run check`; it passed after the offset correction.
- Rendered mobile QA at `390 x 844` verified the topbar is fixed at `64px`, the sticky axis starts at `65px`, the gap is exactly `1px`, month width remains `88px`, and there is no framework overlay or document-level horizontal overflow.

## Juris Protocol Avatar Correction

- Added optional avatar fields to Roadmap rows and set Juris Protocol to reuse the existing Ecosystem image asset.
- Updated Roadmap avatar rendering so rows with an avatar display the image inside the existing circular project control, while rows without an avatar keep the letter fallback.
- Re-ran `npm run check`; it passed after the Juris avatar correction.
- Rendered mobile QA at `390 x 844` on the active dev server verified the Juris Protocol Roadmap avatar renders the Ecosystem image, has no fallback `JP` text, keeps the `40px` mobile circle size, and has no framework overlay or document-level horizontal overflow.
