# BigbangX link correction

Created: 2026-08-05

## Scope

Update the BigbangX NFT marketplace destination shown in the main Terra Classic ecosystem directory.

## Change

Changed the canonical `BigbangX` ecosystem entry in `src/data/ecosystem.ts` from `https://bigbangx.io` to `https://bigbangx.org/`.

The separate `Air Force Lunc` listing was not changed because it is a distinct project entry with its own project-specific path.

No visual or design-system changes were required.

## Validation

- `npm run check:quick` passed.
- The first `npm run check` run stopped at i18n validation because the ecosystem and roadmap source hashes were stale. The recorded hashes were synchronized in `src/i18n/translation-status.json`.
- The final `npm run check` passed, including the production build, 144-page prerender validation, rendered i18n browser audit, paused-route guard, and performance budgets.
- The built `dist/ecosystem.html` and generated `public/data/ecosystem.json` contain `https://bigbangx.org/` for the BigbangX entry.

GitHub Pages promotion results will be recorded after the `dev` commit is promoted to `main`.
