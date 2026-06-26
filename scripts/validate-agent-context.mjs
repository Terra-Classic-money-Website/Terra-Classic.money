import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const distDir = path.join(rootDir, "dist");
const siteI18nPath = path.join(rootDir, "src/i18n/site-i18n.json");

const requiredPublicFiles = [
  "llms.txt",
  "ai-context/site.md",
  "ai-context/policies.md",
  "ai-context/faq.md",
  "ai-context/open-work.md",
  "data/site-index.json",
  "data/ecosystem.json",
  "data/markets.json",
  "data/roadmap.json",
  "data/open-work.json",
  "data/policies.json",
  "data/faq.json",
];

const requiredPhrases = [
  "not financial advice",
  "not the official Terra Classic website",
  "informational only",
];

const itemListRouteIds = new Set(["ecosystem", "markets", "roadmap", "openWork", "brandAssets"]);
const forbiddenSchemaTypes = new Set([
  "FinancialProduct",
  "InvestmentOrDeposit",
  "LoanOrCredit",
  "Offer",
  "Product",
]);

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readText(baseDir, relativePath) {
  return fs.readFile(path.join(baseDir, relativePath), "utf8");
}

async function readJson(baseDir, relativePath) {
  return JSON.parse(await readText(baseDir, relativePath));
}

function collectMarkdownLinks(markdown) {
  return [...markdown.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].map((match) => match[1]);
}

function localPathForUrl(url) {
  if (!url.startsWith("https://terra-classic.money/")) return null;
  const parsed = new URL(url);
  const pathname = parsed.pathname === "/" ? "index.html" : parsed.pathname.replace(/^\//, "");
  return pathname;
}

function publicPathFor(locale, route) {
  const routePath = route.localizedPath === "index.html" ? "" : route.localizedPath;
  const prefix = locale.default || !locale.pathPrefix ? "" : `${locale.pathPrefix}/`;
  const pathname = `/${prefix}${routePath}`;
  return routePath ? pathname.replace(/\/+$/, "") : pathname;
}

function htmlPathFor(locale, route) {
  const pathname = publicPathFor(locale, route);
  if (pathname.endsWith("/")) return `${pathname.replace(/^\//, "")}index.html`;
  return pathname === "/" ? "index.html" : pathname.replace(/^\//, "");
}

function collectStructuredData(html) {
  return [...html.matchAll(/<script\b(?=[^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1].trim())
    .filter(Boolean)
    .map((json) => JSON.parse(json));
}

function graphNodes(structuredData) {
  return structuredData.flatMap((node) => {
    if (Array.isArray(node?.["@graph"])) return node["@graph"];
    return node ? [node] : [];
  });
}

function schemaTypes(node) {
  const type = node?.["@type"];
  if (Array.isArray(type)) return type;
  return type ? [type] : [];
}

function hasSchemaType(nodes, type) {
  return nodes.some((node) => schemaTypes(node).includes(type));
}

async function validateBuiltHtml(baseDir) {
  const failures = [];
  const siteI18n = await readJson(rootDir, path.relative(rootDir, siteI18nPath));
  const defaultLocale = siteI18n.locales.find((locale) => locale.default) || siteI18n.locales[0];
  const publishedLocales = siteI18n.locales.filter((locale) => locale.published);

  for (const route of siteI18n.routes.filter((candidate) => candidate.robots !== "noindex,follow")) {
    for (const localeId of route.publishedLocales) {
      const locale = publishedLocales.find((candidate) => candidate.id === localeId);
      if (!locale) continue;

      const relativePath = htmlPathFor(locale, route);
      let structuredData;

      try {
        const html = await readText(baseDir, relativePath);
        structuredData = collectStructuredData(html);
      } catch (error) {
        failures.push(`dist/${relativePath} could not be read for structured data validation: ${error.message}`);
        continue;
      }

      if (structuredData.length === 0) {
        failures.push(`dist/${relativePath} is missing JSON-LD structured data.`);
        continue;
      }

      const nodes = graphNodes(structuredData);
      if (!hasSchemaType(nodes, "WebPage")) {
        failures.push(`dist/${relativePath} JSON-LD is missing a WebPage node.`);
      }

      for (const node of nodes) {
        for (const type of schemaTypes(node)) {
          if (forbiddenSchemaTypes.has(type)) {
            failures.push(`dist/${relativePath} JSON-LD uses forbidden financial/commercial schema type: ${type}`);
          }
        }
      }

      if (locale.id === defaultLocale.id && itemListRouteIds.has(route.id) && !hasSchemaType(nodes, "ItemList")) {
        failures.push(`dist/${relativePath} JSON-LD is missing the required ItemList for route ${route.id}.`);
      }

      if (locale.id === defaultLocale.id && route.id === "home" && !hasSchemaType(nodes, "FAQPage")) {
        failures.push(`dist/${relativePath} JSON-LD is missing homepage FAQPage structured data.`);
      }
    }
  }

  return failures;
}

async function validateBase(baseDir, { built = false } = {}) {
  const failures = [];

  for (const relativePath of requiredPublicFiles) {
    if (!await exists(path.join(baseDir, relativePath))) {
      failures.push(`${built ? "dist" : "public"}/${relativePath} is missing.`);
    }
  }

  if (failures.length > 0) return failures;

  const llms = await readText(baseDir, "llms.txt");
  if (!llms.startsWith("# ")) {
    failures.push(`${built ? "dist" : "public"}/llms.txt must start with an H1 heading.`);
  }

  const llmsLinks = collectMarkdownLinks(llms);
  if (llmsLinks.length < 8) {
    failures.push(`${built ? "dist" : "public"}/llms.txt should include core page and data links.`);
  }

  if (/<html[\s>]/i.test(llms)) {
    failures.push(`${built ? "dist" : "public"}/llms.txt appears to contain HTML fallback content.`);
  }

  for (const phrase of requiredPhrases) {
    if (!llms.toLowerCase().includes(phrase.toLowerCase())) {
      failures.push(`${built ? "dist" : "public"}/llms.txt is missing required phrase: ${phrase}`);
    }
  }

  for (const link of llmsLinks) {
    const localPath = localPathForUrl(link);
    if (!localPath) continue;

    const filePath = path.join(baseDir, localPath);
    const rootFilePath = path.join(rootDir, localPath);
    if (!await exists(filePath) && !await exists(rootFilePath)) {
      failures.push(`Link target from llms.txt is missing locally: ${link}`);
    }
  }

  for (const relativePath of requiredPublicFiles.filter((file) => file.endsWith(".json"))) {
    const data = await readJson(baseDir, relativePath);
    if (!data || typeof data !== "object") {
      failures.push(`${relativePath} did not parse as an object.`);
      continue;
    }

    if (data.schemaVersion !== "1.0.0") {
      failures.push(`${relativePath} is missing schemaVersion 1.0.0.`);
    }

    if (typeof data.disclaimer === "string") {
      for (const phrase of requiredPhrases) {
        if (!data.disclaimer.toLowerCase().includes(phrase.toLowerCase())) {
          failures.push(`${relativePath} disclaimer is missing required phrase: ${phrase}`);
        }
      }
    }
  }

  if (built) {
    failures.push(...await validateBuiltHtml(baseDir));
  }

  return failures;
}

const failures = [
  ...await validateBase(publicDir),
];
const shouldValidateDist = process.env.AGENT_VALIDATE_DIST === "1";

if (shouldValidateDist && await exists(distDir)) {
  failures.push(...await validateBase(distDir, { built: true }));
}

if (failures.length > 0) {
  console.error("AI agent context validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AI agent context validation passed.");
