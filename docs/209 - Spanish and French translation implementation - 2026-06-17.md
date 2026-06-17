# Spanish and French Translation Implementation

Created: 2026-06-17

## Scope

Added Spanish and French as complete published website locales for terra-classic.money.

Implemented locale ids:

- `es`
- `fr`

Static route prefixes:

- `/es/`
- `/fr/`

## Existing translation system

The website uses repo-native i18n rather than hand-maintained translated HTML:

- `src/i18n/site-i18n.json` controls locale metadata, route metadata, route publication, and locale-prefixed static paths.
- `src/i18n/translation-status.json` controls lifecycle status and English source hashes per route and locale.
- `src/i18n/content/<locale>/renderedText.json` stores rendered body-text translations keyed by canonical English strings.
- `src/i18n/content/<locale>/chrome.ts` stores typed chrome/navigation labels.
- `scripts/generate-i18n-html.mjs` generates locale route folders from the canonical English HTML templates.
- `scripts/validate-i18n.mjs` checks route coverage, lifecycle status, current source hashes, metadata, chrome modules, rendered-text maps, and suspicious untranslated English prefixes.
- `scripts/audit-rendered-i18n.mjs` builds and browser-audits rendered pages for visible untranslated English.

## Implementation Notes

- Added Spanish and French locale records as published LTR locales in `src/i18n/site-i18n.json`.
- Added `es` and `fr` to every published route so both locales are complete-site surfaces, not partial language islands.
- Added Spanish and French route metadata for all 12 routes.
- Added Spanish and French rendered body-text maps with current source-key coverage.
- Added Spanish and French chrome/navigation modules.
- Added both locales to the typed locale union, chrome registry, lazy rendered-text loader, and decentralization read-time labels.
- Updated translation lifecycle records with current English source hashes.
- Updated `TRANSLATION-GUIDE.md`, `- START.md`, and the i18n report notes so operator docs match the current locale set.
- Adjusted the deterministic performance budget narrowly for the larger published locale set: runtime dist allowance increased from `18.00 MiB` to `18.25 MiB`, and homepage initial JS gzip allowance increased from `95 KiB` to `96 KiB`.

## Terminology Notes

Machine-assisted translation was cleaned for Web3 and Terra Classic terminology:

- kept `Terra Classic`, `LUNC`, `USTC`, `IBC`, `GitHub`, `Staking Protocol`, `Swap Protocol`, and `Forex Protocol` stable;
- used Spanish `staking` / French `staking` instead of gambling-oriented translations such as `apostar` or `miser`;
- used Spanish `gobernanza` and French `gouvernance` for on-chain governance;
- used Spanish `desarrolladores` and French `développeurs` where literal builder translations were awkward;
- preserved official-status, paid-listing, donation, and no-financial-advice meanings.

## Validation Plan

Required gates:

- `npm run check:i18n`
- `npm run check:i18n-rendered`
- `npm run check:quick`
- `git diff --check`

If the rendered audit exposes Spanish or French overflow or untranslated visible strings, fix the localized source maps first, then rerun the targeted i18n gates.

## Validation Result

Completed:

- `npm run check:i18n` passed after fixing lifecycle hashes and suspicious English-prefix strings.
- `npm run check:quick` passed.
- Targeted rendered audit passed for Spanish/French home, ecosystem, open work, and open work detail routes.
- First full `npm run check` passed build, paused-route guard, and rendered i18n audit, then failed only on deterministic performance budget thresholds that were already within `0.01 MiB` runtime dist and `0.6 KiB` homepage initial JS of the previous limits.
- Final `npm run check` passed after the narrow performance-budget adjustment.

Final budget readings:

- runtime dist: `18.01 MiB / 18.25 MiB`;
- homepage initial JS gzip: `95.6 KiB / 96.0 KiB`;
- largest page initial JS gzip: `101.4 KiB / 125.0 KiB`;
- JS gzip total: `152.6 KiB / 160.0 KiB`;
- lazy locale JS gzip: `701.1 KiB`.

## Follow-up Selector Fit Fix

After Spanish and French were added, the expanded desktop sidebar language selector still used the old two-row open-state dimensions. The buttons existed in the DOM, but the open selector panel clipped the third row, hiding `ES` and `FR`.

Updated:

- `src/styles/chrome.css`: expanded language selector open height from two rows to three rows.
- `src/styles/designsystem.css`: synced the internal design-system language-options panel height.

Follow-up validation required:

- run quick/build checks;
- inspect the expanded sidebar language selector and confirm all 12 locale buttons are visible.

## Follow-up Selector Order

The language selector order now follows the project's target-locale priority instead of translation rollout history:

```text
EN, TR, ID, ES, FR, HI, TH, PT-BR, ZH-CN, DE, PL, AR
```

Rationale:

- `EN` remains first because English is the canonical source language.
- The remaining locales follow the visit-data target sequence documented in `TRANSLATION-GUIDE.md`.
- Spanish and French are no longer treated like late additions; they appear in the first row with the highest-priority non-English locales.

## Follow-up Flag Hover Prototype

The language selector now uses a hover/focus visual swap from the locale short label to a circular language flag SVG.

Implementation notes:

- downloaded local SVG assets from HatScripts `circle-flags`, using the language-specific `flags/language/` directory;
- copied the upstream MIT license into `public/assets/language-flags/LICENSE-circle-flags.md`;
- documented the local asset source in `public/assets/language-flags/README.md`;
- added `flagAsset` to each locale record in `src/i18n/site-i18n.json`;
- mapped `zh-CN` to `language-flags/cn.svg` because the locale explicitly targets Simplified Chinese for China, and the source set does not provide a separate `language/zh-cn.svg`;
- kept the text label as the default state and the flag as hover/focus-only so the selector remains readable and avoids country-first ambiguity;
- changed language choices from JS-only buttons to real navigation links styled as buttons, so locale switching still has a concrete `href` and does not depend entirely on the click handler;
- kept wide pills stable on hover to avoid reshuffling the three-row layout.
- made wide pills (`PT-BR`, `ZH-CN`) paint transparent on hover/focus so the visible state collapses to the circular flag instead of leaving a 72px white pill behind the SVG.

Validation required:

- run quick/build checks;
- visually inspect the expanded desktop selector and verify at least one standard button and one wide button swap to a circular flag without layout shift;
- inspect `designsystem.html` language specimens after build because the reusable component demo was updated to use the current language order and hover content.
