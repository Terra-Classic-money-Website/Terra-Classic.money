import { useState } from "react";
import { marketAssetGroups, type MarketAssetId } from "../data/markets";
import { animatePageScrollTo, Footer, getPageScrollY, getScrollMarginTop, ShareOnXButton } from "./shared";
import { FAQ, FounderStories, JoinCommunity } from "./community";
import { EcosystemCategorySection } from "./directory";

function MarketsDirectory() {
  const [selectedAssetId, setSelectedAssetId] = useState<MarketAssetId>("lunc");
  const selectedAsset = marketAssetGroups.find((asset) => asset.id === selectedAssetId) || marketAssetGroups[0];
  const marketCategories = selectedAsset.categories;

  const handleCategoryLinkClick = (categoryId: string) => {
    const target = document.getElementById(categoryId);
    if (!target) return;

    const targetTop = target.getBoundingClientRect().top + getPageScrollY() - getScrollMarginTop(target);
    animatePageScrollTo(targetTop, () => window.history.pushState(null, "", `#${categoryId}`));
  };

  return (
    <section className="ecosystem-page markets-page" id="markets" aria-labelledby="markets-page-title">
      <span className="visually-hidden" id="top">Top</span>
      <div className="ecosystem-page__intro">
        <h1 className="tc-type-h1" id="markets-page-title">Terra Classic markets</h1>
        <p className="tc-type-h4">A neutral directory of centralized and decentralized places where LUNC and USTC can be bought or swapped. Listings are informational only and do not imply endorsement, liquidity quality, custody safety, or investment advice.</p>
      </div>
      <nav className="directory-nav" aria-label="Market categories">
        {marketAssetGroups.map((asset) => {
          const selected = asset.id === selectedAsset.id;

          return (
            <button
              className={`directory-nav__button tc-type-link-big${selected ? " directory-nav__button--active" : ""}`}
              type="button"
              key={asset.id}
              aria-pressed={selected}
              onClick={() => setSelectedAssetId(asset.id)}
            >
              {asset.title}
            </button>
          );
        })}
        {marketCategories.map((category) => (
          <button className="directory-nav__button tc-type-link-big" type="button" key={category.id} onClick={() => handleCategoryLinkClick(category.id)} aria-controls={category.id}>
            {category.title} <span>({category.entries.length})</span>
          </button>
        ))}
      </nav>
      {marketCategories.map((category) => (
        <EcosystemCategorySection category={category} key={category.id} />
      ))}
    </section>
  );
}

function MarketsShare() {
  const shareHref = "https://x.com/intent/tweet?text=Find%20Terra%20Classic%20LUNC%20and%20USTC%20markets&url=https%3A%2F%2Fterra-classic.money%2Fmarkets.html";
  return (
    <section className="section ecosystem-share" aria-labelledby="markets-share-title">
      <div className="ecosystem-share__copy">
        <h2 className="tc-type-h2" id="markets-share-title">Help users find safer routes to LUNC and USTC.</h2>
        <p className="tc-type-h4">Market availability changes often. Share the directory, then use GitHub to suggest corrections when exchanges add, remove, or change LUNC or USTC pairs.</p>
      </div>
      <ShareOnXButton href={shareHref} />
    </section>
  );
}

export function MarketsPage() {
  return (
    <>
      <MarketsDirectory />
      <FounderStories />
      <JoinCommunity />
      <FAQ />
      <MarketsShare />
      <Footer />
    </>
  );
}
