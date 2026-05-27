# About Figma Section Rebuild

## Scope

Rebuilt the first five `about.html` sections from the Figma node `1811:789`, stopping before `List of contributors`.

Sections changed:
- Hero
- Who owns Terra Classic?
- Independent open-source project
- Contribute to terra-classic.money
- Support the public information layer

The contributor ledger and all later About sections remain structurally unchanged.

## Implementation Notes

- Reused the existing Decentralization stats-panel mechanics for the About hero instead of creating a one-off hero system.
- Replaced the older About anchor/index intro with the new dark visual hero and CTA pair.
- Corrected the About hero to use the Decentralization hero responsive mechanics, the existing animated glow layer, product-style straight line patterning, body typography for the two smaller copy paragraphs, and a single combined `about-hero-planet2.png` image.
- Updated ownership from a numbered card timeline to the Figma-style date/owner timeline.
- Added a reusable About indexed-grid pattern for the open-source and contribution sections.
- Kept the About page-specific patterns out of `designsystem.html` after owner correction; no new About components are exposed there.
- Removed the old `supportCards` data because the Figma version now uses only two commercial/support cards.
- Removed the existing `Trust timeline` and `Contributor ledger` specimens from `designsystem.html`.

## Validation

Commands run:

```bash
npm run typecheck
npm run check
```

Both passed.

Rendered QA:
- `about.html` checked at desktop `1500 x 1000`
- `about.html` checked at desktop big `1632 x 1000`
- `about.html` checked at tablet `800 x 1080`
- `about.html` checked at mobile `390 x 844`

Browser QA confirmed:
- no horizontal overflow at checked widths
- first five sections render in the requested order
- `List of contributors` remains after the support section
- open-source section renders six cards and one visual band
- contribution section renders six cards and one visual band
- support section renders two support cards
- browser warning/error log was empty during the checked pass

Reference and QA screenshots:
- `docs/audit-screenshots/about-figma-reference-2026-05-25.png`
- `docs/audit-screenshots/about-figma-rebuild-desktop-viewport-2026-05-25.png`
- `docs/audit-screenshots/about-figma-rebuild-desktop-big-viewport-2026-05-25.png`
- `docs/audit-screenshots/about-figma-rebuild-tablet-viewport-2026-05-25.png`
- `docs/audit-screenshots/about-figma-rebuild-mobile-viewport-2026-05-25.png`
- `docs/audit-screenshots/about-figma-rebuild-sections-viewport-2026-05-25.png`

## Follow-up: Hero Alignment Correction

Corrected the About hero desktop layout against the Figma reference:
- removed the extra top margin from the hero H1 so the headline starts at the panel padding, matching the 64px top inset in Figma
- left-aligned the bottom CTA row instead of inheriting the right-aligned flex behavior from the reused stats-panel mechanics

No `designsystem.html` changes were made.

Validation:
- `npm run check` passed
- rendered `about.html` at `1632 x 1220`; confirmed hero H1 inset is `64px` from top/left and CTA row inset is `64px` from left/bottom
- rendered `about.html` at `390 x 844`; confirmed no horizontal overflow
- browser warning/error logs were empty during both checks

QA screenshot:
- `docs/audit-screenshots/about-hero-correction-desktop-2026-05-25.png`

## Follow-up: Ownership Section Correction

Corrected the `Who owns Terra Classic?` section against the Figma reference and the homepage `What is Terra Classic?` editorial split pattern:
- restored black text hierarchy for the ownership copy instead of inherited muted paragraph styling
- rebuilt the right-side timeline as Figma-style rows with horizontal separators instead of a vertical node timeline
- added the Terraform Labs identity image and the `COMMUNITY OWNED` pill identity used by the design
- tightened the mobile badge sizing so the timeline stays readable without horizontal overflow

No `designsystem.html` changes were made.

QA screenshots:
- `docs/audit-screenshots/about-ownership-desktop-2026-05-25.png`
- `docs/audit-screenshots/about-ownership-tablet-2026-05-25.png`
- `docs/audit-screenshots/about-ownership-mobile-2026-05-25.png`

## Follow-up: Ownership Responsive Correction

Corrected ownership-section behavior on tablet and mobile:
- removed the tablet `720px` timeline cap so the timeline spans the full section content width after the split collapses to one column
- added explicit mobile spacing between the copy/CTA block and the timeline so the CTA cannot collide with the first timeline row
- constrained mobile owner identities so the Terraform Labs logo, `COMMUNITY OWNED` badge, and final owner text stay inside the timeline row without horizontal overflow

No `designsystem.html` changes were made.

Validation:
- `npm run check` passed
- rendered `about.html` at `1280 x 1080`, `647 x 1080`, `430 x 1080`, and `375 x 1080`
- confirmed no horizontal overflow at the checked widths
- confirmed the tablet timeline uses the full available section content width
- confirmed mobile CTA/timeline spacing has no overlap
- browser runtime warning/error logs were empty during the checked pass

QA screenshots:
- `docs/audit-screenshots/about-ownership-final-tablet-2026-05-25.png`
- `docs/audit-screenshots/about-ownership-final-mobile-wide-2026-05-25.png`
- `docs/audit-screenshots/about-ownership-final-mobile-narrow-2026-05-25.png`
- `docs/audit-screenshots/about-ownership-final-mobile-375-2026-05-25.png`

## Follow-up: Open Source Section Correction

Corrected the `Terra-classic.money is an independent open-source project` section against the Figma reference and the homepage `Terra Classic strenghts:` grid behavior:
- restored the desktop 3-column indexed-card grid instead of collapsing it early below `1500px`
- kept the smaller tablet breakpoint aligned with the homepage strengths section by using 2 columns only at `768px - 899px`
- changed card headings/body copy to the same larger live typography used by the Figma section
- replaced the stretched stats-planet implementation with the exact Figma visual band asset for the open-source section
- restored black paragraph color for the second intro paragraph instead of inherited muted About copy styling

No `designsystem.html` changes were made.

Validation:
- `npm run check` passed
- rendered `about.html` at `1632 x 1220`, `1280 x 1080`, `800 x 1080`, and `430 x 1080`
- confirmed no horizontal overflow at the checked widths
- confirmed the visual band asset loads at its expected `1160 x 384` natural size
- confirmed desktop/tablet grid columns follow the homepage strengths responsive model
- browser runtime warning/error logs were empty during the checked pass

QA screenshots:
- `docs/audit-screenshots/about-open-source-final-desktop-2026-05-25.png`
- `docs/audit-screenshots/about-open-source-final-desktop-band-2026-05-25.png`
- `docs/audit-screenshots/about-open-source-final-tablet-2026-05-25.png`
- `docs/audit-screenshots/about-open-source-final-tablet-small-2026-05-25.png`
- `docs/audit-screenshots/about-open-source-final-mobile-2026-05-25.png`
- `docs/audit-screenshots/about-open-source-final-mobile-band-2026-05-25.png`

## Follow-up: Static About Cards

Removed hover behavior from informational card boxes on the About page:
- removed hover background/translate behavior from indexed cards used by the open-source and contribution sections
- removed hover background/translate behavior from commercial support cards
- left interactive buttons and links unchanged

No `designsystem.html` changes were made.

## Follow-up: Open Source Visual Band Layering

Rebuilt the open-source section visual band as separate implementation layers instead of a flattened image:
- animated background/glow layer
- vertical line overlay layer
- separate planet image layer

The planet layer now preserves its natural `801 x 384` aspect ratio and is clipped by the band instead of being stretched to the container. The previous flattened band asset was removed from use.

No `designsystem.html` changes were made.

Validation:
- `npm run check` passed
- rendered the open-source visual band on desktop and mobile
- confirmed the DOM uses separate background, line, and planet layers
- confirmed the rendered planet ratio matches the source asset ratio
- confirmed the previous flattened `about-open-source-band.png` asset is no longer referenced

QA screenshots:
- `docs/audit-screenshots/about-open-source-layered-ratio-desktop-2026-05-25.png`
- `docs/audit-screenshots/about-open-source-layered-ratio-mobile-2026-05-25.png`
