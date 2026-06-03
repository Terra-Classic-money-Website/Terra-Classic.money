# Indonesian translation implementation

Date: 2026-06-03

## Scope

Indonesian is now implemented as the second published non-English locale after Turkish.

The locale is published under `/id/` and follows the repo-native translation architecture from `146 - Translation architecture research - 2026-06-01.md`:

- typed locale metadata in `src/i18n/site-i18n.json`
- typed chrome copy in `src/i18n/content/id/chrome.ts`
- source-controlled rendered body translations in `src/i18n/content/id/renderedText.json`
- generated static GitHub Pages-compatible route files
- route-level translation lifecycle status in `src/i18n/translation-status.json`

## Implementation notes

Indonesian was moved from planned target locale to published locale.

Every published route now includes Indonesian:

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

The generated body translation map uses the English rendered text keys as the source of truth. Protected product and ecosystem terms were normalized after generation, including `Terra Classic`, `GitHub`, `JavaScript`, `TypeScript`, and related protocol names where machine translation created incorrect brand variants.

The localized load error was changed from Turkish-specific copy to neutral English because the DOM translation provider now serves more than one non-English locale.

The Vite localized HTML transform now writes both `lang` and `dir` from locale config for every locale. This keeps the static document metadata aligned with the locale contract before React boots.

## Validation plan

Validation for Indonesian uses the same gate that caught earlier Turkish coverage issues:

- `npm run i18n:generate`
- `npm run i18n:validate`
- `npm run build`
- `npm run i18n:audit-rendered`
- `npm run check`
- browser spot-check of representative Indonesian pages

The rendered audit is the key guardrail. It compares English visible text against localized pages and fails when translatable English UI text remains visible on localized routes.

## Roadmap fit

This completes the first expansion step after the Turkish pilot and keeps the approach aligned with GitHub Pages-only hosting. No server-side language negotiation, external CMS, runtime translation service, or third-party hosting was added.

Future languages should follow the same path:

1. add locale metadata
2. add typed chrome content
3. add rendered body translation JSON
4. add route metadata
5. mark reviewed lifecycle status with current source hashes
6. generate localized HTML
7. run i18n validation, rendered audit, and full project check
