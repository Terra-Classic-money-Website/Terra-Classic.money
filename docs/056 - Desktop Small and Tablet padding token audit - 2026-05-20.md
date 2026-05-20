# Desktop Small and Tablet padding token audit

Created: 2026-05-20

## Scope

Audited the `designsystem.html` Paddings section for the `Desktop Small + Tablet` scale against the rendered homepage at:

- `1400px` Desktop Small
- `1299px` Tablet upper edge
- `1200px` Tablet
- `768px` Tablet lower edge

No breakpoint definitions were changed.

## Findings

- Most `Desktop Small + Tablet` padding tokens already matched rendered homepage padding.
- `Topbar page gutter` was stale in `designsystem.html`: the token said `88px 16px 16px`, while tablet rendered `96px 16px 16px`.
- The tablet `what-video-button` play CTA used a hard-coded `24px 28px` inset, while the shared Desktop Small play CTA token remains `24px 32px`.
- Capability card CTA buttons used a compact `0 18px` inset at Desktop Small + Tablet, but that value was not represented as its own design-system token.

## Changes

- Updated `--tc-padding-page-gutter-topbar-desktop-small-tablet` to `96px 16px 16px`.
- Rewired tablet `main` topbar padding to use `--tc-padding-page-gutter-topbar`.
- Added `--tc-padding-play-cta-tablet` and made the active `--tc-padding-play-cta` alias resolve to it only in the `768px-1299px` tablet range.
- Rewired the tablet `what-video-button` padding to `--tc-padding-play-cta`.
- Added capability CTA padding tokens and rewired `.capability-cta` breakpoint padding through those tokens.
- Added `Capability CTA inset` and `Tablet play CTA inset` rows to `designsystem.html`.

## Validation results

Rendered QA confirmed:

- Desktop Small `1400px`
  - main: `16px`
  - capability CTA: `0 18px`
  - play CTA: `24px 32px`
  - capability card: `24px`
  - standard sections: `96px 48px`
  - native assets: `96px 48px 56px`
  - strengths: `60px 48px 96px`
- Tablet `1299px`, `1200px`, and `768px`
  - main: `96px 16px 16px`
  - topbar: `24px`
  - capability CTA: `0 18px`
  - play CTA: `24px 28px`
  - capability card: `24px`
  - standard sections: `96px 48px`
  - native assets: `96px 48px 56px`
  - strengths: `60px 48px 96px`

`designsystem.html` exposes the new token rows and resolves:

- `--tc-padding-page-gutter-topbar-desktop-small-tablet`: `96px 16px 16px`
- `--tc-padding-capability-cta-desktop-small-tablet`: `0 18px`
- `--tc-padding-play-cta-tablet`: `24px 28px`
