# About terra-classic.money subpage implementation

Created: 2026-05-22

## Scope

Implemented the `about.html` subpage as the transparency, ownership, contribution, support, and contributor-disclosure surface for terra-classic.money.

The page follows the supplied lo-fi wireframe as required content architecture, not as pixel styling. Visual execution uses the existing homepage/subpage design language, typography tokens, pill buttons, badges, card rhythm, founder stories, community CTA, FAQ behavior, and footer.

## Product Decisions

- The page explicitly keeps terra-classic.money independent and unofficial.
- The support model separates voluntary donations from paid L2 discovery listings.
- Contributor records avoid unverifiable donor or sponsor claims. Unverified categories are shown as open public records instead of fabricated entries.
- The existing Founder Stories and Join Community sections are reused so the lower page extends the homepage instead of becoming a one-off landing page.

## Implementation Notes

- Added `about.html` as a Vite static entry.
- Added About page routing in `src/App.tsx`.
- Added structured About page content in `src/data/about.ts`.
- Added About page styles in `src/styles/global.css`.
- Added `websiteRepository` to `src/data/links.ts` for GitHub contribution CTAs.
- Added Trust Timeline and Contributor Ledger previews to the internal design system.
- Updated `- START.md` with the local About page URL.

## Validation Plan

- Run `npm run check`.
- Render-check `http://127.0.0.1:5173/about.html` at desktop, tablet, and mobile widths.
- Verify page identity, non-blank render, no Vite/framework overlay, no relevant console warnings/errors, no horizontal overflow, and FAQ interaction behavior.
- Save QA screenshots in `docs/audit-screenshots`.

## Validation Results

- `npm run typecheck` passed.
- `npm run check` passed. The production build emitted `dist/about.html`.
- Local Vite dev server used `http://127.0.0.1:5174/` because port `5173` was already occupied.
- Browser QA checked:
  - Desktop `1500 x 1000`
  - Tablet `800 x 1080`
  - Mobile `390 x 844`
  - Mobile FAQ interaction at `390 x 844`
- Browser QA confirmed:
  - Page title: `About terra-classic.money`
  - Route: `/about.html`
  - H1 rendered: `About terra-classic.money`
  - Contributor section content present
  - Support-boundary content present
  - No horizontal overflow at checked widths
  - FAQ button `Do donations buy influence?` expands and reveals the no-influence answer
  - Browser warning/error log was empty during the checked pass

QA screenshots:

- `docs/audit-screenshots/about-desktop-2026-05-22.png`
- `docs/audit-screenshots/about-tablet-2026-05-22.png`
- `docs/audit-screenshots/about-mobile-2026-05-22.png`
- `docs/audit-screenshots/about-mobile-faq-2026-05-22.png`
