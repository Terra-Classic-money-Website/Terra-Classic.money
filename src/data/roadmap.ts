export type RoadmapMilestoneStatus = "planned" | "in-progress" | "live" | "delayed" | "completed" | "source-needed";

export type RoadmapMilestone = {
  title: string;
  start: string;
  end: string;
  status: RoadmapMilestoneStatus;
  dateLabel?: string;
  paid?: boolean;
  note?: string;
};

export type RoadmapRow = {
  id: string;
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

export type RoadmapTodayMarker = {
  column: number;
  label: string;
};

export const roadmapMonths = [
  { key: "2025-06", label: "June", year: "2025" },
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
  { key: "2026-10", label: "October", year: "2026" },
  { key: "2026-11", label: "November", year: "2026" },
  { key: "2026-12", label: "December", year: "2026" },
] as const;

function parseRoadmapMonthKey(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function getMonthOffset(from: Date, to: Date) {
  return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
}

export function getRoadmapTodayMarker(today = new Date()): RoadmapTodayMarker | null {
  const firstMonth = roadmapMonths[0];
  const lastMonth = roadmapMonths[roadmapMonths.length - 1];
  if (!firstMonth || !lastMonth) return null;

  const timelineStart = parseRoadmapMonthKey(firstMonth.key);
  const lastTimelineMonth = parseRoadmapMonthKey(lastMonth.key);
  const timelineEnd = new Date(lastTimelineMonth.getFullYear(), lastTimelineMonth.getMonth() + 1, 1);
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (todayDate < timelineStart || todayDate >= timelineEnd) return null;

  const todayMonthStart = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1);
  const nextMonthStart = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 1);
  const monthProgress = (todayDate.getTime() - todayMonthStart.getTime()) / (nextMonthStart.getTime() - todayMonthStart.getTime());

  return {
    column: getMonthOffset(timelineStart, todayMonthStart) + monthProgress,
    label: "Today",
  };
}

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
    source: "governance",
    accent: "#101010",
    milestones: [
      {
        title: "Forum proposal",
        start: "2025-06",
        end: "2025-06",
        status: "completed",
        dateLabel: "12 Jun 2025",
      },
      {
        title: "No-mint concept",
        start: "2025-07",
        end: "2025-07",
        status: "completed",
        dateLabel: "24 Jul 2025",
      },
      {
        title: "Proposal #12188 vote",
        start: "2025-07",
        end: "2025-08",
        status: "completed",
        dateLabel: "29 Jul-5 Aug 2025",
      },
      {
        title: "Code implementation",
        start: "2025-10",
        end: "2025-12",
        status: "completed",
        dateLabel: "Oct-Dec 2025",
      },
      {
        title: "Chain upgrade alignment",
        start: "2026-01",
        end: "2026-03",
        status: "completed",
        dateLabel: "Jan-Mar 2026",
      },
      {
        title: "Final adjustments",
        start: "2026-04",
        end: "2026-05",
        status: "completed",
        dateLabel: "Apr-May 2026",
      },
      {
        title: "Release readiness",
        start: "2026-05",
        end: "2026-05",
        status: "completed",
        dateLabel: "May 2026",
      },
      {
        title: "Mainnet release",
        start: "2026-06",
        end: "2026-06",
        status: "planned",
        dateLabel: "Jun 2026",
      },
    ],
  },
  {
    id: "public-forex-protocol",
    group: "public",
    project: "Forex Protocol",
    shortName: "FX",
    avatar: "hero-institution-logo.svg",
    avatarAlt: "Forex Protocol multi-currency sign.",
    category: "Stable assets",
    source: "governance",
    accent: "#f9d85e",
    milestones: [
      {
        title: "Forum concept",
        start: "2025-12",
        end: "2025-12",
        status: "completed",
        dateLabel: "7 Dec 2025",
      },
      {
        title: "Proposal #12209 vote",
        start: "2025-12",
        end: "2025-12",
        status: "completed",
        dateLabel: "13-20 Dec 2025",
      },
      {
        title: "Implementation contractor search",
        start: "2026-02",
        end: "2026-07",
        status: "in-progress",
        dateLabel: "Feb-Jul 2026",
      },
    ],
  },
  {
    id: "community-garuda",
    group: "community",
    project: "Garuda Defi",
    shortName: "GAR",
    avatar: "avatars/avatar-y4ml5qrfwbzvv4fua1kyrv8vk9i-edd37cef82.webp",
    avatarAlt: "Garuda Defi decentralized exchange on Terra Classic.",
    category: "DEX / DeFi",
    source: "project-submitted",
    accent: "#00f52b",
    milestones: [
      {
        title: "Governance Expansion",
        start: "2026-01",
        end: "2026-03",
        status: "completed",
        dateLabel: "Q1 2026",
        paid: true,
        note: "Governance module; Leaderboard; Private sales - Solana",
      },
      {
        title: "Engine Core Upgrade",
        start: "2026-04",
        end: "2026-06",
        status: "in-progress",
        dateLabel: "Q2 2026",
        paid: true,
        note: "Presales - Solana; Smart route swap; On-chain orderbook",
      },
      {
        title: "Integration",
        start: "2026-07",
        end: "2026-09",
        status: "planned",
        dateLabel: "Q3 2026",
        paid: true,
        note: "Spot trading - Solana; Cross-chain bridge integration",
      },
      {
        title: "Volume Boost",
        start: "2026-10",
        end: "2026-12",
        status: "planned",
        dateLabel: "Q4 2026",
        paid: true,
        note: "Perp trading - Solana; Perp trading - LUNC",
      },
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
