import { ecosystemCategories } from "../data/ecosystem";
import { animatePageScrollTo, Footer, getPageScrollY, getScrollMarginTop, ShareOnXButton } from "./shared";
import { FAQ, FounderStories, JoinCommunity } from "./community";
import { EcosystemCategorySection } from "./directory";

function EcosystemDirectory() {
  const handleCategoryLinkClick = (categoryId: string) => {
    const target = document.getElementById(categoryId);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + getPageScrollY() - getScrollMarginTop(target);
    animatePageScrollTo(targetTop, () => window.history.pushState(null, "", `#${categoryId}`));
  };

  return (
    <section className="ecosystem-page" id="ecosystem" aria-labelledby="ecosystem-page-title">
      <span className="visually-hidden" id="top">Top</span>
      <div className="ecosystem-page__intro">
        <h1 className="tc-type-h1" id="ecosystem-page-title">Terra Classic ecosystem</h1>
        <p className="tc-type-h4">A neutral directory of Terra Classic apps, wallets, bridges, validators, developer resources, infrastructure providers, and community tools. Listings are informational only and do not imply endorsement, audit, or official status.</p>
      </div>
      <nav className="directory-nav" aria-label="Ecosystem categories">
        {ecosystemCategories.map((category) => (
          <button className="directory-nav__button tc-type-link-big" type="button" key={category.id} onClick={() => handleCategoryLinkClick(category.id)} aria-controls={category.id}>
            {category.title} <span>({category.entries.length})</span>
          </button>
        ))}
      </nav>
      {ecosystemCategories.map((category) => (
        <EcosystemCategorySection category={category} key={category.id} />
      ))}
    </section>
  );
}

function EcosystemShare() {
  const shareHref = "https://x.com/intent/tweet?text=Explore%20the%20Terra%20Classic%20ecosystem&url=https%3A%2F%2Fterra-classic.money%2Fecosystem.html";
  return (
    <section className="section ecosystem-share" aria-labelledby="ecosystem-share-title">
      <div className="ecosystem-share__copy">
        <h2 className="tc-type-h2" id="ecosystem-share-title">Help make Terra Classic easier to navigate.</h2>
        <p className="tc-type-h4">The ecosystem is stronger when accurate tools, wallets, builders, and infrastructure are easy to find. Share the directory, then use GitHub to suggest corrections when listings change.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

export function EcosystemPage() {
  return (
    <>
      <EcosystemDirectory />
      <FounderStories />
      <JoinCommunity />
      <FAQ />
      <EcosystemShare />
      <Footer />
    </>
  );
}
