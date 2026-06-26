import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const aiContextDir = path.join(publicDir, "ai-context");
const publicDataDir = path.join(publicDir, "data");
const siteUrl = "https://terra-classic.money";
const schemaVersion = "1.0.0";
const generatedAt = new Date().toISOString();

const globalDisclaimer = [
  "Terra-classic.money is an independent, community-maintained information website for Terra Classic.",
  "It is not the official Terra Classic website, not a governance authority, and not financial advice.",
  "Listings and links are informational only and do not imply endorsement, audit, custody safety, investment merit, or official status.",
].join(" ");

const policySummary = {
  independent: "The website is independent, community-maintained, and open-source.",
  unofficial: "The website is not currently the official Terra Classic website.",
  informationalOnly: "The website is informational only and does not provide financial, legal, tax, staking, validator, trading, or investment advice.",
  neutrality: "Core ecosystem, market, roadmap, and open-work content should remain neutral, source-aware, and free from hidden rankings or validator favoritism.",
  paidSeparation: "Paid or sponsored listings must be clearly separated from neutral core ecosystem content.",
  contributionModel: "Corrections, listing suggestions, translations, and improvements should route through public GitHub contribution workflows.",
  userProtection: "Users should verify linked resources, wallet flows, contracts, market venues, and governance claims before acting.",
};

function absoluteUrl(pathname = "") {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${normalized === "/index.html" ? "/" : normalized}`;
}

function publicPathFor(locale, route) {
  const routePath = route.localizedPath === "index.html" ? "" : route.localizedPath;
  const prefix = locale.default || !locale.pathPrefix ? "" : `${locale.pathPrefix}/`;
  const pathname = `/${prefix}${routePath}`;
  return routePath ? pathname.replace(/\/+$/, "") : pathname;
}

function safeRecord(value) {
  return JSON.parse(JSON.stringify(value));
}

function compactEntries(entries) {
  return entries.map((entry) => ({
    name: entry.name,
    summary: entry.summary,
    url: entry.href,
    badge: entry.badge || null,
    avatarAlt: entry.avatarAlt || null,
  }));
}

function markdownList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function markdownLink(label, url) {
  return `[${label}](${url})`;
}

async function writeTextIfChanged(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  try {
    const current = await fs.readFile(filePath, "utf8");
    if (current === content) return false;
  } catch (error) {
    if (!error || error.code !== "ENOENT") throw error;
  }

  await fs.writeFile(filePath, content);
  return true;
}

async function writeJson(filePath, value) {
  return writeTextIfChanged(filePath, `${JSON.stringify(value)}\n`);
}

async function loadTsModules() {
  const server = await createServer({
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true },
  });

  try {
    const [
      content,
      ecosystem,
      markets,
      roadmap,
      openWork,
      about,
    ] = await Promise.all([
      server.ssrLoadModule("/src/data/content.ts"),
      server.ssrLoadModule("/src/data/ecosystem.ts"),
      server.ssrLoadModule("/src/data/markets.ts"),
      server.ssrLoadModule("/src/data/roadmap.ts"),
      server.ssrLoadModule("/src/data/openWork.ts"),
      server.ssrLoadModule("/src/data/about.ts"),
    ]);

    return { content, ecosystem, markets, roadmap, openWork, about };
  } finally {
    await server.close();
  }
}

const siteI18n = JSON.parse(await fs.readFile(path.join(rootDir, "src/i18n/site-i18n.json"), "utf8"));
const defaultLocale = siteI18n.locales.find((locale) => locale.default) || siteI18n.locales[0];
const publishedLocales = siteI18n.locales.filter((locale) => locale.published);
const modules = await loadTsModules();

const routeRecords = siteI18n.routes.map((route) => {
  const defaultMeta = route.meta[defaultLocale.id];

  return {
    id: route.id,
    sourcePath: route.sourcePath,
    canonicalUrl: absoluteUrl(publicPathFor(defaultLocale, route)),
    title: defaultMeta.title,
    description: defaultMeta.description,
    robots: route.robots || null,
    publishedLocales: route.publishedLocales,
    localizedUrls: Object.fromEntries(
      route.publishedLocales
        .map((localeId) => publishedLocales.find((locale) => locale.id === localeId))
        .filter(Boolean)
        .map((locale) => [locale.id, absoluteUrl(publicPathFor(locale, route))]),
    ),
  };
});

const publicRoutes = routeRecords.filter((route) => route.robots !== "noindex,follow");

const ecosystemData = {
  schemaVersion,
  generatedAt,
  source: "src/data/ecosystem.ts",
  canonicalPage: absoluteUrl("/ecosystem.html"),
  disclaimer: globalDisclaimer,
  categories: modules.ecosystem.ecosystemCategories.map((category) => ({
    id: category.id,
    title: category.title,
    description: category.description,
    entries: compactEntries(category.entries),
  })),
};

const marketsData = {
  schemaVersion,
  generatedAt,
  source: "src/data/markets.ts",
  canonicalPage: absoluteUrl("/markets.html"),
  disclaimer: globalDisclaimer,
  assetGroups: modules.markets.marketAssetGroups.map((assetGroup) => ({
    id: assetGroup.id,
    title: assetGroup.title,
    categories: assetGroup.categories.map((category) => ({
      id: category.id,
      title: category.title,
      description: category.description,
      entries: compactEntries(category.entries),
    })),
  })),
};

const roadmapData = {
  schemaVersion,
  generatedAt,
  source: "src/data/roadmap.ts",
  canonicalPage: absoluteUrl("/roadmap.html"),
  disclaimer: globalDisclaimer,
  timelineMonths: safeRecord(modules.roadmap.roadmapMonths),
  rows: modules.roadmap.roadmapRows
    .filter((row) => row.visible !== false)
    .map((row) => ({
      id: row.id,
      group: row.group,
      project: row.project,
      shortName: row.shortName,
      category: row.category,
      source: row.source,
      milestones: row.milestones.map((milestone) => ({
        title: milestone.title,
        start: milestone.start,
        end: milestone.end,
        status: milestone.status,
        dateLabel: milestone.dateLabel || null,
        paid: Boolean(milestone.paid),
        note: milestone.note || null,
      })),
    })),
};

const openWorkData = {
  schemaVersion,
  generatedAt,
  source: "src/data/openWork.ts",
  canonicalPage: absoluteUrl("/open-work.html"),
  disclaimer: globalDisclaimer,
  openPackages: modules.openWork.openWorkPackages.map((workPackage) => ({
    id: workPackage.id,
    title: workPackage.title,
    summary: workPackage.summary,
    detailUrl: `${absoluteUrl("/open-work-detail.html")}?work=${encodeURIComponent(workPackage.id)}`,
    detailSummary: workPackage.detailSummary,
    category: workPackage.category,
    status: workPackage.status,
    effort: workPackage.effort,
    quoteType: workPackage.quoteType,
    idealFor: workPackage.idealFor,
    deliverables: workPackage.deliverables,
    acceptanceCriteria: workPackage.acceptanceCriteria,
    quoteRequirements: workPackage.quoteRequirements,
  })),
  closedPackages: modules.openWork.closedWorkPackages.map((workPackage) => ({
    id: workPackage.id,
    title: workPackage.title,
    summary: workPackage.summary,
    category: workPackage.category,
    completed: workPackage.completed,
    delivered: workPackage.delivered,
  })),
};

const faqData = {
  schemaVersion,
  generatedAt,
  source: ["src/data/content.ts", "src/data/about.ts"],
  canonicalPages: [absoluteUrl("/"), absoluteUrl("/about.html")],
  disclaimer: globalDisclaimer,
  groups: [
    ...modules.content.faqGroups.map((group) => ({
      page: "home",
      title: group.title,
      items: group.items.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    })),
    {
      page: "about",
      title: "About terra-classic.money",
      items: modules.about.aboutFaqItems.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    },
  ],
};

const policiesData = {
  schemaVersion,
  generatedAt,
  source: ["-- 1. OG BRIEF - 2026.05.14.md", "src/data/about.ts", "src/data/content.ts"],
  canonicalPage: absoluteUrl("/about.html"),
  disclaimer: globalDisclaimer,
  summary: policySummary,
  openSourcePrinciples: modules.about.openSourcePrinciples.map(([title, description]) => ({ title, description })),
  contributionPaths: modules.about.contributionPaths.map(([title, description]) => ({ title, description })),
  supportBoundaries: modules.about.supportBoundaries,
  sidebarDisclaimer: modules.content.sidebarDisclaimer,
};

const siteIndex = {
  schemaVersion,
  generatedAt,
  siteUrl,
  name: "terra-classic.money",
  description: "Independent, community-maintained, open-source information website for Terra Classic, LUNC, and USTC.",
  disclaimer: globalDisclaimer,
  locales: publishedLocales.map((locale) => ({
    id: locale.id,
    label: locale.label,
    nativeLabel: locale.nativeLabel,
    htmlLang: locale.htmlLang,
    dir: locale.dir,
    default: Boolean(locale.default),
    pathPrefix: locale.pathPrefix,
  })),
  routes: routeRecords,
  dataFiles: [
    { id: "site-index", url: absoluteUrl("/data/site-index.json"), description: "Canonical route, locale, metadata, and data-file index." },
    { id: "ecosystem", url: absoluteUrl("/data/ecosystem.json"), description: "Neutral Terra Classic ecosystem directory records." },
    { id: "markets", url: absoluteUrl("/data/markets.json"), description: "Informational LUNC and USTC market route records." },
    { id: "roadmap", url: absoluteUrl("/data/roadmap.json"), description: "Public Terra Classic roadmap rows and milestones." },
    { id: "open-work", url: absoluteUrl("/data/open-work.json"), description: "Open work packages, deliverables, acceptance criteria, and quote requirements." },
    { id: "policies", url: absoluteUrl("/data/policies.json"), description: "Neutrality, contribution, support, and safety policy summary." },
    { id: "faq", url: absoluteUrl("/data/faq.json"), description: "FAQ questions and answers from public site sections." },
  ],
};

function buildLlmsTxt() {
  return `${[
    "# Terra Classic Website",
    "",
    "Independent, community-maintained, open-source information website for Terra Classic, LUNC, and USTC.",
    "",
    "## Core Pages",
    "",
    markdownList(publicRoutes.map((route) => markdownLink(route.title, route.canonicalUrl))),
    "",
    "## Machine-Readable Data",
    "",
    markdownList(siteIndex.dataFiles.map((file) => `${markdownLink(file.id, file.url)} - ${file.description}`)),
    "",
    "## Agent Context",
    "",
    markdownList([
      markdownLink("Site context", absoluteUrl("/ai-context/site.md")),
      markdownLink("Policy context", absoluteUrl("/ai-context/policies.md")),
      markdownLink("FAQ context", absoluteUrl("/ai-context/faq.md")),
      markdownLink("Open work context", absoluteUrl("/ai-context/open-work.md")),
    ]),
    "",
    "## Usage Notes",
    "",
    globalDisclaimer,
    "",
    "Do not treat ecosystem, market, roadmap, or open-work entries as recommendations, endorsements, financial advice, legal advice, validator preference, paid ranking, audit status, or official Terra Classic governance status.",
  ].join("\n")}\n`;
}

function buildSiteContext() {
  return `${[
    "# Terra Classic Website Agent Context",
    "",
    siteIndex.description,
    "",
    "## Mission",
    "",
    "Provide a neutral, transparent, source-aware public information layer for Terra Classic users, builders, delegators, contributors, media, partners, and external observers.",
    "",
    "## Canonical Pages",
    "",
    markdownList(publicRoutes.map((route) => `${markdownLink(route.title, route.canonicalUrl)} - ${route.description}`)),
    "",
    "## Machine-Readable Files",
    "",
    markdownList(siteIndex.dataFiles.map((file) => `${markdownLink(file.id, file.url)} - ${file.description}`)),
    "",
    "## Important Boundaries",
    "",
    markdownList(Object.values(policySummary)),
  ].join("\n")}\n`;
}

function buildPoliciesContext() {
  return `${[
    "# Terra Classic Website Policy Context",
    "",
    globalDisclaimer,
    "",
    "## Policy Summary",
    "",
    markdownList(Object.entries(policySummary).map(([key, value]) => `**${key}:** ${value}`)),
    "",
    "## Open Source Principles",
    "",
    markdownList(policiesData.openSourcePrinciples.map((principle) => `**${principle.title}:** ${principle.description}`)),
    "",
    "## Contribution Paths",
    "",
    markdownList(policiesData.contributionPaths.map((pathItem) => `**${pathItem.title}:** ${pathItem.description}`)),
    "",
    "## Donation And Support Boundaries",
    "",
    markdownList(policiesData.supportBoundaries),
  ].join("\n")}\n`;
}

function buildFaqContext() {
  const groups = faqData.groups.flatMap((group) => [
    `## ${group.title}`,
    "",
    ...group.items.flatMap((item) => [
      `### ${item.question}`,
      "",
      item.answer,
      "",
    ]),
  ]);

  return `${["# Terra Classic Website FAQ Context", "", globalDisclaimer, "", ...groups].join("\n")}\n`;
}

function buildOpenWorkContext() {
  const packages = openWorkData.openPackages.flatMap((workPackage) => [
    `## ${workPackage.title}`,
    "",
    `Status: ${workPackage.status}`,
    "",
    `Category: ${workPackage.category}`,
    "",
    `Detail: ${workPackage.detailUrl}`,
    "",
    workPackage.detailSummary,
    "",
    "### Deliverables",
    "",
    markdownList(workPackage.deliverables),
    "",
    "### Acceptance Criteria",
    "",
    markdownList(workPackage.acceptanceCriteria),
    "",
    "### Quote Requirements",
    "",
    markdownList(workPackage.quoteRequirements),
    "",
  ]);

  return `${["# Terra Classic Open Work Agent Context", "", globalDisclaimer, "", ...packages].join("\n")}\n`;
}

const writes = await Promise.all([
  writeTextIfChanged(path.join(publicDir, "llms.txt"), buildLlmsTxt()),
  writeTextIfChanged(path.join(aiContextDir, "site.md"), buildSiteContext()),
  writeTextIfChanged(path.join(aiContextDir, "policies.md"), buildPoliciesContext()),
  writeTextIfChanged(path.join(aiContextDir, "faq.md"), buildFaqContext()),
  writeTextIfChanged(path.join(aiContextDir, "open-work.md"), buildOpenWorkContext()),
  writeJson(path.join(publicDataDir, "site-index.json"), siteIndex),
  writeJson(path.join(publicDataDir, "ecosystem.json"), ecosystemData),
  writeJson(path.join(publicDataDir, "markets.json"), marketsData),
  writeJson(path.join(publicDataDir, "roadmap.json"), roadmapData),
  writeJson(path.join(publicDataDir, "open-work.json"), openWorkData),
  writeJson(path.join(publicDataDir, "policies.json"), policiesData),
  writeJson(path.join(publicDataDir, "faq.json"), faqData),
]);

const changed = writes.filter(Boolean).length;
console.log(`Generated AI agent context files (${changed} changed).`);
