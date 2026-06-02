import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "src", "i18n", "site-i18n.json");
const statusPath = path.join(rootDir, "src", "i18n", "translation-status.json");
const config = JSON.parse(await fs.readFile(configPath, "utf8"));
const translationStatus = JSON.parse(await fs.readFile(statusPath, "utf8"));
const failures = [];

function fail(message) {
  failures.push(message);
}

async function exists(relativePath) {
  try {
    await fs.access(path.join(rootDir, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function readExisting(relativePath) {
  return fs.readFile(path.join(rootDir, relativePath), "utf8");
}

async function sourceHashFor(statusRoute, route) {
  const hash = createHash("sha256");

  for (const sourceFile of statusRoute.sourceFiles) {
    if (!await exists(sourceFile)) {
      fail(`Route ${statusRoute.id} translation source file not found: ${sourceFile}.`);
      continue;
    }
    hash.update(sourceFile);
    hash.update("\0");
    hash.update(await readExisting(sourceFile));
    hash.update("\0");
  }

  hash.update(JSON.stringify(route.meta?.[translationStatus.canonicalLocale] || {}));
  return hash.digest("hex");
}

const localeIds = new Set(config.locales.map((locale) => locale.id));
const publishedLocales = config.locales.filter((locale) => locale.published);
const defaultLocales = config.locales.filter((locale) => locale.default);
const defaultLocale = defaultLocales[0];
const statusRoutes = new Map(translationStatus.routes.map((route) => [route.id, route]));
const allowedPublishedStatuses = new Set(translationStatus.allowedPublishedStatuses || ["reviewed"]);

if (defaultLocales.length !== 1) {
  fail(`Expected exactly one default locale, found ${defaultLocales.length}.`);
}

for (const locale of publishedLocales) {
  if (!locale.htmlLang) fail(`Locale ${locale.id} is missing htmlLang.`);
  if (!["ltr", "rtl"].includes(locale.dir)) fail(`Locale ${locale.id} has invalid dir "${locale.dir}".`);
  if (!locale.default && !locale.pathPrefix) fail(`Non-default locale ${locale.id} is missing pathPrefix.`);
}

if (localeIds.has("pl")) {
  fail("Polish locale is present, but Polish is explicitly out of scope for now.");
}

const routeIds = new Set();

for (const route of config.routes) {
  if (routeIds.has(route.id)) fail(`Duplicate route id: ${route.id}.`);
  routeIds.add(route.id);
  const statusRoute = statusRoutes.get(route.id);

  if (!statusRoute) {
    fail(`Route ${route.id} is missing from src/i18n/translation-status.json.`);
    continue;
  }

  if (!await exists(route.sourcePath)) {
    fail(`Route ${route.id} source HTML not found: ${route.sourcePath}.`);
  }

  const currentSourceHash = await sourceHashFor(statusRoute, route);

  for (const localeId of route.publishedLocales) {
    const locale = publishedLocales.find((candidate) => candidate.id === localeId);
    if (!locale) {
      fail(`Route ${route.id} publishes unknown or unpublished locale ${localeId}.`);
      continue;
    }

    const localeStatus = statusRoute.locales?.[localeId];
    if (!localeStatus) {
      fail(`Route ${route.id} is missing ${localeId} translation lifecycle status.`);
    } else if (!allowedPublishedStatuses.has(localeStatus.status)) {
      fail(`Route ${route.id} publishes ${localeId} with translation status "${localeStatus.status}". Published routes require: ${[...allowedPublishedStatuses].join(", ")}.`);
    }

    if (defaultLocale && locale.id !== defaultLocale.id) {
      if (!localeStatus?.sourceHash) {
        fail(`Route ${route.id} publishes ${localeId} without a recorded English source hash.`);
      } else if (localeStatus.sourceHash !== currentSourceHash) {
        fail(`Route ${route.id} publishes stale ${localeId} content. Expected source hash ${currentSourceHash}, found ${localeStatus.sourceHash}.`);
      }
    }

    if (!route.meta?.[localeId]?.title) fail(`Route ${route.id} is missing ${localeId} title metadata.`);
    if (!route.meta?.[localeId]?.description) fail(`Route ${route.id} is missing ${localeId} description metadata.`);

    if (!locale.default) {
      const localizedPath = path.join(locale.pathPrefix, route.localizedPath);
      if (!await exists(localizedPath)) {
        fail(`Route ${route.id} localized HTML not found: ${localizedPath}. Run npm run i18n:generate.`);
      }
    }
  }

  for (const locale of config.locales) {
    if (locale.default || !locale.pathPrefix) continue;
    const localizedPath = path.join(locale.pathPrefix, route.localizedPath);
    const shouldExist = locale.published && route.publishedLocales.includes(locale.id);
    if (!shouldExist && await exists(localizedPath)) {
      fail(`Unpublished localized HTML is present for route ${route.id}: ${localizedPath}. Run npm run i18n:generate.`);
    }
  }
}

for (const statusRoute of translationStatus.routes) {
  if (!routeIds.has(statusRoute.id)) {
    fail(`Translation status references unknown route id: ${statusRoute.id}.`);
  }
}

const requiredChromeModules = publishedLocales.map((locale) => `src/i18n/content/${locale.id}/chrome.ts`);

for (const modulePath of requiredChromeModules) {
  if (!await exists(modulePath)) {
    fail(`Missing typed chrome content module: ${modulePath}.`);
  }
}

for (const locale of publishedLocales) {
  if (defaultLocale && locale.id === defaultLocale.id) continue;

  const renderedTextPath = `src/i18n/content/${locale.id}/renderedText.json`;
  if (!await exists(renderedTextPath)) {
    fail(`Published non-default locale ${locale.id} is missing rendered body text module: ${renderedTextPath}.`);
    continue;
  }

  const renderedText = JSON.parse(await readExisting(renderedTextPath));
  const translatedEntries = Object.entries(renderedText).filter(([source, translated]) => (
    typeof source === "string" &&
    typeof translated === "string" &&
    source.trim().length > 0 &&
    translated.trim().length > 0 &&
    source !== translated
  ));

  if (translatedEntries.length < 100) {
    fail(`Published non-default locale ${locale.id} has only ${translatedEntries.length} rendered text translations. This looks like a partial language surface.`);
  }
}

if (failures.length > 0) {
  console.error("i18n validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`i18n validation passed for ${publishedLocales.length} published locales and ${config.routes.length} routes.`);
