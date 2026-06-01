import { ResponsiveImage } from "../components/ResponsiveImage";
import { links } from "../data/links";
import { BOTTOM_GLOW_VARIANT, Footer, LinkButton, page } from "./shared";

export function NotFoundPage() {
  return (
    <>
      <section className="not-found-page" id="top" aria-labelledby="not-found-title">
        <div className={`stats-glow stats-glow--${BOTTOM_GLOW_VARIANT}`} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="protocol-lines not-found-page__lines" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <ResponsiveImage
          className="not-found-page__orb"
          baseName="hero-orb-figma"
          widths={[480, 768, 1024, 1848]}
          fallbackWidth={1848}
          sizes="(max-width: 767px) 92vw, 720px"
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          width="1848"
          height="1836"
          reveal
        />
        <div className="not-found-page__copy">
          <p className="not-found-page__eyebrow tc-type-link-small">404</p>
          <h1 className="tc-type-h1" id="not-found-title">This page is not on the map.</h1>
          <p className="tc-type-h4">
            The link may be outdated, mistyped, or moved during the rebuild of terra-classic.money.
          </p>
        </div>
        <div className="not-found-page__actions" aria-label="Page recovery links">
          <LinkButton href={page("index.html")}>Return home</LinkButton>
          <LinkButton href={page(links.ecosystem)}>Explore ecosystem</LinkButton>
        </div>
      </section>
      <Footer />
    </>
  );
}
