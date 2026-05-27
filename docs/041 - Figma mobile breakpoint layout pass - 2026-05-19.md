# Figma mobile breakpoint layout pass

## Source

- Figma file: TerraClassic - Website - 2026
- Node: `1686:683`
- Frame: `Home page v4 - Mobile - 320`
- Natural frame size inspected: 360px wide

## Project phase

This work is part of the responsive implementation correction phase. Desktop Big, Desktop Small, and Tablet breakpoint work had already been corrected; this pass brings the Mobile breakpoint closer to the available Figma mobile design while preserving the current homepage structure and GitHub Pages-only static implementation model.

## Roadmap fit

The task fits the current roadmap because it improves the public homepage implementation without adding new scope, backend infrastructure, routing complexity, or concept drift. The Figma mobile frame is intentionally incomplete, so it is used as a spacing, layout, and component-behavior reference rather than as a complete section-by-section replacement.

## Relevant constraints

- `designsystem.html` and the shared CSS tokens remain the source of truth for typography.
- Mobile typography must keep the `tc-type-*` classes aligned with their mobile token values.
- The Figma `M` naming prefix is not implemented in code; it is treated as Figma-internal naming only.
- The website remains a static GitHub Pages-compatible Vite/React site.
- Mobile changes must not regress the previously corrected desktop and tablet breakpoints.

## Implementation notes

- Moved the announcement card into the mobile top flow before the mobile navigation, while keeping the desktop/tablet announcement in the main content flow.
- Updated mobile outer gutters to 8px to match the Figma mobile frame.
- Rebuilt the mobile announcement and top navigation layout around the Figma measurements:
  - announcement card: 344px at 360px viewport, 16px padding, 16px radius, 157px minimum height
  - topbar: 344px at 360px viewport, 48px height, 8px padding, 8px top offset
  - topbar content order: logo, language button, divider, hamburger
- Updated the mobile hero to match the Figma hero structure:
  - hero panel: 344px wide at 360px viewport, 954px minimum height, 24px padding
  - hero copy: 296px content width, 16px text gap
  - hero cards: 296px width, 12px/16px card padding, 8px group spacing
  - hero orb: 296px positioned in the lower panel
- Improved downstream mobile rhythm using the same Figma spacing logic:
  - support strip: 204px high with 24px side padding
  - editorial sections: 24px inner copy padding and tighter 16px text gaps
  - capability cards: one-column 344px cards, 8px inter-card gaps, 24px inner side padding, 48px CTAs
  - protocol panels: one-column stacked layout, 24px padding, 8px step gaps, hidden desktop visual on mobile

## Typography guardrail

Two Figma-derived heading overrides were intentionally not kept because they would make elements carrying `tc-type-h1` / `tc-type-h2` stop matching the design-system mobile token contract. The implementation preserves class-to-token fidelity and uses layout changes rather than silent type overrides.

## Validation plan and results

- Run rendered mobile typography audit against all `tc-type-*` mobile token expectations.
- Verify Figma-critical mobile layout measurements at 360px effective client width.
- Verify no horizontal overflow at the narrow 320px effective client width and upper mobile breakpoint.
- Verify page identity, non-blank render, no framework overlay, and console health.
- Exercise the mobile navigation open interaction and verify drawer state.
- Run the project validation command: `npm run check`.

Rendered validation results before final project gate:

- 360px effective client width: no typography mismatches and no horizontal overflow.
- 360px effective client width: announcement `344x157` at `x=8`, topbar `344x48` at `x=8`, hero `344x954` at `x=8`.
- 320px effective client width: no horizontal overflow; hero and topbar scale to 304px width with 8px gutters.
- 752px effective client width inside the mobile media query: no horizontal overflow.
- Mobile navigation open interaction sets `aria-expanded="true"` and opens the drawer panel.
