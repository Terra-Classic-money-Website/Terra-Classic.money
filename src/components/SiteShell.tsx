import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import {
  externalNav,
  sections,
  sidebarDisclaimer,
} from "../data/content";
import { isPlaceholderLink } from "../data/links";
import { defaultLocale, getPublishedLocale, publishedLocales, type LocaleId } from "../i18n/config";
import { getChromeContent } from "../i18n/content";
import { equivalentPathForLocale, getCurrentLocaleId, getRouteForPath, matchSupportedLocale, withLocalePath } from "../i18n/routing";

export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
export const page = (path = "") => withLocalePath(path || "index.html");

function useStoredBoolean(key: string, fallback: boolean) {
  const [value, setValue] = useState(() => localStorage.getItem(key) === null ? fallback : localStorage.getItem(key) === "true");
  const update = (next: boolean) => {
    localStorage.setItem(key, String(next));
    setValue(next);
  };
  return [value, update] as const;
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

const navHref = (href: string) => {
  if (isPlaceholderLink(href)) return "#";
  if (href.startsWith("http")) return href;
  return page(href);
};

function useCurrentLocale() {
  const [localeId, setLocaleId] = useState<LocaleId>(() => getCurrentLocaleId());

  useEffect(() => {
    setLocaleId(getCurrentLocaleId());
  }, []);

  return getPublishedLocale(localeId) || defaultLocale;
}

function LanguageOptions({
  className,
  buttonClassName,
  onSelect,
}: {
  className: string;
  buttonClassName: string;
  onSelect: () => void;
}) {
  const route = getRouteForPath();
  const currentLocale = useCurrentLocale();
  const availableLocales = publishedLocales.filter((locale) => (
    route ? route.publishedLocales.includes(locale.id) : locale.published
  ));

  const rememberLanguageChoice = (event: MouseEvent<HTMLAnchorElement>, localeId: LocaleId, href: string) => {
    try {
      localStorage.setItem("tcm-language", localeId);
    } catch {
      // Navigation must still work if browser storage is unavailable.
    }
    if (href === "#") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <div className={className} role="listbox" aria-label={getChromeContent(currentLocale.id).chooseLanguage} aria-hidden="false">
      {availableLocales.map((locale) => {
        const isWideLabel = locale.shortLabel.length > 2;
        const flagSrc = asset(locale.flagAsset);
        const href = equivalentPathForLocale(locale.id) || "#";

        return (
          <a
            className={`${buttonClassName} language-option${isWideLabel ? " language-option--wide" : ""}`}
            href={href}
            key={locale.id}
            role="option"
            aria-label={locale.nativeLabel}
            aria-selected={locale.id === currentLocale.id}
            onClick={(event) => rememberLanguageChoice(event, locale.id, href)}
          >
            <span className="language-option-label">{locale.shortLabel}</span>
            <span className="language-option-flag" aria-hidden="true">
              <img src={flagSrc} alt="" loading="lazy" />
            </span>
          </a>
        );
      })}
    </div>
  );
}

function LanguageSuggestion() {
  const currentLocale = useCurrentLocale();
  const chrome = getChromeContent(currentLocale.id);
  const [suggestedLocale, setSuggestedLocale] = useState<LocaleId | null>(null);

  useEffect(() => {
    if (currentLocale.id !== defaultLocale.id) return;
    if (localStorage.getItem("tcm-language")) return;
    if (localStorage.getItem("tcm-language-suggestion-dismissed") === "true") return;

    const preferredLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const matchedLocale = matchSupportedLocale(preferredLanguages);
    if (matchedLocale !== defaultLocale.id && equivalentPathForLocale(matchedLocale)) {
      setSuggestedLocale(matchedLocale);
    }
  }, [currentLocale.id]);

  if (!suggestedLocale) return null;

  const suggested = getPublishedLocale(suggestedLocale);
  const href = equivalentPathForLocale(suggestedLocale);
  if (!suggested || !href) return null;

  const dismiss = () => {
    localStorage.setItem("tcm-language-suggestion-dismissed", "true");
    setSuggestedLocale(null);
  };

  return (
    <aside className="language-suggestion" aria-label={chrome.suggestionTitle}>
      <div>
        <strong className="tc-type-link-big">{chrome.suggestionTitle}</strong>
        <p className="tc-type-body-small">{chrome.suggestionBody}</p>
      </div>
      <div className="language-suggestion__actions">
        <a className="tc-type-link-small" href={href} onClick={() => localStorage.setItem("tcm-language", suggested.id)}>{chrome.suggestionSwitch}</a>
        <button className="tc-type-link-small" type="button" onClick={dismiss}>{chrome.suggestionDismiss}</button>
      </div>
    </aside>
  );
}

function Sidebar({ defaultCollapsed = false, storageKey = "tcm-sidebar-collapsed" }: { defaultCollapsed?: boolean; storageKey?: string }) {
  const [collapsed, setCollapsed] = useStoredBoolean(storageKey, defaultCollapsed);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [pageScrolled, setPageScrolled] = useState(false);
  const currentLocale = useCurrentLocale();
  const chrome = getChromeContent(currentLocale.id);

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
        {externalNav.map((item) => {
          const icon = (
            <span className="sidebar-external-icon" aria-hidden="true">
              <img src={asset("sidebar-external-arrow.svg")} alt="" />
            </span>
          );

          if (item.disabled) {
            return (
              <span key={item.label} className="sidebar-nav__disabled" aria-disabled="true">
                {icon}
                {item.label}
              </span>
            );
          }

          return (
            <a key={item.label} href={isPlaceholderLink(item.href) ? "#" : item.href} target={isPlaceholderLink(item.href) ? undefined : "_blank"} rel={isPlaceholderLink(item.href) ? undefined : "noopener noreferrer"} onClick={() => setDrawerOpen(false)}>
              {icon}
              {item.label}
            </a>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      <header className={`mobile-topbar ${drawerOpen ? "mobile-topbar--drawer-open" : ""} ${pageScrolled ? "mobile-topbar--scrolled" : ""}`}>
        <div className="mobile-topbar-left">
          <button className="mobile-menu-button" aria-label={drawerOpen ? chrome.closeNavigation : chrome.openNavigation} aria-expanded={drawerOpen} onClick={() => setDrawerOpen((open) => !open)}>
            <TabletHamburgerIcon open={drawerOpen} />
          </button>
          <span className="mobile-topbar-divider" aria-hidden="true" />
          <a className="mobile-brand" href={page("#top")} aria-label={chrome.homeAria}>
            <img src={asset("sidebar-logo.svg")} alt="" />
          </a>
        </div>
        <div className={`mobile-language ${langOpen ? "mobile-language--open" : ""}`}>
          <button className="mobile-language-trigger tc-type-link-small" aria-expanded={langOpen} onClick={() => setLangOpen((open) => !open)}>
            <span>
              <img className="language-icon" src={asset("language-icon.svg")} alt="" />
              {chrome.currentLanguage} - {currentLocale.shortLabel}
            </span>
            <img className="language-arrow" src={asset(langOpen ? "language-arrow-open.svg" : "language-arrow.svg")} alt="" />
          </button>
          {langOpen && (
            <LanguageOptions className="mobile-language-options" buttonClassName="tc-type-link-small" onSelect={() => { setLangOpen(false); setDrawerOpen(false); }} />
          )}
        </div>
      </header>
      <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${drawerOpen ? "sidebar--drawer-open" : ""}`}>
        <div className="sidebar-panel sidebar-panel--expanded" aria-hidden={collapsed && !drawerOpen}>
          <div className="sidebar-top">
            <div className="sidebar-brand">
              <a className="sidebar-home-link" href={page("#top")} aria-label={chrome.homeAria}>
                <img src={asset("sidebar-logo.svg")} alt="" />
              </a>
              <button className="sidebar-collapse" aria-label={chrome.collapseSidebar} aria-expanded="true" onClick={() => { setLangOpen(false); setCollapsed(true); }}>
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
                    {chrome.currentLanguage} - {currentLocale.shortLabel}
                  </span>
                  {langOpen ? (
                    <img className="language-arrow language-arrow--open" src={asset("language-arrow-open.svg")} alt="" />
                  ) : (
                    <img className="language-arrow" src={asset("language-arrow.svg")} alt="" />
                  )}
                </span>
              </button>
              {langOpen && (
                <LanguageOptions className="language-options language-options-panel" buttonClassName="tc-type-link-small" onSelect={() => setLangOpen(false)} />
              )}
            </div>
            <div className="disclaimer">
              <strong>{chrome.disclaimerLabel}</strong>
              <p>{sidebarDisclaimer}</p>
            </div>
          </div>
        </div>
        <div className="sidebar-panel sidebar-panel--collapsed" aria-hidden={!collapsed || drawerOpen}>
          <div className="sidebar-top">
            <div className="sidebar-brand">
              <a className="sidebar-home-icon" href={page("#top")} aria-label={chrome.homeAria}>
                <img src={asset("sidebar-logo-icon.svg")} alt="" />
              </a>
              <button className="sidebar-brand-collapsed" aria-label={chrome.expandSidebar} aria-expanded="false" onClick={() => { setLangOpen(false); setCollapsed(false); }}>
                <CollapseControl collapsed />
              </button>
            </div>
          </div>
          <div className="sidebar-collapsed-bottom">
            <div className="collapsed-buttons-stack">
              <div className="vertical-url tc-type-link-small">www.terra-classic.money</div>
              <div className="collapsed-language-slot">
                <button className={`collapsed-language-button ${langOpen ? "collapsed-language-button--open" : ""}`} aria-label={`${langOpen ? chrome.closeNavigation : chrome.openNavigation} ${chrome.language.toLowerCase()}`} aria-expanded={langOpen} onClick={() => setLangOpen((open) => !open)}>
                  {langOpen ? (
                    <>
                    <img className="language-x-icon language-x-icon--default" src={asset("language-x.svg")} alt="" />
                    <img className="language-x-icon language-x-icon--hover" src={asset("language-x-hover.svg")} alt="" />
                    </>
                  ) : (
                    <img src={asset("language-icon.svg")} alt="" />
                  )}
                </button>
                {langOpen && (
                  <LanguageOptions className="collapsed-language-options collapsed-language-panel" buttonClassName="tc-type-link-small" onSelect={() => setLangOpen(false)} />
                )}
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

export function SiteShell({
  children,
  sidebarDefaultCollapsed = false,
  sidebarStorageKey = "tcm-sidebar-collapsed",
}: {
  children: ReactNode;
  sidebarDefaultCollapsed?: boolean;
  sidebarStorageKey?: string;
}) {
  return (
    <div className="app">
      <div className="semantic-app">
        <Sidebar defaultCollapsed={sidebarDefaultCollapsed} storageKey={sidebarStorageKey} />
        <LanguageSuggestion />
        <main>{children}</main>
      </div>
    </div>
  );
}
