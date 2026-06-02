import { Footer, asset } from "./shared";

type BrandAsset = {
  name: string;
  logoFile: string;
  signFile: string;
  logoDimensions: string;
  signDimensions: string;
};

type KeyVisualAsset = {
  name: string;
  file: string;
  dimensions: string;
};

const brandAssets: BrandAsset[] = [
  {
    name: "Terra Classic",
    logoFile: "Terra Classic",
    signFile: "Terra Classic - Shape",
    logoDimensions: "6366 x 1000 PNG",
    signDimensions: "2000 x 2000 PNG",
  },
  {
    name: "LUNC",
    logoFile: "LUNC",
    signFile: "LUNC - Shape",
    logoDimensions: "3600 x 1000 PNG",
    signDimensions: "2000 x 2000 PNG",
  },
  {
    name: "USTC",
    logoFile: "USTC",
    signFile: "USTC - Shape",
    logoDimensions: "3585 x 1000 PNG",
    signDimensions: "2000 x 1950 PNG",
  },
  {
    name: "Swap Protocol",
    logoFile: "Swap Protocol",
    signFile: "SWAP - Shape",
    logoDimensions: "6795 x 1000 PNG",
    signDimensions: "2000 x 2000 PNG",
  },
  {
    name: "Staking Protocol",
    logoFile: "Staking Protocol",
    signFile: "STAKING - Shape",
    logoDimensions: "7543 x 1000 PNG",
    signDimensions: "2000 x 2000 PNG",
  },
  {
    name: "Forex Protocol",
    logoFile: "Forex Protocol",
    signFile: "FOREX - Shape",
    logoDimensions: "6799 x 1000 PNG",
    signDimensions: "2000 x 2000 PNG",
  },
];

const keyVisualAssets: KeyVisualAsset[] = [
  { name: "Terra Classic", file: "Terra Classic - KV", dimensions: "3085 x 3064 PNG" },
  { name: "LUNC", file: "LUNC - KV", dimensions: "3057 x 3064 PNG" },
  { name: "Swap Protocol", file: "Swap Protocol - KV", dimensions: "3064 x 3064 PNG" },
  { name: "Staking Protocol", file: "Staking Protocol - KV", dimensions: "3045 x 3064 PNG" },
  { name: "Forex Protocol", file: "Forex Protocol - KV", dimensions: "3006 x 3064 PNG" },
];

function brandAssetHref(kind: "logo" | "sign", format: "svg" | "png", file: string) {
  const folder = kind === "logo" ? "Terra Classic - Logo" : "Terra Classic - Signs";
  return asset(`brand-assets/${folder}/${format}/${file}.${format}`);
}

function keyVisualPreviewHref(file: string) {
  return asset(`brand-assets/Key visuals/previews/png/${file}.png`);
}

function keyVisualDownloadHref(file: string) {
  return asset(`brand-assets/Key visuals/png/${file}.png`);
}

function downloadName(name: string, kind: "logo" | "sign" | "key-visual", format: "svg" | "png") {
  return `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${kind}.${format}`;
}

function BrandAssetCard({ item, kind }: { item: BrandAsset; kind: "logo" | "sign" }) {
  const file = kind === "logo" ? item.logoFile : item.signFile;
  const dimensions = kind === "logo" ? item.logoDimensions : item.signDimensions;
  const svgHref = brandAssetHref(kind, "svg", file);
  const pngHref = brandAssetHref(kind, "png", file);

  return (
    <article className={`brand-asset-card brand-asset-card--${kind}`}>
      <div className="brand-asset-card__preview" aria-hidden="true">
        <img src={svgHref} alt="" loading="lazy" />
      </div>
      <div className="brand-asset-card__copy">
        <div>
          <h3 className="tc-type-h5">{item.name}</h3>
          <p className="tc-type-body-small">{kind === "logo" ? "Full logo with wordmark" : "Standalone sign"}</p>
        </div>
        <span className="tc-type-body-very-small">{dimensions}</span>
      </div>
      <div className="brand-asset-card__actions" aria-label={`${item.name} ${kind} downloads`}>
        <a className="brand-asset-download tc-type-link-normal" href={svgHref} download={downloadName(item.name, kind, "svg")}>SVG</a>
        <a className="brand-asset-download tc-type-link-normal" href={pngHref} download={downloadName(item.name, kind, "png")}>PNG</a>
      </div>
    </article>
  );
}

function KeyVisualCard({ item }: { item: KeyVisualAsset }) {
  const previewHref = keyVisualPreviewHref(item.file);
  const pngHref = keyVisualDownloadHref(item.file);

  return (
    <article className="brand-asset-card brand-asset-card--key-visual">
      <div className="brand-asset-card__preview" aria-hidden="true">
        <img src={previewHref} alt="" loading="lazy" />
      </div>
      <div className="brand-asset-card__copy">
        <div>
          <h3 className="tc-type-h5">{item.name}</h3>
          <p className="tc-type-body-small">Key visual</p>
        </div>
        <span className="tc-type-body-very-small">{item.dimensions}</span>
      </div>
      <div className="brand-asset-card__actions" aria-label={`${item.name} key visual downloads`}>
        <a className="brand-asset-download tc-type-link-normal" href={pngHref} download={downloadName(item.name, "key-visual", "png")}>PNG</a>
      </div>
    </article>
  );
}

function BrandAssetSection({
  id,
  title,
  description,
  kind,
}: {
  id: string;
  title: string;
  description: string;
  kind: "logo" | "sign";
}) {
  return (
    <section className="brand-assets-section" id={id} aria-labelledby={`${id}-title`}>
      <header className="brand-assets-section__head">
        <div>
          <h2 className="tc-type-h2" id={`${id}-title`}>{title}</h2>
          <p className="tc-type-body">{description}</p>
        </div>
      </header>
      <div className="brand-assets-grid">
        {brandAssets.map((item) => <BrandAssetCard item={item} kind={kind} key={`${kind}-${item.name}`} />)}
      </div>
    </section>
  );
}

function KeyVisualSection() {
  return (
    <section className="brand-assets-section" id="key-visuals" aria-labelledby="key-visuals-title">
      <header className="brand-assets-section__head">
        <div>
          <h2 className="tc-type-h2" id="key-visuals-title">Key visuals</h2>
          <p className="tc-type-body">Ready-to-use visual compositions for ecosystem announcements, documentation covers, and community materials.</p>
        </div>
      </header>
      <div className="brand-assets-grid brand-assets-grid--key-visuals">
        {keyVisualAssets.map((item) => <KeyVisualCard item={item} key={item.name} />)}
      </div>
    </section>
  );
}

export function BrandAssetsPage() {
  return (
    <>
      <article className="brand-assets-page" id="top" aria-labelledby="brand-assets-title">
        <header className="brand-assets-hero">
          <h1 className="tc-type-h1" id="brand-assets-title">Terra Classic brand assets</h1>
          <p className="tc-type-h4">
            Download source-ready Terra Classic marks for ecosystem communication, documentation, community tooling, and open-source contribution work.
          </p>
        </header>
        <BrandAssetSection
          id="full-logos"
          title="Full logos"
          description="Logo sets combining the Terra Classic sign with each brand wordmark."
          kind="logo"
        />
        <BrandAssetSection
          id="signs"
          title="Signs"
          description="Standalone marks for compact UI, avatars, icons, and visual references."
          kind="sign"
        />
        <KeyVisualSection />
      </article>
      <Footer />
    </>
  );
}
