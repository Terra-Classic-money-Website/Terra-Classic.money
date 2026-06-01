# About contributor StrathCole attribution

Created: 2026-06-01

## Scope

This task adds StrathCole to the `List of contributors` section on the About terra-classic.money subpage.

## Implementation Notes

- Added StrathCole to the `Service contributors, domain owners and maintainers` contributor group.
- Credited StrathCole with a short ledger line for creating the Terra Classic docs foundation expanded at `docs.terra-classic.money`.
- Kept the existing contributor ledger component and visual pattern unchanged.

## Validation

Completed validation after the shorter copy revision:

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run check` passed.
- Browser QA on `/about.html#contributors` passed:
  - page rendered non-blank
  - StrathCole contributor row count is `1`
  - rendered summary is `Created the Terra Classic docs foundation expanded at docs.terra-classic.money`
  - summary length is `78` characters
  - no link is rendered inside the contributor row
  - console issue count is `0`
