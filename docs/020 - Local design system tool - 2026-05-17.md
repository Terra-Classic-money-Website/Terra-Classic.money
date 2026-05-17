# Local design system tool

Created: 2026-05-17

## Purpose

This document records the first internal `designsystem.html` implementation for the Terra Classic Website.

## Scope

- Added a local-only Vite-served design-system page at `designsystem.html`.
- Added `src/designsystem.tsx` as the React entry for the local design-system catalog.
- Added `src/styles/designsystem.css` for design-system-only layout and specimen styling.
- Extended `src/styles/tokens.css` with Figma-style token aliases so local design-system examples and production styles can reference the same canonical color names.
- Updated `- START.md` with the local URL and deployment boundary.
- Updated the design-system layout so the sidebar navigation sits directly under the logo, the sidebar has a 1px separator, the main content uses the full remaining viewport width, and component specimens sit on white rows divided by horizontal 1px separators instead of individual boxes.

## Deployment boundary

`designsystem.html` is intentionally not wired into the Vite production build input. The GitHub Pages workflow builds and uploads `dist` only, so this internal page will not be deployed unless the build configuration is explicitly changed later.

## Current catalog

The first catalog includes:

- Typography: H1, H2, H3, H4, H5, Body, Body - Small, Body - Very small, Link - Normal, Link - Small, Link - Big.
- Colors: LUNC black/white/gray scale, LUNC orange/yellow, LUNC light/dark blue, plus LUNC Ultra Light Gray.
- Components: the 17 component names visible in the Figma design-system reference, with local specimens bound to current CSS classes and assets where practical.
- Component specimens now expose local hover/toggle states for interactive variants. Links inside specimens intentionally suppress navigation so the design-system surface can be used for state inspection without jumping around the page.

## Sync model

The first version is a local visual library that imports the same global CSS, token CSS, assets, and content data used by the main site. This gives immediate visual drift detection for shared tokens/classes.

The next stronger step is to extract repeated production UI primitives from `src/App.tsx` into shared component modules consumed by both `App.tsx` and `src/designsystem.tsx`. That should be done before large component iteration, otherwise markup-level drift can still happen even when CSS tokens remain shared.

## Validation plan

For this task, the relevant validation is:

```bash
npm run typecheck
npm run build
npm run check
```

Browser QA should include opening `http://127.0.0.1:5173/designsystem.html`, checking console errors, and confirming that the production build does not emit `dist/designsystem.html`.

## 2026-05-17 interactive component pass

Updated the component specimens so interactive Figma variants are testable directly inside `designsystem.html`:

- Hover states: nav element, link arrow, buttons, community buttons, CMC / CG buttons, arrow buttons, founder story, back-to-top button, info box, FAQ link, language buttons, X controls, and collapse control.
- Toggle/open states: language selector, FAQ link, left section opened/collapsed, collapse button opened/collapsed, and info box close/reset.
- Suppressed specimen navigation: internal design-system links use local click prevention so hover and click states can be inspected without moving the page.

Validation run:

```bash
npm run typecheck
npm run check
```

Additional QA:

- Confirmed `designsystem.html` is not emitted into `dist`.
- Browser QA confirmed 17 component rows, 11 typography rows, 10 color rows, no missing images, no language control in the main design-system sidebar, and working local toggle states for language, FAQ, left section, collapse control, and info box.
- Saved QA screenshot: `docs/audit-screenshots/designsystem-interactive-components-2026-05-17.png`.

## 2026-05-17 component correction pass

Applied corrections from owner screenshot review:

- Nav element: external-link specimen now uses the same `sidebar-external-icon` wrapper and `sidebar-external-arrow.svg` asset as the main website.
- Left section: specimen now uses the main website navigation content, external-nav content, language control, and full sidebar disclaimer copy. Expanded and collapsed states are both local toggles.
- Info box: close button now uses the interactive dot-based X control hover pattern.
- FAQ link: hover no longer changes text/icon to blue; it stays black with a subtler arrow-state treatment.
- Link arrow: removed incorrect pill styling and returned the specimen to the plain text + arrow model.
- Buttons: catalog contains 11 button specimens.
- Collapse button: standalone specimen uses no gray container background.

Validation run:

```bash
npm run check
```

## 2026-05-17 component motion polish pass

Applied interaction polish to the local design-system specimens:

- Added shared design-system motion tokens for fast/base/slow transitions and standard/emphasized easing.
- Smoothed hover transitions for nav links, language controls, info box, FAQ link, link arrow, button variants, community buttons, CMC / CG buttons, arrow buttons, founder story, back-to-top, collapse controls, and X controls.
- Converted full and compact language option panels to stay mounted and animate opacity/position/height instead of appearing as a hard cut.
- Added a small enter animation for the left-section opened/collapsed specimen states so sidebar state changes do not feel abrupt.
- Swapped button and play icon hover assets with opacity transitions instead of instant display changes.
- Added a scoped local override so `designsystem.html` can show motion even when the app-wide reduced-motion safety rule is active in the browser; production website behavior remains unchanged.

Validation target:

```bash
npm run check
```

## 2026-05-17 left-section nav spacing pass

Applied the next owner sidebar review:

- Left section expanded preview now mirrors the main website sidebar structure: logo and both nav groups are packed inside `sidebar-top`, with language/disclaimer kept as bottom content.
- Restored the production 64px logo-to-nav spacing and 32px primary-to-external nav spacing inside the design-system specimen.
- Added smooth color/icon transitions to the Left section nav links so they behave like the standalone Nav element component instances, including the scoped design-system override needed when the app-wide reduced-motion safety rule is active in local QA.

Validation target:

```bash
npm run check
```

## 2026-05-17 shared typography token pass

Applied the first main-site synchronization pass from `designsystem.html`:

- Moved typography style definitions into shared `tc-type-*` classes and CSS variables in `src/styles/tokens.css`, which is imported by both `designsystem.html` and the main website.
- Updated `designsystem.html` typography rows to render the actual shared typography classes and read their displayed size, line-height, and weight from computed CSS instead of hard-coded TypeScript numbers.
- Added explicit `tc-type-*` typography classes to the main website markup for headings, body copy, links, and buttons where those elements correspond to the design-system typography styles.
- Replaced matching hard-coded main-site font values with shared typography variables so future changes to the typography token definitions propagate into the website instead of remaining duplicated in page CSS.
- Left component-specific micro typography, such as badges and tiny legal/sidebar labels, under component CSS where no matching typography token exists yet.

Validation target:

```bash
npm run check
```

## 2026-05-17 shared color token pass

Applied the color synchronization pass from `designsystem.html`:

- Kept `--lunc-*` variables in `src/styles/tokens.css` as the canonical color source for the project.
- Rewired legacy main-site aliases such as `--color-black`, `--color-blue`, `--color-yellow`, and gray aliases to resolve through canonical `--lunc-*` variables instead of duplicating HEX values.
- Updated `designsystem.html` color cards to bind swatches to actual CSS variables and display computed HEX/RGB values from those variables.
- Added each color variable name to the color card metadata so future edits can identify the exact token to change.
- Left non-design-system effect colors, gradients, shadows, overlays, and protocol-specific visual treatment values outside the LUNC color token set for now.

Validation target:

```bash
npm run check
```

## 2026-05-17 main-site component parity pass

Started pushing the `designsystem.html` component contract back into the main website:

- Added shared motion variables in `src/styles/tokens.css` so production components and the local design system can use the same transition durations and easing.
- Reworked the main sidebar to keep expanded and collapsed panels mounted while opacity/position and width transition, reducing abrupt state swaps.
- Updated main-site collapse controls to use the same six-dot markup and animated dot transitions as the design-system specimen.
- Kept full and compact language option panels mounted and animated their open/closed states instead of conditionally rendering them.
- Replaced text-based arrow placeholders in pill buttons with the same SVG arrow assets and opacity-swap hover model used in `designsystem.html`.
- Ported the design-system hover model to repeated website button/link instances: no hover lift on yellow/blue/play/community/back-top/founder/market buttons, smooth color/icon transitions, CMC / CG muted icon hover, black-play icon swap, black-only FAQ arrow states, and dot-based Info box X hover.
- Updated founder cards to use the same smooth portrait reveal behavior as the local design-system preview.
- Narrowed the global reduced-motion media rule so it no longer disables all component transitions. It now only disables smooth scrolling, allowing the requested button/sidebar/language polish to remain visible.
- Corrected main-site link-arrow instances in the hero and popular-topic links to use an inline current-color dot-arrow icon, so hover turns the icon fully LUNC light blue instead of relying on filtered low-opacity image assets.

Validation target:

```bash
npm run check
```

Additional QA:

- Browser QA confirmed the collapsed left-section language menu now opens upward/right from the bottom slot, uses the shorter production collapsed disclaimer copy, and keeps the 14px language X asset.
- Saved QA screenshot: `docs/audit-screenshots/designsystem-icon-collapsed-corrections-2026-05-17.png`.

## 2026-05-17 language and button variant correction pass

Applied the next owner screenshot review:

- Renamed `USTD ULTRA LIGHT GRAY` to `LUNC ULTRA LIGHT GRAY` in the local color catalog and token alias.
- Language button component section now previews both the full language button and the compact collapsed-sidebar language button.
- Language button X component section now contains one interactive X button with its hover state, not two static buttons.
- Replaced the white/black arrow button icons with Figma-derived seven-dot SVG arrow assets and wired the correct default/hover swaps.
- Added the Figma-derived orange/yellow hover asset for `Button - Black play`.
- Link arrow component row now uses a black review background so the inverse text-link variant is visually clear.

Validation target:

```bash
npm run check
```

Additional QA:

- Browser QA confirmed the compact language popover is fully visible and bottom-aligned with the compact language button.
- Saved QA screenshot: `docs/audit-screenshots/designsystem-language-popover-bottom-aligned-2026-05-17.png`.

Additional QA:

- Figma context rechecked for the Buttons component variants before implementing the button arrow corrections.
- Browser QA confirmed the renamed color, two language button previews, one interactive language X specimen, Figma-derived button arrow assets, black link-arrow review background, and black-play hover asset wiring.
- Saved QA screenshot: `docs/audit-screenshots/designsystem-language-button-variants-2026-05-17.png`.

## 2026-05-17 link arrow and compact language correction pass

Applied the next owner screenshot review:

- Compact language button preview now has enough visible row space for the opened language-options popover while preserving the production bottom-aligned menu position.
- Link arrow component section now shows the default variant on the normal white row and only the inverse variant on a black review background.
- `Button - Black play` hover now keeps the black button background and swaps only to the hover icon treatment.
- Buttons component section now groups the white-background variants (`Button - White arrow`, `More staking button`, `More forex button`, `More L2 button`) on a gray review surface.
- Badge component section now groups the first and third badges in a separate black review row.

Validation target:

```bash
npm run check
```

Additional QA:

- Confirmed `designsystem.html` is still not emitted into `dist`.
- Browser QA confirmed 17 component rows, 11 button specimens, no missing images, corrected left-section expanded/collapsed dimensions, transparent collapse control background, and removed Link arrow pill styling.
- Saved QA screenshot: `docs/audit-screenshots/designsystem-component-corrections-2026-05-17.png`.

## 2026-05-17 component polish pass

Applied the next owner screenshot review:

- Left section collapsed preview now follows the main website sidebar structure more closely, including the `sidebar-top`, `sidebar-brand`, `sidebar-collapsed-bottom`, `collapsed-language-slot`, vertical URL badge, language popover, and full rotated disclaimer structure.
- X and Info box controls now share the same dot-based color model: muted gray default dots and black hover/focus dots.
- FAQ link clicked state keeps black text and uses a black rotated dot-arrow instead of blue.
- Button gallery now labels the 11 specimens with Figma component names instead of placeholder `Text` labels.
- Button gallery layout was returned to two columns after browser QA showed three columns caused horizontal overflow at normal desktop width.
- CMC / CG buttons no longer carry a local shadow; their default state is a clean white circular button with a muted hover icon treatment.
- Arrow button specimen now has a design-system-scoped default ultra-light-gray background and black hover background with white arrow dots.

Validation run:

```bash
npm run check
```

Additional QA:

- Confirmed `designsystem.html` is still not emitted into `dist`.
- Browser QA confirmed the 11 button labels, no button-gallery horizontal overflow, no CMC / CG shadow, corrected FAQ clicked color, and corrected collapsed-left-section structure.
- Saved QA screenshot: `docs/audit-screenshots/designsystem-component-polish-2026-05-17.png`.

## 2026-05-17 icon and collapsed-sidebar correction pass

Applied the next owner screenshot review:

- Language button specimen now mirrors the main website two-asset arrow pattern so hover swaps to the black arrow asset.
- Language button X specimen now shows the Figma-style default and hover dot-X variants as separate local states.
- Fixed the collapsed language X icon sizing through the shared global selector so main-site and design-system use the same 14px Figma asset size.
- Left section collapsed preview now uses the shorter main website collapsed disclaimer copy and lets the language menu open upward/right from the bottom slot, matching production positioning.
- Link arrow specimen now uses a non-opacity arrow asset so hover can render blue at full opacity.
- Button arrow specimens now use SVG dot-arrow assets instead of text dots; the large play icon now uses the same dimensions as the main website.
- CMC / CG Button component row now has a black background so the white circular buttons can be reviewed correctly.

Validation run:

```bash
npm run check
```

## 2026-05-17 motion correction pass

Applied the next owner motion review:

- Left section preview now keeps expanded and collapsed sidebar states mounted at the same time and cross-fades/slides between them while the shell width changes, so the specimen no longer depends on an instant subtree swap.
- Button hover polish now keeps `Button yellow`, `Button blue`, `Button - Black play`, GitHub/community buttons, and the Back to top specimen fixed in place instead of lifting by 1px on hover.
- Collapse controls now keep all icon dots mounted and animate dot color, opacity, and shape changes smoothly in both the standalone component specimen and the Left section preview.
- The local design-system React root is now stored on the design-system container so Vite hot reloads do not create duplicate roots during browser QA.

Validation target:

```bash
npm run check
```
