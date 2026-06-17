import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const reportDir = path.join(rootDir, ".i18n-reports");
const reportPath = path.join(reportDir, "rendered-latest.md");
const config = JSON.parse(await fs.readFile(path.join(rootDir, "src", "i18n", "site-i18n.json"), "utf8"));
const defaultLocale = config.locales.find((locale) => locale.default);
const allLocalizedLocales = config.locales.filter((locale) => locale.published && !locale.default);
const failures = [];
const observations = [];

const protectedExactTexts = new Set([
  "404",
  "Agora",
  "ATOMScan",
  "Binance",
  "CoinGecko",
  "CoinMarketCap",
  "CosmES",
  "CosmWasm",
  "DarkSun",
  "Discord",
  "Do Kwon",
  "EUTC",
  "Forex Protocol",
  "GitHub",
  "Google Analytics 4",
  "HKtc",
  "IBC",
  "Legends of Terratria",
  "LUNC",
  "LuncScan",
  "Lunc.Tools",
  "MEXC",
  "NOtc",
  "PHTc",
  "Ping.pub",
  "Proof-of-Stake",
  "RPC",
  "Secret Network",
  "StakeBin",
  "Staking Protocol",
  "Swap Protocol",
  "Telegram",
  "Terra Classic",
  "Terra Station",
  "Terraform Labs",
  "Trezor",
  "USTC",
  "Validator.Info",
  "Wasmd",
  "classic-terra",
  "terra-classic.money",
]);

const requiredTranslatableLabels = new Set([
  "6s block time",
  "Applications",
  "Beginning",
  "Blockchain information",
  "Blockchain tools",
  "Bridges",
  "Consensus layer",
  "Completed",
  "Cooperation terms",
  "Crash",
  "Developer infrastructure",
  "Delivered",
  "device type",
  "Discuss with community and validators",
  "Effort",
  "Entertainment",
  "error logs",
  "Final perspective",
  "Find out more",
  "Forex Protocol - Phase 1",
  "Forex Protocol - Phase 2",
  "Go through governance",
  "Hardware wallet R&D",
  "Infrastructure and service providers",
  "Interconnectivity",
  "Large",
  "Multi-currency suite",
  "Network inspection",
  "Opening thesis",
  "Operational decentralization",
  "Pay per delivered work",
  "Payment asset and wallet",
  "Post Crash",
  "Choose an open work package",
  "Quote",
  "referring page",
  "References / bibliography",
  "Revival narrative",
  "Service contributors, domain owners and maintainers",
  "Signs",
  "Stablecoins",
  "Step",
  "Step 1",
  "Step 2",
  "Step 3",
  "Superior uptime & reliability",
  "Verification culture",
  "Validator visibility",
  "Wallet infrastructure",
  "Wallets",
  "website",
]);

const englishStopwords = /\b(a|an|and|are|as|because|before|between|by|can|does|for|from|how|if|in|into|is|it|may|more|not|of|on|or|should|that|the|this|through|to|use|we|what|when|where|which|who|why|with|without|you|your)\b/i;
const uiLabelWords = /\b(account|address|bibliography|channel|consensus|consent|contact|content|contributor|culture|description|developer|device|email|error|external|final|information|infrastructure|interest|interests|international|layer|legal|links|listing|log|logs|name|obligation|official|open|operating|page|pages|payment|person|perspective|policy|privacy|project|public|references|referring|requirements|security|services|signs|social|step|system|technical|updated|unofficial|verification|view|visited|visitors|website)\b/i;

function fail(message) {
  failures.push(message);
}

function listFilter(envName) {
  const rawValue = process.env[envName];
  if (!rawValue) return null;

  const values = rawValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return values.length > 0 ? new Set(values) : null;
}

function filterBySet(items, filter, key, label, envName) {
  if (!filter) return items;

  const available = new Set(items.map(key));
  const unknown = [...filter].filter((value) => !available.has(value));
  if (unknown.length > 0) {
    throw new Error(`Unknown ${label} in ${envName}: ${unknown.join(", ")}. Available: ${[...available].join(", ")}.`);
  }

  return items.filter((item) => filter.has(key(item)));
}

const routeFilter = listFilter("I18N_AUDIT_ROUTES");
const localeFilter = listFilter("I18N_AUDIT_LOCALES");
const auditedRoutes = filterBySet(config.routes, routeFilter, (route) => route.id, "route", "I18N_AUDIT_ROUTES");
const localizedLocales = filterBySet(allLocalizedLocales, localeFilter, (locale) => locale.id, "locale", "I18N_AUDIT_LOCALES");

function routePathFor(locale, route) {
  const routePath = route.localizedPath === "index.html" ? "" : route.localizedPath;
  const prefix = locale.default || !locale.pathPrefix ? "" : `${locale.pathPrefix}/`;
  const query = route.id === "openWorkDetail" ? "?work=forex-protocol-implementation" : "";
  return `/${prefix}${routePath}${query}`;
}

function shouldTranslate(text) {
  const value = text.trim();
  if (!value || !/[A-Za-z]/.test(value)) return false;
  if (protectedExactTexts.has(value)) return false;
  if (/^[A-Z0-9]{2,8}$/.test(value)) return false;
  if (/^https?:\/\//.test(value) || /^[\w.-]+@[\w.-]+$/.test(value)) return false;
  if (requiredTranslatableLabels.has(value)) return true;
  if (uiLabelWords.test(value) && /\s/.test(value)) return true;
  return value.length >= 12 && englishStopwords.test(value);
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath);
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js") return "text/javascript; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".svg") return "image/svg+xml";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  if (ext === ".woff2") return "font/woff2";
  return "application/octet-stream";
}

async function fileForRequest(requestUrl) {
  const url = new URL(requestUrl, "http://127.0.0.1");
  const decodedPath = decodeURIComponent(url.pathname);
  const safePath = path.normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(distDir, safePath);

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) filePath = path.join(filePath, "index.html");
  } catch {
    if (!path.extname(filePath)) filePath = path.join(filePath, "index.html");
  }

  return filePath;
}

async function startStaticServer() {
  await fs.access(distDir);

  const server = http.createServer(async (request, response) => {
    try {
      const filePath = await fileForRequest(request.url || "/");
      if (!filePath.startsWith(distDir)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      const body = await fs.readFile(filePath);
      response.writeHead(200, { "Content-Type": contentTypeFor(filePath) });
      response.end(body);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Unable to allocate audit server port.");
  return { server, baseUrl: `http://127.0.0.1:${address.port}` };
}

async function extractVisibleTexts(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((resolve) => setTimeout(resolve, 150));
  });

  return page.evaluate(() => {
    const ignoredTags = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "SVG", "TEMPLATE"]);
    const values = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const parent = node.parentElement;
      if (!parent || ignoredTags.has(parent.tagName)) continue;

      const text = node.textContent?.replace(/\s+/g, " ").trim();
      if (!text) continue;

      const style = window.getComputedStyle(parent);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") continue;
      if (parent.closest("[aria-hidden='true'], [hidden]")) continue;

      values.push(text);
    }

    for (const element of document.body.querySelectorAll("*")) {
      if (ignoredTags.has(element.tagName)) continue;
      if (element.children.length > 0) continue;
      if (element.closest("[aria-hidden='true'], [hidden]")) continue;

      const text = element.textContent?.replace(/\s+/g, " ").trim();
      if (!text) continue;

      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") continue;

      values.push(text);
    }

    return [...new Set(values)].sort((a, b) => a.localeCompare(b));
  });
}

async function auditRenderedPages(baseUrl) {
  const browser = await chromium.launch({ headless: true });

  try {
    for (const locale of localizedLocales) {
      for (const route of auditedRoutes) {
        if (!route.publishedLocales.includes(locale.id)) continue;

        const context = await browser.newContext({
          viewport: { width: 1440, height: 1100 },
          colorScheme: "light",
          reducedMotion: "reduce",
        });
        const englishPage = await context.newPage();
        const localizedPage = await context.newPage();
        const englishPath = routePathFor(defaultLocale, route);
        const localizedPath = routePathFor(locale, route);

        await englishPage.goto(new URL(englishPath, baseUrl).toString(), { waitUntil: "networkidle" });
        await localizedPage.goto(new URL(localizedPath, baseUrl).toString(), { waitUntil: "networkidle" });
        try {
          await localizedPage.waitForFunction(() => document.documentElement.dataset.localizedDomReady === "true", undefined, { timeout: 10000 });
        } catch {
          fail(`${locale.id}/${route.id} did not report localized DOM ready for ${localizedPath}.`);
          await context.close();
          continue;
        }

        const englishTexts = await extractVisibleTexts(englishPage);
        const localizedTexts = new Set(await extractVisibleTexts(localizedPage));
        const untranslated = englishTexts.filter((text) => shouldTranslate(text) && localizedTexts.has(text));

        observations.push({
          route: route.id,
          locale: locale.id,
          englishPath,
          localizedPath,
          checkedTexts: englishTexts.filter(shouldTranslate).length,
          untranslated,
        });

        if (untranslated.length > 0) {
          fail(`${locale.id}/${route.id} still renders untranslated English text: ${untranslated.join(" | ")}`);
        }

        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
}

async function writeReport() {
  const lines = [
    "# Rendered i18n audit",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Routes: ${routeFilter ? [...routeFilter].join(", ") : "all published routes"}`,
    `Locales: ${localeFilter ? [...localeFilter].join(", ") : "all published non-default locales"}`,
    "",
    "## Route results",
    "",
    "| Locale | Route | Localized path | Checked source texts | Untranslated exact matches |",
    "| --- | --- | --- | ---: | ---: |",
    ...observations.map((row) => `| \`${row.locale}\` | ${row.route} | \`${row.localizedPath}\` | ${row.checkedTexts} | ${row.untranslated.length} |`),
  ];

  const rowsWithFailures = observations.filter((row) => row.untranslated.length > 0);
  if (rowsWithFailures.length > 0) {
    lines.push("", "## Untranslated rendered strings", "");
    for (const row of rowsWithFailures) {
      lines.push(`### ${row.locale}/${row.route}`, "");
      for (const text of row.untranslated) lines.push(`- ${text}`);
      lines.push("");
    }
  }

  await fs.mkdir(reportDir, { recursive: true });
  await fs.writeFile(reportPath, `${lines.join("\n")}\n`);
}

const { server, baseUrl } = await startStaticServer();

try {
  await auditRenderedPages(baseUrl);
  await writeReport();
} finally {
  await new Promise((resolve) => server.close(resolve));
}

if (failures.length > 0) {
  console.error("Rendered i18n audit failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  console.error(`Report written to ${path.relative(rootDir, reportPath)}.`);
  process.exit(1);
}

console.log(`Rendered i18n audit passed. Report written to ${path.relative(rootDir, reportPath)}.`);
