import { useEffect, useState, type ReactNode } from "react";
import {
  externalNav,
  languageOptions,
  sections,
  sidebarDisclaimer,
} from "../data/content";
import { isPlaceholderLink } from "../data/links";

export const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;
export const page = (path = "") => `${import.meta.env.BASE_URL}${path}`;

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

function Sidebar({ defaultCollapsed = false, storageKey = "tcm-sidebar-collapsed" }: { defaultCollapsed?: boolean; storageKey?: string }) {
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
        <main>{children}</main>
      </div>
    </div>
  );
}
