import { StrictMode, useEffect, useRef, useState, type MouseEvent } from "react";
import { createRoot, type Root } from "react-dom/client";
import { externalNav, languageOptions, sections, sidebarDisclaimer } from "./data/content";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/designsystem.css";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

function stopNavigation(event: MouseEvent<HTMLElement>) {
  event.preventDefault();
}

type TypographyToken = {
  name: string;
  sample: string;
  className: string;
};

type ColorToken = {
  name: string;
  variable: string;
  border?: boolean;
};

const typography: TypographyToken[] = [
  { name: "H1", sample: "Terra Classic", className: "tc-type-h1" },
  { name: "H2", sample: "Explore the ecosystem", className: "tc-type-h2" },
  { name: "H3", sample: "Trade various stablecoins just like on Forex", className: "tc-type-h3" },
  { name: "H4", sample: "Founder stories", className: "tc-type-h4" },
  { name: "H5", sample: "Popular topics", className: "tc-type-h5" },
  { name: "Body", sample: "Clear, neutral, source-aware information for Terra Classic users and builders.", className: "tc-type-body" },
  { name: "Body - Small", sample: "Short supporting text and dense interface copy.", className: "tc-type-body-small" },
  { name: "Body - Very small", sample: "Disclaimers, helper copy and compact labels.", className: "tc-type-body-very-small" },
  { name: "Link - Normal", sample: "Ecosystem", className: "tc-type-link-normal" },
  { name: "Link - Small", sample: "Language - EN", className: "tc-type-link-small" },
  { name: "Link - Big", sample: "Understand Terra Classic", className: "tc-type-link-big" },
];

const colors: ColorToken[] = [
  { name: "LUNC BLACK", variable: "--lunc-black" },
  { name: "LUNC WHITE", variable: "--lunc-white", border: true },
  { name: "LUNC ULTRA LIGHT GRAY", variable: "--lunc-ultra-light-gray", border: true },
  { name: "LUNC LIGHT GRAY", variable: "--lunc-light-gray", border: true },
  { name: "LUNC GRAY", variable: "--lunc-gray" },
  { name: "LUNC DARK GRAY", variable: "--lunc-dark-gray" },
  { name: "LUNC ORANGE", variable: "--lunc-orange" },
  { name: "LUNC YELLOW", variable: "--lunc-yellow" },
  { name: "LUNC LIGHT BLUE", variable: "--lunc-light-blue" },
  { name: "LUNC DARK BLUE", variable: "--lunc-dark-blue" },
];

const componentNames = [
  "Nav element",
  "Vertical badge",
  "Language button",
  "Particular language button",
  "Language button - X",
  "LEFT SECTION",
  "x",
  "Info box",
  "FAQ link",
  "Link arrow",
  "Buttons",
  "Badge",
  "CMC / CG Button",
  "Arrow button",
  "Founder story",
  "Back to top button",
  "Collaps button",
];

const collapsedSidebarDisclaimer =
  "Terra-Classic.money is not the official website of Terra Classic. Just as no one owns the technology behind email, no one owns the Terra Classic blockchain. Accordingly, no single entity can speak with authority on behalf of Terra Classic.";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`;
}

function rgbToHex(value: string) {
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) {
    if (trimmed.length === 4) {
      return `#${trimmed.slice(1).split("").map((channel) => `${channel}${channel}`).join("").toUpperCase()}`;
    }
    return trimmed.toUpperCase();
  }
  const [r, g, b] = value.match(/\d+(\.\d+)?/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
}

function readCssColor(variable: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
}

function Sidebar() {
  return (
    <aside className="ds-sidebar" aria-label="Design system navigation">
      <a className="ds-sidebar__brand" href="#typography" aria-label="Terra Classic design system">
        <img src={asset("sidebar-logo.svg")} alt="Terra Classic" />
      </a>
      <nav className="ds-sidebar__nav">
        <a href="#typography">Typography</a>
        <a href="#colors">Colors</a>
        <a href="#components">Components</a>
      </nav>
      <div className="ds-sidebar__bottom">
        <p>Internal local design-system surface. Not part of the GitHub Pages build.</p>
      </div>
    </aside>
  );
}

function LanguageButton({ compact = false, open = false, onToggle }: { compact?: boolean; open?: boolean; onToggle?: () => void }) {
  if (compact) {
    return (
      <button className="ds-language-compact" type="button" aria-label="Open language selector" aria-expanded={open} onClick={onToggle}>
        <img src={asset(open ? "language-x.svg" : "language-icon.svg")} alt="" />
      </button>
    );
  }

  return (
    <div className={`language ${open ? "language--open ds-language-open" : ""}`}>
      <button className="language-trigger" type="button" aria-expanded={open} onClick={onToggle}>
        <span className="language-trigger-label">
          <span>
          <img src={asset("language-icon.svg")} alt="" />
          Language - EN
        </span>
          {open ? (
            <img src={asset("language-arrow-open.svg")} alt="" />
          ) : (
            <>
              <img className="language-arrow language-arrow--default" src={asset("language-arrow.svg")} alt="" />
              <img className="language-arrow language-arrow--hover" src={asset("language-arrow-hover.svg")} alt="" />
            </>
          )}
        </span>
      </button>
      <div className="language-options ds-language-options-panel" aria-hidden={!open}>
        {languageOptions.map((option, index) => (
          <button type="button" key={`${option}-${index}`}>{option}</button>
        ))}
      </div>
    </div>
  );
}

function InteractiveLanguageButton() {
  const [open, setOpen] = useState(false);
  const [compactOpen, setCompactOpen] = useState(false);
  return (
    <div className="ds-language-specimens">
      <LanguageButton open={open} onToggle={() => setOpen((value) => !value)} />
      <div className="collapsed-language-slot">
        <button className={`collapsed-language-button ${compactOpen ? "collapsed-language-button--open" : ""}`} type="button" aria-label={`${compactOpen ? "Close" : "Open"} compact language selector`} aria-expanded={compactOpen} onClick={() => setCompactOpen((value) => !value)}>
          {compactOpen ? (
            <>
              <img className="language-x-icon language-x-icon--default" src={asset("language-x.svg")} alt="" />
              <img className="language-x-icon language-x-icon--hover" src={asset("language-x-hover.svg")} alt="" />
            </>
          ) : (
            <img src={asset("language-icon.svg")} alt="" />
          )}
        </button>
        <div className="collapsed-language-options ds-collapsed-language-panel" aria-hidden={!compactOpen}>
          {languageOptions.map((option, index) => (
            <button type="button" key={`${option}-${index}`}>{option}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompactLanguageDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className={`collapsed-language-button ${open ? "collapsed-language-button--open" : ""}`} type="button" aria-label={`${open ? "Close" : "Open"} language selector`} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? (
          <>
            <img className="language-x-icon language-x-icon--default" src={asset("language-x.svg")} alt="" />
            <img className="language-x-icon language-x-icon--hover" src={asset("language-x-hover.svg")} alt="" />
          </>
        ) : (
          <img src={asset("language-icon.svg")} alt="" />
        )}
      </button>
      <div className="collapsed-language-options ds-compact-language-options ds-collapsed-language-panel" aria-hidden={!open}>
        {languageOptions.map((option, index) => (
          <button type="button" key={`${option}-${index}`}>{option}</button>
        ))}
      </div>
    </>
  );
}

function CollapseControl({ collapsed = false, hoverable = false }: { collapsed?: boolean; hoverable?: boolean }) {
  return (
    <span className={`collapse-control ${collapsed ? "collapse-control--collapsed" : "collapse-control--opened"} ${hoverable ? "ds-collapse-control" : ""}`} aria-hidden="true">
      <span /><span /><span /><span /><span /><span />
    </span>
  );
}

function AnnouncementPreview() {
  const [visible, setVisible] = useState(true);
  if (!visible) {
    return <button className="ds-reset-button" type="button" onClick={() => setVisible(true)}>Show info box again</button>;
  }

  return (
    <div className="announcement ds-announcement">
      <div className="announcement-inner">
        <div className="workshops-logo" role="img" aria-label="Terra Classic Workshops">
          <img className="workshops-logo__bottom" src={asset("announcement-workshops-bottom.svg")} alt="" />
          <img className="workshops-logo__main" src={asset("announcement-workshops-main.svg")} alt="" />
          <img className="workshops-logo__top" src={asset("announcement-workshops-top.svg")} alt="" />
          <img className="workshops-logo__dot-right" src={asset("announcement-workshops-dot-right.svg")} alt="" />
          <img className="workshops-logo__dot-left" src={asset("announcement-workshops-dot-left.svg")} alt="" />
        </div>
        <span />
        <p>ClassicGathering, the flagship conference of the Terra Classic ecosystem, February 23-24 in San Francisco</p>
      </div>
      <button className="announcement-close ds-x-control" type="button" aria-label="Close announcement" onClick={() => setVisible(false)}><span /><span /><span /><span /><span /></button>
    </div>
  );
}

function FaqLinkPreview() {
  const [open, setOpen] = useState(false);
  return (
    <button className="ds-faq-link" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
      <span>Understand Terra Classic</span>
      <img src={asset("faq-link-arrow.svg")} alt="" aria-hidden="true" />
    </button>
  );
}

function LinkArrowPreview({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={`ds-link-arrow ${inverse ? "ds-link-arrow--inverse" : ""}`} href="#components" onClick={stopNavigation}>
      Understand Terra Classic
      <img src={asset("what-link-arrow.svg")} alt="" aria-hidden="true" />
    </a>
  );
}

function ButtonGallery() {
  return (
    <div className="ds-button-gallery">
      <div className="ds-button-dark-review">
        <a className="pill-button ds-button-arrow ds-button-arrow--white" href="#components" onClick={stopNavigation}><span>Button - White arrow</span><span className="ds-button-arrow-icon" aria-hidden="true"><img className="ds-button-arrow-icon__default" src={asset("button-arrow-light.svg")} alt="" /><img className="ds-button-arrow-icon__hover" src={asset("button-arrow-white.svg")} alt="" /></span></a>
        <a className="ds-more-button" href="#components" onClick={stopNavigation}>
          <span>More staking button</span>
          <img src={asset("capability-staking-icon.svg")} alt="" aria-hidden="true" />
        </a>
        <a className="ds-more-button" href="#components" onClick={stopNavigation}>
          <span>More forex button</span>
          <img src={asset("capability-forex-icon.svg")} alt="" aria-hidden="true" />
        </a>
        <a className="ds-more-button ds-more-button--l2" href="#components" onClick={stopNavigation}>
          <span>More L2 button</span>
          <img src={asset("capability-layer2-icon.svg")} alt="" aria-hidden="true" />
        </a>
      </div>
      <a className="pill-button pill-button--dark ds-button-arrow ds-button-arrow--black" href="#components" onClick={stopNavigation}><span>Button - Black arrow</span><span className="ds-button-arrow-icon" aria-hidden="true"><img className="ds-button-arrow-icon__default" src={asset("button-arrow-white.svg")} alt="" /><img className="ds-button-arrow-icon__hover" src={asset("button-arrow-black.svg")} alt="" /></span></a>
      <a className="ds-button ds-button--yellow" href="#components" onClick={stopNavigation}>Button yellow</a>
      <a className="ds-button ds-button--blue" href="#components" onClick={stopNavigation}>Button blue</a>
      <a className="ds-play-button" href="#components" onClick={stopNavigation}>
        <span>Button - Black play</span>
        <span className="ds-play-button__icon" aria-hidden="true">
          <img className="ds-play-button__icon-default" src={asset("what-video-dots.svg")} alt="" />
          <img className="ds-play-button__icon-hover" src={asset("what-video-dots-hover.svg")} alt="" />
        </span>
      </a>
      <a className="community-buttons__sample" href="#components" onClick={stopNavigation}>
        <span>Agora button</span>
        <span className="community-button-icon community-button-icon--agora"><img src={asset("community-agora-figma.png")} alt="" /></span>
      </a>
      <a className="community-buttons__sample" href="#components" onClick={stopNavigation}>
        <span>Github button</span>
        <span className="community-button-icon community-button-icon--github"><img src={asset("community-github-figma.svg")} alt="" /></span>
      </a>
      <a className="community-buttons__sample" href="#components" onClick={stopNavigation}>
        <span>Discord button</span>
        <span className="community-button-icon community-button-icon--discord"><img src={asset("community-discord-figma.png")} alt="" /></span>
      </a>
    </div>
  );
}

function BadgeGallery() {
  return (
    <div className="ds-badge-gallery">
      <div className="ds-badge-review-row">
        <span className="status status--active">ACTIVE<img src={asset("protocol-badge-active-arrow.svg")} alt="" /></span>
        <span className="ds-badge ds-badge--black">ACTIVE</span>
      </div>
      <span className="native-phase__badge native-phase__badge--soon">COMMING SOON</span>
    </div>
  );
}

function MarketButtons() {
  return (
    <div className="native-lunc-row__links ds-market-buttons">
      <a href="#components" aria-label="CoinMarketCap" onClick={stopNavigation}><img src={asset("native-cmc-icon.svg")} alt="" /></a>
      <a href="#components" aria-label="CoinGecko" onClick={stopNavigation}><img src={asset("native-cg-icon.svg")} alt="" /></a>
    </div>
  );
}

function ArrowButtons() {
  return (
    <div className="founder-controls">
      <button type="button" aria-label="Previous"><img src={asset("founder-arrow-left.svg")} alt="" /></button>
      <button type="button" aria-label="Next"><img src={asset("founder-arrow-right.svg")} alt="" /></button>
    </div>
  );
}

function FounderStoryPreview() {
  return (
    <article className="founder-card ds-founder-card">
      <div className="founder-card__media">
        <img className="founder-card__portrait" src={asset("founder-story-portrait.png")} alt="Nicolas Boulay portrait" />
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
        <h4>Nicolas Boulay</h4>
        <p>Nicolas Boulay</p>
      </div>
    </article>
  );
}

function LeftSectionPreview() {
  const [collapsed, setCollapsed] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  return (
    <div className={`ds-left-section-preview ${collapsed ? "ds-left-section-preview--collapsed" : ""}`}>
      <div className="ds-left-section-panel ds-left-section-panel--expanded" aria-hidden={collapsed}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <img src={asset("sidebar-logo.svg")} alt="Terra Classic" />
            <button className="sidebar-collapse ds-left-collapse-button" type="button" aria-label="Collapse sidebar specimen" onClick={() => setCollapsed(true)}>
              <CollapseControl hoverable />
            </button>
          </div>
          <div className="sidebar-nav-wrap">
            <nav className="sidebar-nav">
              {sections.map((section, index) => (
                <a className={index === 0 ? "active" : ""} href="#components" onClick={stopNavigation} key={section.id}>{section.label}</a>
              ))}
            </nav>
            <nav className="sidebar-nav sidebar-nav--external">
              {externalNav.map((item) => (
                <a href="#components" onClick={stopNavigation} key={item.label}>
                  <span className="sidebar-external-icon" aria-hidden="true">
                    <img src={asset("sidebar-external-arrow.svg")} alt="" />
                  </span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="ds-left-section-preview__bottom">
          <LanguageButton open={languageOpen} onToggle={() => setLanguageOpen((value) => !value)} />
          <div className="disclaimer">
            <strong>Disclaimers:</strong>
            <p>{sidebarDisclaimer}</p>
          </div>
        </div>
      </div>

      <div className="ds-left-section-panel ds-left-section-panel--collapsed" aria-hidden={!collapsed}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <button className="sidebar-brand-collapsed ds-left-collapse-button" type="button" aria-label="Expand sidebar specimen" aria-expanded="false" onClick={() => setCollapsed(false)}>
              <img src={asset("sidebar-logo-icon.svg")} alt="" />
              <CollapseControl collapsed hoverable />
            </button>
          </div>
          <div className="sidebar-nav-wrap" />
        </div>
        <div className="sidebar-collapsed-bottom">
          <div className="collapsed-buttons-stack">
            <div className="vertical-url">www.terra-classic.money</div>
            <div className="collapsed-language-slot">
              <CompactLanguageDemo />
            </div>
          </div>
          <div className="collapsed-disclaimer">
            <div>{collapsedSidebarDisclaimer}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackTopPreview() {
  return (
    <a className="back-top ds-back-top" href="#typography" onClick={stopNavigation}>
      <span>Back to the top</span>
      <img src={asset("footer-back-top-arrow.svg")} alt="" aria-hidden="true" />
    </a>
  );
}

function CollapseButtonPreview() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <button className="ds-collapse-toggle" type="button" aria-pressed={collapsed} onClick={() => setCollapsed((value) => !value)}>
      <CollapseControl collapsed={collapsed} hoverable />
    </button>
  );
}

function ComponentPreview({ name }: { name: string }) {
  switch (name) {
    case "Nav element":
      return <div className="ds-nav-pair"><a className="ds-nav-element" href="#components" onClick={stopNavigation}>Ecosystem</a><a className="ds-nav-element ds-nav-element--icon" href="#components" onClick={stopNavigation}><span className="sidebar-external-icon" aria-hidden="true"><img src={asset("sidebar-external-arrow.svg")} alt="" /></span>Documentation</a></div>;
    case "Vertical badge":
      return <div className="vertical-url">www.terra-classic.money</div>;
    case "Language button":
      return <InteractiveLanguageButton />;
    case "Particular language button":
      return <div className="language-options ds-inline-options"><button type="button">EN</button><button type="button">PL</button></div>;
    case "Language button - X":
      return <button className="collapsed-language-button collapsed-language-button--open ds-language-x-button" type="button" aria-label="Language X hover specimen"><img className="language-x-icon language-x-icon--default" src={asset("language-x.svg")} alt="" /><img className="language-x-icon language-x-icon--hover" src={asset("language-x-hover.svg")} alt="" /></button>;
    case "LEFT SECTION":
      return <LeftSectionPreview />;
    case "x":
      return <button className="ds-x-control" type="button" aria-label="X hover specimen"><span /><span /><span /><span /><span /></button>;
    case "Info box":
      return <AnnouncementPreview />;
    case "FAQ link":
      return <FaqLinkPreview />;
    case "Link arrow":
      return <div className="ds-link-arrow-wrap"><LinkArrowPreview /><span className="ds-link-arrow-dark-surface"><LinkArrowPreview inverse /></span></div>;
    case "Buttons":
      return <ButtonGallery />;
    case "Badge":
      return <BadgeGallery />;
    case "CMC / CG Button":
      return <MarketButtons />;
    case "Arrow button":
      return <ArrowButtons />;
    case "Founder story":
      return <FounderStoryPreview />;
    case "Back to top button":
      return <BackTopPreview />;
    case "Collaps button":
      return <CollapseButtonPreview />;
    default:
      return null;
  }
}

function TypographySection() {
  return (
    <section className="ds-section" id="typography" aria-labelledby="typography-title">
      <div className="ds-section__head">
        <h1 id="typography-title">Typography</h1>
      </div>
      <div className="ds-type-list">
        {typography.map((item) => <TypographyRow item={item} key={item.name} />)}
      </div>
    </section>
  );
}

function TypographyRow({ item }: { item: TypographyToken }) {
  const sampleRef = useRef<HTMLParagraphElement>(null);
  const [meta, setMeta] = useState({ size: "", lineHeight: "", weight: "" });

  useEffect(() => {
    if (!sampleRef.current) return;
    const style = window.getComputedStyle(sampleRef.current);
    setMeta({
      size: Math.round(parseFloat(style.fontSize)).toString(),
      lineHeight: Math.round(parseFloat(style.lineHeight)).toString(),
      weight: style.fontWeight,
    });
  }, [item.className]);

  return (
    <article className="ds-type-row">
      <div className="ds-type-meta">
        <strong>{item.name}</strong>
        {meta.size && <span>{meta.size}/{meta.lineHeight}</span>}
        {meta.weight && <span>Weight {meta.weight}</span>}
        <span>Figtree Semibold</span>
        <code>{item.className}</code>
      </div>
      <p className={item.className} ref={sampleRef}>{item.sample}</p>
    </article>
  );
}

function ColorsSection() {
  return (
    <section className="ds-section" id="colors" aria-labelledby="colors-title">
      <div className="ds-section__head">
        <h1 id="colors-title">Colors</h1>
      </div>
      <div className="ds-color-grid">
        {colors.map((color) => <ColorCard color={color} key={color.name} />)}
      </div>
    </section>
  );
}

function ColorCard({ color }: { color: ColorToken }) {
  const [hex, setHex] = useState("");

  useEffect(() => {
    setHex(rgbToHex(readCssColor(color.variable)));
  }, [color.variable]);

  return (
    <article className="ds-color-card">
      <span className={`ds-swatch ${color.border ? "ds-swatch--border" : ""}`} style={{ background: `var(${color.variable})` }} />
      <div>
        <strong>{color.name}</strong>
        <span>{hex || color.variable}</span>
        {hex && <span>RGB {hexToRgb(hex)}</span>}
        <code>{color.variable}</code>
      </div>
    </article>
  );
}

function ComponentsSection() {
  return (
    <section className="ds-section" id="components" aria-labelledby="components-title">
      <div className="ds-section__head">
        <h1 id="components-title">Components</h1>
      </div>
      <div className="ds-components">
        {componentNames.map((name, index) => (
          <article className={`ds-component-card ds-component-card--${index + 1}`} key={name}>
            <header>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{name}</h2>
            </header>
            <div className="ds-component-stage">
              <ComponentPreview name={name} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DesignSystemApp() {
  return (
    <div className="ds-app">
      <Sidebar />
      <main className="ds-main">
        <TypographySection />
        <ColorsSection />
        <ComponentsSection />
      </main>
    </div>
  );
}

type DesignSystemRootElement = HTMLElement & {
  __tcmDesignSystemRoot?: Root;
};

const designSystemContainer = document.getElementById("design-system-root") as DesignSystemRootElement | null;

if (!designSystemContainer) {
  throw new Error("Missing #design-system-root container.");
}

designSystemContainer.__tcmDesignSystemRoot ??= createRoot(designSystemContainer);

designSystemContainer.__tcmDesignSystemRoot.render(
  <StrictMode>
    <DesignSystemApp />
  </StrictMode>,
);
