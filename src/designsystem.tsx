import { StrictMode, useState, type MouseEvent } from "react";
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
  size: number;
  lineHeight: number;
  weight: number;
};

type ColorToken = {
  name: string;
  hex: string;
  border?: boolean;
};

const typography: TypographyToken[] = [
  { name: "H1", sample: "Terra Classic", size: 72, lineHeight: 72, weight: 600 },
  { name: "H2", sample: "Explore the ecosystem", size: 56, lineHeight: 56, weight: 600 },
  { name: "H3", sample: "Trade various stablecoins just like on Forex", size: 32, lineHeight: 40, weight: 600 },
  { name: "H4", sample: "Founder stories", size: 24, lineHeight: 32, weight: 600 },
  { name: "H5", sample: "Popular topics", size: 20, lineHeight: 24, weight: 600 },
  { name: "Body", sample: "Clear, neutral, source-aware information for Terra Classic users and builders.", size: 16, lineHeight: 24, weight: 600 },
  { name: "Body - Small", sample: "Short supporting text and dense interface copy.", size: 14, lineHeight: 24, weight: 600 },
  { name: "Body - Very small", sample: "Disclaimers, helper copy and compact labels.", size: 12, lineHeight: 16, weight: 600 },
  { name: "Link - Normal", sample: "Ecosystem", size: 14, lineHeight: 16, weight: 600 },
  { name: "Link - Small", sample: "Language - EN", size: 12, lineHeight: 16, weight: 600 },
  { name: "Link - Big", sample: "Understand Terra Classic", size: 16, lineHeight: 24, weight: 600 },
];

const colors: ColorToken[] = [
  { name: "LUNC BLACK", hex: "#101010" },
  { name: "LUNC WHITE", hex: "#FFFFFF", border: true },
  { name: "LUNC ULTRA LIGHT GRAY", hex: "#F3F3F3", border: true },
  { name: "LUNC LIGHT GRAY", hex: "#E7E7E7", border: true },
  { name: "LUNC GRAY", hex: "#A9A9A9" },
  { name: "LUNC DARK GRAY", hex: "#737373" },
  { name: "LUNC ORANGE", hex: "#EE7730" },
  { name: "LUNC YELLOW", hex: "#F9D85E" },
  { name: "LUNC LIGHT BLUE", hex: "#5493F7" },
  { name: "LUNC DARK BLUE", hex: "#0E3CA5" },
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
      {open && (
        <div className="language-options">
          {languageOptions.map((option, index) => (
            <button type="button" key={`${option}-${index}`}>{option}</button>
          ))}
        </div>
      )}
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
        {compactOpen && (
          <div className="collapsed-language-options">
            {languageOptions.map((option, index) => (
              <button type="button" key={`${option}-${index}`}>{option}</button>
            ))}
          </div>
        )}
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
      {open && (
        <div className="collapsed-language-options ds-compact-language-options">
          {languageOptions.map((option, index) => (
            <button type="button" key={`${option}-${index}`}>{option}</button>
          ))}
        </div>
      )}
    </>
  );
}

function CollapseControl({ collapsed = false, hoverable = false }: { collapsed?: boolean; hoverable?: boolean }) {
  return (
    <span className={`collapse-control ${collapsed ? "collapse-control--collapsed" : "collapse-control--opened"} ${hoverable ? "ds-collapse-control" : ""}`} aria-hidden="true">
      <span /><span /><span />
      {collapsed && <><span /><span /><span /></>}
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
  if (collapsed) {
    return (
      <div className="ds-left-section-preview ds-left-section-preview--collapsed">
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
    );
  }

  return (
    <div className="ds-left-section-preview">
      <div className="sidebar-brand">
        <img src={asset("sidebar-logo.svg")} alt="Terra Classic" />
        <button className="sidebar-collapse ds-left-collapse-button" type="button" aria-label="Collapse sidebar specimen" onClick={() => setCollapsed(true)}>
          <CollapseControl hoverable />
        </button>
      </div>
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
      <div className="ds-left-section-preview__bottom">
        <LanguageButton open={languageOpen} onToggle={() => setLanguageOpen((value) => !value)} />
        <div className="disclaimer">
          <strong>Disclaimers:</strong>
          <p>{sidebarDisclaimer}</p>
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
        {typography.map((item) => (
          <article className="ds-type-row" key={item.name}>
            <div className="ds-type-meta">
              <strong>{item.name}</strong>
              <span>{item.size}/{item.lineHeight}</span>
              <span>Weight {item.weight}</span>
              <span>Figtree Semibold</span>
            </div>
            <p style={{ fontSize: item.size, lineHeight: `${item.lineHeight}px`, fontWeight: item.weight }}>{item.sample}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ColorsSection() {
  return (
    <section className="ds-section" id="colors" aria-labelledby="colors-title">
      <div className="ds-section__head">
        <h1 id="colors-title">Colors</h1>
      </div>
      <div className="ds-color-grid">
        {colors.map((color) => (
          <article className="ds-color-card" key={color.name}>
            <span className={`ds-swatch ${color.border ? "ds-swatch--border" : ""}`} style={{ background: color.hex }} />
            <div>
              <strong>{color.name}</strong>
              <span>{color.hex}</span>
              <span>RGB {hexToRgb(color.hex)}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
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

declare global {
  var __tcmDesignSystemRoot: Root | undefined;
}

const designSystemContainer = document.getElementById("design-system-root");

if (!designSystemContainer) {
  throw new Error("Missing #design-system-root container.");
}

globalThis.__tcmDesignSystemRoot ??= createRoot(designSystemContainer);

globalThis.__tcmDesignSystemRoot.render(
  <StrictMode>
    <DesignSystemApp />
  </StrictMode>,
);
