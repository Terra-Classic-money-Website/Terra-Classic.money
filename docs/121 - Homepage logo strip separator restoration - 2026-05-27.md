# Homepage logo strip separator restoration

Created: 2026-05-27

## Scope

Restored the separator line below the homepage support-logo strip.

## Cause

The performance pass kept the existing `.logo-strip::after` separator rule, but added `content-visibility: auto` to `.logo-strip`.

`content-visibility` creates paint containment. Because the separator is intentionally positioned just outside the strip with `bottom: -8px`, the separator was clipped even though the CSS rule still existed.

## Fix

Removed `.logo-strip` from the homepage render-containment selector in `src/styles/pages/home.css`.

The logo strip is a small near-top section, so excluding it from containment is the right trade-off: it restores the original visual separator without affecting the image optimization pipeline, route splitting, CSS splitting, or production performance budgets.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered production preview check:

- URL: `http://127.0.0.1:4175/`
- Viewport: `1632 x 1200`
- `.logo-strip` computed `content-visibility`: `visible`
- `.logo-strip::after` computed height: `1px`
- `.logo-strip::after` computed bottom: `-8px`
- Pixel scan confirmed a horizontal grey separator row below the logo strip.
- Console warnings/errors: none.
