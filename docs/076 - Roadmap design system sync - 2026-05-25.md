# Roadmap design system sync

Created: 2026-05-25

## Scope

Updated the internal `designsystem.html` Roadmap timeline specimen so it mirrors the current production roadmap subpage instead of showing a cropped three-row sample.

## Implementation

- Reused the full `src/data/roadmap.ts` timeline data in the design-system specimen.
- Added the same public and project-submitted group bands used by the roadmap subpage.
- Added the same roadmap status labels, paid-entry labels, milestone stacking, sticky axis scroll sync, and mobile project tooltip behavior.
- Expanded the specimen surface so the roadmap board uses the full available design-system stage width and renders the full board height.

## Validation

- `npm run typecheck` passed.
- `npm run build` passed.
- Browser QA on `http://127.0.0.1:5174/designsystem.html#components` confirmed:
  - page title: `Terra Classic Internal Design System`
  - no browser console warnings or errors
  - Roadmap timeline specimen contains 8 rows
  - Roadmap timeline specimen contains 2 roadmap group bands
  - Roadmap timeline specimen contains 18 paid-entry labels
  - desktop board height matches the roadmap subpage board height at 1430px
  - desktop board uses the available design-system stage width
  - project avatar tooltip interaction opens correctly

## Notes

The production roadmap subpage was not changed. This task only synchronized the local design-system representation with the current roadmap implementation and data.
