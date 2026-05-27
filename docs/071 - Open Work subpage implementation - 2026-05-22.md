# Open Work Subpage Implementation

Created: 2026-05-22

## Scope

This task adds the `open-work.html` public subpage and `open-work-detail.html?work=...` detail page pattern for Terra Classic open work packages.

The page presents ecosystem work packages that independent builders, software houses, and contributors can prepare public proposals or quotes for. Public website copy intentionally avoids the term `RFP`; the site uses `open work`, `work package`, `proposal`, and `quote`.

## Product Rules Applied

- The page remains static-only and GitHub Pages-compatible.
- Work package acceptance happens through public Agora discussion and Terra Classic governance, not through this website.
- Payment copy follows the requested rule: payment after successful completion of the whole package, or after successful delivery of accepted milestones.
- Payment asset copy is limited to LUNC or USTC sent to the wallet described in the accepted proposal or quote.
- The page does not imply that Terra-classic.money is the official Terra Classic authority or an employer.

## Implementation Notes

- Added `open-work.html` and `open-work-detail.html` as Vite multi-page static entries.
- Added `src/data/openWork.ts` as the typed source of truth for work package card and detail content.
- Added the `Open work` navigation item between `Markets` and `About terra-classic.money`.
- Added Open Work route detection, board, cooperation terms, proposal process, share CTA, and detail page rendering in `src/App.tsx`.
- Added responsive Open Work styling to `src/styles/global.css`.
- Added an Open Work card specimen to the local design-system surface through `src/designsystem.tsx` and `src/styles/designsystem.css`.
- Updated `- START.md` with local Open Work and Open Work detail URLs.

## Validation Plan

- Run `npm run check`.
- Render-check `http://127.0.0.1:5173/open-work.html` at desktop, tablet, and mobile widths.
- Render-check one detail URL, starting with `open-work-detail.html?work=wallet-staking-governance-guide`.
- Confirm the sidebar and mobile drawer include `Open work` in the correct navigation order.
- Confirm card clicks reach a detail page, invalid detail IDs show a readable not-found state, and Agora links open externally.
- Check for console warnings/errors, framework overlays, document-level horizontal overflow, text overlap, and broken layout at representative breakpoints.

## Validation Results

- `npm run check` passed after implementation.
- Re-ran `npm run check` after the badge-copy correction; it passed again.
- Rendered QA used the local Vite server at `http://127.0.0.1:5174/` because port `5173` was already in use.
- Desktop `1500 x 1000`:
  - `open-work.html` renders six work package cards;
  - the first row uses three columns;
  - nav order is `Ecosystem`, `Decentralization`, `Roadmap`, `Markets`, `Open work`, `About terra-classic.money`;
  - cooperation terms count is `2`;
  - process step count is `4`;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Tablet `900 x 1000`:
  - the board renders six cards in a two-column layout;
  - terms and process sections are present;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Mobile `390 x 844`:
  - the board renders six cards in a one-column layout;
  - terms and process sections are present;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Card click QA confirmed the first card navigates to `/open-work-detail.html?work=wallet-staking-governance-guide`.
- Detail page QA confirmed:
  - the expected package title renders;
  - all four detail sections render: `Ideal for`, `Expected deliverables`, `Acceptance criteria`, and `Quote should include`;
  - the Agora link points to `https://agora.terra-classic.io/`;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Missing detail ID QA confirmed `open-work-detail.html?work=missing-package` renders the not-found state with a back link to `open-work.html`.
- `designsystem.html` rendered with the new `Open work card` specimen and no document-level horizontal overflow.
- Browser logs had no warning or error entries during final rendered QA.
- QA screenshots saved:
  - `docs/audit-screenshots/open-work-desktop-2026-05-22.png`
  - `docs/audit-screenshots/open-work-tablet-2026-05-22.png`
  - `docs/audit-screenshots/open-work-mobile-2026-05-22.png`
  - `docs/audit-screenshots/open-work-detail-mobile-2026-05-22.png`

## QA Corrections

- Changed the work package status badge copy to uppercase `OPEN FOR PROPOSALS` so it matches the existing badge component's uppercase, letter-spaced visual language.

## Open Work Correction Pass

Requested corrections implemented on 2026-05-22:

- Removed the `COMMUNITY WORK BOARD` badge from the main Open Work hero section.
- Changed `Open work packages` and `Closed work packages` section headings to use the H3 typography token.
- Added divider lines between the main headline section and the open work section, and between the open and closed work sections.
- Removed `OPEN FOR PROPOSALS` badges from work cards.
- Promoted the category labels such as `Content + UX` and `Developer docs` into the card badge position.
- Forced Open Work card badge text to render uppercase through CSS so future category labels keep the same big-letter badge style.
- Added a `Closed work packages` section with two static, non-clickable completed work cards.
- Changed the proposal-process Agora CTA to the dark button variant: black by default, light gray with black text on hover/focus.
- Updated the design-system Open Work card specimen so it reflects category-badge card behavior.

Validation after the correction pass:

- `npm run check` passed.
- Rendered QA used the local Vite server at `http://127.0.0.1:5174/` because port `5173` was already in use.
- Desktop `1500 x 1000`:
  - hero badge count is `0`;
  - `Open work packages` uses `tc-type-h3`;
  - `Closed work packages` uses `tc-type-h3`;
  - open section divider is `1px`;
  - closed section divider is `1px`;
  - six open cards remain clickable;
  - two closed cards are present and have `0` links;
  - first open card badge is `Content + UX`;
  - `OPEN FOR PROPOSALS` badge count in open cards is `0`;
  - proposal CTA renders as `pill-button--dark` with black default background and the dark-hover rule present;
  - no document-level horizontal overflow and no framework error overlay.
- Tablet `900 x 1000`:
  - open cards render two per row;
  - closed cards render two per row;
  - no document-level horizontal overflow and no framework error overlay.
- Mobile `390 x 844`:
  - open cards render one per row;
  - closed cards render one per row;
  - no document-level horizontal overflow and no framework error overlay.
- Browser logs had no warning or error entries during final correction QA.
- After the badge text correction, `npm run check` passed again.
- Mobile badge QA confirmed the first card badge keeps source text `Content + UX` while rendering with `text-transform: uppercase`, no document-level horizontal overflow, and no framework error overlay.
- Correction QA screenshots saved:
  - `docs/audit-screenshots/open-work-corrections-desktop-2026-05-22.png`
  - `docs/audit-screenshots/open-work-corrections-tablet-2026-05-22.png`
  - `docs/audit-screenshots/open-work-corrections-mobile-2026-05-22.png`
  - `docs/audit-screenshots/open-work-uppercase-badges-mobile-2026-05-22.png`

## Completed Breakpoint Review

Dawid requested completion of the interrupted mobile/tablet breakpoint review on 2026-05-22.

Review scope:

- Desktop Big: `1500 x 1000`
- Desktop Small: `1366 x 900`
- Tablet: `900 x 1000`
- Mobile Wide: `760 x 1000`
- Mobile: `390 x 844`
- Detail page mobile: `390 x 844`

Validation results:

- `open-work.html` rendered cleanly at all reviewed breakpoints.
- No document-level horizontal overflow was detected at any reviewed breakpoint.
- No card, term, or process-step overlaps were detected.
- No framework error overlay was detected.
- Browser warning/error log entries were empty.
- Hero badge remains removed.
- Open and closed section headings remain `tc-type-h3`.
- Divider above the open section and divider above the closed section both remain `1px`.
- Open cards remain clickable:
  - Desktop Big: `3` cards in the first row.
  - Desktop Small: `2` cards in the first row.
  - Tablet: `2` cards in the first row.
  - Mobile Wide: `1` card in the first row.
  - Mobile: `1` card in the first row.
- Closed cards remain non-clickable:
  - Desktop Big: `2` cards in the first row.
  - Desktop Small: `2` cards in the first row.
  - Tablet: `2` cards in the first row.
  - Mobile Wide: `1` card in the first row.
  - Mobile: `1` card in the first row.
- Card badges render source text such as `Content + UX` with CSS `text-transform: uppercase`.
- `OPEN FOR PROPOSALS` card badge count remains `0`.
- Proposal CTA remains the dark button variant:
  - default background: `rgb(16, 16, 16)`;
  - default text: white;
  - hover/focus rule present: light gray background with black text.
- Detail page mobile QA confirmed:
  - title renders;
  - four detail sections render;
  - list item counts are `3`, `4`, `4`, and `4`;
  - no document-level horizontal overflow;
  - no framework error overlay.

Additional breakpoint-review screenshots saved:

- `docs/audit-screenshots/open-work-breakpoint-desktop-big-top-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-desktop-big-closed-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-desktop-big-terms-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-desktop-big-process-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-desktop-small-top-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-desktop-small-closed-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-desktop-small-terms-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-desktop-small-process-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-tablet-top-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-tablet-closed-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-tablet-terms-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-tablet-process-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-mobile-wide-top-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-mobile-wide-closed-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-mobile-wide-terms-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-mobile-wide-process-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-mobile-top-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-mobile-closed-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-mobile-terms-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-mobile-process-2026-05-22.png`
- `docs/audit-screenshots/open-work-breakpoint-detail-mobile-top-2026-05-22.png`

## Active Indicator Correction

Dawid requested a small active/open indicator in the top-right corner of every open work package card on 2026-05-22.

Implementation:

- Added a small decorative active indicator to open work package cards only.
- Used `--lunc-light-blue` / `rgb(84, 147, 247)` for the indicator color.
- Kept closed work cards without the active indicator.
- Aligned the indicator to the same right padding as the card.
- Centered the indicator vertically against the category badge row.
- Added a restrained blinking animation that loops opacity from `1` to `.5`.
- Updated the design-system Open Work card specimen with the active indicator.

Validation:

- `npm run check` passed after adding the indicator.
- `npm run check` passed again after aligning the indicator and adding the blink animation.
- Rendered QA confirmed:
  - open indicator count is `6`;
  - closed indicator count is `0`;
  - indicator size is `10px x 10px`;
  - indicator color is `rgb(84, 147, 247)`;
  - right inset equals card padding (`24px` on desktop);
  - indicator and badge center Y positions match exactly on desktop;
  - blink animation is `open-work-active-blink`, `1.4s`, `infinite`, `alternate`;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Active indicator screenshot saved:
  - `docs/audit-screenshots/open-work-active-indicator-aligned-desktop-2026-05-22.png`

## Closed Work Content Correction

Dawid requested replacing the placeholder closed work cards with recent completed Terra Classic work on 2026-05-22.

Implementation:

- Replaced the two placeholder website-page cards with completed protocol-maintenance work based on the supplied governance screenshots.
- Added `Cosmos SDK v0.53 and IBC v2 upgrade support` as a completed work package.
- Added `Wasmd unforking and forked-module removal` as a completed work package.
- Omitted contractor names from the public card content.
- Kept closed work cards non-clickable.
- Kept the desktop closed work grid as a three-column grid even though only two cards are currently present.
- Kept the tablet closed work grid at two columns because the rendered QA showed that forcing three columns at tablet width collapses footer text into an unreadable layout.
- Kept mobile closed work cards at one column.

Validation:

- `npm run check` passed.
- Desktop `1500 x 1000` QA confirmed:
  - closed card count is `2`;
  - closed card link count is `0`;
  - closed grid template is three columns;
  - contractor names such as `OrbitLabs` are absent;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Tablet `900 x 1000` QA confirmed:
  - closed card count is `2`;
  - closed grid template is two columns for readability;
  - closed card link count is `0`;
  - contractor names are absent;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Mobile `390 x 844` QA confirmed:
  - closed card count is `2`;
  - closed grid template is one column;
  - closed card link count is `0`;
  - contractor names are absent;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Browser warning/error logs were empty during the final content QA.
- Closed work content QA screenshots saved:
  - `docs/audit-screenshots/open-work-closed-real-work-desktop-2026-05-22.png`
  - `docs/audit-screenshots/open-work-closed-real-work-tablet-fixed-2026-05-22.png`
  - `docs/audit-screenshots/open-work-closed-real-work-mobile-2026-05-22.png`

## Open Work Package Replacement

Dawid requested replacing the open work package list on 2026-05-22.

Implementation:

- Replaced the previous six open work packages with four current strategic work packages:
  - `Forex Protocol implementation`
  - `Ledger and Ledger Live integration`
  - `Trezor integration feasibility and implementation path`
  - `Babylon integration feasibility study`
- Added separate `detailSummary` copy for open work packages so the card description and detail-page introduction can follow different content lengths without weakening either surface.
- Kept all four new packages active and clickable.
- Kept the active/open blue indicator behavior on each open package card.
- Kept the existing proposal, quote, cooperation, closed work, and governance process sections unchanged.

Validation plan:

- Run `npm run check`.
- Render-check `open-work.html` at desktop, tablet, and mobile widths.
- Confirm the open work count is `4`.
- Confirm all four open cards are clickable and point to their matching detail URLs.
- Confirm the first detail page uses the detail-page introduction copy rather than the shorter card description.
- Confirm no document-level horizontal overflow, framework overlay, or browser warnings/errors.

Validation results:

- `npm run check` passed after the replacement.
- Desktop `1500 x 1000` QA confirmed:
  - open work count is `4`;
  - all four open work cards are clickable;
  - active indicator count is `4`;
  - the first row renders three cards;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Tablet `900 x 1000` QA confirmed:
  - open work count is `4`;
  - all four open work cards are clickable;
  - active indicator count is `4`;
  - the first row renders two cards;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Mobile `390 x 844` QA confirmed:
  - open work count is `4`;
  - all four open work cards are clickable;
  - active indicator count is `4`;
  - cards render one per row;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Forex detail page mobile QA confirmed:
  - title is `Forex Protocol implementation`;
  - the detail page uses the dedicated Forex Protocol detail introduction copy;
  - meta fields render category, effort, and quote model;
  - detail sections render as `Ideal for`, `Expected deliverables`, `Acceptance criteria`, and `Quote should include`;
  - detail section item counts are `3`, `4`, `4`, and `4`;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Browser warning/error logs were empty during the final replacement QA.
- Open package replacement screenshots saved:
  - `docs/audit-screenshots/open-work-new-packages-desktop-2026-05-22.png`
  - `docs/audit-screenshots/open-work-new-packages-tablet-2026-05-22.png`
  - `docs/audit-screenshots/open-work-new-packages-mobile-2026-05-22.png`
  - `docs/audit-screenshots/open-work-new-package-detail-forex-mobile-2026-05-22.png`

## Open Work Detail Polish

Dawid requested three detail-page polish fixes on 2026-05-22.

Implementation:

- Changed the Forex Protocol card/detail category from `Protocol product + stablecoins` to `Stablecoins`.
- Removed the `Open work` back link from open work detail pages.
- Added page-specific footer top padding after `open-work-detail-page` so footer content no longer sits directly against the section separator.
- Kept the footer spacing change scoped to Open Work detail pages.

Validation plan:

- Run `npm run check`.
- Render-check the Forex detail page at desktop and mobile widths.
- Confirm the `Open work` back link is absent on the detail page.
- Confirm the Forex category badge reads `Stablecoins`.
- Confirm the detail-page footer has top padding after the separator.

Validation results:

- `npm run check` passed after the polish fixes.
- Forex detail page desktop `1500 x 1000` QA confirmed:
  - Forex category reads `Stablecoins`;
  - `.open-work-back-link` count is `0`;
  - detail-page footer top padding is `32px`;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Forex detail page mobile `390 x 844` QA confirmed:
  - Forex category reads `Stablecoins`;
  - `.open-work-back-link` count is `0`;
  - detail-page footer top padding is `24px`;
  - no document-level horizontal overflow;
  - no framework error overlay.
- Browser warning/error logs were empty during the final polish QA.
- Detail polish screenshots saved:
  - `docs/audit-screenshots/open-work-detail-polish-forex-desktop-2026-05-22.png`
  - `docs/audit-screenshots/open-work-detail-polish-forex-mobile-2026-05-22.png`
