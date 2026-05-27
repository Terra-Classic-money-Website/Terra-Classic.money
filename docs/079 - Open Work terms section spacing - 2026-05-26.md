# Open Work terms section spacing

Created: 2026-05-26

## Purpose

Apply the browser comment requesting the specific spacing before the Open Work `Cooperation terms` section to be `120px`.

## Change

- Added a scoped desktop `.open-work-terms { margin-top: 120px; }` rule.
- Left the shared `.open-work-board, .open-work-terms, .open-work-process` rhythm untouched for the other Open Work sections.
- Kept existing tablet and mobile overrides in place so smaller screens retain their current compact spacing.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered QA:

- Desktop `1913x1245`: gap from the Closed Work board to Cooperation Terms measured `120px`; `.open-work-terms` margin-top computed to `120px`.
- Tablet `1024x900`: `.open-work-terms` margin-top remained `72px`.
- Mobile `375x812`: `.open-work-terms` margin-top remained `56px`.
