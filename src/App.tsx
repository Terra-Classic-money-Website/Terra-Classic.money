import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import {
  assets,
  capabilities,
  faqGroups,
  heroGroups,
  popularTopics,
  protocols,
  stats,
  strengths,
} from "./data/content";
import { isPlaceholderLink, links } from "./data/links";
import { AprBadge } from "./components/AprBadge";
import { DeferredResponsiveImage, ResponsiveImage, responsiveImageBase } from "./components/ResponsiveImage";
import { SiteShell, asset, page } from "./components/SiteShell";

const APR_INFO_ENDPOINT = "https://validator.info/api/terra-classic/blockchain/apr-info";

const capabilityImageDimensions: Record<string, { width: number; height: number }> = {
  staking: { width: 1071, height: 540 },
  forex: { width: 1003, height: 436 },
  defi: { width: 622, height: 919 },
  build: { width: 941, height: 924 },
  ecosystem: { width: 859, height: 864 },
  layer2: { width: 985, height: 827 },
  nft: { width: 1000, height: 819 },
};

const capabilityImageWidths: Record<string, readonly number[]> = {
  staking: [360, 720, 1071],
  forex: [360, 720, 1003],
  defi: [360, 622],
  build: [360, 720, 941],
  ecosystem: [360, 720, 859],
  layer2: [360, 720, 985],
  nft: [360, 720, 1000],
};

const protocolImageDimensions: Record<string, { width: number; height: number }> = {
  staking: { width: 1391, height: 1400 },
  swap: { width: 1400, height: 1400 },
  forex: { width: 1373, height: 1400 },
};

const protocolImageWidths: Record<string, readonly number[]> = {
  staking: [480, 768, 1391],
  swap: [480, 768, 1400],
  forex: [480, 768, 1373],
};

const protocolUiImageDimensions: Record<string, { width: number; height: number }> = {
  "protocol-blue-confirmed.png": { width: 384, height: 272 },
  "protocol-deposit-ui-figma.png": { width: 384, height: 312 },
  "protocol-mint-ui-figma.png": { width: 384, height: 440 },
  "protocol-staking-confirmed.png": { width: 384, height: 272 },
  "protocol-staking-ui-figma.png": { width: 384, height: 314 },
  "protocol-swap-ui-figma.png": { width: 384, height: 440 },
  "protocol-validator-ui-figma.png": { width: 384, height: 336 },
};

type AprInfoState = {
  status: "loading" | "ready" | "error";
  value: number | null;
};

function formatAprValue(value: number | null) {
  if (value === null) return "--";
  return `${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}%`;
}

function useAprInfo(enabled = true): AprInfoState {
  const [aprInfo, setAprInfo] = useState<AprInfoState>({ status: "loading", value: null });

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();

    async function loadAprInfo() {
      try {
        const response = await fetch(APR_INFO_ENDPOINT, { signal: controller.signal });
        if (!response.ok) throw new Error(`APR request failed with ${response.status}`);

        const data: unknown = await response.json();
        const apr = typeof data === "object" && data !== null && "apr" in data ? Number(data.apr) : NaN;
        if (!Number.isFinite(apr)) throw new Error("APR response did not include a valid apr number");

        setAprInfo({ status: "ready", value: apr });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("APR_INFO_FETCH_FAILED", error);
        setAprInfo({ status: "error", value: null });
      }
    }

    void loadAprInfo();

    return () => controller.abort();
  }, [enabled]);

  return aprInfo;
}

function DotArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`dot-arrow-icon ${className}`} viewBox="0 0 10 9" aria-hidden="true" focusable="false">
      <circle cx="2" cy="2" r="2" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="8" cy="2" r="2" />
    </svg>
  );
}

const HERO_GLOW_VARIANT = "v2";
const BOTTOM_GLOW_VARIANT = "v2";
const decagonPatternCells = Array.from({ length: 16 }, (_, index) => index);

function resolveHref(rawHref: string) {
  if (isPlaceholderLink(rawHref)) return "#";
  if (rawHref.startsWith("http") || rawHref.startsWith("#")) return rawHref;
  return page(rawHref);
}

const isExternalHref = (href: string) => href.startsWith("http");

const heroLinkHrefs: Record<string, string> = {
  "Understand Terra Classic": "#about",
  "Find wallet": links.ecosystemWallets,
  "Stake your LUNC": "#staking-protocol",
  "Quick start guide": links.docsQuickStart,
  "Check complete documentation": links.docs,
  "Utilise multi-currency suite (20+ assets)": links.docsMultiCurrencySuite,
  "Build payment gateway": links.docsPaymentGateway,
};

const popularTopicHrefs: Record<string, string> = {
  "How to stake LUNC": links.docsStakingDelegate,
  "Terra Classic ecosystem": links.ecosystem,
  "Terra Classic Roadmap": links.roadmap,
};

function DecagonPattern() {
  return (
    <span className="stats-decagon-pattern" style={{ "--stats-decagon-image": `url(${asset("decagon.svg")})` } as CSSProperties} aria-hidden="true">
      {decagonPatternCells.map((cell) => <span key={cell} />)}
    </span>
  );
}

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className={`hero-glow hero-glow--${HERO_GLOW_VARIANT}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="hero-lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <ResponsiveImage
        className="hero-orb"
        baseName="hero-orb-figma"
        widths={[480, 768, 1024, 1848]}
        fallbackWidth={1848}
        sizes="(max-width: 767px) 82vw, 925px"
        alt=""
        width="1848"
        height="1836"
        loading="eager"
        fetchPriority="high"
      />
      <div className="hero-copy">
        <h1 className="tc-type-h1" id="hero-title">Blockchain so decentralized, it’s out of this world.</h1>
        <p className="tc-type-h4">Use Terra Classic, build on it, or integrate it. Everything you need to get started—clear paths, credible tooling, and a network built for decentralized finance.</p>
      </div>
      <div className="hero-groups">
        {heroGroups.map((group) => (
          <article key={group.title} className="hero-group">
            <div className="hero-group-header">
              <h2 className="tc-type-h5">{group.title}</h2>
              <img src={asset(group.logo)} alt="" width={group.logoWidth} height={group.logoHeight} style={{ width: group.logoWidth }} />
            </div>
            {group.links.map((item, index) => {
              const href = resolveHref(heroLinkHrefs[item] || "#about");
              const isExternal = isExternalHref(href);

              return (
                <div className="hero-link-wrap" key={item}>
                  {index > 0 && <span className="hero-group-divider" aria-hidden="true" />}
                  <a className="tc-type-link-normal" href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                    {item}
                    <DotArrowIcon />
                  </a>
                </div>
              );
            })}
          </article>
        ))}
      </div>
    </section>
  );
}

const supportLogos = [
  { name: "Binance", asset: "support-binance.png", className: "support-logo-binance", width: 104, height: 22 },
  { name: "Kraken", asset: "support-kraken.png", className: "support-logo-kraken", width: 94, height: 16 },
  { name: "MEXC", asset: "support-mexc.png", className: "support-logo-mexc", width: 97, height: 15 },
  { name: "HTX", asset: "support-htx.png", className: "support-logo-htx", width: 49, height: 24 },
  { name: "Cosmos", asset: "support-cosmos.png", className: "support-logo-cosmos", width: 107, height: 20 },
  { name: "SolidProof", asset: "support-solidproof.png", className: "support-logo-solidproof", width: 116, height: 28 },
  { name: "Certik", asset: "support-certik.png", className: "support-logo-certik", width: 89, height: 22 },
  { name: "Keplr", asset: "support-keplr.png", className: "support-logo-keplr", width: 72, height: 22 },
  { name: "Trust Wallet", asset: "support-trust.png", className: "support-logo-trust", width: 81, height: 22 },
];

type VideoModalVariant = "community" | "founders";

const videoModalCopy: Record<VideoModalVariant, { title: string; paragraphs: string[] }> = {
  community: {
    title: "Call to action to #TerraClassic community members:",
    paragraphs: [
      "We are building the video sections for https://terra-classic.money from real voices in the ecosystem.",
      'Record and send a 30 sec vertical smartphone video answering one question: "What is Terra Classic?" The best clips will be used to create the homepage explainer video.',
      "Keep it simple: vertical video, smartphone is enough, clear audio, real answer, no overproduction.",
      "Send to email address kontakt@dawidskinder.pl.",
      "If your video is used, you will be listed as a contributor on the About terra-classic.money page.",
    ],
  },
  founders: {
    title: "Call to action to #TerraClassic L2 projects:",
    paragraphs: [
      "We are building the video sections for https://terra-classic.money from real voices in the ecosystem.",
      "Record and send a 1 min vertical smartphone video telling the story of your project: what you are building, why Terra Classic, and why it matters. These videos will be published in the Founder Stories section.",
      "Keep it simple: vertical video, smartphone is enough, clear audio, real answer, no overproduction.",
      "Send to email address kontakt@dawidskinder.pl.",
      "If your video is used, you will be listed as a contributor on the About terra-classic.money page.",
    ],
  },
};

function SupportLogoStrip() {
  return (
    <section className="logo-strip" aria-label="Decentralization supported by">
      <p className="tc-type-body-small">Decentralization supported by:</p>
      <div className="support-logo-row">
        {supportLogos.map((logo, index) => {
          const logoAsset = logo.asset.endsWith(".png") ? `${responsiveImageBase(logo.asset)}.webp` : logo.asset;

          return (
            <div className={`support-logo ${logo.className}`} key={`${logo.name}-${index}`}>
              <img src={asset(logoAsset)} alt={logo.name} loading="eager" width={logo.width} height={logo.height} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

function VideoModal({ open, variant, onClose }: { open: boolean; variant: VideoModalVariant; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const copy = videoModalCopy[variant];

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialog) {
        const focusable = dialog.querySelectorAll<HTMLElement>("button,a,iframe");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
        if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal((
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="video-title" ref={ref} tabIndex={-1} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="Close video modal" onClick={onClose}>×</button>
        {links.videoExplainer ? <iframe title="Terra Classic video explainer" src={links.videoExplainer} allowFullScreen /> : (
          <div className="video-modal-copy">
            <h2 className="tc-type-h3" id="video-title">{copy.title}</h2>
            {copy.paragraphs.map((paragraph) => <p className="tc-type-body" key={paragraph}>{paragraph}</p>)}
          </div>
        )}
      </div>
    </div>
  ), document.body);
}

const donationAddresses = [
  {
    label: "LUNC",
    value: "terra1yerplv7hshr5w2mpa2em0knlx3dm6aln9fwj2m",
  },
  {
    label: "BTC (Native SegWit)",
    value: "bc1q4vevf342hszd367c5n5qf24f7heek04w5zmsv4",
  },
  {
    label: "BNB",
    value: "0x44Db62D8c5507952c2cFBD2F232A975950789E26",
  },
] as const;

function DonationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab" && dialog) {
        const focusable = dialog.querySelectorAll<HTMLElement>("button,a");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { last.focus(); event.preventDefault(); }
        if (!event.shiftKey && document.activeElement === last) { first.focus(); event.preventDefault(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); previous?.focus(); };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setCopied(null);
  }, [open]);

  async function copyAddress(label: string, value: string) {
    const markCopied = () => {
      setCopied(label);
      window.setTimeout(() => setCopied((current) => current === label ? null : current), 1800);
    };

    try {
      await navigator.clipboard.writeText(value);
      markCopied();
    } catch (error) {
      const fallback = document.createElement("textarea");
      fallback.value = value;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.left = "-9999px";
      document.body.appendChild(fallback);
      fallback.select();
      const copiedWithFallback = document.execCommand("copy");
      fallback.remove();
      if (copiedWithFallback) {
        markCopied();
      } else {
        console.warn("DONATION_ADDRESS_COPY_FAILED", error);
      }
    }
  }

  if (!open) return null;

  return (
    <div className="modal-backdrop donation-modal-backdrop" onMouseDown={onClose}>
      <div className="modal donation-modal" role="dialog" aria-modal="true" aria-labelledby="donation-modal-title" ref={ref} tabIndex={-1} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close donation-modal__close x-control" aria-label="Close donation addresses" onClick={onClose}>
          <span /><span /><span /><span /><span />
        </button>
        <div className="donation-modal__copy">
          <h2 className="tc-type-h3" id="donation-modal-title">Donation addresses</h2>
          <div className="donation-addresses" aria-label="Donation addresses">
            {donationAddresses.map(({ label, value }) => (
              <article className="donation-address" key={label}>
                <div className="donation-address__copy">
                  <h3 className="tc-type-link-big">{label}</h3>
                  <code>{value}</code>
                </div>
                <button className="donation-copy-button tc-type-link-small" type="button" onClick={() => void copyAddress(label, value)}>
                  {copied === label ? "Copied" : "Copy"}
                </button>
              </article>
            ))}
          </div>
          <div className="donation-attribution">
            <h3 className="tc-type-h5">Attribution (optional)</h3>
            <p className="tc-type-body-small">If you want to be credited on the "About Terra-Classic.money" page:</p>
            <ul className="tc-type-body-small">
              <li>include your handle/name in the memo/message where your wallet supports it, or</li>
              <li>reply in this thread with: "Donated + your handle" (you can DM me instead if you prefer privacy).</li>
            </ul>
            <p className="tc-type-body-small">If you prefer to stay anonymous, donate with no memo and do not comment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatIsTerraClassic() {
  const [videoOpen, setVideoOpen] = useState(false);
  const avatars = [
    { image: "what-avatar-1.png", className: "what-avatar-1" },
    { image: "what-avatar-2.png", className: "what-avatar-2" },
    { image: "what-avatar-3.png", className: "what-avatar-3" },
    { image: "what-avatar-4.png", className: "what-avatar-4" },
    { image: "what-avatar-5.png", className: "what-avatar-5" },
    { image: "what-avatar-6.png", className: "what-avatar-6" },
    { image: "what-avatar-7.png", className: "what-avatar-7" },
    { image: "what-avatar-8.png", className: "what-avatar-8" },
  ];
  return (
    <section id="about" className="what-section" aria-labelledby="what-title">
      <div className="what-editorial">
        <div className="what-copy">
          <h2 className="tc-type-h2" id="what-title">What is Terra Classic?</h2>
          <p className="lead tc-type-h4">Community-governed, resilient Layer-1 blockchain engineered for dependable settlement and continuous evolution. Built to stay open, composable, and future-ready—so builders and institutions can ship with confidence.</p>
          <p className="tc-type-body">Terra Classic is a public network where anyone can transact, build, and participate in governance. It combines predictable on-chain execution with a pragmatic, upgrade-driven roadmap, so the chain can keep improving without sacrificing continuity. For users, that means straightforward access to wallets, staking, and apps. For teams, it means a stable foundation to launch products, integrate payments, and connect to stablecoin ecosystem designed for interoperability and long-term utility.</p>
        </div>
        <aside className="what-popular">
          <h3 className="tc-type-h5">Popular topics:</h3>
          {popularTopics.map((topic) => {
            const href = resolveHref(popularTopicHrefs[topic] || "#ecosystem");
            const isExternal = isExternalHref(href);

            return (
              <a className="tc-type-link-normal" key={topic} href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                {topic}
                <DotArrowIcon />
              </a>
            );
          })}
        </aside>
      </div>
      <div className="what-visual">
        <DeferredResponsiveImage className="what-surface" baseName="what-surface" widths={[480, 768, 1205]} fallbackWidth={1205} sizes="100vw" alt="" loading="eager" width="1205" height="1600" reveal />
        <span className="what-orb-layer what-left-orb" aria-hidden="true">
          <DeferredResponsiveImage baseName="what-left-orb" widths={[320, 720, 1200]} fallbackWidth={1200} sizes="(max-width: 767px) 177px, 580px" alt="" loading="eager" width="1200" height="1203" reveal />
        </span>
        <span className="what-orb-layer what-right-orb" aria-hidden="true">
          <DeferredResponsiveImage baseName="what-right-orb" widths={[320, 720, 1200]} fallbackWidth={1200} sizes="(max-width: 767px) 174px, 570px" alt="" loading="eager" width="1200" height="1224" reveal />
        </span>
        <span className="what-orb-layer what-main-orb" aria-hidden="true">
          <DeferredResponsiveImage baseName="what-main-orb" widths={[320, 720, 1024, 1700]} fallbackWidth={1700} sizes="(max-width: 767px) 260px, 860px" alt="" loading="eager" width="1700" height="1688" reveal />
        </span>
        {avatars.map((avatar) => (
          <span className={`what-avatar ${avatar.className}`} key={avatar.image}>
            <DeferredResponsiveImage baseName={responsiveImageBase(avatar.image)} widths={[112]} fallbackWidth={112} sizes="(max-width: 767px) 45px, 112px" alt="" loading="lazy" width="112" height="112" />
          </span>
        ))}
        <button className="what-video-button" onClick={() => setVideoOpen(true)}>
          <span className="tc-type-link-big">Watch video explainer — made by investors for investors</span>
          <span className="play-button-icon" aria-hidden="true">
            <img className="play-button-icon__default" src={asset("what-video-dots.svg")} alt="" />
            <img className="play-button-icon__hover" src={asset("what-video-dots-hover.svg")} alt="" />
          </span>
        </button>
      </div>
      <VideoModal open={videoOpen} variant="community" onClose={() => setVideoOpen(false)} />
    </section>
  );
}

function Capabilities() {
  const ctaIcons: Record<string, string> = {
    staking: "capability-staking-icon.svg",
    forex: "capability-forex-icon.svg",
    defi: "capability-defi-arrow.svg",
    build: "capability-arrow.svg",
    ecosystem: "capability-arrow.svg",
    layer2: "capability-layer2-icon.svg",
    nft: "capability-arrow.svg",
  };
  const ctaLinks: Record<string, string> = {
    staking: "#staking-protocol",
    forex: "#forex-protocol",
    defi: links.ecosystem,
    build: links.docs,
    ecosystem: links.ecosystem,
    layer2: links.layer2,
    nft: links.ecosystemApplications,
  };
  const disabledCtas = new Set(["layer2"]);

  return (
    <section id="ecosystem" className="section capabilities-section" aria-labelledby="capabilities-title">
      <div className="capabilities-head">
        <h2 className="tc-type-h2" id="capabilities-title">Explore what Terra Classic enables:</h2>
        <p className="tc-type-h4">From everyday transactions to sophisticated DeFi and enterprise integrations, Terra Classic gives you a decentralized foundation to earn, trade, build, and scale—with clarity, composability, and future-ready performance.</p>
      </div>
      <div className="capabilities-grid">
        {capabilities.map((card) => {
          const rawHref = ctaLinks[card.slug];
          const href = resolveHref(rawHref);
          const isExternal = isExternalHref(href);
          const isDisabled = disabledCtas.has(card.slug);
          const imageDimensions = capabilityImageDimensions[card.slug];

          return (
            <article key={card.title} className={`capability-card capability-card--${card.slug}`}>
              <div className="capability-copy">
                <h3 className="tc-type-h3">{card.title}</h3>
                <p className="tc-type-body">{card.body}</p>
              </div>
              {isDisabled ? (
                <span className="capability-cta capability-cta--disabled" aria-disabled="true">
                  <span className="tc-type-link-big">{card.cta}</span>
                  <img className={`capability-cta-icon capability-cta-icon--${card.slug}`} src={asset(ctaIcons[card.slug])} alt="" aria-hidden="true" />
                </span>
              ) : (
                <a className="capability-cta" href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                  <span className="tc-type-link-big">{card.cta}</span>
                  <img className={`capability-cta-icon capability-cta-icon--${card.slug}`} src={asset(ctaIcons[card.slug])} alt="" aria-hidden="true" />
                </a>
              )}
              <div className="capability-image" aria-hidden="true">
                <DeferredResponsiveImage baseName={responsiveImageBase(card.image)} widths={capabilityImageWidths[card.slug]} fallbackWidth={imageDimensions.width} sizes="(max-width: 767px) 300px, 320px" alt="" loading="eager" width={imageDimensions.width} height={imageDimensions.height} reveal />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProtocolUiImage({ assetName, className }: { assetName: string; className: string }) {
  const dimensions = protocolUiImageDimensions[assetName];

  return (
    <DeferredResponsiveImage
      className={className}
      baseName={responsiveImageBase(assetName)}
      widths={[384]}
      fallbackWidth={384}
      sizes="(max-width: 767px) 128px, 384px"
      alt=""
      loading="eager"
      width={dimensions.width}
      height={dimensions.height}
      reveal
    />
  );
}

function ProtocolShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [shouldLoadApr, setShouldLoadApr] = useState(false);
  const stakingApr = useAprInfo(shouldLoadApr);
  const protocolLinks: Record<string, string[]> = {
    staking: [links.ecosystemWallets, links.stakingDocs],
    swap: [links.swapDocs],
    forex: [links.forexDocs],
  };

  useEffect(() => {
    if (shouldLoadApr) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setShouldLoadApr(true);
      observer.disconnect();
    }, { rootMargin: "640px 0px" });

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoadApr]);

  return (
    <section id="roadmap" className="protocols" aria-label="Protocol showcase" ref={sectionRef}>
      {protocols.map((protocol) => {
        const buttonLinks = protocolLinks[protocol.id] || [];
        const imageDimensions = protocolImageDimensions[protocol.id];

        return (
          <article key={protocol.id} id={`${protocol.id}-protocol`} className={`protocol-panel protocol-panel--${protocol.id}`}>
            <div className={`protocol-glow protocol-glow--${protocol.id} protocol-glow--${BOTTOM_GLOW_VARIANT}`} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="protocol-lines" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="protocol-head">
              <div className="protocol-title-row">
                <img className="protocol-icon" src={asset(protocol.icon)} alt="" aria-hidden="true" />
                <h2 className="tc-type-h1">{protocol.title}</h2>
                {protocol.id === "staking" && <AprBadge className="protocol-apr" value={formatAprValue(stakingApr.value)} state={stakingApr.status} />}
                <span className={`status status--${protocol.status === "ACTIVE" ? "active" : "soon"}`}>
                  {protocol.status}
                  {protocol.status === "ACTIVE" && <img src={asset("protocol-badge-active-arrow.svg")} alt="" aria-hidden="true" />}
                </span>
              </div>
              <p className="tc-type-h4">{protocol.body}</p>
            </div>
            <div className="protocol-visual" aria-hidden="true">
              <DeferredResponsiveImage className="protocol-orb" baseName={responsiveImageBase(protocol.image)} widths={protocolImageWidths[protocol.id]} fallbackWidth={imageDimensions.width} sizes="(max-width: 767px) 296px, 720px" alt="" loading="eager" width={imageDimensions.width} height={imageDimensions.height} reveal />
              {protocol.id === "staking" && (
                <>
                  <ProtocolUiImage className="protocol-ui protocol-ui--staking-validator" assetName={protocol.ui[0]} />
                  <ProtocolUiImage className="protocol-ui protocol-ui--staking-stake" assetName={protocol.ui[1]} />
                  <ProtocolUiImage className="protocol-ui protocol-ui--staking-confirmed" assetName="protocol-staking-confirmed.png" />
                </>
              )}
              {protocol.id === "swap" && (
                <>
                  <ProtocolUiImage className="protocol-ui protocol-ui--swap-form" assetName={protocol.ui[0]} />
                  <ProtocolUiImage className="protocol-ui protocol-ui--swap-confirmed" assetName="protocol-blue-confirmed.png" />
                </>
              )}
              {protocol.id === "forex" && (
                <>
                  <ProtocolUiImage className="protocol-ui protocol-ui--forex-deposit" assetName={protocol.ui[0]} />
                  <ProtocolUiImage className="protocol-ui protocol-ui--forex-mint" assetName={protocol.ui[1]} />
                  <ProtocolUiImage className="protocol-ui protocol-ui--forex-confirmed" assetName="protocol-blue-confirmed.png" />
                </>
              )}
            </div>
            <div className="protocol-bottom">
              <h3 className="tc-type-h5">How it works:</h3>
              <div className="steps">
                {protocol.steps.map((step, index) => (
                  <div key={step} className="step">
                    <div className="step-title">
                      <strong className="tc-type-h5">Step {index + 1}</strong>
                      <span className={`step-arrow ${index < 2 ? "step-arrow--long" : "step-arrow--short"}`} aria-hidden="true">
                        <img src={asset(index < 2 ? "protocol-step-arrow-long.svg" : "protocol-step-arrow-short.svg")} alt="" />
                      </span>
                    </div>
                    <p className="tc-type-body-small">{step}</p>
                  </div>
                ))}
              </div>
              <div className="protocol-actions">
                {protocol.buttons.map((button, index) => {
                  const rawHref = buttonLinks[index] || "#";
                  const href = resolveHref(rawHref);
                  const isExternal = isExternalHref(href);

                  return (
                    <a key={button} className={`protocol-button protocol-button--${index === 0 ? "primary" : "secondary"}`} href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                      <span className="tc-type-link-big">{button}</span>
                      {index === 0 && <img src={asset("protocol-button-arrow.svg")} alt="" aria-hidden="true" />}
                    </a>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function NativeTokenIcon({ icon, compact = false }: { icon: string; compact?: boolean }) {
  const iconAsset = icon.endsWith(".png") ? `${responsiveImageBase(icon)}.webp` : icon;

  return (
    <img
      className={`native-token-card__icon ${compact ? "native-token-card__icon--compact" : ""}`}
      src={asset(iconAsset)}
      alt=""
      aria-hidden="true"
      loading="eager"
      width={compact ? "40" : "50"}
      height={compact ? "40" : "50"}
    />
  );
}

function NativeAssets() {
  const assetPhases = [1, 2, 3, 4].map((phase) => ({
    phase,
    status: phase === 1 ? "IN PROGRESS" : "COMMING SOON",
    items: assets.filter((item) => item.phase === phase),
  }));
  const coinMarketCapHref = resolveHref(links.coinMarketCap);
  const coinGeckoHref = resolveHref(links.coinGecko);
  const nativeAssetsContactHref = resolveHref(links.nativeAssetsContact);

  return (
    <section className="section native-assets" aria-labelledby="assets-title">
      <div className="native-assets__header">
        <h2 className="tc-type-h2" id="assets-title">Terra Classic native assets:</h2>
        <p className="tc-type-h4">Terra Classic is engineered for a broader monetary universe: LUNC as the native speculative asset, plus a multi-currency suite of 20+ assets, ready to be progressively collateralized on-chain.</p>
      </div>

      <div className="native-assets__group native-assets__group--speculative">
        <h3 className="tc-type-h3">Speculative assets:</h3>
        <div className="native-lunc-row">
          <DeferredResponsiveImage className="native-lunc-row__bg" baseName="native-lunc-bg" widths={[192, 385]} fallbackWidth={385} sizes="(max-width: 767px) 320px, 385px" alt="" aria-hidden="true" loading="eager" width="385" height="386" reveal />
          <div className="native-lunc-row__identity">
            <img src={asset("native-lunc-logo.svg")} alt="" aria-hidden="true" width="72" height="72" />
            <div className="native-lunc-row__copy">
              <strong className="tc-type-h2">LUNC</strong>
              <span className="tc-type-body">Terra LUNA Classic</span>
            </div>
          </div>
          <div className="native-lunc-row__links" aria-label="LUNC market links">
            <a href={coinMarketCapHref} target={isExternalHref(coinMarketCapHref) ? "_blank" : undefined} rel={isExternalHref(coinMarketCapHref) ? "noopener noreferrer" : undefined} aria-label="LUNC on CoinMarketCap">
              <img src={asset("native-cmc-icon.svg")} alt="" aria-hidden="true" />
            </a>
            <a href={coinGeckoHref} target={isExternalHref(coinGeckoHref) ? "_blank" : undefined} rel={isExternalHref(coinGeckoHref) ? "noopener noreferrer" : undefined} aria-label="LUNC on CoinGecko">
              <img src={asset("native-cg-icon.svg")} alt="" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="native-assets__group native-assets__group--suite">
        <h3 className="tc-type-h3">Multi-currency suite</h3>
        {assetPhases.map(({ phase, status, items }) => (
          <div className={`native-phase native-phase--${phase}`} key={phase}>
            <div className="native-phase__header">
              <div className="native-phase__label">
                <img src={asset("native-phase-icon.svg")} alt="" aria-hidden="true" width="32" height="32" />
                <strong className="tc-type-h5">Forex Protocol - Phase {phase}</strong>
              </div>
              <span className="native-phase__rule" aria-hidden="true" />
              <span className={`native-phase__badge native-phase__badge--${phase === 1 ? "active" : "soon"}`}>{status}</span>
            </div>
            <ul className="native-token-grid" aria-label={`Forex Protocol phase ${phase} assets`}>
              {items.map((item) => (
                <li className="native-token-card" key={`${phase}-${item.code}-${item.name}`}>
                  <NativeTokenIcon icon={item.icon} compact={item.compactIcon} />
                  <div className="native-token-card__text">
                    <strong className="native-token-card__code" aria-label={item.code}>
                      <span>{item.code.slice(0, -2)}</span>
                      <small>{item.code.slice(-2)}</small>
                    </strong>
                    <span className="native-token-card__name">{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="native-assets__closing tc-type-h4">Looking to bring a new fiat-pegged stable asset on-chain—whether as an issuer, institution, or public-sector partner—connect with the Terra Classic community to explore integration, collateralization, and governance-led rollout.</p>
      <a className="native-assets__button" href={nativeAssetsContactHref} target={isExternalHref(nativeAssetsContactHref) ? "_blank" : undefined} rel={isExternalHref(nativeAssetsContactHref) ? "noopener noreferrer" : undefined}>
        <span className="tc-type-link-big">Requirements and contact</span>
        <img src={asset("native-button-arrow.svg")} alt="" aria-hidden="true" />
      </a>
    </section>
  );
}

function Strengths() {
  return (
    <section id="decentralization" className="section strengths" aria-labelledby="strengths-title">
      <h2 className="tc-type-h2" id="strengths-title">Terra Classic strenghts:</h2>
      <p className="section-intro tc-type-h4">A resilient, community-governed Layer-1 built for speed, uptime, and composability—where decentralization translates into real-world reliability for users, builders, and institutions.</p>
      <div className="strength-grid">
        {strengths.slice(0, 4).map(([title, body], index) => <StrengthCard key={title} index={index} title={title} body={body} />)}
        <div className="strength-visual" aria-hidden="true">
          <span className="strength-visual__bg" />
          <DeferredResponsiveImage className="strength-visual__orb" baseName="strength-orb" widths={[360, 720, 900]} fallbackWidth={900} sizes="292px" alt="" loading="eager" width="900" height="894" reveal />
        </div>
        {strengths.slice(4).map(([title, body], index) => <StrengthCard key={title} index={index + 4} title={title} body={body} />)}
      </div>
    </section>
  );
}

function StrengthCard({ index, title, body }: { index: number; title: string; body: string }) {
  const hasButton = title !== "6s block time" && title !== "Deflationary ecosystem" && title !== "Revival narrative";
  const href = resolveHref(title === "Decentralization" ? links.decentralization : links.docsStrengths);
  const isExternal = isExternalHref(href);

  return (
    <article className={`strength-card strength-card--${index + 1}`}>
      <div className="strength-card__copy">
        <h3 className="tc-type-h3">{title}</h3>
        <p className="tc-type-body">{body}</p>
      </div>
      {hasButton && (
        <a className="strength-card__button" href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
          <span className="tc-type-link-big">Find out more</span>
          <img src={asset("strength-button-arrow.svg")} alt="" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

function DecentralizationStats() {
  return (
    <section id="metrics" className="stats-panel" aria-labelledby="stats-title">
      <div className={`stats-glow stats-glow--${BOTTOM_GLOW_VARIANT}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <DecagonPattern />
      <DeferredResponsiveImage className="stats-small-planets" baseName="stats-small-planets" widths={[360, 720, 1161]} fallbackWidth={1161} sizes="(max-width: 767px) 90vw, 1161px" alt="" aria-hidden="true" loading="eager" width="1161" height="636" reveal />
      <DeferredResponsiveImage className="stats-big-planet" baseName="stats-big-planet" widths={[180, 270]} fallbackWidth={270} sizes="270px" alt="" aria-hidden="true" loading="eager" width="270" height="268" reveal />
      <div className="stats-copy">
        <h2 className="tc-type-h1" id="stats-title">Efficiency driven by decentralization</h2>
        <p className="tc-type-h4">Terra Classic is governed in the open—no CEO, no single company, and no central authority—just a decentralized network where validators, builders, and stakeholders steer the roadmap together.</p>
      </div>
      <div className="stats-bottom">
        <dl className="stats-row">
          {stats.map(([number, label], index) => (
            <div className={`stats-metric stats-metric--${index + 1}`} key={number}>
              <dt>
                <span className="tc-type-h1">{number}</span>
                {index === 2 && <img src={asset("native-lunc-logo.svg")} alt="" aria-hidden="true" width="50" height="50" />}
              </dt>
              <dd className="tc-type-link-normal">{label}</dd>
            </div>
          ))}
        </dl>
        <a className="stats-button" href={page(links.decentralization)}>
          <span className="stats-button__text stats-button__text--desktop tc-type-link-big">Find out more about Terra Classic decentralization</span>
          <span className="stats-button__text stats-button__text--mobile tc-type-link-big">More about Terra classic decentralization</span>
          <img src={asset("strength-button-arrow.svg")} alt="" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function FounderStories() {
  const docsHref = resolveHref(links.docs);
  const [videoOpen, setVideoOpen] = useState(false);
  const storyPlaceholders = [
    [
      "Founder stories in preparation",
      "Recorded stories from Terra Classic builders and L2 teams will be added here as submissions are reviewed.",
    ],
    [
      "L2 project stories wanted",
      "Teams building on Terra Classic can prepare a 1 min vertical video about what they are building and why it matters.",
    ],
    [
      "Community collection opening soon",
      "This section will feature real voices from the ecosystem instead of placeholder profiles.",
    ],
  ];

  return (
    <section className="section founders" aria-labelledby="founders-title">
      <div className="founders-intro">
        <h2 className="tc-type-h2" id="founders-title">Build your own app on Terra Classic:</h2>
        <p className="tc-type-h4">Founder stories are being collected from Terra Classic builders and L2 teams. The section will feature real project clips as the community submits and reviews them.</p>
        <a className="founders-docs-button" href={docsHref} target={isExternalHref(docsHref) ? "_blank" : undefined} rel={isExternalHref(docsHref) ? "noopener noreferrer" : undefined}>
          <span className="tc-type-link-big">Check Terra Classic documentation</span>
          <img src={asset("founder-button-arrow.svg")} alt="" aria-hidden="true" />
        </a>
      </div>
      <div className="founder-head">
        <h3 className="tc-type-h3">Founder’s stories:</h3>
        <div className="founder-controls">
          <button aria-label="Previous founder story"><img src={asset("founder-arrow-left.svg")} alt="" aria-hidden="true" /></button>
          <button aria-label="Next founder story"><img src={asset("founder-arrow-right.svg")} alt="" aria-hidden="true" /></button>
        </div>
      </div>
      <div className="founder-grid">
        {storyPlaceholders.map(([title, body]) => <FounderStoryCard key={title} title={title} body={body} onPlay={() => setVideoOpen(true)} />)}
      </div>
      <VideoModal open={videoOpen} variant="founders" onClose={() => setVideoOpen(false)} />
    </section>
  );
}

function FounderStoryCard({ title, body, onPlay }: { title: string; body: string; onPlay: () => void }) {
  return (
    <article className="founder-card founder-card--placeholder">
      <button className="founder-card__media founder-card__media--placeholder" type="button" onClick={onPlay} aria-label="Open founder story video submission call to action">
        <span className="founder-card__play" aria-hidden="true">
          <img className="founder-card__dot founder-card__dot--1" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--2" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--3" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--4" src={asset("founder-play-dot-alt.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--5" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--6" src={asset("founder-play-dot.svg")} alt="" />
        </span>
      </button>
      <div className="founder-card__copy">
        <h4 className="tc-type-h4">{title}</h4>
        <p className="tc-type-body">{body}</p>
      </div>
    </article>
  );
}

function JoinCommunity() {
  const buttons = [
    ["Official Terra Classic forum", links.agoraForum, "community-agora-figma.webp", "agora"],
    ["Official Github account", links.github, "community-github-figma.svg", "github"],
    ["Unofficial Discord channel", links.discord, "community-discord-figma.webp", "discord"],
  ];
  return (
    <section className="section community" aria-labelledby="community-title">
      <div className="community-copy">
        <h2 className="tc-type-h2" id="community-title">Join Terra Classic community:</h2>
        <p className="tc-type-h4">Track upgrades, evaluate opportunities, and shape what ships next—collaborating with builders, validators, investors, and institutions across governance, code, and real-time discussion.</p>
      </div>
      <div className="community-buttons">
        {buttons.map(([label, href, icon, variant]) => {
          const safeHref = isPlaceholderLink(href) ? "#" : href;
          return (
            <a key={label} href={safeHref} target={safeHref.startsWith("http") ? "_blank" : undefined} rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}>
              <span className="tc-type-link-big">{label}</span>
              <span className={`community-button-icon community-button-icon--${variant}`} aria-hidden="true">
                <img src={asset(icon)} alt="" loading="eager" />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <h2 className="tc-type-h2" id="faq-title">Frequently asked questions:</h2>
      <div className="faq-grid">
        {faqGroups.map((group) => <div key={group.title} className="faq-group"><h3 className="tc-type-h4">{group.title}</h3>{group.items.map((item) => {
          const { question, answer } = item;
          const id = question.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const expanded = open === id;
          return (
            <div className="faq-item" key={question}>
              <button aria-expanded={expanded} aria-controls={`${id}-answer`} onClick={() => setOpen(expanded ? null : id)}>
                <span className="tc-type-link-big">{question}</span>
                <img src={asset("faq-link-arrow.svg")} alt="" aria-hidden="true" />
              </button>
              <p className="tc-type-body-small" id={`${id}-answer`} hidden={!expanded}>{answer}</p>
            </div>
          );
        })}</div>)}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links"><a className="tc-type-link-normal" href={isPlaceholderLink(links.privacy) ? "#" : page(links.privacy)}>Privacy Policy</a><a className="tc-type-link-normal" href={isPlaceholderLink(links.brandAssets) ? "#" : links.brandAssets}>Terra Classic brand assets</a><a className="tc-type-link-normal" href={links.networkStatus} target="_blank" rel="noopener noreferrer">Network status</a></div>
      <p className="footer-credit tc-type-body-very-small">
        <span>Terra-Classic.money designed and developed with</span>
        <img src={asset("footer-heart.svg")} alt="love" width="20" height="19" />
        <span>by <a href={links.dawidSkinder} target="_blank" rel="noopener noreferrer">DawidSkinder.pl</a>, with help from various community members.</span>
      </p>
      <a className="back-top" href="#top">
        <span className="tc-type-link-big">Back to the top</span>
        <img src={asset("footer-back-top-arrow.svg")} alt="" aria-hidden="true" />
      </a>
    </footer>
  );
}

export default function App() {
  return (
    <SiteShell>
      <Hero />
      <SupportLogoStrip />
      <WhatIsTerraClassic />
      <Capabilities />
      <ProtocolShowcase />
      <NativeAssets />
      <Strengths />
      <DecentralizationStats />
      <FounderStories />
      <JoinCommunity />
      <FAQ />
      <Footer />
    </SiteShell>
  );
}
