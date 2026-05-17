import { useEffect, useRef, useState } from "react";
import {
  assets,
  capabilities,
  externalNav,
  faqGroups,
  founders,
  heroGroups,
  languageOptions,
  popularTopics,
  protocols,
  sections,
  sidebarDisclaimer,
  stats,
  strengths,
} from "./data/content";
import { isPlaceholderLink, links } from "./data/links";
import { AprBadge } from "./components/AprBadge";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const APR_INFO_ENDPOINT = "https://validator.info/api/terra-classic/blockchain/apr-info";

type AprInfoState = {
  status: "loading" | "ready" | "error";
  value: number | null;
};

function formatAprValue(value: number | null) {
  if (value === null) return "--";
  return `${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}%`;
}

function useAprInfo(): AprInfoState {
  const [aprInfo, setAprInfo] = useState<AprInfoState>({ status: "loading", value: null });

  useEffect(() => {
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
  }, []);

  return aprInfo;
}

function useStoredBoolean(key: string, fallback: boolean) {
  const [value, setValue] = useState(() => localStorage.getItem(key) === null ? fallback : localStorage.getItem(key) === "true");
  useEffect(() => localStorage.setItem(key, String(value)), [key, value]);
  return [value, setValue] as const;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);
  return matches;
}

function LinkButton({ href, children, dark = false }: { href: string; children: string; dark?: boolean }) {
  const safeHref = isPlaceholderLink(href) ? "#" : href;
  return (
    <a className={`pill-button tc-type-link-big ${dark ? "pill-button--dark" : ""}`} href={safeHref} target={safeHref.startsWith("http") ? "_blank" : undefined} rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}>
      <span>{children}</span>
      <span className="button-arrow-icon" aria-hidden="true">
        <img className="button-arrow-icon__default" src={asset(dark ? "button-arrow-white.svg" : "button-arrow-light.svg")} alt="" />
        <img className="button-arrow-icon__hover" src={asset(dark ? "button-arrow-black.svg" : "button-arrow-white.svg")} alt="" />
      </span>
    </a>
  );
}

function CollapseControl({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <span className={`collapse-control ${collapsed ? "collapse-control--collapsed" : "collapse-control--opened"}`} aria-hidden="true">
      <span /><span /><span /><span /><span /><span />
    </span>
  );
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

function Sidebar({ activeId }: { activeId: string }) {
  const [collapsed, setCollapsed] = useStoredBoolean("tcm-sidebar-collapsed", false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);

  const nav = (
    <>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {sections.map((section) => (
          <a key={section.id} className={`${activeId === section.id ? "active " : ""}tc-type-link-normal`} href={`#${section.id}`} onClick={() => setDrawerOpen(false)}>
            {section.label}
          </a>
        ))}
      </nav>
      <nav className="sidebar-nav sidebar-nav--external" aria-label="External navigation">
        {externalNav.map((item) => (
          <a key={item.label} className="tc-type-link-normal" href={isPlaceholderLink(item.href) ? "#" : item.href} target="_blank" rel="noopener noreferrer">
            <span className="sidebar-external-icon" aria-hidden="true">
              <img src={asset("sidebar-external-arrow.svg")} alt="" />
            </span>
            {item.label}
          </a>
        ))}
      </nav>
    </>
  );

  return (
    <>
      <header className="mobile-topbar">
        <a className="mobile-brand" href="#top" aria-label="Terra Classic home">
          <img src={asset("sidebar-logo.svg")} alt="" />
        </a>
        <button className="mobile-menu-button" aria-label="Open navigation" aria-expanded={drawerOpen} onClick={() => setDrawerOpen((open) => !open)}>
          <CollapseControl collapsed />
        </button>
      </header>
      <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${drawerOpen ? "sidebar--drawer-open" : ""}`}>
        <div className="sidebar-panel sidebar-panel--expanded" aria-hidden={collapsed && !drawerOpen}>
          <div className="sidebar-top">
            <div className="sidebar-brand">
              <img src={asset("sidebar-logo.svg")} alt="Terra Classic" />
              <button className="sidebar-collapse" aria-label="Collapse sidebar" aria-expanded="true" onClick={() => setCollapsed(true)}>
                <CollapseControl />
              </button>
            </div>
            <div className="sidebar-nav-wrap">{nav}</div>
          </div>
          <div className="sidebar-bottom">
            <div className={`language ${langOpen ? "language--open" : ""}`}>
              <button className="language-trigger tc-type-link-small" aria-expanded={langOpen} onClick={() => setLangOpen((open) => !open)}>
                <span className="language-trigger-label">
                  <span>
                    <img className="language-icon" src={asset("language-icon.svg")} alt="" />
                    Language - {language}
                  </span>
                  {langOpen ? (
                    <img className="language-arrow language-arrow--open" src={asset("language-arrow-open.svg")} alt="" />
                  ) : (
                    <img className="language-arrow" src={asset("language-arrow.svg")} alt="" />
                  )}
                </span>
              </button>
              <div className="language-options language-options-panel" role="listbox" aria-label="Language options" aria-hidden={!langOpen}>
                {languageOptions.map((option, index) => (
                  <button className="tc-type-link-small" key={`${option}-${index}`} onClick={() => { setLanguage(option); setLangOpen(false); }}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="disclaimer">
              <strong>Disclaimers:</strong>
              <p>{sidebarDisclaimer}</p>
            </div>
          </div>
        </div>
        <div className="sidebar-panel sidebar-panel--collapsed" aria-hidden={!collapsed || drawerOpen}>
          <div className="sidebar-top">
            <div className="sidebar-brand">
              <button className="sidebar-brand-collapsed" aria-label="Expand sidebar" aria-expanded="false" onClick={() => setCollapsed(false)}>
                <img src={asset("sidebar-logo-icon.svg")} alt="" />
                <CollapseControl collapsed />
              </button>
            </div>
          </div>
          <div className="sidebar-collapsed-bottom">
            <div className="collapsed-buttons-stack">
              <div className="vertical-url tc-type-link-small">www.terra-classic.money</div>
              <div className="collapsed-language-slot">
                <button className={`collapsed-language-button ${langOpen ? "collapsed-language-button--open" : ""}`} aria-label={`${langOpen ? "Close" : "Open"} language selector`} aria-expanded={langOpen} onClick={() => setLangOpen((open) => !open)}>
                  {langOpen ? (
                    <>
                    <img className="language-x-icon language-x-icon--default" src={asset("language-x.svg")} alt="" />
                    <img className="language-x-icon language-x-icon--hover" src={asset("language-x-hover.svg")} alt="" />
                    </>
                  ) : (
                    <img src={asset("language-icon.svg")} alt="" />
                  )}
                </button>
                <div className="collapsed-language-options collapsed-language-panel" role="listbox" aria-label="Language options" aria-hidden={!langOpen}>
                  {languageOptions.map((option, index) => (
                    <button className="tc-type-link-small" key={`${option}-${index}`} onClick={() => { setLanguage(option); setLangOpen(false); }}>
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="collapsed-disclaimer">
              <div>
                Terra-Classic.money is not the official website of Terra Classic. Just as no one owns the technology behind email, no one owns the Terra Classic blockchain. Accordingly, no single entity can speak with authority on behalf of Terra Classic.
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="announcement" role="status">
      <div className="announcement-inner">
        <div className="workshops-logo" role="img" aria-label="Terra Classic Workshops">
          <img className="workshops-logo__bottom" src={asset("announcement-workshops-bottom.svg")} alt="" />
          <img className="workshops-logo__main" src={asset("announcement-workshops-main.svg")} alt="" />
          <img className="workshops-logo__top" src={asset("announcement-workshops-top.svg")} alt="" />
          <img className="workshops-logo__dot-right" src={asset("announcement-workshops-dot-right.svg")} alt="" />
          <img className="workshops-logo__dot-left" src={asset("announcement-workshops-dot-left.svg")} alt="" />
        </div>
        <span />
        <p className="tc-type-body">ClassicGathering, the flagship conference of the Terra Classic ecosystem, February 23–24 in San Francisco</p>
      </div>
      <button className="announcement-close x-control" type="button" aria-label="Close announcement" onClick={() => setVisible(false)}>
        <span /><span /><span /><span /><span />
      </button>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true">
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
      <img className="hero-orb" src={asset("hero-orb-figma.png")} alt="" />
      <div className="hero-copy">
        <h1 className="tc-type-h1" id="hero-title">Blockchain so decentralized, it’s out of this world.</h1>
        <p className="tc-type-h4">Use Terra Classic, build on it, or integrate it. Everything you need to get started—clear paths, credible tooling, and a network built for decentralized finance.</p>
      </div>
      <div className="hero-groups">
        {heroGroups.map((group) => (
          <article key={group.title} className="hero-group">
            <div className="hero-group-header">
              <h2 className="tc-type-h5">{group.title}</h2>
              <img src={asset(group.logo)} alt="" style={{ width: group.logoWidth }} />
            </div>
            {group.links.map((item, index) => (
              <div className="hero-link-wrap" key={item}>
                {index > 0 && <span className="hero-group-divider" aria-hidden="true" />}
                <a className="tc-type-link-normal" href="#about">
                  {item}
                  <DotArrowIcon />
                </a>
              </div>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}

const supportLogos = [
  { name: "Binance", asset: "support-binance.svg", className: "support-logo-binance" },
  { name: "Circle", asset: "support-circle.png", className: "support-logo-circle" },
  { name: "Franklin Templeton", asset: "support-franklin.png", className: "support-logo-franklin" },
  { name: "PayPal USD", asset: "support-paypal-usd.png", className: "support-logo-paypal" },
  { name: "Etherfuse", asset: "support-etherfuse.png", className: "support-logo-etherfuse" },
  { name: "Binance", asset: "support-binance.svg", className: "support-logo-binance" },
  { name: "Circle", asset: "support-circle.png", className: "support-logo-circle support-logo-circle-repeat" },
  { name: "Franklin Templeton", asset: "support-franklin.png", className: "support-logo-franklin" },
];

function SupportLogoStrip() {
  return (
    <section className="logo-strip" aria-label="Decentralization supported by">
      <p className="tc-type-body-very-small">Decentralization supported by:</p>
      <div className="support-logo-row">
        {supportLogos.map((logo, index) => (
          <div className={`support-logo ${logo.className}`} key={`${logo.name}-${index}`}>
            <img src={asset(logo.asset)} alt={logo.name} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
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
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="video-title" ref={ref} tabIndex={-1} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="Close video modal" onClick={onClose}>×</button>
        {links.videoExplainer ? <iframe title="Terra Classic video explainer" src={links.videoExplainer} allowFullScreen /> : (
          <>
            <h2 className="tc-type-h2" id="video-title">Video coming soon</h2>
            <p className="tc-type-body">The explainer URL is centralized in <code>src/data/links.ts</code> and can be enabled without changing component code.</p>
          </>
        )}
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
          {popularTopics.map((topic) => (
            <a className="tc-type-link-normal" key={topic} href="#ecosystem">
              {topic}
              <DotArrowIcon />
            </a>
          ))}
        </aside>
      </div>
      <div className="what-visual">
        <img className="what-surface" src={asset("what-surface.png")} alt="" loading="lazy" />
        <img className="what-left-orb" src={asset("what-left-orb.png")} alt="" loading="lazy" />
        <img className="what-right-orb" src={asset("what-right-orb.png")} alt="" loading="lazy" />
        <img className="what-main-orb" src={asset("what-main-orb.png")} alt="" loading="lazy" />
        {avatars.map((avatar) => (
          <span className={`what-avatar ${avatar.className}`} key={avatar.image}>
            <img src={asset(avatar.image)} alt="" loading="lazy" />
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
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
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
    staking: links.stakingDocs,
    forex: links.forexDocs,
    defi: links.ecosystem,
    build: links.docs,
    ecosystem: links.ecosystem,
    layer2: links.layer2,
    nft: links.ecosystem,
  };

  return (
    <section id="ecosystem" className="section capabilities-section" aria-labelledby="capabilities-title">
      <div className="capabilities-head">
        <h2 className="tc-type-h2" id="capabilities-title">Explore what Terra Classic enables:</h2>
        <p className="tc-type-h4">From everyday transactions to sophisticated DeFi and enterprise integrations, Terra Classic gives you a decentralized foundation to earn, trade, build, and scale—with clarity, composability, and future-ready performance.</p>
      </div>
      <div className="capabilities-grid">
        {capabilities.map((card) => {
          const rawHref = ctaLinks[card.slug];
          const href = isPlaceholderLink(rawHref) ? "#" : rawHref;
          const isExternal = href.startsWith("http");

          return (
            <article key={card.title} className={`capability-card capability-card--${card.slug}`}>
              <div className="capability-copy">
                <h3 className="tc-type-h3">{card.title}</h3>
                <p className="tc-type-body">{card.body}</p>
              </div>
              <a className="capability-cta" href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
                <span className="tc-type-link-big">{card.cta}</span>
                <img className={`capability-cta-icon capability-cta-icon--${card.slug}`} src={asset(ctaIcons[card.slug])} alt="" aria-hidden="true" />
              </a>
              <div className="capability-image" aria-hidden="true">
                <img src={asset(card.image)} alt="" loading="lazy" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ProtocolShowcase() {
  const stakingApr = useAprInfo();
  const protocolLinks: Record<string, string[]> = {
    staking: [links.stakingDocs, "#", links.stakingDocs],
    swap: [links.swapDocs],
    forex: [links.forexDocs],
  };

  return (
    <section id="roadmap" className="protocols" aria-label="Protocol showcase">
      {protocols.map((protocol) => {
        const buttonLinks = protocolLinks[protocol.id] || [];

        return (
          <article key={protocol.id} className={`protocol-panel protocol-panel--${protocol.id}`}>
            <div className={`protocol-glow protocol-glow--${protocol.id}`} aria-hidden="true">
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
              </div>
              <span className={`status status--${protocol.status === "ACTIVE" ? "active" : "soon"}`}>
                {protocol.status}
                {protocol.status === "ACTIVE" && <img src={asset("protocol-badge-active-arrow.svg")} alt="" aria-hidden="true" />}
              </span>
              <p className="tc-type-h4">{protocol.body}</p>
            </div>
            <div className="protocol-visual" aria-hidden="true">
              <img className="protocol-orb" src={asset(protocol.image)} alt="" loading="lazy" />
              {protocol.id === "staking" && (
                <>
                  <img className="protocol-ui protocol-ui--staking-validator" src={asset(protocol.ui[0])} alt="" loading="lazy" />
                  <img className="protocol-ui protocol-ui--staking-stake" src={asset(protocol.ui[1])} alt="" loading="lazy" />
                  <img className="protocol-ui protocol-ui--staking-confirmed" src={asset("protocol-staking-confirmed.png")} alt="" loading="lazy" />
                </>
              )}
              {protocol.id === "swap" && (
                <>
                  <img className="protocol-ui protocol-ui--swap-form" src={asset(protocol.ui[0])} alt="" loading="lazy" />
                  <img className="protocol-ui protocol-ui--swap-confirmed" src={asset("protocol-blue-confirmed.png")} alt="" loading="lazy" />
                </>
              )}
              {protocol.id === "forex" && (
                <>
                  <img className="protocol-ui protocol-ui--forex-deposit" src={asset(protocol.ui[0])} alt="" loading="lazy" />
                  <img className="protocol-ui protocol-ui--forex-mint" src={asset(protocol.ui[1])} alt="" loading="lazy" />
                  <img className="protocol-ui protocol-ui--forex-confirmed" src={asset("protocol-blue-confirmed.png")} alt="" loading="lazy" />
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
                  const href = isPlaceholderLink(rawHref) ? "#" : rawHref;
                  const isExternal = href.startsWith("http");

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

function NativeAssets() {
  const assetPhases = [1, 2, 3, 4].map((phase) => ({
    phase,
    status: phase === 1 ? "IN PROGRESS" : "COMMING SOON",
    items: assets.filter((item) => item.phase === phase),
  }));
  const coinMarketCapHref = isPlaceholderLink(links.coinMarketCap) ? "#" : links.coinMarketCap;
  const coinGeckoHref = isPlaceholderLink(links.coinGecko) ? "#" : links.coinGecko;
  const nativeAssetsContactHref = isPlaceholderLink(links.nativeAssetsContact) ? "#" : links.nativeAssetsContact;

  return (
    <section className="section native-assets" aria-labelledby="assets-title">
      <div className="native-assets__header">
        <h2 className="tc-type-h2" id="assets-title">Terra Classic native assets:</h2>
        <p className="tc-type-h4">Terra Classic is engineered for a broader monetary universe: LUNC as the native speculative asset, plus a multi-currency suite of 20+ assets, ready to be progressively collateralized on-chain.</p>
      </div>

      <div className="native-assets__group native-assets__group--speculative">
        <h3 className="tc-type-h3">Speculative assets:</h3>
        <div className="native-lunc-row">
          <img className="native-lunc-row__bg" src={asset("native-lunc-bg.png")} alt="" aria-hidden="true" loading="lazy" width="385" height="386" />
          <div className="native-lunc-row__identity">
            <img src={asset("native-lunc-logo.svg")} alt="" aria-hidden="true" width="72" height="72" />
            <div className="native-lunc-row__copy">
              <strong className="tc-type-h2">LUNC</strong>
              <span className="tc-type-body">Terra LUNA Classic</span>
            </div>
          </div>
          <div className="native-lunc-row__links" aria-label="LUNC market links">
            <a href={coinMarketCapHref} target={coinMarketCapHref.startsWith("http") ? "_blank" : undefined} rel={coinMarketCapHref.startsWith("http") ? "noopener noreferrer" : undefined} aria-label="LUNC on CoinMarketCap">
              <img src={asset("native-cmc-icon.svg")} alt="" aria-hidden="true" />
            </a>
            <a href={coinGeckoHref} target={coinGeckoHref.startsWith("http") ? "_blank" : undefined} rel={coinGeckoHref.startsWith("http") ? "noopener noreferrer" : undefined} aria-label="LUNC on CoinGecko">
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
                  <img className={`native-token-card__icon ${item.compactIcon ? "native-token-card__icon--compact" : ""}`} src={asset(item.icon)} alt="" aria-hidden="true" loading="lazy" width={item.compactIcon ? "40" : "50"} height={item.compactIcon ? "40" : "50"} />
                  <div className="native-token-card__text">
                    <strong className="native-token-card__code" aria-label={item.code}>
                      <span>{item.code.slice(0, -2)}</span>
                      <small>{item.code.slice(-2)}</small>
                    </strong>
                    <span className="tc-type-body-very-small">{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="native-assets__closing tc-type-h4">Looking to bring a new fiat-pegged stable asset on-chain—whether as an issuer, institution, or public-sector partner—connect with the Terra Classic community to explore integration, collateralization, and governance-led rollout.</p>
      <a className="native-assets__button" href={nativeAssetsContactHref} target={nativeAssetsContactHref.startsWith("http") ? "_blank" : undefined} rel={nativeAssetsContactHref.startsWith("http") ? "noopener noreferrer" : undefined}>
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
        <div className="strength-visual"><img src={asset("strength-visual-card.png")} alt="" loading="lazy" width="384" height="384" /></div>
        {strengths.slice(4).map(([title, body], index) => <StrengthCard key={title} index={index + 4} title={title} body={body} />)}
      </div>
    </section>
  );
}

function StrengthCard({ index, title, body }: { index: number; title: string; body: string }) {
  const hasButton = title !== "6s block time" && title !== "Deflationary ecosystem" && title !== "Revival narrative";

  return (
    <article className={`strength-card strength-card--${index + 1}`}>
      <div className="strength-card__copy">
        <h3 className="tc-type-h3">{title}</h3>
        <p className="tc-type-body">{body}</p>
      </div>
      {hasButton && (
        <a className="strength-card__button" href="#">
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
      <div className="stats-glow" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <img className="stats-decagon-pattern" src={asset("decagon.svg")} alt="" aria-hidden="true" loading="lazy" width="1288" height="1208" />
      <img className="stats-planets" src={asset("stats-planets-figma.png")} alt="" aria-hidden="true" loading="lazy" width="1161" height="636" />
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
                {index === 2 && <img src={asset("lunc-logo.svg")} alt="" aria-hidden="true" width="50" height="50" />}
              </dt>
              <dd className="tc-type-link-normal">{label}</dd>
            </div>
          ))}
        </dl>
        <a className="stats-button" href="#decentralization">
          <span className="tc-type-link-big">Find out more about Terra Classic decentralization</span>
          <img src={asset("strength-button-arrow.svg")} alt="" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

function FounderStories() {
  const docsHref = isPlaceholderLink(links.docs) ? "#" : links.docs;

  return (
    <section className="section founders" aria-labelledby="founders-title">
      <div className="founders-intro">
        <h2 className="tc-type-h2" id="founders-title">Build your own app on Terra Classic:</h2>
        <p className="tc-type-h4">Explore founder stories from teams already scaling real products across the ecosystem. Then launch your product / service with a fast, composable Layer-1 and a community that ships.</p>
        <a className="founders-docs-button" href={docsHref} target={docsHref.startsWith("http") ? "_blank" : undefined} rel={docsHref.startsWith("http") ? "noopener noreferrer" : undefined}>
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
        {founders.map(([name, role]) => <FounderStoryCard key={name} name={name} role={role} />)}
      </div>
    </section>
  );
}

function FounderStoryCard({ name, role }: { name: string; role: string }) {
  return (
    <article className="founder-card">
      <div className="founder-card__media">
        <img className="founder-card__portrait" src={asset("founder-story-portrait.png")} alt={`${name} portrait`} loading="lazy" width="768" height="1024" />
        <div className="founder-card__play" aria-hidden="true">
          <img className="founder-card__dot founder-card__dot--1" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--2" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--3" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--4" src={asset("founder-play-dot-alt.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--5" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--6" src={asset("founder-play-dot.svg")} alt="" />
        </div>
      </div>
      <div className="founder-card__copy">
        <h4 className="tc-type-h4">{name}</h4>
        <p className="tc-type-body">{role}</p>
      </div>
    </article>
  );
}

function JoinCommunity() {
  const buttons = [
    ["Agora - Official Terra classic forum", links.agoraForum, "community-agora-figma.png", "agora"],
    ["Official Github account", links.github, "community-github-figma.svg", "github"],
    ["Unofficial Discord channel", links.discord, "community-discord-figma.png", "discord"],
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
                <img src={asset(icon)} alt="" />
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
        {faqGroups.map(([group, questions]) => <div key={group} className="faq-group"><h3 className="tc-type-h4">{group}</h3>{questions.map((question) => {
          const id = question.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const expanded = open === id;
          return (
            <div className="faq-item" key={question}>
              <button aria-expanded={expanded} aria-controls={`${id}-answer`} onClick={() => setOpen(expanded ? null : id)}>
                <span className="tc-type-link-big">{question}</span>
                <img src={asset("faq-link-arrow.svg")} alt="" aria-hidden="true" />
              </button>
              <p className="tc-type-body-small" id={`${id}-answer`} hidden={!expanded}>Answer content is pending final editorial approval. This placeholder preserves the accessible accordion behavior without inventing Figma-missing answer copy.</p>
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
      <div className="footer-links"><a className="tc-type-link-normal" href={isPlaceholderLink(links.privacy) ? "#" : links.privacy}>Privacy Policy</a><a className="tc-type-link-normal" href={isPlaceholderLink(links.brandAssets) ? "#" : links.brandAssets}>Terra Classic brand assets</a></div>
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

const pixelAnchors = [
  { id: "top", top: 0 },
  { id: "about", top: 1085 },
  { id: "ecosystem", top: 2701 },
  { id: "roadmap", top: 4765 },
  { id: "decentralization", top: 10585 },
  { id: "metrics", top: 12221 },
] as const;

const pixelSections = [
  { src: "figma-sections/sidebar.png", left: 0, top: 0, width: 312, height: 17168 },
  { src: "figma-sections/info-box.png", left: 328, top: 16, width: 1288, height: 80 },
  { src: "figma-sections/hero.png", left: 328, top: 104, width: 1288, height: 776 },
  { src: "figma-sections/support-by.png", left: 328, top: 888, width: 1288, height: 180 },
  { src: "figma-sections/divider-1.png", left: 328, top: 1076, width: 1288, height: 1 },
  { src: "figma-sections/what-is.png", left: 328, top: 1085, width: 1288, height: 1608 },
  { src: "figma-sections/capabilities.png", left: 328, top: 2701, width: 1304, height: 2056 },
  { src: "figma-sections/products.png", left: 328, top: 4765, width: 1288, height: 3640 },
  { src: "figma-sections/native-assets.png", left: 328, top: 8413, width: 1288, height: 2164 },
  { src: "figma-sections/strengths.png", left: 328, top: 10585, width: 1288, height: 1628 },
  { src: "figma-sections/stats.png", left: 328, top: 12221, width: 1288, height: 1208 },
  { src: "figma-sections/founders.png", left: 328, top: 13437, width: 1288, height: 1219 },
  { src: "figma-sections/community.png", left: 328, top: 14664, width: 1288, height: 452 },
  { src: "figma-sections/divider-2.png", left: 328, top: 15124, width: 1288, height: 1 },
  { src: "figma-sections/faq.png", left: 328, top: 15133, width: 1288, height: 1825 },
  { src: "figma-sections/footer.png", left: 328, top: 16966, width: 1288, height: 138 },
] as const;

const pixelLinks = [
  { label: "Ecosystem", href: "#ecosystem", left: 32, top: 92, width: 78, height: 18 },
  { label: "Decentralization", href: "#decentralization", left: 32, top: 125, width: 120, height: 18 },
  { label: "Roadmap", href: "#roadmap", left: 32, top: 158, width: 75, height: 18 },
  { label: "Markets", href: "#metrics", left: 32, top: 191, width: 62, height: 18 },
  { label: "About terra-classic.money", href: "#about", left: 32, top: 224, width: 175, height: 18 },
  { label: "Layer 2", href: links.layer2, left: 32, top: 308, width: 72, height: 18 },
  { label: "Documentation", href: links.docs, left: 32, top: 341, width: 112, height: 18 },
  { label: "Understand Terra Classic", href: "#about", left: 392, top: 686, width: 334, height: 18 },
  { label: "Find wallet", href: links.wallet, left: 392, top: 731, width: 334, height: 18 },
  { label: "Stake your LUNC", href: links.stakingDocs, left: 392, top: 776, width: 334, height: 18 },
  { label: "Quick start guide", href: links.docs, left: 781, top: 685, width: 334, height: 18 },
  { label: "Check complete documentation", href: links.docs, left: 781, top: 730, width: 334, height: 18 },
  { label: "Utilise multi-currency suite", href: "#ecosystem", left: 1171, top: 686, width: 334, height: 18 },
  { label: "Build payment gateway", href: "#ecosystem", left: 1171, top: 731, width: 334, height: 18 },
  { label: "Find a wallet and stake", href: "#roadmap", left: 392, top: 6877, width: 236, height: 56 },
  { label: "Swap Protocol docs", href: "#roadmap", left: 392, top: 8085, width: 204, height: 56 },
  { label: "Forex Protocol docs", href: "#roadmap", left: 392, top: 9293, width: 204, height: 56 },
  { label: "Back to the top", href: "#top", left: 376, top: 17048, width: 1097, height: 56 },
] as const;

function PixelDesktop({ interactive = true }: { interactive?: boolean }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="pixel-desktop" aria-label="Terra Classic homepage desktop implementation">
      {interactive && pixelAnchors.map((anchor) => (
        <span key={anchor.id} id={anchor.id} className="pixel-anchor" style={{ top: anchor.top }} />
      ))}
      {pixelSections.map((section) => (
        <img
          key={section.src}
          className="pixel-section-image"
          src={asset(section.src)}
          alt=""
          width={section.width}
          height={section.height}
          loading="eager"
          decoding="async"
          draggable="false"
          style={{ left: section.left, top: section.top, width: section.width, height: section.height }}
        />
      ))}
      {interactive && (
        <>
          <nav className="pixel-hotspots" aria-label="Desktop page shortcuts">
            {pixelLinks.map((link) => (
              <a
                key={`${link.href}-${link.label}`}
                className="pixel-hotspot"
                href={isPlaceholderLink(link.href) ? "#" : link.href}
                aria-label={link.label}
                target={(isPlaceholderLink(link.href) ? "#" : link.href).startsWith("http") ? "_blank" : undefined}
                rel={(isPlaceholderLink(link.href) ? "#" : link.href).startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ left: link.left, top: link.top, width: link.width, height: link.height }}
              />
            ))}
          </nav>
          <button
            className="pixel-hotspot pixel-button-hotspot"
            type="button"
            aria-label="Watch video explainer — made by investors for investors"
            onClick={() => setVideoOpen(true)}
            style={{ left: 684, top: 2116, width: 576, height: 122 }}
          />
          <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
        </>
      )}
      {interactive && <div className="visually-hidden">
        <h1>Blockchain so decentralized, it’s out of this world.</h1>
        <p>Use Terra Classic, build on it, or integrate it. Everything you need to get started—clear paths, credible tooling, and a network built for decentralized finance.</p>
        <h2>What is Terra Classic?</h2>
        <h2>Explore what Terra Classic enables:</h2>
        <h2>Staking Protocol</h2>
        <h2>Swap Protocol</h2>
        <h2>Forex Protocol</h2>
        <h2>Terra Classic native assets:</h2>
        <h2>Terra Classic strenghts:</h2>
        <h2>Efficiency driven by decentralization</h2>
        <h2>Build your own app on Terra Classic:</h2>
        <h2>Join Terra Classic community:</h2>
        <h2>Frequently asked questions:</h2>
      </div>}
    </div>
  );
}

function ComparisonToggle({ designVisible, onToggle }: { designVisible: boolean; onToggle: () => void }) {
  return (
    <button
      className={`comparison-toggle ${designVisible ? "comparison-toggle--on" : ""}`}
      type="button"
      aria-label={designVisible ? "Hide design reference layer" : "Show design reference layer"}
      aria-pressed={designVisible}
      onClick={onToggle}
      title="Internal QA: toggle Figma screenshot layer"
    >
      <span aria-hidden="true" />
    </button>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState("ecosystem");
  const pixelDesktop = useMediaQuery("(min-width: 1500px)");
  const [designVisible, setDesignVisible] = useStoredBoolean("tcm-design-reference-visible", true);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible?.target.id) setActiveId(visible.target.id);
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });
    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      {pixelDesktop ? (
        <div className="comparison-stage">
          <div className="semantic-app semantic-app--comparison">
            <Sidebar activeId={activeId} />
            <main>
              <AnnouncementBar />
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
            </main>
          </div>
          {designVisible && (
            <div className="design-reference-layer" aria-hidden="true">
              <PixelDesktop interactive={false} />
            </div>
          )}
          <ComparisonToggle designVisible={designVisible} onToggle={() => setDesignVisible((visible) => !visible)} />
        </div>
      ) : (
        <div className="semantic-app">
        <Sidebar activeId={activeId} />
        <main>
          <AnnouncementBar />
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
        </main>
        </div>
      )}
      {!pixelDesktop && <ComparisonToggle designVisible={false} onToggle={() => setDesignVisible((visible) => !visible)} />}
    </div>
  );
}
