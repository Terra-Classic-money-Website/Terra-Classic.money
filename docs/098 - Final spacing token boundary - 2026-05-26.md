# Final Spacing Token Boundary - 2026-05-26

## Purpose

Finish the padding-token simplification.

The previous passes introduced semantic `--tc-spacing-*` tokens and migrated the safest consumers. This pass removes the old `--tc-padding-*` API from active source files entirely.

## Final Boundary

Use these layers:

- `--tc-space-*` for primitive spacing values.
- `--tc-spacing-*` for reusable layout roles and documented component-specific exceptions.

Do not add new `--tc-padding-*` tokens.

Padding is a CSS property. Spacing is the design-system concept. The code should use spacing roles rather than selector-shaped padding aliases.

## What Changed

Removed all active `--tc-padding-*` references from:

- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/designsystem.tsx`

Preserved current rendered behavior by moving remaining active values to `--tc-spacing-*` role names:

- page frame and topbar frame
- navigation chrome
- mobile announcement slot
- capabilities section/head/card exceptions
- compact lower-section families
- row surfaces
- asset cards
- capability/play CTA exceptions
- modal surface

## What This Does Not Mean

This does not mean every remaining spacing token is a reusable design rule.

Some `--tc-spacing-*` names are explicitly current-layout exceptions. They are kept in the spacing namespace so the code has one vocabulary, but new page work should still start from the semantic Paddings table and only use exception tokens when the reason matches.

## Validation Plan

Run:

- `npm run typecheck`
- `npm run check`

Rendered QA:

- homepage at Desktop Big, Desktop Small, Tablet, and Mobile
- `designsystem.html#paddings` at Desktop and Mobile
- key current subpages that consume shared spacing tokens

Check:

- zero active `--tc-padding-*` references
- no undefined spacing variables
- no console errors
- no viewport-level homepage overflow
- no local Paddings-section overflow
- no obvious visual spacing regression in checked pages

## Validation Result

Passed.

Executed:

- `git diff --check`
- `npm run typecheck`
- `npm run check`

Source checks:

- `src/styles/tokens.css`, `src/styles/global.css`, and `src/designsystem.tsx` contain zero active `--tc-padding-*` references.
- All `--tc-spacing-*` variables used by production CSS and the Paddings implementation map are defined in `src/styles/tokens.css`.

Rendered QA:

- Homepage checked at 1632px, 1400px, 1024px, and 390px widths.
- Homepage had zero viewport-level horizontal overflow at all checked widths.
- `designsystem.html#paddings` checked at 1632px and 390px widths.
- Paddings section had zero local overflow at both checked widths.
- Mobile Paddings tables stayed stacked and labeled.
- Paddings section displays semantic `--tc-spacing-*` tokens and no `--tc-padding-*` token text.
- Shared-token subpage checks passed for:
  - `about.html` at 390px
  - `ecosystem.html` at 1024px
  - `decentralization.html` at 390px
- No console warnings or errors were reported in the checked pages.

Additional all-route sweep:

- Checked all public website routes at all four design-system breakpoint bands:
  - Desktop Big: 1632px
  - Desktop Small: 1400px
  - Tablet: 1024px
  - Mobile: 390px
- Routes checked:
  - `/`
  - `/about.html`
  - `/ecosystem.html`
  - `/open-work.html`
  - `/open-work-detail.html`
  - `/roadmap.html`
  - `/markets.html`
  - `/decentralization.html`
- Total rendered route/breakpoint checks: 32.
- Failures: 0.
- For every checked route and breakpoint:
  - zero `--tc-padding-*` references found in rendered stylesheets or inline styles
  - no missing core `--tc-spacing-*` variables
  - no viewport-level horizontal overflow
  - no console warnings or errors

Known unrelated note:

- The full `designsystem.html` page still has existing wide component specimens outside the Paddings section. This pass validates the changed Paddings section locally and does not claim full-page design-system overflow cleanup.
