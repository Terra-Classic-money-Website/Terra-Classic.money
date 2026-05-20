import { StrictMode, useEffect, useState, type MouseEvent } from "react";
import { createRoot, type Root } from "react-dom/client";
import { AprBadge } from "./components/AprBadge";
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
  token: string;
};

type TypeMetric = {
  sizeVar: string;
  lineHeightVar: string;
  weightVar: string;
};

type PaddingToken = {
  name: string;
  usage: string;
  source: string;
  scales: {
    desktopBig: PaddingMetric;
    desktopSmallTablet: PaddingMetric;
    mobile: PaddingMetric;
  };
};

type PaddingMetric = {
  valueVar: string;
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

const paddings: PaddingToken[] = [
  {
    name: "Page gutter",
    usage: "Outer frame around the page surface.",
    source: "main",
    scales: {
      desktopBig: { valueVar: "--tc-padding-page-gutter-desktop-big", note: "Current desktop app frame." },
      desktopSmallTablet: { valueVar: "--tc-padding-page-gutter-desktop-small-tablet", note: "Keep desktop density; tablet top bar adds vertical offset separately." },
      mobile: { valueVar: "--tc-padding-page-gutter-mobile", note: "Current phone frame around page panels." },
    },
  },
  {
    name: "Topbar page gutter",
    usage: "Outer page frame when tablet/mobile top navigation is active.",
    source: "main at topbar breakpoints",
    scales: {
      desktopBig: { valueVar: "--tc-padding-page-gutter-topbar-desktop-big", note: "Not used while fixed sidebar is active." },
      desktopSmallTablet: { valueVar: "--tc-padding-page-gutter-topbar-desktop-small-tablet", note: "Tablet topbar clearance plus side gutters; not used by fixed-sidebar Desktop Small." },
      mobile: { valueVar: "--tc-padding-page-gutter-topbar-mobile", note: "Current phone frame with top navigation clearance." },
    },
  },
  {
    name: "Mobile announcement slot inset",
    usage: "Phone-only wrapper around the dismissible announcement before the topbar.",
    source: ".mobile-announcement-slot",
    scales: {
      desktopBig: { valueVar: "--tc-padding-mobile-announcement-slot-desktop-big", note: "Not used on desktop." },
      desktopSmallTablet: { valueVar: "--tc-padding-mobile-announcement-slot-desktop-small-tablet", note: "Not used on tablet." },
      mobile: { valueVar: "--tc-padding-mobile-announcement-slot-mobile", note: "Current phone announcement slot inset." },
    },
  },
  {
    name: "Immersive panel inset",
    usage: "Hero and protocol-style full-bleed dark panels.",
    source: ".hero, .protocol-panel",
    scales: {
      desktopBig: { valueVar: "--tc-padding-immersive-panel-desktop-big", note: "Current all-side hero/protocol padding." },
      desktopSmallTablet: { valueVar: "--tc-padding-immersive-panel-desktop-small-tablet", note: "Existing compact panel inset; should carry into Desktop Small + Tablet." },
      mobile: { valueVar: "--tc-padding-immersive-panel-mobile", note: "Phone panel side inset; keeps content away from curved panel edges." },
    },
  },
  {
    name: "Editorial section inset",
    usage: "Large white content sections with section titles and lead copy.",
    source: ".section",
    scales: {
      desktopBig: { valueVar: "--tc-padding-editorial-section-desktop-big", note: "Current large-section rhythm." },
      desktopSmallTablet: { valueVar: "--tc-padding-editorial-section-desktop-small-tablet", note: "Compact large-section rhythm." },
      mobile: { valueVar: "--tc-padding-editorial-section-mobile", note: "Current phone section inset." },
    },
  },
  {
    name: "Editorial split inset",
    usage: "Asymmetric editorial blocks with a heavier top edge and fixed visual handoff.",
    source: ".what-editorial",
    scales: {
      desktopBig: { valueVar: "--tc-padding-editorial-split-desktop-big", note: "Current What-is-Terra editorial block, including 64px visual handoff." },
      desktopSmallTablet: { valueVar: "--tc-padding-editorial-split-desktop-small-tablet", note: "Compact sides while preserving the 64px visual handoff." },
      mobile: { valueVar: "--tc-padding-editorial-split-mobile", note: "Current phone What-section editorial handoff." },
    },
  },
  {
    name: "Capabilities section inset",
    usage: "Capabilities section shell; mobile keeps the cards full-width while the heading owns side gutters.",
    source: ".capabilities-section",
    scales: {
      desktopBig: { valueVar: "--tc-padding-capabilities-section-desktop-big", note: "Matches large editorial sections." },
      desktopSmallTablet: { valueVar: "--tc-padding-capabilities-section-desktop-small-tablet", note: "Matches compact editorial sections." },
      mobile: { valueVar: "--tc-padding-capabilities-section-mobile", note: "Current phone full-width card rail." },
    },
  },
  {
    name: "Capabilities heading inset",
    usage: "Heading and lead copy inside the mobile full-width capabilities section.",
    source: ".capabilities-head",
    scales: {
      desktopBig: { valueVar: "--tc-padding-capabilities-head-desktop-big", note: "No extra inset on desktop." },
      desktopSmallTablet: { valueVar: "--tc-padding-capabilities-head-desktop-small-tablet", note: "No extra inset before mobile." },
      mobile: { valueVar: "--tc-padding-capabilities-head-mobile", note: "Current phone heading side inset." },
    },
  },
  {
    name: "Capability card inset",
    usage: "Internal padding for capability cards.",
    source: ".capability-card",
    scales: {
      desktopBig: { valueVar: "--tc-padding-capability-card-desktop-big", note: "Current wide-card inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-capability-card-desktop-small-tablet", note: "Current compact card inset." },
      mobile: { valueVar: "--tc-padding-capability-card-mobile", note: "Current phone capability card inset." },
    },
  },
  {
    name: "Capability CTA inset",
    usage: "Inset for compact CTA buttons inside capability cards.",
    source: ".capability-cta",
    scales: {
      desktopBig: { valueVar: "--tc-padding-capability-cta-desktop-big", note: "Current wide desktop capability CTA inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-capability-cta-desktop-small-tablet", note: "Current Desktop Small + Tablet compact capability CTA inset." },
      mobile: { valueVar: "--tc-padding-capability-cta-mobile", note: "Current phone capability CTA inset." },
    },
  },
  {
    name: "Section close inset",
    usage: "Large sections with shorter bottom closure.",
    source: ".founders",
    scales: {
      desktopBig: { valueVar: "--tc-padding-section-close-desktop-big", note: "Current founder section pattern." },
      desktopSmallTablet: { valueVar: "--tc-padding-section-close-desktop-small-tablet", note: "Compact founder section pattern." },
      mobile: { valueVar: "--tc-padding-section-close-mobile", note: "Current phone founder section closure." },
    },
  },
  {
    name: "Native assets section inset",
    usage: "Native-assets block with tight handoff into strengths on mobile.",
    source: ".native-assets",
    scales: {
      desktopBig: { valueVar: "--tc-padding-native-assets-section-desktop-big", note: "Matches the desktop section-close pattern." },
      desktopSmallTablet: { valueVar: "--tc-padding-native-assets-section-desktop-small-tablet", note: "Matches the compact section-close pattern." },
      mobile: { valueVar: "--tc-padding-native-assets-section-mobile", note: "Current phone native-assets section inset." },
    },
  },
  {
    name: "Proof grid section inset",
    usage: "Strength/proof sections with shorter entry and heavier bottom closure.",
    source: ".strengths",
    scales: {
      desktopBig: { valueVar: "--tc-padding-proof-section-desktop-big", note: "Current strengths section rhythm." },
      desktopSmallTablet: { valueVar: "--tc-padding-proof-section-desktop-small-tablet", note: "Keeps the short entry while reducing side and bottom pressure." },
      mobile: { valueVar: "--tc-padding-proof-section-mobile", note: "Current phone strengths section inset." },
    },
  },
  {
    name: "Community section inset",
    usage: "Short community CTA section.",
    source: ".community",
    scales: {
      desktopBig: { valueVar: "--tc-padding-community-section-desktop-big", note: "Current compact community section rhythm." },
      desktopSmallTablet: { valueVar: "--tc-padding-community-section-desktop-small-tablet", note: "Reduces side pressure while preserving compact height." },
      mobile: { valueVar: "--tc-padding-community-section-mobile", note: "Current mobile community rhythm." },
    },
  },
  {
    name: "FAQ section inset",
    usage: "FAQ block with a shorter top edge.",
    source: ".faq",
    scales: {
      desktopBig: { valueVar: "--tc-padding-faq-section-desktop-big", note: "Current FAQ section rhythm." },
      desktopSmallTablet: { valueVar: "--tc-padding-faq-section-desktop-small-tablet", note: "Preserves FAQ vertical rhythm with smaller side inset." },
      mobile: { valueVar: "--tc-padding-faq-section-mobile", note: "Current mobile FAQ rhythm." },
    },
  },
  {
    name: "Support strip inset",
    usage: "Logo/support proof strip.",
    source: ".logo-strip",
    scales: {
      desktopBig: { valueVar: "--tc-padding-support-strip-desktop-big", note: "Current support strip rhythm." },
      desktopSmallTablet: { valueVar: "--tc-padding-support-strip-desktop-small-tablet", note: "Keeps vertical rhythm while reducing side pressure." },
      mobile: { valueVar: "--tc-padding-support-strip-mobile", note: "Current phone support strip inset." },
    },
  },
  {
    name: "Footer shell inset",
    usage: "Footer shell and back-to-top container.",
    source: ".footer",
    scales: {
      desktopBig: { valueVar: "--tc-padding-footer-shell-desktop-big", note: "Current desktop footer shell." },
      desktopSmallTablet: { valueVar: "--tc-padding-footer-shell-desktop-small-tablet", note: "Proposed compact footer shell." },
      mobile: { valueVar: "--tc-padding-footer-shell-mobile", note: "Current mobile footer shell with bottom closure." },
    },
  },
  {
    name: "Standard card inset",
    usage: "General large-card padding, currently used by strengths cards.",
    source: ".strength-card",
    scales: {
      desktopBig: { valueVar: "--tc-padding-standard-card-desktop-big", note: "Current primary card inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-standard-card-desktop-small-tablet", note: "Better density for narrower columns." },
      mobile: { valueVar: "--tc-padding-standard-card-mobile", note: "Enough breathing room without wasting phone width." },
    },
  },
  {
    name: "Compact card inset",
    usage: "Steps, metrics, and dense cards.",
    source: ".step, .stats-metric",
    scales: {
      desktopBig: { valueVar: "--tc-padding-compact-card-desktop-big", note: "Current compact card inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-compact-card-desktop-small-tablet", note: "Can stay stable while typography steps down." },
      mobile: { valueVar: "--tc-padding-compact-card-mobile", note: "Current smaller dense-card value appears repeatedly on phone rows/cards." },
    },
  },
  {
    name: "Hero group card inset",
    usage: "Dense cards inside the hero section.",
    source: ".hero-group",
    scales: {
      desktopBig: { valueVar: "--tc-padding-hero-group-card-desktop-big", note: "Current hero group card inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-hero-group-card-desktop-small-tablet", note: "Keep current density for the desktop hero card stack." },
      mobile: { valueVar: "--tc-padding-hero-group-card-mobile", note: "Current phone hero group card inset." },
    },
  },
  {
    name: "Info row inset",
    usage: "Full-width announcement/info rows with compact vertical height.",
    source: ".announcement",
    scales: {
      desktopBig: { valueVar: "--tc-padding-info-row-desktop-big", note: "Current desktop horizontal info-row inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-info-row-desktop-small-tablet", note: "Stable because row height stays compact." },
      mobile: { valueVar: "--tc-padding-info-row-mobile", note: "Current phone announcement card inset." },
    },
  },
  {
    name: "Asset feature row inset",
    usage: "Prominent single asset rows with text and trailing controls.",
    source: ".native-lunc-row",
    scales: {
      desktopBig: { valueVar: "--tc-padding-asset-feature-row-desktop-big", note: "Current native LUNC feature row inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-asset-feature-row-desktop-small-tablet", note: "Stable while the row remains horizontal." },
      mobile: { valueVar: "--tc-padding-asset-feature-row-mobile", note: "Current phone row inset when content stacks tighter." },
    },
  },
  {
    name: "Asset card inset",
    usage: "Compact native asset/token cards.",
    source: ".native-token-card",
    scales: {
      desktopBig: { valueVar: "--tc-padding-asset-card-desktop-big", note: "Current token-card horizontal inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-asset-card-desktop-small-tablet", note: "Stable for desktop/tablet token cards." },
      mobile: { valueVar: "--tc-padding-asset-card-mobile", note: "Current phone token-card inset." },
    },
  },
  {
    name: "Media card inset",
    usage: "Founder/media cards and their internal copy blocks.",
    source: ".founder-card",
    scales: {
      desktopBig: { valueVar: "--tc-padding-media-card-desktop-big", note: "Current founder card inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-media-card-desktop-small-tablet", note: "Stable because the media card content is image-led." },
      mobile: { valueVar: "--tc-padding-media-card-mobile", note: "Stable media-card inset on phone." },
    },
  },
  {
    name: "Pill control inset",
    usage: "Primary buttons, back-to-top, footer/action pills.",
    source: ".pill-button, .back-top",
    scales: {
      desktopBig: { valueVar: "--tc-padding-pill-control-desktop-big", note: "Current desktop pill/control horizontal inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-pill-control-desktop-small-tablet", note: "Keep unless label length forces a local override." },
      mobile: { valueVar: "--tc-padding-pill-control-mobile", note: "Current phone full-width button inset." },
    },
  },
  {
    name: "Play CTA inset",
    usage: "Large play/video CTA controls.",
    source: ".what-video-button",
    scales: {
      desktopBig: { valueVar: "--tc-padding-play-cta-desktop-big", note: "Current large play button inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-play-cta-desktop-small-tablet", note: "Desktop Small value; tablet has a dedicated override below." },
      mobile: { valueVar: "--tc-padding-play-cta-mobile", note: "Current mobile play button inset." },
    },
  },
  {
    name: "Tablet play CTA inset",
    usage: "Tablet-only override for the large play/video CTA.",
    source: ".what-video-button @ tablet",
    scales: {
      desktopBig: { valueVar: "--tc-padding-play-cta-desktop-big", note: "Desktop uses the standard Play CTA inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-play-cta-tablet", note: "Current tablet play CTA inset at 768-1299px." },
      mobile: { valueVar: "--tc-padding-play-cta-mobile", note: "Phone play CTA collapses to the icon-only inset." },
    },
  },
  {
    name: "Sidebar chrome inset",
    usage: "Fixed left navigation shell and drawer surface.",
    source: ".sidebar",
    scales: {
      desktopBig: { valueVar: "--tc-padding-sidebar-chrome-desktop-big", note: "Current expanded desktop sidebar shell." },
      desktopSmallTablet: { valueVar: "--tc-padding-sidebar-chrome-desktop-small-tablet", note: "Desktop Small keeps the fixed-sidebar model." },
      mobile: { valueVar: "--tc-padding-sidebar-chrome-mobile", note: "Drawer can reuse sidebar shell once topbar owns page chrome." },
    },
  },
  {
    name: "Top navigation inset",
    usage: "Tablet/mobile top navigation bar.",
    source: ".mobile-topbar",
    scales: {
      desktopBig: { valueVar: "--tc-padding-top-navigation-desktop-big", note: "Not used while fixed sidebar is active." },
      desktopSmallTablet: { valueVar: "--tc-padding-top-navigation-desktop-small-tablet", note: "Tablet topbar once navigation switches at 1299px." },
      mobile: { valueVar: "--tc-padding-top-navigation-mobile", note: "Current mobile topbar padding." },
    },
  },
  {
    name: "Scrolled top navigation inset",
    usage: "Fixed/sticky topbar padding after scroll.",
    source: ".mobile-topbar--scrolled",
    scales: {
      desktopBig: { valueVar: "--tc-padding-top-navigation-scrolled-desktop-big", note: "Not used while fixed sidebar is active." },
      desktopSmallTablet: { valueVar: "--tc-padding-top-navigation-scrolled-desktop-small-tablet", note: "Tablet keeps the same topbar inset after scroll." },
      mobile: { valueVar: "--tc-padding-top-navigation-scrolled-mobile", note: "Current phone scrolled sticky topbar inset." },
    },
  },
  {
    name: "Overlay shell inset",
    usage: "Viewport-safe padding around modal overlays.",
    source: ".modal-backdrop",
    scales: {
      desktopBig: { valueVar: "--tc-padding-overlay-shell-desktop-big", note: "Keeps modal away from viewport edges." },
      desktopSmallTablet: { valueVar: "--tc-padding-overlay-shell-desktop-small-tablet", note: "Stable because the overlay already constrains content width." },
      mobile: { valueVar: "--tc-padding-overlay-shell-mobile", note: "Minimum safe phone edge clearance." },
    },
  },
  {
    name: "Modal surface inset",
    usage: "Internal padding for modal content surfaces.",
    source: ".modal",
    scales: {
      desktopBig: { valueVar: "--tc-padding-modal-surface-desktop-big", note: "Current desktop modal content inset." },
      desktopSmallTablet: { valueVar: "--tc-padding-modal-surface-desktop-small-tablet", note: "Slightly tighter for tablet-sized overlays." },
      mobile: { valueVar: "--tc-padding-modal-surface-mobile", note: "Keeps modal content usable on narrow screens." },
    },
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
  "Ecosystem resource",
  "Back to top button",
  "Collaps button",
  "APR badge",
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

function useCssVariable(variable: string) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const readValue = () => setValue(readCssColor(variable));
    readValue();
    window.addEventListener("resize", readValue);
    return () => window.removeEventListener("resize", readValue);
  }, [variable]);

  return value || `var(${variable})`;
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

function EcosystemResourcePreview() {
  return (
    <a className="ecosystem-resource ds-ecosystem-resource" href="#components" onClick={stopNavigation}>
      <span className="ecosystem-resource__avatar" aria-hidden="true">
        <img src="https://framerusercontent.com/images/KBgYlLn8EVUKPwqywWKPk2vlxZ8.jpg?width=400&height=400" alt="" />
      </span>
      <span className="ecosystem-resource__copy">
        <span className="ecosystem-resource__name tc-type-h5">BigbangX</span>
        <span className="ecosystem-resource__summary tc-type-body-small">NFT marketplace</span>
      </span>
      <span className="ecosystem-resource__meta">
        <span className="ecosystem-resource__badge">ON-CHAIN NATIVE</span>
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
    case "APR badge":
      return <div className="ds-apr-badge-stage"><AprBadge value="3.42%" /></div>;
    case "CMC / CG Button":
      return <MarketButtons />;
    case "Arrow button":
      return <ArrowButtons />;
    case "Founder story":
      return <FounderStoryPreview />;
    case "Ecosystem resource":
      return <EcosystemResourcePreview />;
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
    <section className="ds-section" id="paddings" aria-labelledby="paddings-title">
      <div className="ds-section__head">
        <h1 id="paddings-title">Paddings</h1>
      </div>
      <ScaleHeadings />
      <div className="ds-scale-row-list">
        {paddings.map((item) => (
          <div className="ds-scale-row" key={item.name}>
            {typographyScales.map((scale) => <PaddingRow item={item} metric={item.scales[scale.key]} key={`${scale.key}-${item.name}`} />)}
          </div>
        ))}
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

function PaddingRow({ item, metric }: { item: PaddingToken; metric: PaddingMetric }) {
  const value = useCssVariable(metric.valueVar);

  return (
    <article className="ds-type-row ds-padding-row">
      <div className="ds-type-meta ds-padding-meta">
        <strong>{item.name}</strong>
        <span>{value}</span>
        <span>{item.usage}</span>
        <code>{item.source}</code>
      </div>
      <div className="ds-padding-sample" aria-label={`${item.name}: ${value}`}>
        <div className="ds-padding-sample__frame" style={{ padding: `var(${metric.valueVar})` }}>
          <div className="ds-padding-sample__content">{value}</div>
        </div>
        <p>{metric.note}</p>
      </div>
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
