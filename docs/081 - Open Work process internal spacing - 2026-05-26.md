# Open Work process internal spacing

Created: 2026-05-26

## Purpose

Apply the browser comment requesting the internal spacing inside the Open Work `Proposal and quote process` section to be `120px`.

## Change

- Increased desktop `.open-work-process` `padding-top` from `88px` to `120px`.
- Kept the previously requested `.open-work-process` `margin-top: 120px`, because that controls the separate handoff from Cooperation Terms into the Process section.
- Kept existing tablet and mobile overrides in place so smaller screens retain their current compact spacing.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered QA:

- Desktop `1913x1245`: `.open-work-process` padding-top computed to `120px`; margin-top remained `120px`.
- Desktop `1913x1245`: process top to intro content measured `121px`, which is expected because the section includes a `1px` top border plus `120px` padding.
- Tablet `1024x900`: `.open-work-process` padding-top and margin-top remained `72px`.
- Mobile `375x812`: `.open-work-process` padding-top and margin-top remained `56px`.
