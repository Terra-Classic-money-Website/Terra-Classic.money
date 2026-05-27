# Mobile padding token sync

Created: 2026-05-20

## Scope

Updated the `designsystem.html` Paddings section so the Mobile column reflects the current implemented mobile homepage padding values without changing the `max-width: 767px` mobile breakpoint or intended mobile layout.

## Changes

- Updated shared mobile padding variables in `src/styles/tokens.css` to match the current mobile website state.
- Added explicit padding token families for mobile-only or mobile-specific surfaces that were previously hidden as hard-coded CSS:
  - mobile announcement slot
  - capabilities section shell
  - capabilities heading inset
  - capability card inset
  - native assets section inset
  - scrolled mobile top navigation inset
- Rewired the matching mobile selectors in `src/styles/global.css` to use shared `--tc-padding-*` variables instead of duplicate hard-coded values.
- Updated `src/designsystem.tsx` so the Paddings section labels and notes describe the current production sources accurately.

## Non-goals

- No mobile breakpoint change.
- No intended mobile visual/layout change.
- No desktop/tablet responsive strategy change.

## Validation plan

- Run `npm run check`.
- Start the local Vite app.
- Verify `designsystem.html` mobile padding values resolve from shared CSS variables.
- Verify representative mobile homepage paddings match the current token values at `390px`.

## Validation results

- `npm run check` passed.
- Local Vite QA ran at `http://127.0.0.1:5174/` because port `5173` was already in use.
- `designsystem.html` exposes the updated Mobile padding values from shared CSS variables.
- Rendered mobile QA at `390px` confirmed:
  - mobile announcement slot: `8px 8px 0`
  - announcement card: `16px`
  - default mobile topbar: `8px`
  - scrolled mobile topbar: `16px`
  - What editorial: `48px 24px 24px`
  - capabilities section: `48px 0 0`
  - capabilities heading: `0 24px`
  - capability cards: `16px 24px 24px`
  - native assets section: `48px 24px 8px`
  - strengths section: `16px 24px 48px`
  - founders section: `48px 24px 16px`
  - founder cards: `8px`
  - community section: `16px 24px 48px`
  - FAQ section: `48px 24px 64px`
