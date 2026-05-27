# What section visual height and spacing

Created: 2026-05-18

## Purpose

Set the spacing between the `What is Terra Classic?` copy and the planet visual to match the design, then make the non-mobile visual stage fit viewport height consistently.

## Scope

- The editorial block is content-sized instead of using the previous fixed `576px` height.
- The copy-to-planet visual gap is set by a `64px` bottom padding on the editorial block.
- The editorial block stays two-column on tablet/non-mobile widths so the popular topics list does not push the planet visual away from the copy; the side column compresses on narrower tablets to preserve readable copy width.
- The `what-visual` image stage uses `90vh` on non-mobile breakpoints.
- The three planet images scale with viewport height.
- The video button and avatar circles keep their non-mobile dimensions while their positions track the visual stage.
- The two side avatars keep a minimum clearance from the fixed play button so they do not touch or slide behind it on shorter non-mobile viewports; phone-specific avatar positions also avoid the mobile button footprint.
- Mobile keeps its existing phone-specific layout and fixed `560px` visual height.

## Validation plan

Run:

```bash
npm run check
```

Rendered QA should verify:

- Copy-to-visual gap is `64px`.
- The visual stage is `90vh` outside mobile.
- Planet images scale between desktop and tablet.
- Avatars and video button keep the same non-mobile dimensions.
- Avatars do not intersect the play button on checked desktop, tablet, or mobile viewports.
- Mobile remains on the existing phone layout.
- No horizontal overflow.
