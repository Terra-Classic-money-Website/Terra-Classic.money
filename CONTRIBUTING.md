# Contributing to Terra-classic.money

Terra-classic.money is an independent, community-maintained website for Terra Classic.

You can contribute by opening an issue, suggesting a correction, or submitting a pull request.

## Fastest Ways To Help

- Report a broken link or outdated listing.
- Suggest a missing ecosystem project, wallet, tool, bridge, or infrastructure resource.
- Suggest a market correction.
- Suggest a roadmap update with sources.
- Propose an open work package for builders.
- Propose a translation or translation correction.
- Improve wording when it makes the site clearer, more neutral, or more accurate.

## Content Map

| What you want to change | File |
| --- | --- |
| Ecosystem listings | `src/data/ecosystem.ts` |
| Validator, network, and developer verification links | `src/data/ecosystemVerification.ts` |
| Markets | `src/data/markets.ts` |
| Roadmap | `src/data/roadmap.ts` |
| Open work packages | `src/data/openWork.ts` |
| Shared site links | `src/data/links.ts` |
| About page content | `src/data/about.ts` |
| Translation registry and lifecycle | `src/i18n/site-i18n.json`, `src/i18n/translation-status.json` |

## Translation Contributions

English is the canonical source language. Translations must preserve meaning, neutrality, official-status disclaimers, and no-financial-advice language.

See `TRANSLATION-GUIDE.md` before proposing a translation.

Important rules:

- Do not publish partial language surfaces.
- Do not edit generated localized HTML route templates directly.
- Add the target route, target locale, source text, proposed translation, and reviewer notes.
- Treat legal/risk/governance changes as meaning-sensitive, not style-only.

Useful checks:

```bash
npm run i18n:validate
npm run i18n:report
```

## Editing Listings

Most listings are simple data entries. Copy a similar existing entry, paste it in the right category, and change the content.

Hard eligibility rule:

- Ecosystem listings must provide actual utility for LUNC holders.
- Token-only projects, memecoins, and L2 projects that mainly offer speculation or trading are not listed on the Ecosystem page.
- Those projects belong on the separate Layer 2 surface when eligible: `https://l2.terra-classic.money`.

Example ecosystem entry:

```ts
{
  name: "Example Project",
  summary: "Wallet",
  href: "https://example.com",
  avatarAlt: "Example Project wallet for Terra Classic users."
}
```

`avatar` is optional. If no avatar is provided, the site can render initials.

## Editing The Roadmap

Roadmap content lives in `src/data/roadmap.ts`.

Only projects that are listed on, or clearly eligible for, the Ecosystem page may add project roadmap entries to the Roadmap page. Token-only, speculation-only, or L2-only projects should not use the main Roadmap page.

Roadmap rows can be visible or kept in the source file without showing on the public roadmap:

```ts
visible: false
```

Only suggest roadmap changes when you can provide a source, public project statement, governance reference, or clear rationale.

See `ROADMAP-LISTING-POLICY.md` before proposing roadmap changes.

## Editing Open Work Packages

Open work packages live in `src/data/openWork.ts`.

These entries are intentionally more detailed than ordinary links. A useful work package should include:

- clear scope
- expected deliverables
- acceptance criteria
- quote requirements
- risk or dependency notes when relevant

Do not reduce work packages to vague ideas. If the work cannot be scoped clearly, open an issue first.

## Pull Request Checklist

Before submitting a pull request:

- Keep the change focused.
- Do not mix unrelated edits.
- Do not add paid placement to neutral ecosystem sections.
- Include sources for factual or roadmap changes.
- Run the relevant local checks if you can.

Recommended local check:

```bash
npm run check
```

If you cannot run local checks, say that in the pull request.

## Neutrality Rules

The main site is an informational public-good website. Listings are not endorsements.

Do not submit changes that:

- present paid inclusion as neutral ecosystem content
- claim official status without governance-backed evidence
- promote a validator, project, token, or service without clear informational value
- add investment advice or price predictions
- hide risk, uncertainty, or source limitations

See `LISTING-POLICY.md` and `CORRECTIONS.md` for more detail.
