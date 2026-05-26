# Simplified semantic spacing table concept

Created: 2026-05-26

## Purpose

This document records the preferred concept for simplifying the `designsystem.html` Paddings / Spacing section.

The goal is to make spacing guidance useful for both humans and AI agents. The current design-system padding section exposes too many implementation-specific rows, which makes it harder to understand the repeatable spacing logic behind the Terra Classic Website.

The new direction should make the section answer one practical question:

If a layout uses a spacing role on Desktop Big, what should that same role become on Desktop Small, Tablet, and Mobile?

## Decision

Use a compact semantic spacing table as the primary design-system interface.

Do not lead with a long list of CSS variables, selectors, or exact padding declarations for every site element.

The design system should first explain the repeatable spacing roles. Implementation mappings can remain available below the table, but they should be secondary.

## Why this is better than the broader taxonomy plan

The previous plan in `093 - Padding design system improvement plan - 2026-05-26.md` is technically safer because it preserves more implementation detail. However, it is still too close to a CSS audit. It would improve the current section, but it would not fully solve the usability problem.

The simplified semantic table is better because:

- humans can scan it quickly;
- AI agents get clear breakpoint translation rules;
- future subpages can preserve the homepage rhythm without copying page-specific CSS;
- the design system becomes a decision surface, not just a catalog;
- the section can stay short enough to be useful during real work.

The risk is oversimplification. A raw value-conversion table like `120px -> 96px -> 96px -> 48px` is not enough because the same desktop value can play different roles. For example, `64px` can mean a dark-panel inset, a side gutter, an internal editorial gap, or a lower-section closure. Those do not always compress in exactly the same way.

Therefore, the table must be semantic, not purely numeric.

## Core concept

Replace the current long padding list with:

1. A short explanation of the spacing model.
2. A semantic breakpoint translation table.
3. A section-rhythm rules block.
4. A compact list of major places where each spacing role applies.
5. A small exceptions block for values that exist in the code but should not be copied casually.
6. Optional implementation mapping for agents and developers.

## Breakpoint columns

Use four separate columns:

| Breakpoint | Width | Layout meaning |
| --- | --- | --- |
| Desktop Big | `1500px+` | Wide desktop baseline with fixed left sidebar. |
| Desktop Small | `1300-1499px` | Compact desktop with fixed left sidebar. |
| Tablet | `768-1299px` | Compact layout with top navigation and drawer. |
| Mobile | `767px and below` | Phone layout with compact one-column behavior. |

Desktop Small and Tablet may share many values, but they must be displayed separately because they do not share the same navigation model.

## Primary semantic spacing table

This table should be the main human-facing reference in `designsystem.html`.

| Spacing role | Desktop Big | Desktop Small | Tablet | Mobile | Use when |
| --- | ---: | ---: | ---: | ---: | --- |
| Major section entry | `120px` | `96px` | `96px` | `48px` | Starting major white content sections. |
| Major section side inset | `64px` | `48px` | `48px` | `24px` | Horizontal content inset inside normal sections. |
| Dark / immersive panel inset | `64px` | `48px` | `48px` | `24px` | Hero, protocol panels, stats panels, dark visual surfaces. |
| Editorial split bottom | `64px` | `64px` | `64px` | `24px` | What-style sections where the visual handoff needs a shorter bottom edge. |
| Compact section entry / closure | `56px` or `60px` | `56px` or `60px` | `56px` or `60px` | `16px` to `48px` | FAQ, community, strengths, support, and lower-section handoffs. |
| Large card inset | `32px` | `24px` | `24px` | `20px` or `24px` | Large content cards where text needs breathing room. |
| Dense card inset | `24px` | `24px` | `24px` | `16px` | Steps, stats metrics, compact content cards. |
| Media card inset | `16px` | `16px` | `16px` | `8px` | Founder/media cards where imagery dominates. |
| Pill/control horizontal inset | `32px` | `32px` | `32px` | `24px` | Primary buttons, back-to-top, action pills. |
| Page frame | `16px` | `16px` | `96px 16px 16px` | `8px` | Outer frame around page panels; Tablet includes topbar clearance. |
| Mobile full-width rail | n/a | n/a | n/a | `48px 0 0` | Mobile sections where cards run full width while headings keep inner gutters. |
| Micro rhythm | `8px` | `8px` | `8px` | `8px` | Repeated card gaps, section separators, small stacked groups. |
| Flush edge | `0px` | `0px` | `0px` | `0px` | Separators, full-width rails, icon controls, and surfaces with no inset. |

## Major section rhythm rule

Major white sections use `120px` vertical entry on Desktop Big.

If a `1px` divider or separator is used as a formal section boundary, keep:

- `120px` from the previous section content or edge to the divider;
- `120px` from the divider to the next section content or edge.

Compress this rhythm by breakpoint:

| Breakpoint | Major rhythm |
| --- | ---: |
| Desktop Big | `120px` |
| Desktop Small | `96px` |
| Tablet | `96px` |
| Mobile | `48px` |

Do not apply this blindly to every lower-section handoff. Compact closures can use smaller values when the design intentionally needs tighter continuity, especially around support strips, FAQ, footer, mobile rails, and visual-to-card transitions.

## Major places and intended spacing roles

### Page shell

Use the Page frame role.

- Desktop Big: `16px`
- Desktop Small: `16px`
- Tablet: `96px 16px 16px`
- Mobile: `8px`

Tablet is not the same as Desktop Small here because the fixed top navigation needs vertical clearance.

### Hero and dark panels

Use the Dark / immersive panel inset role.

Applies to:

- homepage hero;
- protocol panels;
- stats / decentralization panels;
- dark visual hero surfaces on subpages when they follow the homepage language.

Expected values:

- Desktop Big: `64px`
- Desktop Small: `48px`
- Tablet: `48px`
- Mobile: `24px`

### Standard white editorial sections

Use Major section entry plus Major section side inset.

Applies to:

- standard homepage white sections;
- ecosystem page intro and category shells when they behave like editorial sections;
- decentralization resource sections;
- about sections when they follow the same section language.

Expected values:

- Desktop Big: `120px 64px`
- Desktop Small: `96px 48px`
- Tablet: `96px 48px`
- Mobile: usually `48px 24px 56px`

### What-style editorial splits

Use Major section entry, Major section side inset, and Editorial split bottom.

Applies to:

- `What is Terra Classic?`;
- any future two-part editorial section where copy hands off to a visual block.

Expected values:

- Desktop Big: `120px 64px 64px`
- Desktop Small: `96px 48px 64px`
- Tablet: `96px 48px 64px`
- Mobile: `48px 24px 24px`

### Lower proof / strength sections

Use Compact section entry / closure plus Major section side inset.

Applies to:

- strength / proof grids;
- support-style proof bands;
- lower sections that visually continue from a preceding block.

Current implementation contains `60px` in some desktop values. This should be treated as a current implementation value, not a preferred new spacing step. Future cleanup should decide whether `60px` should normalize to `56px` or `64px`.

### FAQ, support, and footer handoffs

Use Compact section entry / closure.

These sections should not always inherit the full `120px` rhythm because they usually close the page or sit near separators. Their job is often to finish a page cleanly rather than restart a major narrative block.

### Large cards

Use Large card inset.

Expected values:

- Desktop Big: `32px`
- Desktop Small: `24px`
- Tablet: `24px`
- Mobile: `20px` or `24px`

The `20px` mobile value exists in current implementation and should be treated as a compact-card exception until reviewed.

### Dense cards

Use Dense card inset.

Applies to:

- protocol steps;
- stats metric cards;
- compact operational cards;
- card rows where information density matters more than editorial breathing room.

Expected values:

- Desktop Big: `24px`
- Desktop Small: `24px`
- Tablet: `24px`
- Mobile: `16px`

### Media cards

Use Media card inset.

Applies to:

- founder cards;
- image-led cards where the visual already creates internal mass.

Expected values:

- Desktop Big: `16px`
- Desktop Small: `16px`
- Tablet: `16px`
- Mobile: `8px`

### Buttons and controls

Use Pill/control horizontal inset.

Expected values:

- Desktop Big: `0 32px`
- Desktop Small: `0 32px`
- Tablet: `0 32px`
- Mobile: `0 24px`

Values like `0 18px`, `0 28px`, and `24px 28px` should be treated as control-fit exceptions, not general spacing rules.

## Exception rules

The following values exist in the implementation but should not be promoted to primary spacing rules:

| Value | Current role | Guidance |
| ---: | --- | --- |
| `18px` | Capability CTA compact fit. | Do not reuse unless a button label physically needs it. |
| `20px` | Mobile large-card inset. | Keep visible as an exception; review later against `24px`. |
| `28px` | CTA / tablet play-button fit. | Treat as control-specific. |
| `40px` | Modal compact inset or visual gap. | Not a global section padding value. |
| `60px` | Lower-section desktop edge. | Review whether it should become `56px` or `64px`. |
| `72px`, `80px`, `88px`, `112px`, `160px` | Heights, offsets, article rhythm, or historical local values. | Do not copy into new layout padding without a documented reason. |

## Implementation guidance for `designsystem.html`

The future implementation should:

1. Rename the visible section heading to `Spacing & Paddings` or `Spacing Rules`.
2. Keep the sidebar item as `Paddings` if continuity is preferred.
3. Show the semantic spacing table first.
4. Use four breakpoint columns.
5. Keep values tied to CSS variables where possible.
6. Add short visual samples, but avoid one specimen per selector.
7. Add a `Major places` block below the table.
8. Add an `Exceptions` block.
9. Move raw CSS variable and selector mappings into a compact secondary section.

The implementation should not change live homepage or subpage spacing values in the first pass. First make the design system clearer. Then run a separate token cleanup task if normalization is desired.

## Validation plan for implementation

Because this document is planning-only, no build checks are required for this step.

For the actual implementation:

1. Run `npm run check`.
2. Open `http://127.0.0.1:5173/designsystem.html#paddings` or the active Vite port.
3. Browser QA at:
   - `1632px`
   - `1400px`
   - `1299px`
   - `1024px`
   - `768px`
   - `390px`
4. Confirm:
   - four columns render cleanly;
   - the section is shorter and easier to scan;
   - no text overlaps inside cells;
   - semantic roles are understandable without reading CSS;
   - implementation mappings still point agents to the right CSS variables;
   - no console warnings or errors;
   - `designsystem.html` remains local-only and is not emitted as a production page.

