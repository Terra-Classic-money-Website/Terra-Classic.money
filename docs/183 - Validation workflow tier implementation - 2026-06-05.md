# Validation workflow tier implementation - 2026-06-05

## Scope

Implemented the recommended local validation workflow from `182 - Validation workflow research - 2026-06-05.md`.

The goal was to reduce small-edit validation cost without weakening the production GitHub Pages gate.

## Changes

### npm validation tiers

Added explicit tiered npm scripts:

- `check:quick`
- `check:build`
- `check:i18n`
- `check:i18n-rendered`
- `check:roadmap`
- `check:deploy`
- `visual:roadmap`

`npm run check` remains unchanged as the full production gate.

### Rendered i18n filtering

`scripts/audit-rendered-i18n.mjs` now supports:

- `I18N_AUDIT_ROUTES`
- `I18N_AUDIT_LOCALES`

Default behavior remains a full rendered audit across all published non-default locales and all published localized routes. Filtered mode fails early if an unknown route or locale is supplied.

### Visual regression filtering

`scripts/visual-regression.mjs` now supports:

- `VISUAL_ROUTES`
- `VISUAL_VIEWPORTS`

Default behavior remains the full visual matrix. Filtered mode fails early for unknown routes or viewports and reports the active filters in the generated summary.

### Operator runbook

Updated `- START.md` so validation is documented as tiers:

- quick edit check
- production build check
- translation checks
- roadmap route check
- asset checks
- visual checks
- performance checks
- analytics feed
- full production gate

## Roadmap fit

This implements the local workflow optimization recommended in doc 182 while preserving the strict deploy path required for a live GitHub Pages website.

The implementation specifically addresses the repeated roadmap-edit case that triggered the audit: roadmap-only work can now use `npm run check:roadmap` and `npm run visual:roadmap` instead of defaulting immediately to full-site browser and visual audits.

## Validation plan

Run targeted validation first:

- `npm run check:quick`
- `npm run check:i18n`
- `npm run check:roadmap`
- `npm run visual:roadmap`

Then run the full production gate:

- `npm run check`

This validates that filtered commands work and that the unfiltered production gate is still intact.

## Validation results

Completed:

- `npm run check:quick` passed.
- `npm run check:i18n` passed.
- `npm run check:roadmap` passed.
- `npm run visual:roadmap` passed and wrote a roadmap-only visual report to `.visual-reports`.
- `npm run check` passed.

The full production gate remains unchanged and still runs:

- production build
- rendered i18n browser audit across all published localized routes
- deterministic performance budget

The final performance budget result remained inside limits:

- runtime `dist`: 16.73 MiB / 18.00 MiB
- homepage initial JS gzip: 91.8 KiB / 95.0 KiB
- largest page initial JS gzip: 98.1 KiB / 125.0 KiB
- largest page initial CSS gzip: 25.6 KiB / 28.0 KiB
- JS gzip total: 146.6 KiB / 160.0 KiB
- CSS gzip total: 42.7 KiB / 45.0 KiB

## GitHub Actions update

The optional analytics-workflow optimization from doc 182 was completed after Dawid asked to fully finish the implementation.

The normal `.github/workflows/deploy.yml` workflow remains strict and still runs the full `npm run check` gate before GitHub Pages receives a code deploy.

The hourly `.github/workflows/website-analytics.yml` refresh now runs the lighter `npm run check:build` gate after generating the analytics feed. This removes the scheduled Playwright browser install and full rendered i18n audit from hourly analytics refreshes while still requiring a production build and deterministic performance budgets.
