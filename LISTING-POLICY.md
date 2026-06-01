# Listing Policy

Terra-classic.money lists Terra Classic ecosystem resources for informational purposes.

A listing does not mean endorsement, audit, partnership, investment advice, or official status.

## Core Principles

- Listings should help users understand or navigate Terra Classic.
- Main ecosystem listings must not be sold as paid placement.
- Paid, sponsored, or project-submitted surfaces must be clearly separated and labeled.
- Listings should be neutral, source-aware, and useful.
- Listings should avoid inflated claims, hype, and unverifiable promises.

## Ecosystem Listings

Ecosystem listings live in `src/data/ecosystem.ts`.

Hard requirement:

Only projects and resources that provide actual utility for LUNC holders are eligible for the Ecosystem page.

Eligible utility can include:

- using, storing, staking, transferring, bridging, or managing LUNC
- building on Terra Classic
- inspecting the Terra Classic network
- accessing Terra Classic infrastructure
- participating in Terra Classic governance or community coordination
- using an application, tool, or service that provides a concrete function for LUNC holders

Good candidates include:

- Terra Classic applications
- wallets
- bridges
- developer tools
- infrastructure providers
- governance or information resources
- community tools with clear utility

Not eligible for the Ecosystem page:

- memecoins with no concrete LUNC-holder utility
- token-only projects whose main purpose is speculation or trading
- L2 projects that only provide a token or market
- projects that mainly ask users to buy, trade, or speculate
- projects with no working product, tool, route, infrastructure, or information value for LUNC holders

Those projects may belong on the separate Layer 2 website when eligible:

```text
https://l2.terra-classic.money
```

Useful listing data:

- project name
- short category or summary
- working URL
- optional status or badge
- optional avatar information

## Verification And Infrastructure Links

Validator visibility, network inspection, and developer infrastructure links live in `src/data/ecosystemVerification.ts`.

These links should support routing integrity, network inspection, validator visibility, or developer operations.

## Market Listings

Market listings live in `src/data/markets.ts`.

Market listings should point to places where users can buy, sell, or swap LUNC through centralized or decentralized markets.

Market listings are informational only. They do not imply custody safety, liquidity quality, jurisdictional availability, or investment advice.

## What Should Not Be Listed

Do not list:

- token-only, speculation-only, or memecoin projects on the Ecosystem page
- scam links or impersonation sites
- projects with no clear public URL
- paid placements in neutral sections
- private referral links
- content that presents Terra Classic investment outcomes as guaranteed
- services that require users to expose private keys or seed phrases
- links that are mainly spam, low-quality promotion, or unrelated to Terra Classic

## Required Review Standard

Maintainers may ask for:

- source links
- clarification of project status
- safer wording
- category changes
- removal of promotional claims
- separation from neutral ecosystem sections

If a listing is controversial or high-risk, it can be discussed in an issue before being merged.
