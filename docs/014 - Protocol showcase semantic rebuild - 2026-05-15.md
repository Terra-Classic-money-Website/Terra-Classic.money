# Protocol showcase semantic rebuild

## Scope

Rebuilt the three dark protocol panels from the Figma `Products` node `1612:1606`:

- `1612:1607` - Staking Protocol
- `1612:1680` - Swap Protocol
- `1612:1751` - Forex Protocol

## Figma alignment

- Each desktop panel is `1288px x 1208px` with `64px` padding and `16px` corner radius.
- Header rows use the Figma `88px` protocol icon, `72px / 72px` title type, `24px / 32px` body copy, and status badges.
- Visual compositions now use exact Figma exports for protocol planets, UI cards, confirmation cards, protocol icons, step arrows, and button arrows.
- Step cards use the Figma `3 x 381.333px` layout with `8px` gaps and `24px` internal padding.
- CTA pills now follow the Figma white / yellow / blue button treatments.

## Assets exported

- `public/assets/protocol-staking-figma.png`
- `public/assets/protocol-swap-figma.png`
- `public/assets/protocol-forex-figma.png`
- `public/assets/protocol-staking-ui-figma.png`
- `public/assets/protocol-validator-ui-figma.png`
- `public/assets/protocol-swap-ui-figma.png`
- `public/assets/protocol-deposit-ui-figma.png`
- `public/assets/protocol-mint-ui-figma.png`
- `public/assets/protocol-staking-confirmed.png`
- `public/assets/protocol-blue-confirmed.png`
- `public/assets/protocol-staking-icon.svg`
- `public/assets/protocol-swap-icon.svg`
- `public/assets/protocol-forex-icon.svg`
- `public/assets/protocol-step-arrow-long.svg`
- `public/assets/protocol-step-arrow-short.svg`
- `public/assets/protocol-button-arrow.svg`
- `public/assets/protocol-badge-active-arrow.svg`

## Validation

- `npm run check` passed after implementation.
- Browser QA ran against `http://127.0.0.1:5173/#roadmap`.
- The in-browser viewport is narrower than the 1632px Figma frame, so an intermediate `<1500px` responsive treatment was added while preserving the 1632px desktop layout.

## Known follow-up

Final protocol CTA URLs still need to replace placeholders in `src/data/links.ts`.
