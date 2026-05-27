# Mobile body and link typography token update

Created: 2026-05-19

## Scope

This note records the updated Mobile typography values for body and link text at `767px` and below.

The owner-provided Figma reference changed only the Mobile body/link typography tokens. Heading tokens were not changed in this step.

## Change

Updated `src/styles/tokens.css` Mobile token values:

| Token | Previous | Updated |
| --- | --- | --- |
| `tc-type-body` | `15px / 23px` | `14px / 20px` |
| `tc-type-body-small` | `13px / 20px` | `12px / 16px` |
| `tc-type-body-very-small` | `11px / 15px` | `10px / 14px` |
| `tc-type-link-normal` | `13px / 16px` | `12px / 16px` |
| `tc-type-link-small` | `12px / 16px` | `10px / 14px` |
| `tc-type-link-big` | `14px / 20px` | unchanged |

Weights remain unchanged:

- Body, Body Small, Body Very Small: `600`.
- Link Normal: `500`.
- Link Small, Link Big: `600`.

Because `designsystem.html` and the public homepage both consume the shared CSS variables, the updated values apply automatically to the local design-system tool and the mobile public breakpoint.

## Validation

Rendered validation was run against the local Vite app at `http://127.0.0.1:5174/`.

Confirmed:

- The public homepage resolves all `tc-type-*` classes to the expected Mobile values at `390px`.
- `designsystem.html` shows the updated Mobile rows for Body, Body Small, Body Very Small, Link Normal, Link Small, and Link Big.
- No horizontal overflow was detected at the checked mobile width.

Final command validation:

```bash
npm run check
```

Result:

- TypeScript project build passed.
- Vite production build passed.
