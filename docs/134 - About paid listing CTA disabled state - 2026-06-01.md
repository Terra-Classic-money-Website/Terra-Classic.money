# About paid listing CTA disabled state

Created: 2026-06-01

## Scope

This task disables the `Paid listing packages` CTA on the About terra-classic.money subpage.

## Implementation Notes

- Added a shared `DisabledLinkButton` component that renders as a semantic non-link element with `aria-disabled="true"`.
- Replaced the About page `Paid listing packages` link with the disabled button variant.
- Disabled pill buttons now keep their base dark surface, do not hover, do not link, and reduce text/icon opacity so the inactive state is clear.

## Validation

Completed validation:

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run check` passed.
- Browser QA on `/about.html` passed:
  - page rendered non-blank
  - `Paid listing packages` anchor count is `0`
  - disabled CTA count is `1`
  - disabled CTA is visible
  - console issue count is `0`
