# About share badge removal

Created: 2026-05-26

## Purpose

Apply the browser comment requesting removal of the `PUBLIC-GOOD WEBSITE` badge from the About page final share section.

## Change

- Removed the badge from the `AboutShare` component markup.
- Removed the now-unused `.about-share .native-phase__badge` CSS rule.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered QA:

- Desktop `1913x1245`: `.about-share .native-phase__badge` no longer exists.
- Desktop `1913x1245`: `PUBLIC-GOOD WEBSITE` text no longer exists on the page.
- Desktop `1913x1245`: share section heading and share button remain visible.
