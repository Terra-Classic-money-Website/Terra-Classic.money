# Responsive visual correction follow-up

Created: 2026-05-18

## Purpose

Resolve the second responsive layout correction pass for capability cards, strength visual artwork, and founder story play icons.

## Scope

- Changed capability card copy and CTA placement so every card uses the same `32px` text-to-button spacing.
- Restored horizontal capability cards to a left content zone plus right visual zone to prevent artwork from overlapping text.
- Rebuilt the strength visual tile as layered composition:
  - CSS background glow and four percentage-based vertical divider lines scale with the card.
  - `strength-orb.png` remains a separate fixed-size PNG layer so the planet does not enlarge with viewport width.
- Centered founder story play-dot groups relative to each media frame instead of using fixed Figma-era pixel offsets.

## Figma reference

Checked the supplied Figma file:

- File: `dZxJU7AlVV2k9ovNmmbeLI`
- Node: `1612:1342`

The relevant strength visual target is a `384px` tile. The implementation preserves that intent by keeping the planet fixed while allowing the containing card and background field to expand.

## Validation record

Completed during implementation:

- `npm run check` passed.
- Browser QA at `1920 x 1080` confirmed:
  - all capability card copy-to-CTA gaps are `32px`
  - Build, Layer-2, and NFT capability copy no longer overlaps artwork
  - strength visual card expands to the responsive column width while the planet remains `292px` wide
  - strength visual dividers sit at `20%`, `40%`, `60%`, and `80%`, splitting the background into five equal parts
  - founder story play icon center delta is `0px` on both axes
  - no horizontal document scroll
  - no console warnings or errors

Follow-up correction:

- Reduced the strength visual divider opacity from `18%` to `8%` so the four background lines sit closer to the subtle Figma reference and do not compete with the planet.
- `npm run check` passed after the opacity change.
