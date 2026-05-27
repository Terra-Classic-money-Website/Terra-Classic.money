# Padding design system improvement plan

Created: 2026-05-26

## Purpose

This document records the analysis and implementation plan for making the `designsystem.html` Paddings section more useful for future page work.

The current section is technically useful but too implementation-shaped. It exposes many selector-specific padding tokens in a three-column audit table, which makes it hard for humans and future agents to understand the repeatable spacing logic behind the website.

## Current project context

The Terra Classic Website is an independent, community-maintained, open-source information and wayfinding website for Terra Classic.

The project is past the first homepage rebuild and is now in design-system hardening, responsive correction, and subpage consistency work. The design-system task fits the roadmap because it improves repeatability and reduces drift for future subpages without changing the product concept, page model, hosting model, or public content scope.

The site remains a static Vite/React build for GitHub Pages only. `designsystem.html` is a local Vite-served internal tool and is not emitted as a production page.

## Sources inspected

- `-- 1. OG BRIEF - 2026.05.14.md`
- `DESIGN.md`
- `designsystem.html`
- `src/designsystem.tsx`
- `src/styles/tokens.css`
- `src/styles/global.css`
- current homepage implementation in `src/App.tsx`
- `- KNOWLEDGE` folder, which currently contains no usable project files beyond `.DS_Store`
- validation setup in `package.json`, `.github/workflows/deploy.yml`, `- START.md`, and `tests`
- relevant prior docs: responsive breakpoint strategy, design-system setup, tablet/mobile spacing passes, padding token audits, and recent spacing corrections
- Figma node `1612:1342` from file `dZxJU7AlVV2k9ovNmmbeLI`

## Key findings

The owner concern is valid. The current `Paddings` section in `designsystem.html` has 32 row groups across 3 columns, producing a very tall section. The rendered Paddings section is about `29042px` tall at the inspected desktop viewport.

The current three columns are:

- Desktop Big: `1500px+`
- Desktop Small + Tablet: `1300-1499px and 768-1299px`
- Mobile: `767px and below`

That grouping is no longer clear enough. Desktop Small and Tablet share many token values, but they do not share the same user-facing layout model. Desktop Small keeps the fixed left sidebar. Tablet switches to the 96px top navigation model at `1299px`, adds `96px 16px 16px` page clearance, and uses different interaction/navigation constraints. The design system should show them separately.

The Figma desktop frame confirms the major repeatable rhythm:

- content page frame: `16px`
- major panel inset: `64px`
- major section entry rhythm: `120px`
- compact section/support/FAQ/footer handoffs around `56px` and `64px`
- repeated internal card/control values: `32px`, `24px`, `16px`, `8px`, and `0px`

The implementation confirms the same broad scale, but it mixes reusable padding schemes with component micro-values and responsive offsets. Current CSS padding declarations include values such as `18px`, `20px`, `28px`, `40px`, `60px`, `72px`, `80px`, `88px`, `112px`, and `160px`. These should not all be presented as first-class padding schemes. Some are component-specific control internals, topbar clearance, local responsive fixes, or non-padding layout gaps.

## Current rendered padding evidence

Representative homepage measurements:

| Surface | Desktop Big 1632 | Desktop Small 1400 | Tablet 1299/1024/768 | Mobile 390 |
| --- | --- | --- | --- | --- |
| `main` | `16px` | `16px` | `96px 16px 16px` | `8px` |
| `.hero` / `.protocol-panel` | `64px` | `48px` | `48px` | `24px` |
| `.what-editorial` | `120px 64px 64px` | `96px 48px 64px` | `96px 48px 64px` | `48px 24px 24px` |
| `.capabilities-section` | `120px 64px` | `96px 48px` | `96px 48px` | `48px 0 0` |
| `.strengths` | `60px 64px 120px` | `60px 48px 96px` | `60px 48px 96px` | `16px 24px 48px` |
| `.faq` | `56px 64px 64px` | `56px 48px 64px` | `56px 48px 64px` | `48px 24px 64px` |
| `.hero-group` | `16px 24px 24px` | `16px 24px 24px` | `16px 24px 24px` | `12px 16px 16px` |
| `.strength-card` | `32px` | `24px` | `24px` | `20px` |
| `.step` / `.stats-metric` | `24px` | `24px` | `24px` | `16px` |
| `.founder-card` | `16px` | `16px` | `16px` | `8px` |

The design system should explain these as a small spacing grammar first, then expose implementation mappings second.

## Proposed design-system reorganization

### 1. Rename the section conceptually

Keep the sidebar label as `Paddings` if preferred for continuity, but inside the page treat it as `Spacing & padding rules`.

The first screen of the section should answer:

- what are the approved spacing values;
- what each value is used for;
- how section spacing works;
- how separator lines affect section rhythm;
- which values are layout schemes versus component internals.

### 2. Split breakpoints into four columns

Replace `Desktop Small + Tablet` with separate columns:

- Desktop Big: `1500px+`
- Desktop Small: `1300-1499px`
- Tablet: `768-1299px`
- Mobile: `767px and below`

Even when Desktop Small and Tablet share a value, the table should repeat it or show `same as Desktop Small` only where that is truly safe. This matters because Tablet has top navigation, different scroll offsets, and no fixed sidebar.

### 3. Replace the long token list with a small rule hierarchy

Use four levels:

1. Spacing scale
2. Page and navigation shell
3. Section rhythm
4. Component/card/control inset families

Do not lead with selector-specific rows.

### 4. Add an approved spacing scale summary

Primary scale:

| Value | Meaning |
| --- | --- |
| `120px` | Desktop major section entry/exit rhythm. Also the default desktop distance from a section edge to a separator, and from separator to next section start when a divider creates a formal section handoff. |
| `96px` | Compact large-section entry rhythm for Desktop Small and Tablet. |
| `64px` | Desktop panel inset, desktop side gutters inside content sections, major internal editorial grouping, and section-to-content text rhythm. |
| `56px` | Compact closure/footer/FAQ/support strip rhythm where `64px` is visually too open. |
| `48px` | Desktop Small/Tablet panel inset and major mobile section entry. |
| `32px` | Desktop card/control horizontal rhythm and medium internal group spacing. |
| `24px` | Mobile panel inset, dense card/control inset, tablet topbar inset, common section copy gap. |
| `16px` | Page frame, compact card/media inset, small internal gap. |
| `8px` | Outer mobile page frame, repeated card/section separator gap, compact stack gap. |
| `0px` | Flush edges, full-width mobile rails, separators, or controls with no internal vertical padding. |

Secondary implementation values should be documented separately, not promoted as primary rules:

- `20px`: current mobile large-card inset in strength/about-style cards.
- `18px` and `28px`: control-specific CTA width tuning.
- `40px`: modal surface compact inset or measured visual gap, not a global padding step.
- `60px`: legacy compact desktop section edge used in several lower homepage sections; should be reviewed because it weakens the cleaner `56/64` scale.
- `72px`, `80px`, `88px`, `112px`, `160px`: offsets, heights, article rhythm, or old local values, not reusable padding tokens.

### 5. Add a section-rhythm rule card

The most important missing human rule should be explicit:

On Desktop Big, major white sections use `120px` vertical entry by default. If a `1px` divider/separator is used as a formal section boundary, keep `120px` from the previous section content/edge to the divider and another `120px` from the divider to the next section content/edge unless the section is intentionally a compact handoff.

Desktop Small and Tablet reduce the major entry rhythm to `96px`. Mobile reduces major section entry rhythm to `48px`, with section-specific closures at `56px`, `48px`, `24px`, `16px`, or `8px` depending on whether the next element is a full-width rail, visual panel, or footer closure.

### 6. Convert selector rows into scheme rows

Recommended visible rows:

| Scheme | Desktop Big | Desktop Small | Tablet | Mobile | Applies to |
| --- | --- | --- | --- | --- | --- |
| Page shell | `16px` | `16px` | `96px 16px 16px` | `8px` | `main`, topbar clearance |
| Major dark panel | `64px` | `48px` | `48px` | `24px` | hero, protocol, stats panels |
| Major editorial section | `120px 64px` | `96px 48px` | `96px 48px` | `48px 24px 56px` | standard text-led sections |
| Editorial split | `120px 64px 64px` | `96px 48px 64px` | `96px 48px 64px` | `48px 24px 24px` | What-style split sections |
| Compact/closing section | `120px 64px 60px` or review to `120px 64px 56px` | `96px 48px 56px` | `96px 48px 56px` | `48px 24px 16px` | founders/native close patterns |
| Proof/lower section | `60px 64px 120px` or review to `64px 64px 120px` | `60px 48px 96px` or review | `60px 48px 96px` or review | `16px 24px 48px` | strengths/proof grid |
| FAQ/support/footer handoff | `56px/64px` family | `56px/48px` family | `56px/48px` family | `48px 24px 64px` or `0 24px 48px` | FAQ, support strip, footer |
| Large card | `32px` | `24px` | `24px` | `20px` or review to `24px` | strength/about indexed cards |
| Dense card | `24px` | `24px` | `24px` | `16px` | steps, stats metrics, open-work cards |
| Media card | `16px` | `16px` | `16px` | `8px` | founder/media cards |
| Pill/control | `0 32px` | `0 32px` | `0 32px` | `0 24px` | primary pills, back-to-top |
| Mobile/full-width rail | n/a | n/a | n/a | `48px 0 0` | capability card rail |

This table should be the main human-facing reference.

### 7. Move selector/token detail into a collapsible implementation mapping

After the rules, add a compact `Implementation mapping` section. This can still list CSS variables and selectors, but grouped under the schemes above.

Example:

- Major dark panel: `--tc-padding-immersive-panel`, used by `.hero`, `.protocol-panel`, `.stats-panel`.
- Major editorial section: `--tc-padding-editorial-section`, used by `.section`, `.ecosystem-page`, `.decentralization-resources`, and equivalent subpage shells.
- Dense card: `--tc-padding-compact-card`, used by `.step`, `.stats-metric`.

This preserves agent usefulness without forcing humans to scan 32 separate implementation rows.

### 8. Keep non-scheme values visible but demoted

Create a small `Exceptions and local values` block. It should say:

- Values outside the primary scale are allowed only for component-specific fit, measured responsive correction, or content-driven edge cases.
- New subpages should not introduce new padding values without adding a documented reason.
- Existing values like `18px`, `20px`, `28px`, `40px`, and `60px` should be reviewed before being copied.

This is important because forbidding all exceptions would be unrealistic, but promoting every exception makes the system unreadable.

## Implementation sequence

1. Refactor the TypeScript data model in `src/designsystem.tsx` from a flat `paddings` array to grouped `spacingRules`.
2. Add four breakpoint columns.
3. Build a top summary block for the approved spacing scale.
4. Replace the current long row rendering with grouped scheme tables.
5. Add an implementation mapping below the human-facing rules.
6. Add an exceptions/local-values block.
7. Keep all displayed values resolved from CSS variables where possible, so the design system remains connected to live tokens.
8. Do not change production layout values in the same first pass unless the task explicitly becomes a token cleanup task.

## Follow-up token cleanup recommendation

After the presentation refactor, run a second, smaller cleanup pass to decide whether to normalize:

- `60px` section edges to `56px` or `64px`;
- `20px` mobile large-card padding to `24px` or keep it as a deliberate compact card exception;
- `18px`/`28px` CTA padding into named control-density variants;
- whether `--tc-padding-capabilities-section-*` should be used consistently or removed when it aliases editorial section behavior.

This should be separate from the presentation task because changing live tokens may affect many pages.

## Validation plan

For planning-only analysis, no production checks were required.

For implementation:

1. Run `npm run typecheck`.
2. Run `npm run build`.
3. Run `npm run check` before handoff.
4. Browser QA `designsystem.html#paddings` at:
   - `1632px`
   - `1400px`
   - `1299px`
   - `1024px`
   - `768px`
   - `390px`
5. Confirm:
   - four breakpoint columns render without overlap;
   - the Paddings section is shorter and scannable;
   - values still resolve from shared CSS variables;
   - no console warnings/errors;
   - production build still does not emit `dist/designsystem.html`.
