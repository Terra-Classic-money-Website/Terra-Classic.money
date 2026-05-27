# Sidebar Navigation Link Behavior

Created: 2026-05-20

## Scope

This task changes the main sidebar navigation from homepage section navigation to stable page navigation.

## Decision

- Primary navigation items now point to page-level URLs:
  - `ecosystem.html`
  - `decentralization.html`
  - `roadmap.html`
  - `markets.html`
  - `about.html`
- The homepage no longer treats `Ecosystem` as an active item by default.
- Sidebar highlights no longer change while scrolling on the homepage or subpages.
- `Layer 2` now points to `https://l2.terra-classic.money`.
- `Documentation` remains a placeholder until the final approved documentation URL is supplied.

## Implementation Notes

- `src/data/links.ts` owns the canonical nav destinations.
- `src/data/content.ts` attaches primary nav labels to those destinations.
- `src/App.tsx` no longer keeps `activeId` state or registers an `IntersectionObserver` for section visibility.
- `src/styles/global.css` keeps hover color behavior but removes active-link styling from the sidebar.
- `src/designsystem.tsx` was synced so the sidebar preview no longer marks the first nav item as active.

## Validation Plan

- Run `npm run check`.
- Render-check the homepage and `ecosystem.html`.
- Confirm sidebar primary links are page URLs, not homepage section hashes.
- Confirm scrolling does not add or change active sidebar states.
- Confirm mobile drawer behavior matches desktop navigation behavior.

## Validation Results

- `npm run check` passed.
- Local Vite dev server used `http://127.0.0.1:5175/` because ports `5173` and `5174` were already in use.
- Browser QA checked homepage desktop at `1500 x 1000`:
  - primary nav hrefs resolved to `/ecosystem.html`, `/decentralization.html`, `/roadmap.html`, `/markets.html`, and `/about.html`
  - no `.active` sidebar links on first render
  - no `.active` sidebar links after scrolling to `2600px`
  - all primary nav items stayed black after scroll
  - no horizontal overflow
  - no framework error overlay
  - no console warnings or errors
- Browser QA checked `ecosystem.html` desktop at `1500 x 1000`:
  - no `.active` sidebar links on first render
  - no `.active` sidebar links after scrolling to `2200px`
  - no horizontal overflow
  - no framework error overlay
- Browser QA checked homepage mobile drawer at `390 x 844`:
  - drawer opened successfully
  - primary nav hrefs matched the desktop page URLs
  - no `.active` sidebar links in the opened drawer
  - no horizontal overflow
- Interaction QA confirmed clicking the desktop `Ecosystem` nav item from the homepage navigates to `http://127.0.0.1:5175/ecosystem.html`, renders `Terra Classic ecosystem`, and leaves active sidebar link count at `0`.
