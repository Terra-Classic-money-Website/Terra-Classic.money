# German translation implementation

Date: 2026-06-03

## Scope

German is implemented as the third published non-English locale after Turkish and Indonesian.

The locale is published under `/de/` and follows the repo-native translation architecture from `146 - Translation architecture research - 2026-06-01.md`:

- typed locale metadata in `src/i18n/site-i18n.json`
- typed chrome copy in `src/i18n/content/de/chrome.ts`
- source-controlled rendered body translations in `src/i18n/content/de/renderedText.json`
- generated static GitHub Pages-compatible route files
- route-level translation lifecycle status in `src/i18n/translation-status.json`

## Implementation notes

German was moved from planned target locale to published locale.

Every published route now includes German:

- home
- ecosystem
- markets
- roadmap
- decentralization
- open work
- open work detail
- about
- analytics
- privacy
- brand assets
- 404

The generated body translation map uses English rendered text keys as the source of truth. After generation, visible machine-translation artifacts were corrected, especially protected ecosystem terms and protocol names such as `Terra Classic`, `GitHub`, `Swap Protocol`, `Staking Protocol`, and `Forex Protocol`.

## Validation plan

Validation for German uses the same gates as Turkish and Indonesian:

- `npm run i18n:generate`
- `npm run i18n:validate`
- `npm run build`
- `npm run i18n:audit-rendered`
- `npm run check`
- browser spot-check of representative German pages

The rendered audit remains the main guardrail for the screenshot-style issue class: visible English UI text left on localized routes.

## Roadmap fit

This expands the published language set while preserving the GitHub Pages-only constraint. No server runtime, external CMS, paid translation dependency, or third-party hosting layer was added.

Future language additions should continue to use the same route lifecycle and rendered-text audit workflow.
