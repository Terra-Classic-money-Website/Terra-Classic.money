# Open Work process section spacing

Created: 2026-05-26

## Purpose

Apply the browser comment requesting the specific spacing after the Cooperation Terms cards and before the Proposal and Quote Process section to be `120px`.

## Change

- Added a scoped desktop `.open-work-process { margin-top: 120px; }` rule.
- Left the existing `.open-work-process` internal `padding-top` and top border unchanged, because the annotation targets the section handoff before the divider.
- Kept existing tablet and mobile overrides in place so smaller screens retain their current compact spacing.

## Validation

Executed:

```bash
npm run check
```

Result: passed.

Rendered QA:

- Desktop `1913x1245`: gap from the Cooperation Terms grid to the Proposal and Quote Process section divider measured `120px`; `.open-work-process` margin-top computed to `120px`.
- Tablet `1024x900`: `.open-work-process` margin-top remained `72px`.
- Mobile `375x812`: `.open-work-process` margin-top remained `56px`.
