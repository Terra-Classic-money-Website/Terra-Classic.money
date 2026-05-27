# About Contributor Ledger Resource Pattern

## Scope

Reworked the `List of contributors` ledger on `about.html`.

## Implementation Notes

- Merged `Service contributors` and `Domain owners and maintainers` into `Service contributors, domain owners and maintainers`.
- Added contributor records for Dawid Skinder, Don Lunc, El Paco Lunc, Whalliam, and Vladimir POSTHUMAN.
- Rebuilt contributor rows around the existing `ecosystem-resource` row pattern instead of the previous custom contributor grid.
- Added initials avatars for entries without image avatars, using the LUNC ultra-light gray background token.
- Kept contributor record names in LUNC black while retaining muted gray summaries.
- Center-aligned contributor group headers so the title, rule, and count sit on the same visual axis.
- Set contributor group spacing and ledger-to-CTA spacing to `64px`.

## Validation

Commands run:

```bash
npm run check
```

Result: passed.

Rendered QA:
- confirmed no horizontal overflow at `1913 x 1245`
- confirmed the merged service/domain/maintainer group renders with count `5`
- confirmed the service/domain/maintainer group contains Dawid Skinder, Don Lunc, El Paco Lunc, Whalliam, and Vladimir POSTHUMAN
- confirmed initials avatars use LUNC ultra-light gray `rgb(243, 243, 243)`
- confirmed contributor names use LUNC black `rgb(16, 16, 16)`
- confirmed contributor summaries remain muted gray
- confirmed contributor group spacing and ledger-to-CTA spacing use `64px`

QA screenshot:
- `docs/audit-screenshots/about-contributors-resource-ledger-2026-05-26.png`
