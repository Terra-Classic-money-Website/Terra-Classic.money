import { closedWorkPackages, openWorkPackages, type ClosedWorkPackage, type OpenWorkPackage } from "../data/openWork";
import { links } from "../data/links";
import { FAQ, FounderStories, JoinCommunity } from "./community";
import { DotArrowIcon, Footer, LinkButton, page, ShareOnXButton } from "./shared";

function openWorkDetailHref(id: string) {
  return page(`${links.openWorkDetail}?work=${encodeURIComponent(id)}`);
}

function OpenWorkCard({ workPackage }: { workPackage: OpenWorkPackage }) {
  return (
    <a className="open-work-card" href={openWorkDetailHref(workPackage.id)} aria-label={`View open work details for ${workPackage.title}`}>
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

function ClosedWorkCard({ workPackage }: { workPackage: ClosedWorkPackage }) {
  return (
    <article className="open-work-card open-work-card--closed">
      <span className="open-work-card__meta">
        <span className="native-phase__badge">{workPackage.category}</span>
      </span>
      <span className="open-work-card__copy">
        <span className="open-work-card__title tc-type-h4">{workPackage.title}</span>
        <span className="open-work-card__summary tc-type-body-small">{workPackage.summary}</span>
      </span>
      <span className="open-work-card__footer">
        <span>
          <small className="tc-type-body-very-small">Completed</small>
          <strong className="tc-type-link-big">{workPackage.completed}</strong>
        </span>
        <span>
          <small className="tc-type-body-very-small">Delivered</small>
          <strong className="tc-type-link-big">{workPackage.delivered}</strong>
        </span>
      </span>
    </article>
  );
}

function OpenWorkBoard() {
  return (
    <section className="open-work-board" aria-labelledby="open-work-board-title">
      <header className="open-work-section-head">
        <div>
          <h2 className="tc-type-h3" id="open-work-board-title">Open work packages</h2>
          <p className="tc-type-h4">Current ecosystem requests that can be quoted by independent builders, software houses, and contributors.</p>
        </div>
        <span className="open-work-count tc-type-h4">{openWorkPackages.length}</span>
      </header>
      <div className="open-work-grid">
        {openWorkPackages.map((workPackage) => (
          <OpenWorkCard workPackage={workPackage} key={workPackage.id} />
        ))}
      </div>
    </section>
  );
}

function ClosedWorkBoard() {
  return (
    <section className="open-work-board open-work-board--closed" aria-labelledby="closed-work-board-title">
      <header className="open-work-section-head">
        <div>
          <h2 className="tc-type-h3" id="closed-work-board-title">Closed work packages</h2>
          <p className="tc-type-h4">Completed ecosystem work that shows Terra Classic maintenance continuing in public.</p>
        </div>
        <span className="open-work-count tc-type-h4">{closedWorkPackages.length}</span>
      </header>
      <div className="open-work-grid open-work-grid--closed">
        {closedWorkPackages.map((workPackage) => (
          <ClosedWorkCard workPackage={workPackage} key={workPackage.id} />
        ))}
      </div>
    </section>
  );
}

function OpenWorkTerms() {
  const terms = [
    {
      title: "Pay per delivered work",
      body: "Payment is made only after successful completion of the whole accepted work package, or after successful delivery of an accepted milestone when the quote is split into stages.",
    },
    {
      title: "Payment asset and wallet",
      body: "Payment is made in LUNC or USTC to the wallet address described in the accepted quote or proposal. The requested asset, wallet, amount, and stage structure must be public before voting.",
    },
  ];

  return (
    <section className="open-work-terms" aria-labelledby="open-work-terms-title">
      <header className="open-work-section-head">
        <div>
          <h2 className="tc-type-h2" id="open-work-terms-title">Cooperation terms</h2>
          <p className="tc-type-h4">Work should be scoped, quoted, delivered, and paid in a way the Terra Classic community can review in public.</p>
        </div>
      </header>
      <div className="open-work-terms-grid">
        {terms.map((term, index) => (
          <article className="open-work-term" key={term.title}>
            <span className="article-section__index tc-type-link-big">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="tc-type-h4">{term.title}</h3>
              <p className="tc-type-body">{term.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OpenWorkProcess() {
  const steps = [
    {
      title: "Choose an open work package",
      body: "Review the detail page, acceptance criteria, expected deliverables, and quote requirements before preparing the proposal.",
    },
    {
      title: "Publish the quote on Agora",
      body: "Post the official quote or proposal on the Terra Classic Agora forum so the scope, cost, delivery model, wallet, and risks are visible to the community.",
    },
    {
      title: "Discuss with community and validators",
      body: "Answer questions, refine the scope if needed, and make trade-offs explicit before the work asks for on-chain approval.",
    },
    {
      title: "Go through governance",
      body: "Submit the proposal to Terra Classic governance. A successful governance vote means the quote is accepted and the contractor can start the approved work.",
    },
  ];

  return (
    <section className="open-work-process" aria-labelledby="open-work-process-title">
      <div className="open-work-process__intro">
        <h2 className="tc-type-h2" id="open-work-process-title">Proposal and quote process</h2>
        <p className="tc-type-h4">The website can list work packages, but acceptance happens through public community discussion and Terra Classic governance.</p>
        <LinkButton href={links.agoraForum} dark>Open Terra Classic Agora</LinkButton>
      </div>
      <div className="open-work-process__steps">
        {steps.map((step, index) => (
          <article className="open-work-step" key={step.title}>
            <span className="tc-type-h3">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="tc-type-h4">{step.title}</h3>
              <p className="tc-type-body-small">{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function OpenWorkShare() {
  const shareHref = "https://x.com/intent/tweet?text=Explore%20open%20Terra%20Classic%20work%20packages%20for%20builders%20and%20contributors&url=https%3A%2F%2Fterra-classic.money%2Fopen-work.html";
  return (
    <section className="section ecosystem-share open-work-share" aria-labelledby="open-work-share-title">
      <div className="ecosystem-share__copy">
        <h2 className="tc-type-h2" id="open-work-share-title">Help serious builders find the work.</h2>
        <p className="tc-type-h4">Share the open work board with teams that can deliver scoped, source-aware, governance-ready work for Terra Classic.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

export function OpenWorkPage() {
  return (
    <>
      <section className="open-work-page" id="top" aria-labelledby="open-work-page-title">
        <div className="open-work-page__intro">
          <h1 className="tc-type-h1" id="open-work-page-title">Open work for Terra Classic</h1>
          <p className="tc-type-h4">A public board of ecosystem work packages that independent builders, software houses, and contributors can prepare proposals or quotes for.</p>
        </div>
        <OpenWorkBoard />
        <ClosedWorkBoard />
        <OpenWorkTerms />
        <OpenWorkProcess />
      </section>
      <FounderStories />
      <JoinCommunity />
      <FAQ />
      <OpenWorkShare />
      <Footer />
    </>
  );
}
