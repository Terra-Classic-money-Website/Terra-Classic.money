# Tablet responsive corrections

## Scope

This note records the tablet breakpoint pass for `768px-1299px`.

The tablet model keeps the public React structure and moves layout responsibility into CSS. It replaces the desktop sidebar chrome with a Figma-aligned top navigation bar and drawer behavior.

## Changes

- Implemented the Figma tablet top navigation bar:
  - 96px fixed top bar.
  - 24px horizontal/vertical padding.
  - 32px dot-grid hamburger button.
  - 48px divider between hamburger and logo.
  - 221px Terra Classic logo.
  - Top-bar language pill.
- Removed redundant drawer chrome on tablet:
  - no logo inside the opened drawer,
  - no old collapse icon inside the opened drawer,
  - no language button inside the opened drawer.
- Added tablet anchor offset so section navigation lands below the fixed top bar.
- Updated the video explainer button so the label wraps to 2 lines on tablet and the button no longer consumes unnecessary horizontal width.
- Repositioned the side face avatars around the video explainer button so they stay fully visible and keep a fixed 16px gap from the button across tablet widths.
- Moved protocol status badges into the protocol title row so APR/status/coming-soon badges wrap naturally instead of overlapping the title.
- Added tablet-specific decentralization stats text-height ranges so the planet field keeps the intended 40px gap below the text block.
- Changed narrow tablet stats metrics to a 2-column flow, so the third metric moves to a second row when three metric cards are too tight.
- Removed tablet founder card row stretching so bottom padding returns to the same 16px spacing as the side padding.

## Validation

Rendered QA was run against the local Vite app at `http://127.0.0.1:5175/`.

Measured tablet widths:

- `768px`
- `900px`
- `1023px`
- `1024px`
- `1075px`
- `1076px`
- `1299px`

Confirmed:

- Top navigation height is 96px on tablet.
- Opened drawer starts below the top navigation and no longer duplicates logo, collapse, or language controls.
- Video explainer button text is 2 lines at tablet width.
- Video explainer side avatars are fully visible at 768px, 1024px, and 1299px, with a measured 16px gap from the button.
- Protocol badges do not overlap product titles.
- Decentralization stats text-to-planets spacing remains 40px across tablet wrap thresholds.
- At 768px, the stats metrics use 2 columns and the third card moves to the second row.
- Founder story cards keep 16px bottom padding.
- No horizontal overflow was detected in the tested tablet widths.
