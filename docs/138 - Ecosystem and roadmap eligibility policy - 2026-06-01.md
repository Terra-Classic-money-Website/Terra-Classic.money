# Ecosystem and roadmap eligibility policy

Created: 2026-06-01

## Scope

This note records a policy clarification requested after the public contribution readiness pass.

The clarification is now reflected in root policy documents and GitHub contribution templates.

## Decision

The main Ecosystem page lists only projects and resources that provide actual utility for LUNC holders.

Token-only, speculation-only, memecoin, or L2 projects that mainly provide a token or trading market are not eligible for the main Ecosystem page.

Those projects belong on the separate Layer 2 website when eligible:

```text
https://l2.terra-classic.money
```

The same boundary applies to the main Roadmap page.

Only projects that are listed on, or clearly eligible for, the main Ecosystem page may add project roadmap entries to the main Terra-classic.money Roadmap page.

## Files Updated

Updated:

- `CONTRIBUTING.md`
- `LISTING-POLICY.md`
- `ROADMAP-LISTING-POLICY.md`
- `README.md`
- `.github/ISSUE_TEMPLATE/ecosystem-listing.yml`
- `.github/ISSUE_TEMPLATE/roadmap-update.yml`
- `.github/pull_request_template.md`

Added:

- `L2-LISTING-POLICY.md`

## Rationale

This protects the main website from becoming a token-promotion surface.

The main Terra-classic.money website should support users who want to understand, use, build on, inspect, or contribute to Terra Classic. It should not give main-site legitimacy to projects whose only current function is speculation or trading.

Separating token-only and L2-only projects into the Layer 2 website keeps the main Ecosystem and Roadmap pages clearer, more neutral, and more official-compatible.

## Validation

This was a policy/documentation/template change only.

No TypeScript or production source behavior changed.
