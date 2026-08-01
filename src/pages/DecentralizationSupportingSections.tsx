import { decentralizationResourceGroups } from "../data/decentralization";
import { FAQ, FounderStories, JoinCommunity } from "./community";
import { DirectoryListItem } from "./directory";

export function DecentralizationSupportingSections() {
  return (
    <>
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
      <FounderStories />
      <JoinCommunity />
      <FAQ />
    </>
  );
}
