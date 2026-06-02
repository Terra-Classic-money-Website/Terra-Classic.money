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

for (const locale of localizedLocales) {
  const localeDir = path.join(rootDir, locale.pathPrefix);
  await fs.mkdir(localeDir, { recursive: true });

  for (const route of config.routes) {
    if (!route.publishedLocales.includes(locale.id)) continue;

    const sourcePath = path.join(rootDir, route.sourcePath);
    const targetPath = path.join(localeDir, route.localizedPath);
    const html = await fs.readFile(sourcePath, "utf8");
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, html);
  }
}

for (const locale of unpublishedLocalizedLocales) {
  const localeDir = path.join(rootDir, locale.pathPrefix);
  await fs.rm(localeDir, { recursive: true, force: true });
}

console.log(`Generated localized HTML templates for ${localizedLocales.map((locale) => locale.id).join(", ") || "no non-default locales"}.`);
