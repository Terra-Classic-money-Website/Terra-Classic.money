# Terra-Classic.money

Independent, community-maintained, open-source website for Terra Classic.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run typecheck
npm run build
```

`npm run check` runs both commands.

## GitHub Pages

The site is a static Vite build and is deployable to GitHub Pages from `main` through `.github/workflows/deploy.yml`.

For `terra-classic.money`, keep the Vite base path as `/`. If the site is temporarily hosted under a repository path, set the repository variable `VITE_BASE_PATH` to that path, for example `/Terra-Classic.money/`.
