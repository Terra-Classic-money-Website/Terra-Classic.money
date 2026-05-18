# Desktop Big decentralization stats spacing correction

Created: 2026-05-18

## Purpose

This document records the Desktop Big correction for the `Efficiency driven by decentralization` stats panel.

## Problem

At narrow Desktop Big widths, especially around `1542px-1548px`, the panel headline could be clipped on the right because the stats headline inherited a forced one-line rule while the panel used `overflow: hidden`.

Once the headline was allowed to wrap, the planet artwork still used the original single-line copy height. That broke the intended `40px` spacing between the text block and the planet layer.

## Implemented fix

The stats panel now keeps these rules:

- the stats headline may wrap when the available content width requires it;
- the stats copy and bottom content respect the panel padding instead of using a width that can extend into the clipped area;
- the planet layer remains positioned by `--stats-copy-block-height + 40px`;
- Desktop Big uses breakpoint-specific copy-height values so the measured text-to-planet gap stays at `40px` across the headline/paragraph wrap thresholds.

## Validation result

Rendered Browser QA checked Desktop Big widths `1500`, `1542`, `1543`, `1544`, `1548`, `1680`, `1686`, `1687`, and `1920`.

Result:

- headline and paragraph stay inside the right padded content edge;
- headline no longer clips at narrow Desktop Big widths;
- text-to-planet gap measures `40px` at all checked Desktop Big thresholds.

Final command gate:

```bash
npm run check
```
