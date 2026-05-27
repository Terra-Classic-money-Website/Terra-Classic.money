# Responsive public structure and tablet breakpoint

Created: 2026-05-18

## Purpose

This document records the implementation step that turns the breakpoint strategy from `029 - Responsive breakpoint strategy change - 2026-05-18.md` into the homepage code.

The goal of this step is to remove the public viewport split from React and let CSS own the responsive behavior across Desktop Big, Desktop Small, Tablet, and Mobile.

## Implemented direction

The homepage now moves toward one public React structure:

- React renders one semantic homepage tree for every viewport.
- The previous desktop-only internal comparison render path is removed from the public app flow.
- The unused `public/assets/figma-sections` desktop comparison screenshots are removed from the shipped static asset set.
- CSS controls the responsive differences between left-sidebar desktop navigation, top navigation, typography scale, spacing, and content layout behavior.
- `designsystem.html` support CSS is kept aligned with the same Tablet threshold and shared token-driven heading scale.

This makes the website easier to reason about because breakpoints are no longer split between JavaScript viewport logic and CSS media queries.

## Breakpoint model

The implemented model follows the project naming from document `029`:

| Name | Query | Implemented responsibility |
| --- | --- | --- |
| Desktop Big | `min-width: 1500px` | Wide desktop baseline using the shared public React structure and default design-system tokens. |
| Desktop Small | `max-width: 1499px` | Same public desktop layout logic as Desktop Big, with the Desktop Small / Tablet typography and padding token tier. |
| Tablet | `max-width: 1299px` | Same compact layout/token tier as Desktop Small, but with top navigation and off-canvas drawer instead of fixed left sidebar. |
| Mobile | `max-width: 767px` | Existing phone breakpoint remains the only place for phone-style one-column collapse behavior. |

## Key implementation decisions

The old `max-width: 1199px` breakpoint has been replaced with `max-width: 1299px` for the navigation tier.

The Tablet tier does not blindly inherit all old `1199px` content-collapse behavior. That would make the site too phone-like on small laptops and larger tablets. Instead:

- navigation switches to top bar and hamburger drawer at `1299px`;
- typography and spacing come from the existing shared Desktop Small / Tablet token tier at `1499px`;
- broad one-column collapses stay scoped to Mobile at `767px`;
- selected Tablet visual corrections remain where they are needed for hero and the What section.

Rendered QA at `768px` showed that preserving the full three-column desktop card grids all the way down to the lower Tablet boundary made cards too narrow and clipped button labels.

To fix that without turning Tablet into Mobile, a measured narrow-Tablet correction is applied inside the Tablet tier for `768px-899px`:

- card-heavy grids move to readable two-column layouts;
- metrics keep a multi-column layout but become fluid instead of fixed-width;
- button labels are allowed to wrap instead of clipping;
- Mobile remains the only one-column full-collapse tier.

This is not a new public breakpoint name. It is an internal layout correction within the named Tablet range.

## Mobile boundary

Mobile is intentionally not redesigned in this step.

Some collapse rules that previously lived in the old `1199px` block had to move to `767px` so the current phone behavior remains intact after Tablet is made less phone-like. This is preservation work, not the final Mobile pass.

## Validation plan

Before handoff:

1. Run the code gate:

```bash
npm run check
```

2. Render-check the homepage at representative widths:

- Desktop Big: `1500px+`
- Desktop Small: `1499px` and `1300px`
- Tablet: `1299px`, `1200px`, and `768px`
- Mobile smoke check: `767px` and below

3. Confirm:

- no internal comparison UI is rendered;
- Desktop Small keeps desktop navigation and desktop-grade layout structure;
- Tablet uses top navigation and no left sidebar margin;
- Tablet keeps compact desktop typography and padding tokens;
- Mobile remains the only phone-style full-collapse tier;
- no horizontal document scroll appears at the checked widths.

## Validation result

Passed on 2026-05-18.

Command gate:

```bash
npm run check
```

Result:

- TypeScript project build passed.
- Vite production build passed.

Rendered Browser QA:

- Checked widths: `1500`, `1499`, `1300`, `1299`, `900`, `899`, `768`, `767`, and `390`.
- Confirmed one `.semantic-app` render tree at all checked widths.
- Confirmed no `.comparison-stage`, `.design-reference-layer`, `.comparison-toggle`, or `.pixel-desktop` UI is rendered.
- Confirmed Desktop Big uses `72px / 72px` H1 tokens and fixed left sidebar.
- Confirmed Desktop Small uses `56px / 60px` H1 tokens and fixed left sidebar.
- Confirmed Tablet starts top navigation at `1299px`, removes left main margin, and keeps the Desktop Small / Tablet token tier.
- Confirmed narrow Tablet `768px-899px` uses readable two-column card-heavy layouts instead of clipped three-column grids.
- Confirmed Mobile starts at `767px` with Mobile typography/padding tokens and one-column collapse behavior.
- Confirmed `documentElement.scrollWidth` does not exceed `documentElement.clientWidth` at checked widths.
- Browser console warning/error log was empty during the final pass.
