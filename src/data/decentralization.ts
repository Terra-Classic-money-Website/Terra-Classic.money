import { ecosystemCategories, type EcosystemEntry } from "./ecosystem";

export type ArticleBlock = {
  id: string;
  eyebrow: string;
  title: string;
  placeholder: string;
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
    placeholder:
      "Replace this block with the article opening: what decentralization means for Terra Classic, why it matters, and what makes the chain different from company-led networks.",
  },
  {
    id: "consensus",
    eyebrow: "02",
    title: "Consensus layer",
    placeholder:
      "Replace this block with the technical explanation of validators, blocks, voting power, deterministic state, and why many independent operators matter.",
  },
  {
    id: "delegation",
    eyebrow: "03",
    title: "Delegators and stake distribution",
    placeholder:
      "Replace this block with the user-facing explanation of delegation, custody, redelegation, unbonding, validator choice, and stake concentration risk.",
  },
  {
    id: "governance",
    eyebrow: "04",
    title: "Governance and public accountability",
    placeholder:
      "Replace this block with the governance section: proposal flow, validator voting, delegator override, public debate, and the difference between governance power and social legitimacy.",
  },
  {
    id: "community",
    eyebrow: "05",
    title: "Why this is positive for Terra Classic",
    placeholder:
      "Replace this block with the strategic section: why a community-maintained, open-source, validator-diverse network creates resilience, trust, and room for contributors.",
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
