export type PrivacyPolicyNode =
  | { type: "paragraph"; text: string }
  | { type: "subhead"; text: string }
  | { type: "list"; items: string[] };

export type PrivacyPolicySection = {
  title: string;
  content: PrivacyPolicyNode[];
};

export const privacyPolicyIntro = [
  "This Privacy Policy explains how terra-classic.money handles information when you visit or interact with this website.",
  "Terra-classic.money is an independent, community-maintained information website for Terra Classic. It is designed to provide educational resources, ecosystem wayfinding, public references, and contribution paths. It does not provide financial, investment, legal, tax, trading, staking, custody, or security advice.",
  "For the purposes of this Privacy Policy, “we,” “us,” and “our” refer to the maintainers of terra-classic.money.",
];

export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    title: "1. Who controls this website",
    content: [
      { type: "paragraph", text: "Terra-classic.money is maintained as an independent community website." },
      { type: "paragraph", text: "Website: terra-classic.money" },
      { type: "paragraph", text: "Contact: kontakt@dawidskinder.pl" },
      { type: "paragraph", text: "If this website is later transferred to another maintainer, legal entity, foundation, or governance-approved structure, this Privacy Policy should be updated to reflect that change." },
    ],
  },
  {
    title: "2. What this website does",
    content: [
      { type: "paragraph", text: "Terra-classic.money provides public information about Terra Classic, including ecosystem resources, educational pages, open work packages, references, links to external tools, and contribution information." },
      { type: "paragraph", text: "The website is intended to be simple and transparent. At the time of this Privacy Policy, the website does not require visitors to create an account, log in, connect a wallet, or provide personal information in order to browse the site." },
    ],
  },
  {
    title: "3. Information we may collect",
    content: [
      { type: "paragraph", text: "We aim to collect as little personal information as possible." },
      { type: "paragraph", text: "Depending on how you interact with the website, the following categories of information may be processed." },
      { type: "subhead", text: "3.1 Technical information" },
      { type: "paragraph", text: "When you visit the website, technical information may be processed automatically by hosting providers or infrastructure services. This may include:" },
      { type: "list", items: ["IP address", "browser type and version", "device type", "operating system", "referring page", "pages visited", "date and time of visit", "basic security logs", "error logs"] },
      { type: "paragraph", text: "This information is normally processed to make the website available, secure, and reliable." },
      { type: "paragraph", text: "Because the website may be hosted through GitHub Pages, GitHub may log visitor IP addresses and other technical information for security and service operation purposes. GitHub’s own privacy terms apply to GitHub’s processing." },
      { type: "subhead", text: "3.2 Information you voluntarily provide" },
      { type: "paragraph", text: "You may choose to provide information when you:" },
      { type: "list", items: ["contact us by email or another public contact channel", "submit an issue, correction, or suggestion", "contribute through GitHub", "submit a pull request", "comment in a public repository", "provide a name or display name for contributor recognition", "ask to be listed as a donor, sponsor, translator, contributor, or maintainer", "provide information for an ecosystem listing or open work package"] },
      { type: "paragraph", text: "This information may include:" },
      { type: "list", items: ["name or display name", "email address", "GitHub username", "social media handle", "wallet address", "contributor role", "project name", "public message content", "any other information you choose to provide"] },
      { type: "paragraph", text: "Please do not send private keys, seed phrases, passwords, recovery phrases, personal identification documents, financial account information, or sensitive personal data through this website or its contribution channels." },
      { type: "subhead", text: "3.3 Public blockchain information" },
      { type: "paragraph", text: "If you donate to a public blockchain address listed on the website, your transaction may be publicly visible on-chain." },
      { type: "paragraph", text: "Public blockchain data may include:" },
      { type: "list", items: ["wallet address", "transaction amount", "transaction time", "transaction hash", "asset type", "memo or transaction note, if used"] },
      { type: "paragraph", text: "Blockchain transactions are public, permanent, and outside our control. Do not include personal information in blockchain transaction memos unless you intentionally want that information to be public." },
      { type: "subhead", text: "3.4 Public GitHub information" },
      { type: "paragraph", text: "If you contribute through GitHub, your GitHub username, profile, comments, commits, issues, pull requests, and other contribution activity may be publicly visible." },
      { type: "paragraph", text: "GitHub processes this information under its own privacy policy and terms." },
    ],
  },
  {
    title: "4. Information we do not intentionally collect",
    content: [
      { type: "paragraph", text: "At the time of this Privacy Policy, terra-classic.money does not intentionally collect:" },
      { type: "list", items: ["account registration data", "passwords", "wallet private keys", "seed phrases", "payment card data", "government ID documents", "precise location data", "biometric data", "health data", "political opinions", "religious beliefs", "information about children", "native wallet connection data"] },
      { type: "paragraph", text: "The website does not ask users to connect a wallet." },
      { type: "paragraph", text: "If any of these features are added in the future, this Privacy Policy should be updated before those features go live." },
    ],
  },
  {
    title: "5. Cookies and analytics",
    content: [
      { type: "paragraph", text: "At the time of this Privacy Policy, terra-classic.money is intended to operate without advertising cookies, behavioral tracking, or invasive analytics." },
      { type: "paragraph", text: "However, some third-party infrastructure or embedded services may use cookies or similar technologies when you interact with external content, GitHub, social sharing links, media players, analytics tools, or other third-party services." },
      { type: "paragraph", text: "If privacy-friendly analytics are added in the future, they should be configured to minimize personal data collection where possible." },
      { type: "paragraph", text: "If non-essential cookies or analytics requiring consent are added, the website should add an appropriate cookie notice or consent mechanism where required by law." },
    ],
  },
  {
    title: "6. How we use information",
    content: [
      { type: "paragraph", text: "We may use information for the following purposes:" },
      { type: "list", items: ["to make the website available", "to maintain website security", "to fix bugs and technical errors", "to respond to messages, corrections, or contribution requests", "to review website issues and pull requests", "to process public contributor recognition", "to maintain public contributor, donor, or sponsor logs where applicable", "to review ecosystem submissions or open work suggestions", "to improve website content, structure, accessibility, and user experience", "to protect the website from spam, abuse, fraud, or malicious activity", "to comply with legal obligations where applicable"] },
      { type: "paragraph", text: "We do not sell personal information." },
      { type: "paragraph", text: "We do not use personal information to provide financial recommendations." },
      { type: "paragraph", text: "We do not use donations, contributor data, or contact information to create hidden rankings, validator preferences, or undisclosed promotional placement." },
    ],
  },
  {
    title: "7. Legal basis for processing",
    content: [
      { type: "paragraph", text: "Where privacy laws such as the GDPR apply, we rely on the following legal bases:" },
      { type: "subhead", text: "Legitimate interests" },
      { type: "paragraph", text: "We may process limited technical and operational data to operate, secure, maintain, and improve the website." },
      { type: "subhead", text: "Consent" },
      { type: "paragraph", text: "We may rely on consent where you voluntarily provide information, ask to be listed publicly, subscribe to a future communication feature, or agree to optional cookies or analytics." },
      { type: "subhead", text: "Contract or pre-contractual steps" },
      { type: "paragraph", text: "If you contact us about a contribution, service, open work package, sponsorship, listing, or collaboration, we may process the information necessary to respond and coordinate that interaction." },
      { type: "subhead", text: "Legal obligation" },
      { type: "paragraph", text: "We may process or retain information when required to comply with applicable laws, legal requests, accounting duties, fraud prevention, dispute resolution, or public safety requirements." },
    ],
  },
  {
    title: "8. How long we keep information",
    content: [
      { type: "paragraph", text: "We keep information only for as long as reasonably necessary for the purpose for which it was collected." },
      { type: "paragraph", text: "Typical retention periods may include:" },
      { type: "list", items: ["technical logs: retained by hosting or infrastructure providers according to their own retention policies", "email or contact messages: retained as long as needed to respond, maintain records, or resolve disputes", "GitHub issues, pull requests, and commits: may remain publicly visible as part of the open-source project history", "contributor listings: retained until a contributor asks for removal, unless there is a legitimate reason to keep a public historical record", "donation records: may remain visible where they are part of public blockchain history or public transparency logs", "legal or accounting records: retained as required by applicable law"] },
      { type: "paragraph", text: "Public blockchain data cannot usually be deleted by us because it exists on decentralized public networks." },
      { type: "paragraph", text: "Public GitHub activity may remain visible according to GitHub’s own systems and policies." },
    ],
  },
  {
    title: "9. When information is shared",
    content: [
      { type: "paragraph", text: "We may share or make information available in the following limited cases:" },
      { type: "subhead", text: "Hosting and infrastructure providers" },
      { type: "paragraph", text: "The website may be hosted through GitHub Pages or similar infrastructure providers. These providers may process technical data needed to deliver and secure the website." },
      { type: "subhead", text: "GitHub and open-source contribution tools" },
      { type: "paragraph", text: "If you contribute through GitHub, your contribution activity may be processed by GitHub and may be publicly visible." },
      { type: "subhead", text: "Public contributor or donor logs" },
      { type: "paragraph", text: "If you voluntarily ask to be credited as a contributor, donor, translator, sponsor, maintainer, or supporter, your chosen public name, role, wallet address, contribution type, or other approved details may be published." },
      { type: "subhead", text: "External services" },
      { type: "paragraph", text: "The website may link to external services such as explorers, wallets, documentation, governance tools, dashboards, social platforms, media platforms, project websites, or repositories. Those services operate under their own privacy policies." },
      { type: "subhead", text: "Legal requirements" },
      { type: "paragraph", text: "We may disclose information if required to comply with a legal obligation, enforce website policies, respond to lawful requests, protect rights and safety, or investigate abuse." },
    ],
  },
  {
    title: "10. External links",
    content: [
      { type: "paragraph", text: "Terra-classic.money links to external websites, tools, apps, repositories, wallets, explorers, governance platforms, dashboards, social media accounts, and third-party resources." },
      { type: "paragraph", text: "We are not responsible for the privacy practices, security, content, accuracy, or policies of third-party websites." },
      { type: "paragraph", text: "Before using any external service, you should review its own privacy policy and security practices." },
      { type: "paragraph", text: "This is especially important for wallets, blockchain explorers, exchanges, DeFi applications, staking interfaces, bridge tools, and any website asking you to connect a wallet or sign a transaction." },
    ],
  },
  {
    title: "11. Donations and public transparency",
    content: [
      { type: "paragraph", text: "If the website accepts donations, donation addresses may be publicly listed." },
      { type: "paragraph", text: "Donation transactions made on public blockchains are visible to anyone. We may also maintain a public donation or supporter log for transparency." },
      { type: "paragraph", text: "Unless clearly stated otherwise:" },
      { type: "list", items: ["donations do not buy editorial control", "donations do not buy validator preference", "donations do not buy rankings", "donations do not buy main ecosystem placement", "donations do not create governance rights", "donations do not create ownership rights", "donations do not create a right to financial return", "donations do not create official Terra Classic status"] },
      { type: "paragraph", text: "If you want to donate anonymously, avoid including personal information in transaction memos and do not ask to be listed publicly." },
    ],
  },
  {
    title: "12. Paid listings and commercial surfaces",
    content: [
      { type: "paragraph", text: "If terra-classic.money or related subdomains include paid listings, sponsorships, or commercial discovery sections, these should be clearly labeled and separated from neutral ecosystem content." },
      { type: "paragraph", text: "Any paid listing may require processing limited contact or project information, such as:" },
      { type: "list", items: ["project name", "contact person", "email address", "website", "social links", "payment information", "listing content", "public project description"] },
      { type: "paragraph", text: "Paid listings are not endorsements, audits, guarantees, recommendations, or official Terra Classic recognition." },
    ],
  },
  {
    title: "13. Your rights",
    content: [
      { type: "paragraph", text: "Depending on your location and applicable privacy laws, you may have the right to:" },
      { type: "list", items: ["request access to personal information we hold about you", "ask us to correct inaccurate information", "ask us to delete information where legally possible", "object to certain processing", "restrict certain processing", "withdraw consent where processing is based on consent", "request a copy of information you provided", "complain to a data protection authority"] },
      { type: "paragraph", text: "To exercise your rights, contact us at:" },
      { type: "paragraph", text: "kontakt@dawidskinder.pl" },
      { type: "paragraph", text: "We may need to verify your identity before responding to certain requests." },
      { type: "paragraph", text: "Please note that we may not be able to delete information that is part of public blockchain history, public GitHub history, legally required records, or third-party systems outside our control." },
    ],
  },
  {
    title: "14. Children’s privacy",
    content: [
      { type: "paragraph", text: "Terra-classic.money is not directed to children." },
      { type: "paragraph", text: "We do not knowingly collect personal information from children. If you believe that a child has provided personal information through the website, contact us and we will take reasonable steps to remove it where possible." },
    ],
  },
  {
    title: "15. Security",
    content: [
      { type: "paragraph", text: "We aim to use reasonable technical and organizational measures to protect the website and any limited information we process." },
      { type: "paragraph", text: "However, no website, hosting provider, repository, email system, blockchain network, or internet transmission is completely secure." },
      { type: "paragraph", text: "Do not send private keys, seed phrases, passwords, identity documents, or sensitive personal information through the website, GitHub issues, public comments, email, or blockchain transaction memos." },
    ],
  },
  {
    title: "16. International visitors",
    content: [
      { type: "paragraph", text: "Terra-classic.money may be accessed globally." },
      { type: "paragraph", text: "If you access the website from outside the country where the website maintainers or hosting providers operate, your information may be processed in other countries. Those countries may have different data protection laws than your country of residence." },
      { type: "paragraph", text: "Where required, we will aim to apply appropriate safeguards for international data transfers." },
    ],
  },
  {
    title: "17. Changes to this Privacy Policy",
    content: [
      { type: "paragraph", text: "We may update this Privacy Policy from time to time." },
      { type: "paragraph", text: "When we make changes, we will update the “Last updated” date at the top of this page." },
      { type: "paragraph", text: "If changes are material, we may also announce them through the website, GitHub repository, or another public channel." },
    ],
  },
  {
    title: "18. Contact",
    content: [
      { type: "paragraph", text: "For privacy questions, correction requests, or data-related concerns, contact:" },
      { type: "paragraph", text: "kontakt@dawidskinder.pl" },
      { type: "paragraph", text: "You can also report website issues or suggest policy improvements through the project’s public GitHub repository, if available" },
    ],
  },
];
