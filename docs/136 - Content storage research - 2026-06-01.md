# Content storage research

Created: 2026-06-01

## Scope

This research note documents how the current Terra Classic Website stores public-editable content for:

- Ecosystem links
- Extra ecosystem verification groups
- Markets
- Roadmap
- Open work packages

The goal is to assess whether the current content model is ready for public feedback, GitHub issues, and pull requests after the silent launch of `terra-classic.money`.

No implementation changes were made during this research pass.

## Current Project Phase

The website is in silent-launch / pre-public-announcement hardening.

The site already exists on the production domain, so the immediate priority is not concept exploration. The priority is public-readiness:

- make feedback paths clear
- make correction paths credible
- make important content easy to find
- make simple pull requests possible for non-developers or light technical contributors
- protect neutrality and source-awareness before broader community attention arrives

This fits the original brief directly. The brief defines Terra-classic.money as an independent, community-maintained, open-source website for Terra Classic, with content and source managed through GitHub.

## Relevant Constraints

The important constraints for this research are:

- The site must stay static-only and GitHub Pages-compatible.
- Public content changes should be traceable through GitHub.
- Main ecosystem listings must remain neutral and non-paid.
- Paid, sponsored, or project-submitted surfaces must remain clearly separated.
- Community contributors should be able to suggest corrections or content changes without needing to understand the whole React codebase.
- The project owner is not a developer, so contribution and review workflows should reduce manual explanation and repeated support work.

## Validation Setup Observed

Current validation scripts are defined in `package.json`:

- `npm run typecheck`
- `npm run build`
- `npm run perf:budget`
- `npm run check`
- `npm run perf:audit`
- `npm run visual:snapshots`

The production GitHub Pages workflow runs `npm run check` from `main`, so production deploys already include type checking, build, image generation, metadata cleanup, and performance budget checks.

There is a `tests` folder, but it currently contains no test files. The practical gate today is therefore TypeScript + Vite build + performance budget, with optional visual and Lighthouse audits for layout/performance-sensitive changes.

Because this research task was documentation-only, no validation command was run.

## Reference: terra-classic.io Content Model

The comparison reference was:

https://github.com/luncbsv/website/blob/e6bc67a455202b09c33489511057b24d53b07e2e/src/data/projects.ts

That site stores project listings in a TypeScript array. A listing is a plain object with fields like:

```ts
{
  name: "BigbangX",
  url: "https://bigbangx.io",
  description: "NFT marketplace",
  indicator: "onchain",
  categories: ["applications"]
}
```

That is contributor-friendly because the contributor edits data, not page code. It still requires basic formatting discipline, but it does not require knowing React components.

## Current Terra-classic.money Content Model

The current Terra-classic.money implementation uses a similar data-first model.

Important public content is already centralized in `src/data`, and the page components render those data arrays automatically.

### Ecosystem Links

Primary file:

- `src/data/ecosystem.ts`

Supporting type file:

- `src/data/ecosystemTypes.ts`

The ecosystem page uses `ecosystemCategories`, an array of category objects. Each category contains an `entries` array.

Typical entry shape:

```ts
{
  name: "BigbangX",
  summary: "NFT marketplace",
  href: "https://bigbangx.io",
  avatar: "avatars/avatar-kbgylln8evukpwqywwkpk2vlxz8-2051758dcc.webp",
  avatarAlt: "BigbangX NFT marketplace for Terra Classic digital art.",
  badge: "ON-CHAIN NATIVE"
}
```

The actual fields are simple:

- `name`
- `summary`
- `href`
- `avatar`
- `avatarAlt`
- `badge`
- `status`

The page renderer supports entries without a link and entries without an avatar. If no avatar is provided, the UI falls back to initials.

Assessment:

This is good. A contributor can add a normal ecosystem listing by copying one existing entry and changing a few content fields. It is similar to terra-classic.io and arguably cleaner because categories are explicit page sections rather than only category tags.

### Extra Ecosystem Verification Groups

Primary file:

- `src/data/ecosystemVerification.ts`

This file stores additional ecosystem entries for:

- validator visibility
- network inspection
- developer infrastructure

These entries use the same `EcosystemEntry` type as the main ecosystem page.

Assessment:

This is good. The split is understandable because these groups are related to verification, infrastructure, and routing integrity rather than ordinary ecosystem discovery. Keeping them separate helps prevent the main ecosystem file from becoming one giant mixed bucket.

### Markets

Primary file:

- `src/data/markets.ts`

Markets use the same category/entry model as the ecosystem page:

```ts
{
  name: "Binance",
  summary: "LUNC/USDT",
  href: "https://www.binance.com/en/trade/LUNC_USDT",
  avatar: "avatars/avatar-270-7c1ed6c627.webp",
  avatarAlt: "Binance exchange logo."
}
```

Market categories currently include:

- `CEX`
- `DEX`

Assessment:

This is acceptable as-is. The current file is compact, but the data model is clear and the project owner has confirmed the current market format is good enough. No change is recommended unless future contributors struggle with editing one-line objects.

### Roadmap

Primary file:

- `src/data/roadmap.ts`

The roadmap is data-driven, but more complex than listings.

It contains:

- `roadmapMonths`
- `roadmapRows`
- `roadmapGroupLabels`
- milestone status types
- project/source/group metadata

Typical roadmap row:

```ts
{
  id: "public-forex-protocol",
  group: "public",
  project: "Forex Protocol",
  shortName: "FX",
  category: "Stable assets",
  source: "public",
  accent: "#f9d85e",
  milestones: [
    { title: "EUTC concept validation", start: "2025-07", end: "2025-09", status: "completed" },
    { title: "Multi-currency suite design", start: "2025-09", end: "2026-01", status: "in-progress" }
  ]
}
```

Assessment:

The roadmap content is mostly centralized and reasonably editable, but it is not as simple as the ecosystem and market listings.

A contributor needs to understand:

- the row `id`
- the group type: `public` or `community`
- the source type: `governance`, `public`, or `project-submitted`
- the available status values
- start/end month keys
- milestone arrays

That is still acceptable for serious contributors, but it is not yet "just add 2-3 lines" simple.

Important issue:

Some roadmap visibility logic lives in the React page component, not in the roadmap data file. `src/pages/RoadmapPage.tsx` has a `roadmapPageHiddenRowIds` set. That means a row can exist in `roadmap.ts` but be hidden from the rendered roadmap by code outside the content file.

This is the main roadmap content-ownership weakness. It creates a trap for contributors: they may update `roadmap.ts` correctly but not understand why their change is not visible.

Recommended future improvement:

Move roadmap visibility into `roadmap.ts`, for example with a field like:

```ts
visible: true
```

or:

```ts
display: "visible"
```

Then the roadmap page should filter based only on the data file.

### Open Work Packages

Primary file:

- `src/data/openWork.ts`

Open work packages are centralized in one file and rendered on:

- `open-work.html`
- `open-work-detail.html?work=...`

Each open work package includes:

- `id`
- `title`
- `summary`
- `detailSummary`
- `category`
- `status`
- `effort`
- `quoteType`
- `idealFor`
- `deliverables`
- `acceptanceCriteria`
- `quoteRequirements`

Assessment:

The open work model is structurally good. One data entry powers both the board card and the detail page.

However, adding a high-quality open work package is content-heavy by nature. That is not a code problem. A real work package needs serious scope, deliverables, acceptance criteria, and quote requirements. Reducing this to 2-3 lines would weaken the product.

The current model is appropriate for the seriousness of the section.

Recommended future improvement:

Add a template comment or contributor guide section explaining how to propose a new work package and which fields are mandatory.

## How Pages Use The Data

The page implementation is mostly clean:

- Ecosystem imports `ecosystemCategories` and renders category sections automatically.
- Markets imports `marketCategories` and uses the same directory renderer.
- Roadmap imports `roadmapRows`, `roadmapMonths`, and `roadmapGroupLabels`.
- Open Work imports `openWorkPackages` and `closedWorkPackages`.
- Open Work Detail uses `openWorkById`, so the detail page is generated from the same source entry.

This is the right architecture for GitHub-based community contributions. Content is not buried in JSX across multiple page components.

## Answer: Is It Stored Like terra-classic.io?

Yes, broadly.

Both sites store content as TypeScript data arrays. Contributors change structured entries rather than page layouts.

Terra-classic.io has one broad `projects.ts` file and category tags. Terra-classic.money uses multiple purpose-specific files:

- ecosystem
- ecosystem verification
- markets
- roadmap
- open work
- shared links

For this website, the split is better because the site is broader than a simple project directory. Ecosystem listings, markets, roadmap, and open work packages have different editorial standards and risk profiles.

## Answer: Is It As Easy To Change?

For ecosystem links:

Yes. It is about as easy as terra-classic.io.

For ecosystem verification groups:

Yes. Same shape as ecosystem entries, just in a separate file.

For markets:

Yes enough. The current compact formatting is not a blocker because the owner has confirmed it is acceptable.

For roadmap:

Partly. The content is centralized, but not yet ideal. The hidden-row behavior in the page component should eventually move into the data file.

For open work packages:

Structurally yes, but intentionally more detailed. A credible work package should not be reduced too far because scope, acceptance criteria, and quote requirements matter.

## Contribution Docs Clarification

The About terra-classic.money page currently lists contributors. That is contributor attribution.

The missing files mentioned in the original brief, such as `CONTRIBUTING.md`, `LISTING-POLICY.md`, and `CORRECTIONS.md`, are different. They are contributor instructions and editorial policy documents.

This does not mean the current About page is wrong. It means there are two separate needs:

- public attribution: who helped or maintains the project
- contribution workflow: how a new person should suggest a fix, listing, roadmap update, or pull request

For public launch, attribution alone is not enough if the goal is to make PRs easy. Contributors need a clear "where do I edit?" and "what standards apply?" path.

## Main Findings

1. The current content architecture is already solid.

Important content is mostly in data files, not scattered across visual components.

2. Ecosystem, verification, and market listings are good enough for public contribution.

The project owner explicitly confirmed that avatar paths and market formatting should not be treated as blockers.

3. Roadmap is the main content-ownership risk.

The hidden-row list in `RoadmapPage.tsx` should eventually move into `roadmap.ts`.

4. Open work is correctly detailed.

This section should remain more structured than a simple link list because it handles serious ecosystem work and public quote expectations.

5. Contributor attribution is not the same as contributor guidance.

The About page can list contributors, but the repo still needs a low-friction contribution path if the public is expected to submit useful pull requests.

## Recommended Next Steps

Recommended before public announcement:

1. Add or improve public contribution guidance.

This does not need to be heavy. A simple `CONTRIBUTING.md` can explain:

- how to report an issue
- how to suggest a listing
- how to edit ecosystem entries
- how to edit markets
- how to suggest roadmap changes
- how to propose open work packages
- what not to add

2. Add issue templates.

Useful templates:

- ecosystem listing request
- market correction
- roadmap correction
- open work package proposal
- broken link / correction

3. Move roadmap visibility into `src/data/roadmap.ts`.

This makes roadmap edits less surprising for contributors.

4. Add short comments or examples inside the content data files.

This should be minimal. The goal is not to turn data files into documentation, but to make copy-paste edits safer.

5. Consider a contributor-facing "content map" in the repo.

This could be part of `CONTRIBUTING.md`:

| What you want to change | File |
| --- | --- |
| Ecosystem listing | `src/data/ecosystem.ts` |
| Verification / infrastructure links | `src/data/ecosystemVerification.ts` |
| Market listing | `src/data/markets.ts` |
| Roadmap item | `src/data/roadmap.ts` |
| Open work package | `src/data/openWork.ts` |
| Shared site links | `src/data/links.ts` |

## Final Assessment

The current website is close to being community-editable in the way the original brief intended.

For ecosystem, verification, and markets, the structure is already good enough.

The two meaningful gaps before public announcement are:

- contributor workflow documentation
- roadmap visibility/content ownership cleanup

Those are not fundamental architecture problems. They are launch-readiness polish items that would reduce friction, prevent confused pull requests, and make the project feel more credible as an open-source public-good website.
