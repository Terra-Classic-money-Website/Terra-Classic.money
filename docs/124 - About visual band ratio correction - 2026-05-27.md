# About visual band ratio correction

Created: 2026-05-27

## Scope

Fix the squeezed About page visual-band artwork introduced by the responsive image optimization pass.

## Cause

The About visual bands originally relied on normal image intrinsic sizing: fixed rendered height plus `width: auto`.

After the optimization pass, the visual-band image classes moved onto the generated responsive `<picture>` wrapper. Unlike an `<img>`, `<picture>` does not derive its layout width from the selected image's natural dimensions, so the foreground artwork rendered too narrow while keeping the intended height.

The live `about.html` measurement before the fix showed the contribute foreground asset loading at natural `947 x 303`, but rendering at `575 x 303`.

## Fix

Added explicit `aspect-ratio` values to the About visual-band responsive image wrappers:

- open-source band: `801 / 384`
- contribute band: `947 / 303`

This preserves the responsive image wrapper and reveal behavior while restoring the intended image proportions.

## Validation

Completed rendered checks against the local Vite server at `http://127.0.0.1:5173/about.html`:

- Desktop Big `1632 x 1000`: contribute foreground rendered `947 x 303`, ratio `3.1254`, with no horizontal document overflow.
- Desktop Big `1632 x 1000`: open-source foreground rendered `801 x 384`, ratio `2.0859`, with no horizontal document overflow.
- Desktop Small `1453 x 900`: contribute foreground rendered `947 x 303`, ratio `3.1254`, matching the asset's natural ratio.
- Tablet `1024 x 900`: contribute foreground kept ratio `3.1254`, with no horizontal document overflow.
- Mobile `390 x 844`: contribute foreground kept ratio `3.1254`, with no horizontal document overflow.
- Browser warning/error logs were empty during the rendered checks.

Command validation:

```bash
npm run check
```

Result: passed.
