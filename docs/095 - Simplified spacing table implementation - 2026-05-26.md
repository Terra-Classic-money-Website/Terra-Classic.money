# Simplified spacing table implementation

Creation date: 2026-05-26

## Scope

Implemented the simplified Paddings section concept in `designsystem.html` through `src/designsystem.tsx` and `src/styles/designsystem.css`.

This is a design-system documentation refactor only. It does not change production spacing tokens, homepage layout, subpage layout, routing, content data, or GitHub Pages deployment behavior.

## Implementation

The old Paddings section showed many selector-specific padding tokens as repeated visual samples. That made the page long and encouraged agents to copy exact element values instead of understanding the repeatable rhythm.

The new Paddings section is organized around:

- a core section-boundary rule for major white sections and formal dividers;
- one semantic spacing table with four breakpoint columns: Desktop Big, Desktop Small, Tablet, and Mobile;
- major usage places that explain where each semantic role applies;
- current exceptions that exist in code but should not become general spacing rules;
- an implementation map that connects semantic roles to the current token and selector families.

## Design decision

The section now teaches spacing by role first and implementation detail second.

This is better for human readers because it reduces the decision surface. It is also better for AI agents because it separates the durable layout rule from the current selector inventory, making future subpage work less likely to drift into one-off spacing values.

## Breakpoint model

The Paddings section now separates:

- Desktop Big: `1500px+`
- Desktop Small: `1300-1499px`
- Tablet: `768-1299px`
- Mobile: `767px and below`

Desktop Small and Tablet currently share many implementation tokens, but they are documented as separate columns because they are separate design decisions and may diverge later.

## Validation plan

For this docs and design-system UI change:

- run TypeScript validation;
- run the project check script;
- open `designsystem.html#paddings` locally;
- inspect desktop, tablet, and mobile viewport behavior;
- confirm the main production page still builds through the normal project gate.

## Validation result

Completed on 2026-05-26.

- `npm run typecheck` passed.
- `npm run check` passed, including the production Vite build.
- Local Vite served `designsystem.html#paddings` at `http://127.0.0.1:5174/designsystem.html#paddings`.
- Browser validation passed at Desktop Big `1632x1000`, Desktop Small `1400x900`, Tablet `1024x900`, and Mobile `390x844`.
- The semantic spacing table rendered 13 rows with separate Desktop Big, Desktop Small, Tablet, and Mobile columns.
- The Paddings section rendered 7 major-place cards, 6 exception rows, and 8 implementation-map rows.
- Browser console warnings/errors were clean during validation.
- Page-level horizontal overflow was not present; on narrow viewports, the spacing table scrolls inside its own wrapper.
