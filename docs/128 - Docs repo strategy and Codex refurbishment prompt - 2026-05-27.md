# Docs repo strategy and Codex refurbishment prompt

Created: 2026-05-27

## Purpose

This document records the recommended approach for building `https://docs.terra-classic.money` as a custom documentation site that reuses the existing Terra Classic Website design language.

It also contains a detailed prompt Dawid can give Codex after creating a new GitHub repository and copying the current website project into it.

## Recommendation

Build the docs in a separate repository from the beginning, but use the current website repository as the visual and technical seed.

The recommended workflow is:

1. Create a new repository in the same GitHub organization.
2. Copy the current Terra Classic Website project into that new repository.
3. Ask Codex to refurbish the copy into a dedicated docs site.
4. Delete all main-website page code, data, routes, assets, and diagnostics that do not belong to docs.
5. Keep and adapt only the reusable design system, shell, tokens, typography, responsive behavior, deployment workflow, validation tooling, and selected assets.
6. Deploy the new repo to GitHub Pages with the custom domain `docs.terra-classic.money`.

This is better than building docs inside the main website repo and moving later. It avoids temporary paths, temporary routing, mixed deployment concerns, and a later migration phase that would rewrite CI, base paths, custom-domain behavior, and contributor workflows.

This is also better than duplicating the website and slowly modifying it without a cleanup mandate. The copy is useful as a scaffold, but the first docs task must be deletion-driven. If the docs repo keeps website pages, homepage sections, old route entrypoints, orphan styles, obsolete performance budgets, and irrelevant documentation, the docs project will start with hidden complexity and weak maintainability.

## Updated decision after Dawid's direction

Dawid wants a custom docs experience, not Docusaurus, VitePress, or a generic documentation framework.

That direction is reasonable for this project because:

- The main website design is already strong and distinctive.
- The docs experience can reuse the existing left sidebar and page shell pattern.
- The public brand/trust posture should remain consistent between `terra-classic.money` and `docs.terra-classic.money`.
- GitHub Pages supports static sites well, so a custom Vite/React docs build can stay inside the existing hosting constraint.
- The documentation site is part of the project's trust surface, not merely developer reference material.

The trade-off is that a custom docs site must deliberately rebuild capabilities that docs frameworks provide by default:

- Markdown or MDX ingestion.
- Sidebar generation.
- Table of contents.
- Previous/next links.
- Search or at least page index.
- Broken-link validation.
- Orphan-page detection.
- Edit-on-GitHub links.
- SEO metadata.
- Accessible headings, anchors, and keyboard navigation.
- Clear content warnings for technical/risk-sensitive instructions.

This is acceptable only if those capabilities are treated as first-class requirements, not polish for later.

## GitHub Pages and domain architecture

GitHub Pages supports static files from a repository and allows custom domains. GitHub's documentation states that there is a maximum of one Pages site per repository, and project sites normally live under `https://<owner>.github.io/<repositoryname>` unless a custom domain is configured.

Because the docs will live at `https://docs.terra-classic.money`, the docs should have their own repository and their own Pages configuration.

Recommended deployment model:

- Main website repo: `terra-classic.money`
- Docs repo: `docs.terra-classic.money` or `terra-classic-docs`
- Main website domain: `terra-classic.money`
- Docs domain: `docs.terra-classic.money`
- Docs Vite base path: `/`
- Docs GitHub Pages source: GitHub Actions
- Docs production branch: `main`
- Docs working branch: `dev`
- DNS: create a `CNAME` record for `docs` pointing to the GitHub Pages default domain for the organization, normally `<organization>.github.io`

Do not point the DNS CNAME at the repository path. GitHub's custom-domain documentation says subdomain CNAME records should point to the GitHub Pages default domain, excluding the repository name.

References:

- GitHub Pages overview: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- GitHub Pages custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- Managing a custom domain: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Repository strategy

The docs repo should be treated as a sibling product, not as a subfolder of the main site.

It should still share the same product principles:

- Independent.
- Community-maintained.
- Open-source.
- Source-aware.
- Neutral.
- GitHub-editable.
- Public-good oriented.
- Official-compatible if governance ever adopts the broader website.

But it should have its own implementation boundaries:

- Own deployment workflow.
- Own README.
- Own `- START.md`.
- Own `AGENTS.md`.
- Own `docs` process documentation.
- Own content contribution rules.
- Own validation scripts.
- Own content source directory.
- Own issue/PR templates if needed.

The main website should link to docs after the docs site has a stable first version. The main website should not carry docs build logic.

## What to preserve from the current website repo

Preserve and adapt:

- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/chrome.css`, if the site shell still uses it
- Relevant shared component styles from `src/styles/components.css`
- The global responsive breakpoint model:
  - Desktop Big: 1500px and up
  - Desktop Small: 1300-1499px
  - Tablet: 768-1299px
  - Mobile: 767px and below
- `SiteShell` concepts, but simplify them for docs
- Sidebar behavior, but replace website navigation with docs navigation
- Typography scale and text rhythm
- Motion rules for hover, focus, sidebar collapse, accordion-like navigation, and mobile menu states
- GitHub Pages deployment workflow structure
- Metadata cleanup and static build discipline
- Image optimization only if docs use images
- Performance budget philosophy, adjusted to docs
- Visual QA scripts, adjusted to docs routes
- `designsystem.html`, but convert it into a docs-site design reference if it remains useful

Preserve only what has a clear docs-site role. If a file exists only to support homepage sections, About, Markets, Roadmap, Ecosystem, Open Work, or Privacy Policy, remove it from the docs repo.

## What to delete from the docs repo copy

Delete or replace:

- Homepage sections and route entrypoints.
- Existing website pages:
  - `ecosystem.html`
  - `markets.html`
  - `roadmap.html`
  - `open-work.html`
  - `open-work-detail.html`
  - `about.html`
  - `privacy.html`
  - `decentralization.html`, unless a docs page explicitly replaces it
- Page-specific React components for the main website.
- Page-specific CSS for the main website.
- Data files for website directory pages unless reused as docs source.
- Donation modal code unless the docs site explicitly needs it.
- APR runtime fetch logic.
- Remote avatar localization scripts unless docs content needs external avatars.
- Homepage performance exceptions and budgets that no longer match the docs site.
- Audit screenshots from the copied repo unless intentionally retained as historical migration evidence.
- Any copied process docs that describe the main website rather than the docs repo.

Do not leave dead routes in `vite.config.ts`. The docs repo should have only the entrypoints it serves.

## Recommended docs site product shape

The docs site should feel like the main website converted into a serious documentation surface.

High-level layout:

- Left sidebar: documentation navigation.
- Right/main area: docs content.
- Optional narrow right rail on desktop: table of contents for the current page.
- Mobile: top bar with docs menu trigger, search trigger, and current section context.
- Footer: edit link, source attribution, previous/next links, and contribution prompt.

The visual goal is not a marketing subpage. It should feel denser, quieter, and more operational than the main website while still clearly belonging to the same Terra Classic design system.

Recommended first navigation groups:

- Start
  - Overview
  - What is Terra Classic
  - Network basics
  - Safety and risk notes
- Learn
  - Assets
  - Wallets
  - Fees
  - Staking and governance
  - Glossary
- Use wallets
  - Galaxy Station
  - Keplr
  - Sending
  - Staking
  - Governance
  - Testnet
- Build
  - Builder tooling
  - Endpoints
  - Classic transaction behavior
  - Smart contracts
  - Localnet
- Run infrastructure
  - Full node overview
  - Build Terra Core
  - Join a network
  - Configure settings
  - Sync
  - Production setup
  - Troubleshooting
  - Validator notes
- Reference
  - Module specifications
  - Protocol reference
  - Tax and fees
  - Oracle
  - Staking
  - Governance

This structure should be refined after auditing the imported `terra-classic-documentation` content.

## Content source model

Recommended source directory:

```text
content/
  docs/
    start/
    learn/
    wallets/
    build/
    infrastructure/
    reference/
```

Each markdown file should use frontmatter:

```yaml
---
title: "Run a full Terra Classic node"
description: "Set up, configure, sync, and operate a Terra Classic full node."
section: "Run infrastructure"
order: 20
status: "draft"
source:
  origin: "terra-classic.io docs export"
  url: "https://terra-classic.io/docs"
  commit: "e305fbe051de9c218021cc3ff98e2e01db04f6dd"
review:
  technical: false
  editorial: false
---
```

The docs build should produce static HTML routes from markdown. It should not depend on a runtime backend, server functions, or third-party hosting.

Acceptable implementation options:

- Markdown to static HTML at build time.
- Markdown to typed route data at build time, then rendered by React.
- MDX only if there is a real need for React components inside docs pages.

Recommended first choice:

- Markdown files as source.
- Build-time parser.
- React docs shell.
- Static page generation through Vite route entrypoints or a generated docs route manifest.

Avoid making every docs page a hand-written React component. That will make community contributions harder and will violate the project's open-source contribution goal.

## Search

Search should be planned from day one, but it can ship in phases.

Phase 1:

- Build a static JSON search index during build.
- Client-side search over title, description, section, headings, and body excerpt.
- No external search service.

Phase 2:

- Add ranking improvements, keyboard shortcuts, highlighted matches, and route-aware result grouping.

The site must stay GitHub Pages compatible. Do not introduce Algolia, Typesense, Meilisearch, hosted workers, or any external search dependency unless Dawid explicitly approves a hosting boundary change. The current owner constraint says GitHub Pages only.

## Validation requirements for the docs repo

The docs repo should have a docs-specific validation model, not a blind copy of the website performance gate.

Minimum scripts:

```json
{
  "scripts": {
    "dev": "vite --host 127.0.0.1",
    "build": "npm run clean:metadata && npm run docs:validate && tsc -b && vite build",
    "typecheck": "tsc -b --pretty",
    "docs:validate": "node scripts/validate-docs.mjs",
    "docs:index": "node scripts/build-docs-index.mjs",
    "preview": "vite preview --host 127.0.0.1",
    "check": "npm run build"
  }
}
```

Validation should check:

- Every content file has required frontmatter.
- Slugs are unique.
- Sidebar order is deterministic.
- Internal markdown links resolve.
- Image references resolve.
- No orphan pages unless explicitly marked hidden.
- No empty pages.
- No duplicate H1s.
- No broken heading hierarchy.
- No `localhost`, Dropbox, or local filesystem links in published docs.
- No unreviewed imported source is marked as final.
- External links are reported separately, because full external link checking can be flaky.

Add optional later checks:

- Code block syntax sanity.
- Command block extraction into a diagnostics report.
- Risk wording check for validator, wallet, seed phrase, staking, governance, and production-node pages.
- Screenshot smoke tests for core docs pages.
- Lighthouse budget adjusted for docs pages.

## Documentation and runbook requirements

The docs repo must have its own root `- START.md`.

It should document:

- Prerequisites.
- First-time setup.
- Normal local start.
- Build.
- Docs validation.
- Preview.
- GitHub Pages deployment.
- Custom domain setup.
- Troubleshooting.
- How Dawid can generate a useful diagnostics report for Codex.

The docs repo must also have its own `docs/` folder for process documentation. Do not reuse the main website's historical implementation notes as if they are docs-site process history.

Recommended first docs-repo process documents:

- `001 - Docs repo bootstrap - YYYY-MM-DD.md`
- `002 - Docs content import audit - YYYY-MM-DD.md`
- `003 - Docs shell refurbishment - YYYY-MM-DD.md`
- `004 - Docs validation model - YYYY-MM-DD.md`

## Design-system requirements

The docs site should reuse the website design system, but it should not blindly preserve homepage composition rules.

Docs-specific design rules:

- Prioritize reading, scanning, trust, and procedural clarity.
- Use denser information hierarchy than the public homepage.
- Keep the left navigation stable and predictable.
- Use restrained cards only for warnings, callouts, references, and grouped resources.
- Avoid homepage-style hero treatment for docs pages.
- Use explicit page status labels for imported, reviewed, draft, deprecated, and community-maintained content.
- Put technical risk warnings near the relevant instructions, not hidden in a generic disclaimer.
- Preserve smooth state transitions for sidebar expansion, mobile menu, search, and table-of-contents interactions.
- Do not let hover states move text or resize navigation rows.

If a reusable docs component is introduced, represent it in `designsystem.html` or its docs-site equivalent.

Docs-specific reusable components likely needed:

- Docs sidebar item.
- Docs sidebar section.
- Breadcrumb.
- Page status badge.
- Source attribution block.
- Edit-on-GitHub link.
- Technical warning callout.
- Info callout.
- Command block.
- Step list.
- Previous/next pagination.
- Table of contents.
- Search result row.
- Empty search state.

## Migration risks

### Risk: carrying too much website code

The copied repo will contain code that is actively harmful to docs maintainability if left in place.

Mitigation:

- Make deletion part of the first task.
- Require Codex to list preserved files and deleted files.
- Require Codex to keep only docs-serving routes.

### Risk: custom docs rebuilds too much framework behavior poorly

Custom docs are justified here, but the project still needs docs-framework-grade basics.

Mitigation:

- Build validation early.
- Keep markdown as the source of truth.
- Generate navigation and search index from content metadata.
- Avoid hand-maintained duplicate route lists.

### Risk: imported docs content becomes canonical without review

The existing `terra-classic-documentation` folder is an export from another source. It is useful seed material, not automatically approved canonical content.

Mitigation:

- Preserve source attribution.
- Mark imported pages as draft or imported until reviewed.
- Add review metadata to frontmatter.
- Make unreviewed status visible in the UI.

### Risk: docs drift from main website design

Separate repo means separate evolution.

Mitigation:

- Import the design system intentionally.
- Document the docs-specific design contract.
- Keep the visual relationship through tokens, typography, sidebar rhythm, and shared brand assets.
- Do not copy homepage hero patterns into docs content pages.

### Risk: GitHub Pages domain confusion

Custom subdomain setup can be fragile if DNS and repository settings disagree.

Mitigation:

- Configure the custom domain in the docs repo Pages settings.
- Set DNS `CNAME docs -> <organization>.github.io`.
- Use base path `/`.
- Add or preserve a `CNAME` file in the built output if the workflow requires it.
- Enforce HTTPS after GitHub provisions the certificate.

## Exact Codex prompt for the new docs repo

Use this prompt after Dawid has created the new GitHub repository in the same GitHub organization and copied the current Terra Classic Website project into that new local workspace.

```text
You are working in the new Terra Classic Docs repository.

Context:
- This repo was created by copying the current Terra Classic Website project.
- The target product is a custom documentation site at https://docs.terra-classic.money.
- It must be hosted on GitHub Pages only.
- Do not use Docusaurus, VitePress, Astro Starlight, Mintlify, Nextra, or any external docs framework.
- Reuse the existing Terra Classic Website design language, tokens, typography, sidebar behavior, responsive model, and visual discipline.
- The intended UI is simple: docs navigation on the left, docs content on the right, and an optional table of contents on wide desktop.
- The original website repo should remain separate. This repo must become a dedicated docs repo, not a second copy of the marketing/information site.

Before implementation:
1. Read AGENTS.md.
2. Read the original brief.
3. Read DESIGN.md.
4. Inspect designsystem.html.
5. Inspect the current homepage and SiteShell implementation only to understand reusable design patterns.
6. Inspect terra-classic-documentation/MANIFEST.md and a representative sample of imported docs content.
7. Inspect package.json, vite.config.ts, scripts, .github/workflows, - START.md, and docs.
8. Summarize:
   - what this docs repo should become
   - what should be preserved from the copied website
   - what should be deleted
   - the proposed docs architecture
   - validation plan
   - GitHub Pages/custom-domain implications

Main task:
Refurbish this copied website project into a dedicated custom Terra Classic Docs site.

Hard requirements:
- Keep Git initialized and work on dev by default.
- Keep GitHub Pages as the only hosting target.
- Use base path "/" for the custom subdomain.
- Create or update the GitHub Actions Pages workflow for this docs repo.
- Remove all main-website routes, pages, data, CSS, assets, and scripts that are not needed for docs.
- Preserve the useful design foundation: tokens, typography, base styles, shell/sidebar concepts, responsive model, and interaction quality.
- Replace the website navigation with docs navigation.
- Build a docs content pipeline from markdown files. Do not make every docs page a hand-written React component.
- Import or move the existing terra-classic-documentation markdown content into a clean docs content source structure.
- Preserve source attribution for imported content.
- Mark imported/unreviewed pages clearly as imported or draft until reviewed.
- Implement docs page rendering with:
  - title
  - description
  - breadcrumbs
  - page status
  - source attribution
  - body content
  - heading anchors
  - previous/next links
  - edit-on-GitHub link placeholder
  - responsive mobile navigation
- Add a static search index if feasible in this phase. If not feasible, document the exact follow-up and do not fake search UI.
- Add docs validation scripts before or alongside the content pipeline.
- Update - START.md for the docs repo.
- Create process documentation in docs using the repo filename convention.
- Do not preserve old website process docs as current docs-repo history unless they are explicitly marked historical source material.

Validation requirements:
- Run the smallest meaningful checks during implementation.
- Before handoff, run the docs repo final gate.
- At minimum, the final gate must include:
  - docs metadata validation
  - internal link validation
  - typecheck if TypeScript remains
  - production build
- If browser rendering changed, run a local preview and inspect desktop, tablet, and mobile layouts.
- Do not claim checks passed unless actually executed.

Recommended implementation shape:
- content/docs/... for markdown source
- scripts/build-docs-index.mjs for generating navigation/search/page manifest if needed
- scripts/validate-docs.mjs for frontmatter, links, slugs, images, and orphan checks
- src/docs/... for docs rendering logic
- src/components/docs/... for docs-specific reusable components
- src/styles/pages/docs.css or equivalent docs-specific styles
- Keep route generation deterministic.
- Keep all docs pages static-output compatible with GitHub Pages.

Deletion checklist:
- Remove homepage-only sections.
- Remove About, Markets, Roadmap, Ecosystem, Open Work, Decentralization, and Privacy routes unless intentionally rebuilt as docs content.
- Remove APR fetch logic.
- Remove donation modal logic unless explicitly required.
- Remove irrelevant website data files.
- Remove page CSS that no docs component uses.
- Remove or rewrite performance budgets that were tuned for the main website.
- Remove audit screenshots copied from the main website unless preserved in an explicit historical archive.

Design checklist:
- Docs must look like the Terra Classic Website family, not a generic docs template.
- Docs pages must not look like homepage hero sections.
- Sidebar rows must have stable height, clear active states, hover states, and accessible focus states.
- Mobile docs navigation must be deliberate, smooth, and usable.
- Code blocks, callouts, tables, and long technical pages must be readable on mobile.
- No overlapping text.
- No layout-shifting hover states.
- No one-off design patterns unless reflected in the docs design system.

Documentation requirements:
- Update or create root README.md for the docs repo.
- Update or create root - START.md for non-developer operation.
- Create docs/001 - Docs repo bootstrap - YYYY-MM-DD.md or the next available numbered process document.
- Document what was preserved, what was deleted, and why.
- Document the validation model.
- Document known content-review risks from imported documentation.

Important judgment:
This is not a reskin. It is a product refactor from a public website into a documentation system. Be ruthless about deleting website-specific leftovers. The end state should be a clean custom docs repo that inherits Terra Classic design quality without inheriting unrelated website complexity.
```

## Final recommendation

Dawid's planned workflow is correct with one adjustment:

Create the new repo first, copy the whole current project into it, then immediately run a deletion-led refurbishment task.

Do not build docs in this main website repo first. Do not keep the copied repo as a duplicated website with docs added on top. The goal is a clean sibling repo that uses the current website as design DNA and implementation scaffolding, then becomes its own docs product.
