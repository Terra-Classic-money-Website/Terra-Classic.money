import { StrictMode, useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AprBadge } from "./components/AprBadge";
import { capabilities, externalNav, languageOptions, sections, sidebarDisclaimer, strengths } from "./data/content";
import { ecosystemCategories, type EcosystemEntry } from "./data/ecosystem";
import { contributionPaths } from "./data/about";
import { openWorkPackages } from "./data/openWork";
import { roadmapGroupLabels, roadmapMonths, roadmapRows, type RoadmapMilestone, type RoadmapRow } from "./data/roadmap";
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
  token: string;
};

type TypeMetric = {
  sizeVar: string;
  lineHeightVar: string;
  weightVar: string;
};

type PaddingBreakpointKey = "desktopBig" | "desktopSmall" | "tablet" | "mobile";

type SpacingValue = {
  value?: string;
  valueVar?: string;
  note?: string;
};

type SemanticSpacingRole = {
  role: string;
  useWhen: string;
  values: Record<PaddingBreakpointKey, SpacingValue>;
};

type MajorSpacingPlace = {
  title: string;
  role: string;
  description: string;
  appliesTo: string;
};

type SpacingException = {
  value: string;
  currentRole: string;
  guidance: string;
};

type SpacingImplementationMap = {
  role: string;
  tokens: string[];
  selectors: string;
  note: string;
};

type ColorToken = {
  name: string;
  variable: string;
  border?: boolean;
};

const typography: TypographyToken[] = [
  { name: "H1", sample: "Terra Classic", className: "tc-type-h1", token: "h1" },
  { name: "H2", sample: "Explore the ecosystem", className: "tc-type-h2", token: "h2" },
  { name: "H3", sample: "Trade various stablecoins just like on Forex", className: "tc-type-h3", token: "h3" },
  { name: "H4", sample: "Founder stories", className: "tc-type-h4", token: "h4" },
  { name: "H5", sample: "Popular topics", className: "tc-type-h5", token: "h5" },
  { name: "Body", sample: "Clear, neutral, source-aware information for Terra Classic users and builders.", className: "tc-type-body", token: "body" },
  { name: "Body - Small", sample: "Short supporting text and dense interface copy.", className: "tc-type-body-small", token: "body-small" },
  { name: "Body - Very small", sample: "Disclaimers, helper copy and compact labels.", className: "tc-type-body-very-small", token: "body-very-small" },
  { name: "Link - Normal", sample: "Ecosystem", className: "tc-type-link-normal", token: "link-normal" },
  { name: "Link - Small", sample: "Language - EN", className: "tc-type-link-small", token: "link-small" },
  { name: "Link - Big", sample: "Understand Terra Classic", className: "tc-type-link-big", token: "link-big" },
];

const typographyScales = [
  { key: "desktopBig", suffix: "desktop-big", name: "Desktop Big", note: "1500px+" },
  { key: "desktopSmallTablet", suffix: "desktop-small-tablet", name: "Desktop Small + Tablet", note: "1300-1499px and 768-1299px" },
  { key: "mobile", suffix: "mobile", name: "Mobile", note: "767px and below" },
] as const;

const paddingBreakpoints = [
  { key: "desktopBig", name: "Desktop Big", note: "1500px+" },
  { key: "desktopSmall", name: "Desktop Small", note: "1300-1499px" },
  { key: "tablet", name: "Tablet", note: "768-1299px" },
  { key: "mobile", name: "Mobile", note: "767px and below" },
] as const satisfies readonly { key: PaddingBreakpointKey; name: string; note: string }[];

const semanticSpacingRoles: SemanticSpacingRole[] = [
  {
    role: "Major section entry",
    useWhen: "Starting major white content sections.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-section-entry-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-section-entry-desktop-small" },
      tablet: { valueVar: "--tc-spacing-section-entry-tablet" },
      mobile: { valueVar: "--tc-spacing-section-entry-mobile" },
    },
  },
  {
    role: "Major section side inset",
    useWhen: "Horizontal content inset inside normal sections.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-section-side-inset-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-section-side-inset-desktop-small" },
      tablet: { valueVar: "--tc-spacing-section-side-inset-tablet" },
      mobile: { valueVar: "--tc-spacing-section-side-inset-mobile" },
    },
  },
  {
    role: "Dark / immersive panel inset",
    useWhen: "Hero, protocol panels, stats panels, and dark visual surfaces.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-panel-immersive-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-panel-immersive-desktop-small" },
      tablet: { valueVar: "--tc-spacing-panel-immersive-tablet" },
      mobile: { valueVar: "--tc-spacing-panel-immersive-mobile" },
    },
  },
  {
    role: "Editorial split bottom",
    useWhen: "What-style sections where copy hands off to a visual block.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-section-split-bottom-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-section-split-bottom-desktop-small" },
      tablet: { valueVar: "--tc-spacing-section-split-bottom-tablet" },
      mobile: { valueVar: "--tc-spacing-section-split-bottom-mobile" },
    },
  },
  {
    role: "Compact section entry / closure",
    useWhen: "FAQ, community, strengths, support, and lower-section handoffs.",
    values: {
      desktopBig: { value: "56-60px", note: "Current lower sections still include 60px." },
      desktopSmall: { value: "56-60px" },
      tablet: { value: "56-60px" },
      mobile: { value: "16-48px", note: "Depends on whether the next surface is a rail, visual, or footer." },
    },
  },
  {
    role: "Large card inset",
    useWhen: "Large content cards where text needs breathing room.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-card-large-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-card-large-desktop-small" },
      tablet: { valueVar: "--tc-spacing-card-large-tablet" },
      mobile: { valueVar: "--tc-spacing-card-large-mobile", note: "20px exists today; review before copying." },
    },
  },
  {
    role: "Dense card inset",
    useWhen: "Steps, stats metrics, compact operational cards.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-card-dense-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-card-dense-desktop-small" },
      tablet: { valueVar: "--tc-spacing-card-dense-tablet" },
      mobile: { valueVar: "--tc-spacing-card-dense-mobile" },
    },
  },
  {
    role: "Media card inset",
    useWhen: "Founder/media cards where imagery dominates.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-card-media-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-card-media-desktop-small" },
      tablet: { valueVar: "--tc-spacing-card-media-tablet" },
      mobile: { valueVar: "--tc-spacing-card-media-mobile" },
    },
  },
  {
    role: "Pill/control horizontal inset",
    useWhen: "Primary buttons, back-to-top, action pills.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-control-pill-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-control-pill-desktop-small" },
      tablet: { valueVar: "--tc-spacing-control-pill-tablet" },
      mobile: { valueVar: "--tc-spacing-control-pill-mobile" },
    },
  },
  {
    role: "Page frame",
    useWhen: "Outer frame around page panels; Tablet includes topbar clearance.",
    values: {
      desktopBig: { valueVar: "--tc-spacing-page-frame-desktop-big" },
      desktopSmall: { valueVar: "--tc-spacing-page-frame-desktop-small" },
      tablet: { valueVar: "--tc-spacing-page-frame-topbar-tablet", note: "Top navigation clearance." },
      mobile: { valueVar: "--tc-spacing-page-frame-mobile" },
    },
  },
  {
    role: "Mobile full-width rail",
    useWhen: "Mobile sections where cards run full width while headings keep inner gutters.",
    values: {
      desktopBig: { value: "n/a" },
      desktopSmall: { value: "n/a" },
      tablet: { value: "n/a" },
      mobile: { valueVar: "--tc-spacing-section-mobile-rail-mobile" },
    },
  },
  {
    role: "Micro rhythm",
    useWhen: "Repeated card gaps, section separators, small stacked groups.",
    values: {
      desktopBig: { valueVar: "--tc-space-8" },
      desktopSmall: { valueVar: "--tc-space-8" },
      tablet: { valueVar: "--tc-space-8" },
      mobile: { valueVar: "--tc-space-8" },
    },
  },
  {
    role: "Flush edge",
    useWhen: "Separators, full-width rails, icon controls, and surfaces with no inset.",
    values: {
      desktopBig: { valueVar: "--tc-space-0" },
      desktopSmall: { valueVar: "--tc-space-0" },
      tablet: { valueVar: "--tc-space-0" },
      mobile: { valueVar: "--tc-space-0" },
    },
  },
];

const majorSpacingPlaces: MajorSpacingPlace[] = [
  {
    title: "Major section boundaries",
    role: "Major section entry",
    description: "Major white sections use 120px vertical entry on Desktop Big. If a 1px divider is a formal boundary, keep 120px to the divider and 120px from the divider to the next section unless the handoff is intentionally compact.",
    appliesTo: "Standard page sections, divider-to-section handoffs, top-level narrative breaks.",
  },
  {
    title: "Page shell",
    role: "Page frame",
    description: "The outer frame keeps panels away from the viewport edge. Tablet uses the topbar-clearance version because navigation is fixed at the top.",
    appliesTo: "main, tablet topbar layout, mobile page frame.",
  },
  {
    title: "Hero and dark panels",
    role: "Dark / immersive panel inset",
    description: "Dark surfaces need enough internal breathing room for headline, art, and CTA elements without becoming section-like white editorial blocks.",
    appliesTo: ".hero, .protocol-panel, .stats-panel, dark subpage heroes.",
  },
  {
    title: "Standard white editorial sections",
    role: "Major section entry + Major section side inset",
    description: "Use the major vertical rhythm and side inset together for text-led sections that start a new content idea.",
    appliesTo: ".section, ecosystem page shells, decentralization resources, about sections.",
  },
  {
    title: "What-style editorial splits",
    role: "Major section entry + Editorial split bottom",
    description: "Use a full section entry, normal side inset, and shorter bottom when copy hands off directly to a visual block.",
    appliesTo: ".what-editorial and future split editorial sections.",
  },
  {
    title: "Lower proof, FAQ, support, and footer handoffs",
    role: "Compact section entry / closure",
    description: "These areas often close a page or continue a nearby proof section. They should not automatically inherit 120px if a tighter handoff preserves continuity.",
    appliesTo: ".strengths, .community, .faq, .logo-strip, .footer.",
  },
  {
    title: "Cards and controls",
    role: "Large card, Dense card, Media card, Pill/control",
    description: "Choose the card family by density and content type instead of copying a selector. Large cards breathe; dense cards scan; media cards let imagery dominate; controls keep stable horizontal insets.",
    appliesTo: ".strength-card, .step, .stats-metric, .founder-card, .pill-button.",
  },
];

const spacingExceptions: SpacingException[] = [
  { value: "10px, 12px", currentRole: "Mobile asset-card and hero-group component fit.", guidance: "Component-specific exception only. Do not promote into general section spacing." },
  { value: "18px", currentRole: "Capability CTA compact fit.", guidance: "Do not reuse unless a button label physically needs tighter horizontal padding." },
  { value: "20px", currentRole: "Mobile large-card inset.", guidance: "Visible current exception; review later against 24px before standardizing." },
  { value: "28px", currentRole: "CTA / tablet play-button fit.", guidance: "Treat as control-specific, not a general spacing step." },
  { value: "40px", currentRole: "Modal compact inset or measured visual gap.", guidance: "Not a global section padding value." },
  { value: "60px", currentRole: "Lower-section desktop edge.", guidance: "Current implementation value; review whether it should normalize to 56px or 64px." },
  { value: "72px, 80px, 88px, 112px, 160px", currentRole: "Heights, offsets, article rhythm, or historical local values.", guidance: "Do not copy into new layout padding without a documented reason." },
];

const spacingImplementationMap: SpacingImplementationMap[] = [
  {
    role: "Page frame",
    tokens: ["--tc-spacing-page-frame", "--tc-spacing-page-frame-topbar"],
    selectors: "main, tablet/mobile topbar page shell",
    note: "Outer page shell spacing. The old padding compatibility aliases have been removed.",
  },
  {
    role: "Navigation chrome",
    tokens: ["--tc-spacing-sidebar-chrome", "--tc-spacing-top-navigation", "--tc-spacing-top-navigation-scrolled", "--tc-spacing-mobile-announcement-slot"],
    selectors: ".sidebar, .mobile-topbar, .mobile-announcement-slot",
    note: "Chrome-specific spacing. Do not reuse as content-section rhythm.",
  },
  {
    role: "Dark / immersive panel",
    tokens: ["--tc-spacing-panel-immersive"],
    selectors: ".hero, .protocol-panel, .stats-panel",
    note: "Reusable source for dark panel insets.",
  },
  {
    role: "Standard editorial section",
    tokens: ["--tc-spacing-section-standard"],
    selectors: ".section, .ecosystem-page, .decentralization-resources",
    note: "Main reusable white-section scheme for new sections.",
  },
  {
    role: "Editorial split",
    tokens: ["--tc-spacing-section-split"],
    selectors: ".what-editorial",
    note: "Asymmetric section with a shorter visual handoff.",
  },
  {
    role: "Compact / closing sections",
    tokens: ["--tc-spacing-section-close", "--tc-spacing-section-native-assets", "--tc-spacing-section-proof", "--tc-spacing-section-community", "--tc-spacing-section-faq", "--tc-spacing-strip-support", "--tc-spacing-footer-shell"],
    selectors: ".founders, .native-assets, .strengths, .community, .faq, .logo-strip, .footer",
    note: "Current grouped lower-section families. Review 60px values before expanding them.",
  },
  {
    role: "Cards",
    tokens: ["--tc-spacing-card-large", "--tc-spacing-card-dense", "--tc-spacing-card-media", "--tc-spacing-card-capability", "--tc-spacing-card-hero-group", "--tc-spacing-card-asset"],
    selectors: ".strength-card, .step, .stats-metric, .capability-card, .hero-group, .founder-card, .native-token-card",
    note: "Pick by content density, not by visual resemblance alone.",
  },
  {
    role: "Rows",
    tokens: ["--tc-spacing-row-info", "--tc-spacing-row-asset-feature"],
    selectors: ".announcement, .native-lunc-row",
    note: "Single-row surfaces with fixed-height content and icon alignment.",
  },
  {
    role: "Controls",
    tokens: ["--tc-spacing-control-pill", "--tc-spacing-control-capability-cta", "--tc-spacing-control-capability-cta-compact", "--tc-spacing-control-play-cta"],
    selectors: ".pill-button, .back-top, .capability-cta, .what-video-button",
    note: "Control-fit exceptions are allowed only when label length or icon geometry requires them.",
  },
  {
    role: "Overlays",
    tokens: ["--tc-spacing-overlay-shell", "--tc-spacing-modal-surface"],
    selectors: ".modal-backdrop, .modal",
    note: "Overlay spacing is operator safety/usability spacing, not section rhythm.",
  },
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
  "Avatar",
  "Card",
  "Directory navigation button",
  "Directory list item",
  "Directory list",
  "Back to top button",
  "Collaps button",
  "APR badge",
  "Open work card",
  "Roadmap timeline",
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

function resolveCssVariableValue(value: string, seen = new Set<string>()): string {
  return value.replace(/var\((--[\w-]+)(?:,[^)]+)?\)/g, (match, variable: string) => {
    if (seen.has(variable)) {
      return match;
    }

    const nextSeen = new Set(seen);
    nextSeen.add(variable);
    const nestedValue = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

    return nestedValue ? resolveCssVariableValue(nestedValue, nextSeen) : match;
  }).trim();
}

function readCssColor(variable: string) {
  return resolveCssVariableValue(getComputedStyle(document.documentElement).getPropertyValue(variable).trim());
}

function useCssVariable(variable: string) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!variable) {
      setValue("");
      return undefined;
    }

    const readValue = () => setValue(readCssColor(variable));
    readValue();
    window.addEventListener("resize", readValue);
    return () => window.removeEventListener("resize", readValue);
  }, [variable]);

  return value || (variable ? `var(${variable})` : "");
}

function fontFaceFromWeight(weight: string) {
  if (weight === "500") return "Figtree Medium";
  if (weight === "600") return "Figtree Semibold";
  if (weight === "800") return "Figtree ExtraBold";
  return "Figtree Regular";
}

function Sidebar() {
  return (
    <aside className="ds-sidebar" aria-label="Design system navigation">
      <a className="ds-sidebar__brand" href="#typography" aria-label="Terra Classic design system">
        <img src={asset("sidebar-logo-icon.svg")} alt="Terra Classic" />
      </a>
      <nav className="ds-sidebar__nav">
        <a href="#typography">Typography</a>
        <a href="#paddings">Paddings</a>
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
          <img className="language-icon" src={asset("language-icon.svg")} alt="" />
          Language - EN
        </span>
          {open ? (
            <img className="language-arrow language-arrow--open" src={asset("language-arrow-open.svg")} alt="" />
          ) : (
            <img className="language-arrow" src={asset("language-arrow.svg")} alt="" />
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
        <span className="community-button-icon community-button-icon--agora"><img src={asset("community-agora-figma.webp")} alt="" /></span>
      </a>
      <a className="community-buttons__sample" href="#components" onClick={stopNavigation}>
        <span>Github button</span>
        <span className="community-button-icon community-button-icon--github"><img src={asset("community-github-figma.svg")} alt="" /></span>
      </a>
      <a className="community-buttons__sample" href="#components" onClick={stopNavigation}>
        <span>Discord button</span>
        <span className="community-button-icon community-button-icon--discord"><img src={asset("community-discord-figma.webp")} alt="" /></span>
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
        <img className="founder-card__portrait" src={asset("founder-story-portrait.webp")} alt="Nicolas Boulay portrait" />
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

function DotArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`dot-arrow-icon ${className}`} viewBox="0 0 10 9" aria-hidden="true" focusable="false">
      <circle cx="2" cy="2" r="2" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="8" cy="2" r="2" />
    </svg>
  );
}

function DirectoryNavigationButtonPreview() {
  return (
    <nav className="directory-nav ds-directory-nav" aria-label="Directory navigation button specimen">
      {ecosystemCategories.map((category) => (
        <button className="directory-nav__button tc-type-link-big" type="button" key={category.id}>
          {category.title} <span>({category.entries.length})</span>
        </button>
      ))}
    </nav>
  );
}

function AvatarPreview() {
  return (
    <div className="ds-avatar-gallery" aria-label="Avatar variants">
      <span className="directory-list-item__avatar" aria-label="Image avatar">
        <img src={asset("avatars/avatar-kbgylln8evukpwqywwkpk2vlxz8-2051758dcc.webp")} alt="" />
      </span>
      <button className="roadmap-row__avatar tc-type-link-big" type="button" style={{ "--roadmap-accent": "#6FA7E8" } as CSSProperties} aria-label="Roadmap initials avatar L1">
        L1
      </button>
      <button className="roadmap-row__avatar tc-type-link-big" type="button" style={{ "--roadmap-accent": "#A0A0A0" } as CSSProperties} aria-label="Roadmap initials avatar MM2">
        MM2
      </button>
      <span className="directory-list-item__avatar about-contributor-avatar" aria-label="Contributor initials avatar DS">
        DS
      </span>
    </div>
  );
}

function CardPreview() {
  const [capability] = capabilities;
  const layer2Capability = capabilities.find((item) => item.slug === "layer2");
  const [strengthTitle, strengthBody] = strengths[0];
  const [indexedTitle, indexedBody] = contributionPaths[0];

  return (
    <div className="ds-card-gallery" aria-label="Card variants">
      <article className={`capability-card capability-card--${capability.slug} ds-card-media`}>
        <div className="capability-copy">
          <h3 className="tc-type-h3">{capability.title}</h3>
          <p className="tc-type-body">{capability.body}</p>
        </div>
        <a className="capability-cta" href="#components" onClick={stopNavigation}>
          <span className="tc-type-link-big">{capability.cta}</span>
          <img className={`capability-cta-icon capability-cta-icon--${capability.slug}`} src={asset("capability-staking-icon.svg")} alt="" aria-hidden="true" />
        </a>
        <div className="capability-image" aria-hidden="true">
          <img src={asset(capability.image)} alt="" loading="lazy" />
        </div>
      </article>

      {layer2Capability && (
        <article className={`capability-card capability-card--${layer2Capability.slug} ds-card-media`}>
          <div className="capability-copy">
            <h3 className="tc-type-h3">{layer2Capability.title}</h3>
            <p className="tc-type-body">{layer2Capability.body}</p>
          </div>
          <span className="capability-cta capability-cta--disabled" aria-disabled="true">
            <span className="tc-type-link-big">{layer2Capability.cta}</span>
            <img className={`capability-cta-icon capability-cta-icon--${layer2Capability.slug}`} src={asset("capability-layer2-icon.svg")} alt="" aria-hidden="true" />
          </span>
          <div className="capability-image" aria-hidden="true">
            <img src={asset(layer2Capability.image)} alt="" loading="lazy" />
          </div>
        </article>
      )}

      <article className="strength-card ds-card-text">
        <div className="strength-card__copy">
          <h3 className="tc-type-h3">{strengthTitle}</h3>
          <p className="tc-type-body">{strengthBody}</p>
        </div>
        <a className="strength-card__button" href="#components" onClick={stopNavigation}>
          <span className="tc-type-link-big">Find out more</span>
          <img src={asset("strength-button-arrow.svg")} alt="" aria-hidden="true" />
        </a>
      </article>

      <article className="about-indexed-card ds-card-numbered">
        <span className="about-indexed-card__number tc-type-h1">01</span>
        <div>
          <h3 className="tc-type-h3">{indexedTitle}</h3>
          <p className="tc-type-body">{indexedBody}</p>
        </div>
      </article>
    </div>
  );
}

function DirectoryListItemPreview() {
  return (
    <a className="directory-list-item ds-directory-list-item" href="#components" onClick={stopNavigation}>
      <span className="directory-list-item__avatar" aria-hidden="true">
        <img src={asset("avatars/avatar-kbgylln8evukpwqywwkpk2vlxz8-2051758dcc.webp")} alt="" />
      </span>
      <span className="directory-list-item__copy">
        <span className="directory-list-item__name tc-type-h5">BigbangX</span>
        <span className="directory-list-item__summary tc-type-body-small">NFT marketplace</span>
      </span>
      <span className="directory-list-item__meta">
        <span className="native-phase__badge directory-list-item__badge--native">ON-CHAIN NATIVE</span>
      </span>
      <span className="directory-list-item__arrow"><DotArrowIcon /></span>
    </a>
  );
}

function DirectoryListItemSpecimen({ entry }: { entry: EcosystemEntry }) {
  return (
    <a className="directory-list-item" href="#components" onClick={stopNavigation} aria-label={`${entry.name}, ${entry.summary}`}>
      <span className="directory-list-item__avatar" aria-hidden="true">
        {entry.avatar ? <img src={entry.avatar} alt="" loading="lazy" /> : <span>{entry.name.slice(0, 2).toUpperCase()}</span>}
      </span>
      <span className="directory-list-item__copy">
        <span className="directory-list-item__name tc-type-h5">{entry.name}</span>
        <span className="directory-list-item__summary tc-type-body-small">{entry.summary}</span>
      </span>
      <span className="directory-list-item__meta">
        {entry.badge && <span className="native-phase__badge directory-list-item__badge--native">{entry.badge}</span>}
      </span>
      <span className="directory-list-item__arrow"><DotArrowIcon /></span>
    </a>
  );
}

function DirectoryListPreview() {
  const applications = ecosystemCategories[0];

  return (
    <section className="ecosystem-category ds-directory-list" aria-labelledby="ds-directory-list-title">
      <header className="ecosystem-category__header">
        <div>
          <h2 className="tc-type-h2" id="ds-directory-list-title">{applications.title}</h2>
          <p className="tc-type-body-small">{applications.description}</p>
        </div>
        <span className="ecosystem-category__rule" aria-hidden="true" />
        <span className="ecosystem-category__count tc-type-h4">{applications.entries.length}</span>
      </header>
      <div className="ecosystem-grid">
        {applications.entries.map((entry) => (
          <DirectoryListItemSpecimen entry={entry} key={`${applications.id}-${entry.name}`} />
        ))}
      </div>
    </section>
  );
}

function OpenWorkCardPreview() {
  const workPackage = openWorkPackages[0];
  return (
    <a className="open-work-card ds-open-work-card" href="#components" onClick={stopNavigation}>
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
              {sections.map((section) => (
                <a href="#components" onClick={stopNavigation} key={section.id}>{section.label}</a>
              ))}
            </nav>
            <nav className="sidebar-nav sidebar-nav--external">
              {externalNav.map((item) => {
                const icon = (
                  <span className="sidebar-external-icon" aria-hidden="true">
                    <img src={asset("sidebar-external-arrow.svg")} alt="" />
                  </span>
                );

                if (item.disabled) {
                  return (
                    <span className="sidebar-nav__disabled" aria-disabled="true" key={item.label}>
                      {icon}
                      {item.label}
                    </span>
                  );
                }

                return (
                  <a href="#components" onClick={stopNavigation} key={item.label}>
                    {icon}
                    {item.label}
                  </a>
                );
              })}
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

const dsRoadmapMonthIndex = new Map<string, number>(roadmapMonths.map((month, index) => [month.key, index]));
const dsRoadmapYearRanges = roadmapMonths.reduce<Array<{ year: string; start: number; end: number }>>((ranges, month, index) => {
  const current = ranges[ranges.length - 1];
  if (current?.year === month.year) {
    current.end = index;
  } else {
    ranges.push({ year: month.year, start: index, end: index });
  }
  return ranges;
}, []);

const dsRoadmapStatusLabels: Record<RoadmapMilestone["status"], string> = {
  planned: "Planned",
  "in-progress": "In progress",
  live: "Live",
  delayed: "Delayed",
  completed: "Completed",
  "source-needed": "Source needed",
};

function readDsTimelineMetric(element: HTMLElement, property: string) {
  return Number.parseFloat(getComputedStyle(element).getPropertyValue(property)) || 0;
}

function getDsMilestoneColumns(milestone: RoadmapMilestone) {
  const start = dsRoadmapMonthIndex.get(milestone.start) ?? 0;
  const end = dsRoadmapMonthIndex.get(milestone.end) ?? start;
  return `${start + 1} / ${end + 2}`;
}

function getDsMilestoneStack(milestones: RoadmapMilestone[]) {
  const levelEnds: number[] = [];
  const levels = new Map<string, number>();

  milestones.forEach((milestone) => {
    const start = dsRoadmapMonthIndex.get(milestone.start) ?? 0;
    const end = dsRoadmapMonthIndex.get(milestone.end) ?? start;
    const level = levelEnds.findIndex((levelEnd) => start > levelEnd);
    const stackLevel = level >= 0 ? level : levelEnds.length;

    levelEnds[stackLevel] = end;
    levels.set(milestone.title, stackLevel);
  });

  return { levels, span: Math.max(1, levelEnds.length) };
}

function RoadmapTimelinePreviewAxis({ scrollLeft }: { scrollLeft: number }) {
  return (
    <div className="roadmap-axis-shell" style={{ "--roadmap-scroll-left": `${scrollLeft}px` } as CSSProperties} aria-hidden="true">
      <div className="roadmap-axis__corner" />
      <div className="roadmap-axis__track">
        {dsRoadmapYearRanges.map((range) => (
          <div
            className={`roadmap-axis__year tc-type-h2${range.start === 0 ? " roadmap-axis__year--first" : ""}`}
            style={{ gridColumn: `${range.start + 1} / ${range.end + 2}` }}
            key={`ds-${range.year}`}
          >
            {range.year}
          </div>
        ))}
        {roadmapMonths.map((month, index) => (
          <div className={`roadmap-axis__month tc-type-body-small${index === 0 ? " roadmap-axis__month--first" : ""}`} style={{ gridColumn: index + 1 }} key={`ds-${month.key}`}>
            {month.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function RoadmapTimelinePreviewGroupHeader({ group }: { group: RoadmapRow["group"] }) {
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

function RoadmapTimelinePreviewRow({
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
  const milestoneStack = getDsMilestoneStack(row.milestones);
  const tooltipOpen = activeTooltip === row.id;

  return (
    <article className={`roadmap-row roadmap-row--${row.group}`} style={{ "--roadmap-accent": row.accent } as CSSProperties}>
      <div className="roadmap-row__project">
        <button
          className="roadmap-row__avatar tc-type-link-big"
          type="button"
          aria-label={`Show ${row.project} details`}
          aria-expanded={tooltipOpen}
          aria-describedby={tooltipOpen ? `ds-${row.id}-tooltip` : undefined}
          onClick={() => onToggleTooltip(row.id)}
        >
          {row.avatar ? <img src={row.avatar} alt="" loading="lazy" /> : row.shortName}
        </button>
        <span className="roadmap-row__identity">
          <strong className="tc-type-h5">{row.project}</strong>
          <small className="tc-type-body-very-small">{row.category}</small>
        </span>
        <span className={`roadmap-row__tooltip${tooltipOpen ? " roadmap-row__tooltip--open" : ""}`} id={`ds-${row.id}-tooltip`} role="tooltip">
          <strong>{row.project}</strong>
          <small>{row.category}</small>
        </span>
      </div>
      <div className="roadmap-lane">
        {roadmapMonths.map((month) => <span className="roadmap-lane__month" key={`ds-${row.id}-${month.key}`} aria-hidden="true" />)}
        {row.milestones.map((milestone) => {
          const startIndex = dsRoadmapMonthIndex.get(milestone.start) ?? 0;
          const startsBeforeVisibleLane = visibleLaneStartPx > 0 && startIndex * monthWidth < visibleLaneStartPx + 32;
          const stackLevel = milestoneStack.levels.get(milestone.title) ?? 0;

          return (
            <div
              className={`roadmap-milestone${startsBeforeVisibleLane ? " roadmap-milestone--meta-hidden" : ""}`}
              style={{
                "--roadmap-stack": stackLevel,
                "--roadmap-stack-span": milestoneStack.span,
                gridColumn: getDsMilestoneColumns(milestone),
              } as CSSProperties}
              key={`ds-${row.id}-${milestone.title}`}
            >
              <div className="roadmap-milestone__meta">
                <strong>{milestone.title}</strong>
                <span>{dsRoadmapStatusLabels[milestone.status]}</span>
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

function RoadmapTimelinePreview() {
  const publicRows = roadmapRows.filter((row) => row.group === "public");
  const communityRows = roadmapRows.filter((row) => row.group === "community");
  const [timelineMetrics, setTimelineMetrics] = useState({ monthWidth: 248, scrollLeft: 0 });
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleTimelineScroll = (event: { currentTarget: HTMLDivElement }) => {
    const element = event.currentTarget;
    setTimelineMetrics({
      monthWidth: readDsTimelineMetric(element, "--roadmap-month-width"),
      scrollLeft: element.scrollLeft,
    });
  };

  return (
    <div className="roadmap-board ds-roadmap-preview" aria-labelledby="ds-roadmap-preview-title">
      <h3 className="visually-hidden" id="ds-roadmap-preview-title">Roadmap timeline component specimen</h3>
      <RoadmapTimelinePreviewAxis scrollLeft={timelineMetrics.scrollLeft} />
      <div className="roadmap-scroll" role="region" aria-label="Horizontally scrollable roadmap timeline component specimen" tabIndex={0} onScroll={handleTimelineScroll}>
        <div className="roadmap-grid">
          <RoadmapTimelinePreviewGroupHeader group="public" />
          {publicRows.map((row) => (
            <RoadmapTimelinePreviewRow
              row={row}
              visibleLaneStartPx={timelineMetrics.scrollLeft}
              monthWidth={timelineMetrics.monthWidth}
              activeTooltip={activeTooltip}
              onToggleTooltip={(id) => setActiveTooltip((active) => (active === id ? null : id))}
              key={`ds-${row.id}`}
            />
          ))}
          <RoadmapTimelinePreviewGroupHeader group="community" />
          {communityRows.map((row) => (
            <RoadmapTimelinePreviewRow
              row={row}
              visibleLaneStartPx={timelineMetrics.scrollLeft}
              monthWidth={timelineMetrics.monthWidth}
              activeTooltip={activeTooltip}
              onToggleTooltip={(id) => setActiveTooltip((active) => (active === id ? null : id))}
              key={`ds-${row.id}`}
            />
          ))}
        </div>
      </div>
    </div>
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
    case "APR badge":
      return <div className="ds-apr-badge-stage"><AprBadge value="3.42%" /></div>;
    case "Open work card":
      return <OpenWorkCardPreview />;
    case "CMC / CG Button":
      return <MarketButtons />;
    case "Arrow button":
      return <ArrowButtons />;
    case "Founder story":
      return <FounderStoryPreview />;
    case "Avatar":
      return <AvatarPreview />;
    case "Card":
      return <CardPreview />;
    case "Directory navigation button":
      return <DirectoryNavigationButtonPreview />;
    case "Directory list item":
      return <DirectoryListItemPreview />;
    case "Directory list":
      return <DirectoryListPreview />;
    case "Back to top button":
      return <BackTopPreview />;
    case "Collaps button":
      return <CollapseButtonPreview />;
    case "Roadmap timeline":
      return <RoadmapTimelinePreview />;
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
      <ScaleHeadings />
      <div className="ds-scale-row-list">
        {typography.map((item) => (
          <div className="ds-scale-row" key={item.name}>
            {typographyScales.map((scale) => (
              <TypographyRow
                item={item}
                metric={{
                  sizeVar: `--tc-type-${item.token}-${scale.suffix}-size`,
                  lineHeightVar: `--tc-type-${item.token}-${scale.suffix}-line-height`,
                  weightVar: `--tc-type-${item.token}-weight`,
                }}
                key={`${scale.key}-${item.name}`}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function TypographyRow({ item, metric }: { item: TypographyToken; metric: TypeMetric }) {
  const size = useCssVariable(metric.sizeVar);
  const lineHeight = useCssVariable(metric.lineHeightVar);
  const weight = useCssVariable(metric.weightVar);

  return (
    <article className="ds-type-row">
      <div className="ds-type-meta">
        <strong>{item.name}</strong>
        <span>{parseInt(size, 10)}/{parseInt(lineHeight, 10)}</span>
        <span>Weight {weight}</span>
        <span>{fontFaceFromWeight(weight)}</span>
        <code>{item.className}</code>
      </div>
      <p
        className="ds-type-sample"
        style={{
          fontSize: `var(${metric.sizeVar})`,
          lineHeight: `var(${metric.lineHeightVar})`,
          fontWeight: `var(${metric.weightVar})`,
        }}
      >
        {item.sample}
      </p>
    </article>
  );
}

function PaddingsSection() {
  return (
    <section className="ds-section ds-spacing-section" id="paddings" aria-labelledby="paddings-title">
      <div className="ds-section__head">
        <h1 id="paddings-title">Paddings</h1>
        <p className="ds-section__intro">
          Use spacing by role first, then apply the matching value for the active breakpoint. The approved repeatable scale is 120, 96, 64, 56, 48, 32, 24, 16, 8, and 0px.
        </p>
      </div>

      <div className="ds-spacing-stack">
        <article className="ds-spacing-rule-card ds-spacing-rule-card--primary">
          <h2>Core rule</h2>
          <p>
            Major white sections use <strong>120px</strong> vertical entry on Desktop Big. If a <strong>1px</strong> divider or separator is used as a formal section boundary,
            keep <strong>120px</strong> from the previous content edge to the divider and another <strong>120px</strong> from the divider to the next content edge, unless the section
            is intentionally a compact handoff.
          </p>
        </article>

        <div className="ds-spacing-table-wrap" role="region" aria-label="Semantic spacing values by breakpoint" tabIndex={0}>
          <table className="ds-spacing-table">
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Use when</th>
                {paddingBreakpoints.map((breakpoint) => (
                  <th scope="col" key={breakpoint.key}>
                    <span>{breakpoint.name}</span>
                    <small>{breakpoint.note}</small>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {semanticSpacingRoles.map((item) => (
                <tr key={item.role}>
                  <th scope="row" data-label="Role">{item.role}</th>
                  <td data-label="Use when">{item.useWhen}</td>
                  {paddingBreakpoints.map((breakpoint) => (
                    <SpacingValueCell value={item.values[breakpoint.key]} label={breakpoint.name} key={`${item.role}-${breakpoint.key}`} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="ds-spacing-subsection" aria-labelledby="spacing-places-title">
          <div className="ds-spacing-subsection__head">
            <h2 id="spacing-places-title">Major places</h2>
            <p>Start with these decisions before copying a specific selector. This keeps new pages aligned with the homepage rhythm instead of reproducing one-off measurements.</p>
          </div>
          <div className="ds-spacing-place-grid">
            {majorSpacingPlaces.map((place) => (
              <article className="ds-spacing-place-card" key={place.title}>
                <span>{place.role}</span>
                <h3>{place.title}</h3>
                <p>{place.description}</p>
                <small>{place.appliesTo}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="ds-spacing-subsection" aria-labelledby="spacing-exceptions-title">
          <div className="ds-spacing-subsection__head">
            <h2 id="spacing-exceptions-title">Current exceptions</h2>
            <p>These values exist in the codebase, but they are not general-purpose spacing rules. Reuse them only when the reason still applies.</p>
          </div>
          <div className="ds-spacing-table-wrap" role="region" aria-label="Current spacing exceptions" tabIndex={0}>
            <table className="ds-spacing-table ds-spacing-table--compact">
              <thead>
                <tr>
                  <th scope="col">Value</th>
                  <th scope="col">Current role</th>
                  <th scope="col">Guidance</th>
                </tr>
              </thead>
              <tbody>
                {spacingExceptions.map((item) => (
                  <tr key={item.value}>
                    <th scope="row" data-label="Value">{item.value}</th>
                    <td data-label="Current role">{item.currentRole}</td>
                    <td data-label="Guidance">{item.guidance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="ds-spacing-subsection" aria-labelledby="spacing-map-title">
          <div className="ds-spacing-subsection__head">
            <h2 id="spacing-map-title">Implementation map</h2>
            <p>Use the semantic role first. Use the token and selector notes only to find the current implementation family.</p>
          </div>
          <div className="ds-spacing-table-wrap" role="region" aria-label="Spacing implementation map" tabIndex={0}>
            <table className="ds-spacing-table ds-spacing-table--map">
              <thead>
                <tr>
                  <th scope="col">Role</th>
                  <th scope="col">Tokens</th>
                  <th scope="col">Selectors</th>
                  <th scope="col">Note</th>
                </tr>
              </thead>
              <tbody>
                {spacingImplementationMap.map((item) => (
                  <tr key={item.role}>
                    <th scope="row" data-label="Role">{item.role}</th>
                    <td data-label="Tokens">
                      <div className="ds-spacing-code-list">
                        {item.tokens.map((token) => <code key={token}>{token}</code>)}
                      </div>
                    </td>
                    <td data-label="Selectors">{item.selectors}</td>
                    <td data-label="Note">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}

function ScaleHeadings() {
  return (
    <div className="ds-scale-headings">
      {typographyScales.map((scale) => (
        <header className="ds-type-scale__head" key={scale.key}>
          <h2>{scale.name}</h2>
          <span>{scale.note}</span>
        </header>
      ))}
    </div>
  );
}

function SpacingValueCell({ value, label }: { value: SpacingValue; label: string }) {
  const resolvedValue = useCssVariable(value.valueVar ?? "");
  const displayValue = value.value ?? resolvedValue;

  return (
    <td data-label={label}>
      <span className="ds-spacing-value">{displayValue}</span>
      {value.valueVar && <code>{value.valueVar}</code>}
      {value.note && <small>{value.note}</small>}
    </td>
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
        <PaddingsSection />
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
