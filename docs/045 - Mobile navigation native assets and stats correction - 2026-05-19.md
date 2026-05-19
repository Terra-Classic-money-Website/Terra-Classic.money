# Mobile navigation native assets and stats correction

## Scope

This document records the follow-up Mobile breakpoint fixes for the top navigation bar, opened navigation typography/icons, native-assets spacing, and the `Efficiency driven by decentralization` section.

## Current project phase

The project remains in responsive correction and implementation hardening for the homepage. This is still a Mobile-only refinement pass and does not change the roadmap, product concept, section order, or GitHub Pages-only delivery model.

## Relevant constraints

- Mobile changes must not move the already-correct desktop, desktop-small, or tablet breakpoints.
- The drawer-open topbar is the control reference for logo, language, and hamburger vertical alignment.
- Shared `tc-type-*` classes should keep their token meanings; component-specific Mobile drawer nav styling should not falsify those utility classes.
- Mobile stats/media layout must preserve the intended visual concept while using Mobile paddings and avoiding oversized full-width metric boxes.

## Fixes implemented

### Mobile top navigation

- Changed the normal Mobile topbar to a 48px bar with 8px internal padding.
- Kept the drawer-open Mobile topbar at 64px with 16px internal padding because that state was already correct.
- When the info box is closed, the logo now sits at the same vertical position as the drawer-open state.
- When the info box is visible, the topbar no longer carries the oversized internal vertical padding.

### Open mobile navigation

- Removed the global link utility class from sidebar nav links so Mobile drawer typography can use H3 without corrupting `tc-type-link-normal`.
- Set Mobile drawer nav labels to H3 sizing: 24px / 32px / 600.
- Added a dedicated Layer 2 icon only for the Mobile drawer external nav presentation.
- Enlarged external nav icons to 32px so they fit the H3 label rhythm.

### Native assets

- Reworked the Mobile native-assets section to explicit editorial spacing:
  - section padding: 48px top, 24px sides, 56px bottom
  - header text margin: 32px after the title and 48px before the first group
  - group margins aligned to the surrounding Mobile sections

### Efficiency driven by decentralization

- Repositioned the small planets and main planet artwork so the artwork sits between the copy and metrics instead of colliding with the metric cards.
- Changed Mobile metric cards from full-width stacked blocks to compact wrapping cards:
  - first two metrics sit on one row at 360px effective width
  - third metric sits on the next row
  - cards use content-driven widths and Mobile type sizes

## Validation results

Rendered Browser validation:

- Normal topbar with info box: 48px height, 8px top/bottom padding.
- Closed-info topbar: logo top position is 16px, matching the drawer-open logo top position.
- Drawer-open topbar: unchanged 64px height, 16px top/bottom padding.
- Mobile drawer nav labels render at 24px / 32px / 600.
- Mobile drawer external nav icons render at 32px; Layer 2 uses `capability-layer2-icon.svg` only in the Mobile drawer.
- Desktop/tablet/sidebar external nav keeps the default `sidebar-external-arrow.svg` icon.
- Native-assets section uses 48px top padding and 24px side padding.
- Stats metric cards render as two compact rows at effective 360px width.
- Mobile text overflow audit: zero text overflows.
- Mobile `tc-type-*` audit: zero mismatches.

Final project gate:

- `npm run check` passed.
