# Sidebar semantic rebuild

Created: 2026-05-15

## Purpose

This pass rebuilds the persistent left navigation as real HTML/CSS using Figma measurements and exported assets. The sidebar is part of every desktop comparison, so its visual fidelity must be corrected before continuing section-by-section rebuild work.

## Source Of Truth

- Figma file: `dZxJU7AlVV2k9ovNmmbeLI`
- Target frame: `1612:1342`
- Sidebar instance: `1612:1344`

## Implemented Values

- Expanded sidebar width: `312px`.
- Sidebar padding: `32px 16px 32px 32px`.
- Logo row height: `48px`.
- Logo asset size: `221.245 x 46`.
- Collapse control: `8 x 32`, Figma dotted panel asset.
- Nav typography: Figtree `14px / 16px`, `600`.
- Nav vertical gap: `16px`.
- Primary/external nav group gap: `32px`.
- Language selector: `264 x 32`, `64px` radius, `16px` horizontal padding.
- Language label typography: Figtree `12px / 16px`, `600`.
- Disclaimer typography: title `9px / 8px`, body `8px / 12px`.

## Assets Added Or Replaced

- Replaced `public/assets/sidebar-logo.svg` from the Figma sidebar instance.
- Added `public/assets/sidebar-collapse-control.svg`.
- Added `public/assets/sidebar-external-arrow.svg`.
- Added `public/assets/language-icon.svg`.
- Added `public/assets/language-arrow.svg`.
- Re-exported the external-link icon from the isolated Figma vector node and render it with the same `-6.67%` inset/overflow behavior as the Figma component.

## Interaction Boundary

The existing interactions were preserved:

- sidebar collapse/expand,
- persisted collapsed state,
- active section highlighting,
- language dropdown,
- mobile drawer behavior.

This pass focuses on the expanded desktop sidebar fidelity. The collapsed state uses the Figma `80 x 48` collapsed-logo asset, which includes the Terra icon and dotted control in the correct proportions. The whole collapsed mark acts as the expand control.

## Validation Notes

- `npm run check` passed.
- Browser viewport: `1632 x 1000`.
- Browser-measured expanded sidebar:
  - sidebar: `312px` wide
  - logo: `221 x 46`
  - collapse control: `8 x 32`
  - external icon: `11 x 11`
  - language trigger: `264 x 32`
  - language icon: `11 x 12`
  - language arrow: `10 x 9`
- QA screenshot saved to `docs/audit-screenshots/sidebar-semantic-pass-2026-05-15.png`.
