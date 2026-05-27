# About responsive image correction

Date: 2026-05-26

## Scope

Corrected the About page responsive image behavior on tablet and mobile breakpoints.

## Changes

- Kept the top About hero image on its previous responsive sizing.
- Updated the open-source visual band planet image to scale by available width on tablet and mobile instead of by band height.
- Exported a tablet/mobile-safe `801 x 796` version of the planet from Figma and use it below the desktop breakpoint.
- Increased the tablet composition to `70%` of the visual band width so it sits closer to the desktop framing while still using the uncropped source asset.
- Preserved the rounded visual band container on narrow breakpoints.
- Tightened mobile vertical spacing in the About hero, ownership intro, and open-source intro blocks where desktop spacing rules were too loose for the narrow layout.
- Reduced the mobile About hero panel inset so the headline starts closer to the top of the card.
- Removed the inherited mobile decentralization hero H1 top margin from the About hero so top and side insets match.

## Validation Plan

- Run the project check command.
- Verify rendered tablet and mobile breakpoints in the browser.
