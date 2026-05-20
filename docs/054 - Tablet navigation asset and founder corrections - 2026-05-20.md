# Tablet navigation asset and founder corrections

## Scope

Recorded the follow-up tablet breakpoint correction for the `768px-1299px` range.

## Changes

- Changed the tablet top navigation bottom rule from a permanent border to a scrolled-only pseudo-divider.
- Kept the tablet divider hidden while the navigation drawer is open.
- Matched the tablet LUNC feature-row background planet opacity to the mobile value.
- Reduced tablet founder stories to a single two-column row by hiding founder cards from the third item onward.

## Validation Plan

- Verify at tablet width that the top navigation has no horizontal divider at page top.
- Verify after scrolling that the tablet sticky navigation shows the divider.
- Verify the LUNC background image is visually quieter at tablet width.
- Verify the founder story area renders as one row with two cards on tablet.
- Run `npm run check` before handoff.
