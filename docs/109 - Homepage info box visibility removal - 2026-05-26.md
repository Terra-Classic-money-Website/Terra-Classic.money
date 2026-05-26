# Homepage info box visibility removal

Created: 2026-05-26

## Scope

Hide the ClassicGathering info box from the live website for now.

## Context

The site is in refinement and performance-hardening phase after the initial homepage and subpage implementation. The ClassicGathering announcement was no longer needed on the homepage, and keeping it visible would add a dated campaign-style surface above the canonical hero.

## Implementation

- Removed the live announcement mount from the homepage render path.
- Removed the mobile announcement slot usage from the shared app shell so the same info box does not remain visible on mobile routes.
- Removed the now-unused production `AnnouncementBar` component from `src/App.tsx`.
- Kept the design-system announcement example and shared styles intact because `designsystem.html` remains the source of truth for reusable UI patterns.

## Validation Plan

- Run `npm run typecheck`.
- Run `npm run build`.
- Use the existing script-based validation model; there are no unit, e2e, or test-runner configs in the repo.
