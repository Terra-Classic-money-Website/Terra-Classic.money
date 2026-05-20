# Design documentation recommendation

Created: 2026-05-20

## Context

The Terra Classic homepage is nearly ready, and the next project phase will involve designing and implementing subpages from owner-provided wireframes, the homepage, and `designsystem.html`.

The key question is whether `designsystem.html` alone is enough to preserve design quality and consistency across future subpages, or whether the repo should also include a `DESIGN.md` file.

## Recommendation

Create a root-level `DESIGN.md`, but keep it concise.

`designsystem.html` should remain the live visual, token, component, breakpoint, padding, typography, color, and interaction source of truth.

`DESIGN.md` should not duplicate every token or component value from `designsystem.html`, because that would create drift. Instead, it should act as the design execution contract for future Codex agents.

## Recommended split of responsibility

### `designsystem.html`

Use as the visual and implementation source of truth for:

- typography
- colors
- padding tokens
- component states
- motion and hover behavior
- responsive breakpoint behavior
- examples of reusable UI patterns
- visual QA against the homepage implementation

### `DESIGN.md`

Use as the design judgment and execution guide for:

- how subpages should extend the homepage design language
- page composition principles
- density and rhythm expectations
- reusable section patterns
- do/don't design rules
- content hierarchy principles
- mobile/tablet/desktop design expectations
- when new patterns must be added back into `designsystem.html`
- rendered QA requirements for new subpages

### `AGENTS.md`

Update `AGENTS.md` so future agents are explicitly required to read:

- the original brief
- the current roadmap, if present
- relevant knowledge sources
- `DESIGN.md`
- `designsystem.html`
- the homepage implementation
- the supplied wireframe
- validation and runbook docs

This matters because Codex automatically loads `AGENTS.md` files as project instructions, but a plain `DESIGN.md` is not automatically treated as an instruction source unless `AGENTS.md` tells agents to read it or Codex fallback filenames are configured.

## Why `designsystem.html` alone is not enough

`designsystem.html` can preserve visual consistency, but it cannot fully encode product judgment.

Without a written design contract, future agents may technically reuse tokens while still producing weak subpage design, for example:

- isolated landing-page-like layouts
- inconsistent narrative hierarchy
- over-decorated sections
- generic cards that do not match the homepage density
- duplicated one-off components
- mobile/tablet behavior that technically works but feels disconnected
- new visual patterns that are not reflected back into the design system

The project needs both:

- a live implementation reference: `designsystem.html`
- a written design decision layer: `DESIGN.md`

## Recommended `DESIGN.md` principles

`DESIGN.md` should include rules such as:

- Subpages must feel like extensions of the homepage, not isolated campaign pages.
- Reuse existing typography, padding, color, component, and motion tokens.
- Do not invent new decorative styles unless they are deliberately added to `designsystem.html`.
- New reusable subpage components must be reflected in `designsystem.html`.
- Layout rhythm should preserve the current homepage density, restraint, and serious public-good tone.
- Mobile and tablet behavior must be checked against the existing breakpoint model.
- Motion must preserve layout stability.
- No visible instructional copy should be added to explain the interface unless the content itself requires it.
- Rendered QA is required for every new subpage at representative desktop, tablet, and mobile widths.

## Suggested next step

Create `DESIGN.md` in the project root, then update `AGENTS.md` to make it part of the required pre-implementation reading order for subpage design and implementation tasks.
