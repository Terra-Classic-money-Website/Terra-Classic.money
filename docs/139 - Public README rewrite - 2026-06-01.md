# Public README rewrite

Created: 2026-06-01

## Scope

This task rewrote the repository `README.md` so it works as the public front door for Terra-classic.money.

## Reason

The previous README was too internal. It focused on local development, validation, and GitHub Pages deployment before explaining what the website is, what the repository is for, or how community members should use it.

That was not aligned with the post-silent-launch goal of making the repository understandable to public contributors.

## Changes

Updated `README.md` to explain:

- what Terra-classic.money is
- the live website URL
- that the website is independent and not official
- what the repository is for
- what contributors can report or improve
- the Ecosystem and Roadmap eligibility boundary
- where contribution and policy documents live
- where important content files live
- how technical contributors can run and validate the site locally
- that deployment is static through GitHub Pages

## Design And Runtime Impact

No website runtime behavior changed.

No design system changes were required.

No startup or operator commands changed.

## Validation

This was a documentation-only change.

Completed validation:

- `git diff --check` passed.
