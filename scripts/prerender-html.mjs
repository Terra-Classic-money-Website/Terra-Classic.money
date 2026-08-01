import fs from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const i18nConfig = JSON.parse(await fs.readFile(path.join(rootDir, "src/i18n/site-i18n.json"), "utf8"));
const defaultLocale = i18nConfig.locales.find((locale) => locale.default);
const publishedLocales = i18nConfig.locales.filter((locale) => locale.published);
const translatableAttributes = new Set(["aria-label", "alt", "title", "placeholder"]);
const skipTextTags = new Set(["script", "style", "noscript", "code", "pre"]);
const voidTags = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]);
const compactTags = new Set([
  "a", "article", "aside", "blockquote", "br", "dd", "details", "dl", "dt", "em", "footer", "h1", "h2", "h3", "h4", "h5", "h6",
  "header", "hr", "li", "main", "nav", "ol", "p", "section", "small", "strong", "summary", "table", "tbody", "td", "tfoot", "th",
  "thead", "time", "tr", "ul",
]);
const compactDropTrees = new Set(["canvas", "script", "style", "svg"]);

if (!defaultLocale) throw new Error("The default locale is missing from the i18n configuration.");

function routePathFor(locale, route) {
  const routePath = route.localizedPath === "index.html" ? "" : route.localizedPath;
  const prefix = locale.default || !locale.pathPrefix ? "" : `${locale.pathPrefix}/`;
  return `/${prefix}${routePath}`;
}

function htmlPathFor(locale, route) {
  const routePath = route.localizedPath || route.sourcePath;
  return locale.default || !locale.pathPrefix
    ? path.join(distDir, route.sourcePath)
    : path.join(distDir, locale.pathPrefix, routePath);
}

function decodeHtml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, digits) => String.fromCodePoint(Number.parseInt(digits, 16)))
    .replace(/&#([0-9]+);/g, (_, digits) => String.fromCodePoint(Number.parseInt(digits, 10)))
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function escapeText(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeText(value).replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function normalizeText(value) {
  return decodeHtml(value).replace(/\s+/g, " ").trim();
}

function translateText(value, translations) {
  const normalized = normalizeText(value);
  if (!normalized) return value;

  const translated = translations[normalized];
  if (!translated || translated === normalized) return value;

  const leadingWhitespace = value.match(/^\s*/)?.[0] || "";
  const trailingWhitespace = value.match(/\s*$/)?.[0] || "";
  return `${leadingWhitespace}${escapeText(translated)}${trailingWhitespace}`;
}

function translateTagAttributes(tag, translations) {
  return tag.replace(/\s([\w:-]+)=("([^"]*)"|'([^']*)')/g, (match, name, quotedValue, doubleValue, singleValue) => {
    if (!translatableAttributes.has(name.toLowerCase())) return match;
    const rawValue = doubleValue ?? singleValue ?? "";
    const normalized = normalizeText(rawValue);
    const translated = translations[normalized];
    if (!translated || translated === normalized) return match;
    const quote = quotedValue[0];
    return ` ${name}=${quote}${escapeAttribute(translated)}${quote}`;
  });
}

function translateHtmlFragment(html, translations) {
  const tokens = html.split(/(<[^>]+>)/g);
  const openTags = [];

  return tokens.map((token) => {
    if (!token.startsWith("<")) {
      return openTags.some((tag) => skipTextTags.has(tag)) ? token : translateText(token, translations);
    }

    if (/^<\//.test(token)) {
      const tagName = token.match(/^<\/\s*([\w:-]+)/)?.[1]?.toLowerCase();
      if (tagName) {
        const index = openTags.lastIndexOf(tagName);
        if (index >= 0) openTags.splice(index, 1);
      }
      return token;
    }

    if (!/^<!|^<\?/.test(token) && !/\/>$/.test(token)) {
      const tagName = token.match(/^<\s*([\w:-]+)/)?.[1]?.toLowerCase();
      if (tagName && !voidTags.has(tagName)) {
        openTags.push(tagName);
      }
    }

    return translateTagAttributes(token, translations);
  }).join("");
}

function attributeValue(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=("([^"]*)"|'([^']*)')`, "i"));
  return match?.[2] ?? match?.[3] ?? null;
}

function compactOpeningTag(tag, tagName) {
  if (tagName === "img") {
    const alt = attributeValue(tag, "alt");
    const src = attributeValue(tag, "src");
    if (!alt) return "";
    return `<img${src ? ` src="${src}"` : ""} alt="${alt}"/>`;
  }

  const outputTag = tagName === "button" ? "strong" : compactTags.has(tagName) ? tagName : null;
  if (!outputTag) return "";

  const attributes = [];
  for (const name of ["href", "id", "aria-label"]) {
    const value = attributeValue(tag, name);
    if (value) attributes.push(`${name}="${value}"`);
  }
  return `<${outputTag}${attributes.length > 0 ? ` ${attributes.join(" ")}` : ""}${voidTags.has(tagName) ? "/" : ""}>`;
}

function compactLocalizedHtmlFragment(html) {
  const tokens = html.split(/(<[^>]+>)/g);
  const openTags = [];
  let skippedDepth = 0;

  return tokens.map((token) => {
    if (!token.startsWith("<")) return skippedDepth > 0 ? "" : token.replace(/\s+/g, " ");
    if (/^<!--/.test(token)) return "";

    const closingTag = token.match(/^<\/\s*([\w:-]+)/)?.[1]?.toLowerCase();
    if (closingTag) {
      if (skippedDepth > 0) {
        skippedDepth -= 1;
        return "";
      }

      const entry = openTags.pop();
      if (!entry || entry.inputTag !== closingTag || !entry.outputTag) return "";
      return `</${entry.outputTag}>`;
    }

    if (/^<!|^<\?/.test(token)) return "";
    const tagName = token.match(/^<\s*([\w:-]+)/)?.[1]?.toLowerCase();
    if (!tagName) return "";
    const isVoid = voidTags.has(tagName) || /\/>$/.test(token);

    if (skippedDepth > 0) {
      if (!isVoid) skippedDepth += 1;
      return "";
    }

    const isDecorativeHiddenTree = attributeValue(token, "aria-hidden") === "true" && tagName === "span";
    if (compactDropTrees.has(tagName) || isDecorativeHiddenTree) {
      if (!isVoid) skippedDepth = 1;
      return "";
    }

    const outputTag = tagName === "button" ? "strong" : compactTags.has(tagName) ? tagName : null;
    if (!isVoid) openTags.push({ inputTag: tagName, outputTag });
    return compactOpeningTag(token, tagName);
  }).join("");
}

async function translationsFor(locale) {
  if (locale.default) return null;
  const translationPath = path.join(rootDir, "src/i18n/content", locale.id, "renderedText.json");
  return JSON.parse(await fs.readFile(translationPath, "utf8"));
}

function replaceRoot(html, route, locale, appHtml) {
  const attributes = [
    'id="root"',
    'data-agent-prerendered="true"',
    `data-agent-prerender-route="${route.id}"`,
    `data-agent-prerender-locale="${locale.id}"`,
  ].join(" ");
  const rootPattern = /<div\s+id=["']root["']\s*><\/div>/i;

  if (!rootPattern.test(html)) {
    throw new Error(`Could not find the empty application root for ${locale.id}/${route.id}.`);
  }

  return html.replace(rootPattern, `<div ${attributes}>${appHtml}</div>`);
}

const vite = await createServer({
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

let renderedPages = 0;

try {
  const { renderRoute } = await vite.ssrLoadModule("/src/prerender/render.tsx");

  for (const route of i18nConfig.routes) {
    for (const localeId of route.publishedLocales) {
      const locale = publishedLocales.find((candidate) => candidate.id === localeId);
      if (!locale) continue;

      const outputPath = htmlPathFor(locale, route);
      const publicUrl = new URL(routePathFor(locale, route), i18nConfig.siteUrl).href;
      const translations = await translationsFor(locale);
      const rendered = await renderRoute(route.id, publicUrl);
      const translated = translations ? translateHtmlFragment(rendered, translations) : rendered;
      const localized = translations ? compactLocalizedHtmlFragment(translated) : translated;
      const html = replaceRoot(await fs.readFile(outputPath, "utf8"), route, locale, localized);

      await fs.writeFile(outputPath, html);
      renderedPages += 1;
    }
  }
} finally {
  await vite.close();
}

console.log(`Prerendered ${renderedPages} localized HTML pages for agent and no-JavaScript readability.`);
