import { links } from "./links";

export const sections = [
  { id: "ecosystem", label: "Ecosystem", href: links.ecosystem },
  { id: "decentralization", label: "Decentralization", href: links.decentralization },
  { id: "roadmap", label: "Roadmap", href: links.roadmap },
  { id: "metrics", label: "Markets", href: links.markets },
  { id: "about", label: "About terra-classic.money", href: links.about },
] as const;

export const externalNav = [
  { label: "Layer 2", href: links.layer2 },
  { label: "Documentation", href: links.docs },
];

export const languageOptions = ["EN", "PL", "EN", "PL", "EN", "PL", "PL", "EN"];

export const sidebarDisclaimer =
  "Terra-Classic.money is not the official website of Terra Classic. Just as no one owns the technology behind email, no one owns the Terra Classic blockchain. Accordingly, no single entity can speak with authority on behalf of Terra Classic.\n\nThis website is provided for informational purposes only and does not constitute investment advice, a solicitation, or an offer to buy or sell any securities, tokens, or other financial instruments. The content presented is intended to offer insight into the Terra Classic blockchain and its native assets (LUNC and USTC), and should not be interpreted as legal or financial guidance. Visitors are strongly encouraged to conduct their own independent research, and to consult with qualified legal and financial professionals before making any investment decisions. The authors, contributors, and affiliated entities expressly disclaim all liability for any actions taken based on the content of this website.";

export const heroGroups = [
  {
    title: "Users:",
    logo: "hero-users-logos.svg",
    logoWidth: 75,
    links: ["Understand Terra Classic", "Find wallet", "Stake your LUNC"],
  },
  {
    title: "Developers:",
    logo: "hero-developers-logos.svg",
    logoWidth: 89,
    links: ["Quick start guide", "Check complete documentation"],
  },
  {
    title: "Institutions:",
    logo: "hero-institution-logo.svg",
    logoWidth: 32,
    links: ["Utilise multi-currency suite (20+ assets)", "Build payment gateway"],
  },
];

export const popularTopics = ["How to stake LUNC", "Terra Classic ecosystem", "Terra Classic Roadmap"];

export const capabilities = [
  {
    slug: "staking",
    title: "Passive income",
    body: "Stake LUNC and participate in on-chain opportunities designed to help you put idle assets to work—directly from your wallet.",
    cta: "More about Staking Protocol",
    image: "capability-staking-figma.png",
  },
  {
    slug: "forex",
    title: "Trade various stablecoins just like on Forex",
    body: "Swap and route between multiple stablecoin markets with transparent on-chain execution and real-time price discovery.",
    cta: "More about Forex Protocol",
    image: "capability-forex-figma.png",
  },
  {
    slug: "defi",
    title: "Use financial products",
    body: "Access DeFi primitives—swaps, liquidity, and yield strategies—without giving up custody or control.",
    cta: "Explore DeFi on Terra Classic",
    image: "capability-defi-figma.png",
  },
  {
    slug: "build",
    title: "Build",
    body: "Launch anything from a simple contract to a full product stack on an open, composable Layer-2 and 1 built for iteration.",
    cta: "Terra Classic documentation",
    image: "capability-build-figma.png",
  },
  {
    slug: "ecosystem",
    title: "Check multiple applications",
    body: "Discover a growing ecosystem of apps across DeFi, tools, and community utilities—ready to use in minutes.",
    cta: "Explore ecosystem",
    image: "capability-ecosystem-figma.png",
  },
  {
    slug: "layer2",
    title: "The network of networks",
    body: "Explore Terra Classic’s Layer-2 universe—independent projects with their own tokens and ecosystems, expanding what the chain can do through specialized apps and tooling.",
    cta: "Explore Layer-2 projects",
    image: "capability-layer2-figma.png",
  },
  {
    slug: "nft",
    title: "Buy, sell, trade and create assets and collectibles",
    body: "Create and exchange tokens and digital collectibles with on-chain ownership and verifiable provenance.",
    cta: "NFTs on Terra classic",
    image: "capability-nft-figma.png",
  },
];

export const protocols = [
  {
    id: "staking",
    title: "Staking Protocol",
    status: "ACTIVE",
    body: "Secure the network and earn protocol rewards by delegating LUNC to validators—non-custodial, transparent, and designed for long-term participation.",
    icon: "protocol-staking-icon.svg",
    image: "protocol-staking-figma.png",
    ui: ["protocol-validator-ui-figma.png", "protocol-staking-ui-figma.png"],
    buttons: ["Find a wallet and stake", "Staking rewards calculator", "Staking Protocol docs"],
    accent: "yellow",
    steps: [
      "Choose a compatible wallet, acquire LUNC, and use staking interface within the wallet.",
      "Select a validator and delegate your LUNC to help decentralize and protect the chain.",
      "Track rewards, claim or re-delegate, and adjust your validator set as your strategy evolves.",
    ],
  },
  {
    id: "swap",
    title: "Swap Protocol",
    status: "COMMING SOON",
    body: "Exchange LUNC and USTC through Market Module 2.0—a no-mint, oracle-aware swap layer designed to restore native utility with live pricing, protocol liquidity, and hard safety brakes.",
    icon: "protocol-swap-icon.svg",
    image: "protocol-swap-figma.png",
    ui: ["protocol-swap-ui-figma.png"],
    buttons: ["Swap Protocol docs"],
    accent: "blue",
    steps: [
      "Connect your wallet and choose the asset pair you want to swap between LUNC and USTC.",
      "Swap through Market Module 2.0, where pricing is guided by live oracle data and protocol-level safeguards.",
      "Confirm the transaction on-chain, with fees and remaining liquidity designed to support a safer, deflation-aligned system.",
    ],
  },
  {
    id: "forex",
    title: "Forex Protocol",
    status: "COMMING SOON",
    body: "Create and exchange collateral-backed, fiat-pegged stable assets on-chain—so multi-currency swaps feel as fluid as FX, while remaining transparent, governed, and liquidity-driven.",
    icon: "protocol-forex-icon.svg",
    image: "protocol-forex-figma.png",
    ui: ["protocol-deposit-ui-figma.png", "protocol-mint-ui-figma.png"],
    buttons: ["Forex Protocol docs"],
    accent: "blue",
    steps: [
      "Connect your wallet and open the Forex Protocol interface to view supported currencies and live pricing inputs.",
      "Mint a selected fiat-pegged stablecoin by depositing approved collateral into a vault—designed for clear backing and controlled issuance.",
      "Swap between currency pairs through DEX liquidity pools (and redeem back to collateral when needed), with fees and safeguards engineered to keep the system resilient.",
    ],
  },
];

export const assets = [
  { code: "EUTC", name: "Terra Classic Euro", phase: 1, icon: "native-token-eutc.png" },
  { code: "HKTC", name: "Terra Classic Hong Kong Dollar", phase: 2, icon: "native-token-hktc.png" },
  { code: "NOTC", name: "Terra Classic Norwegian Krone", phase: 2, icon: "native-token-notc.png" },
  { code: "PHTC", name: "Terra Classic Philippine Peso", phase: 2, icon: "native-token-phtc.png" },
  { code: "AUTC", name: "Terra Classic Australian Dollar", phase: 3, icon: "native-token-autc.png" },
  { code: "CATC", name: "Terra Classic Canadian Dollar", phase: 3, icon: "native-token-catc.png" },
  { code: "CHTC", name: "Terra Classic Swiss Franc", phase: 3, icon: "native-token-chtc.png" },
  { code: "CNTC", name: "Terra Classic Chinese Yuan Renminbi", phase: 3, icon: "native-token-cntc.png" },
  { code: "DKTC", name: "Terra Classic Danish Krone", phase: 3, icon: "native-token-dktc.png" },
  { code: "GBTC", name: "Terra Classic British Pound Sterling", phase: 3, icon: "native-token-gbtc.png" },
  { code: "INTC", name: "Terra Classic Indian Rupee", phase: 3, icon: "native-token-intc.png" },
  { code: "IDTC", name: "Terra Classic Indonesian Rupiah", phase: 3, icon: "native-token-idtc.png" },
  { code: "JPTC", name: "Terra Classic Japanese Yen", phase: 3, icon: "native-token-jptc.png" },
  { code: "KRTC", name: "Terra Classic South Korean Won", phase: 3, icon: "native-token-hktc.png" },
  { code: "MNTC", name: "Terra Classic Mongolian Tögrög", phase: 3, icon: "native-token-mntc.png" },
  { code: "MYTC", name: "Terra Classic Malaysian Ringgit", phase: 3, icon: "native-token-mytc.png", compactIcon: true },
  { code: "SDTC", name: "Terra Classic Special Drawing Rights", phase: 3, icon: "native-token-sdtc.png" },
  { code: "SETC", name: "Terra Classic Swedish Krona", phase: 3, icon: "native-token-setc.png" },
  { code: "SGTC", name: "Terra Classic Singapore Dollar", phase: 3, icon: "native-token-sgtc.png" },
  { code: "THTC", name: "Terra Classic Thai Baht", phase: 3, icon: "native-token-thtc.png" },
  { code: "TWTC", name: "Terra Classic New Taiwan Dollar", phase: 3, icon: "native-token-twtc.png", compactIcon: true },
  { code: "USTC", name: "Terra Classic US Dollar", phase: 4, icon: "native-ustc-icon.svg", compactIcon: true },
];

export const strengths = [
  ["Decentralization", "Governance-led upgrades and validator-driven security keep Terra Classic open, censorship-resistant, and accountable to its community—not a single operator."],
  ["6s block time", "Fast finality in ~6 seconds makes on-chain actions feel instant—built for responsive apps, trading, and payments."],
  ["Deflationary ecosystem", "With burn mechanics at the protocol and ecosystem level, Terra Classic is designed to steadily reduce LUNC and USTC supply over time—aligning network usage with long-term scarcity."],
  ["Superior uptime & reliability", "An active token economy and incentive layers power liquidity, participation, and continuous network evolution across projects."],
  ["Low cost of development", "Ship faster with minimal overhead—deploy smart contracts without deployment fees and keep experimentation frictionless."],
  ["Unmatched community", "A globally distributed community that builds, governs, and funds progress—turning ideas into shipping work through coordinated action."],
  ["Interconnectivity", "Plug into a broader multi-chain universe via IBC and bridges—so assets, users, and liquidity can move where they’re needed."],
  ["Revival narrative", "A future-focused mission unites builders and stakeholders around long-term restoration, iteration, and compounding momentum."],
];

export const stats = [
  ["100+", "Validators on Terra classic"],
  ["125K+", "Active on-chain wallets in last year"],
  ["9.3B+", "On-chain transactions volume in last year"],
];

export const founders = [
  ["Nicolas Boulay", "Nicolas Boulay"],
  ["Puya & Till", "Juris Protocol - Lending & Borrowing"],
  ["Pedro B.", "Selenium Finance - Synthetics protocol"],
];

export const faqGroups: Array<[string, string[]]> = [
  ["Getting started", ["What is Terra Classic?", "Who controls Terra Classic?", "How do I start using Terra Classic?", "What are transaction fees like?", "Where can I track network activity and stats?"]],
  ["Tokens and native assets", ["What is LUNC used for?", "What is USTC? Is it a stablecoin?", "What makes Terra Classic’s asset layer unique?", "Are those stablecoins live today?"]],
  ["Staking and rewards", ["How does staking work on Terra Classic?", "What is the unbonding period?", "What are the risks of staking?", "How do I choose a validator?", "Can I move my stake without unbonding?"]],
  ["Governance and community", ["How does Terra Classic governance work?", "Why does governance matter for investors and institutions?", "What is the Community Pool / treasury used for?", "How can I participate if I’m not technical?"]],
  ["Burns and deflation mechanics", ["What is the burn tax?", "Does burning guarantee price increases?", "How can I verify burns"]],
  ["Ecosystem and use cases", ["What can I do on Terra Classic today?", "What are “Layer-2 projects” on Terra Classic?", "Is Terra Classic interoperable with other chains?"]],
  ["Builders and developers", ["What technology stack does Terra Classic use?", "Can I deploy smart contracts on Terra Classic?", "What languages and tools should developers use?", "How do I get my app listed or featured?", "Are grants or funding available?"]],
  ["Institutions and public-sector partners", ["Why would an institution consider Terra Classic?", "How can we integrate Terra Classic for payments or settlement?", "We want to introduce a new fiat-pegged stablecoin on Terra Classic—how does that work?", "Is Terra Classic “compliant”?"]],
  ["Security, reliability, and risk", ["How secure is Terra Classic?", "What are the biggest risks users should understand?", "How are upgrades handled?", "Where do I report a bug or security issue?"]],
  ["Practical reminders", ["Is this website financial advice?", "What’s the best way to stay up to date?"]],
];
