# Semantic Spacing Consumer Migration - 2026-05-26

## Purpose

Continue the padding-token simplification after the semantic spacing foundation was added.

The goal of this pass is not to redesign website spacing. The goal is to make the codebase consume the clearer semantic `--tc-spacing-*` tokens directly where the mapping is already unambiguous, and to remove the old compatibility names for those migrated roles.

## Scope

Migrated production CSS consumers from old selector-shaped padding aliases to semantic spacing tokens for:

- dark / immersive panels
- standard editorial sections
- editorial split sections
- large cards
- dense cards
- media cards
- pill controls
- overlay shells

Removed the migrated legacy aliases from `src/styles/tokens.css` after verifying they were no longer consumed.

Updated the `designsystem.html` implementation map in `src/designsystem.tsx` so future agents see the semantic token names first instead of learning the retired aliases.

## Intentionally Preserved

The remaining `--tc-padding-*` tokens are still preserved when they represent current implementation exceptions, chrome, or layout-specific surfaces:

- page gutters and topbar frame
- mobile announcement slot
- capabilities rail/head/card exceptions
- compact lower-section closures
- native assets, proof, community, FAQ, support strip, footer shells
- hero group, info row, asset rows/cards
- play CTA, sidebar chrome, top navigation, modal surface

These should not be deleted blindly. Some are legitimate exceptions; some are historical values that need visual review before normalization.

## Risk Control

This pass is deliberately narrow. It only migrates roles where the semantic token is equivalent to the previous value at each breakpoint.

High-risk spacing exceptions remain unchanged because normalizing them could alter the homepage/subpage rhythm.

## Validation Plan

Run:

- `npm run typecheck`
- `npm run check`

Then render-check homepage and `designsystem.html` at desktop, desktop-small/tablet, and mobile widths to confirm:

- no console errors
- no horizontal overflow
- homepage spacing remains visually stable
- Paddings table resolves semantic values correctly

## Validation Result

Passed.

Executed:

- `npm run typecheck`
- `npm run check`

Rendered QA:

- Homepage checked at 1632px, 1400px, 1024px, and 390px widths.
- Homepage had no viewport-level horizontal overflow in the checked breakpoints.
- Homepage semantic spacing values resolved as expected:
  - Desktop Big: section `120px 64px`, split `120px 64px 64px`, immersive panel `64px`.
  - Desktop Small / Tablet: section `96px 48px`, split `96px 48px 64px`, immersive panel `48px`.
  - Mobile: section token `48px 24px 56px`, split `48px 24px 24px`, immersive panel `24px`.
- `designsystem.html#paddings` checked at desktop and mobile widths.
- Paddings section displays semantic tokens and resolved values.
- Retired migrated aliases are not visible in the Paddings implementation map.
- Retired migrated aliases have zero references in `src/styles/global.css`, `src/styles/tokens.css`, and `src/designsystem.tsx`.
- Mobile Paddings tables now render as stacked labeled rows instead of wide horizontal tables.
- Paddings section had no local overflow on desktop or mobile.

Known unrelated note:

- The broader `designsystem.html` page still contains existing component specimens with intentionally wide preview surfaces, such as large buttons and roadmap previews. This pass did not normalize those unrelated component-preview overflows.
