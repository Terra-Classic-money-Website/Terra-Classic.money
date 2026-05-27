# Decentralization Article Replacement

Created: 2026-05-26

## Scope

Replace the main article content on `decentralization.html` with the expanded Decentralization thesis supplied by Dawid.

## Implementation Plan

- Keep the existing Decentralization subpage structure, hero, resource section, references, and footer.
- Update `src/data/decentralization.ts` so the article body uses the new 15-section structure.
- Avoid new design-system patterns because this is a content replacement inside an established article layout.
- Run `npm run check` after the content update.
- Render-check the page at desktop, tablet, and mobile widths because the article is substantially longer than the previous version.

## Notes

- The `./- KNOWLEDGE` folder currently contains only `.DS_Store`, so there is no task-relevant owner-provided knowledge file to apply.
- The existing validation setup has no dedicated test files; the configured full local gate is `npm run check`, which runs TypeScript build mode and the Vite production build.
- The existing two-paragraph article lede is preserved above section `01 Opening thesis`; only the main article body below it was replaced.
- The hero read-time badge is now calculated from the rendered article text so it does not drift when the article body changes.

## Validation Results

- `npm run check` passed after the article replacement and after restoring the lede.
- Local Vite dev server used `http://127.0.0.1:5174/` because port `5173` was already in use.
- Rendered Chrome QA checked `http://127.0.0.1:5174/decentralization.html` at:
  - Desktop: `1500 x 1000`
  - Tablet: `900 x 1000`
  - Mobile: `390 x 844`
- Rendered QA confirmed:
  - `15` article sections render.
  - The original two-paragraph lede renders above section `01`.
  - The first section heading is `Opening thesis`.
  - The final line `Blockchain so decentralized, it's out of this world.` is present.
  - The computed read-time badge renders as `17 MIN READ`.
  - No document-level horizontal overflow was detected at the checked breakpoints.
- QA screenshots saved:
  - `docs/audit-screenshots/decentralization-article-replacement-desktop-2026-05-26.png`
  - `docs/audit-screenshots/decentralization-article-replacement-tablet-2026-05-26.png`
  - `docs/audit-screenshots/decentralization-article-replacement-mobile-2026-05-26.png`
