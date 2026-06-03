import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const configPath = path.join(rootDir, "src", "i18n", "site-i18n.json");
const config = JSON.parse(await fs.readFile(configPath, "utf8"));
const defaultLocale = config.locales.find((locale) => locale.default);
const localizedLocales = config.locales.filter((locale) => locale.published && !locale.default && locale.pathPrefix);
const unpublishedLocalizedLocales = config.locales.filter((locale) => !locale.default && !locale.published && locale.pathPrefix);

if (!defaultLocale) {
  throw new Error("i18n config does not define a default locale.");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\"", "&quot;");
}

function localizedUrl(locale, route) {
  const routePath = route.localizedPath === "index.html" ? "" : route.localizedPath;
  const pathParts = [locale.pathPrefix, routePath].filter(Boolean);
  const localizedPath = pathParts.join("/");
  return `${config.siteUrl}/${localizedPath}${routePath ? "" : "/"}${routePath ? "" : ""}`.replace(/([^:]\/)\/+/g, "$1");
}

function replaceNamedMeta(html, name, content) {
  const tag = `<meta name="${name}" content="${escapeAttribute(content)}" />`;
  return html.replace(new RegExp(`<meta\\s+name="${name}"\\s+content="[^"]*"\\s*/>`, "s"), tag);
}

function replacePropertyMeta(html, property, content) {
  const tag = `<meta property="${property}" content="${escapeAttribute(content)}" />`;
  return html.replace(new RegExp(`<meta\\s+property="${property}"\\s+content="[^"]*"\\s*/>`, "s"), tag);
}

function applyLocalizedMetadata(html, locale, route) {
  const meta = route.meta?.[locale.id];
  if (!meta) return html;

  const pageUrl = localizedUrl(locale, route);
  let nextHtml = html
    .replace(/<html\b[^>]*>/, `<html lang="${escapeAttribute(locale.htmlLang)}" dir="${escapeAttribute(locale.dir)}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeAttribute(pageUrl)}" />`);

  nextHtml = replaceNamedMeta(nextHtml, "description", meta.description);
  nextHtml = replaceNamedMeta(nextHtml, "twitter:title", meta.title);
  nextHtml = replaceNamedMeta(nextHtml, "twitter:description", meta.description);
  nextHtml = replacePropertyMeta(nextHtml, "og:title", meta.title);
  nextHtml = replacePropertyMeta(nextHtml, "og:description", meta.description);
  nextHtml = replacePropertyMeta(nextHtml, "og:url", pageUrl);

  return nextHtml;
}

for (const locale of localizedLocales) {
  const localeDir = path.join(rootDir, locale.pathPrefix);
  await fs.mkdir(localeDir, { recursive: true });

  for (const route of config.routes) {
    if (!route.publishedLocales.includes(locale.id)) continue;

    const sourcePath = path.join(rootDir, route.sourcePath);
    const targetPath = path.join(localeDir, route.localizedPath);
    const html = applyLocalizedMetadata(await fs.readFile(sourcePath, "utf8"), locale, route);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, html);
  }
}

for (const locale of unpublishedLocalizedLocales) {
  const localeDir = path.join(rootDir, locale.pathPrefix);
  await fs.rm(localeDir, { recursive: true, force: true });
}

console.log(`Generated localized HTML templates for ${localizedLocales.map((locale) => locale.id).join(", ") || "no non-default locales"}.`);
