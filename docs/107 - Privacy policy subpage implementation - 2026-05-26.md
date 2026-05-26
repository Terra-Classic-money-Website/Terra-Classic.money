# Privacy policy subpage implementation

Created: 2026-05-26

## Scope

Added a simple text-based Privacy Policy subpage for `terra-classic.money`.

## Roadmap Fit

The page supports the original brief by making the website more transparent, official-compatible, and safer for visitors, contributors, donors, and public GitHub participants. It does not add a backend, account system, wallet connection, analytics layer, cookie mechanism, paid placement behavior, or any non-GitHub Pages infrastructure.

## Implementation

- Added `privacy.html` as a static Vite entry for GitHub Pages output.
- Added `privacy` to the shared link registry.
- Added the Privacy Policy route to the React app.
- Stored the policy content in `src/data/privacyPolicy.ts` so the long legal text is maintainable and not buried inside footer markup.
- Reused the existing typography, spacing, article rhythm, sidebar, and footer conventions.
- Updated the footer Privacy Policy link to point to the local static page.
- Updated `- START.md` with the local Privacy Policy URL.

## Design System

No design-system component was added. The page uses a plain legal-document layout derived from existing subpage spacing, long-form article rhythm, and shared semantic tokens.

## Validation

Full local gate passed:

```bash
npm run check
```

Rendered QA passed for `privacy.html` with no horizontal overflow at:

- Desktop Big: 1632 x 1000
- Desktop Small: 1365 x 900
- Tablet: 900 x 1100
- Mobile: 390 x 900

Screenshots were saved in `docs/audit-screenshots`:

- `privacy-policy-desktop-big-2026-05-26.png`
- `privacy-policy-desktop-small-2026-05-26.png`
- `privacy-policy-tablet-2026-05-26.png`
- `privacy-policy-mobile-2026-05-26.png`
- `privacy-policy-footer-2026-05-26.png`

Follow-up correction:

- Reduced the Privacy Policy heading top spacing to match the existing directory-style subpages.
- Added footer top padding after the Privacy Policy page divider.
