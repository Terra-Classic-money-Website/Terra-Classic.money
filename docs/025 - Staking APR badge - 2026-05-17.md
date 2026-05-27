# Staking APR badge

## Scope

Add the Figma APR badge component to the local design system and use it in the Staking Protocol product panel header.

## Design references

- Figma homepage context: `dZxJU7AlVV2k9ovNmmbeLI`, node `1612:1342`.
- Figma APR component: `dZxJU7AlVV2k9ovNmmbeLI`, node `1665:766`.
- APR badge visual spec:
  - 40px height.
  - 2px LUNC yellow border.
  - 16px horizontal padding.
  - 8px gap between value and label.
  - APR value uses the H5 sizing: 20px size, 24px line-height, 500 weight.
  - APR label uses 10px size, 12px line-height, 800 weight, 5px letter spacing.

## Runtime data

The Staking Protocol badge fetches live APR from:

```text
https://validator.info/api/terra-classic/blockchain/apr-info
```

The API currently returns a JSON object with an `apr` number and a denom-level APR breakdown. The website uses only the top-level `apr` value and formats it to two decimal places.

No static APR fallback is used. If the API fails or returns an invalid value, the badge remains visible and shows an unavailable state instead of fabricating a number.

## Implementation notes

- Added shared `AprBadge` component in `src/components/AprBadge.tsx`.
- Added shared `.apr-badge` styles in `src/styles/global.css`.
- Added the APR badge specimen to `designsystem.html` through `src/designsystem.tsx`.
- Added a client-side APR fetch hook in `src/App.tsx` and rendered the badge only on the Staking Protocol panel.

## Validation

Executed validation:

- `npm run check` passed.
- Verified `https://validator.info/api/terra-classic/blockchain/apr-info` returns CORS-enabled JSON with a top-level `apr` number.
- Opened `http://127.0.0.1:5175/designsystem.html` and confirmed the APR badge specimen renders at `137 x 40`, with a 2px `rgb(249, 216, 94)` border.
- Opened the homepage Staking Protocol section and confirmed the live API value renders as `3.42%`.
- Captured desktop semantic QA at `1632 x 1000`; the APR badge sits after the Staking Protocol heading and the `ACTIVE` badge remains on the far right.
- Captured mobile semantic QA at `390 x 900`; the title, APR badge, status badge, and body copy stack without overlap.

Artifacts:

- `docs/audit-screenshots/designsystem-apr-badge-2026-05-17.png`
- `docs/audit-screenshots/staking-apr-badge-2026-05-17.png`
- `docs/audit-screenshots/staking-apr-badge-desktop-1632-semantic-2026-05-17.png`
- `docs/audit-screenshots/staking-apr-badge-mobile-390-2026-05-17.png`
