import { privacyPolicyIntro, privacyPolicySections, type PrivacyPolicyNode } from "../data/privacyPolicy";
import { Footer } from "./shared";

function PrivacyPolicyContentNode({ node }: { node: PrivacyPolicyNode }) {
  if (node.type === "subhead") {
    return <h3 className="legal-page__subhead tc-type-h5">{node.text}</h3>;
  }

  if (node.type === "list") {
    return (
      <ul className="legal-page__list tc-type-body">
        {node.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    );
  }

  return <p className="tc-type-body">{node.text}</p>;
}

export function PrivacyPolicyPage() {
  return (
    <>
      <article className="legal-page" id="top" aria-labelledby="privacy-policy-title">
        <header className="legal-page__header">
          <h1 className="tc-type-h1" id="privacy-policy-title">Privacy Policy</h1>
          <p className="legal-page__updated tc-type-h4">Last updated: May 26, 2026</p>
          <div className="legal-page__intro">
            {privacyPolicyIntro.map((paragraph) => <p className="tc-type-body" key={paragraph}>{paragraph}</p>)}
          </div>
        </header>
        <div className="legal-page__body">
          {privacyPolicySections.map((section) => (
            <section className="legal-page__section" aria-labelledby={`${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`} key={section.title}>
              <h2 className="tc-type-h3" id={`${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`}>{section.title}</h2>
              <div className="legal-page__section-content">
                {section.content.map((node, index) => (
                  <PrivacyPolicyContentNode node={node} key={`${section.title}-${node.type}-${index}`} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
      <Footer />
    </>
  );
}
