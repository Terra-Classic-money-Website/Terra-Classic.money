# Figma QA audit

Created: 2026-05-15

## Purpose

This document records a visual QA pass comparing the current React implementation against the Figma target frame:

`Home page v4 - Desktop big - 1632 exact - 1632+`

Figma node:

`1612:1342`

Reference screenshot:

`/Users/dawidskinder/Library/CloudStorage/Dropbox/Projekty/LUNC/LUNC Website/UX:UI/Terra Classic www 2026 - Home page v4 - Desktop big - 1632 exact - 1632+.png`

Current implementation screenshot:

`docs/audit-screenshots/current-home-clean-1632.png`

Browser-captured implementation screenshot:

`docs/audit-screenshots/current-home-browser-1632.png`

## Verdict

The current frontend is a directional scaffold, not a pixel-perfect Figma implementation.

It has the right broad section order and some correct copy, but the implementation is materially incomplete against the target design. Treat it as roughly 20-30% of the final visual implementation quality.

## Figma structure that must be matched

- Frame size: `1632 x 17168`.
- Sidebar width: `312`.
- Content frame: `1320` wide, starting at x `312`.
- Standard content inset: `16`.
- Standard major section/card width: `1288`.
- Inner content offset inside major sections: usually `64`.
- Hero position: x `328`, y `104`, width `1288`, height `776`.
- Support/logo strip position: y `888`, height `180`.
- What-is section position: y `1085`, height `1608`.
- Capabilities section position: y `2701`, height `2056`.
- Founder stories: y `13437`, height `1219`.
- Community: y `14664`, height `452`.
- FAQ: y `15133`, height `1825`.
- Footer: y `16966`, height `138`.

## Major gaps

### 1. Asset completeness

The rendered page only exposed 26 image assets after full-page scrolling. Figma contains substantially more visual assets:

- Hero background asset and foreground orb treatment.
- Hero CTA group logos/icons.
- What-is section left/right background objects.
- Eight circular avatar/photos around the main orb.
- Exact video pill component.
- Capability-card illustrations and exact crops.
- Protocol panel background/UI/mockup compositions.
- Native asset wallet/token icons and token rows.
- Strengths section visual crop and exact card treatments.
- Decentralization stats panel planets/orbit assets.
- Founder portraits and carousel controls.
- Community button icons.
- Footer heart/arrow assets.

Current implementation uses several broad exported images, but many Figma child assets/components are either absent, simplified, reused, or positioned differently.

### 2. Section geometry

The current site does not yet follow the Figma frame as a fixed 1632px composition.

Examples:

- The What-is visual area is much shorter and loses the full Figma composition with side illustrations and avatar ring.
- The capabilities grid is shorter than the Figma section and lacks exact asymmetric card sizing.
- Protocol panels visually resemble the design, but their inner compositions are simplified and not aligned to exact Figma coordinates.
- The native-assets section is structurally present, but not visually close to the Figma wallet/list composition.
- Founder cards are placeholders compared with the final portrait/card treatment.

### 3. Typography and component fidelity

- The broad font family and major headline scale are close, but many component-level sizes, weights, line heights, and card paddings are not exact.
- Link-arrow rows, buttons, FAQ links, community buttons, carousel arrows, and language control are simplified.
- Current components do not fully use the Figma variants for hover, active, open/collapsed, and visual states.

### 4. Backgrounds, crops, and layer stacking

- Figma relies on layered objects and precise crops, especially in the hero, What-is visual, capability cards, protocol panels, and stats panel.
- Current implementation often uses one large decorative image per section, losing the layered composition.
- Several objects are too large/small or shifted relative to their Figma bounding boxes.

### 5. Content completeness

- FAQ questions exist, but Figma answers were not visible in inspected layers; current answer text is placeholder.
- Several URLs remain TODO placeholders.
- Some labels are still implementation placeholders or simplified destinations.

## Recommended rebuild approach

Do not patch this with small CSS tweaks. The next implementation pass should be a Figma-first reconstruction:

1. Export section-level Figma screenshots for every major section.
2. Export all editable small icons/logos as SVG where possible.
3. Export complex 3D/mockup groups as transparent PNG/WebP at exact displayed bounds.
4. Rebuild desktop layout against the 1632px frame coordinates first.
5. Match each section's x/y/width/height and inner offsets before responsive work.
6. Recreate reusable Figma components: buttons, link arrows, FAQ links, sidebar states, founder cards, community buttons.
7. Use browser screenshots at 1632px after each section and compare visually against the Figma screenshot.
8. Only after desktop is close, adapt tablet/mobile.

## Validation notes

- Browser QA used the in-app browser at a 1632px viewport.
- A clean-profile 1632px screenshot was captured to avoid localStorage changing announcement/sidebar state.
- Browser asset inventory after full-page scrolling found no broken rendered images, but confirmed the page is using far fewer image assets than the Figma design requires.
