# Roadmap page row cleanup

Creation date: 2026-05-26

## Scope

Removed the selected roadmap rows from the production Roadmap subpage only.

Rows hidden on `roadmap.html`:

- Terra Classic L1
- TerraPort
- Terra Classic SDK
- Selenium Finance
- Garuda

## Implementation

The shared roadmap data in `src/data/roadmap.ts` was not changed because that file is also consumed by the internal `designsystem.html` roadmap specimen.

The cleanup is page-scoped in `src/App.tsx` through a production Roadmap-page filter, so the current subpage can be simplified without changing the design-system component or its specimen data.

The Roadmap intro copy was also tightened from "Terra Classic L1 work" to "core protocol work" so the removed row name does not remain visible elsewhere on the subpage.

## Validation plan

- Run `npm run typecheck`.
- Run `npm run check`.
- Render-check `roadmap.html` locally at desktop, tablet, and mobile widths.
- Confirm the selected rows are absent from the Roadmap subpage while the remaining timeline still renders without console errors, text overlap, or document-level horizontal overflow.

## Validation result

Completed on 2026-05-26.

- `npm run typecheck` passed.
- `npm run check` passed, including the production Vite build.
- Browser QA on `http://127.0.0.1:5174/roadmap.html` passed at:
  - Desktop Big `1632x1000`
  - Tablet `1024x900`
  - Mobile `390x844`
- The Roadmap subpage now renders 3 roadmap rows:
  - Market Module 2.0
  - Forex Protocol
  - Juris Protocol
- The removed row names are absent from the rendered Roadmap rows and page copy.
- The two roadmap group bands still render.
- The timeline keeps internal horizontal scrolling.
- No document-level horizontal overflow was detected.
- No Vite/framework overlay was present.
- Browser console warnings/errors were clean during validation.

QA screenshots:

- `docs/audit-screenshots/roadmap-row-cleanup-desktop-2026-05-26.jpg`
- `docs/audit-screenshots/roadmap-row-cleanup-tablet-2026-05-26.jpg`
- `docs/audit-screenshots/roadmap-row-cleanup-mobile-2026-05-26.jpg`
