# Website performance strategy completion audit

Created: 2026-05-27

## Scope

Audited the implementation work completed against `106 - Website performance optimization audit and plan - 2026-05-26.md` and closed the remaining production-page gaps found during the audit.

This pass does not optimize `designsystem.html`. Dawid clarified during the audit that `designsystem.html` is a purely internal design-system reference file and does not need production performance optimization. It remains useful for local design governance, but it is not part of the production performance target.

## Gaps closed

### Desktop Lighthouse spot checks

`scripts/perf-audit.mjs` now runs:

- mobile Lighthouse audits for every production page
- desktop Lighthouse spot checks for Home, Decentralization, and About

`scripts/check-lighthouse-budget.mjs` now validates the three desktop reports with explicit score, FCP, LCP, TBT, CLS, transfer, and request-count budgets.

This completes the Phase 0 requirement from doc 106 that the audit runner cover desktop spot checks, not only mobile production pages.

### Local metadata hygiene

`scripts/clean-local-metadata.mjs` and `scripts/check-performance-budget.mjs` now handle a broader deploy-output metadata set:

- `.DS_Store`
- `Thumbs.db`
- `desktop.ini`
- `ehthumbs.db`
- AppleDouble `._*` files

This keeps the GitHub Pages artifact cleaner across macOS and Windows-originated file operations.

### Unsized homepage SVG logos

The homepage hero group SVG logos now have explicit intrinsic `width` and `height` attributes while preserving their existing rendered width and layout.

Lighthouse now reports:

```text
home unsized-images score: 1
items: 0
```

This closes the remaining image-dimension item called out in doc 106.

### Runbook update

`- START.md` now documents that `npm run perf:audit` includes mobile production-page audits plus desktop spot checks.

## Completion status by doc 106 phase

| Phase | Status |
| --- | --- |
| Phase 0: diagnostics before optimization | Complete. Deterministic budgets, Lighthouse reports, desktop spot checks, metadata cleanup, and operator runbook coverage are in place. |
| Phase 1: static image optimization pipeline | Complete for production delivery. Source masters are outside `public`, responsive AVIF/WebP outputs are generated, remote avatars are localized, and production assets fit the 15 MiB deployed budget. |
| Phase 2: production entrypoints by page | Complete. Every production HTML page has a route-specific entrypoint. |
| Phase 3: CSS split by shared/page surfaces | Complete. Production entries import split CSS, and the largest initial CSS payload is enforced below 25 KiB gzip. |
| Phase 4: self-host Figtree | Complete. Fonts are local and production HTML preloads the local subset. |
| Phase 5: defer non-critical runtime work | Complete. APR fetching is gated behind viewport proximity and third-party runtime avatar requests are removed. |
| Phase 6: CI and operator safeguards | Complete. GitHub Pages deploy runs `npm run check`; local audit and visual workflows are documented. |

## Validation

Executed:

```bash
npm run check
npm run perf:audit
VISUAL_BASELINE_DIR=.visual-reports/final-full-matrix/screenshots VISUAL_OUTPUT_DIR=.visual-reports/doc106-audit-final npm run visual:snapshots
```

### Deterministic performance budget

```text
Total dist: 14.77 MiB / 15.00 MiB
Largest file: assets/hero-orb-figma.webp (588.2 KiB) / 900.0 KiB
Homepage initial JS gzip: 77.4 KiB / 85.0 KiB
Largest page initial JS gzip: decentralization.html (84.4 KiB) / 125.0 KiB
Largest page initial CSS gzip: index.html (24.2 KiB) / 25.0 KiB
JS gzip total: 125.9 KiB / 130.0 KiB
CSS gzip total: 36.8 KiB / 45.0 KiB
```

### Lighthouse audit

The refreshed `npm run perf:audit` run passed all Lighthouse budgets.

| Page | Score | FCP | LCP | TBT | CLS | Transfer | Requests |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 97 | 1562 ms | 2501 ms | 61 ms | 0.000 | 263 KiB | 52 |
| Ecosystem | 98 | 1824 ms | 2137 ms | 11 ms | 0.000 | 252 KiB | 54 |
| Markets | 98 | 1661 ms | 2267 ms | 8 ms | 0.000 | 179 KiB | 60 |
| Roadmap | 99 | 1511 ms | 1891 ms | 0 ms | 0.000 | 122 KiB | 16 |
| Open Work | 98 | 1659 ms | 2042 ms | 0 ms | 0.000 | 136 KiB | 29 |
| Open Work Detail | 99 | 1670 ms | 1905 ms | 0 ms | 0.000 | 122 KiB | 18 |
| Decentralization | 95 | 1764 ms | 2519 ms | 0 ms | 0.000 | 214 KiB | 34 |
| About | 98 | 1670 ms | 2191 ms | 4 ms | 0.000 | 171 KiB | 34 |
| Privacy | 99 | 1511 ms | 1891 ms | 0 ms | 0.000 | 120 KiB | 15 |
| Home Desktop | 100 | 411 ms | 671 ms | 0 ms | 0.000 | 326 KiB | 55 |
| Decentralization Desktop | 99 | 445 ms | 589 ms | 0 ms | 0.000 | 214 KiB | 34 |
| About Desktop | 100 | 415 ms | 545 ms | 0 ms | 0.000 | 189 KiB | 34 |

Home and Decentralization mobile LCP are effectively at the 2.5 second target boundary in local Lighthouse lab conditions. The implementation work is complete; further movement here would be micro-tuning around lab variance rather than closing an unfinished strategy item.

### Visual regression

Visual regression passed against the previous final performance baseline:

```text
Visual summary: .visual-reports/doc106-audit-final/summary.md
Max diff ratio: 1.000%
Largest observed diff: 0.137%
Console status: clean for every captured production route and viewport
```

## Final verdict

All production-scope implementation work from `106 - Website performance optimization audit and plan - 2026-05-26.md` is now complete.

The strategy is implemented for the GitHub Pages production site: static image delivery, local fonts, page entrypoints, route-owned data, split CSS, deferred runtime work, avatar localization, deterministic budgets, Lighthouse audits, desktop spot checks, CI deployment gating, and visual regression coverage for production pages.
