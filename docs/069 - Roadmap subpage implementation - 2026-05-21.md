# Roadmap Subpage Implementation

Created: 2026-05-21

## Scope

This task adds the `roadmap.html` static subpage for the Terra Classic Website.

The supplied lo-fi wireframe is treated as the content and interaction model: a horizontally scrollable decentralized roadmap timeline, a collapsed desktop sidebar default, and a submission CTA below the timeline.

## Product Rules Applied

- The page remains static-only and GitHub Pages-compatible.
- Terra Classic public roadmap entries are separated from L2 / community project-submitted roadmap entries.
- Project-submitted and paid entries are clearly labeled so they do not imply official Terra Classic roadmap status.
- The page includes a neutral disclaimer that Terra-classic.money does not guarantee future delivery of listed milestones.
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
