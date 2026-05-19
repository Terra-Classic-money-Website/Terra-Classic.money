# Mobile typography breakpoint correction

Created: 2026-05-19

## Scope

This note records the mobile typography correction for `767px` and below.

The task was to verify that homepage text elements using the design-system typography classes resolve to the Mobile scale documented in `designsystem.html`.

## Findings

The shared token layer was already correct: the `max-width: 767px` token map switched H1, H2, H3, H4, H5, body, small body, very small body, and link styles to their Mobile values.

The rendered homepage still had component-level CSS overrides inside the mobile breakpoint that bypassed those tokens for several elements:

- LUNC native asset label text using `tc-type-h2` / `tc-type-body`.
- Support strip and footer copy using `tc-type-body-very-small`.
- Mobile hero, protocol, and stats supporting copy using `tc-type-h4`.
- Protocol step headings and descriptions using `tc-type-h5` / `tc-type-body-small`.

## Change

The fix is scoped to the existing `max-width: 767px` block in `src/styles/global.css`.

Mobile component overrides now defer back to the shared design-system variables instead of hard-coded font values. Where earlier desktop/tablet styling intentionally used different weights, the mobile breakpoint now restores the matching design-system token weights without changing wider breakpoints.

## Validation

Rendered validation was run against the local Vite app at `http://127.0.0.1:5174/`.

Checked mobile widths:

- `390px`
- `767px`

Confirmed:

- `tc-type-h1`: `40px / 44px`, weight `600`.
- `tc-type-h2`: `36px / 40px`, weight `600`.
- `tc-type-h3`: `24px / 32px`, weight `600`.
- `tc-type-h4`: `18px / 26px`, weight `600`.
- `tc-type-h5`: `16px / 22px`, weight `600`.
- `tc-type-body`: `15px / 23px`, weight `600`.
- `tc-type-body-small`: `13px / 20px`, weight `600`.
- `tc-type-body-very-small`: `11px / 15px`, weight `600`.
- `tc-type-link-normal`: `13px / 16px`, weight `500`.
- `tc-type-link-small`: `12px / 16px`, weight `600`.
- `tc-type-link-big`: `14px / 20px`, weight `600`.

No horizontal overflow was detected in the checked mobile widths.

Final command validation:

```bash
npm run check
```

Result:

- TypeScript project build passed.
- Vite production build passed.
