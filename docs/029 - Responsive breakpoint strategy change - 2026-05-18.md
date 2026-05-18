# Responsive breakpoint strategy change

Created: 2026-05-18

## Purpose

This document records the proposed conceptual change to the Terra-classic.money responsive breakpoint model before implementation.

The goal is to make the site behave more deliberately across large desktop, smaller desktop, tablet, and phone widths instead of treating `1199px` as the first major navigation and layout breakpoint.

## Current breakpoint model

The current homepage uses these main breakpoints:

- Desktop Big: `min-width: 1500px` in React. Keeps the current wide desktop behavior.
- Desktop Small: `max-width: 1499px` in CSS. Starts adapting several large desktop sections for compact desktop widths.
- Current Tablet predecessor: `max-width: 1199px` in CSS. Switches from fixed left sidebar to top bar plus off-canvas drawer, and also changes several grids/layouts.
- Mobile: `max-width: 767px` in CSS. Phone layout, tighter spacing, smaller typography, stacked controls, and scaled-down visuals.
- `prefers-reduced-motion: reduce`: disables the main decorative animations and smooth scrolling.

## Proposed breakpoint model

The proposed model is:

1. Desktop Big: `min-width: 1500px` remains as-is.
2. Desktop Small: `max-width: 1499px` should preserve the same public desktop layout logic as Desktop Big, but reduce fonts and make targeted spacing/visual tweaks.
3. Tablet: the current `max-width: 1199px` breakpoint should become `max-width: 1299px`.
4. Tablet: `max-width: 1299px` should use the same general layout and smaller typography from Desktop Small, but replace the fixed left sidebar with the top navigation bar and hamburger drawer.
5. Mobile: `max-width: 767px` remains as-is.

## Breakpoint names

Use these names in implementation notes, QA notes, and future responsive tasks:

| Name | Query | Role |
| --- | --- | --- |
| Desktop Big | `min-width: 1500px` | Wide desktop baseline |
| Desktop Small | `max-width: 1499px` | Smaller desktop / compact desktop |
| Tablet | `max-width: 1299px` | Tablet and narrow desktop with top navigation |
| Mobile | `max-width: 767px` | Phone layout |

## React versus CSS responsibility

Responsiveness should move toward one public React structure with CSS-owned responsive behavior.

React should define the content hierarchy and stable interactive components:

- page sections,
- navigation markup,
- buttons and links,
- modals,
- accordions,
- content/data rendering.

CSS should control how that same public structure adapts across widths:

- typography scale,
- spacing,
- grid columns,
- section heights,
- sidebar versus top navigation presentation,
- artwork scale and positioning,
- visibility and off-canvas drawer states.

The current `1500px` React breakpoint is an implementation artifact from an internal desktop tool. It should not become the long-term public responsive architecture.

Long-term target:

- one homepage React render tree,
- no viewport-based React branch for public layout,
- breakpoints expressed in CSS unless there is a strong component-lifecycle reason to use JavaScript,
- `designsystem.html` remains the local design-system/reference surface, but production homepage rendering should not depend on internal comparison logic.

## Interpretation

For implementation, "Desktop Small should work like Desktop Big" should mean:

- same public content hierarchy,
- same desktop-grade section structure,
- same visual intent,
- same left-sidebar model from `1300px` to `1499px`,
- reduced type scale where needed,
- adjusted spacing and artwork positioning so the layout does not feel cramped.

It should not mean:

- preserving every fixed desktop height if it creates compression,
- forcing exact wide-desktop pixel geometry into narrower widths.

## Recommended resulting tiers

### Wide desktop: `1500px+`

Purpose:

- Preserve current wide desktop behavior.
- Keep the fixed left sidebar.
- Keep current desktop type scale.

Expected behavior:

- Desktop Big remains active at `1500px+`.
- Sidebar remains fixed at `312px`, with collapsed state at `128px`.
- Desktop hero, major grids, protocol panels, stats, and visual compositions keep the current wide desktop intent.

### Desktop Small: `1300px-1499px`

Purpose:

- Keep the website feeling like the desktop site, not a tablet site.
- Preserve the fixed left sidebar.
- Reduce oversized typography and spacing enough to prevent cramped content beside the sidebar.

Expected behavior:

- No top mobile navigation yet.
- Sidebar remains fixed.
- Major desktop section structure should stay recognizable.
- Typography should step down from wide desktop, especially oversized `h1`, protocol titles, stats titles, and possibly section `h2` / lead text if visual QA shows they are too large.
- Section padding and large visual offsets may need targeted corrections.

Important note:

The current `max-width: 1499px` CSS already changes some layouts aggressively, especially capabilities and protocol/stats internals. Implementation should decide whether those changes are still desirable for `1300px-1499px`, or whether some should move down to the `1299px` tier.

### Tablet: `768px-1299px`

Purpose:

- Introduce top navigation earlier, because the fixed `312px` sidebar leaves too little room at widths around `1200px-1299px`.
- Keep the content closer to the compact desktop layout rather than forcing phone-like behavior too early.

Expected behavior:

- Top bar appears.
- Fixed sidebar becomes off-canvas drawer.
- Main content margin-left becomes `0`.
- Typography uses the Desktop Small scale, not the full Desktop Big scale.
- Layout should stay stable and high-density enough for tablet and small laptop widths.

Implementation warning:

The current `max-width: 1199px` rule does more than switch navigation. It also collapses many grids to one column, changes hero sizing, changes What-is-Terra visual sizing, and modifies protocol/stats behavior.

If this rule is simply renamed from `1199px` to `1299px`, the site may become too vertically long and too phone-like at `1200px-1299px`. A cleaner implementation should separate:

- navigation breakpoint: top bar/drawer starts at `1299px`,
- layout breakpoint: only collapse content where width actually requires it,
- phone breakpoint: keep the current `767px` behavior.

### Phone: `767px and below`

Purpose:

- Preserve the current phone-specific behavior.

Expected behavior:

- Keep current phone typography and spacing.
- Keep one-column hero groups and phone visual scaling.
- Keep full-width buttons and stacked metrics.
- Keep the existing mobile drawer behavior.

## Risks to avoid

- Do not blindly move every current `1199px` rule to `1299px`; that would make small-laptop layouts collapse too early.
- Do not keep full `72px` desktop hero/protocol typography at `1300px-1499px`; it will continue to feel oversized.
- Do not hide layout problems only with `overflow-x: clip`; clipped overflow should not be treated as a successful responsive layout.
- Do not let sidebar state create inconsistent layout tiers. From `1299px` down, top navigation should be the authority.

## Implementation direction

Recommended implementation sequence:

1. Keep the Desktop Big cutoff at `1500px`.
2. Define a Desktop Small type/spacing tier for `max-width: 1499px`.
3. Split the current `max-width: 1199px` rules into navigation-specific and layout-specific groups.
4. Move only navigation-specific drawer rules to the Tablet breakpoint at `max-width: 1299px`.
5. Keep or reassign content-layout collapse rules based on measured available width, not only the navigation breakpoint.
6. Consolidate the homepage toward one public React structure and move public viewport behavior into CSS.
7. Preserve the current Mobile rules at `max-width: 767px`.
8. Validate at minimum: `1632`, `1500`, `1499`, `1300`, `1299`, `1200`, `768`, `767`, and `390`.

## Validation expectations

Before handoff after implementation, run:

```bash
npm run check
```

Rendered QA should verify:

- Desktop Big still uses the current wide desktop behavior.
- Desktop Small keeps desktop navigation and content structure while feeling less oversized.
- Tablet uses top navigation without prematurely becoming phone-like.
- Mobile remains visually unchanged unless a necessary bug fix is explicitly scoped.
- No horizontal document scroll or clipped functional content appears at any tier.
