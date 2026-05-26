# About Contributor Section Browser Comment Fixes

## Scope

Addressed three browser comments in the `List of contributors` section on `about.html`.

## Implementation Notes

- Removed the helper description from the `Service contributors` group.
- Removed the helper description from the `Domain owners and maintainers` group.
- Removed the helper description from the `Translations` group.
- Changed the `Suggest a correction` CTA to use the dark pill-button variant.
- Kept contributor CTA hover behavior aligned with the shared dark pill-button pattern: gray background with black text on hover/focus.

## Validation

Commands run:

```bash
npm run check
```

Result: passed.

Rendered QA:
- confirmed the Donors and sponsors, Translations, Service contributors, and Domain owners and maintainers group descriptions do not render
- confirmed `Suggest a correction` renders as a dark pill button by default
- confirmed mouse hover changes contributor CTA buttons to the shared gray background with black text
- confirmed no horizontal overflow at `1913 x 1245`
