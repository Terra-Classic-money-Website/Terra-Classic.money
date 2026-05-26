# About Contributor Donor Description Removal

## Scope

Removed the `Financial support for website maintenance or development.` helper line from the `Donors and sponsors` group in the `List of contributors` section on `about.html`.

## Implementation Notes

- Cleared only the Donors and sponsors group description.
- Updated the contributor group renderer to skip empty descriptions so no blank text node or empty paragraph remains.
- Left the other contributor group descriptions unchanged.

## Validation

Commands run:

```bash
npm run check
```

Result: passed.
