# Mobile opened menu Figma correction

## Scope

This note records the Mobile opened hamburger menu correction against Figma node `1756:2456` (`Home page v4 - Menu opened - Mobile - 321`).

## Current phase

The project remains in responsive correction and implementation hardening. This is a Mobile-only navigation fidelity pass and does not change the product concept, section order, GitHub Pages-only hosting model, or roadmap scope.

## Relevant constraints

- The website remains a static React/Vite build deployable to GitHub Pages.
- `designsystem.html` and shared CSS tokens remain the source of truth for front-end implementation.
- The opened Mobile menu must reuse the existing sidebar/nav architecture rather than introducing a separate one-off menu implementation.
- Mobile drawer changes must not affect the desktop fixed sidebar or tablet navigation behavior.

## Figma reference

- Frame size: `360px x 688px`.
- Content frame: `8px` top and horizontal padding.
- Open topbar: `48px` high with `8px` internal padding.
- Menu content: `24px` side inset, starts `16px` below the topbar/gap block.
- Primary navigation: `24px / 32px / 600` labels with `16px` vertical gaps.
- External navigation: `14px / 20px / 600` labels with small external-link arrow icons.
- Disclaimer: `9px` title, `8px / 12px` body, placed inside the menu content block.

## Implementation notes

- Restored the opened Mobile topbar to the same 48px frame rhythm used by the closed Mobile topbar.
- Moved the drawer panel start upward to match the Figma content position.
- Capped the opened menu content block to the Figma `688px` frame rhythm on taller viewports while keeping it scroll-safe on shorter Mobile screens.
- Tightened the primary nav gap from `24px` to `16px`.
- Changed external drawer links to the small Figma treatment and removed the previous Mobile-only Layer 2 planet icon.
- Neutralized the active-link color in the opened Mobile menu so the state matches the Figma reference.
- Added the existing LUNC logo as the site favicon to avoid local browser 404 noise during rendered validation.
- Kept the existing overlay/body-lock behavior so the menu remains operator-safe and accessible.

## Validation plan

- Render the site at Mobile widths and open the hamburger menu.
- Verify the opened drawer geometry against the Figma 360px reference.
- Check for horizontal overflow and console errors.
- Run the final project gate: `npm run check`.

## Validation results

Rendered Browser validation:

- `360px x 688px`: open topbar rendered at `x=8`, `y=8`, `344px x 48px`.
- `360px x 688px`: menu panel rendered at `x=24`, `y=80`, `312px x 584px`.
- `360px x 688px`: primary nav rendered as `24px / 32px / 600`, black.
- `360px x 688px`: external nav rendered as `14px / 20px / 600`, black, with `11px` arrow icons.
- `360px x 688px`: disclaimer rendered at `x=24`, `y=492`, `312px x 172px`.
- `360px x 900px`: menu content kept the same Figma vertical composition instead of stretching the disclaimer to the bottom of the taller viewport.
- `320px x 688px`, `360px x 688px`, `360px x 900px`, and `752px x 900px`: no document-level horizontal overflow.
- Console warnings/errors: none captured during rendered validation.

Final project gate:

- `npm run check` passed.

Audit screenshots:

- `docs/audit-screenshots/mobile-open-menu-360-2026-05-20.png`
- `docs/audit-screenshots/mobile-open-menu-360x900-2026-05-20.png`
