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
  { key: "2027-01", label: "January", year: "2027" },
  { key: "2027-02", label: "February", year: "2027" },
  { key: "2027-03", label: "March", year: "2027" },
  { key: "2027-04", label: "April", year: "2027" },
  { key: "2027-05", label: "May", year: "2027" },
  { key: "2027-06", label: "June", year: "2027" },
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
    id: "public-ustc-staking",
    group: "public",
    project: "USTC Staking",
    shortName: "USTC",
    category: "Asset staking",
    source: "governance",
    accent: "#5493f7",
    milestones: [
      {
        title: "Design & module implementation",
        start: "2026-07",
        end: "2026-08",
        status: "planned",
        dateLabel: "Jul-Aug 2026",
      },
      {
        title: "Lifecycle hooks & testnet validation",
        start: "2026-08",
        end: "2026-09",
        status: "planned",
        dateLabel: "Aug-Sep 2026",
      },
      {
        title: "Documentation & upgrade preparation",
        start: "2026-09",
        end: "2026-10",
        status: "planned",
        dateLabel: "Sep-Oct 2026",
      },
    ],
  },
  {
    id: "community-cl8y",
    group: "community",
    project: "CL8Y",
    shortName: "C8",
    avatar: "avatars/avatar-cl8y.svg",
    avatarAlt: "CL8Y DeFi ecosystem logo.",
    category: "Bridge, DEX, Repeg & GameFI",
    source: "project-submitted",
    accent: "#40606e",
    milestones: [
      {
        title: "CL8Y DEX final QA, public release and stabilization",
        start: "2026-06",
        end: "2026-08",
        status: "in-progress",
        dateLabel: "Jun-Aug 2026",
      },
      {
        title: "DEX liquidity programs and locked LP incentives",
        start: "2026-08",
        end: "2026-10",
        status: "planned",
        dateLabel: "Aug-Oct 2026",
      },
      {
        title: "UST1 vFDUSD window, liquidity growth and money-market readiness",
        start: "2026-10",
        end: "2027-01",
        status: "planned",
        dateLabel: "Oct 2026-Jan 2027",
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
    id: "community-hyperlane",
    group: "community",
    project: "Hyperlane",
    shortName: "HYP",
    category: "Integration on Terra Classic",
    source: "project-submitted",
    accent: "#6c5ce7",
    milestones: [
      {
        title: "Hyperlane Multichain Bridge Launch",
        start: "2026-06",
        end: "2026-06",
        status: "in-progress",
        dateLabel: "Jun 2026",
      },
      {
        title: "Stabilization & Ecosystem Onboarding",
        start: "2026-07",
        end: "2026-07",
        status: "planned",
        dateLabel: "Jul 2026",
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
      {
        title: "Protocol development",
        start: "2025-06",
        end: "2025-09",
        status: "completed",
        dateLabel: "Jun-Sep 2025",
        paid: true,
      },
      {
        title: "Juris Staking live",
        start: "2025-10",
        end: "2025-10",
        status: "live",
        dateLabel: "Oct 2025",
        paid: true,
      },
      {
        title: "Testnet preparation",
        start: "2025-11",
        end: "2026-01",
        status: "completed",
        dateLabel: "Nov 2025-Jan 2026",
        paid: true,
      },
      {
        title: "AscendEX listing",
        start: "2026-01",
        end: "2026-01",
        status: "completed",
        dateLabel: "Jan 2026",
        paid: true,
      },
      {
        title: "Testnet release",
        start: "2026-02",
        end: "2026-02",
        status: "completed",
        dateLabel: "Feb 2026",
        paid: true,
      },
      {
        title: "UX/UI polish and mainnet preparation",
        start: "2026-03",
        end: "2026-05",
        status: "completed",
        dateLabel: "Mar-May 2026",
        paid: true,
      },
      {
        title: "Closed-alpha mainnet release",
        start: "2026-06",
        end: "2026-06",
        status: "in-progress",
        dateLabel: "Jun 2026",
        paid: true,
      },
      {
        title: "BTCC listing",
        start: "2026-06",
        end: "2026-06",
        status: "in-progress",
        dateLabel: "Jun 2026",
        paid: true,
      },
      {
        title: "SolidProof audit",
        start: "2026-07",
        end: "2026-09",
        status: "planned",
        dateLabel: "Jul-Sep 2026",
        paid: true,
      },
      {
        title: "Public beta mainnet preparation",
        start: "2026-07",
        end: "2026-09",
        status: "planned",
        dateLabel: "Jul-Sep 2026",
        paid: true,
      },
      {
        title: "Public beta mainnet launch",
        start: "2026-10",
        end: "2026-10",
        status: "planned",
        dateLabel: "Oct 2026",
        paid: true,
      },
      {
        title: "Compliance and institutional adoption",
        start: "2026-11",
        end: "2027-06",
        status: "planned",
        dateLabel: "Nov 2026-Jun 2027",
        paid: true,
      },
    ],
  },
  {
    id: "community-luncdash",
    group: "community",
    project: "LUNCdash",
    shortName: "LD",
    avatar: "avatars/avatar-yarx8rwbcc6ytokstcaee5hyolq-b7c09a28d8.webp",
    avatarAlt: "LUNCdash dashboard and wallet for Terra Classic.",
    category: "Analytics / wallet",
    source: "project-submitted",
    accent: "#5493f7",
    milestones: [
      {
        title: "Juris Protocol acquires LUNCdash",
        start: "2026-05",
        end: "2026-05",
        status: "completed",
        dateLabel: "May 2026",
      },
      {
        title: "Migration and handover",
        start: "2026-05",
        end: "2026-06",
        status: "in-progress",
        dateLabel: "May-Jun 2026",
      },
      {
        title: "LUNCdash overhaul",
        start: "2026-07",
        end: "2026-08",
        status: "planned",
        dateLabel: "Jul-Aug 2026",
      },
      {
        title: "LUNCdash overhaul release",
        start: "2026-09",
        end: "2026-09",
        status: "planned",
        dateLabel: "Sep 2026",
      },
      {
        title: "L2 project integrations",
        start: "2026-10",
        end: "2027-01",
        status: "planned",
        dateLabel: "Oct 2026-Jan 2027",
      },
      {
        title: "Fiat on/off-ramp and debit card",
        start: "2027-01",
        end: "2027-06",
        status: "planned",
        dateLabel: "Jan-Jun 2027",
      },
    ],
  },
  {
    id: "community-orbit-wire",
    group: "community",
    project: "Orbit Wire",
    shortName: "OW",
    avatar: "avatars/avatar-nd3lsshbcw0z9mspfilqd8r72ra-b0fed9c623.webp",
    avatarAlt: "Orbit Wire aggregator on Terra Classic.",
    category: "Aggregator",
    source: "project-submitted",
    accent: "#35c96f",
    milestones: [
      {
        title: "NFT Orderflow System",
        start: "2026-06",
        end: "2026-06",
        status: "completed",
        dateLabel: "Jun 2026",
      },
      {
        title: "NFT Rankings",
        start: "2026-06",
        end: "2026-07",
        status: "planned",
        dateLabel: "Jun-Jul 2026",
      },
      {
        title: "Alert Bots",
        start: "2026-06",
        end: "2026-08",
        status: "planned",
        dateLabel: "Jun-Aug 2026",
      },
      {
        title: "User Profiles",
        start: "2026-07",
        end: "2026-08",
        status: "planned",
        dateLabel: "Jul-Aug 2026",
      },
      {
        title: "AI Agent Bot",
        start: "2026-09",
        end: "2026-12",
        status: "planned",
        dateLabel: "Sep-Dec 2026",
      },
    ],
  },
  {
    id: "community-simplylunc",
    group: "community",
    project: "SimplyLunc",
    shortName: "SL",
    avatar: "avatars/avatar-logo-mark-dw-1gkd6-d2bd6717f4.webp",
    avatarAlt: "SimplyLunc Terra Classic liquidity hub.",
    category: "Terra Classic liquidity hub",
    source: "project-submitted",
    accent: "#6e8f7d",
    milestones: [
      {
        title: "Protocol announcement",
        start: "2026-04",
        end: "2026-04",
        status: "completed",
        dateLabel: "Apr 2026",
      },
      {
        title: "Whitepaper release",
        start: "2026-06",
        end: "2026-06",
        status: "in-progress",
        dateLabel: "Jun 2026",
      },
      {
        title: "MVP development",
        start: "2026-05",
        end: "2026-08",
        status: "in-progress",
        dateLabel: "May-Aug 2026",
      },
      {
        title: "Token presale",
        start: "2026-07",
        end: "2026-08",
        status: "planned",
        dateLabel: "Jul-Aug 2026",
      },
      {
        title: "MVP release",
        start: "2026-09",
        end: "2026-09",
        status: "planned",
        dateLabel: "Sep 2026",
      },
      {
        title: "Cross-chain swaps development",
        start: "2026-10",
        end: "2027-01",
        status: "planned",
        dateLabel: "Oct 2026-Jan 2027",
      },
      {
        title: "Simplified assets development",
        start: "2027-02",
        end: "2027-06",
        status: "planned",
        dateLabel: "Feb-Jun 2027",
      },
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
