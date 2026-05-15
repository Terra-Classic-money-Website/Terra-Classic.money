# GitHub remote setup

Created: 2026-05-15

## Purpose

This record documents the local repository connection to the GitHub repository:

https://github.com/Terra-Classic-money-Website/Terra-Classic.money

## Remote

The local repository has `origin` configured as:

```text
https://github.com/Terra-Classic-money-Website/Terra-Classic.money.git
```

`git fetch origin` completed successfully.

## Current branch state

- Local working branch: `dev`
- Local stable branch: `main`
- Remote stable branch: `origin/main`

## Important history note

The local repository and GitHub repository currently have separate initial histories.

- Local `main` / `dev`: `a2f45f8 chore: bootstrap git repository`
- Remote `origin/main`: `6d505ed Initial commit`

The remote `origin/main` currently contains only `README.md`.

Do not force-push, overwrite, merge, or publish until the owner explicitly asks for the live GitHub update and the reconciliation path is chosen.

## Recommended future publish path

When the project is ready to test through GitHub Pages:

1. Reconcile `origin/main` with local project history deliberately.
2. Preserve the remote `README.md` content if it is still useful.
3. Merge validated `dev` work into local `main`.
4. Push `main` to GitHub only after explicit owner confirmation.
5. Return local working context to `dev`.

## Validation

Validation performed for this setup:

- confirmed `origin` fetch and push URLs;
- fetched `origin/main`;
- confirmed local working branch remains `dev`;
- inspected remote `README.md`;
- confirmed no push was performed.
