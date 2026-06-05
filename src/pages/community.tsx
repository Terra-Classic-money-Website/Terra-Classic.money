import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { faqGroups } from "../data/content";
import { isPlaceholderLink, links } from "../data/links";
import { asset } from "./shared";

type VideoModalVariant = "founders";

const videoModalCopy: Record<VideoModalVariant, { title: string; paragraphs: string[] }> = {
  founders: {
    title: "Call to action to #TerraClassic L2 projects:",
    paragraphs: [
      "We are building the video sections for https://terra-classic.money from real voices in the ecosystem.",
      "Record and send a 1 min vertical smartphone video telling the story of your project: what you are building, why Terra Classic, and why it matters. These videos will be published in the Founder Stories section.",
      "Keep it simple: vertical video, smartphone is enough, clear audio, real answer, no overproduction.",
      "Send to email address kontakt@dawidskinder.pl.",
      "If your video is used, you will be listed as a contributor on the About terra-classic.money page.",
    ],
  },
};

export function FounderStories() {
  const docsHref = isPlaceholderLink(links.docs) ? "#" : links.docs;
  const [videoOpen, setVideoOpen] = useState(false);
  const storyPlaceholders = [
    [
      "Founder stories in preparation",
      "Recorded stories from Terra Classic builders and L2 teams will be added here as submissions are reviewed.",
    ],
    [
      "L2 project stories wanted",
      "Teams building on Terra Classic can prepare a 1 min vertical video about what they are building and why it matters.",
    ],
    [
      "Community collection opening soon",
      "This section will feature real voices from the ecosystem instead of placeholder profiles.",
    ],
  ];

  return (
    <section className="section founders" aria-labelledby="founders-title">
      <div className="founders-intro">
        <h2 className="tc-type-h2" id="founders-title">Build your own app on Terra Classic:</h2>
        <p className="tc-type-h4">Founder stories are being collected from Terra Classic builders and L2 teams. The section will feature real project clips as the community submits and reviews them.</p>
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
        {storyPlaceholders.map(([title, body]) => <FounderStoryCard key={title} title={title} body={body} onPlay={() => setVideoOpen(true)} />)}
      </div>
      <VideoModal open={videoOpen} variant="founders" onClose={() => setVideoOpen(false)} />
    </section>
  );
}

function VideoModal({ open, variant, onClose }: { open: boolean; variant: VideoModalVariant; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const copy = videoModalCopy[variant];

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

  return createPortal((
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="video-title" ref={ref} tabIndex={-1} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" aria-label="Close video modal" onClick={onClose}>×</button>
        {links.videoExplainer ? <iframe title="Terra Classic video explainer" src={links.videoExplainer} allowFullScreen /> : (
          <div className="video-modal-copy">
            <h2 className="tc-type-h3" id="video-title">{copy.title}</h2>
            {copy.paragraphs.map((paragraph) => <p className="tc-type-body" key={paragraph}>{paragraph}</p>)}
          </div>
        )}
      </div>
    </div>
  ), document.body);
}

function FounderStoryCard({ title, body, onPlay }: { title: string; body: string; onPlay: () => void }) {
  return (
    <article className="founder-card founder-card--placeholder">
      <button className="founder-card__media founder-card__media--placeholder" type="button" onClick={onPlay} aria-label="Open founder story video submission call to action">
        <span className="founder-card__play" aria-hidden="true">
          <img className="founder-card__dot founder-card__dot--1" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--2" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--3" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--4" src={asset("founder-play-dot-alt.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--5" src={asset("founder-play-dot.svg")} alt="" />
          <img className="founder-card__dot founder-card__dot--6" src={asset("founder-play-dot.svg")} alt="" />
        </span>
      </button>
      <div className="founder-card__copy">
        <h4 className="tc-type-h4">{title}</h4>
        <p className="tc-type-body">{body}</p>
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
                <img src={asset(icon)} alt="" loading="eager" />
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
