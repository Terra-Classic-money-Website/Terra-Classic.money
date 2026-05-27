# Homepage what copy spacing correction

Created: 2026-05-26

## Purpose

Address browser review comment 1 on the homepage `What is Terra Classic?` editorial copy stack.

## Change

- Increased only the non-mobile H2-to-lead spacing from `48px` to `64px`.
- Tightened the non-mobile lead-to-body spacing from `48px` to `24px`.
- Kept the existing mobile override at `16px`, with its existing paragraph-to-paragraph adjustment, so the phone layout does not become unnecessarily tall.
- No new component or reusable pattern was introduced, so `designsystem.html` did not need a structural update.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Browser-rendered QA:

- Desktop viewport `1913x1245`: H2-to-lead spacing measured `64px`; lead-to-body spacing measured `24px`.
- Implementation uses a `24px` `.what-copy` flex gap plus a `40px` H2 bottom margin on non-mobile layouts.
- Mobile viewport `375x812`: H2 margin reset to `0px`; compact mobile spacing preserved.
- Desktop screenshot saved at `docs/audit-screenshots/homepage-what-copy-spacing-2026-05-26.png`.

Rendered QA acceptance criteria:

- The selected homepage `.what-copy` H2-to-lead spacing computes to `64px` on desktop.
- The lead-to-body spacing computes to `24px` on desktop.
- The mobile layout still uses its compact spacing and does not create avoidable vertical waste.
- The surrounding logo strip, popular topics column, and planet visual remain aligned with the existing homepage rhythm.
