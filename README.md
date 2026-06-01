# Terra-classic.money

Terra-classic.money is an independent, community-maintained, open-source website for Terra Classic.

Live website:

https://terra-classic.money

This repository contains the source code and public content for the website. It exists so the Terra Classic community can suggest corrections, improve content, add useful ecosystem resources, and propose pull requests through a transparent GitHub process.

## What This Website Is

Terra-classic.money is a public information and wayfinding website for Terra Classic.

It is designed to help users, holders, builders, validators, contributors, and external observers understand:

- what Terra Classic is
- where to find useful Terra Classic tools and resources
- where LUNC markets are listed
- what public roadmap work is visible
- what open work packages need builders or contributors
- how to suggest corrections or improvements

## What This Website Is Not

Terra-classic.money is not the official Terra Classic website.

It is also not:

- financial advice
- a token promotion website
- a paid ranking platform
- a validator-controlled website
- an endorsement of listed projects, exchanges, wallets, or services

Listings are informational only. Users should always do their own research before using any wallet, exchange, dApp, bridge, validator, or service.

## What This Repository Is For

Use this repository to:

- report broken links or outdated information
- suggest ecosystem listings with actual utility for LUNC holders
- suggest market corrections
- suggest roadmap corrections with sources
- propose open work packages
- improve wording, clarity, or neutrality
- submit pull requests for content or code changes

## Ecosystem And Roadmap Boundaries

The main Ecosystem page lists only projects and resources that provide actual utility for LUNC holders.

Token-only, memecoin, speculation-only, or L2 projects that mainly provide a token or trading market are not listed on the main Ecosystem page. Those projects belong on the separate Layer 2 website when eligible:

https://l2.terra-classic.money

The same rule applies to the main Roadmap page. Only projects listed on, or clearly eligible for, the main Ecosystem page may add project roadmap entries to the main Roadmap page.

## How To Contribute

Start here:

- [CONTRIBUTING.md](CONTRIBUTING.md)

Policy documents:

- [LISTING-POLICY.md](LISTING-POLICY.md)
- [L2-LISTING-POLICY.md](L2-LISTING-POLICY.md)
- [ROADMAP-LISTING-POLICY.md](ROADMAP-LISTING-POLICY.md)
- [CORRECTIONS.md](CORRECTIONS.md)

You can contribute without running the website locally by opening an issue or editing content files directly through GitHub.

## Where Content Lives

Most public content is stored in simple data files:

| What you want to change | File |
| --- | --- |
| Ecosystem listings | `src/data/ecosystem.ts` |
| Validator, network, and developer verification links | `src/data/ecosystemVerification.ts` |
| Markets | `src/data/markets.ts` |
| Roadmap | `src/data/roadmap.ts` |
| Open work packages | `src/data/openWork.ts` |
| Shared site links | `src/data/links.ts` |
| About page content | `src/data/about.ts` |

For small content changes, copy an existing entry, edit the fields, and submit a pull request.

## Local Development

This section is for contributors who want to run the site locally before submitting a pull request.

Requirements:

- Node.js 22 or newer
- npm

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Vite will print a local URL, usually:

```text
http://127.0.0.1:5173/
```

## Validation

Before submitting code or larger content changes, run:

```bash
npm run check
```

This runs the production build and performance budget check used by the GitHub Pages deployment workflow.

For quick TypeScript-only validation:

```bash
npm run typecheck
```

If you cannot run local checks, say that in your pull request.

## Deployment

The website is a static Vite site deployed through GitHub Pages.

Production deployment runs from the `main` branch through `.github/workflows/deploy.yml`.

The production domain uses:

```text
terra-classic.money
```
