# Polish translation implementation

Date: 2026-06-03

## Scope

Polish was added as a published website locale after previously being excluded from the target language list.

## Implementation

- Added `pl` to the typed locale registry and published route configuration.
- Added Polish chrome/navigation copy in `src/i18n/content/pl/chrome.ts`.
- Added Polish rendered body-copy translations in `src/i18n/content/pl/renderedText.json`.
- Added dynamic loading for Polish rendered translations.
- Added Polish route metadata for all published pages.
- Added Polish lifecycle status and current English source hashes to `src/i18n/translation-status.json`.
- Removed the obsolete validation guard that rejected `pl`.
- Generated static `/pl/` route templates for GitHub Pages.
- Fixed localized HTML generation so non-English static route shells receive their locale-specific `lang`, `dir`, canonical URL, title, description, Open Graph, and Twitter metadata.

## Terminology policy

The Polish copy keeps project-critical Web3 terms recognizable where literal translation would be weaker:

- `Terra Classic`, `LUNC`, `USTC`, `GitHub`, `Google Analytics`, and protocol names stay as names.
- `staking`, `governance`, `oracle`, `DEX`, and `Layer-1` are kept or translated selectively based on readability.
- `PT-BR` and `ZH-CN` remain long locale tags in the selector; `PL` fits the normal circle button.
- Localized static HTML metadata must come from `src/i18n/site-i18n.json`; generated route shells should not keep English metadata.

## Validation

- `npm run i18n:generate`
- `npm run i18n:validate`
- `npm run typecheck`
- `npm run i18n:audit-rendered`
- `npm run perf:budget`
- `npm run check`

Full project validation passed on 2026-06-03 after the concurrent ecosystem and roadmap work was completed. The final check covered generated localized route shells, route metadata, TypeScript, rendered translation coverage, and performance budgets.
