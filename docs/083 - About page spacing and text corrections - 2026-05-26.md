# About page spacing and text corrections

Created: 2026-05-26

## Purpose

Apply browser annotations on the About terra-classic.money page for text measure, paragraph color, and action spacing.

## Changes

- Set the Open Source section body text container to `960px` max width.
- Set Contribute section body copy to LUNC black.
- Set Support section body copy to LUNC black.
- Set Contribute cards-to-buttons spacing to `64px`.
- Set Support boxes-to-buttons spacing to `64px`.

## Responsive Decision

The width change is a max-width, not a fixed width, so it preserves smaller viewport behavior. The button spacing changes apply to the base desktop style while existing mobile overrides keep compact phone spacing.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered QA:

- Desktop `1913x1245`: Open Source text container max-width computed to `960px`; rendered width measured `960px`.
- Desktop `1913x1245`: Contribute body paragraph color computed to `rgb(16, 16, 16)`.
- Desktop `1913x1245`: Support body paragraph color computed to `rgb(16, 16, 16)`.
- Desktop `1913x1245`: Contribute grid-to-actions gap measured `64px`.
- Desktop `1913x1245`: Support boxes-to-actions gap measured `64px`.
- Mobile `375x812`: Open Source text rendered within available width; Contribute and Support action spacing remained `24px`.
