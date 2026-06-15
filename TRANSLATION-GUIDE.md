# Translation Guide

Terra-classic.money is English-first. English is the canonical source of truth for meaning, route structure, legal/risk language, neutrality rules, and update timing.

Translations are welcome, but translated pages must not be published as partial language surfaces. A non-English route should only become public when its body content, metadata, navigation context, and risk copy have been translated and reviewed.

## Current Language Plan

Main locale:

- English

Target locales based on previous website visit data:

- Turkish
- Indonesian
- Hindi
- Thai
- Brazilian Portuguese
- Simplified Chinese
- German

Polish is not planned for now.

## How To Propose A Translation

Open a translation issue or pull request with:

- source language;
- target language;
- page or route;
- current English source text;
- proposed translated text;
- whether the change preserves meaning or changes meaning;
- reviewer notes, especially for risk, governance, validator, market, or legal-adjacent wording.

Do not translate by changing rendered HTML files directly. Translation work should live in source-controlled content modules or the i18n configuration so validation can check route coverage, status, and stale source state.

## Canonical Glossary

Keep these terms consistent unless a local reviewer gives a strong reason to adapt them.

| English term | Guidance |
| --- | --- |
| Terra Classic | Keep as `Terra Classic`. Do not translate as a generic phrase. |
| LUNC | Keep as `LUNC`. |
| USTC | Keep as `USTC`. |
| validator | Use the local blockchain/community equivalent if it is standard; otherwise keep `validator`. |
| delegator | Use the local blockchain/community equivalent if it is standard; otherwise keep `delegator`. |
| staking | Use the local crypto equivalent if it is standard; otherwise keep `staking`. |
| governance | Translate as governance/on-chain governance, not generic company management. |
| community-maintained | Translate as maintained by the community, not official ownership. |
| unofficial / not official | Preserve the lack of official status clearly. Do not soften it. |
| no financial advice | Preserve this strictly. Do not make it sound optional or informal. |

## Stricter Review Areas

These areas need extra care before publication:

- official-status disclaimers;
- no-financial-advice language;
- legal, tax, compliance, or investment-risk copy;
- validator neutrality;
- paid-listing separation;
- governance claims;
- risk warnings for markets, staking, bridges, wallets, and smart contracts.

If a translation changes the meaning of any of these areas, it should be treated as a content change, not only a language correction.

## Publication Rule

A locale can be visible in the public language selector only when:

- the locale is marked `published: true` in `src/i18n/site-i18n.json`;
- the route includes that locale in `publishedLocales`;
- the route lifecycle status is `reviewed` in `src/i18n/translation-status.json`;
- the route has a current recorded English source hash;
- `npm run i18n:validate` passes.

Draft translations can exist in the repo, but they must not be linked publicly.

## RTL Locales

Text direction is controlled by each locale's `dir` field in `src/i18n/site-i18n.json`. Future RTL languages should set `dir: "rtl"`, complete the same content, metadata, and lifecycle coverage as other published locales, and avoid adding language-specific direction checks unless a real layout issue requires it.
