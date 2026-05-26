import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
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
import {
  decentralizationArticleBlocks,
  decentralizationArticleLede,
  decentralizationReferences,
  decentralizationResourceGroups,
  decentralizationStats,
} from "./data/decentralization";
import { ecosystemCategories, type EcosystemCategory, type EcosystemEntry } from "./data/ecosystem";
import { isPlaceholderLink, links } from "./data/links";
import { marketCategories } from "./data/markets";
import { closedWorkPackages, openWorkById, openWorkPackages, type ClosedWorkPackage, type OpenWorkPackage } from "./data/openWork";
import { roadmapGroupLabels, roadmapMonths, roadmapRows, type RoadmapMilestone, type RoadmapRow } from "./data/roadmap";
import { AprBadge } from "./components/AprBadge";
import {
  aboutFaqItems,
  aboutIntroParagraphs,
  contributionPaths,
  contributorGroups,
  openSourcePrinciples,
  ownershipTimeline,
  supportBoundaries,
} from "./data/about";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
const page = (path = "") => `${import.meta.env.BASE_URL}${path}`;
const APR_INFO_ENDPOINT = "https://validator.info/api/terra-classic/blockchain/apr-info";
const CATEGORY_SCROLL_DURATION_MS = 1100;
let categoryScrollAnimationFrame: number | null = null;

type AprInfoState = {
  status: "loading" | "ready" | "error";
  value: number | null;
};

function formatAprValue(value: number | null) {
  if (value === null) return "--";
  return `${new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}%`;
}

function getPageScrollY() {
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

function getScrollMarginTop(element: HTMLElement) {
  return Number.parseFloat(window.getComputedStyle(element).scrollMarginTop) || 0;
}

function setPageScrollY(top: number) {
  const scrollRoot = document.scrollingElement || document.documentElement;
  scrollRoot.scrollTop = top;
  document.body.scrollTop = top;
}

function cancelCategoryScrollAnimation() {
  if (categoryScrollAnimationFrame === null) return;
  window.cancelAnimationFrame(categoryScrollAnimationFrame);
  categoryScrollAnimationFrame = null;
}

function animatePageScrollTo(targetTop: number, onComplete?: () => void) {
  cancelCategoryScrollAnimation();

  const startTop = getPageScrollY();
  const distance = targetTop - startTop;
  if (Math.abs(distance) < 1) {
    onComplete?.();
    return;
  }

  const startTime = Date.now();
  const easeInOutCubic = (progress: number) => (
    progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2
  );

  const step = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / CATEGORY_SCROLL_DURATION_MS, 1);
    setPageScrollY(startTop + distance * easeInOutCubic(progress));
    if (progress < 1) {
      categoryScrollAnimationFrame = requestAnimationFrame(step);
    } else {
      setPageScrollY(targetTop);
      categoryScrollAnimationFrame = null;
      onComplete?.();
    }
  };

  categoryScrollAnimationFrame = requestAnimationFrame(step);
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

function ActionButton({ children, dark = false, onClick }: { children: string; dark?: boolean; onClick: () => void }) {
  return (
    <button className={`pill-button tc-type-link-big ${dark ? "pill-button--dark" : ""}`} type="button" onClick={onClick}>
      <span>{children}</span>
      <span className="button-arrow-icon" aria-hidden="true">
        <img className="button-arrow-icon__default" src={asset(dark ? "button-arrow-white.svg" : "button-arrow-light.svg")} alt="" />
        <img className="button-arrow-icon__hover" src={asset(dark ? "button-arrow-black.svg" : "button-arrow-white.svg")} alt="" />
      </span>
    </button>
  );
}

function ShareOnXButton({ href }: { href: string }) {
  const safeHref = isPlaceholderLink(href) ? "#" : href;
  return (
    <a className="share-on-x-button pill-button tc-type-link-big" href={safeHref} target={safeHref.startsWith("http") ? "_blank" : undefined} rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}>
      <span>Share on</span>
      <span className="article-action-icon article-share-icon" aria-hidden="true" />
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

function TabletHamburgerIcon({ open = false }: { open?: boolean }) {
  return (
    <span className={`tablet-hamburger ${open ? "tablet-hamburger--open" : ""}`} aria-hidden="true">
      <span /><span /><span /><span /><span /><span /><span /><span /><span />
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

const navHref = (href: string) => {
  if (isPlaceholderLink(href)) return "#";
  if (href.startsWith("http")) return href;
  return page(href);
};

function Sidebar({ mobileAnnouncement, defaultCollapsed = false, storageKey = "tcm-sidebar-collapsed" }: { mobileAnnouncement?: ReactNode; defaultCollapsed?: boolean; storageKey?: string }) {
  const [collapsed, setCollapsed] = useStoredBoolean(storageKey, defaultCollapsed);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);
  const [pageScrolled, setPageScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-drawer-open", drawerOpen);
    return () => document.body.classList.remove("mobile-drawer-open");
  }, [drawerOpen]);

  useEffect(() => {
    const updateScrolledState = () => setPageScrolled(window.scrollY > 0);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  const nav = (
    <>
      <nav className="sidebar-nav" aria-label="Primary navigation">
        {sections.map((section) => (
          <a key={section.id} href={navHref(section.href)} onClick={() => setDrawerOpen(false)}>
            {section.label}
          </a>
        ))}
      </nav>
      <nav className="sidebar-nav sidebar-nav--external" aria-label="External navigation">
        {externalNav.map((item) => (
          <a key={item.label} href={isPlaceholderLink(item.href) ? "#" : item.href} target={isPlaceholderLink(item.href) ? undefined : "_blank"} rel={isPlaceholderLink(item.href) ? undefined : "noopener noreferrer"} onClick={() => setDrawerOpen(false)}>
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
      {mobileAnnouncement && <div className="mobile-announcement-slot">{mobileAnnouncement}</div>}
      <header className={`mobile-topbar ${drawerOpen ? "mobile-topbar--drawer-open" : ""} ${pageScrolled ? "mobile-topbar--scrolled" : ""}`}>
        <div className="mobile-topbar-left">
          <button className="mobile-menu-button" aria-label={`${drawerOpen ? "Close" : "Open"} navigation`} aria-expanded={drawerOpen} onClick={() => setDrawerOpen((open) => !open)}>
            <TabletHamburgerIcon open={drawerOpen} />
          </button>
          <span className="mobile-topbar-divider" aria-hidden="true" />
          <a className="mobile-brand" href={page("#top")} aria-label="Terra Classic homepage">
            <img src={asset("sidebar-logo.svg")} alt="" />
          </a>
        </div>
        <div className={`mobile-language ${langOpen ? "mobile-language--open" : ""}`}>
          <button className="mobile-language-trigger tc-type-link-small" aria-expanded={langOpen} onClick={() => setLangOpen((open) => !open)}>
            <span>
              <img className="language-icon" src={asset("language-icon.svg")} alt="" />
              Language - {language}
            </span>
            <img className="language-arrow" src={asset(langOpen ? "language-arrow-open.svg" : "language-arrow.svg")} alt="" />
          </button>
          <div className="mobile-language-options" role="listbox" aria-label="Language options" aria-hidden={!langOpen}>
            {languageOptions.map((option, index) => (
              <button className="tc-type-link-small" key={`${option}-${index}`} onClick={() => { setLanguage(option); setLangOpen(false); }}>
                {option}
              </button>
            ))}
          </div>
        </div>
      </header>
      <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${drawerOpen ? "sidebar--drawer-open" : ""}`}>
        <div className="sidebar-panel sidebar-panel--expanded" aria-hidden={collapsed && !drawerOpen}>
          <div className="sidebar-top">
            <div className="sidebar-brand">
              <a className="sidebar-home-link" href={page("#top")} aria-label="Terra Classic homepage">
                <img src={asset("sidebar-logo.svg")} alt="" />
              </a>
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
              <a className="sidebar-home-icon" href={page("#top")} aria-label="Terra Classic homepage">
                <img src={asset("sidebar-logo-icon.svg")} alt="" />
              </a>
              <button className="sidebar-brand-collapsed" aria-label="Expand sidebar" aria-expanded="false" onClick={() => setCollapsed(false)}>
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

const HERO_GLOW_VARIANT = "v2";
const BOTTOM_GLOW_VARIANT = "v2";

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
      <p className="tc-type-body-small">Decentralization supported by:</p>
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
        <span className="what-orb-layer what-left-orb" aria-hidden="true">
          <img src={asset("what-left-orb.png")} alt="" loading="lazy" />
        </span>
        <span className="what-orb-layer what-right-orb" aria-hidden="true">
          <img src={asset("what-right-orb.png")} alt="" loading="lazy" />
        </span>
        <span className="what-orb-layer what-main-orb" aria-hidden="true">
          <img src={asset("what-main-orb.png")} alt="" loading="lazy" />
        </span>
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
                    <span className="native-token-card__name">{item.name}</span>
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
        <div className="strength-visual" aria-hidden="true">
          <span className="strength-visual__bg" />
          <img className="strength-visual__orb" src={asset("strength-orb.png")} alt="" loading="lazy" width="1400" height="1390" />
        </div>
        {strengths.slice(4).map(([title, body], index) => <StrengthCard key={title} index={index + 4} title={title} body={body} />)}
      </div>
    </section>
  );
}

function StrengthCard({ index, title, body }: { index: number; title: string; body: string }) {
  const hasButton = title !== "6s block time" && title !== "Deflationary ecosystem" && title !== "Revival narrative";
  const href = title === "Decentralization" ? page(links.decentralization) : "#";

  return (
    <article className={`strength-card strength-card--${index + 1}`}>
      <div className="strength-card__copy">
        <h3 className="tc-type-h3">{title}</h3>
        <p className="tc-type-body">{body}</p>
      </div>
      {hasButton && (
        <a className="strength-card__button" href={href}>
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
      <img className="stats-decagon-pattern" src={asset("decagon.svg")} alt="" aria-hidden="true" loading="lazy" width="1288" height="1208" />
      <img className="stats-small-planets" src={asset("stats-small-planets.png")} alt="" aria-hidden="true" loading="lazy" width="1161" height="636" />
      <img className="stats-big-planet" src={asset("stats-big-planet.png")} alt="" aria-hidden="true" loading="lazy" width="270" height="268" />
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
    ["Official Terra Classic forum", links.agoraForum, "community-agora-figma.png", "agora"],
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

function DirectoryListItem({ entry }: { entry: EcosystemEntry }) {
  const content = (
    <>
      <span className="directory-list-item__avatar" aria-hidden="true">
        {entry.avatar ? <img src={entry.avatar} alt="" loading="lazy" /> : <span>{entry.name.slice(0, 2).toUpperCase()}</span>}
      </span>
      <span className="directory-list-item__copy">
        <span className="directory-list-item__name tc-type-h5">{entry.name}</span>
        {entry.summary && <span className="directory-list-item__summary tc-type-body-small">{entry.summary}</span>}
      </span>
      <span className="directory-list-item__meta">
        {(entry.badge || entry.status) && <span className={`native-phase__badge ${entry.status ? "directory-list-item__badge--muted" : "directory-list-item__badge--native"}`}>{entry.status || entry.badge}</span>}
      </span>
      {entry.href && <span className="directory-list-item__arrow"><DotArrowIcon /></span>}
    </>
  );

  if (!entry.href) {
    return <div className="directory-list-item directory-list-item--disabled">{content}</div>;
  }

  return (
    <a className="directory-list-item" href={entry.href} target="_blank" rel="noopener noreferrer" aria-label={`${entry.name}${entry.summary ? `, ${entry.summary}` : ""}`}>
      {content}
    </a>
  );
}

function EcosystemCategorySection({ category }: { category: EcosystemCategory }) {
  return (
    <section className="ecosystem-category" id={category.id} aria-labelledby={`${category.id}-title`}>
      <header className="ecosystem-category__header">
        <div className="ecosystem-category__title">
          <div>
            <h2 className="tc-type-h3" id={`${category.id}-title`}>{category.title}</h2>
            <p className="tc-type-body-small">{category.description}</p>
          </div>
        </div>
        <span className="ecosystem-category__rule" aria-hidden="true" />
        <span className="ecosystem-category__count tc-type-h4">{category.entries.length}</span>
      </header>
      <div className="ecosystem-grid">
        {category.entries.map((entry) => (
          <DirectoryListItem entry={entry} key={`${category.id}-${entry.name}-${entry.summary}-${entry.href || entry.status || "static"}`} />
        ))}
      </div>
    </section>
  );
}

function EcosystemDirectory() {
  const handleCategoryLinkClick = (categoryId: string) => {
    const target = document.getElementById(categoryId);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + getPageScrollY() - getScrollMarginTop(target);
    animatePageScrollTo(targetTop, () => window.history.pushState(null, "", `#${categoryId}`));
  };

  return (
    <section className="ecosystem-page" id="ecosystem" aria-labelledby="ecosystem-page-title">
      <span className="visually-hidden" id="top">Top</span>
      <div className="ecosystem-page__intro">
        <h1 className="tc-type-h1" id="ecosystem-page-title">Terra Classic ecosystem</h1>
        <p className="tc-type-h4">A neutral directory of Terra Classic apps, wallets, bridges, validators, developer resources, infrastructure providers, and community tools. Listings are informational only and do not imply endorsement, audit, or official status.</p>
      </div>
      <nav className="directory-nav" aria-label="Ecosystem categories">
        {ecosystemCategories.map((category) => (
          <button className="directory-nav__button tc-type-link-big" type="button" key={category.id} onClick={() => handleCategoryLinkClick(category.id)} aria-controls={category.id}>
            {category.title} <span>({category.entries.length})</span>
          </button>
        ))}
      </nav>
      {ecosystemCategories.map((category) => (
        <EcosystemCategorySection category={category} key={category.id} />
      ))}
    </section>
  );
}

function EcosystemShare() {
  const shareHref = "https://x.com/intent/tweet?text=Explore%20the%20Terra%20Classic%20ecosystem&url=https%3A%2F%2Fterra-classic.money%2Fecosystem.html";
  return (
    <section className="section ecosystem-share" aria-labelledby="ecosystem-share-title">
      <div className="ecosystem-share__copy">
        <h2 className="tc-type-h2" id="ecosystem-share-title">Help make Terra Classic easier to navigate.</h2>
        <p className="tc-type-h4">The ecosystem is stronger when accurate tools, wallets, builders, and infrastructure are easy to find. Share the directory, then use GitHub to suggest corrections when listings change.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

function EcosystemPage() {
  return (
    <>
      <EcosystemDirectory />
      <FounderStories />
      <JoinCommunity />
      <FAQ />
      <EcosystemShare />
      <Footer />
    </>
  );
}

function MarketsDirectory() {
  const handleCategoryLinkClick = (categoryId: string) => {
    const target = document.getElementById(categoryId);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + getPageScrollY() - getScrollMarginTop(target);
    animatePageScrollTo(targetTop, () => window.history.pushState(null, "", `#${categoryId}`));
  };

  return (
    <section className="ecosystem-page markets-page" id="markets" aria-labelledby="markets-page-title">
      <span className="visually-hidden" id="top">Top</span>
      <div className="ecosystem-page__intro">
        <h1 className="tc-type-h1" id="markets-page-title">Terra Classic markets</h1>
        <p className="tc-type-h4">A neutral directory of centralized and decentralized places where LUNC can be bought or swapped. Listings are informational only and do not imply endorsement, liquidity quality, custody safety, or investment advice.</p>
      </div>
      <nav className="directory-nav" aria-label="Market categories">
        {marketCategories.map((category) => (
          <button className="directory-nav__button tc-type-link-big" type="button" key={category.id} onClick={() => handleCategoryLinkClick(category.id)} aria-controls={category.id}>
            {category.title} <span>({category.entries.length})</span>
          </button>
        ))}
      </nav>
      {marketCategories.map((category) => (
        <EcosystemCategorySection category={category} key={category.id} />
      ))}
    </section>
  );
}

function MarketsShare() {
  const shareHref = "https://x.com/intent/tweet?text=Find%20Terra%20Classic%20LUNC%20markets&url=https%3A%2F%2Fterra-classic.money%2Fmarkets.html";
  return (
    <section className="section ecosystem-share" aria-labelledby="markets-share-title">
      <div className="ecosystem-share__copy">
        <h2 className="tc-type-h2" id="markets-share-title">Help users find safer routes to LUNC.</h2>
        <p className="tc-type-h4">Market availability changes often. Share the directory, then use GitHub to suggest corrections when exchanges add, remove, or change LUNC pairs.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

function MarketsPage() {
  return (
    <>
      <MarketsDirectory />
      <FounderStories />
      <JoinCommunity />
      <FAQ />
      <MarketsShare />
      <Footer />
    </>
  );
}

function AboutHero() {
  return (
    <section className="stats-panel decentralization-hero decentralization-stats-hero about-hero" id="top" aria-labelledby="about-page-title">
      <div className={`stats-glow stats-glow--${BOTTOM_GLOW_VARIANT}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="protocol-lines about-hero__lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <img className="about-hero__planet" src={asset("about-hero-planet2.png")} alt="" aria-hidden="true" loading="eager" width="1067" height="584" />
      <div className="stats-copy decentralization-stats-hero__copy about-hero__copy">
        <h1 className="tc-type-h1" id="about-page-title">About terra-classic.money</h1>
        <p className="tc-type-h4">{aboutIntroParagraphs[0]}</p>
        <div className="about-hero__body">
          <p className="tc-type-body">{aboutIntroParagraphs[1]}</p>
          <p className="tc-type-body">{aboutIntroParagraphs[2]}</p>
        </div>
      </div>
      <div className="stats-bottom decentralization-stats-hero__bottom about-hero__bottom">
        <div className="decentralization-hero-actions about-hero-actions">
          <LinkButton href={page("index.html")}>Explore the website</LinkButton>
          <a className="pill-button about-github-button tc-type-link-big" href={links.websiteRepository} target="_blank" rel="noopener noreferrer">
            <span>Contribute on Github</span>
            <img src={asset("community-github-figma.svg")} alt="" aria-hidden="true" width="32" height="32" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutOwnership() {
  function renderOwner(owner: string) {
    if (owner === "Terraform Labs") {
      return (
        <span className="about-timeline__owner-logo" aria-label="Terraform Labs">
          <img src={asset("about-terraform-labs-logo.png")} alt="" aria-hidden="true" width="119" height="32" />
        </span>
      );
    }

    if (owner === "Community owned") {
      return (
        <span className="about-timeline__owner-badge">
          <span>COMMUNITY OWNED</span>
          <img src={asset("about-community-owned-arrow.svg")} alt="" aria-hidden="true" width="22" height="16" />
        </span>
      );
    }

    return <span className="about-timeline__owner-text">{owner}</span>;
  }

  return (
    <section className="about-section about-ownership" id="ownership" aria-labelledby="about-ownership-title">
      <div className="about-section__copy about-ownership__copy">
        <div className="about-section__text">
          <h2 className="tc-type-h2" id="about-ownership-title">Who owns Terra Classic?</h2>
          <p className="tc-type-h4">No company owns Terra Classic.</p>
          <p className="tc-type-body">No single validator owns Terra Classic. No single contributor owns Terra Classic. No single website owns Terra Classic. No single community account speaks for the entire network.</p>
          <p className="tc-type-body">Terra Classic is a public blockchain coordinated through validators, delegators, governance, builders, open-source software, infrastructure providers, users, and independent contributors. Its direction emerges through public participation, not private command.</p>
        </div>
        <LinkButton href={page(links.decentralization)} dark>More about decentralization</LinkButton>
      </div>
      <div className="about-timeline" aria-label="Terra Classic ownership model">
        {ownershipTimeline.map((item, index) => (
          <div className="about-timeline__group" key={`${item.period}-${item.owner}`}>
            <article className="about-timeline__item">
              <div className="about-timeline__event">
                <span className="tc-type-body">{item.period}</span>
                {item.title && <h3 className="tc-type-h5">{item.title}</h3>}
              </div>
              <div className="about-timeline__owner">{renderOwner(item.owner)}</div>
            </article>
            {index < ownershipTimeline.length - 1 && (
              <div className="about-timeline__separator" aria-hidden="true">
                <span />
                <img src={asset("about-timeline-separator.svg")} alt="" width="20" height="16" />
                <span />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutVisualBand({ variant }: { variant: "open-source" | "contribute" }) {
  const foreground = variant === "open-source"
    ? { file: "about-open-source-planet.png", width: 801, height: 384 }
    : { file: "about-contribute-foreground.png", width: 947, height: 303 };

  return (
    <div className={`about-visual-band about-visual-band--${variant}`} aria-hidden="true">
      <div className="about-visual-band__background">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="about-visual-band__lines">
        <span />
        <span />
        <span />
        <span />
      </div>
      {variant === "open-source" ? (
        <picture>
          <source media="(max-width: 1299px)" srcSet={asset("about-open-source-planet-full.png")} />
          <img className="about-visual-band__image about-visual-band__image--open-source" src={asset(foreground.file)} alt="" loading="lazy" width={foreground.width} height={foreground.height} />
        </picture>
      ) : (
        <img className={`about-visual-band__image about-visual-band__image--${variant}`} src={asset(foreground.file)} alt="" loading="lazy" width={foreground.width} height={foreground.height} />
      )}
    </div>
  );
}

function AboutIndexedGrid({ items, visualVariant }: { items: readonly (readonly [string, string])[]; visualVariant: "open-source" | "contribute" }) {
  return (
    <div className={`about-indexed-grid about-indexed-grid--${visualVariant}`}>
      {items.slice(0, 3).map(([title, body], index) => (
        <article className="about-indexed-card" key={title}>
          <span className="about-indexed-card__number tc-type-h1">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="tc-type-h3">{title}</h3>
            <p className="tc-type-body">{body}</p>
          </div>
        </article>
      ))}
      <AboutVisualBand variant={visualVariant} />
      {items.slice(3).map(([title, body], index) => (
        <article className="about-indexed-card" key={title}>
          <span className="about-indexed-card__number tc-type-h1">{String(index + 4).padStart(2, "0")}</span>
          <div>
            <h3 className="tc-type-h3">{title}</h3>
            <p className="tc-type-body">{body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function AboutOpenSource() {
  return (
    <section className="about-section about-open-source" id="open-source" aria-labelledby="about-open-source-title">
      <div className="about-section__copy">
        <h2 className="tc-type-h2" id="about-open-source-title">Terra-classic.money is an independent open-source project</h2>
        <div className="about-section__text">
          <p className="tc-type-h4">Terra-classic.money is not currently the official Terra Classic website. It is an independent, open-source, community-maintained website created to provide a clearer public information layer for Terra Classic.</p>
          <p className="tc-type-body">The goal is simple: build the best independent Terra Classic website first. If the community later considers it useful, neutral, and trustworthy enough to become official, that decision can be proposed through Terra Classic governance.</p>
        </div>
      </div>
      <AboutIndexedGrid items={openSourcePrinciples} visualVariant="open-source" />
    </section>
  );
}

function AboutContribute() {
  return (
    <section className="about-section about-contribute" id="contribute" aria-labelledby="about-contribute-title">
      <div className="about-section__copy">
        <h2 className="tc-type-h2" id="about-contribute-title">Contribute to terra-classic.money</h2>
        <div className="about-section__text">
          <p className="tc-type-h4">Terra-classic.money improves when more people help keep it accurate, useful, and current.</p>
          <p className="tc-type-body">You do not need to be a validator or developer to contribute. Useful contributions can come from researchers, writers, translators, designers, builders, delegators, governance participants, documentation reviewers, ecosystem users, and anyone who notices something that should be corrected or improved.</p>
        </div>
      </div>
      <AboutIndexedGrid items={contributionPaths} visualVariant="contribute" />
      <div className="about-hero-actions">
        <LinkButton href={`${links.websiteRepository}/issues`} dark>Report an issue or suggest a change</LinkButton>
        <LinkButton href={`${links.websiteRepository}/blob/main/README.md`} dark>View contribution guidelines</LinkButton>
      </div>
    </section>
  );
}

function AboutSupport() {
  const [donationOpen, setDonationOpen] = useState(false);

  return (
    <section className="about-section about-support" id="support" aria-labelledby="about-support-title">
      <div className="about-support__head">
        <div className="about-section__copy">
          <h2 className="tc-type-h2" id="about-support-title">Support the public information layer</h2>
          <div className="about-section__text">
            <p className="tc-type-h4">Terra-classic.money is independent. That independence matters, but it also means the website needs a sustainable support model.</p>
            <p className="tc-type-body">Donations and transparent commercial surfaces help cover maintenance, research, content updates, design improvements, translations, infrastructure, and future public-good tools for the Terra Classic ecosystem.</p>
          </div>
        </div>
        <div className="about-boundary-card">
          <h3 className="tc-type-h5">Support does not buy influence</h3>
          <ul>
            {supportBoundaries.map((item) => (
              <li key={item}>
                <span className="about-boundary-card__icon" aria-hidden="true"><span /><span /><span /><span /><span /></span>
                <span className="about-boundary-card__text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="about-commercial">
        <article>
          <span className="about-commercial__number tc-type-h1">01</span>
          <div className="about-commercial__copy">
            <h3 className="tc-type-h3">Voluntary donations</h3>
            <p className="tc-type-body">Donations help maintain and improve the website. They do not create ownership rights, governance rights, promotional rights, editorial rights, listing rights, or any expectation of financial return.</p>
          </div>
        </article>
        <article>
          <span className="about-commercial__number tc-type-h1">02</span>
          <div className="about-commercial__copy">
            <h3 className="tc-type-h3">Terra Classic L2 Directory</h3>
            <p className="tc-type-body">A paid discovery directory for Terra Classic-related L2 projects, tokens, meme coins, experimental apps, and community initiatives. Listings are paid promotional entries and do not represent endorsement by Terra-classic.money, Terra Classic governance, validators, or maintainers.</p>
          </div>
        </article>
      </div>
      <div className="about-hero-actions">
        <ActionButton dark onClick={() => setDonationOpen(true)}>Make a donation</ActionButton>
        <LinkButton href={links.layer2} dark>Paid listing packages</LinkButton>
      </div>
      <DonationModal open={donationOpen} onClose={() => setDonationOpen(false)} />
    </section>
  );
}

function AboutContributors() {
  const getContributorInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length > 1) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="about-section about-contributors" id="contributors" aria-labelledby="about-contributors-title">
      <div className="about-section__copy">
        <h2 className="tc-type-h2" id="about-contributors-title">List of contributors</h2>
        <div className="about-section__text">
          <p className="tc-type-h4">Terra-classic.money should make contribution visible.</p>
          <p className="tc-type-body">This contributor list recognizes people, teams, and organizations that helped improve or maintain the website. Inclusion does not imply endorsement, official status, governance authority, validator preference, or project recommendation.</p>
        </div>
      </div>
      <div className="about-contributor-ledger">
        {contributorGroups.map((group) => (
          <section className="about-contributor-group" aria-labelledby={`${group.title.replace(/\s+/g, "-").toLowerCase()}-title`} key={group.title}>
            <header>
              <div>
                <h3 className="tc-type-h4" id={`${group.title.replace(/\s+/g, "-").toLowerCase()}-title`}>{group.title}</h3>
                {group.description ? <p className="tc-type-body-small">{group.description}</p> : null}
              </div>
              <span className="ecosystem-category__rule" aria-hidden="true" />
              <span className="about-contributor-count tc-type-h4">{group.rows.length}</span>
            </header>
            <div className="about-contributor-rows">
              {group.rows.map(([name, role, period]) => (
                <article className="directory-list-item about-contributor-row" key={`${group.title}-${name}-${role}`}>
                  <span className="directory-list-item__avatar about-contributor-avatar" aria-hidden="true">{getContributorInitials(name)}</span>
                  <span className="directory-list-item__copy">
                    <strong className="directory-list-item__name tc-type-h5">{name}</strong>
                    <span className="directory-list-item__summary tc-type-body-small">{role}</span>
                  </span>
                  {period ? (
                    <span className="directory-list-item__meta about-contributor-row__meta">
                      <small className="tc-type-body-very-small">{period}</small>
                    </span>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="about-hero-actions">
        <LinkButton href={links.websiteRepository} dark>View contributor log</LinkButton>
        <LinkButton href={`${links.websiteRepository}/issues`} dark>Suggest a correction</LinkButton>
      </div>
    </section>
  );
}

function AboutFAQ() {
  const [open, setOpen] = useState<string | null>(aboutFaqItems[0]?.question ?? null);
  return (
    <section className="section about-faq" aria-labelledby="about-faq-title">
      <h2 className="tc-type-h2" id="about-faq-title">FAQ</h2>
      <div className="about-faq-list">
        {aboutFaqItems.map((item) => {
          const id = item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const expanded = open === item.question;
          return (
            <div className="faq-item about-faq-item" key={item.question}>
              <button aria-expanded={expanded} aria-controls={`${id}-answer`} onClick={() => setOpen(expanded ? null : item.question)}>
                <span className="tc-type-link-big">{item.question}</span>
                <img src={asset("faq-link-arrow.svg")} alt="" aria-hidden="true" />
              </button>
              {expanded && <p id={`${id}-answer`} className="tc-type-body-small">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AboutShare() {
  const shareHref = "https://x.com/intent/tweet?text=Terra-classic.money%20is%20an%20independent%2C%20community-maintained%20website%20for%20Terra%20Classic.&url=https%3A%2F%2Fterra-classic.money%2Fabout.html";
  return (
    <section className="section about-share" aria-labelledby="about-share-title">
      <div className="about-share__copy">
        <h2 className="tc-type-h2" id="about-share-title">Terra Classic gets stronger when public information gets clearer.</h2>
        <p className="tc-type-h4">Share the independent website, challenge weak information, and help keep the ecosystem surface accurate, neutral, and useful.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutOwnership />
      <AboutOpenSource />
      <AboutContribute />
      <AboutSupport />
      <AboutContributors />
      <FounderStories />
      <JoinCommunity />
      <AboutFAQ />
      <AboutShare />
      <Footer />
    </>
  );
}

function openWorkDetailHref(id: string) {
  return page(`${links.openWorkDetail}?work=${encodeURIComponent(id)}`);
}

function OpenWorkCard({ workPackage }: { workPackage: OpenWorkPackage }) {
  return (
    <a className="open-work-card" href={openWorkDetailHref(workPackage.id)} aria-label={`View open work details for ${workPackage.title}`}>
      <span className="open-work-card__active-indicator" aria-hidden="true" />
      <span className="open-work-card__meta">
        <span className="native-phase__badge">{workPackage.category}</span>
      </span>
      <span className="open-work-card__copy">
        <span className="open-work-card__title tc-type-h4">{workPackage.title}</span>
        <span className="open-work-card__summary tc-type-body-small">{workPackage.summary}</span>
      </span>
      <span className="open-work-card__footer">
        <span>
          <small className="tc-type-body-very-small">Effort</small>
          <strong className="tc-type-link-big">{workPackage.effort}</strong>
        </span>
        <span>
          <small className="tc-type-body-very-small">Quote</small>
          <strong className="tc-type-link-big">{workPackage.quoteType}</strong>
        </span>
        <DotArrowIcon />
      </span>
    </a>
  );
}

function ClosedWorkCard({ workPackage }: { workPackage: ClosedWorkPackage }) {
  return (
    <article className="open-work-card open-work-card--closed">
      <span className="open-work-card__meta">
        <span className="native-phase__badge">{workPackage.category}</span>
      </span>
      <span className="open-work-card__copy">
        <span className="open-work-card__title tc-type-h4">{workPackage.title}</span>
        <span className="open-work-card__summary tc-type-body-small">{workPackage.summary}</span>
      </span>
      <span className="open-work-card__footer">
        <span>
          <small className="tc-type-body-very-small">Completed</small>
          <strong className="tc-type-link-big">{workPackage.completed}</strong>
        </span>
        <span>
          <small className="tc-type-body-very-small">Delivered</small>
          <strong className="tc-type-link-big">{workPackage.delivered}</strong>
        </span>
      </span>
    </article>
  );
}

function OpenWorkBoard() {
  return (
    <section className="open-work-board" aria-labelledby="open-work-board-title">
      <header className="open-work-section-head">
        <div>
          <h2 className="tc-type-h3" id="open-work-board-title">Open work packages</h2>
          <p className="tc-type-h4">Current ecosystem requests that can be quoted by independent builders, software houses, and contributors.</p>
        </div>
        <span className="open-work-count tc-type-h4">{openWorkPackages.length}</span>
      </header>
      <div className="open-work-grid">
        {openWorkPackages.map((workPackage) => (
          <OpenWorkCard workPackage={workPackage} key={workPackage.id} />
        ))}
      </div>
    </section>
  );
}

function ClosedWorkBoard() {
  return (
    <section className="open-work-board open-work-board--closed" aria-labelledby="closed-work-board-title">
      <header className="open-work-section-head">
        <div>
          <h2 className="tc-type-h3" id="closed-work-board-title">Closed work packages</h2>
          <p className="tc-type-h4">Completed ecosystem work that shows Terra Classic maintenance continuing in public.</p>
        </div>
        <span className="open-work-count tc-type-h4">{closedWorkPackages.length}</span>
      </header>
      <div className="open-work-grid open-work-grid--closed">
        {closedWorkPackages.map((workPackage) => (
          <ClosedWorkCard workPackage={workPackage} key={workPackage.id} />
        ))}
      </div>
    </section>
  );
}

function OpenWorkTerms() {
  const terms = [
    {
      title: "Pay per delivered work",
      body: "Payment is made only after successful completion of the whole accepted work package, or after successful delivery of an accepted milestone when the quote is split into stages.",
    },
    {
      title: "Payment asset and wallet",
      body: "Payment is made in LUNC or USTC to the wallet address described in the accepted quote or proposal. The requested asset, wallet, amount, and stage structure must be public before voting.",
    },
  ];

  return (
    <section className="open-work-terms" aria-labelledby="open-work-terms-title">
      <header className="open-work-section-head">
        <div>
          <h2 className="tc-type-h2" id="open-work-terms-title">Cooperation terms</h2>
          <p className="tc-type-h4">Work should be scoped, quoted, delivered, and paid in a way the Terra Classic community can review in public.</p>
        </div>
      </header>
      <div className="open-work-terms-grid">
        {terms.map((term, index) => (
          <article className="open-work-term" key={term.title}>
            <span className="article-section__index tc-type-link-big">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="tc-type-h4">{term.title}</h3>
              <p className="tc-type-body">{term.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OpenWorkProcess() {
  const steps = [
    {
      title: "Choose an open work package",
      body: "Review the detail page, acceptance criteria, expected deliverables, and quote requirements before preparing the proposal.",
    },
    {
      title: "Publish the quote on Agora",
      body: "Post the official quote or proposal on the Terra Classic Agora forum so the scope, cost, delivery model, wallet, and risks are visible to the community.",
    },
    {
      title: "Discuss with community and validators",
      body: "Answer questions, refine the scope if needed, and make trade-offs explicit before the work asks for on-chain approval.",
    },
    {
      title: "Go through governance",
      body: "Submit the proposal to Terra Classic governance. A successful governance vote means the quote is accepted and the contractor can start the approved work.",
    },
  ];

  return (
    <section className="open-work-process" aria-labelledby="open-work-process-title">
      <div className="open-work-process__intro">
        <h2 className="tc-type-h2" id="open-work-process-title">Proposal and quote process</h2>
        <p className="tc-type-h4">The website can list work packages, but acceptance happens through public community discussion and Terra Classic governance.</p>
        <LinkButton href={links.agoraForum} dark>Open Terra Classic Agora</LinkButton>
      </div>
      <div className="open-work-process__steps">
        {steps.map((step, index) => (
          <article className="open-work-step" key={step.title}>
            <span className="tc-type-h3">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="tc-type-h4">{step.title}</h3>
              <p className="tc-type-body-small">{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OpenWorkShare() {
  const shareHref = "https://x.com/intent/tweet?text=Explore%20open%20Terra%20Classic%20work%20packages%20for%20builders%20and%20contributors&url=https%3A%2F%2Fterra-classic.money%2Fopen-work.html";
  return (
    <section className="section ecosystem-share open-work-share" aria-labelledby="open-work-share-title">
      <div className="ecosystem-share__copy">
        <h2 className="tc-type-h2" id="open-work-share-title">Help serious builders find the work.</h2>
        <p className="tc-type-h4">Share the open work board with teams that can deliver scoped, source-aware, governance-ready work for Terra Classic.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

function OpenWorkPage() {
  return (
    <>
      <section className="open-work-page" id="top" aria-labelledby="open-work-page-title">
        <div className="open-work-page__intro">
          <h1 className="tc-type-h1" id="open-work-page-title">Open work for Terra Classic</h1>
          <p className="tc-type-h4">A public board of ecosystem work packages that independent builders, software houses, and contributors can prepare proposals or quotes for.</p>
        </div>
        <OpenWorkBoard />
        <ClosedWorkBoard />
        <OpenWorkTerms />
        <OpenWorkProcess />
      </section>
      <FounderStories />
      <JoinCommunity />
      <FAQ />
      <OpenWorkShare />
      <Footer />
    </>
  );
}

function OpenWorkDetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="open-work-detail-list" aria-labelledby={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>
      <h2 className="tc-type-h3" id={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>{title}</h2>
      <ul>
        {items.map((item) => <li className="tc-type-body-small" key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function OpenWorkDetailPage() {
  const id = new URLSearchParams(window.location.search).get("work") || "";
  const workPackage = openWorkById.get(id);

  if (!workPackage) {
    return (
      <>
        <section className="open-work-detail-page open-work-detail-page--missing" id="top" aria-labelledby="open-work-missing-title">
          <div className="open-work-detail-hero">
            <span className="native-phase__badge">NOT FOUND</span>
            <h1 className="tc-type-h1" id="open-work-missing-title">Open work package not found</h1>
            <p className="tc-type-h4">The requested work package may have been renamed, removed, or linked incorrectly.</p>
            <LinkButton href={links.openWork}>Back to open work</LinkButton>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <section className="open-work-detail-page" id="top" aria-labelledby="open-work-detail-title">
        <div className="open-work-detail-hero">
          <div className="open-work-detail-hero__copy">
            <span className="native-phase__badge">{workPackage.status}</span>
            <h1 className="tc-type-h1" id="open-work-detail-title">{workPackage.title}</h1>
            <p className="tc-type-h4">{workPackage.detailSummary}</p>
          </div>
          <aside className="open-work-detail-meta" aria-label="Work package summary">
            <div>
              <span className="tc-type-body-very-small">Category</span>
              <strong className="tc-type-link-big">{workPackage.category}</strong>
            </div>
            <div>
              <span className="tc-type-body-very-small">Effort</span>
              <strong className="tc-type-link-big">{workPackage.effort}</strong>
            </div>
            <div>
              <span className="tc-type-body-very-small">Quote model</span>
              <strong className="tc-type-link-big">{workPackage.quoteType}</strong>
            </div>
          </aside>
        </div>

        <div className="open-work-detail-body">
          <OpenWorkDetailList title="Ideal for" items={workPackage.idealFor} />
          <OpenWorkDetailList title="Expected deliverables" items={workPackage.deliverables} />
          <OpenWorkDetailList title="Acceptance criteria" items={workPackage.acceptanceCriteria} />
          <OpenWorkDetailList title="Quote should include" items={workPackage.quoteRequirements} />
        </div>

        <div className="open-work-detail-cta">
          <div>
            <h2 className="tc-type-h3">Ready to quote this work?</h2>
            <p className="tc-type-body-small">Prepare a public proposal on Agora with scope, timeline, acceptance criteria, payment asset, wallet address, and delivery stages. Community discussion and a successful governance vote are required before work starts.</p>
          </div>
          <LinkButton href={links.agoraForum}>Open Terra Classic Agora</LinkButton>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ArticleListenControl({ label, text }: { label: string; text: string }) {
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const stop = () => setSpeaking(false);
    window.speechSynthesis?.addEventListener("voiceschanged", stop);
    return () => {
      window.speechSynthesis?.cancel();
      window.speechSynthesis?.removeEventListener("voiceschanged", stop);
    };
  }, []);

  const handleClick = () => {
    if (!("speechSynthesis" in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <button className={`article-action article-action--listen pill-button tc-type-link-big ${speaking ? "article-action--active" : ""}`} type="button" onClick={handleClick} aria-pressed={speaking}>
      <span>{label}</span>
      <span className="article-action-icon article-listen-icon" aria-hidden="true" />
    </button>
  );
}

function DecentralizationArticle() {
  const readText = [
    "Terra Classic decentralization.",
    "A long-form guide to how Terra Classic decentralization works, why it matters, and how anyone can verify the network for themselves.",
    ...decentralizationArticleLede,
    ...decentralizationArticleBlocks.flatMap((block) => [`${block.eyebrow} ${block.title}`, ...block.paragraphs]),
  ].join(" ");

  return (
    <article className="decentralization-page" id="top" aria-labelledby="decentralization-page-title">
      <header className="stats-panel decentralization-hero decentralization-stats-hero">
        <div className={`stats-glow stats-glow--${BOTTOM_GLOW_VARIANT}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <img className="stats-decagon-pattern" src={asset("decagon.svg")} alt="" aria-hidden="true" loading="eager" width="1288" height="1208" />
        <img className="stats-small-planets" src={asset("stats-small-planets.png")} alt="" aria-hidden="true" loading="eager" width="1161" height="636" />
        <img className="stats-big-planet" src={asset("stats-big-planet.png")} alt="" aria-hidden="true" loading="eager" width="270" height="268" />
        <div className="stats-copy decentralization-stats-hero__copy">
          <div className="article-meta">
            <span className="native-phase__badge article-meta__badge">15 MIN READ</span>
          </div>
          <h1 className="tc-type-h1" id="decentralization-page-title">Terra Classic decentralization</h1>
          <p className="tc-type-h4">A long-form guide to how Terra Classic decentralization works, why it matters, and how anyone can verify the network for themselves.</p>
        </div>
        <div className="stats-bottom decentralization-stats-hero__bottom">
          <dl className="stats-row decentralization-stats-row">
            {decentralizationStats.map(([number, label], index) => (
              <div className={`stats-metric stats-metric--${index + 1}`} key={number}>
                <dt>
                  <span className="tc-type-h1">{number}</span>
                </dt>
                <dd className="tc-type-link-normal">{label}</dd>
              </div>
            ))}
          </dl>
          <div className="decentralization-hero-actions" aria-label="Article actions">
            <ArticleListenControl label="Listen to the article" text={readText} />
            <a className="article-action article-action--share pill-button tc-type-link-big" href="https://x.com/intent/tweet?text=Read%20about%20Terra%20Classic%20decentralization&url=https%3A%2F%2Fterra-classic.money%2Fdecentralization.html" target="_blank" rel="noopener noreferrer">
              <span>Share on</span>
              <span className="article-action-icon article-share-icon" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <div className="article-body">
        <div className="article-lede">
          {decentralizationArticleLede.map((paragraph) => (
            <p className="tc-type-h3" key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {decentralizationArticleBlocks.map((block) => (
          <section className="article-section" id={block.id} key={block.id}>
            <div className="article-section__index tc-type-link-small">{block.eyebrow}</div>
            <div className="article-section__copy">
              <h2 className="tc-type-h3">{block.title}</h2>
              {block.paragraphs.map((paragraph) => (
                <p className="tc-type-body" key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}

        <section className="article-references" aria-labelledby="article-references-title">
          <h2 className="tc-type-h4" id="article-references-title">References / bibliography</h2>
          <div className="article-reference-list">
            {decentralizationReferences.map((reference) => {
              const content = (
                <>
                  <span>
                    <strong className="tc-type-link-big">{reference.title}</strong>
                    <small className="tc-type-body-small">{reference.source}</small>
                  </span>
                  {reference.href && <DotArrowIcon />}
                </>
              );

              return reference.href ? (
                <a className="article-reference" href={reference.href} target="_blank" rel="noopener noreferrer" key={reference.title}>
                  {content}
                </a>
              ) : (
                <div className="article-reference article-reference--static" key={reference.title}>
                  {content}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </article>
  );
}

function DecentralizationResources() {
  return (
    <section className="section decentralization-resources" aria-labelledby="decentralization-resources-title">
      <div className="decentralization-resources__intro">
        <h2 className="tc-type-h2" id="decentralization-resources-title">Verify Terra Classic decentralization</h2>
        <p className="tc-type-h4">Use the links below to inspect Terra Classic decentralization directly: validator activity, staking and governance data, explorers, public tools, documentation, and developer infrastructure.</p>
      </div>
      {decentralizationResourceGroups.map((group) => (
        <section className="decentralization-resource-group" aria-labelledby={`${group.title.replace(/\s+/g, "-").toLowerCase()}-title`} key={group.title}>
          <header className="ecosystem-category__header">
            <div className="ecosystem-category__title">
              <div>
                <h3 className="tc-type-h3" id={`${group.title.replace(/\s+/g, "-").toLowerCase()}-title`}>{group.title}</h3>
                <p className="tc-type-body-small">{group.description}</p>
              </div>
            </div>
            <span className="ecosystem-category__rule" aria-hidden="true" />
            <span className="ecosystem-category__count tc-type-h4">{group.entries.length}</span>
          </header>
          <div className="ecosystem-grid">
            {group.entries.map((entry) => (
              <DirectoryListItem entry={entry} key={`${group.title}-${entry.name}-${entry.href || entry.status || "static"}`} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

function DecentralizationShare() {
  const shareHref = "https://x.com/intent/tweet?text=Terra%20Classic%20decentralization%20is%20not%20a%20decorative%20claim.%20It%20is%20the%20core%20operating%20logic%20of%20the%20network.&url=https%3A%2F%2Fterra-classic.money%2Fdecentralization.html";
  return (
    <section className="section decentralization-share" aria-labelledby="decentralization-share-title">
      <div className="decentralization-share__copy">
        <h2 className="tc-type-h2" id="decentralization-share-title">Share the decentralization story.</h2>
        <p className="tc-type-h4">Help more people understand how Terra Classic is maintained, governed, and verified in public.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

function DecentralizationPage() {
  return (
    <>
      <DecentralizationArticle />
      <DecentralizationResources />
      <FounderStories />
      <JoinCommunity />
      <FAQ />
      <DecentralizationShare />
      <Footer />
    </>
  );
}

const roadmapMonthIndex = new Map<string, number>(roadmapMonths.map((month, index) => [month.key, index]));
const roadmapYearRanges = roadmapMonths.reduce<Array<{ year: string; start: number; end: number }>>((ranges, month, index) => {
  const current = ranges[ranges.length - 1];
  if (current?.year === month.year) {
    current.end = index;
  } else {
    ranges.push({ year: month.year, start: index, end: index });
  }
  return ranges;
}, []);

const roadmapStatusLabels: Record<RoadmapMilestone["status"], string> = {
  planned: "Planned",
  "in-progress": "In progress",
  live: "Live",
  delayed: "Delayed",
  completed: "Completed",
  "source-needed": "Source needed",
};

const roadmapPageHiddenRowIds = new Set<RoadmapRow["id"]>([
  "public-l1-governance",
  "community-terraport",
  "community-sdk",
  "community-selenium",
  "community-garuda",
]);

function readTimelineMetric(element: HTMLElement, property: string) {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;
}

function getMilestoneColumns(milestone: RoadmapMilestone) {
  const start = roadmapMonthIndex.get(milestone.start) ?? 0;
  const end = roadmapMonthIndex.get(milestone.end) ?? start;
  return `${start + 1} / ${end + 2}`;
}

function getMilestoneStack(milestones: RoadmapMilestone[]) {
  const levelEnds: number[] = [];
  const levels = new Map<string, number>();

  milestones.forEach((milestone) => {
    const start = roadmapMonthIndex.get(milestone.start) ?? 0;
    const end = roadmapMonthIndex.get(milestone.end) ?? start;
    const level = levelEnds.findIndex((levelEnd) => start > levelEnd);
    const stackLevel = level >= 0 ? level : levelEnds.length;

    levelEnds[stackLevel] = end;
    levels.set(milestone.title, stackLevel);
  });

  return { levels, span: Math.max(1, levelEnds.length) };
}

function RoadmapAxis({ scrollLeft }: { scrollLeft: number }) {
  return (
    <div className="roadmap-axis-shell" style={{ "--roadmap-scroll-left": `${scrollLeft}px` } as CSSProperties} aria-hidden="true">
      <div className="roadmap-axis__corner" />
      <div className="roadmap-axis__track">
        {roadmapYearRanges.map((range) => (
          <div
            className={`roadmap-axis__year tc-type-h2${range.start === 0 ? " roadmap-axis__year--first" : ""}`}
            style={{ gridColumn: `${range.start + 1} / ${range.end + 2}` }}
            key={range.year}
          >
            {range.year}
          </div>
        ))}
        {roadmapMonths.map((month, index) => (
          <div className={`roadmap-axis__month tc-type-body-small${index === 0 ? " roadmap-axis__month--first" : ""}`} style={{ gridColumn: index + 1 }} key={month.key}>
            {month.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapGroupHeader({ group }: { group: RoadmapRow["group"] }) {
  const label = roadmapGroupLabels[group];
  return (
    <div className={`roadmap-group roadmap-group--${group}`}>
      <div className="roadmap-group__label">
        <span className="native-phase__badge">{group === "public" ? "PUBLIC" : "PROJECT-SUBMITTED"}</span>
      </div>
      <div className="roadmap-group__copy">
        <h2 className="tc-type-h4">{label.title}</h2>
        <p className="tc-type-body-small">{label.description}</p>
      </div>
    </div>
  );
}

function RoadmapProjectRow({
  row,
  visibleLaneStartPx,
  monthWidth,
  activeTooltip,
  onToggleTooltip,
}: {
  row: RoadmapRow;
  visibleLaneStartPx: number;
  monthWidth: number;
  activeTooltip: string | null;
  onToggleTooltip: (id: string) => void;
}) {
  const milestoneStack = getMilestoneStack(row.milestones);
  const tooltipOpen = activeTooltip === row.id;

  return (
    <article className={`roadmap-row roadmap-row--${row.group}`} style={{ "--roadmap-accent": row.accent } as CSSProperties}>
      <div className="roadmap-row__project">
        <button
          className="roadmap-row__avatar tc-type-link-big"
          type="button"
          aria-label={`Show ${row.project} details`}
          aria-expanded={tooltipOpen}
          aria-describedby={tooltipOpen ? `${row.id}-tooltip` : undefined}
          onClick={() => onToggleTooltip(row.id)}
        >
          {row.avatar ? <img src={row.avatar} alt="" loading="lazy" /> : row.shortName}
        </button>
        <span className="roadmap-row__identity">
          <strong className="tc-type-h5">{row.project}</strong>
          <small className="tc-type-body-very-small">{row.category}</small>
        </span>
        <span className={`roadmap-row__tooltip${tooltipOpen ? " roadmap-row__tooltip--open" : ""}`} id={`${row.id}-tooltip`} role="tooltip">
          <strong>{row.project}</strong>
          <small>{row.category}</small>
        </span>
      </div>
      <div className="roadmap-lane">
        {roadmapMonths.map((month) => <span className="roadmap-lane__month" key={`${row.id}-${month.key}`} aria-hidden="true" />)}
        {row.milestones.map((milestone) => {
          const startIndex = roadmapMonthIndex.get(milestone.start) ?? 0;
          const startsBeforeVisibleLane = visibleLaneStartPx > 0 && startIndex * monthWidth < visibleLaneStartPx + 32;
          const stackLevel = milestoneStack.levels.get(milestone.title) ?? 0;

          return (
            <div
              className={`roadmap-milestone${startsBeforeVisibleLane ? " roadmap-milestone--meta-hidden" : ""}`}
              style={{
                "--roadmap-stack": stackLevel,
                "--roadmap-stack-span": milestoneStack.span,
                gridColumn: getMilestoneColumns(milestone),
              } as CSSProperties}
              key={`${row.id}-${milestone.title}`}
            >
              <div className="roadmap-milestone__meta">
                <strong>{milestone.title}</strong>
                <span>{roadmapStatusLabels[milestone.status]}</span>
                {milestone.paid && <em>Paid entry</em>}
              </div>
              <span className={`roadmap-milestone__bar roadmap-milestone__bar--${milestone.status}`} />
            </div>
          );
        })}
      </div>
    </article>
  );
}

function RoadmapTimeline() {
  const pageRows = roadmapRows.filter((row) => !roadmapPageHiddenRowIds.has(row.id));
  const publicRows = pageRows.filter((row) => row.group === "public");
  const communityRows = pageRows.filter((row) => row.group === "community");
  const [timelineMetrics, setTimelineMetrics] = useState({ monthWidth: 248, scrollLeft: 0 });
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const visibleLaneStartPx = timelineMetrics.scrollLeft;

  const handleTimelineScroll = (event: { currentTarget: HTMLDivElement }) => {
    const element = event.currentTarget;
    setTimelineMetrics({
      monthWidth: readTimelineMetric(element, "--roadmap-month-width"),
      scrollLeft: element.scrollLeft,
    });
  };

  const handleProjectTooltipToggle = (id: string) => {
    setActiveTooltip((active) => (active === id ? null : id));
  };

  return (
    <section className="roadmap-board" aria-labelledby="roadmap-board-title">
      <h2 className="visually-hidden" id="roadmap-board-title">Decentralized roadmap</h2>
      <RoadmapAxis scrollLeft={timelineMetrics.scrollLeft} />
      <div className="roadmap-scroll" role="region" aria-label="Horizontally scrollable Terra Classic roadmap" tabIndex={0} onScroll={handleTimelineScroll}>
        <div className="roadmap-grid">
          <RoadmapGroupHeader group="public" />
          {publicRows.map((row) => (
            <RoadmapProjectRow
              row={row}
              visibleLaneStartPx={visibleLaneStartPx}
              monthWidth={timelineMetrics.monthWidth}
              activeTooltip={activeTooltip}
              onToggleTooltip={handleProjectTooltipToggle}
              key={row.id}
            />
          ))}
          <RoadmapGroupHeader group="community" />
          {communityRows.map((row) => (
            <RoadmapProjectRow
              row={row}
              visibleLaneStartPx={visibleLaneStartPx}
              monthWidth={timelineMetrics.monthWidth}
              activeTooltip={activeTooltip}
              onToggleTooltip={handleProjectTooltipToggle}
              key={row.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapPage() {
  return (
    <>
      <section className="roadmap-page" id="top" aria-labelledby="roadmap-page-title">
        <div className="roadmap-page__intro">
          <div className="roadmap-page__copy">
            <h1 className="tc-type-h1" id="roadmap-page-title">Terra Classic roadmap</h1>
            <p className="tc-type-h4">A source-aware timeline for core protocol work and project-submitted L2 / community milestones, so users can see what is being built, what is live, and what still needs verification.</p>
          </div>
          <div className="roadmap-page__trust">
            <span className="native-phase__badge">UPDATED MAY 21, 2026</span>
          </div>
        </div>
        <RoadmapTimeline />
      </section>
      <Footer />
    </>
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

export default function App() {
  const isEcosystemPage = window.location.pathname.endsWith("/ecosystem.html") || window.location.pathname.endsWith("ecosystem.html");
  const isDecentralizationPage = window.location.pathname.endsWith("/decentralization.html") || window.location.pathname.endsWith("decentralization.html");
  const isRoadmapPage = window.location.pathname.endsWith("/roadmap.html") || window.location.pathname.endsWith("roadmap.html");
  const isMarketsPage = window.location.pathname.endsWith("/markets.html") || window.location.pathname.endsWith("markets.html");
  const isOpenWorkPage = window.location.pathname.endsWith("/open-work.html") || window.location.pathname.endsWith("open-work.html");
  const isOpenWorkDetailPage = window.location.pathname.endsWith("/open-work-detail.html") || window.location.pathname.endsWith("open-work-detail.html");
  const isAboutPage = window.location.pathname.endsWith("/about.html") || window.location.pathname.endsWith("about.html");

  return (
    <div className="app">
      <div className="semantic-app">
        <Sidebar
          defaultCollapsed={isRoadmapPage}
          mobileAnnouncement={<AnnouncementBar />}
          storageKey={isRoadmapPage ? "tcm-roadmap-sidebar-collapsed" : "tcm-sidebar-collapsed"}
        />
        <main>
          {isDecentralizationPage ? (
            <DecentralizationPage />
          ) : isRoadmapPage ? (
            <RoadmapPage />
          ) : isMarketsPage ? (
            <MarketsPage />
          ) : isOpenWorkDetailPage ? (
            <OpenWorkDetailPage />
          ) : isOpenWorkPage ? (
            <OpenWorkPage />
          ) : isEcosystemPage ? (
            <EcosystemPage />
          ) : isAboutPage ? (
            <AboutPage />
          ) : (
            <>
              <div className="main-announcement-slot"><AnnouncementBar /></div>
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}
