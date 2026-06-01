# Public contribution readiness implementation

Created: 2026-06-01

## Scope

This task implemented the recommended next steps from the content storage research note, with roadmap visibility cleanup treated as the first implementation item.

The goal was to prepare the repository for public feedback, GitHub issues, and pull requests after the silent launch of `terra-classic.money`.

## Implementation Notes

### Roadmap Visibility

Moved roadmap row visibility ownership from `src/pages/RoadmapPage.tsx` into `src/data/roadmap.ts`.

Before:

- Hidden roadmap rows were controlled by a `roadmapPageHiddenRowIds` set inside the React page component.
- Contributors could update `src/data/roadmap.ts` and still not understand why a row was hidden.

After:

- `RoadmapRow` supports `visible?: boolean`.
- Hidden rows now declare `visible: false` directly in `src/data/roadmap.ts`.
- The roadmap page filters rows with `row.visible !== false`.

This keeps roadmap content, status, and visibility in one contributor-facing file.

### Contributor-Facing Repository Docs

Added root-level public contribution documents:

- `CONTRIBUTING.md`
- `LISTING-POLICY.md`
- `ROADMAP-LISTING-POLICY.md`
- `CORRECTIONS.md`

These files are public repository documentation, not internal development process notes. They explain how contributors can report issues, edit data files, propose listings, suggest roadmap updates, and submit corrections.

Updated `README.md` to link to the new contribution and policy files.

### GitHub Templates

Added issue templates for:

- ecosystem listing requests
- market corrections
- roadmap updates
- open work package proposals
- corrections and broken links

Added `.github/pull_request_template.md` with summary, source, validation, and neutrality checks.

### Content File Guidance

Added short contributor notes to:

- `src/data/ecosystem.ts`
- `src/data/ecosystemVerification.ts`
- `src/data/markets.ts`
- `src/data/roadmap.ts`
- `src/data/openWork.ts`

The comments are intentionally brief. They are meant to reduce common mistakes without turning source files into long manuals.

## Design Impact

No visual design or layout changes were made.

`designsystem.html` did not need updates because no reusable component, visual state, spacing rule, or motion pattern changed.

## Operator Impact

No local startup or runtime commands changed.

`- START.md` did not need updates.

## Validation Plan

Relevant validation for this task:

- TypeScript check, because roadmap data types and page filtering changed.
- Production build, because static route output must still compile.
- Full project check, because `npm run check` is the GitHub Pages deployment gate.

Docs-only additions would not normally require build validation, but this task also changed TypeScript source files.

## Validation Results

Completed validation:

- `npm run typecheck` passed.
- `npm run check` passed.

`npm run check` completed:

- metadata cleanup
- image asset build check
- TypeScript project build
- Vite production build
- performance budget check

Performance budget remained within configured limits.
