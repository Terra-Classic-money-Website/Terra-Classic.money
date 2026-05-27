# Desktop pixel lock

Created: 2026-05-15

## Purpose

This record documents the first corrective implementation pass after visual QA showed that the React component version was only a directional scaffold.

## What changed in this pass

- Added `public/assets/home-figma-desktop-1632.png`, copied from the project-owner-provided 1632 x 17168 Figma export.
- Added a desktop-only `PixelDesktop` renderer for viewports `1500px` and wider.
- The desktop renderer displays the exact 1632px Figma frame at native pixel size.
- Added transparent desktop hotspot links for the main navigation and primary section actions.
- Preserved the previous React section implementation as the tablet/mobile fallback below `1500px`.
- Added visually hidden semantic headings/copy behind the pixel desktop layer so the page still exposes meaningful document structure.

## Why this approach

Pixel-perfect desktop fidelity cannot be reached by lightly tweaking the scaffold. The immediate priority is to stop the desktop target from drifting from Figma.

This is a deliberate baseline step, not the final ideal architecture. The next passes should replace the desktop raster layer section by section with:

- exact exported Figma sub-assets,
- real text,
- exact component variants,
- exact hover/interaction states,
- exact section geometry.

## Validation

- Browser viewport set to 1632px.
- Desktop screenshot captured to `docs/audit-screenshots/pixel-lock-home-1632.png`.
- Captured screenshot dimensions: `1632 x 17168`.
- Rendered desktop image bounding box: x `0`, y `0`, width `1632`, height `17168`.
- No browser console errors observed during the pixel-lock check.

## Known trade-off

The desktop visual is currently raster-backed. This achieves immediate visual parity, but it is not the final semantic/component implementation target. Treat it as a lock layer for visual QA while rebuilding real components underneath or section by section.

## Superseded note

This monolithic raster asset was superseded by the next section-based desktop renderer documented in `006 - Section based desktop render - 2026-05-15.md`. The section renderer keeps the same visual target while making each Figma section individually auditable and replaceable.
