import { useEffect, useRef, useState, type ImgHTMLAttributes, type Ref } from "react";

type ResponsiveImageFormat = "avif" | "webp";

type ResponsiveImageSource = {
  baseName: string;
  widths: readonly number[];
  fallbackWidth: number;
  media?: string;
  sizes?: string;
  formats?: readonly ResponsiveImageFormat[];
};

type ResponsiveImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "className" | "sizes" | "src" | "srcSet"> & {
  baseName: string;
  widths: readonly number[];
  fallbackWidth: number;
  sizes: string;
  className?: string;
  imgClassName?: string;
  imgRef?: Ref<HTMLImageElement>;
  formats?: readonly ResponsiveImageFormat[];
  sources?: readonly ResponsiveImageSource[];
  enabled?: boolean;
};

type DeferredResponsiveImageProps = Omit<ResponsiveImageProps, "enabled"> & {
  rootMargin?: string;
};

const DEFAULT_FORMATS: readonly ResponsiveImageFormat[] = ["avif", "webp"];

export function responsiveImageBase(assetName: string) {
  return assetName.replace(/\.(avif|webp|png|jpe?g)$/i, "");
}

function imageAsset(name: string) {
  return `${import.meta.env.BASE_URL}assets/${name}`;
}

function sortedWidths(widths: readonly number[], fallbackWidth: number) {
  return [...new Set([...widths, fallbackWidth])].sort((a, b) => a - b);
}

function imageFileName(baseName: string, width: number, fallbackWidth: number, format: ResponsiveImageFormat) {
  const suffix = width === fallbackWidth ? "" : `-${width}`;
  return `${baseName}${suffix}.${format}`;
}

function srcSetFor(source: ResponsiveImageSource, format: ResponsiveImageFormat) {
  return sortedWidths(source.widths, source.fallbackWidth)
    .map((width) => `${imageAsset(imageFileName(source.baseName, width, source.fallbackWidth, format))} ${width}w`)
    .join(", ");
}

export function ResponsiveImage({
  baseName,
  widths,
  fallbackWidth,
  sizes,
  className,
  imgClassName = "responsive-image__img",
  imgRef,
  formats = DEFAULT_FORMATS,
  sources = [],
  enabled = true,
  decoding = "async",
  ...imgProps
}: ResponsiveImageProps) {
  const fallbackSource: ResponsiveImageSource = { baseName, widths, fallbackWidth, sizes, formats };
  const allSources = [...sources, fallbackSource];
  const fallbackSrc = imageAsset(imageFileName(baseName, fallbackWidth, fallbackWidth, "webp"));

  return (
    <picture className={className}>
      {enabled && allSources.flatMap((source) => (
        (source.formats || formats).map((format) => (
          <source
            key={`${source.media || "default"}-${source.baseName}-${format}`}
            type={`image/${format}`}
            media={source.media}
            srcSet={srcSetFor(source, format)}
            sizes={source.sizes || sizes}
          />
        ))
      ))}
      <img
        {...imgProps}
        ref={imgRef}
        className={imgClassName}
        src={enabled ? fallbackSrc : undefined}
        srcSet={enabled ? srcSetFor(fallbackSource, "webp") : undefined}
        sizes={sizes}
        decoding={decoding}
      />
    </picture>
  );
}

export function DeferredResponsiveImage({ rootMargin = "320px 0px", ...props }: DeferredResponsiveImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const image = imageRef.current;
    if (!image) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setShouldLoad(true);
      observer.disconnect();
    }, { rootMargin });

    observer.observe(image);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  return <ResponsiveImage {...props} imgRef={imageRef} enabled={shouldLoad} data-src={shouldLoad ? undefined : props.baseName} />;
}
