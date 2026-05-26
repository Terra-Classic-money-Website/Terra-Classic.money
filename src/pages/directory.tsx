import type { EcosystemCategory, EcosystemEntry } from "../data/ecosystem";
import { avatarAsset, DotArrowIcon } from "./shared";

export function DirectoryListItem({ entry }: { entry: EcosystemEntry }) {
  const content = (
    <>
      <span className="directory-list-item__avatar" aria-hidden="true">
        {entry.avatar ? <img src={avatarAsset(entry.avatar)} alt="" loading="lazy" /> : <span>{entry.name.slice(0, 2).toUpperCase()}</span>}
      </span>
      <span className="directory-list-item__copy">
        <span className="directory-list-item__name tc-type-h5">{entry.name}</span>
        {entry.summary && <span className="directory-list-item__summary tc-type-body-small">{entry.summary}</span>}
      </span>
      <span className="directory-list-item__meta">
        {(entry.badge || entry.status) && <span className={`native-phase__badge ${entry.status ? "directory-list-item__badge--muted" : "directory-list-item__badge--native"}`}>{entry.status || entry.badge}</span>}
      </span>
      {entry.href && <span className="directory-list-item__arrow"><DotArrowIcon /></span>}
    </>
  );

  if (!entry.href) {
    return <div className="directory-list-item directory-list-item--disabled">{content}</div>;
  }

  return (
    <a className="directory-list-item" href={entry.href} target="_blank" rel="noopener noreferrer" aria-label={`${entry.name}${entry.summary ? `, ${entry.summary}` : ""}`}>
      {content}
    </a>
  );
}

export function EcosystemCategorySection({ category }: { category: EcosystemCategory }) {
  return (
    <section className="ecosystem-category" id={category.id} aria-labelledby={`${category.id}-title`}>
      <header className="ecosystem-category__header">
        <div className="ecosystem-category__title">
          <div>
            <h2 className="tc-type-h3" id={`${category.id}-title`}>{category.title}</h2>
            <p className="tc-type-body-small">{category.description}</p>
          </div>
        </div>
        <span className="ecosystem-category__rule" aria-hidden="true" />
        <span className="ecosystem-category__count tc-type-h4">{category.entries.length}</span>
      </header>
      <div className="ecosystem-grid">
        {category.entries.map((entry) => (
          <DirectoryListItem entry={entry} key={`${category.id}-${entry.name}-${entry.summary}-${entry.href || entry.status || "static"}`} />
        ))}
      </div>
    </section>
  );
}
