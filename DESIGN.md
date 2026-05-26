# Terra Classic Website Design Contract

Created: 2026-05-20

## Purpose

`DESIGN.md` is the written design execution contract for future Terra Classic Website page and subpage work.

It does not replace `designsystem.html`. The design system remains the live visual and implementation source of truth for tokens, component states, motion, breakpoints, and reusable UI examples. This file defines how agents should use that system with judgment so new pages do not drift into isolated campaign pages or generic layouts.

## Source Of Truth Split

- `designsystem.html`: live visual source of truth for typography, color, semantic spacing rules and tokens, components, states, motion, hover behavior, breakpoint behavior, and reusable UI examples.
- `DESIGN.md`: written execution contract for page composition, hierarchy, density, rhythm, responsive expectations, pattern governance, and rendered QA.
- Homepage implementation: canonical example of how the design system currently behaves in production code.
- Supplied wireframes: page-specific structure and intent. They must be translated through the existing homepage language and design system.
- `AGENTS.md`: onboarding and enforcement layer that tells future agents to read these sources before implementation.

## Product And Brand Direction

The site should feel like independent, community-maintained public infrastructure for Terra Classic.

Design decisions should support credibility, clarity, and usefulness. Avoid hype, decorative excess, inflated marketing claims, and visual behavior that makes the project feel like a temporary campaign page. The tone should stay serious, source-aware, open-source friendly, and suitable for an ecosystem website that needs trust from both community users and external observers.

## Subpage Design Rules

- Subpages must feel like extensions of the homepage, not isolated landing pages.
- Start from the supplied wireframe, then map its sections to existing homepage and design-system patterns before inventing new ones.
- Preserve the homepage's restrained density, rhythm, and public-good tone.
- Do not add decorative styles, visual motifs, or card systems that are not already represented in the design system unless the same task adds them back to `designsystem.html`.
- Do not use visible instructional copy to explain the interface unless the content itself requires it.
- Do not turn informational subpages into marketing hero pages unless the roadmap or wireframe explicitly calls for that treatment.
- Prefer reusable section patterns over one-off page-local compositions.
- Keep content hierarchy practical: users should understand what the page is, why it matters, what is current, and what action or deeper reading is available.

## Component And Token Rules

- Reuse existing typography, spacing, color, component, state, and motion tokens from `designsystem.html` and the shared CSS/token files.
- Use the semantic spacing system from `designsystem.html` and the shared CSS tokens before introducing page-local padding, gap, or margin values.
- New reusable subpage components must be reflected in `designsystem.html`.
- Avoid one-off padding, typography, breakpoint, color, or motion values unless there is a clear product reason and the decision is documented.
- Interactive states must include deliberate motion matching the design system's quality level.
- Motion must preserve layout stability. Hover, focus, open, close, and icon-swap states must not cause unintended jumps, shifts, or resizing.
- `DESIGN.md` must not duplicate token tables. Exact values belong in `designsystem.html` and the shared CSS/token files to avoid drift.

## Responsive Rules

Use the existing breakpoint model unless the task explicitly asks to change it and the change is documented:

- Desktop Big: 1500px and up
- Desktop Small: 1300-1499px
- Tablet: 768-1299px
- Mobile: 767px and below

Subpage work must check representative Desktop Big, Desktop Small, Tablet, and Mobile widths. Mobile and tablet layouts should feel intentionally composed, not merely squeezed versions of desktop sections.

## Subpage Workflow

1. Read `AGENTS.md`, the original brief, current roadmap, relevant knowledge sources, `DESIGN.md`, `designsystem.html`, the homepage implementation, and the supplied wireframe.
2. Identify which homepage or design-system patterns already fit the wireframe.
3. Identify any genuinely new reusable pattern before coding.
4. Implement using shared components, styles, and tokens where available.
5. Update `designsystem.html` in the same task when a reusable pattern, state, motion behavior, or responsive behavior is introduced or changed.
6. Validate with the relevant project checks and rendered visual QA for the affected breakpoints.
7. Document meaningful implementation decisions, validation, and design-system changes in `docs`.

## Quality Bar

A subpage is not ready if it only "uses the right colors." It must also preserve the site's hierarchy, rhythm, density, responsive behavior, motion quality, and trust posture.

Before handoff, confirm:

- The page fits the roadmap and original product concept.
- The wireframe intent is preserved.
- The page extends homepage and design-system language.
- New reusable patterns are represented in `designsystem.html`.
- Desktop, tablet, and mobile render cleanly without overlapping text, broken rhythm, or layout-shifting interactions.
- The relevant checks were run, or the task was docs-only and checks were explicitly skipped.
