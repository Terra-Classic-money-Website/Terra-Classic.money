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

## Release

- Committed on `dev` as `27b0e46` (`Update BigbangX ecosystem link`).
- Promoted through PR [#16](https://github.com/Terra-Classic-money-Website/Terra-Classic.money/pull/16), merged into `main` as `c2e86fb`.
- All three required PR checks passed: quick, build, and rendered i18n.
- GitHub Pages workflow `31023386819` passed: build in 4m55s and deploy in 8s.
- Live `https://terra-classic.money/ecosystem.html` verification confirmed the BigbangX card uses `href="https://bigbangx.org/"`.
- `https://bigbangx.org/` returned HTTP 200 during the live verification.
- The local working context was returned to `dev`; local `main` is synchronized with `origin/main`.
