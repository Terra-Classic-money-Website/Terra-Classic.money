export const aboutIntroParagraphs = [
  "Terra-classic.money is an independent, community-maintained information website for Terra Classic.",
  "It exists to make Terra Classic easier to understand, easier to verify, and easier to build on through clear ecosystem wayfinding, public resources, source-aware content, and transparent contribution rules.",
  "Terra Classic is decentralized infrastructure. That means no single website can own the network narrative. But a decentralized chain still needs a reliable public information layer: a place where users, builders, delegators, contributors, partners, media, and external observers can understand what exists, what is active, what is experimental, and how to participate responsibly.",
];

export const ownershipTimeline = [
  {
    period: "2018 - 2022",
    title: "Beginning",
    owner: "Terraform Labs",
  },
  {
    period: "May 2022",
    title: "Crash",
    owner: "Terraform Labs",
  },
  {
    period: "2022 - Today",
    title: "Post Crash",
    owner: "Community owned",
  },
  {
    period: "December 2025",
    title: "",
    owner: "TerraForm Labs wined down",
  },
];

export const openSourcePrinciples = [
  ["Transparent by default", "Content changes, corrections, and improvements should be traceable through public contribution workflows."],
  ["Neutral toward ecosystem participants", "The website should not secretly favor validators, builders, projects, tokens, contributors, or sponsors."],
  ["Open to contributors", "Anyone can suggest improvements through the public contribution process."],
  ["Source-aware", "Where possible, claims should be supported by direct links, public documentation, governance records, repositories, dashboards, or other verifiable sources."],
  ["User-protective", "The website should distinguish between official, unofficial, community-made, paid, experimental, unverified, and risky resources."],
  ["No financial advice", "The website provides information. It does not recommend buying, selling, staking, investing in, or using any asset, validator, project, product, or service."],
] as const;

export const contributionPaths = [
  ["Corrections", "Report outdated information, broken links, wrong labels, unclear descriptions, or missing context."],
  ["New resources", "Suggest wallets, explorers, dashboards, governance resources, developer tools, documentation, or ecosystem entries."],
  ["Translations", "Help make Terra Classic easier to understand for users across different languages and regions."],
  ["Content improvements", "Improve explanations, add missing context, simplify complex sections, or help make the website more accessible."],
  ["Open work packages", "Review public work requests and prepare proposals, quotes, or implementation plans for ecosystem needs."],
  ["Design and UX feedback", "Suggest interface improvements that make the site clearer, safer, and easier to use."],
] as const;

export const supportBoundaries = [
  "It does not buy rankings.",
  "It does not buy validator preference.",
  "It does not buy ecosystem placement.",
  "It does not buy editorial control.",
  "It does not buy governance status.",
  "It does not buy official recognition.",
] as const;

export const contributorGroups = [
  {
    title: "Donors and sponsors",
    description: "",
    rows: [
      ["Public supporter records", "Open for verified public entries", "Pending", ""],
    ],
  },
  {
    title: "Translations",
    description: "",
    rows: [
      ["Dawid Skinder", "Turkish, Indonesian, German, Hindi, Thai, Brazilian Portuguese, Simplified Chinese, and Polish translations", "", "about-photos/dawid-skinder.png"],
      ["amm-s-cloud", "Arabic locale, Arabic translations, and reusable RTL support", "", "about-photos/amm-s-cloud.png"],
    ],
  },
  {
    title: "Service contributors, domain owners and maintainers",
    description: "",
    rows: [
      ["Dawid Skinder", "Domain stewardship, project direction, design system, content structure, and website production", "", "about-photos/dawid-skinder.png"],
      ["Don Lunc", "Maintainer", "", "about-photos/don-lunc.png"],
      ["StrathCole", "Created the Terra Classic docs foundation expanded at docs.terra-classic.money", "", "about-photos/strathcole.png"],
      ["Whalliam", "Maintainer", "", "about-photos/whalliam.png"],
      ["Vladimir POSTHUMAN", "Maintainer", "", "about-photos/vladimir-posthuman.png"],
    ],
  },
] as const;

export const aboutFaqItems = [
  {
    question: "Is terra-classic.money the official Terra Classic website?",
    answer: "No. Terra-classic.money is an independent community project. If the Terra Classic community and governance later choose to adopt it, that decision can be proposed through governance.",
  },
  {
    question: "Who controls this website?",
    answer: "The website is designed to be maintained through public contribution workflows, transparent correction rules, and independent community maintenance rather than validator control.",
  },
  {
    question: "Can validators contribute?",
    answer: "Yes. Validators can suggest corrections, open issues, contribute content, and submit pull requests like any other community participant. Validator status should not create special editorial control.",
  },
  {
    question: "Do donations buy influence?",
    answer: "No. Donations do not buy editorial control, ecosystem placement, validator preference, listing approval, roadmap inclusion, governance status, or official recognition.",
  },
  {
    question: "Are paid L2 listings endorsements?",
    answer: "No. Paid L2 listings are promotional entries in a separated discovery surface. They are not endorsements, audits, recommendations, guarantees, or official Terra Classic status.",
  },
] as const;
