# Support logo strip semantic rebuild

Created: 2026-05-15

## Purpose

This pass rebuilds the `Decentralization supported by:` strip under the hero as real HTML/CSS with individual Figma-exported logo assets instead of a flattened strip image.

## Source Of Truth

- Figma file: `dZxJU7AlVV2k9ovNmmbeLI`
- Target frame: `1612:1342`
- Support strip node: `1612:1391`

## Implemented Values

- Section: `1288 x 180`
- Section padding: `56px 64px`
- Vertical gap: `16px`
- Label typography: Figtree `12px / 24px`, `600`
- Logo row: `1160.269 x 28`
- Row layout: flex, `justify-content: space-between`

## Logo Assets

- `public/assets/support-binance.svg`
- `public/assets/support-circle.png`
- `public/assets/support-franklin.png`
- `public/assets/support-paypal-usd.png`
- `public/assets/support-etherfuse.png`

The repeated Binance, Circle, and Franklin Templeton marks remain repeated because the Figma design repeats them in the row.

## Cleanup

Removed the obsolete flattened `public/assets/support-logos.png` asset.

## Validation Notes

- `npm run check` passed.
- Browser viewport: `1632 x 1200`.
- Browser-measured support strip:
  - strip: `x=328`, `y=888`, `w=1288`, `h=180`
  - label: `x=392`, `y=944`, `w=169`, `h=24`
  - logo row: `x=392`, `y=984`, `w=1160`, `h=28`
  - logo assets all loaded successfully
- QA screenshot saved to `docs/audit-screenshots/support-strip-semantic-pass-2026-05-15.png`.

Follow-up spacing correction: the strip now has the Figma `8px` gap after the hero and the separate divider/gap before the `What is Terra Classic?` section, placing that section at `y=1085`.
