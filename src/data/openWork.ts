export type OpenWorkPackage = {
  id: string;
  title: string;
  summary: string;
  detailSummary: string;
  category: string;
  status: string;
  effort: string;
  quoteType: string;
  idealFor: string[];
  deliverables: string[];
  acceptanceCriteria: string[];
  quoteRequirements: string[];
};

export type ClosedWorkPackage = {
  id: string;
  title: string;
  summary: string;
  category: string;
  completed: string;
  delivered: string;
};

export const openWorkPackages: OpenWorkPackage[] = [
  {
    id: "forex-protocol-implementation",
    title: "Forex Protocol implementation",
    summary: "Build the first production version of Terra Classic's collateral-backed Forex Protocol, starting with EUTC minting, redemption, collateral vaults, oracle inputs, DEX liquidity flows, and safety controls.",
    detailSummary: "Build the production-ready implementation plan and first deployable version of Terra Classic's Forex Protocol: a collateral-backed stable-asset system designed to bring transparent, on-chain fiat-pegged currencies to Terra Classic, starting with EUTC.",
    category: "Stablecoins",
    status: "OPEN FOR PROPOSALS",
    effort: "Large",
    quoteType: "Discovery + milestone quote required",
    idealFor: ["Cosmos SDK / CosmWasm development teams", "DeFi protocol engineers", "Oracle, vault, and risk-system specialists"],
    deliverables: [
      "Technical architecture for the Forex Protocol MVP, including minting, redemption, vault accounting, oracle pricing, fee handling, and DEX liquidity interaction.",
      "Implementation plan for EUTC as the first supported fiat-pegged asset, including collateral handling for approved stablecoin inputs.",
      "Smart contract or module-level implementation proposal with clear deployment path, testnet plan, and governance dependencies.",
      "Public developer documentation explaining system logic, user flows, contract/module interfaces, risk assumptions, and operational controls.",
    ],
    acceptanceCriteria: [
      "The system design clearly separates collateral, user balances, protocol fees, reserves, and any LUNC buyback or vault logic.",
      "All minting, redemption, fee, oracle, and DEX-routing assumptions are documented with source-backed parameters and testable scenarios.",
      "The MVP includes circuit breakers, rate limits, emergency procedures, and governance-controlled configuration where required.",
      "No mainnet deployment is proposed without testnet validation, security review, reproducible deployment instructions, and public technical documentation.",
    ],
    quoteRequirements: [
      "A discovery phase that validates the existing proposal, identifies technical gaps, and defines the safest MVP scope.",
      "A milestone-based delivery plan covering architecture, implementation, testing, documentation, review, and deployment support.",
      "Relevant DeFi, Cosmos SDK, CosmWasm, oracle, or stablecoin-system experience.",
      "A clear statement on whether the team is quoting only development work, or also audit coordination, testnet operations, and post-launch maintenance.",
    ],
  },
  {
    id: "ledger-ledger-live-integration",
    title: "Ledger and Ledger Live integration",
    summary: "Upgrade Terra Classic hardware-wallet access from partial Ledger support into a safer, clearer, and more complete user experience, with a practical path toward Ledger Wallet / Ledger Live readiness.",
    detailSummary: "Create a complete Ledger integration path for Terra Classic: from current hardware-wallet compatibility review to improved signing flows, user documentation, and a realistic submission package for deeper Ledger Wallet / Ledger Live support.",
    category: "Wallet infrastructure",
    status: "OPEN FOR PROPOSALS",
    effort: "Large",
    quoteType: "Milestone quote recommended",
    idealFor: ["Hardware-wallet integration engineers", "Cosmos wallet developers", "Security-focused frontend and signing-flow teams"],
    deliverables: [
      "Audit of the current Terra Classic Ledger experience, including supported wallets, derivation paths, transaction types, known limitations, and user-risk points.",
      "Implementation plan for a complete Ledger-safe Terra Classic flow covering send, receive, staking, delegation, redelegation, reward claiming, and governance signing where technically feasible.",
      "Ledger Wallet / Ledger Live readiness package, including technical requirements, required repositories, node/indexer needs, transaction serialization, signing test vectors, and support documentation.",
      "User-facing onboarding guide for Ledger users that avoids seed phrase, private key, custody, or investment-advice ambiguity.",
    ],
    acceptanceCriteria: [
      "Users are never asked to expose private keys, seed phrases, or recovery words in any Terra Classic Ledger flow.",
      "All supported transaction types are tested on hardware and documented with expected device prompts and failure cases.",
      "The work includes clear compatibility notes for desktop, browser extension, and wallet-interface environments.",
      "The final package is suitable for review by Ledger, wallet maintainers, Terra Classic validators, and security-conscious users.",
    ],
    quoteRequirements: [
      "A current-state audit of existing Ledger support before implementation begins.",
      "A proposed integration path: short-term compatibility improvements, medium-term wallet UX improvements, and long-term Ledger Wallet / Ledger Live submission path.",
      "Examples of previous Ledger, Cosmos, wallet, signing, or hardware-device integration work.",
      "A maintenance plan for future Terra Classic upgrades that may affect transaction signing or wallet compatibility.",
    ],
  },
  {
    id: "trezor-integration-feasibility",
    title: "Trezor integration feasibility and implementation path",
    summary: "Research and define the most realistic path for Terra Classic support in the Trezor ecosystem, including firmware, Trezor Connect, third-party wallet options, and Trezor Suite constraints.",
    detailSummary: "Determine the most realistic path for Terra Classic to become usable with Trezor hardware wallets, then prepare the technical plan, issue package, and implementation requirements needed to move from unsupported asset to credible integration candidate.",
    category: "Hardware wallet R&D",
    status: "OPEN FOR PROPOSALS",
    effort: "Large",
    quoteType: "Feasibility-first quote required",
    idealFor: ["Hardware-wallet protocol engineers", "Trezor firmware / Trezor Connect specialists", "Cosmos signing and wallet-infrastructure developers"],
    deliverables: [
      "Feasibility report covering native Trezor Suite support, Trezor firmware requirements, Trezor Connect support, and third-party wallet integration options.",
      "Technical gap analysis for Terra Classic transaction signing, address derivation, chain metadata, protobuf handling, staking messages, governance messages, and wallet UX.",
      "Public issue / proposal package prepared for the relevant Trezor repositories or support channels, including technical rationale and implementation scope.",
      "If feasible, a staged implementation plan for proof-of-concept signing, third-party wallet support, testing, documentation, and upstream submission.",
    ],
    acceptanceCriteria: [
      "The first milestone must clearly state whether Terra Classic support is technically feasible under current Trezor constraints.",
      "The deliverable must distinguish between native Trezor Suite support, firmware-level support, and support through a third-party wallet interface.",
      "No public claim of \"Trezor support\" may be made unless signing, address display, transaction confirmation, and recovery-safety assumptions are verified.",
      "All user-facing guidance must clearly explain risks, limitations, unsupported flows, and the difference between hardware signing and wallet-interface support.",
    ],
    quoteRequirements: [
      "A dedicated feasibility phase before any build commitment.",
      "Experience with Trezor firmware, Trezor Connect, protobuf definitions, hardware signing, or comparable wallet integrations.",
      "A clear explanation of which Terra Classic transaction types will be tested first.",
      "A decision tree showing what happens if native Trezor Suite support is not currently realistic.",
    ],
  },
  {
    id: "babylon-integration-feasibility",
    title: "Babylon integration feasibility study",
    summary: "Explore how Terra Classic could connect with Babylon's Bitcoin-secured ecosystem, including BTC-backed security, IBC pathways, finality-provider models, and practical integration constraints.",
    detailSummary: "Research and define a practical integration path between Terra Classic and Babylon's Bitcoin-secured ecosystem, with a focus on feasibility, security assumptions, IBC connectivity, finality-provider models, and long-term value for Terra Classic users and validators.",
    category: "Interchain security R&D",
    status: "OPEN FOR PROPOSALS",
    effort: "Large",
    quoteType: "Research + milestone quote required",
    idealFor: ["Cosmos / IBC protocol engineers", "Interchain security researchers", "Bitcoin staking, finality, and validator-infrastructure specialists"],
    deliverables: [
      "Feasibility report explaining how Babylon's Bitcoin staking, Finality Provider, BSN, IBC, and Cosmos SDK architecture may or may not apply to Terra Classic.",
      "Technical integration map covering required chain upgrades, IBC routes, light-client assumptions, validator/finality-provider requirements, and operational dependencies.",
      "Risk assessment covering slashing, governance, validator economics, custody assumptions, integration complexity, and user-facing communication.",
      "Recommended next-step package: no-go rationale, proof-of-concept plan, or governance-ready work package for deeper integration.",
    ],
    acceptanceCriteria: [
      "The report must clearly separate proven Babylon capabilities from assumptions that require direct Babylon team confirmation.",
      "The work must not imply that Terra Classic receives Bitcoin security, BTC yield, or Babylon integration until the mechanism is technically validated.",
      "The feasibility study must define what Terra Classic would need to change, deploy, or maintain to participate safely.",
      "The final deliverable must be understandable for validators, developers, governance voters, and non-technical ecosystem participants.",
    ],
    quoteRequirements: [
      "Research methodology and list of primary sources to be reviewed, including Babylon documentation, IBC requirements, Terra Classic chain constraints, and validator operational needs.",
      "Relevant experience with Cosmos SDK, IBC, shared security, Bitcoin staking, validator infrastructure, or protocol research.",
      "A phased plan: feasibility research, technical alignment, stakeholder outreach, proof of concept, governance preparation.",
      "Explicit assumptions, dependencies, and stop conditions where the work should not continue without new evidence or partner confirmation.",
    ],
  },
];

export const openWorkById = new Map(openWorkPackages.map((workPackage) => [workPackage.id, workPackage]));

export const closedWorkPackages: ClosedWorkPackage[] = [
  {
    id: "cosmos-sdk-053-ibc-v2-phase-2",
    title: "Cosmos SDK v0.53 and IBC v2 upgrade support",
    summary: "Mainnet execution and post-upgrade support for Terra Classic's Cosmos SDK v0.53 upgrade with IBC v2 Eureka support, including coordination, execution, monitoring, and stability verification.",
    category: "Protocol upgrade",
    completed: "Passed proposal #12220",
    delivered: "SDK v0.53 + IBC v2 support",
  },
  {
    id: "wasmd-unforking-phase-2",
    title: "Wasmd unforking and forked-module removal",
    summary: "Phase 2 work to remove forked modules from Terra Classic's Wasmd stack, reducing long-term maintenance burden and moving the chain closer to upstream-compatible infrastructure.",
    category: "Chain maintenance",
    completed: "Passed proposal #12197",
    delivered: "Forked-module removal phase",
  },
];
