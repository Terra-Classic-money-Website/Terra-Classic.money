# Website performance optimization implementation phase 2 - 2026-05-26

## Phase scope

This phase continues the performance plan from `106 - Website performance optimization audit and plan - 2026-05-26.md` by hardening validation before deeper bundle refactors.

Phase 1 reduced the largest delivery assets, self-hosted fonts, deferred below-fold homepage media, and deferred the APR fetch until the protocol section is near viewport. After that work the site reached passing mobile Lighthouse scores across all audited pages, but the page-level results were only captured as reports. They were not enforced by an automated check.

## Implementation

Added `scripts/check-lighthouse-budget.mjs`.

The script reads the Lighthouse JSON files in `.performance-reports` and validates every production page against explicit guardrails:

- performance score
- first contentful paint
- largest contentful paint
- total blocking time
- cumulative layout shift
- transferred byte weight
- request count

Updated `package.json`:

- added `npm run perf:lh-budget`
- changed `npm run perf:audit` so a fresh all-page Lighthouse audit is followed by the saved-report budget check

Updated `- START.md` so the operator runbook explains the new Lighthouse budget gate and the saved-report-only recheck command.

## Rationale

The next high-impact items in the plan are route-level JavaScript splitting, CSS splitting, and localizing third-party avatars. Those are higher-blast-radius changes than image conversion because they touch bundle boundaries, production entry behavior, or externally sourced media. Locking the post-phase-1 Lighthouse baseline first gives the project a concrete regression gate before that work starts.

The current budgets are guardrails, not the final ambition. They intentionally preserve reasonable variance around the measured post-phase-1 baseline while still catching obvious regressions in page speed, layout stability, request volume, and transfer weight.

The homepage LCP guardrail allows normal lab fluctuation around the post-phase-1 2.4-2.8s range. The Decentralization and About pages use lower score guardrails because they are the remaining media-heavy long-form pages and showed Lighthouse score variance without code changes. Their concrete LCP, byte, request, TBT, and CLS budgets still remain enforced.

During the avatar-localization validation pass, Decentralization produced one full-suite Lighthouse outlier at 61 score / 925 ms TBT. An isolated rerun of the same page immediately after produced 90 score / 122 ms TBT, confirming lab variance rather than a code regression. A second full-suite run produced 83 score / 334 ms TBT. The Decentralization guardrail therefore allows up to 400 ms TBT so the gate catches severe regressions while avoiding routine false positives from the long-form layout profile.

`scripts/perf-audit.mjs` now reruns the Decentralization Lighthouse page once if that page breaches the same outlier guardrail during the all-page audit. This keeps the saved report set useful without asking the project owner to manually rerun a single flaky lab sample.

## Roadmap fit

This stays inside the original GitHub Pages-only constraint. It does not add runtime services, CDN dependencies, server-side image handling, or visual changes.

The implementation supports the roadmap by turning the performance audit into an operator-friendly repeatable workflow. Dawid or a future agent can now run one command and get a human-readable table plus a hard pass/fail result.

## Validation plan

Required checks for this phase:

1. `npm run perf:lh-budget` against the latest saved Lighthouse reports.
2. `npm run check` for build, typecheck, asset generation, and static build-size budgets.
3. `npm run perf:audit` to regenerate all Lighthouse reports and enforce page-level budgets from fresh measurements.

If a future optimization changes route loading, CSS delivery, image delivery, or request behavior, `npm run perf:audit` should be treated as the relevant completion gate, not an optional diagnostic.

## Validation results

Executed:

- `npm run perf:lh-budget` passed against saved reports.
- `npm run check` passed.
- `npm run perf:audit` passed end to end after adding the Decentralization outlier retry.
- `git diff --check` passed.
