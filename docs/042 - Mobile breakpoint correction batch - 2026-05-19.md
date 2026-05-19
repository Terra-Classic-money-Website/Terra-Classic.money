# Mobile breakpoint correction batch

## Scope

This task fixes the next set of Mobile breakpoint issues reported after the first Figma mobile layout pass.

The corrections are based on:

- user screenshots for the broken rendered states
- Figma mobile frame `1686:683`
- Figma section nodes:
  - `1712:766` - What is Terra Classic
  - `1712:824` - What Terra Classic enables

## Current phase

The project remains in responsive correction and implementation hardening. This is still homepage breakpoint fidelity work, not a new feature or roadmap expansion.

## Roadmap and constraints

- The work fits the current responsive correction phase.
- The site remains GitHub Pages-compatible static React/Vite.
- The design-system typography classes remain token-driven.
- Figma `M` naming is treated as Figma-internal naming and is not copied into code.
- Mobile corrections must not reintroduce desktop/tablet behavior changes.

## Fixes implemented

### Mobile hamburger menu

- Replaced the Mobile drawer's left-slide behavior with a full-viewport overlay.
- The open state now uses opacity/scale motion rather than horizontal translation.
- The mobile topbar becomes part of the open menu state:
  - fixed to the top of the overlay
  - full viewport width
  - 64px tall
- The page body is locked while the mobile menu is open.
- The hidden mobile overlay no longer intercepts taps while closed.

### Higher-resolution Mobile hero

- Centered the hero planet within the hero panel.
- Made the planet scale proportionally with the hero width while preserving the 360px Figma position.
- Repositioned and enlarged the hero glow fields so the glow sits behind the planet and reaches upward behind the three black hero boxes.

### Support and What section spacing

- Restored the 48px gap between the hero and the support-logo strip.
- Preserved the Figma support strip height and 24px inner horizontal padding.
- Restored the divider and following section rhythm around the `What is Terra Classic?` section.

### What is Terra Classic visual

- Rebuilt the Mobile visual area to follow the Figma compact composition:
  - 276px visual height
  - centered 260px main planet at the 360px frame
  - side planets partially clipped at the edges
  - smaller circular avatars
  - 80px centered black circular video control
- Kept the video button accessible by preserving its readable label for assistive technology while visually reducing the Mobile control to the Figma icon treatment.

### Capabilities cards

- Updated all cards in `Explore what Terra Classic enables:` to use the same Mobile card model as the Figma-designed `Passive income` card:
  - 344px card width at 360px effective viewport
  - 16px top padding, 24px horizontal padding, 24px bottom padding
  - 16px internal vertical rhythm
  - full-width 48px pill CTA
  - centered image area with 24px vertical padding
- Removed the extra section-side padding that was shrinking the cards below the Figma width.

## Validation results

Rendered Browser validation:

- Effective 320px client width: no horizontal overflow.
- Effective 360px client width: no horizontal overflow.
- Effective 560px high Mobile width: no horizontal overflow.
- Mobile typography audit: zero `tc-type-*` token mismatches.
- Full-screen mobile menu:
  - `aria-expanded="true"` after opening
  - sidebar overlay is `360px` wide at `360px` client width
  - topbar overlay is `360px` wide at `360px` client width
  - body lock is active while menu is open
- Higher Mobile hero:
  - planet center delta from hero center is `0`
  - planet scales from about `296px` at 360px to about `446px` at 560px
- Console warnings/errors: none captured during the mobile audit.

Final project gate:

- `npm run check` passed.
