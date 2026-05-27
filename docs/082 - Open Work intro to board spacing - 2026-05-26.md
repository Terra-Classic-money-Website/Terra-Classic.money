# Open Work intro to board spacing

Created: 2026-05-26

## Purpose

Apply the browser comment requesting the specific spacing between the Open Work page intro and the first Open Work Packages board to be `64px`.

## Change

- Added `.open-work-page__intro + .open-work-board { margin-top: 64px; }`.
- Scoped the change to the first board after the page intro so Closed Work, Cooperation Terms, and Proposal Process spacing keep their existing section rhythm.
- Kept existing tablet and mobile overrides in place.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered QA:

- Desktop `1913x1245`: gap from Open Work intro to the Open Work Packages divider measured `64px`.
- Tablet `1024x900`: first board margin-top remained `72px`.
- Mobile `375x812`: first board margin-top remained `56px`.
