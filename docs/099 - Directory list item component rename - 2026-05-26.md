# Directory List Item Component Rename

Created: 2026-05-26

## Scope

Renamed the reusable row component previously labeled `Ecosystem resource` to `Directory list item`.

This better reflects the current usage across:

- Ecosystem project, app, tool, and resource lists.
- Markets and exchange/resource lists.
- About page contributor and maintainer lists.
- Static, linked, and status-based directory rows.

## Implementation Notes

- Updated the local design-system component label in `src/designsystem.tsx`.
- Renamed the design-system specimen from `EcosystemResourcePreview` to `DirectoryListItemPreview`.
- Renamed the shared production row component in `src/App.tsx` from `EcosystemResourceCard` to `DirectoryListItem`.
- Renamed shared CSS selectors from `.ecosystem-resource*` to `.directory-list-item*`.
- Kept page-level names such as `EcosystemDirectory` intact because those still describe a specific page/domain, not the reusable row component.

No visual behavior or layout change is intended in this pass.

## Validation Plan

- Run `npm run check` to verify TypeScript and production build safety.
- Confirm no old `ecosystem-resource` selectors remain in the active source files.

## Validation Results

- `npm run check` passed.
- Source search confirmed the active source files no longer contain `Ecosystem resource`, `EcosystemResource`, or `ecosystem-resource`.
- Local browser sanity check passed at `http://127.0.0.1:5174/` for:
  - `designsystem.html#components`
  - `ecosystem.html`
  - `markets.html`
  - `about.html#contributors`
- Checked pages rendered `.directory-list-item` rows, rendered zero `.ecosystem-resource` rows, and showed no page-level horizontal overflow in the checked viewport.
