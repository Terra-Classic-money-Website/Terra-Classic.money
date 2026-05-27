# About contributors intro color

Created: 2026-05-26

## Purpose

Apply the browser comment requesting the Contributors intro body paragraph to use LUNC black.

## Change

- Added `.about-contributors .about-section__text p { color: var(--color-black); }`.
- Scoped the change to the section intro so contributor ledger metadata remains governed by the existing muted text rules.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered QA:

- Desktop `1913x1245`: Contributors intro body paragraph computed to `rgb(16, 16, 16)`.
- Desktop `1913x1245`: contributor ledger metadata remained muted at `rgb(169, 169, 169)`.
