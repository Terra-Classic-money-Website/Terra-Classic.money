# Roadmap Listing Policy

The Terra-classic.money roadmap is a source-aware timeline. It should help users see what is being built, what is live, and what still needs verification.

The roadmap is not a hype board, paid ranking surface, or promise of future delivery.

## Roadmap Data Location

Roadmap content lives in:

```text
src/data/roadmap.ts
```

Rows can be included in the data file but hidden from the public roadmap with:

```ts
visible: false
```

This keeps source history without forcing incomplete or unverified items onto the public page.

## Ecosystem Eligibility Requirement

Only projects that are listed on, or clearly eligible for, the main Ecosystem page may add project roadmap entries to the Terra-classic.money Roadmap page.

This means roadmap eligibility follows the Ecosystem listing rule:

- The project must provide actual utility for LUNC holders.
- Token-only, speculation-only, or memecoin projects are not eligible for the main Roadmap page.
- L2 projects that only provide a token or market are not eligible for the main Roadmap page.
- L2 projects should use the separate Layer 2 website when eligible: `https://l2.terra-classic.money`.

Reason:

The main Roadmap page is for source-aware Terra Classic protocol, infrastructure, ecosystem, and utility work. It is not a visibility surface for token launches or speculative markets.

## Acceptable Roadmap Sources

Roadmap changes should include at least one useful source:

- governance proposal
- public project announcement
- repository issue or pull request
- public documentation
- credible maintainer statement
- project-submitted milestone details

If no source exists, mark the item honestly or open an issue first.

## Status Meanings

Use existing status values:

- `planned`: expected future work
- `in-progress`: work appears active
- `live`: shipped and usable
- `delayed`: publicly delayed or clearly not on the prior timeline
- `completed`: completed milestone
- `source-needed`: included for tracking, but stronger evidence is needed

Do not use roadmap status to create fake certainty.

## Paid Or Project-Submitted Items

Project-submitted or paid roadmap entries must be clearly labeled in the data.

Use:

```ts
paid: true
```

when the entry belongs to a paid or project-submitted surface.

Paid entries must not be presented as neutral protocol commitments.

## What Maintainers May Reject

Maintainers may reject roadmap changes that:

- come from projects that are not listed on, or eligible for, the Ecosystem page
- represent token-only, speculation-only, memecoin, or L2-only market activity
- lack sources
- turn speculation into certainty
- mix paid listings with neutral public roadmap items
- create validator or project favoritism
- make investment claims
- hide uncertainty or dependencies
- add too much detail for the public roadmap surface

For uncertain items, open an issue instead of submitting a direct roadmap edit.
