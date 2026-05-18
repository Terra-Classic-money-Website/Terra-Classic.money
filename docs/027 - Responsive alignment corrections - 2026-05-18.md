# Responsive alignment corrections

Created: 2026-05-18

## Purpose

Correct the visual alignment regressions introduced by widening the homepage content column while preserving the fixed left sidebar behavior.

## Scope

- Expanded the "What is Terra Classic?" editorial copy column so the left text uses the available content width beside the popular topics column.
- Re-centered the "What is Terra Classic?" visual composition around the section centerline so wider viewports reveal more side artwork instead of shifting the main orb.
- Updated capability cards so copy fills the available card width and card artwork is centered in the available visual space.
- Re-centered protocol product visuals in each product panel.
- Changed protocol vertical dividers to percentage positions at 20%, 40%, 60%, and 80%, so they always divide each panel into five equal columns.
- Re-centered the decentralization planets artwork and restored the three metric cards to fixed design sizes on desktop and medium desktop widths.

## Constraints

- No sidebar, mobile drawer, or left navigation behavior was changed.
- The project remains static and compatible with GitHub Pages hosting.
- The correction stays in the current design-system CSS layer rather than introducing JavaScript layout logic.

## Validation plan

Run:

```bash
npm run typecheck
npm run check
```

Rendered QA should verify:

- The main content has no horizontal page scroll.
- The "What is Terra Classic?" visual centerline matches the widened section.
- Capability images and text align within wider cards.
- Protocol artwork centers in each panel and divider lines split the panel into five equal parts.
- The decentralization title uses one line where the content width allows, and the three metric boxes keep their design dimensions on desktop.

## Validation record

Completed during implementation:

- `npm run check` passed.
- Browser QA at `1920 x 1080`, `1440 x 1080`, and `390 x 844` confirmed no horizontal document scroll.
- Browser geometry checks confirmed:
  - "What is Terra Classic?" main artwork center delta: `0px`
  - first capability card image center delta: `0px`
  - staking, swap, and forex planet center delta: `0px`
  - decentralization planets center delta: `0px`
  - protocol divider offsets match the expected 20%, 40%, 60%, and 80% positions
  - desktop metric card widths remain `225px`, `270px`, and `311px`
- Browser interaction check confirmed the video explainer modal still opens and closes from the centered CTA.
