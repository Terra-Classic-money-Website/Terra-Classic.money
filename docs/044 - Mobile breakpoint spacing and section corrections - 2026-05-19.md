# Mobile breakpoint spacing and section corrections

## Scope

This document records the latest Mobile breakpoint correction batch for navigation spacing, closed infobox spacing, product-section media alignment, native-assets-to-strengths spacing, and strengths card sizing.

## Current project phase

The project remains in responsive correction and implementation hardening for the homepage. This task is a Mobile-only refinement pass and does not change the core concept, roadmap scope, section order, or GitHub Pages-only hosting model.

## Relevant constraints

- Mobile corrections must preserve the existing desktop, desktop-small, and tablet breakpoint fixes.
- `designsystem.html` and the shared `tc-type-*` classes remain the typography source of truth.
- The implementation must keep section heights content-driven on Mobile unless a visual media panel intentionally needs a fixed format.
- Full-screen mobile navigation must preserve stable topbar control positions and avoid side-drawer behavior.

## Fixes implemented

### Mobile topbar and announcement spacing

- Set the Mobile topbar to 64px high with 16px top and bottom padding.
- Preserved the Mobile closed-state topbar spacing after the announcement is dismissed: 16px top offset, then hero content.
- Kept the open mobile menu as a full-viewport overlay with the topbar fixed at the top of the viewport.
- Removed the open-state topbar margin conflict so the logo, language button, and hamburger no longer jump when the menu opens.

### Typography

- Changed `Decentralization supported by:` to use the Mobile body-small token: 12px font size and 16px line height.
- Re-ran a rendered Mobile `tc-type-*` typography audit and found zero mismatches.

### Product sections

- Kept Mobile product sections content-height driven.
- Centered protocol planets inside their visual containers.
- Preserved protocol graphics between the intro text and `How it works:`.
- Allowed product CTA buttons to wrap horizontally, so wider Mobile widths use one or two lines instead of forcing every button onto its own row.

### Native assets and strengths

- Reduced the spacing between `Terra Classic native assets:` and `Terra Classic strengths:` to match the tighter rhythm used above.
- Adjusted the strengths intro spacing to match the editorial pattern used by sections like `What is Terra Classic?`.
- Removed fixed Mobile heights from standard strengths cards so their height follows content.
- Kept the blue planet strengths visual as a fixed-format media box.
- Fixed a discovered Mobile text overflow in the FAQ heading while validating this batch.

## Validation results

Rendered Browser validation:

- Closed announcement state: mobile topbar top offset is 16px and topbar padding is 16px top / 16px bottom.
- Open menu state: overlay fills the viewport, topbar is fixed at the top, and logo/language/menu controls sit on the same 16px vertical rhythm.
- `Decentralization supported by:` renders at 12px / 16px.
- Product planet center delta is 0px in the staking panel.
- At an effective 663px Mobile client width, staking CTA buttons wrap into two rows, not three.
- Native-assets-to-strengths section gap is 8px.
- First standard strengths card renders at content height; the blue planet box remains a fixed 384px media panel.
- Mobile type audit: zero `tc-type-*` mismatches.
- Mobile text overflow audit: zero text overflows at the effective 360px Mobile client width.

Final project gate:

- `npm run check` passed.
