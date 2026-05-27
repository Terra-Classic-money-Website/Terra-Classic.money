# Mobile breakpoint product and native asset corrections

## Scope

This document records the follow-up Mobile breakpoint corrections requested after the previous mobile layout batch.

## Current project phase

The project remains in responsive correction and implementation hardening for the homepage. This task is a Mobile-only refinement pass and does not change the product concept, roadmap scope, hosting model, or section order.

## Relevant constraints

- GitHub Pages-only static implementation remains unchanged.
- `designsystem.html` and the shared `tc-type-*` classes remain the typography source of truth.
- Component-specific small labels may use local component styles only when they intentionally need to be smaller than the global type scale.
- Mobile fixes must not reintroduce desktop/tablet breakpoint changes.

## Fixes implemented

### Open mobile menu topbar

- Removed the larger open-menu topbar padding.
- The open topbar now keeps the same 48px height and the same logo/language/menu x positions as the closed mobile topbar.
- The full-screen overlay still owns the menu state, but the topbar controls no longer jump horizontally.

### What section spacing

- Restored the Mobile top padding before `What is Terra Classic?` so the title no longer sits too close to the preceding divider.
- The Mobile spacing now follows the Figma relationship: divider, breathing room, then the section headline.

### Product sections

- Removed the fixed/minimum Mobile product-panel height.
- Product panels now use content-driven height.
- Restored protocol/product graphics between the intro text and `How it works:`.
- Removed the large empty bottom area caused by the previous hidden-graphic plus fixed-height combination.

### Native assets

- Changed Mobile token grids from one column to two columns.
- Reduced token-card internals for Mobile:
  - smaller cards
  - smaller token icons
  - smaller code type
  - smaller local token-name labels
- Removed the global `tc-type-body-very-small` class from token-card names because these labels intentionally need a component-specific size smaller than the design-system body-very-small token.

## Validation results

Rendered Browser validation:

- Effective 320px client width: no horizontal overflow.
- Effective 360px client width: no horizontal overflow.
- Effective 560px client width: no horizontal overflow.
- Mobile typography audit: zero `tc-type-*` mismatches after moving token-card names to component-specific styling.
- Mobile menu open state:
  - `aria-expanded="true"`
  - body scroll lock active
  - logo, language button, and hamburger x positions match the closed state at 360px.
- Product sections:
  - protocol graphics display on Mobile
  - product panels are content-height driven on Mobile.
- Native assets:
  - phase token grids render as two columns on Mobile.

Final project gate:

- `npm run check` passed.
