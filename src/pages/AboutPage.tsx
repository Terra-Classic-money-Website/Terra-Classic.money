import { useState } from "react";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { aboutFaqItems, aboutIntroParagraphs, contributionPaths, contributorGroups, openSourcePrinciples, ownershipTimeline, supportBoundaries } from "../data/about";
import { links } from "../data/links";
import { FAQ, FounderStories, JoinCommunity } from "./community";
import { ActionButton, asset, BOTTOM_GLOW_VARIANT, DisabledLinkButton, DonationModal, Footer, LinkButton, page, ShareOnXButton } from "./shared";

function AboutHero() {
  return (
    <section className="stats-panel decentralization-hero decentralization-stats-hero about-hero" id="top" aria-labelledby="about-page-title">
      <div className={`stats-glow stats-glow--${BOTTOM_GLOW_VARIANT}`} aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="protocol-lines about-hero__lines" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <ResponsiveImage
        className="about-hero__planet"
        baseName="about-hero-planet2"
        widths={[640, 768, 1067]}
        fallbackWidth={1067}
        sizes="(max-width: 767px) min(100vw - 48px, 760px), min(92vw, 1067px)"
        alt=""
        aria-hidden="true"
        loading="eager"
        fetchPriority="high"
        width="1067"
        height="584"
        reveal
      />
      <div className="stats-copy decentralization-stats-hero__copy about-hero__copy">
        <h1 className="tc-type-h1" id="about-page-title">About terra-classic.money</h1>
        <p className="tc-type-h4">{aboutIntroParagraphs[0]}</p>
        <div className="about-hero__body">
          <p className="tc-type-body">{aboutIntroParagraphs[1]}</p>
          <p className="tc-type-body">{aboutIntroParagraphs[2]}</p>
        </div>
      </div>
      <div className="stats-bottom decentralization-stats-hero__bottom about-hero__bottom">
        <div className="decentralization-hero-actions about-hero-actions">
          <LinkButton href={page("index.html")}>Explore the website</LinkButton>
          <a className="pill-button about-github-button tc-type-link-big" href={links.websiteRepository} target="_blank" rel="noopener noreferrer">
            <span>Contribute on Github</span>
            <img src={asset("community-github-figma.svg")} alt="" aria-hidden="true" width="32" height="32" />
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutOwnership() {
  function renderOwner(owner: string) {
    if (owner === "Terraform Labs") {
      return (
        <span className="about-timeline__owner-logo" aria-label="Terraform Labs">
          <img src={asset("about-terraform-labs-logo.webp")} alt="" aria-hidden="true" width="119" height="32" />
        </span>
      );
    }

    if (owner === "Community owned") {
      return (
        <span className="about-timeline__owner-badge">
          <span>COMMUNITY OWNED</span>
          <img src={asset("about-community-owned-arrow.svg")} alt="" aria-hidden="true" width="22" height="16" />
        </span>
      );
    }

    return <span className="about-timeline__owner-text">{owner}</span>;
  }

  return (
    <section className="about-section about-ownership" id="ownership" aria-labelledby="about-ownership-title">
      <div className="about-section__copy about-ownership__copy">
        <div className="about-section__text">
          <h2 className="tc-type-h2" id="about-ownership-title">Who owns Terra Classic?</h2>
          <p className="tc-type-h4">No company owns Terra Classic.</p>
          <p className="tc-type-body">No single validator owns Terra Classic. No single contributor owns Terra Classic. No single website owns Terra Classic. No single community account speaks for the entire network.</p>
          <p className="tc-type-body">Terra Classic is a public blockchain coordinated through validators, delegators, governance, builders, open-source software, infrastructure providers, users, and independent contributors. Its direction emerges through public participation, not private command.</p>
        </div>
        <LinkButton href={page(links.decentralization)} dark>More about decentralization</LinkButton>
      </div>
      <div className="about-timeline" aria-label="Terra Classic ownership model">
        {ownershipTimeline.map((item, index) => (
          <div className="about-timeline__group" key={`${item.period}-${item.owner}`}>
            <article className="about-timeline__item">
              <div className="about-timeline__event">
                <span className="tc-type-body">{item.period}</span>
                {item.title && <h3 className="tc-type-h5">{item.title}</h3>}
              </div>
              <div className="about-timeline__owner">{renderOwner(item.owner)}</div>
            </article>
            {index < ownershipTimeline.length - 1 && (
              <div className="about-timeline__separator" aria-hidden="true">
                <span />
                <img src={asset("about-timeline-separator.svg")} alt="" width="20" height="16" />
                <span />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutVisualBand({ variant }: { variant: "open-source" | "contribute" }) {
  const foreground = variant === "open-source"
    ? { file: "about-open-source-planet.webp", width: 801, height: 384 }
    : { file: "about-contribute-foreground.webp", width: 947, height: 303 };

  return (
    <div className={`about-visual-band about-visual-band--${variant}`} aria-hidden="true">
      <div className="about-visual-band__background">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="about-visual-band__lines">
        <span />
        <span />
        <span />
        <span />
      </div>
      {variant === "open-source" ? (
        <ResponsiveImage
          className="about-visual-band__image about-visual-band__image--open-source"
          baseName="about-open-source-planet"
          widths={[360, 720, 801]}
          fallbackWidth={801}
          sizes="(max-width: 767px) 70vw, 801px"
          sources={[{
            media: "(max-width: 1299px)",
            baseName: "about-open-source-planet-full",
            widths: [360, 720, 801],
            fallbackWidth: 801,
            sizes: "(max-width: 767px) 70vw, 801px",
          }]}
          alt=""
          loading="eager"
          width={foreground.width}
          height={foreground.height}
          reveal
        />
      ) : (
        <ResponsiveImage className={`about-visual-band__image about-visual-band__image--${variant}`} baseName="about-contribute-foreground" widths={[360, 720, 947]} fallbackWidth={947} sizes="(max-width: 767px) 70vw, 947px" alt="" loading="eager" width={foreground.width} height={foreground.height} reveal />
      )}
    </div>
  );
}

function AboutIndexedGrid({ items, visualVariant }: { items: readonly (readonly [string, string])[]; visualVariant: "open-source" | "contribute" }) {
  return (
    <div className={`about-indexed-grid about-indexed-grid--${visualVariant}`}>
      {items.slice(0, 3).map(([title, body], index) => (
        <article className="about-indexed-card" key={title}>
          <span className="about-indexed-card__number tc-type-h1">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3 className="tc-type-h3">{title}</h3>
            <p className="tc-type-body">{body}</p>
          </div>
        </article>
      ))}
      <AboutVisualBand variant={visualVariant} />
      {items.slice(3).map(([title, body], index) => (
        <article className="about-indexed-card" key={title}>
          <span className="about-indexed-card__number tc-type-h1">{String(index + 4).padStart(2, "0")}</span>
          <div>
            <h3 className="tc-type-h3">{title}</h3>
            <p className="tc-type-body">{body}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function AboutOpenSource() {
  return (
    <section className="about-section about-open-source" id="open-source" aria-labelledby="about-open-source-title">
      <div className="about-section__copy">
        <h2 className="tc-type-h2" id="about-open-source-title">Terra-classic.money is an independent open-source project</h2>
        <div className="about-section__text">
          <p className="tc-type-h4">Terra-classic.money is not currently the official Terra Classic website. It is an independent, open-source, community-maintained website created to provide a clearer public information layer for Terra Classic.</p>
          <p className="tc-type-body">The goal is simple: build the best independent Terra Classic website first. If the community later considers it useful, neutral, and trustworthy enough to become official, that decision can be proposed through Terra Classic governance.</p>
        </div>
      </div>
      <AboutIndexedGrid items={openSourcePrinciples} visualVariant="open-source" />
    </section>
  );
}

function AboutContribute() {
  return (
    <section className="about-section about-contribute" id="contribute" aria-labelledby="about-contribute-title">
      <div className="about-section__copy">
        <h2 className="tc-type-h2" id="about-contribute-title">Contribute to terra-classic.money</h2>
        <div className="about-section__text">
          <p className="tc-type-h4">Terra-classic.money improves when more people help keep it accurate, useful, and current.</p>
          <p className="tc-type-body">You do not need to be a validator or developer to contribute. Useful contributions can come from researchers, writers, translators, designers, builders, delegators, governance participants, documentation reviewers, ecosystem users, and anyone who notices something that should be corrected or improved.</p>
        </div>
      </div>
      <AboutIndexedGrid items={contributionPaths} visualVariant="contribute" />
      <div className="about-hero-actions">
        <LinkButton href={`${links.websiteRepository}/issues`} dark>Report an issue or suggest a change</LinkButton>
        <LinkButton href={`${links.websiteRepository}/blob/main/CONTRIBUTING.md`} dark>View contribution guidelines</LinkButton>
      </div>
    </section>
  );
}

function AboutSupport() {
  const [donationOpen, setDonationOpen] = useState(false);

  return (
    <section className="about-section about-support" id="support" aria-labelledby="about-support-title">
      <div className="about-support__head">
        <div className="about-section__copy">
          <h2 className="tc-type-h2" id="about-support-title">Support the public information layer</h2>
          <div className="about-section__text">
            <p className="tc-type-h4">Terra-classic.money is independent. That independence matters, but it also means the website needs a sustainable support model.</p>
            <p className="tc-type-body">Donations and transparent commercial surfaces help cover maintenance, research, content updates, design improvements, translations, infrastructure, and future public-good tools for the Terra Classic ecosystem.</p>
          </div>
        </div>
        <div className="about-boundary-card">
          <h3 className="tc-type-h5">Support does not buy influence</h3>
          <ul>
            {supportBoundaries.map((item) => (
              <li key={item}>
                <span className="about-boundary-card__icon" aria-hidden="true"><span /><span /><span /><span /><span /></span>
                <span className="about-boundary-card__text">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="about-commercial">
        <article>
          <span className="about-commercial__number tc-type-h1">01</span>
          <div className="about-commercial__copy">
            <h3 className="tc-type-h3">Voluntary donations</h3>
            <p className="tc-type-body">Donations help maintain and improve the website. They do not create ownership rights, governance rights, promotional rights, editorial rights, listing rights, or any expectation of financial return.</p>
          </div>
        </article>
        <article>
          <span className="about-commercial__number tc-type-h1">02</span>
          <div className="about-commercial__copy">
            <h3 className="tc-type-h3">Terra Classic L2 Directory</h3>
            <p className="tc-type-body">A paid discovery directory for Terra Classic-related L2 projects, tokens, meme coins, experimental apps, and community initiatives. Listings are paid promotional entries and do not represent endorsement by Terra-classic.money, Terra Classic governance, validators, or maintainers.</p>
          </div>
        </article>
      </div>
      <div className="about-hero-actions">
        <ActionButton dark onClick={() => setDonationOpen(true)}>Make a donation</ActionButton>
        <DisabledLinkButton dark>Paid listing packages</DisabledLinkButton>
      </div>
      <DonationModal open={donationOpen} onClose={() => setDonationOpen(false)} />
    </section>
  );
}

function AboutContributors() {
  const getContributorInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length > 1) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="about-section about-contributors" id="contributors" aria-labelledby="about-contributors-title">
      <div className="about-section__copy">
        <h2 className="tc-type-h2" id="about-contributors-title">List of contributors</h2>
        <div className="about-section__text">
          <p className="tc-type-h4">Terra-classic.money should make contribution visible.</p>
          <p className="tc-type-body">This contributor list recognizes people, teams, and organizations that helped improve or maintain the website. Inclusion does not imply endorsement, official status, governance authority, validator preference, or project recommendation.</p>
        </div>
      </div>
      <div className="about-contributor-ledger">
        {contributorGroups.map((group) => (
          <section className="about-contributor-group" aria-labelledby={`${group.title.replace(/\s+/g, "-").toLowerCase()}-title`} key={group.title}>
            <header>
              <div>
                <h3 className="tc-type-h4" id={`${group.title.replace(/\s+/g, "-").toLowerCase()}-title`}>{group.title}</h3>
                {group.description ? <p className="tc-type-body-small">{group.description}</p> : null}
              </div>
              <span className="ecosystem-category__rule" aria-hidden="true" />
              <span className="about-contributor-count tc-type-h4">{group.rows.length}</span>
            </header>
            <div className="about-contributor-rows">
              {group.rows.map(([name, role, period, avatar]) => (
                <article className="directory-list-item about-contributor-row" key={`${group.title}-${name}-${role}`}>
                  <span className="directory-list-item__avatar about-contributor-avatar" aria-hidden="true">
                    {avatar ? <img src={asset(avatar)} alt="" loading="lazy" /> : getContributorInitials(name)}
                  </span>
                  <span className="directory-list-item__copy">
                    <strong className="directory-list-item__name tc-type-h5">{name}</strong>
                    <span className="directory-list-item__summary tc-type-body-small">{role}</span>
                  </span>
                  {period ? (
                    <span className="directory-list-item__meta about-contributor-row__meta">
                      <small className="tc-type-body-very-small">{period}</small>
                    </span>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="about-hero-actions">
        <LinkButton href={links.websiteRepository} dark>View contributor log</LinkButton>
        <LinkButton href={`${links.websiteRepository}/issues`} dark>Suggest a correction</LinkButton>
      </div>
    </section>
  );
}

function AboutFAQ() {
  const [open, setOpen] = useState<string | null>(aboutFaqItems[0]?.question ?? null);
  return (
    <section className="section about-faq" aria-labelledby="about-faq-title">
      <h2 className="tc-type-h2" id="about-faq-title">FAQ</h2>
      <div className="about-faq-list">
        {aboutFaqItems.map((item) => {
          const id = item.question.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const expanded = open === item.question;
          return (
            <div className="faq-item about-faq-item" key={item.question}>
              <button aria-expanded={expanded} aria-controls={`${id}-answer`} onClick={() => setOpen(expanded ? null : item.question)}>
                <span className="tc-type-link-big">{item.question}</span>
                <img src={asset("faq-link-arrow.svg")} alt="" aria-hidden="true" />
              </button>
              {expanded && <p id={`${id}-answer`} className="tc-type-body-small">{item.answer}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function AboutShare() {
  const shareHref = "https://x.com/intent/tweet?text=Terra-classic.money%20is%20an%20independent%2C%20community-maintained%20website%20for%20Terra%20Classic.&url=https%3A%2F%2Fterra-classic.money%2Fabout.html";
  return (
    <section className="section about-share" aria-labelledby="about-share-title">
      <div className="about-share__copy">
        <h2 className="tc-type-h2" id="about-share-title">Terra Classic gets stronger when public information gets clearer.</h2>
        <p className="tc-type-h4">Share the independent website, challenge weak information, and help keep the ecosystem surface accurate, neutral, and useful.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutOwnership />
      <AboutOpenSource />
      <AboutContribute />
      <AboutSupport />
      <AboutContributors />
      <FounderStories />
      <JoinCommunity />
      <AboutFAQ />
      <AboutShare />
      <Footer />
    </>
  );
}
