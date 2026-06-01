import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const reportDir = path.join(rootDir, ".performance-reports");

const pages = [
  {
    label: "home",
    file: "home.json",
    budgets: { minScore: 95, maxFcpMs: 2200, maxLcpMs: 3000, maxTbtMs: 150, maxCls: 0.06, maxTransferKiB: 1250, maxRequests: 65 },
  },
  {
    label: "ecosystem",
    file: "ecosystem.json",
    budgets: { minScore: 93, maxFcpMs: 2200, maxLcpMs: 3300, maxTbtMs: 150, maxCls: 0.06, maxTransferKiB: 800, maxRequests: 55 },
  },
  {
    label: "markets",
    file: "markets.json",
    budgets: { minScore: 94, maxFcpMs: 2300, maxLcpMs: 3100, maxTbtMs: 150, maxCls: 0.06, maxTransferKiB: 500, maxRequests: 65 },
  },
  {
    label: "roadmap",
    file: "roadmap.json",
    budgets: { minScore: 95, maxFcpMs: 2200, maxLcpMs: 2500, maxTbtMs: 100, maxCls: 0.06, maxTransferKiB: 300, maxRequests: 20 },
  },
  {
    label: "open-work",
    file: "open-work.json",
    budgets: { minScore: 95, maxFcpMs: 2200, maxLcpMs: 2800, maxTbtMs: 100, maxCls: 0.06, maxTransferKiB: 400, maxRequests: 30 },
  },
  {
    label: "open-work-detail",
    file: "open-work-detail.json",
    budgets: { minScore: 95, maxFcpMs: 2200, maxLcpMs: 2500, maxTbtMs: 100, maxCls: 0.06, maxTransferKiB: 300, maxRequests: 20 },
  },
  {
    label: "decentralization",
    file: "decentralization.json",
    budgets: { minScore: 82, maxFcpMs: 2200, maxLcpMs: 3400, maxTbtMs: 400, maxCls: 0.06, maxTransferKiB: 450, maxRequests: 35 },
  },
  {
    label: "about",
    file: "about.json",
    budgets: { minScore: 88, maxFcpMs: 2200, maxLcpMs: 3600, maxTbtMs: 100, maxCls: 0.06, maxTransferKiB: 500, maxRequests: 35 },
  },
  {
    label: "privacy",
    file: "privacy.json",
    budgets: { minScore: 95, maxFcpMs: 2200, maxLcpMs: 2500, maxTbtMs: 100, maxCls: 0.06, maxTransferKiB: 300, maxRequests: 20 },
  },
  {
    label: "404",
    file: "404.json",
    budgets: { minScore: 94, maxFcpMs: 2200, maxLcpMs: 3000, maxTbtMs: 100, maxCls: 0.06, maxTransferKiB: 500, maxRequests: 30 },
  },
  {
    label: "home-desktop",
    file: "home-desktop.json",
    budgets: { minScore: 95, maxFcpMs: 1800, maxLcpMs: 2500, maxTbtMs: 100, maxCls: 0.05, maxTransferKiB: 2000, maxRequests: 70 },
  },
  {
    label: "decentralization-desktop",
    file: "decentralization-desktop.json",
    budgets: { minScore: 95, maxFcpMs: 1800, maxLcpMs: 2500, maxTbtMs: 100, maxCls: 0.05, maxTransferKiB: 750, maxRequests: 40 },
  },
  {
    label: "about-desktop",
    file: "about-desktop.json",
    budgets: { minScore: 95, maxFcpMs: 1800, maxLcpMs: 2500, maxTbtMs: 100, maxCls: 0.05, maxTransferKiB: 750, maxRequests: 40 },
  },
];

function formatMs(value) {
  return `${Math.round(value)} ms`;
}

function formatKiB(value) {
  return `${Math.round(value)} KiB`;
}

function metric(audits, id) {
  const value = audits[id]?.numericValue;
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`Lighthouse audit metric "${id}" was not found.`);
  }
  return value;
}

async function readReport(page) {
  const reportPath = path.join(reportDir, page.file);

  try {
    return JSON.parse(await fs.readFile(reportPath, "utf8"));
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      throw new Error(`Missing Lighthouse report ${path.relative(rootDir, reportPath)}. Run \`npm run perf:audit\` first.`);
    }
    throw error;
  }
}

function extractMetrics(report) {
  const audits = report.audits || {};
  const score = (report.categories?.performance?.score ?? 0) * 100;
  const requests = audits["network-requests"]?.details?.items?.length;

  return {
    score,
    fcpMs: metric(audits, "first-contentful-paint"),
    lcpMs: metric(audits, "largest-contentful-paint"),
    tbtMs: metric(audits, "total-blocking-time"),
    cls: metric(audits, "cumulative-layout-shift"),
    transferKiB: metric(audits, "total-byte-weight") / 1024,
    requests: typeof requests === "number" ? requests : 0,
  };
}

function collectFailures(page, metrics) {
  const { budgets } = page;
  const failures = [];

  if (metrics.score < budgets.minScore) {
    failures.push(`score ${Math.round(metrics.score)} is below ${budgets.minScore}`);
  }
  if (metrics.fcpMs > budgets.maxFcpMs) {
    failures.push(`FCP ${formatMs(metrics.fcpMs)} exceeds ${formatMs(budgets.maxFcpMs)}`);
  }
  if (metrics.lcpMs > budgets.maxLcpMs) {
    failures.push(`LCP ${formatMs(metrics.lcpMs)} exceeds ${formatMs(budgets.maxLcpMs)}`);
  }
  if (metrics.tbtMs > budgets.maxTbtMs) {
    failures.push(`TBT ${formatMs(metrics.tbtMs)} exceeds ${formatMs(budgets.maxTbtMs)}`);
  }
  if (metrics.cls > budgets.maxCls) {
    failures.push(`CLS ${metrics.cls.toFixed(3)} exceeds ${budgets.maxCls.toFixed(3)}`);
  }
  if (metrics.transferKiB > budgets.maxTransferKiB) {
    failures.push(`transfer ${formatKiB(metrics.transferKiB)} exceeds ${formatKiB(budgets.maxTransferKiB)}`);
  }
  if (metrics.requests > budgets.maxRequests) {
    failures.push(`requests ${metrics.requests} exceed ${budgets.maxRequests}`);
  }

  return failures;
}

const rows = [];
const failures = [];

for (const page of pages) {
  const report = await readReport(page);
  const metrics = extractMetrics(report);
  const pageFailures = collectFailures(page, metrics);

  rows.push({
    page: page.label,
    score: Math.round(metrics.score),
    fcp: formatMs(metrics.fcpMs),
    lcp: formatMs(metrics.lcpMs),
    tbt: formatMs(metrics.tbtMs),
    cls: metrics.cls.toFixed(3),
    transfer: formatKiB(metrics.transferKiB),
    requests: metrics.requests,
  });

  for (const failure of pageFailures) {
    failures.push(`${page.label}: ${failure}`);
  }
}

console.log("Lighthouse budget summary:");
console.table(rows);

if (failures.length > 0) {
  console.error("\nLighthouse budgets failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Lighthouse budgets passed.");
