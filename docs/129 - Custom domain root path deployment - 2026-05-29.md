# Custom domain root path deployment

Created: 2026-05-29

## Scope

Configured the GitHub Pages deployment for the custom domain `terra-classic.money`.

## Cause

The site was previously deployed as a GitHub Pages project site at:

```txt
https://terra-classic-money-website.github.io/Terra-Classic.money/
```

That required Vite to build asset and page URLs under `/Terra-Classic.money/`.

After connecting the custom domain, the site is served from the domain root:

```txt
https://terra-classic.money/
```

Keeping the old project-path base caused deployed HTML to request assets from `/Terra-Classic.money/assets/...`, which returns `404` on the custom domain.

## Change

- Updated the GitHub Pages workflow to build with `VITE_BASE_PATH=/`.
- Added `public/CNAME` so the deployed Pages artifact preserves `terra-classic.money`.

## Validation

Completed local validation:

```bash
npm run check
```

Result: passed.

Additional artifact checks:

- `dist/CNAME` contains `terra-classic.money`.
- `dist/index.html` emits root-relative asset URLs such as `/assets/...` and `/fonts/...`.
- Built HTML/CSS/JS artifacts contain zero `/Terra-Classic.money/` references.

Deployment validation still needs to run after `main` is pushed:

- Confirm GitHub Pages workflow succeeds.
- Confirm `https://terra-classic.money/` serves root-relative assets without the old `/Terra-Classic.money/` prefix.
