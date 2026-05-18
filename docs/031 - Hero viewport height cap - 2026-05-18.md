# Hero viewport height cap

Created: 2026-05-18

## Purpose

Adjust the homepage hero so it keeps the approved `776px` desktop composition on large screens while fitting shorter non-mobile viewports.

## Scope

- Hero height now uses `min(95vh, 776px)` outside the mobile breakpoint.
- Hero max height is capped at `776px`.
- Mobile keeps auto height so stacked mobile content is not clipped.
- Hero vertical guide lines now use `height: 100%` so they follow the actual hero height instead of staying hardcoded to `776px`.
- Hero vertical guide lines are placed at `20%`, `40%`, `60%`, and `80%` so the hero is always divided into five equal columns, matching the product section guide-line behavior.

## Expected behavior

- Large desktop remains visually unchanged at `776px`.
- Shorter desktop and tablet viewports reduce hero height to `95vh`.
- Smartphone/mobile breakpoint remains content-driven and does not use the `95vh` cap.

## Validation plan

Run:

```bash
npm run check
```

Rendered QA should verify:

- Desktop Big tall viewport keeps `776px`.
- Desktop/tablet short viewport uses `95vh`.
- Mobile remains auto-height.
- Hero guide-line positions divide the rendered hero width into five equal parts.
- No horizontal overflow.
