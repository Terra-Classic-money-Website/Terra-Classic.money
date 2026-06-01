# About contribution guidelines link

Created: 2026-06-01

## Scope

This task links the `View contribution guidelines` button on the About terra-classic.money subpage to the actual public contribution guidelines file.

## Change

Updated `src/pages/AboutPage.tsx` so the button now points to:

```text
https://github.com/Terra-Classic-money-Website/Terra-Classic.money/blob/main/CONTRIBUTING.md
```

Previously, the button pointed to the repository `README.md`.

## Validation Plan

Relevant validation:

- TypeScript check because a TSX source file changed.
- Full project check because the About page is part of the static production build.

## Validation Results

Completed validation:

- `npm run typecheck` passed.
- `npm run check` passed.

`npm run check` completed the production build and performance budget check successfully.
