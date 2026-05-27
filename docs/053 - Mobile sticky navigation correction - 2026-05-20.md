# Mobile Sticky Navigation Correction - 2026-05-20

## Scope

Added mobile sticky navigation so the hamburger menu, language control, and brand remain accessible while scrolling.

## Changes

- Added mobile page-scroll state to the header component.
- Changed the mobile top bar from normal relative positioning to sticky positioning.
- Added a mobile-only bottom divider that appears only after the page has been scrolled.
- Kept the divider hidden at the top of the page and while the mobile drawer is open.
- Added mobile anchor scroll margin so hash navigation does not hide section headings under the sticky top bar.
- Adjusted the scrolled sticky mobile top bar to use 16px top and bottom padding.
- Fixed the empty-announcement mobile rule so it does not reintroduce an 8px top margin while the sticky nav is scrolled/fixed.

## Validation Notes

- Validate at mobile widths by checking:
  - top of page: sticky header visible, no bottom divider
  - after scrolling: sticky header remains accessible, bottom divider appears
  - drawer open: drawer top bar remains fixed and divider is hidden
- `npm run check` passed after the sticky navigation padding adjustment.
