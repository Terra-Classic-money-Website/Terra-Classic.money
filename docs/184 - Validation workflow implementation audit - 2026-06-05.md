# Validation workflow implementation audit - 2026-06-05

## Scope

Audited the implementation completed from `182 - Validation workflow research - 2026-06-05.md`.

This audit checks the recommended implementation sequence item by item and records whether any follow-up work was required.

## Sequence audit

| Step | Requirement | Status | Evidence |
| --- | --- | --- | --- |
| 1 | Add `check:quick`, `check:build`, `check:i18n`, `check:i18n-rendered`, and `check:deploy` aliases. | Complete | `package.json` includes all five aliases. |
| 2 | Add route and locale filters to `scripts/audit-rendered-i18n.mjs`. | Complete | Script supports `I18N_AUDIT_ROUTES` and `I18N_AUDIT_LOCALES`; unknown route filters fail with available route names. |
| 3 | Add route and viewport filters to `scripts/visual-regression.mjs`. | Complete | Script supports `VISUAL_ROUTES` and `VISUAL_VIEWPORTS`; unknown route filters fail with available route names. |
| 4 | Add one or two route wrappers for frequently edited surfaces, starting with roadmap. | Complete | Added `check:roadmap` and `visual:roadmap`. |
| 5 | Update `- START.md` with a tiered validation decision tree. | Complete | Runbook now separates quick, build, translation, roadmap, asset, visual, performance, analytics, and full production gates. |
| 6 | Optionally optimize the hourly analytics workflow after local tiering is stable. | Complete after owner instruction | Dawid asked to fully finish the implementation and push it to `main`; `.github/workflows/website-analytics.yml` now uses `npm run check:build` for scheduled analytics refreshes while `.github/workflows/deploy.yml` keeps full `npm run check`. |

## Corrections from this audit

No missing implementation items were found.

The optional analytics workflow optimization was completed after Dawid confirmed he wanted the whole doc 182 implementation finished and pushed.

## Validation evidence

Previously completed during implementation:

- `npm run check:quick` passed.
- `npm run check:i18n` passed.
- `npm run check:roadmap` passed.
- `npm run visual:roadmap` passed.
- `npm run check` passed.

Additional audit checks:

- `npm run check:build` passed.
- `I18N_AUDIT_ROUTES=missing node scripts/audit-rendered-i18n.mjs` failed immediately with a readable unknown-route error and available route names.
- `VISUAL_ROUTES=missing node scripts/visual-regression.mjs` failed immediately with a readable unknown-route error and available route names.

## Completion verdict

All implementation work from the recommended sequence is complete.

The production code deploy workflow remains strict. The scheduled analytics workflow is now lighter but still requires a production build and deterministic performance budget pass before it uploads a GitHub Pages artifact.
