export type RoadmapMilestoneStatus = "planned" | "in-progress" | "live" | "delayed" | "completed" | "source-needed";

export type RoadmapMilestone = {
  title: string;
  start: string;
  end: string;
  status: RoadmapMilestoneStatus;
  paid?: boolean;
  note?: string;
};

export type RoadmapRow = {
  id: string;
  /** Set to false to keep a sourced row in this file without showing it on the public roadmap. */
  visible?: boolean;
  group: "public" | "community";
  project: string;
  shortName: string;
  avatar?: string;
  avatarAlt?: string;
  category: string;
  source: "governance" | "public" | "project-submitted";
  accent: string;
  milestones: RoadmapMilestone[];
};

export const roadmapMonths = [
  { key: "2025-07", label: "July", year: "2025" },
  { key: "2025-08", label: "August", year: "2025" },
  { key: "2025-09", label: "September", year: "2025" },
  { key: "2025-10", label: "October", year: "2025" },
  { key: "2025-11", label: "November", year: "2025" },
  { key: "2025-12", label: "December", year: "2025" },
  { key: "2026-01", label: "January", year: "2026" },
  { key: "2026-02", label: "February", year: "2026" },
  { key: "2026-03", label: "March", year: "2026" },
  { key: "2026-04", label: "April", year: "2026" },
  { key: "2026-05", label: "May", year: "2026" },
  { key: "2026-06", label: "June", year: "2026" },
  { key: "2026-07", label: "July", year: "2026" },
  { key: "2026-08", label: "August", year: "2026" },
  { key: "2026-09", label: "September", year: "2026" },
] as const;

// Contributor note: roadmap rows need sources and honest status labels.
// Use visible: false for tracked-but-not-public rows.
export const roadmapRows: RoadmapRow[] = [
  {
    id: "public-l1-governance",
    visible: false,
    group: "public",
    project: "Terra Classic L1",
    shortName: "L1",
    category: "Protocol",
    source: "governance",
    accent: "#5493f7",
    milestones: [
      { title: "Governance-recognized upgrade queue", start: "2025-07", end: "2025-10", status: "completed" },
      { title: "Public infrastructure hardening", start: "2025-10", end: "2026-02", status: "in-progress" },
      { title: "Next protocol upgrade window", start: "2026-04", end: "2026-07", status: "planned" },
    ],
  },
  {
    id: "public-market-module",
    group: "public",
    project: "Market Module 2.0",
    shortName: "MM2",
    category: "Core utility",
    source: "public",
    accent: "#101010",
    milestones: [
      { title: "Code merge and audit window", start: "2025-08", end: "2025-10", status: "completed" },
      { title: "Public testnet", start: "2025-10", end: "2025-11", status: "completed" },
      { title: "Mainnet upgrade path", start: "2025-11", end: "2026-01", status: "in-progress" },
      { title: "Post-launch reporting", start: "2026-03", end: "2026-06", status: "planned" },
    ],
  },
  {
    id: "public-forex-protocol",
    group: "public",
    project: "Forex Protocol",
    shortName: "FX",
    category: "Stable assets",
    source: "public",
    accent: "#f9d85e",
    milestones: [
      { title: "EUTC concept validation", start: "2025-07", end: "2025-09", status: "completed" },
      { title: "Multi-currency suite design", start: "2025-09", end: "2026-01", status: "in-progress" },
      { title: "Collateral and issuer requirements", start: "2026-01", end: "2026-04", status: "planned" },
      { title: "Phase 1 launch readiness", start: "2026-05", end: "2026-08", status: "planned" },
    ],
  },
  {
    id: "community-juris",
    group: "community",
    project: "Juris Protocol",
    shortName: "JP",
    avatar: "avatars/avatar-obdbbfwqr1y1obx0pof8cyz6q-e19587c5b9.webp",
    avatarAlt: "Juris Protocol lending and borrowing dApp on Terra Classic.",
    category: "DeFi / lending",
    source: "project-submitted",
    accent: "#d4102f",
    milestones: [
      { title: "Testnet", start: "2025-07", end: "2025-08", status: "completed", paid: true },
      { title: "Staking in mainnet", start: "2025-09", end: "2025-09", status: "in-progress", paid: true },
      { title: "Protocol audit", start: "2025-10", end: "2025-10", status: "planned", paid: true },
      { title: "Lending protocol mainnet launch", start: "2025-11", end: "2026-02", status: "planned", paid: true },
    ],
  },
  {
    id: "community-terraport",
    visible: false,
    group: "community",
    project: "TerraPort",
    shortName: "TP",
    category: "DEX / infrastructure",
    source: "project-submitted",
    accent: "#b89a32",
    milestones: [
      { title: "TerraPort v3 development", start: "2025-07", end: "2025-12", status: "in-progress", paid: true },
      { title: "v3 mainnet launch", start: "2026-01", end: "2026-01", status: "planned", paid: true },
      { title: "Liquidity expansion", start: "2026-03", end: "2026-06", status: "planned", paid: true },
    ],
  },
  {
    id: "community-sdk",
    visible: false,
    group: "community",
    project: "Terra Classic SDK",
    shortName: "SDK",
    category: "Developer tooling",
    source: "project-submitted",
    accent: "#888888",
    milestones: [
      { title: "Code merge and audit", start: "2025-07", end: "2025-09", status: "completed", paid: true },
      { title: "Public testnet", start: "2025-10", end: "2025-10", status: "completed", paid: true },
      { title: "Mainnet upgrade", start: "2025-11", end: "2026-01", status: "in-progress", paid: true },
      { title: "Dashboards / API", start: "2026-02", end: "2026-04", status: "planned", paid: true },
    ],
  },
  {
    id: "community-selenium",
    visible: false,
    group: "community",
    project: "Selenium Finance",
    shortName: "SEL",
    category: "Synthetics",
    source: "project-submitted",
    accent: "#32c8b8",
    milestones: [
      { title: "Testnet", start: "2025-07", end: "2025-08", status: "completed", paid: true },
      { title: "Mainnet launch", start: "2025-08", end: "2025-10", status: "completed", paid: true },
      { title: "Selenium v2 upgrade", start: "2025-11", end: "2025-12", status: "in-progress", paid: true },
      { title: "Selenium v3 upgrade", start: "2026-01", end: "2026-03", status: "planned", paid: true },
    ],
  },
  {
    id: "community-garuda",
    visible: false,
    group: "community",
    project: "Garuda",
    shortName: "GAR",
    category: "Community app",
    source: "project-submitted",
    accent: "#63b352",
    milestones: [
      { title: "Project-submitted roadmap intake", start: "2025-08", end: "2025-09", status: "source-needed", paid: true },
      { title: "Milestone verification slot", start: "2026-02", end: "2026-04", status: "source-needed", paid: true },
      { title: "Community release window", start: "2026-06", end: "2026-08", status: "planned", paid: true },
    ],
  },
];

export const roadmapGroupLabels = {
  public: {
    title: "Terra Classic public roadmap",
    description: "Governance, protocol, infrastructure, and official-compatible items.",
  },
  community: {
    title: "L2 & community project roadmap",
    description: "Project-submitted roadmap entries.",
  },
} as const;
