import { ecosystemCategories, type EcosystemEntry } from "./ecosystem";

export type ArticleBlock = {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type ArticleReference = {
  title: string;
  source: string;
  href: string;
};

const entriesByCategory = Object.fromEntries(
  ecosystemCategories.map((category) => [category.id, category.entries]),
) as Record<string, EcosystemEntry[]>;

export const decentralizationArticleBlocks: ArticleBlock[] = [
  {
    id: "thesis",
    eyebrow: "01",
    title: "Opening thesis",
    paragraphs: [
      "Terra Classic is not operated by a single company, foundation, founder, or private decision-maker.",
      "It is a public blockchain coordinated through validators, delegators, governance, open-source infrastructure, and community-led execution. Its decentralization is not a slogan. It is the operating environment of the chain itself: blocks are produced by independent validators, governance decisions are made on-chain, and network direction emerges through public participation rather than corporate command.",
      "That is what makes Terra Classic different.",
      "It is a blockchain where responsibility is distributed. Infrastructure is distributed. Decision-making is distributed. Visibility is public. Participation is open. The network does not depend on one office, one boardroom, or one central authority to continue moving forward.",
      "This model is not always simple. Decentralization requires coordination, discipline, transparency, and active participation from the people who secure and use the chain. But when it works, it creates something powerful: a blockchain that can continue, adapt, and evolve because no single party controls its future.",
      "Terra Classic is blockchain infrastructure shaped by its own community constellation - validators, delegators, builders, developers, educators, explorers, wallet providers, app teams, researchers, and users - each playing a role in a living, open network.",
      "This is decentralization in practice: not passive independence, but active public coordination.",
    ],
  },
  {
    id: "consensus",
    eyebrow: "02",
    title: "Consensus layer",
    paragraphs: [
      "At the heart of Terra Classic is a validator-based Proof-of-Stake system.",
      "Validators run the infrastructure that keeps the chain alive. They operate nodes, participate in consensus, sign blocks, process transactions, and help maintain the deterministic state of the network. In simple terms: validators are the operators that allow Terra Classic to keep producing blocks and finalizing transactions.",
      "Every block added to the chain is part of a shared record. Validators must agree on the state of that record. That agreement is what gives the network its continuity. Instead of one central server deciding what is true, Terra Classic relies on a distributed set of operators that collectively maintain a single, verifiable ledger.",
      "This is why validator diversity matters.",
      "The more independent and reliable the validator set is, the stronger the network's resilience becomes. Independent operators reduce the risk of coordination failure, censorship, infrastructure dependency, or excessive influence by any single participant. A healthy validator layer is not only about uptime. It is about credible neutrality.",
      "In a decentralized chain, consensus is not merely technical plumbing. It is the foundation of trust.",
      "Terra Classic's consensus layer allows the network to remain open, public, and verifiable. Anyone can observe the chain. Anyone can inspect blocks. Anyone can review governance activity. Anyone can choose where to delegate. That transparency is what turns decentralization from an abstract ideal into a practical operating model.",
    ],
  },
  {
    id: "delegation",
    eyebrow: "03",
    title: "Delegators and stake distribution",
    paragraphs: [
      "Delegators are essential to Terra Classic decentralization.",
      "A delegator is a LUNC holder who chooses to stake with a validator. By doing so, delegators help determine which validators receive voting power in the network. This makes delegation one of the most important user-level actions in Terra Classic.",
      "Delegation is not just a way to earn staking rewards. It is a signal of trust.",
      "When users delegate, they are effectively saying: \"I trust this validator to help secure the chain, participate in governance, operate responsibly, and represent my stake with discipline.\" That choice matters because validator voting power is shaped by delegated stake.",
      "This gives delegators a real role in decentralization.",
      "They can strengthen the network by supporting validators with strong uptime, transparent communication, responsible governance behavior, ecosystem contribution, technical reliability, and clear public presence. They can also reduce concentration risk by spreading stake across multiple credible operators instead of reinforcing the largest validators by default.",
      "In a Proof-of-Stake network, decentralization is not fixed. It changes with delegation behavior.",
      "Every delegation decision affects the shape of the validator set. Every redelegation can improve or weaken the distribution of influence. Every user who studies validator behavior before staking contributes to a more informed and resilient network.",
      "Terra Classic decentralization therefore depends on both validators and delegators. Validators operate the chain. Delegators shape the validator landscape.",
      "The chain becomes stronger when both sides act with long-term responsibility.",
    ],
  },
  {
    id: "governance",
    eyebrow: "04",
    title: "Governance layer",
    paragraphs: [
      "Terra Classic governance is where the network makes collective decisions.",
      "Through on-chain proposals, the community can discuss and vote on upgrades, parameter changes, treasury spending, technical initiatives, ecosystem priorities, and other network-level actions. Governance is the coordination layer that allows Terra Classic to evolve without relying on a central company.",
      "This is one of the most important features of the network.",
      "A decentralized blockchain cannot depend only on code that already exists. It needs a way to adapt. Software must be upgraded. Parameters may need to change. Infrastructure requires maintenance. New opportunities appear. Risks emerge. Builders need support. The ecosystem needs direction.",
      "Governance gives Terra Classic a public mechanism for making those decisions.",
      "The strength of this system is that decisions are visible. Proposals can be read. Votes can be tracked. Outcomes can be reviewed. The community can see which validators participate, how they vote, and whether approved work leads to visible execution.",
      "That visibility matters.",
      "In centralized systems, strategic decisions often happen behind closed doors. In Terra Classic, governance creates a public decision trail. The network's evolution can be inspected by users, builders, investors, and external partners.",
      "This does not mean every proposal is perfect. It does not mean every vote produces ideal outcomes. Decentralized governance is only as strong as the quality of participation around it.",
      "But the mechanism itself is powerful: Terra Classic has a built-in way to coordinate change in public.",
    ],
  },
  {
    id: "responsibility",
    eyebrow: "05",
    title: "Responsibility without central ownership",
    paragraphs: [
      "One of the most important ideas behind Terra Classic decentralization is this:",
      "A chain can have no central owner and still require responsibility.",
      "Decentralization does not mean \"nobody is responsible.\" It means responsibility is distributed across the actors who secure, govern, build, use, and represent the network.",
      "That distinction is critical.",
      "Terra Classic is not a company. It does not have a CEO who can unilaterally define its roadmap. It does not have a single legal operator that controls every major decision. It does not have a private management layer that can simply issue orders and execute them across the ecosystem.",
      "Instead, Terra Classic operates through public coordination.",
      "Validators carry major responsibility because they secure consensus and hold governance voting power. Delegators carry responsibility because they choose which validators receive that power. Builders carry responsibility because they create the products, tools, apps, and interfaces that make the chain useful. Community contributors carry responsibility because they educate, document, translate, research, and explain the network. Users carry responsibility because adoption is ultimately proven through real activity.",
      "This distributed model is demanding - but it is also the point.",
      "Terra Classic is not trying to be a closed corporate platform. It is a public blockchain. Its future is not owned by one actor. It is shaped by the people and teams willing to contribute to it.",
      "In that sense, Terra Classic decentralization is not only a technical property. It is a civic model for blockchain infrastructure.",
    ],
  },
  {
    id: "operations",
    eyebrow: "06",
    title: "Operational decentralization",
    paragraphs: [
      "True decentralization extends beyond validator count.",
      "A blockchain can have many validators and still depend too heavily on a small number of interfaces, tools, endpoints, repositories, explorers, wallets, or communication channels. That is why operational decentralization matters.",
      "Operational decentralization asks a broader question:",
      "Can the network be understood, accessed, verified, maintained, and improved without depending on one fragile control point?",
      "For Terra Classic, this includes several layers.",
      "It includes validator infrastructure: who runs nodes, where they are hosted, how reliable they are, and whether the network can withstand operator failures.",
      "It includes public endpoints and APIs: whether builders and users have multiple paths to access chain data.",
      "It includes explorers and dashboards: whether users can independently verify transactions, staking, governance, supply data, and network activity.",
      "It includes wallets and user interfaces: whether users have safe, understandable ways to interact with the chain.",
      "It includes documentation and educational surfaces: whether developers, partners, and new users can understand Terra Classic without relying on scattered informal knowledge.",
      "It includes public communication: whether the ecosystem can explain itself clearly to the outside world.",
      "This is why decentralization is not only about \"who signs blocks.\" It is also about whether the chain has enough independent surfaces for access, verification, coordination, and growth.",
      "Terra Classic's opportunity is to keep expanding these surfaces.",
      "The more independent infrastructure, clear documentation, transparent data, credible dashboards, and community-maintained resources exist around the chain, the more usable and resilient Terra Classic becomes.",
      "A decentralized chain should not be a mystery. It should be publicly legible.",
    ],
  },
  {
    id: "verification",
    eyebrow: "07",
    title: "Verification culture",
    paragraphs: [
      "One of the strongest advantages of blockchain infrastructure is that users do not have to rely only on claims.",
      "They can verify.",
      "Terra Classic's decentralization becomes meaningful when users, delegators, builders, and analysts can check the network for themselves. This includes reviewing validator performance, inspecting governance votes, checking staking distribution, following proposal execution, viewing transactions, monitoring supply, and comparing claims against on-chain data.",
      "Verification is the difference between narrative and trust.",
      "A strong decentralized ecosystem does not ask users to believe blindly. It gives them tools to inspect reality. It creates public surfaces where data can be checked, challenged, corrected, and improved.",
      "That is why Terra Classic's future should be built around a verification-first culture.",
      "If a proposal claims impact, the community should be able to review delivery.",
      "If a validator claims responsibility, delegators should be able to inspect behavior.",
      "If a dashboard presents a metric, users should know the definition, source, and time window.",
      "If a project claims adoption, the ecosystem should be able to distinguish real usage from noise.",
      "This is not cynicism. It is maturity.",
      "For Terra Classic, verification culture is a strategic advantage because it transforms decentralization into credibility. It makes the chain easier to evaluate for builders, safer to approach for partners, and clearer for users who want to participate with confidence.",
      "A decentralized network becomes stronger when truth is easy to find.",
    ],
  },
  {
    id: "unique",
    eyebrow: "08",
    title: "Why Terra Classic decentralization is unique",
    paragraphs: [
      "Terra Classic is unusual because its decentralization is not theoretical.",
      "It is lived every day.",
      "The chain continues through distributed validators. Direction is negotiated through governance. Ecosystem information is produced by multiple community participants. Builders launch independently. Users choose validators. Researchers analyze the state of the chain. Community members create tools, websites, dashboards, content, podcasts, documentation, and public resources.",
      "There is no single central operator controlling all of this.",
      "That creates a rare kind of blockchain environment: messy at times, but deeply authentic. Terra Classic is not decentralized only in architecture. It is decentralized in culture, responsibility, and execution.",
      "This is where the cosmic identity of Terra Classic becomes more than visual style.",
      "The network behaves like a constellation. No single star is the entire system. Its strength comes from distributed points of energy, each contributing to the shape and visibility of the whole.",
      "Validators secure the orbit.",
      "Delegators distribute gravity.",
      "Builders create new worlds.",
      "Explorers and dashboards make the system visible.",
      "Community contributors translate complexity into shared understanding.",
      "Users bring the network to life.",
      "That is the Terra Classic decentralization thesis: a chain that lives because many independent actors continue to make it real.",
    ],
  },
  {
    id: "health",
    eyebrow: "09",
    title: "What healthy decentralization looks like",
    paragraphs: [
      "Healthy decentralization is not the absence of structure.",
      "It is the presence of accountable structure without central capture.",
      "For Terra Classic, healthy decentralization should mean a validator set that is reliable, diverse, and actively engaged. It should mean delegators who understand that stake distribution matters. It should mean governance that is readable, evidence-based, and connected to execution. It should mean public infrastructure that is redundant and easy to verify. It should mean documentation that helps developers and partners understand the chain without confusion. It should mean community resources that make Terra Classic more accessible to the next generation of users.",
      "Most importantly, healthy decentralization should mean that responsibility is visible.",
      "A decentralized chain can still have teams. It can still have working groups. It can still have contributors, service providers, public resources, and governance-mandated initiatives. What matters is that authority remains transparent, limited, revocable, and accountable to the network.",
      "That is the mature model.",
      "Decentralization does not require chaos. It requires open coordination.",
      "The future of Terra Classic depends on turning distributed participation into reliable execution - without sacrificing the public, community-governed nature that makes the chain what it is.",
    ],
  },
  {
    id: "participate",
    eyebrow: "10",
    title: "How users can participate",
    paragraphs: [
      "Terra Classic decentralization is not something users only read about. It is something they can participate in.",
      "Users can stake LUNC with validators they trust. They can review validator performance before delegating. They can redelegate when better operators emerge. They can follow governance proposals. They can read vote histories. They can support builders. They can test applications. They can report broken links, outdated documentation, or unclear information. They can create educational material. They can contribute to community tools. They can help make Terra Classic easier to understand.",
      "Participation does not require everyone to be a developer.",
      "Some people secure the chain. Some write code. Some design interfaces. Some analyze data. Some explain governance. Some build apps. Some translate. Some onboard new users. Some simply delegate responsibly and stay informed.",
      "In a decentralized ecosystem, all of those roles matter.",
      "The key is to move from passive holding to active stewardship.",
      "A stronger Terra Classic does not come from one actor solving everything. It comes from many participants improving the network surface around them: one validator choice, one proposal review, one documentation fix, one dashboard, one integration, one product, one article, one user experience at a time.",
      "That is how decentralized systems compound.",
    ],
  },
  {
    id: "perspective",
    eyebrow: "11",
    title: "Final perspective",
    paragraphs: [
      "Terra Classic decentralization is not a decorative claim. It is the core operating logic of the network.",
      "No single company owns the chain's future. No single validator defines its destiny. No single community voice speaks for everyone. Terra Classic exists through distributed consensus, public governance, open participation, and verifiable infrastructure.",
      "That makes the network harder to control - and, when properly coordinated, harder to stop.",
      "The challenge is not to replace decentralization with central command. The challenge is to make decentralization more legible, more professional, more accountable, and more useful.",
      "That is the next frontier.",
      "Terra Classic already has the foundation of a public, community-governed blockchain. The opportunity now is to turn that foundation into a clearer, stronger, more trusted ecosystem for users, builders, validators, partners, and future contributors.",
      "Blockchain so decentralized, it's out of this world.",
    ],
  },
];

export const decentralizationTabs = [
  {
    id: "network",
    label: "Network view",
    title: "Decentralization is an operating model, not a slogan.",
    visualPrompt: "validator-set decentralization map",
    body:
      "Use this panel for the network-level explanation: validators produce and sign blocks, full nodes verify state, and public infrastructure lets users inspect activity without depending on one company.",
  },
  {
    id: "community",
    label: "Community view",
    title: "The social layer decides what gets maintained.",
    visualPrompt: "community governance coordination map",
    body:
      "Use this panel for the community-level explanation: proposals, public debate, pull requests, validators, builders, delegators, and independent contributors all shape execution.",
  },
] as const;

export const decentralizationReferences: ArticleReference[] = [
  {
    title: "About the Terra Protocol",
    source: "Terra Classic Docs",
    href: "https://classic-docs.terra.money/docs/learn/protocol.html",
  },
  {
    title: "Staking module specification",
    source: "Terra Classic Docs",
    href: "https://classic-docs.terra.money/docs/develop/module-specifications/spec-staking.html",
  },
  {
    title: "Cosmos SDK application architecture",
    source: "Cosmos SDK Docs",
    href: "https://docs.cosmos.network/sdk/latest/learn/intro/sdk-app-architecture",
  },
  {
    title: "Terra Classic core repository",
    source: "classic-terra GitHub",
    href: "https://github.com/classic-terra/core",
  },
];

export const decentralizationResourceGroups = [
  {
    title: "Validator visibility",
    description: "Directories and validator channels from the existing Terra Classic link base.",
    entries: entriesByCategory.validators ?? [],
  },
  {
    title: "Network inspection",
    description: "Explorers, analytics, finders, and public tools copied from the Framer source.",
    entries: (entriesByCategory.tools ?? []).slice(0, 8),
  },
  {
    title: "Developer infrastructure",
    description: "Documentation, repositories, endpoints, and snapshots for deeper verification.",
    entries: (entriesByCategory.developers ?? []).slice(0, 8),
  },
];
