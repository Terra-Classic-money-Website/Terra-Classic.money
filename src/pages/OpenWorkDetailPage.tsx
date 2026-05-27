import { openWorkById } from "../data/openWork";
import { links } from "../data/links";
import { Footer, LinkButton } from "./shared";

function OpenWorkDetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="open-work-detail-list" aria-labelledby={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>
      <h2 className="tc-type-h3" id={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>{title}</h2>
      <ul>
        {items.map((item) => <li className="tc-type-body-small" key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

export function OpenWorkDetailPage() {
  const id = new URLSearchParams(window.location.search).get("work") || "";
  const workPackage = openWorkById.get(id);

  if (!workPackage) {
    return (
      <>
        <section className="open-work-detail-page open-work-detail-page--missing" id="top" aria-labelledby="open-work-missing-title">
          <div className="open-work-detail-hero">
            <span className="native-phase__badge">NOT FOUND</span>
            <h1 className="tc-type-h1" id="open-work-missing-title">Open work package not found</h1>
            <p className="tc-type-h4">The requested work package may have been renamed, removed, or linked incorrectly.</p>
            <LinkButton href={links.openWork}>Back to open work</LinkButton>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <section className="open-work-detail-page" id="top" aria-labelledby="open-work-detail-title">
        <div className="open-work-detail-hero">
          <div className="open-work-detail-hero__copy">
            <span className="native-phase__badge">{workPackage.status}</span>
            <h1 className="tc-type-h1" id="open-work-detail-title">{workPackage.title}</h1>
            <p className="tc-type-h4">{workPackage.detailSummary}</p>
          </div>
          <aside className="open-work-detail-meta" aria-label="Work package summary">
            <div>
              <span className="tc-type-body-very-small">Category</span>
              <strong className="tc-type-link-big">{workPackage.category}</strong>
            </div>
            <div>
              <span className="tc-type-body-very-small">Effort</span>
              <strong className="tc-type-link-big">{workPackage.effort}</strong>
            </div>
            <div>
              <span className="tc-type-body-very-small">Quote model</span>
              <strong className="tc-type-link-big">{workPackage.quoteType}</strong>
            </div>
          </aside>
        </div>

        <div className="open-work-detail-body">
          <OpenWorkDetailList title="Ideal for" items={workPackage.idealFor} />
          <OpenWorkDetailList title="Expected deliverables" items={workPackage.deliverables} />
          <OpenWorkDetailList title="Acceptance criteria" items={workPackage.acceptanceCriteria} />
          <OpenWorkDetailList title="Quote should include" items={workPackage.quoteRequirements} />
        </div>

        <div className="open-work-detail-cta">
          <div>
            <h2 className="tc-type-h3">Ready to quote this work?</h2>
            <p className="tc-type-body-small">Prepare a public proposal on Agora with scope, timeline, acceptance criteria, payment asset, wallet address, and delivery stages. Community discussion and a successful governance vote are required before work starts.</p>
          </div>
          <LinkButton href={links.agoraForum}>Open Terra Classic Agora</LinkButton>
        </div>
      </section>
      <Footer />
    </>
  );
}
