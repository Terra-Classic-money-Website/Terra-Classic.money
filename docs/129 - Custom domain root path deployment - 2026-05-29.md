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

Completed deployment validation after `main` was pushed:

- GitHub Pages workflow succeeded.
- `https://terra-classic.money/` serves root-relative asset URLs such as `/assets/...` and `/fonts/...`.
- The live homepage contains zero `/Terra-Classic.money/` references.
- Root asset requests return `200`.
- Old project-path asset requests under `/Terra-Classic.money/assets/...` return `404`, which confirms the custom domain build is no longer using the repository subpath.

GitHub Actions emitted a non-blocking warning that several upstream actions still run on Node.js 20 and will need attention before GitHub's 2026 Node 24 migration deadlines. This did not block deployment.
