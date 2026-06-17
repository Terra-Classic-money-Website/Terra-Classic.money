import { links } from "./links";

export const sections = [
  { id: "ecosystem", label: "Ecosystem", href: links.ecosystem },
  { id: "metrics", label: "Markets", href: links.markets },
  { id: "roadmap", label: "Roadmap", href: links.roadmap },
  { id: "decentralization", label: "Decentralization", href: links.decentralization },
  { id: "open-work", label: "Open work", href: links.openWork },
  { id: "about", label: "About terra-classic.money", href: links.about },
] as const;

export const externalNav = [
  { label: "Documentation", href: links.docs },
  { label: "Layer 2", href: links.layer2, disabled: true },
  { label: "Merch", href: links.merch, disabled: true },
];

export const languageOptions = ["EN", "TR", "ID", "ES", "FR", "HI", "TH", "PT-BR", "ZH-CN", "DE", "PL", "AR"];

export const sidebarDisclaimer =
  "Terra-Classic.money is not the official website of Terra Classic. Just as no one owns the technology behind email, no one owns the Terra Classic blockchain. Accordingly, no single entity can speak with authority on behalf of Terra Classic.\n\nThis website is provided for informational purposes only and does not constitute investment advice, a solicitation, or an offer to buy or sell any securities, tokens, or other financial instruments. The content presented is intended to offer insight into the Terra Classic blockchain and its native assets (LUNC and USTC), and should not be interpreted as legal or financial guidance. Visitors are strongly encouraged to conduct their own independent research, and to consult with qualified legal and financial professionals before making any investment decisions. The authors, contributors, and affiliated entities expressly disclaim all liability for any actions taken based on the content of this website.";

export const heroGroups = [
  {
    title: "Users:",
    logo: "hero-users-logos.svg",
    logoWidth: 75,
    logoHeight: 32,
    links: ["Understand Terra Classic", "Find wallet", "Stake your LUNC"],
  },
  {
    title: "Developers:",
    logo: "hero-developers-logos.svg",
    logoWidth: 89,
    logoHeight: 31,
    links: ["Quick start guide", "Check complete documentation"],
  },
  {
    title: "Institutions:",
    logo: "hero-institution-logo.svg",
    logoWidth: 32,
    logoHeight: 32,
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
    image: "capability-staking-figma.webp",
  },
  {
    slug: "forex",
    title: "Trade various stablecoins just like on Forex",
    body: "Swap and route between multiple stablecoin markets with transparent on-chain execution and real-time price discovery.",
    cta: "More about Forex Protocol",
    image: "capability-forex-figma.webp",
  },
  {
    slug: "defi",
    title: "Use financial products",
    body: "Access DeFi primitives—swaps, liquidity, and yield strategies—without giving up custody or control.",
    cta: "Explore DeFi on Terra Classic",
    image: "capability-defi-figma.webp",
  },
  {
    slug: "build",
    title: "Build",
    body: "Launch anything from a simple contract to a full product stack on an open, composable Layer-2 and 1 built for iteration.",
    cta: "Terra Classic documentation",
    image: "capability-build-figma.webp",
  },
  {
    slug: "ecosystem",
    title: "Check multiple applications",
    body: "Discover a growing ecosystem of apps across DeFi, tools, and community utilities—ready to use in minutes.",
    cta: "Explore ecosystem",
    image: "capability-ecosystem-figma.webp",
  },
  {
    slug: "layer2",
    title: "The network of networks",
    body: "Explore Terra Classic’s Layer-2 universe—independent projects with their own tokens and ecosystems, expanding what the chain can do through specialized apps and tooling.",
    cta: "Explore Layer-2 projects",
    image: "capability-layer2-figma.webp",
  },
  {
    slug: "nft",
    title: "Buy, sell, trade and create assets and collectibles",
    body: "Create and exchange tokens and digital collectibles with on-chain ownership and verifiable provenance.",
    cta: "NFTs on Terra classic",
    image: "capability-nft-figma.webp",
  },
];

export const protocols = [
  {
    id: "staking",
    title: "Staking Protocol",
    status: "ACTIVE",
    body: "Secure the network and earn protocol rewards by delegating LUNC to validators—non-custodial, transparent, and designed for long-term participation.",
    icon: "protocol-staking-icon.svg",
    image: "protocol-staking-figma.webp",
    ui: ["protocol-validator-ui-figma.png", "protocol-staking-ui-figma.png"],
    buttons: ["Find a wallet and stake", "Staking Protocol docs"],
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
    status: "COMING SOON",
    body: "Exchange LUNC and USTC through Market Module 2.0—a no-mint, oracle-aware swap layer designed to restore native utility with live pricing, protocol liquidity, and hard safety brakes.",
    icon: "protocol-swap-icon.svg",
    image: "protocol-swap-figma.webp",
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
    status: "COMING SOON",
    body: "Create and exchange collateral-backed, fiat-pegged stable assets on-chain—so multi-currency swaps feel as fluid as FX, while remaining transparent, governed, and liquidity-driven.",
    icon: "protocol-forex-icon.svg",
    image: "protocol-forex-figma.webp",
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

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqGroup = {
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "Getting started",
    items: [
      {
        question: "What is Terra Classic?",
        answer: "Terra Classic is a community-governed Layer-1 blockchain powered by LUNC. Validators produce blocks, delegators help secure the network through staking, and governance directs how the protocol evolves over time.",
      },
      {
        question: "Who controls Terra Classic?",
        answer: "No single company, foundation, or individual controls Terra Classic. It is governed through on-chain proposals, validator voting, delegator participation, and community-led development.",
      },
      {
        question: "How do I start using Terra Classic?",
        answer: "Start by choosing a compatible wallet, funding it with LUNC or another supported asset, and exploring staking, governance, transfers, and ecosystem applications. For larger balances, use strong wallet hygiene and consider hardware-wallet flows where available.",
      },
      {
        question: "What are transaction fees like?",
        answer: "Terra Classic transactions use gas fees, and many transfers may also interact with the chain’s tax/burn logic depending on current governance parameters. Always check the fee shown in your wallet before confirming a transaction.",
      },
      {
        question: "Where can I track network activity and stats?",
        answer: "You can track Terra Classic through block explorers, dashboards, governance tools, staking interfaces, and public network endpoints. For builders and operators, Terra Classic also exposes RPC, LCD, FCD, and gRPC endpoints for development and light workloads.",
      },
    ],
  },
  {
    title: "Tokens and native assets",
    items: [
      {
        question: "What is LUNC used for?",
        answer: "LUNC is Terra Classic’s native staking and governance asset. It is used to pay fees, secure the chain through delegation, participate in governance, and coordinate economic activity across the network.",
      },
      {
        question: "What is USTC? Is it a stablecoin?",
        answer: "USTC is a native Terra Classic asset with historical stablecoin origins, but today it should be treated as a freely traded crypto asset, not as a guaranteed $1 redeemable stablecoin. Any future stable-asset design should be evaluated by its collateral model, liquidity, governance approval, and live market behavior.",
      },
      {
        question: "What makes Terra Classic’s asset layer unique?",
        answer: "Terra Classic combines LUNC as a native speculative, staking, and governance asset with a broader multi-currency asset vision. Its roadmap includes fiat-pegged stable assets designed to expand settlement, FX-like utility, and on-chain liquidity over time.",
      },
      {
        question: "Are those stablecoins live today?",
        answer: "Not all proposed Terra Classic stable assets are live as fully collateralized, production-ready assets today. The rollout is phased, with collateralization, liquidity, governance, and technical safeguards expected to mature step by step.",
      },
    ],
  },
  {
    title: "Staking and rewards",
    items: [
      {
        question: "How does staking work on Terra Classic?",
        answer: "You delegate LUNC to a validator, which helps secure the network and participate in consensus. Validators take a commission on rewards, while delegators receive the remaining rewards proportional to their delegated stake.",
      },
      {
        question: "What is the unbonding period?",
        answer: "When you undelegate staked LUNC, it enters an unbonding period of 21 days and does not earn rewards during that time.",
      },
      {
        question: "What are the risks of staking?",
        answer: "Main staking risks include validator downtime, slashing, poor validator performance, governance inactivity, commission changes, and market volatility. Your LUNC remains yours when delegated, but validator behavior can still affect rewards and risk exposure.",
      },
      {
        question: "How do I choose a validator?",
        answer: "Look for validators with strong uptime, transparent communication, reasonable commission, active governance participation, and clear infrastructure practices. Diversifying across multiple reliable validators can reduce concentration risk.",
      },
      {
        question: "Can I move my stake without unbonding?",
        answer: "Yes, redelegation lets you move bonded LUNC from one validator to another without waiting through the full unbonding period, subject to chain rules and cooldown limits.",
      },
    ],
  },
  {
    title: "Governance and community",
    items: [
      {
        question: "How does Terra Classic governance work?",
        answer: "Community members submit proposals, deposits bring proposals into voting, and validators and delegators vote on-chain. Passed proposals can update parameters, fund initiatives, trigger upgrades, or guide ecosystem direction.",
      },
      {
        question: "Why does governance matter for investors and institutions?",
        answer: "Governance determines the rules that shape fees, upgrades, treasury spending, validator incentives, and ecosystem priorities. For investors and institutions, governance quality is a signal of whether Terra Classic can coordinate, execute, and manage risk credibly.",
      },
      {
        question: "What is the Community Pool / treasury used for?",
        answer: "The Community Pool can fund protocol work, infrastructure, ecosystem tooling, public goods, audits, documentation, and growth initiatives—when proposals pass through governance. Strong proposals should define scope, budget, milestones, owners, and proof of delivery.",
      },
      {
        question: "How can I participate if I’m not technical?",
        answer: "You can stake, vote, choose responsible validators, review proposals, join community discussions, report broken information, support builders, and help educate new users. Delegators can also override their validator’s governance vote if they want to vote directly.",
      },
    ],
  },
  {
    title: "Burns and deflation mechanics",
    items: [
      {
        question: "What is the burn tax?",
        answer: "The burn tax is an on-chain mechanism that can route part of eligible transaction activity toward reducing supply. Its rate, scope, exemptions, and implementation details are controlled by governance and should always be checked against current chain parameters.",
      },
      {
        question: "Does burning guarantee price increases?",
        answer: "No. Burns can reduce supply, but price depends on demand, liquidity, utility, market structure, and broader conditions. Burns are strongest when paired with real usage, sustainable volume, and product adoption.",
      },
      {
        question: "How can I verify burns?",
        answer: "Burns can be verified on-chain through explorers, burn addresses, tax module data, and community dashboards. For serious analysis, always use source data rather than screenshots or social claims.",
      },
    ],
  },
  {
    title: "Ecosystem and use cases",
    items: [
      {
        question: "What can I do on Terra Classic today?",
        answer: "You can send assets, stake LUNC, vote in governance, interact with wallets, explore DEX liquidity, use ecosystem applications, and build smart-contract products. The network also supports public endpoints and developer tooling for teams building on top of it.",
      },
      {
        question: "What are “Layer-2 projects” on Terra Classic?",
        answer: "Layer-2 projects are independent ecosystem projects built around Terra Classic that may have their own tokens, tools, applications, and communities. They expand what users can do beyond the base chain while still drawing value from Terra Classic’s network and brand gravity.",
      },
      {
        question: "Is Terra Classic interoperable with other chains?",
        answer: "Yes. Terra Classic supports interchain connectivity through IBC-related modules and cross-chain infrastructure, allowing assets and applications to connect across the broader Cosmos ecosystem where channels and relayers are active.",
      },
    ],
  },
  {
    title: "Builders and developers",
    items: [
      {
        question: "What technology stack does Terra Classic use?",
        answer: "Terra Classic uses Cosmos-SDK-style infrastructure, Tendermint/CometBFT-style consensus, CosmWasm smart contracts, IBC modules, and developer-facing RPC/LCD/gRPC endpoints. Builders can also use TypeScript tooling such as CosmES for app development.",
      },
      {
        question: "Can I deploy smart contracts on Terra Classic?",
        answer: "Yes. Terra Classic supports WebAssembly smart contracts powered by CosmWasm, including contract upload, instantiation, execution, querying, and migration patterns.",
      },
      {
        question: "What languages and tools should developers use?",
        answer: "Smart contracts are typically written in Rust because it has the most mature CosmWasm tooling. Front-end and app integrations can use TypeScript tooling, CosmES, wallet controllers, RPC/LCD endpoints, and localnet workflows for testing.",
      },
      {
        question: "How do I get my app listed or featured?",
        answer: "Prepare a clear project profile with links, contracts, documentation, category, security notes, and live status, then submit it through the relevant ecosystem or website-maintainer channel. Projects with working products, transparent ownership, and verifiable on-chain activity should be prioritized.",
      },
      {
        question: "Are grants or funding available?",
        answer: "Funding can be requested through Terra Classic governance or community-led initiatives, but it is not automatic. Strong funding requests should include milestones, budget, delivery owners, proof of work, maintenance plans, and measurable ecosystem impact.",
      },
    ],
  },
  {
    title: "Institutions and public-sector partners",
    items: [
      {
        question: "Why would an institution consider Terra Classic?",
        answer: "Terra Classic offers public settlement, community governance, global accessibility, low-friction blockchain infrastructure, and a native asset ecosystem with potential for payments, staking, DeFi, and multi-currency settlement experiments.",
      },
      {
        question: "How can we integrate Terra Classic for payments or settlement?",
        answer: "A typical integration starts with wallet/custody setup, compliance review, RPC/LCD or node access, transaction monitoring, accounting flows, and a limited pilot. For production workloads, institutions should avoid relying only on public endpoints and should use dedicated infrastructure or run their own nodes.",
      },
      {
        question: "We want to introduce a new fiat-pegged stablecoin on Terra Classic—how does that work?",
        answer: "Start with a clear asset proposal: target currency, issuer/collateral model, mint/redeem logic, liquidity plan, oracle assumptions, risk controls, legal/compliance perimeter, and governance path. From there, the community can evaluate whether the asset is technically safe, economically useful, and aligned with Terra Classic’s long-term direction.",
      },
      {
        question: "Is Terra Classic “compliant”?",
        answer: "Terra Classic is a public, permissionless blockchain; compliance usually sits at the application, issuer, exchange, custody, and institutional-integration layer. Any regulated use case should be reviewed with qualified legal and compliance professionals before launch.",
      },
    ],
  },
  {
    title: "Security, reliability, and risk",
    items: [
      {
        question: "How secure is Terra Classic?",
        answer: "Terra Classic is secured by delegated proof-of-stake validators, staking incentives, governance-controlled upgrades, and slashing rules for validator misbehavior. Like every public blockchain, it also depends on responsible validators, secure infrastructure, audited apps, careful key management, and honest risk disclosure.",
      },
      {
        question: "What are the biggest risks users should understand?",
        answer: "Key risks include market volatility, smart-contract bugs, validator slashing, bridge risk, governance changes, phishing, fake websites, poor wallet hygiene, and low-liquidity markets. Always verify links, contracts, proposals, and wallet prompts before signing.",
      },
      {
        question: "How are upgrades handled?",
        answer: "Terra Classic uses governance and coordinated validator execution to update protocol software and modules. Upgrade quality depends not only on code, but also on testing, validator readiness, communication, and post-upgrade monitoring.",
      },
      {
        question: "Where do I report a bug or security issue?",
        answer: "For documentation issues, open a GitHub issue or submit a pull request. For code, infrastructure, or security-sensitive issues, use the relevant project repository or maintainer channel and avoid posting exploitable details publicly before maintainers can respond.",
      },
    ],
  },
  {
    title: "Practical reminders",
    items: [
      {
        question: "Is this website financial advice?",
        answer: "No. This website is for education, onboarding, and ecosystem navigation only. It does not provide financial, investment, legal, tax, or compliance advice.",
      },
      {
        question: "What’s the best way to stay up to date?",
        answer: "Follow Terra Classic governance, validator communications, developer repositories, ecosystem channels, documentation updates, and trusted analytics dashboards. The most reliable signal is not hype—it is shipped work, verifiable data, and transparent execution.",
      },
    ],
  },
];
