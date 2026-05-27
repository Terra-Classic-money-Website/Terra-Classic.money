# Image reveal and preload polish

Created: 2026-05-27

## Scope

Reduced visible image pop-in while preserving the performance optimization strategy.

## Cause

The previous performance pass deferred many below-fold images through `DeferredResponsiveImage`, which withheld `src` and `srcset` until an image was close to the viewport. Several of those same images also used native `loading="lazy"`, so they could be delayed twice: first by the custom intersection observer and then by the browser's lazy-loading heuristics.

When a user scrolled quickly, reserved image boxes could become visible before the bitmap had fetched and decoded.

## Fix

Updated the shared responsive image primitive to track load state and apply a controlled reveal:

- deferred images now begin loading at `1200px` from the viewport instead of `320px`;
- large decorative visual assets fade and de-blur into place after load;
- decorative transparent assets default to a transparent pending state so they do not show white blocks;
- framed/card images can use a subtle gradient placeholder through a CSS variable.

Removed the second native lazy-loading delay from large visual assets that are already controlled by `DeferredResponsiveImage`, including the What visual, capability illustrations, protocol visuals, the LUNC row background, strength visual, and decentralization stats planets.

Small logos and icons are intentionally excluded from the reveal treatment. Support logos now render directly instead of using custom deferred loading, and native token icons render directly with eager loading so they do not disappear while the user scrolls through the asset sections.

Shared UI icons are also excluded from the responsive/deferred image pipeline. The global Share on X button uses the X mark through the shared component itself, and the community forum/GitHub/Discord buttons render their small icons directly.

Kept native lazy loading on small repeated/deep assets where immediate visibility is not required, such as avatars, founder portraits, and community icons.

## Validation

Completed validation:

```bash
npm run check
```

Result: passed. Performance budgets remained within the configured limits.

Rendered preview checks were run against the production preview on `http://127.0.0.1:4178/`.

- Homepage hero loaded without console warnings or errors.
- Fast-scroll checks confirmed the What visual, capability illustrations, protocol visuals, native asset background, and decentralization stats planets enable before reaching the viewport and render as `responsive-image--loaded`.
- Partner logos render directly from `.svg`/`.webp` files with opacity `1`.
- Native token icons render directly from generated `.webp` files, with all 22 token icons loaded in the rendered smoke check.
- Terraform Labs timeline logos render directly from `about-terraform-labs-logo.webp`.
- Share on X and community button icons render from direct shared asset references rather than deferred responsive images.
- Small repeated/deep assets such as avatars, founder portraits, and community icons keep native `loading="lazy"`.
- About page hero and visual-band imagery rendered with eager loading where needed and no raw white image placeholders.
- No browser console warnings or errors were reported during the rendered smoke checks.
