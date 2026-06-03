import { lazy, Suspense, useEffect, useState, type CSSProperties } from "react";
import { decentralizationArticleBlocks, decentralizationArticleLede, decentralizationReferences, decentralizationResourceGroups, decentralizationStats } from "../data/decentralization";
import { getCurrentLocaleId } from "../i18n/routing";
import type { LocaleId } from "../i18n/config";
import { ARTICLE_WORDS_PER_MINUTE, asset, BOTTOM_GLOW_VARIANT, DotArrowIcon, Footer, ShareOnXButton } from "./shared";

const planetPatternCells = Array.from({ length: 16 }, (_, index) => index);
const decagonPatternCells = Array.from({ length: 16 }, (_, index) => index);

const readTimeLabels: Record<LocaleId, (minutes: number) => string> = {
  en: (minutes) => `${minutes} MIN READ`,
  tr: (minutes) => `${minutes} DK OKUMA`,
  id: (minutes) => `${minutes} MENIT BACA`,
  de: (minutes) => `${minutes} MIN. LESEZEIT`,
  hi: (minutes) => `${minutes} मिनट पठन`,
  th: (minutes) => `อ่าน ${minutes} นาที`,
};

function formatReadTime(minutes: number) {
  const localeId = getCurrentLocaleId();
  return (readTimeLabels[localeId] || readTimeLabels.en)(minutes);
}

function DecagonPattern() {
  return (
    <span className="stats-decagon-pattern" style={{ "--stats-decagon-image": `url(${asset("decagon.svg")})` } as CSSProperties} aria-hidden="true">
      {decagonPatternCells.map((cell) => <span key={cell} />)}
    </span>
  );
}

const DecentralizationResources = lazy(async () => {
  const { DirectoryListItem } = await import("./directory");

  return {
    default: function DecentralizationResourcesContent() {
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
    },
  };
});

const DecentralizationCommunitySections = lazy(async () => {
  const { FAQ, FounderStories, JoinCommunity } = await import("./community");

  return {
    default: function DecentralizationCommunitySectionsContent() {
      return (
        <>
          <FounderStories />
          <JoinCommunity />
          <FAQ />
        </>
      );
    },
  };
});

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
  const readMinutes = Math.max(1, Math.ceil(readText.trim().split(/\s+/).length / ARTICLE_WORDS_PER_MINUTE));
  const readTimeLabel = formatReadTime(readMinutes);

  return (
    <article className="decentralization-page" id="top" aria-labelledby="decentralization-page-title">
      <header className="stats-panel decentralization-hero decentralization-stats-hero">
        <div className={`stats-glow stats-glow--${BOTTOM_GLOW_VARIANT}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <DecagonPattern />
        <span
          className="stats-small-planets stats-small-planets--cells"
          style={{ "--stats-planets-image": `image-set(url(${asset("stats-small-planets.avif")}) type("image/avif"), url(${asset("stats-small-planets.webp")}) type("image/webp"))` } as CSSProperties}
          aria-hidden="true"
        >
          {planetPatternCells.map((cell) => <span key={cell} />)}
        </span>
        <span
          className="stats-big-planet stats-big-planet--cells"
          style={{ "--stats-big-planet-image": `image-set(url(${asset("stats-big-planet.avif")}) type("image/avif"), url(${asset("stats-big-planet.webp")}) type("image/webp"))` } as CSSProperties}
          aria-hidden="true"
        >
          {planetPatternCells.map((cell) => <span key={cell} />)}
        </span>
        <div className="stats-copy decentralization-stats-hero__copy">
          <div className="article-meta">
            <span className="native-phase__badge article-meta__badge">{readTimeLabel}</span>
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
        {decentralizationArticleLede.length > 0 && (
          <div className="article-lede">
            {decentralizationArticleLede.map((paragraph) => (
              <p className="tc-type-h3" key={paragraph}>{paragraph}</p>
            ))}
          </div>
        )}

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

export function DecentralizationPage() {
  return (
    <>
      <DecentralizationArticle />
      <Suspense fallback={null}>
        <DecentralizationResources />
      </Suspense>
      <Suspense fallback={null}>
        <DecentralizationCommunitySections />
      </Suspense>
      <DecentralizationShare />
      <Footer />
    </>
  );
}
