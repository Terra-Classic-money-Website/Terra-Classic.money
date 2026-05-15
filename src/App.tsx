import { useEffect, useRef, useState } from "react";
import {
  assets,
  capabilities,
  externalNav,
  faqGroups,
  founders,
  heroGroups,
  languages,
  popularTopics,
  protocols,
  sections,
  sidebarDisclaimer,
  stats,
  strengths,
} from "./data/content";
import { isPlaceholderLink, links } from "./data/links";

const asset = (name: string) => `${import.meta.env.BASE_URL}assets/${name}`;

function useStoredBoolean(key: string, fallback: boolean) {
  const [value, setValue] = useState(() => localStorage.getItem(key) === null ? fallback : localStorage.getItem(key) === "true");
  useEffect(() => localStorage.setItem(key, String(value)), [key, value]);
  return [value, setValue] as const;
}

function LinkButton({ href, children, dark = false }: { href: string; children: string; dark?: boolean }) {
  const safeHref = isPlaceholderLink(href) ? "#" : href;
  return (
    <a className={`pill-button ${dark ? "pill-button--dark" : ""}`} href={safeHref} target={safeHref.startsWith("http") ? "_blank" : undefined} rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}>
      <span>{children}</span>
      <span aria-hidden="true" className="dot-arrow">•••</span>
    </a>
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
          <a key={section.id} className={activeId === section.id ? "active" : ""} href={`#${section.id}`} onClick={() => setDrawerOpen(false)}>
            {section.label}
          </a>
        ))}
      </nav>
      <nav className="sidebar-nav sidebar-nav--external" aria-label="External navigation">
        {externalNav.map((item) => (
          <a key={item.label} href={isPlaceholderLink(item.href) ? "#" : item.href} target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">↗</span>
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
        <button aria-label="Open navigation" aria-expanded={drawerOpen} onClick={() => setDrawerOpen((open) => !open)}>
          ☰
        </button>
      </header>
      <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""} ${drawerOpen ? "sidebar--drawer-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <img src={asset(collapsed ? "sidebar-collapsed.svg" : "sidebar-logo.svg")} alt="Terra Classic" />
            <button aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed} onClick={() => setCollapsed((state) => !state)}>
              <span aria-hidden="true">••</span>
            </button>
          </div>
          <div className="sidebar-nav-wrap">{nav}</div>
        </div>
        {collapsed ? (
          <div className="vertical-url">www.terra-classic.money</div>
        ) : (
          <div className="sidebar-bottom">
            <div className="language">
              <button aria-expanded={langOpen} onClick={() => setLangOpen((open) => !open)}>Language - {language}</button>
              {langOpen && (
                <div className="language-menu" role="listbox">
                  {languages.map((option) => (
                    <button key={option} onClick={() => { setLanguage(option); setLangOpen(false); }}>
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="disclaimer">
              <strong>Disclaimers:</strong>
              <p>{sidebarDisclaimer}</p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

function AnnouncementBar() {
  const [dismissed, setDismissed] = useStoredBoolean("tcm-announcement-dismissed", false);
  if (dismissed) return null;
  return (
    <div className="announcement" role="status">
      <div className="announcement-inner">
        <img src={asset("announcement-logo.svg")} alt="Terra Classic Workshops" />
        <span />
        <p>ClassicGathering, the flagship conference of the Terra Classic ecosystem, February 23–24 in San Francisco</p>
      </div>
      <button aria-label="Dismiss announcement" onClick={() => setDismissed(true)}>•••</button>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <img className="hero-orb" src={asset("hero-orb.png")} alt="" />
      <div className="hero-copy">
        <h1 id="hero-title">Blockchain so decentralized, it’s out of this world.</h1>
        <p>Use Terra Classic, build on it, or integrate it. Everything you need to get started—clear paths, credible tooling, and a network built for decentralized finance.</p>
      </div>
      <div className="hero-groups">
        {heroGroups.map((group) => (
          <article key={group.title} className="hero-group">
            <h2>{group.title}</h2>
            {group.links.map((item) => <a key={item} href="#about">{item}<span aria-hidden="true">•••</span></a>)}
          </article>
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
            <h2 id="video-title">Video coming soon</h2>
            <p>The explainer URL is centralized in <code>src/data/links.ts</code> and can be enabled without changing component code.</p>
          </>
        )}
      </div>
    </div>
  );
}

function WhatIsTerraClassic() {
  const [videoOpen, setVideoOpen] = useState(false);
  return (
    <section id="about" className="section what" aria-labelledby="what-title">
      <div className="split">
        <div>
          <h2 id="what-title">What is Terra Classic?</h2>
          <p className="lead">Community-governed, resilient Layer-1 blockchain engineered for dependable settlement and continuous evolution. Built to stay open, composable, and future-ready—so builders and institutions can ship with confidence.</p>
          <p>Terra Classic is a public network where anyone can transact, build, and participate in governance. It combines predictable on-chain execution with a pragmatic, upgrade-driven roadmap, so the chain can keep improving without sacrificing continuity. For users, that means straightforward access to wallets, staking, and apps. For teams, it means a stable foundation to launch products, integrate payments, and connect to stablecoin ecosystem designed for interoperability and long-term utility.</p>
        </div>
        <aside className="popular">
          <h3>Popular topics:</h3>
          {popularTopics.map((topic) => <a key={topic} href="#ecosystem">{topic}<span aria-hidden="true">•••</span></a>)}
        </aside>
      </div>
      <div className="video-orb">
        <img src={asset("what-orb.svg")} alt="" loading="lazy" />
        <button onClick={() => setVideoOpen(true)}>Watch video explainer — made by investors for investors</button>
      </div>
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </section>
  );
}

function Capabilities() {
  return (
    <section id="ecosystem" className="section" aria-labelledby="capabilities-title">
      <h2 id="capabilities-title">Explore what Terra Classic enables:</h2>
      <p className="section-intro">From everyday transactions to sophisticated DeFi and enterprise integrations, Terra Classic gives you a decentralized foundation to earn, trade, build, and scale—with clarity, composability, and future-ready performance.</p>
      <div className="capability-grid">
        {capabilities.map((card) => (
          <article key={card.title} className={`capability-card ${card.tall ? "tall" : ""} ${card.wide ? "wide" : ""}`}>
            <div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <LinkButton href="#">{card.cta}</LinkButton>
            </div>
            <img src={asset(card.image)} alt="" loading="lazy" />
          </article>
        ))}
      </div>
    </section>
  );
}

function ProtocolShowcase() {
  return (
    <section id="roadmap" className="protocols" aria-label="Protocol showcase">
      {protocols.map((protocol) => (
        <article key={protocol.id} className="protocol-panel">
          <div className="protocol-head">
            <div><span className={`protocol-icon ${protocol.accent}`} /><h2>{protocol.title}</h2></div>
            <span className="status">{protocol.status}</span>
            <p>{protocol.body}</p>
          </div>
          <div className="protocol-visual">
            {protocol.ui.map((ui) => <img key={ui} className="protocol-ui" src={asset(ui)} alt="" loading="lazy" />)}
            <img className="protocol-orb" src={asset(protocol.image)} alt="" loading="lazy" />
          </div>
          <div className="protocol-bottom">
            <h3>How it works:</h3>
            <div className="steps">
              {protocol.steps.map((step, index) => (
                <div key={step} className="step"><strong>Step {index + 1}</strong><p>{step}</p></div>
              ))}
            </div>
            <div className="protocol-actions">
              {protocol.buttons.map((button, index) => <LinkButton key={button} href="#" dark={index > 0}>{button}</LinkButton>)}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function NativeAssets() {
  return (
    <section className="section native-assets" aria-labelledby="assets-title">
      <h2 id="assets-title">Terra Classic native assets:</h2>
      <p className="section-intro">Terra Classic is engineered for a broader monetary universe: LUNC as the native speculative asset, plus a multi-currency suite of 20+ assets, ready to be progressively collateralized on-chain.</p>
      <h3>Speculative assets:</h3>
      <div className="lunc-row">
        <div><img src={asset("lunc-logo.svg")} alt="" /><strong>LUNC</strong><span>Terra LUNA Classic</span></div>
        <div className="asset-links"><span>CMC</span><span>CG</span></div>
      </div>
      <h3>Multi-currency suite</h3>
      {[1, 2, 3, 4].map((phase) => (
        <div key={phase} className="asset-phase">
          <div className="phase-title"><span>🌐</span><strong>Forex Protocol - Phase {phase}</strong><i /> <em>{phase === 1 ? "IN PROGRESS" : "COMMING SOON"}</em></div>
          <div className="token-grid">
            {assets.filter((item) => item.phase === phase).map((item) => <div className="token" key={`${phase}-${item.code}-${item.name}`}><strong>{item.code}</strong><span>{item.name}</span></div>)}
          </div>
        </div>
      ))}
      <p className="lead">Looking to bring a new fiat-pegged stable asset on-chain—whether as an issuer, institution, or public-sector partner—connect with the Terra Classic community to explore integration, collateralization, and governance-led rollout.</p>
      <LinkButton href="#" dark>Requirements and contact</LinkButton>
    </section>
  );
}

function Strengths() {
  return (
    <section id="decentralization" className="section strengths" aria-labelledby="strengths-title">
      <h2 id="strengths-title">Terra Classic strenghts:</h2>
      <p className="section-intro">A resilient, community-governed Layer-1 built for speed, uptime, and composability—where decentralization translates into real-world reliability for users, builders, and institutions.</p>
      <div className="strength-grid">
        {strengths.slice(0, 4).map(([title, body]) => <StrengthCard key={title} title={title} body={body} />)}
        <div className="strength-visual"><img src={asset("strength-orb.png")} alt="" loading="lazy" /></div>
        {strengths.slice(4).map(([title, body]) => <StrengthCard key={title} title={title} body={body} />)}
      </div>
    </section>
  );
}

function StrengthCard({ title, body }: { title: string; body: string }) {
  return <article className="strength-card"><h3>{title}</h3><p>{body}</p>{title !== "6s block time" && title !== "Deflationary ecosystem" && title !== "Revival narrative" && <LinkButton href="#">Find out more</LinkButton>}</article>;
}

function DecentralizationStats() {
  return (
    <section id="metrics" className="stats-panel" aria-labelledby="stats-title">
      <img className="stats-orb" src={asset("stats-orb.png")} alt="" loading="lazy" />
      <div className="stats-copy"><h2 id="stats-title">Efficiency driven by decentralization</h2><p>Terra Classic is governed in the open—no CEO, no single company, and no central authority—just a decentralized network where validators, builders, and stakeholders steer the roadmap together.</p></div>
      <div className="stats-row">{stats.map(([number, label]) => <div key={number}><strong>{number}</strong><span>{label}</span></div>)}</div>
      <LinkButton href="#decentralization">Find out more about Terra Classic decentralization</LinkButton>
    </section>
  );
}

function FounderStories() {
  return (
    <section className="section founders" aria-labelledby="founders-title">
      <h2 id="founders-title">Build your own app on Terra Classic:</h2>
      <p className="section-intro">Explore founder stories from teams already scaling real products across the ecosystem. Then launch your product / service with a fast, composable Layer-1 and a community that ships.</p>
      <LinkButton href={links.docs} dark>Check Terra Classic documentation</LinkButton>
      <div className="founder-head"><h3>Founder’s stories:</h3><div><button aria-label="Previous founder story">‹</button><button aria-label="Next founder story">›</button></div></div>
      <div className="founder-grid">
        {founders.map(([name, role]) => <article key={name} className="founder-card"><img src={asset("founder-portrait.png")} alt={`${name} portrait`} loading="lazy" /><h4>{name}</h4><p>{role}</p></article>)}
      </div>
    </section>
  );
}

function JoinCommunity() {
  const buttons = [
    ["Agora - Official Terra classic forum", links.agoraForum, "community-agora.png"],
    ["Official Github account", links.github, "community-github.svg"],
    ["Unofficial Discord channel", links.discord, "community-discord.png"],
  ];
  return (
    <section className="section community" aria-labelledby="community-title">
      <h2 id="community-title">Join Terra Classic community:</h2>
      <p className="section-intro">Track upgrades, evaluate opportunities, and shape what ships next—collaborating with builders, validators, investors, and institutions across governance, code, and real-time discussion.</p>
      <div className="community-buttons">{buttons.map(([label, href, icon]) => <a key={label} href={isPlaceholderLink(href) ? "#" : href} target="_blank" rel="noopener noreferrer">{label}<img src={asset(icon)} alt="" /></a>)}</div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <h2 id="faq-title">Frequently asked questions:</h2>
      <div className="faq-grid">
        {faqGroups.map(([group, questions]) => <div key={group} className="faq-group"><h3>{group}</h3>{questions.map((question) => {
          const id = question.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const expanded = open === id;
          return <div className="faq-item" key={question}><button aria-expanded={expanded} aria-controls={`${id}-answer`} onClick={() => setOpen(expanded ? null : id)}>{question}<span aria-hidden="true">⌄</span></button><p id={`${id}-answer`} hidden={!expanded}>Answer content is pending final editorial approval. This placeholder preserves the accessible accordion behavior without inventing Figma-missing answer copy.</p></div>;
        })}</div>)}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div><a href={isPlaceholderLink(links.privacy) ? "#" : links.privacy}>Privacy Policy</a><a href={isPlaceholderLink(links.brandAssets) ? "#" : links.brandAssets}>Terra Classic brand assets</a></div>
      <p>Terra-Classic.money designed and developed with ♥ by DawidSkinder.pl, with help from various community members.</p>
      <a className="back-top" href="#top">Back to the top <span aria-hidden="true">↑</span></a>
    </footer>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState("ecosystem");
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
      <Sidebar activeId={activeId} />
      <main>
        <AnnouncementBar />
        <Hero />
        <section className="logo-strip" aria-label="Decentralization supported by">
          <p>Decentralization supported by:</p>
          <img src={asset("support-logos.png")} alt="Supported by Binance, Circle, The Open Network, PayPal USD, Etherfuse, and ecosystem infrastructure partners" width="1161" height="28" loading="lazy" />
        </section>
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
  );
}
