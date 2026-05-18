# Community forum label and founder card height correction

Created: 2026-05-18

## Purpose

This document records two small responsive UI corrections:

- rename the Agora/community forum button;
- fix founder story cards when project or role metadata wraps to two lines.

## Implemented fix

The community button label now reads `Official Terra Classic forum` from the React source, so the change applies across all breakpoints.

Founder story cards now use a shared minimum grid/card height instead of a fixed height. The copy block is auto-height but keeps the same media-card inset on all sides, so a two-line project/role label no longer forces uneven card heights or inconsistent internal padding. The CSS grid keeps all cards in the row at the same height.

## Validation result

Rendered Browser QA checked widths `1548`, `1920`, `1499`, `1299`, and `768`.

Result:

- forum label renders as `Official Terra Classic forum`;
- founder cards stay equal height in each checked layout;
- wrapped founder role labels keep the same internal bottom padding as the left/right card inset.

Final command gate:

```bash
npm run check
```
