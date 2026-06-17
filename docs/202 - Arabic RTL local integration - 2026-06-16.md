# Arabic RTL local integration

Created: 2026-06-16

## Scope

Integrated the useful Arabic and reusable RTL work from PR #1 into a temporary local branch from `dev`:

- branch: `codex/pr-1-arabic-rtl-review`;
- source PR: `https://github.com/Terra-Classic-money-Website/Terra-Classic.money/pull/1`;
- contributor: `amm-s-cloud`;
- approach: port the Arabic/RTL locale work, not a direct merge.

## Why PR #1 was not merged directly

PR #1 is useful but unsafe to merge directly into `main` or blindly into `dev`.

The PR branch predates local governance hardening and would remove or roll back important repository-safety work, including:

- `.github/workflows/pr-validation.yml`;
- recent pull request template changes;
- recent contribution guidance;
- local asset-source files.

It also touched shared i18n runtime and chrome/sidebar CSS, so it is a high-risk integration rather than a content-only translation.

## Implementation

Added Arabic as a published RTL locale:

- locale id: `ar`;
- path prefix: `/ar/`;
- `htmlLang`: `ar`;
- `dir`: `rtl`.

Added Arabic route metadata, chrome text, rendered body-text translations, generated Arabic static route templates, and Arabic lifecycle entries in `src/i18n/translation-status.json`.

Added reusable direction handling:

- localized runtime syncs `<html lang>` and `<html dir>` from locale config;
- shared chrome CSS mirrors sidebar, language selector, mobile drawer, and language suggestion placement under `html[dir="rtl"]`;
- Arabic receives a system Arabic font stack through `src/styles/tokens.css`.

Updated `TRANSLATION-GUIDE.md` with the rule that future RTL languages should use the locale `dir` field and avoid language-specific direction hacks unless a real rendered issue requires them.

Updated `- START.md` with Arabic local route examples.

Updated the local design-system source with an RTL chrome specimen so the new directionality pattern is represented in the internal design-system surface instead of living only as production CSS.

## Validation so far

Passed:

- `npm run check:i18n`;
- `npm run check:quick`;
- `npm run check`;
- `git diff --check`.

Rendered browser QA on local Vite server `http://127.0.0.1:5174/` checked:

- Arabic homepage, ecosystem, roadmap, and about routes;
- desktop `1440x900`;
- tablet `1024x900`;
- mobile `390x844`;
- Arabic desktop language selector;
- Arabic collapsed sidebar language selector;
- Arabic mobile drawer and language selector;
- English and Turkish desktop/mobile language selector behavior.

Results:

- Arabic pages render `lang="ar"` and `dir="rtl"`;
- localized Arabic text loads before page display;
- no horizontal overflow found in checked Arabic routes;
- no actual Vite/framework error overlay found;
- browser console had no warnings or errors in the checked flows;
- English and Turkish remain `dir="ltr"` and their language selectors still expose all 10 published locales.

## Final validation result

`npm run check` completed successfully after the Arabic/RTL integration:

- production build passed;
- rendered i18n audit passed and wrote `.i18n-reports/rendered-latest.md`;
- performance budget passed.

Largest post-integration budget readings:

- runtime dist: `17.48 MiB / 18.00 MiB`;
- homepage initial JS gzip: `93.9 KiB / 95.0 KiB`;
- largest page initial JS gzip: `ar/decentralization.html` at `99.6 KiB / 125.0 KiB`;
- largest page initial CSS gzip: `ar/index.html` at `26.3 KiB / 28.0 KiB`;
- JS gzip total: `150.8 KiB / 160.0 KiB`;
- CSS gzip total: `43.5 KiB / 45.0 KiB`.

Do not publish to `main` unless Dawid explicitly asks for a live update.
