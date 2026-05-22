# Navigation order correction

Created: 2026-05-22

## Scope

This task reorders the primary navigation items to match the latest requested hierarchy:

1. Ecosystem
2. Markets
3. Roadmap
4. Decentralization
5. Open work
6. About terra-classic.money

## Implementation Notes

- Updated the shared `sections` array in `src/data/content.ts`.
- The existing `Sidebar` component and local design-system preview both consume this shared array, so the order changes consistently across the desktop sidebar, mobile drawer, and `designsystem.html` sidebar specimen.
- No new visual pattern, motion behavior, route, or design-system component was introduced.

## Validation Plan

- Run `npm run check`.
- Render-check the homepage desktop sidebar.
- Render-check the mobile drawer ordering.
- Confirm the page is not blank, no framework overlay appears, browser warnings/errors are clean, and the navigation links keep the expected page URLs.

## Validation Results

- `npm run check` passed.
- Rendered QA used the local Vite dev server at `http://127.0.0.1:5174/` because port `5173` was already in use.
- Desktop QA at `1500 x 1000` confirmed the expanded sidebar primary navigation order:
  1. Ecosystem
  2. Markets
  3. Roadmap
  4. Decentralization
  5. Open work
  6. About terra-classic.money
- Desktop QA confirmed the corresponding links remain:
  - `/ecosystem.html`
  - `/markets.html`
  - `/roadmap.html`
  - `/decentralization.html`
  - `/open-work.html`
  - `/about.html`
- Mobile drawer QA at `390 x 844` confirmed the same primary navigation order and links.
- Browser warning/error logs were empty during the rendered checks.
- No framework overlay, blank page, or document-level horizontal overflow was detected.
- Screenshot evidence was captured outside the repo:
  - `/tmp/terra-nav-desktop-expanded-2026-05-22.png`
  - `/tmp/terra-nav-mobile-drawer-2026-05-22.png`
