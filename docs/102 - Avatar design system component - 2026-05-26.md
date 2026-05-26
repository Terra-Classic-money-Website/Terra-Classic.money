# Avatar Design System Component

Created: 2026-05-26

## Scope

Added a new `Avatar` component specimen to the `designsystem.html` Components section.

The component documents the shared circular identity pattern used across directories, roadmap rows, and contributor lists.

## Variants

The specimen includes four production-relevant forms:

- Image avatar: used for project, app, tool, market, and resource logos.
- Colored initials avatar: used in roadmap rows where the background is derived from the row accent color.
- Gray initials avatar: used in roadmap rows when the abbreviation sits on a neutral gray background.
- Contributor initials avatar: used on the About terra-classic.money contributor list with the fixed light-gray background.

## Implementation Notes

- Added `Avatar` to the design-system component index after `Founder story`.
- Reused current production classes:
  - `directory-list-item__avatar`
  - `roadmap-row__avatar`
  - `about-contributor-avatar`
- Added design-system-only gallery layout in `src/styles/designsystem.css`.
- Adjusted design-system-only component card index styles so `Open work card` and `Roadmap timeline` keep their preview behavior after the new component insertion.

No production page behavior change is intended.

## Validation Plan

- Run `npm run check`.
- Open `designsystem.html#components` locally and confirm the `Avatar` component renders all four variants.

## Validation Results

- `npm run check` passed.
- Local browser QA passed at `http://127.0.0.1:5174/designsystem.html#components`.
- Confirmed the `Avatar` component rendered 4 variants:
  - image/logo avatar
  - `L1` colored roadmap initials avatar
  - `MM2` gray roadmap initials avatar
  - `DS` About contributor initials avatar
- Confirmed all checked variants render at `48px` by `48px`.
- Confirmed no page-level horizontal overflow in the checked viewport.
