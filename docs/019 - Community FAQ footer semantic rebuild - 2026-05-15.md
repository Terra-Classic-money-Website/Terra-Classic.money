# Community FAQ Footer Semantic Rebuild

## Scope

Rebuilt the `Join Terra Classic community`, `Frequently asked questions`, and footer blocks as real React/HTML/CSS matching the Figma desktop sections.

## Figma Sources

- Community: `1612:2159`, target size `1288 x 452`
- FAQ: `1612:2168`, target size `1288 x 1825`
- Footer: `1612:2263`, target size `1288 x 138`

## Exported Assets

- `public/assets/community-agora-figma.png`
- `public/assets/community-github-figma.svg`
- `public/assets/community-discord-figma.png`
- `public/assets/faq-link-arrow.svg`
- `public/assets/footer-heart.svg`
- `public/assets/footer-back-top-arrow.svg`

## Implementation Notes

- Community buttons now use the exact Figma icon crops and `381.33px` three-column distribution via a `1160px` grid.
- FAQ now uses compact Figma link rows: `24px` question rows, `16px` vertical gaps, and `1px` dividers rather than the previous oversized accordion rows.
- FAQ remains keyboard-accessible with `aria-expanded` / `aria-controls`; answers stay hidden by default because Figma only provides visible closed-state questions.
- Footer now matches the updated Figma layout: links at top, credit row at `37px`, full-width back-to-top pill at `82px`, and exact exported heart/arrow assets.
- `DawidSkinder.pl` is linked through the centralized `links.dawidSkinder` URL.
- FAQ arrow SVG uses the exported Figma `#E7E7E7` fill at full opacity.

## Validation

- `npm run build`
- Browser QA at fixed `1632 x 1200` viewport confirmed:
  - community: `1288 x 452`
  - community copy: `64 / 60 / 764 / 216`
  - community buttons: `64 / 340 / 1160 / 56`
  - FAQ: `1288 x 1825`
  - FAQ title: `64 / 56 / 713 / 56`
  - FAQ grid: `64 / 176 / 1160 / 1585`
  - footer: `1288 x 138`
  - footer links: `64 / 0 / 269 / 16`
  - footer credit: `64 / 37 / 665 / 24`
  - back-to-top: `64 / 82 / 1160 / 56`
- Follow-up validation after footer update:
  - back-to-top: `64 / 82 / 1160 / 56`
  - FAQ arrow opacity: `1`
  - footer credit link: `https://www.dawidskinder.pl`
- QA screenshot: `docs/audit-screenshots/community-faq-footer-rebuild-1632-2026-05-15.png`
