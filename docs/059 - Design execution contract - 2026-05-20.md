# Design execution contract

Created: 2026-05-20

## Scope

Implemented the recommendation from `docs/057 - Design documentation recommendation - 2026-05-20.md`.

The task was documentation and process enforcement only. It did not change site UI, CSS, components, breakpoints, routing, build configuration, or runtime behavior.

## Changes

- Added root-level `DESIGN.md` as the written design execution contract for future page and subpage work.
- Kept `designsystem.html` as the live visual, token, component, breakpoint, padding, typography, color, state, and interaction source of truth.
- Updated `AGENTS.md` onboarding order so future agents are explicitly required to read `DESIGN.md`, `designsystem.html`, the homepage implementation, and supplied wireframes before front-end or subpage implementation.
- Clarified the split between `DESIGN.md`, `designsystem.html`, homepage implementation, page-specific wireframes, and `AGENTS.md`.
- Added design-system governance rules requiring new reusable page, section, component, motion, or responsive patterns to be represented in `designsystem.html` in the same task.

## Validation

No build, lint, type-check, or browser QA was run because this was a docs-only change.

This follows the repo rule that docs-only changes may skip checks unless explicitly requested.
