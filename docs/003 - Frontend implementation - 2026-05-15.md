# Frontend implementation

Created: 2026-05-15

## Purpose

This record documents the first production frontend implementation for `terra-classic.money`.

## Scope

- Static frontend only.
- Vite, React, TypeScript, and plain CSS custom properties.
- No backend, server functions, blockchain RPC, wallet connection, live APIs, or analytics.
- GitHub Pages deployment workflow added for `main`.

## Figma source

Canonical Figma frame:

`Home page v4 - Desktop big - 1632 exact - 1632+`

Frame node:

`1612:1342`

The URL-provided node `1612:804` is the parent canvas; metadata inspection identified `1612:1342` as the actual homepage frame.

## Implementation notes

- Figtree is loaded from Google Fonts because no licensed local font files exist in the repository.
- Repeated content lives in `src/data/content.ts`.
- External URLs live in `src/data/links.ts`.
- Missing final destinations are centralized as `TODO_REPLACE_WITH_FINAL_*` placeholders.
- Figma bitmap/SVG assets were exported into `public/assets`.
- The support-logo strip was exported from Figma as `public/assets/support-logos.png` to preserve the exact partner/logo treatment.
- Very large exported PNG assets were resized locally with `sips` to reduce the static payload.

## Interactions

- Sidebar collapse state persists in `localStorage`.
- Sidebar active state originally used `IntersectionObserver`; this was removed on 2026-05-20 when primary navigation became stable page navigation instead of homepage section navigation.
- Announcement dismissal persists in `localStorage`.
- Language selector is local UI state only.
- Video modal traps focus, closes on Escape, and closes on backdrop click.
- FAQ rows are accessible accordions with one open row at a time.

## Known fidelity notes

- Mobile/tablet layouts are responsive adaptations because only the desktop Figma frame was provided.
- FAQ answers were not present in the inspected Figma text layers. The implementation preserves accessible accordion behavior and uses explicit pending-copy placeholders instead of inventing final answers.
- Final external/community/documentation URLs are placeholders until project-owner-approved URLs are supplied.
- The current code keeps reusable page components in `src/App.tsx` and centralizes repeated content/URLs in `src/data`. Splitting every component into separate files can be done later, but was not required for the first static implementation to remain maintainable.

## Validation record

- `npm install` completed successfully.
- `npm run typecheck` completed successfully after adding Vite and Node type coverage.
- `npm run build` completed successfully.
- `npm run check` completed successfully.
- Browser QA covered sidebar collapse/expand, announcement dismissal, language selector, video modal, FAQ accordion, internal anchor navigation, missing-anchor audit, image-loading audit, one-h1 audit, and timestamped console-error audit.
