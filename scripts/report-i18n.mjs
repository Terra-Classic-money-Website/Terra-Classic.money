import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const rootDir = process.cwd();
const reportDir = path.join(rootDir, ".i18n-reports");
const reportPath = path.join(reportDir, "latest.md");
const config = JSON.parse(await fs.readFile(path.join(rootDir, "src", "i18n", "site-i18n.json"), "utf8"));
const translationStatus = JSON.parse(await fs.readFile(path.join(rootDir, "src", "i18n", "translation-status.json"), "utf8"));
const publishedLocales = config.locales.filter((locale) => locale.published);
const draftLocales = config.locales.filter((locale) => !locale.default && !locale.published);
const plannedLocales = config.targetLocales || [];
const statusRoutes = new Map(translationStatus.routes.map((route) => [route.id, route]));

function routeUrl(locale, route) {
  const routePath = route.localizedPath === "index.html" ? "" : route.localizedPath;
  const prefix = locale.default || !locale.pathPrefix ? "" : `${locale.pathPrefix}/`;
  return `/${prefix}${routePath}`;
}

async function sourceHashFor(statusRoute, route) {
  const hash = createHash("sha256");

  for (const sourceFile of statusRoute.sourceFiles) {
    hash.update(sourceFile);
    hash.update("\0");
    hash.update(await fs.readFile(path.join(rootDir, sourceFile), "utf8"));
    hash.update("\0");
  }

  hash.update(JSON.stringify(route.meta?.[translationStatus.canonicalLocale] || {}));
  return hash.digest("hex");
}

const routeStatusRows = [];

for (const route of config.routes) {
  const statusRoute = statusRoutes.get(route.id);
  if (!statusRoute) continue;
  const currentHash = await sourceHashFor(statusRoute, route);

  for (const locale of config.locales) {
    const localeStatus = statusRoute.locales?.[locale.id];
    if (!localeStatus) continue;
    const published = route.publishedLocales.includes(locale.id) && locale.published;
    const recordedHash = localeStatus.sourceHash || "";
    const hashState = locale.default ? "canonical" : recordedHash === currentHash ? "current" : recordedHash ? "stale" : "not recorded";
    routeStatusRows.push(`| ${route.id} | \`${locale.id}\` | ${localeStatus.status} | ${published ? "yes" : "no"} | ${hashState} | ${localeStatus.notes || ""} |`);
  }
}

const lines = [
  "# i18n report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Published locales",
  "",
  "| Locale | Label | Prefix |",
  "| --- | --- | --- |",
  ...publishedLocales.map((locale) => `| \`${locale.id}\` | ${locale.label} | \`${locale.pathPrefix || "/"}\` |`),
  "",
  "## Draft locales",
  "",
  "| Locale | Label | Prefix |",
  "| --- | --- | --- |",
  ...draftLocales.map((locale) => `| \`${locale.id}\` | ${locale.label} | \`${locale.pathPrefix || "/"}\` |`),
  "",
  "## Planned target locales",
  "",
  "| Locale | Label | Status |",
  "| --- | --- | --- |",
  ...plannedLocales.map((locale) => `| \`${locale.id}\` | ${locale.label} | ${locale.status} |`),
  "",
  "## Route coverage",
  "",
  "| Route | Published paths |",
  "| --- | --- |",
  ...config.routes.map((route) => {
    const paths = route.publishedLocales
      .map((localeId) => publishedLocales.find((locale) => locale.id === localeId))
      .filter(Boolean)
      .map((locale) => `\`${routeUrl(locale, route)}\``)
      .join(", ");
    return `| ${route.id} | ${paths} |`;
  }),
  "",
  "## Translation lifecycle",
  "",
  "| Route | Locale | Status | Published | Source hash state | Notes |",
  "| --- | --- | --- | --- | --- | --- |",
  ...routeStatusRows,
  "",
  "## Notes",
  "",
  "- English is the canonical source locale.",
  "- Turkish is the first published non-English pilot locale.",
  "- Non-English routes must not be published unless their lifecycle status is reviewed and their recorded English source hash is current.",
  "- Polish is intentionally out of scope until the target-language strategy changes.",
];

await fs.mkdir(reportDir, { recursive: true });
await fs.writeFile(reportPath, `${lines.join("\n")}\n`);
console.log(`i18n report written to ${path.relative(rootDir, reportPath)}.`);
