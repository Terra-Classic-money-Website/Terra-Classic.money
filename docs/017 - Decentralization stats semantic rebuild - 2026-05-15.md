# Decentralization Stats Semantic Rebuild

## Scope

Rebuilt the `Efficiency driven by decentralization` section as live React/HTML content over an exported Figma visual background.

## Figma Source

- Frame: `Decentralization`
- Node: `1612:2077`
- Target size: `1288 x 1208`
- Exported background artwork: `public/assets/stats-visual-bg.png`

## Implementation Notes

- The section container now matches the desktop Figma geometry at `1288 x 1208`.
- The headline, paragraph, metrics, LUNC logo, and CTA are live semantic content instead of flattened text in an image.
- Metric card positions, widths, heights, and bottom CTA geometry follow the Figma node coordinates:
  - Header group: `64 / 64 / 1160 / 240`
  - Metrics group: `64 / 912 / 1160 / 152`
  - CTA: `64 / 1088 / 474 / 56`
- Responsive overrides keep the section usable below the exact desktop breakpoint without inventing a separate mobile design system.

## Validation

- `npm run build`
- Browser QA at a fixed `1632 x 1200` viewport confirmed:
  - section size: `1288 x 1208`
  - heading position: `64 / 64 / 1160 / 144`
  - paragraph position: `64 / 240 / 1160 / 64`
  - metric row position: `64 / 912 / 1160 / 152`
  - CTA position: `64 / 1088 / 474 / 56`
- QA screenshot: `docs/audit-screenshots/stats-rebuild-1632-2026-05-15.png`
