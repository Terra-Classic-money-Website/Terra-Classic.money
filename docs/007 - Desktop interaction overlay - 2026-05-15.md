# Desktop interaction overlay

Created: 2026-05-15

## Purpose

This pass adds real interaction targets over the section-based desktop Figma render while preserving pixel-locked visual fidelity.

## What changed

- Added transparent desktop hotspots for:
  - primary sidebar anchors,
  - sidebar external links,
  - hero user/developer/institution CTA rows,
  - protocol CTAs,
  - back-to-top footer action.
- The desktop Figma info box is always visible during QA. The close/dismiss control is intentionally disabled for now so the announcement cannot be hidden while visual comparison work is in progress.
- The semantic implementation announcement now also ignores the old `tcm-announcement-dismissed` browser storage value and has no close button. This keeps the implementation view aligned with the current QA requirement.
- Added a real desktop video explainer button over the Figma video pill area.
- Reused the existing accessible `VideoModal` component for the desktop pixel layer.
- Added a fixed internal comparison toggle in the bottom-left corner. It is visually a tiny switch with no label text, but keeps an accessible label for keyboard and assistive-technology use.

## Validation

- Browser viewport: `1632 x 1000`.
- Pixel hotspot count after dismissal: `19`.
- Video modal button count: `1`.
- Video modal opened successfully.
- Video modal closed successfully.
- `#roadmap` anchor resolved correctly.
- Console errors: `0`.

## Known trade-off

The desktop visual layer is still raster-backed. The interaction layer makes the page behave more like a real site while the next implementation passes rebuild each section as semantic HTML/CSS/components against the Figma section exports.

Earlier QA had already dismissed the announcement in browser storage. That persistence path has now been removed, so stale localStorage cannot hide the announcement in either the implementation view or the desktop reference layer.
