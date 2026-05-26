# About Support Section Correction

## Scope

Corrected the `Support the public information layer` section on `about.html` against the Figma node `1811:789`.

This pass was intentionally scoped to the two issues called out for this section:
- the `Support does not buy influence` right-side boundary list
- the two commercial/support boxes below the section intro

No `designsystem.html` changes were made.

## Implementation Notes

- Replaced the text `x` marker in the boundary list with a CSS-built five-dot mark matching the Figma 14px icon.
- Corrected the boundary list title to the Figma `20px / 24px` hierarchy.
- Corrected boundary list rows to `14px / 16px`, black text, 16px icon/text gap, and Figma-style separators between rows.
- Updated the two support boxes to use `32px / 40px` headings and `16px / 24px` black body copy instead of the smaller muted typography.
- Tightened the boundary list row rhythm after rendered comparison so row top offsets match the Figma `45px` rhythm instead of the previous over-spaced implementation.
- Grouped each support-box heading and paragraph into a dedicated copy block so the internal headline-to-body spacing stays at `16px` instead of being stretched by the card's vertical distribution.

## Validation

Commands run:

```bash
npm run check
```

Result: passed.

Rendered QA:
- `about.html` support section checked at desktop `1632 x 1100`
- `about.html` support section checked at mobile `390 x 1100`
- confirmed no horizontal overflow at both checked widths
- confirmed requested Figma typography metrics in the rendered desktop DOM
- confirmed boundary row top offsets render at `45px`
- confirmed support-box headline-to-body spacing renders at `16px` on desktop and mobile

QA screenshots:
- `docs/audit-screenshots/about-support-section-desktop-2026-05-26.png`
- `docs/audit-screenshots/about-support-section-mobile-2026-05-26.png`
