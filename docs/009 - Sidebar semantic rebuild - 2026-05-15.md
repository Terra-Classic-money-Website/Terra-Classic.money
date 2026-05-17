# Sidebar semantic rebuild

Created: 2026-05-15

## Purpose

This pass rebuilds the persistent left navigation as real HTML/CSS using Figma measurements and exported assets. The sidebar is part of every desktop comparison, so its visual fidelity must be corrected before continuing section-by-section rebuild work.

## Source Of Truth

- Figma file: `dZxJU7AlVV2k9ovNmmbeLI`
- Target frame: `1612:1342`
- Sidebar instance: `1612:1344`
- Updated left-section component set: `1612:1273`
- Updated language button component set: `1612:1307`
- Updated particular language button component: `1660:905`
- Updated compact language close button component: `1660:1097`

## Implemented Values

- Expanded sidebar width: `312px`.
- Sidebar padding: `32px 16px 32px 32px`.
- Logo row height: `48px`.
- Logo asset size: `221.245 x 46`.
- Expanded collapse control: `8 x 32`, rebuilt as CSS-positioned dots to match the updated Figma state.
- Collapsed collapse control: `16 x 32`, rebuilt as the updated two-column dot arrangement.
- Nav typography: Figtree `14px / 16px`, `600`.
- Nav vertical gap: `16px`.
- Primary/external nav group gap: `32px`.
- Language selector: `264 x 32`, `64px` radius, `16px` horizontal padding.
- Language label typography: Figtree `12px / 16px`, `600`.
- Open language selector: `264px` wide, `16px` radius, `8px 16px` padding, inline language pills.
- Collapsed language button: `32 x 32`.
- Collapsed vertical URL badge: `32 x 172`.
- Collapsed disclaimer column: `24 x 464`, rotated `8px / 12px` text.
- Disclaimer typography: title `9px / 8px`, body `8px / 12px`.

## Assets Added Or Replaced

- Replaced `public/assets/sidebar-logo.svg` from the Figma sidebar instance.
- Added `public/assets/sidebar-logo-icon.svg`.
- Added `public/assets/sidebar-external-arrow.svg`.
- Added `public/assets/language-icon.svg`.
- Added `public/assets/language-arrow.svg`.
- Added `public/assets/language-arrow-hover.svg`.
- Added `public/assets/language-arrow-open.svg`.
- Added `public/assets/language-x.svg`.
- Added `public/assets/language-x-hover.svg`.
- Re-exported the external-link icon from the isolated Figma vector node and render it with the same `-6.67%` inset/overflow behavior as the Figma component.

## Interaction Boundary

The existing interactions were preserved:

- sidebar collapse/expand,
- persisted collapsed state,
- active section highlighting,
- language dropdown,
- mobile drawer behavior.

The updated component now tracks the 2026-05-17 Figma left-section revisions:

- primary navigation label changed from `Metrics` to `Markets`;
- external navigation label changed from `Layer 1` to `Layer 2`;
- expanded and collapsed collapse controls use the updated dot layouts;
- collapse-control hover/focus states use the Figma hover state, switching all dots to `#101010` while preserving the same geometry;
- collapsed state shows the bottom vertical URL badge plus the rotated disclaimer text;
- expanded language button supports default, hover, and open states with exported Figma SVG assets;
- collapsed language button supports default and open states, including the compact X control and `88px` language panel;
- the compact language-open state anchors to the full `128px` collapsed sidebar width so controls are not clipped.
- follow-up correction: collapsed language opening no longer reflows or hides the vertical URL badge, language trigger, or rotated disclaimer; the `88px` language panel is an absolute overlay to the right of the fixed `32px` language slot.

## Validation Notes

- `npm run check` passed on 2026-05-17.
- Browser viewport: `1632 x 1000`.
- Browser-measured expanded sidebar after the updated Figma pass:
  - sidebar: `312px` wide
  - logo: `221 x 46`
  - collapse control: `8 x 32`
  - nav labels: `Ecosystem`, `Decentralization`, `Roadmap`, `Markets`, `About terra-classic.money`, `Layer 2`, `Documentation`
  - language trigger: `264 x 32`
  - open language panel: `264 x 132`
- Browser-measured collapsed sidebar after the updated Figma pass:
  - sidebar: `128px` wide
  - collapsed brand hit area: `80 x 48`
  - Terra icon: `48 x 46`
  - collapse control: `16 x 32`
  - vertical badge: `32 x 172`
  - collapsed language button: `32 x 32`
  - collapsed disclaimer: `24 x 464`
- Browser-measured collapsed language-open state:
  - compact X button: `32 x 32`
  - language panel: `88 x 168`
  - language options: `EN PL EN PL EN PL PL EN`
- Browser-measured collapsed language overlay correction:
  - vertical badge remains at `38 / 756 / 32 / 172`
  - language button remains at `38 / 936 / 32 / 32`
  - collapsed disclaimer remains at `82 / 504 / 24 / 464`
  - language panel overlays at `78 / 800 / 88 / 168`
- Browser-measured collapse icon fix:
  - opened default: `4 / 8 / 4` dots in an `8 x 32` control, colors `#e7e7e7 / #a9a9a9 / #e7e7e7`
  - opened hover: same geometry, all dots `#101010`
  - collapsed default: left column `4 / 8 / 4`, right column `4 / 4 / 4`, in a `16 x 32` control
  - collapsed hover: same geometry, all dots `#101010`
- QA screenshots:
  - `docs/audit-screenshots/sidebar-semantic-pass-2026-05-15.png`
  - `docs/audit-screenshots/sidebar-updated-left-section-2026-05-17.png`
  - `docs/audit-screenshots/sidebar-collapse-icon-open-hover-2026-05-17.png`
  - `docs/audit-screenshots/sidebar-collapse-icon-collapsed-hover-2026-05-17.png`
  - `docs/audit-screenshots/sidebar-collapsed-language-overlay-2026-05-17.png`
