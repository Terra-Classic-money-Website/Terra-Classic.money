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

## History reconciliation

The GitHub repository was confirmed by the owner to be a fresh repository containing only a disposable one-line `README.md`.

The local `dev` branch has reconciled the remote `origin/main` history using a normal merge commit with `--allow-unrelated-histories`.

This avoids needing a future force-push to publish the website.

- Local `main` / `dev`: `a2f45f8 chore: bootstrap git repository`
- Remote `origin/main`: `6d505ed Initial commit`
- Reconciliation merge on local `dev`: includes `origin/main` as history

The remote `README.md` content is not canonical and may be replaced later.

Do not push, overwrite, or publish until the owner explicitly asks for the live GitHub update.

## Recommended future publish path

When the project is ready to test through GitHub Pages:

1. Reconcile `origin/main` with local project history deliberately.
2. Replace the temporary remote `README.md` with the project README when ready.
3. Merge validated `dev` work into local `main`.
4. Push `main` to GitHub only after explicit owner confirmation.
5. Return local working context to `dev`.

## Validation

Validation performed for this setup:

- confirmed `origin` fetch and push URLs;
- fetched `origin/main`;
- confirmed local working branch remains `dev`;
- inspected remote `README.md`;
- merged `origin/main` into local `dev` using `--allow-unrelated-histories`;
- confirmed no push was performed.
