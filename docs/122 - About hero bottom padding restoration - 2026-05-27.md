# About hero bottom padding restoration

Created: 2026-05-27

## Scope

Restored the About page hero CTA bottom spacing after the performance CSS split.

## Cause

The About hero reuses the shared `stats-bottom` class. Before CSS splitting, the broader decentralization/stat hero overrides were present globally and neutralized the shared `height: 232px`.

After per-page CSS splitting, the About page no longer imports `decentralization.css`, so the shared `.stats-bottom { height: 232px; }` from `visual-panels.css` started applying to the About hero CTA row again. That pushed the CTA content to the top of a 232px bottom row.

The remaining visible gap came from a second CSS-split regression: the About hero reuses the shared `.protocol-lines` decorative grid layer, but that base rule lived only in `home.css`. On the About entry, `.protocol-lines` therefore became a normal grid child instead of an absolutely positioned overlay, creating an invisible fourth grid row and an extra row gap below the CTA row.

## Fix

Changed the About-specific override from:

```css
.about-hero__bottom { height: auto; ... }
```

to:

```css
.stats-bottom.about-hero__bottom { height: auto; ... }
```

The higher specificity makes the About override robust against Vite CSS chunk ordering while keeping the shared stats panel behavior unchanged elsewhere.

Moved the shared `.protocol-lines` base rule from `home.css` into `visual-panels.css`, which is imported by both the Home and About page entries. That restores the line layer as an absolute overlay on About and prevents it from creating an implicit grid row.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered production preview check:

- URL: `http://127.0.0.1:4177/about.html`
- Viewport: `1874 x 1218`
- `.about-hero__bottom` computed height: `56px`
- `.about-hero__lines` computed position: `absolute`
- About hero grid rows: `312px 581.094px 56px`
- About hero bottom padding: `64px`
- CTA bottom to hero bottom gap: `64px`
- Console warnings/errors: none.
