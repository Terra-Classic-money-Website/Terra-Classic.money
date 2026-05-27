# FAQ answer content update

Created: 2026-05-21

## Scope

Replaced the homepage and reused lower-page FAQ placeholder answer copy with the project-owner-provided final FAQ answers.

## Implementation Notes

- Converted `faqGroups` from grouped question strings into typed grouped FAQ objects with `question` and `answer` fields.
- Updated the FAQ accordion renderer to read answers directly from `src/data/content.ts`.
- Removed the "pending final editorial approval" placeholder from the runtime FAQ experience.
- Kept the existing accessible accordion behavior: one open answer at a time, `aria-expanded`, and `aria-controls`.
- Hardened FAQ row layout so longer institutional and developer questions can wrap without being constrained to a fixed `24px` button height.
- Converted the FAQ section's desktop fixed height into a matching `min-height` so the closed-state rhythm remains intact while expanded answers can push the footer down safely.
- Synced the FAQ link wrapping behavior back into `src/styles/designsystem.css` so the local design-system reference matches production.

## Validation Plan

- Run `npm run check` for the project gate.
- Perform rendered FAQ QA on desktop and mobile breakpoints to verify answer expansion, wrapping, and absence of horizontal overflow.

## Validation Results

- `npm run check` passed.
- Browser QA at `1632 x 1200` opened the longest institutional FAQ question:
  - exactly one FAQ answer expanded
  - no horizontal overflow
  - long question wrapped to `48px`
  - expanded answer rendered at `96px`
  - FAQ section grew from its `1825px` minimum to `1896px`
  - footer remained after the FAQ section
- Browser QA at `390 x 900` opened the same long FAQ question:
  - exactly one FAQ answer expanded
  - no horizontal overflow
  - long question wrapped to `60px`
  - expanded answer rendered at `112px`
  - footer remained after the FAQ section

## QA Screenshots

- `docs/audit-screenshots/faq-answer-desktop-2026-05-21.png`
- `docs/audit-screenshots/faq-answer-mobile-2026-05-21.png`
