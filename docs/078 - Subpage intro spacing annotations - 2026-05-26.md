# Subpage intro spacing annotations

Created: 2026-05-26

## Purpose

Apply browser annotations for desktop editorial intro spacing on the Decentralization and Open Work subpages.

## Changes

- Increased `.decentralization-resources__intro` desktop gap from `32px` to `64px`.
- Increased `.open-work-page__intro` desktop gap from `32px` to `64px`.
- Increased only the Cooperation Terms heading-copy gap to `64px` by scoping the rule to `.open-work-terms .open-work-section-head > div`.

## Responsive Decision

The annotations were made at a `1913x1245` desktop viewport. The `64px` values were applied to the base desktop styles because they match the site's larger editorial rhythm. Existing mobile overrides remain in place so small screens keep the established compact spacing.

The Cooperation Terms change was not applied to the shared `.open-work-section-head > div` rule globally because that component also owns the Open Work Packages and Closed Work Packages headers.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered QA:

- Desktop `1913x1245`: `.decentralization-resources__intro` gap measured `64px`.
- Desktop `1913x1245`: `.open-work-page__intro` gap measured `64px`.
- Desktop `1913x1245`: `.open-work-terms .open-work-section-head > div` gap measured `64px`.
- Mobile `375x812`: `.decentralization-resources__intro` gap remained `16px`.
- Mobile `375x812`: `.open-work-page__intro` gap remained `24px`.
- Mobile `375x812`: Cooperation Terms heading-copy gap remained `16px`.
