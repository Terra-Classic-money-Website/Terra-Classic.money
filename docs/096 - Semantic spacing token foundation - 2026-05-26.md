# Semantic spacing token foundation

Creation date: 2026-05-26

## Scope

Started the spacing-token refactor by adding a cleaner semantic layer under the existing production padding aliases.

This is a compatibility-first foundation pass. The goal is to make future subpage work use a smaller, clearer spacing vocabulary without breaking the current website.

## Changes

Added primitive spacing tokens in `src/styles/tokens.css`:

- `--tc-space-0`
- `--tc-space-8`
- `--tc-space-16`
- `--tc-space-24`
- `--tc-space-32`
- `--tc-space-48`
- `--tc-space-56`
- `--tc-space-64`
- `--tc-space-96`
- `--tc-space-120`

Added semantic spacing tokens for the main reusable roles:

- section entry
- section side inset
- standard editorial section
- editorial split section
- immersive panel inset
- large, dense, and media cards
- pill/control horizontal inset
- page frame and topbar page frame
- mobile full-width rails
- overlay shell

Mapped the safest existing `--tc-padding-*` compatibility tokens onto those semantic tokens where the role is already clear. Selector-specific tokens that still carry current-layout exceptions remain in place for now.

Updated `designsystem.html` data in `src/designsystem.tsx` so the simplified Paddings section now displays the new semantic tokens rather than the old selector-shaped token names.

Added recursive CSS custom-property resolution inside `designsystem.html` so nested token aliases still display concrete values like `120px`, not raw `var(...)` chains.

## What intentionally did not change

This pass did not remove legacy padding aliases.

This pass did not normalize all hardcoded page-level paddings in `src/styles/global.css`.

This pass did not change production selectors to use the new `--tc-spacing-*` tokens directly. Existing selectors still consume `--tc-padding-*` compatibility aliases, which now point into the semantic layer where safe.

## Risk control

The high-risk part of spacing refactors is visual drift. This pass avoids broad selector rewrites and keeps old token names alive.

The next pass should only remove or rename compatibility tokens after rendered desktop/tablet/mobile screenshots prove no regression.

## Validation plan

- Run `npm run typecheck`.
- Run `npm run check`.
- Browser-check the production homepage across representative breakpoints.
- Browser-check `designsystem.html#paddings` and confirm the table resolves concrete values from semantic tokens.

## Validation result

Completed on 2026-05-26.

- `npm run typecheck` passed.
- `npm run check` passed, including the production Vite build.
- Local Vite served the site at `http://127.0.0.1:5174/`.
- Browser validation passed at Desktop Big `1632x1000`, Desktop Small `1400x900`, Tablet `1024x900`, and Mobile `390x844`.
- Homepage spacing aliases resolved correctly through the new semantic layer:
  - Desktop Big standard section: `120px 64px`
  - Desktop Small standard section: `96px 48px`
  - Tablet standard section: `96px 48px`
  - Mobile semantic standard section: `48px 24px 56px`
- Homepage page-level horizontal overflow was not present.
- Browser console warnings/errors were clean.
- `designsystem.html#paddings` rendered 13 semantic rows and displayed concrete values such as `120px`, `96px`, `64px`, and `48px` from the nested semantic tokens.
