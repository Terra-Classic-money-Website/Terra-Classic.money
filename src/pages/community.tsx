import { useState } from "react";
import { faqGroups, founders } from "../data/content";
import { isPlaceholderLink, links } from "../data/links";
import { asset, DeferredAssetImage } from "./shared";

export function FounderStories() {
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
        <DeferredAssetImage className="founder-card__portrait" assetName="founder-story-portrait.webp" alt={`${name} portrait`} loading="lazy" width="768" height="1024" />
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

export function JoinCommunity() {
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
                <img src={asset(icon)} alt="" />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function FAQ() {
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
