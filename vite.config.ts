import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { existsSync, readFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

type LocaleConfig = {
  id: string;
  htmlLang: string;
  dir: "ltr" | "rtl";
  pathPrefix: string;
  default: boolean;
  published: boolean;
};

type RouteConfig = {
  id: string;
  sourcePath: string;
  localizedPath: string;
  entry: string;
  robots?: string;
  publishedLocales: string[];
  meta: Record<string, { title: string; description: string }>;
};

type SiteI18nConfig = {
  siteUrl: string;
  locales: LocaleConfig[];
  routes: RouteConfig[];
};

const rootDir = dirname(fileURLToPath(import.meta.url));
const i18nConfig = JSON.parse(readFileSync(resolve(rootDir, "src/i18n/site-i18n.json"), "utf8")) as SiteI18nConfig;
const defaultLocale = i18nConfig.locales.find((locale) => locale.default) || i18nConfig.locales[0];
const publishedLocales = i18nConfig.locales.filter((locale) => locale.published);
const androidPlatformClassScript = `    <script>
      (function () {
        var userAgent = navigator.userAgent || "";
        var platform = navigator.userAgentData && navigator.userAgentData.platform;

        if (platform === "Android" || /Android/i.test(userAgent)) {
          document.documentElement.classList.add("tc-platform-android");
        }
      })();
    </script>`;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function publicPathFor(locale: LocaleConfig, route: RouteConfig) {
  const routePath = route.localizedPath === "index.html" ? "" : route.localizedPath;
  const prefix = locale.default || !locale.pathPrefix ? "" : `${locale.pathPrefix}/`;
  const path = `/${prefix}${routePath}`;
  return routePath ? path.replace(/\/+$/, "") : path;
}

function absoluteUrlFor(locale: LocaleConfig, route: RouteConfig) {
  return `${i18nConfig.siteUrl}${publicPathFor(locale, route)}`;
}

function routeAndLocaleForHtml(filename: string) {
  const normalized = relative(rootDir, filename).replace(/\\/g, "/");

  for (const locale of publishedLocales) {
    if (locale.default || !locale.pathPrefix) continue;
    if (normalized.startsWith(`${locale.pathPrefix}/`)) {
      const localizedPath = normalized.slice(locale.pathPrefix.length + 1) || "index.html";
      const route = i18nConfig.routes.find((candidate) => candidate.localizedPath === localizedPath);
      return route ? { route, locale } : null;
    }
  }

  const sourcePath = normalized || "index.html";
  const route = i18nConfig.routes.find((candidate) => candidate.sourcePath === sourcePath);
  return route ? { route, locale: defaultLocale } : null;
}

function stripManagedHeadTags(html: string) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/gi, "")
    .replace(/\s*<meta\s+name="description"[\s\S]*?>/gi, "")
    .replace(/\s*<meta\s+name="robots"[\s\S]*?>/gi, "")
    .replace(/\s*<link\s+rel="canonical"[\s\S]*?>/gi, "")
    .replace(/\s*<link\s+rel="alternate"[\s\S]*?>/gi, "")
    .replace(/\s*<meta\s+property="og:(title|description|type|url|site_name|image|image:width|image:height)"[\s\S]*?>/gi, "")
    .replace(/\s*<meta\s+name="twitter:(card|title|description|image)"[\s\S]*?>/gi, "");
}

function managedHeadTags(route: RouteConfig, locale: LocaleConfig) {
  const meta = route.meta[locale.id] || route.meta[defaultLocale.id];
  const canonicalUrl = absoluteUrlFor(locale, route);
  const alternateTags = route.robots ? "" : route.publishedLocales
    .map((localeId) => publishedLocales.find((candidate) => candidate.id === localeId))
    .filter((candidate): candidate is LocaleConfig => Boolean(candidate))
    .map((publishedLocale) => (
      `    <link rel="alternate" hreflang="${publishedLocale.htmlLang}" href="${escapeHtml(absoluteUrlFor(publishedLocale, route))}" />`
    ))
    .join("\n");
  const xDefaultTag = route.robots ? "" : `    <link rel="alternate" hreflang="x-default" href="${escapeHtml(absoluteUrlFor(defaultLocale, route))}" />`;
  const canonicalTag = route.robots ? "" : `    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`;
  const robotsTag = route.robots ? `    <meta name="robots" content="${escapeHtml(route.robots)}" />` : "";
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const url = escapeHtml(canonicalUrl);

  return [
    robotsTag,
    canonicalTag,
    alternateTags,
    xDefaultTag,
    `    <title>${title}</title>`,
    `    <meta name="description" content="${description}" />`,
    `    <meta property="og:title" content="${title}" />`,
    `    <meta property="og:description" content="${description}" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:url" content="${url}" />`,
    `    <meta property="og:site_name" content="Terra Classic" />`,
    `    <meta property="og:image" content="${i18nConfig.siteUrl}/assets/terra-classic-money-ogimage.png" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${title}" />`,
    `    <meta name="twitter:description" content="${description}" />`,
    `    <meta name="twitter:image" content="${i18nConfig.siteUrl}/assets/terra-classic-money-ogimage.png" />`,
  ].filter(Boolean).join("\n");
}

function localizedHtmlPlugin() {
  return {
    name: "terra-classic-localized-html",
    transformIndexHtml: {
      order: "pre" as const,
      handler(html: string, context: { filename: string }) {
        const match = routeAndLocaleForHtml(context.filename);
        if (!match) return html;

        const { route, locale } = match;
        const htmlAttributes = `lang="${locale.htmlLang}" dir="${locale.dir}"`;
        const cleaned = stripManagedHeadTags(html).replace(/<html[^>]*>/i, `<html ${htmlAttributes}>`);
        return cleaned.replace("</head>", `${androidPlatformClassScript}\n${managedHeadTags(route, locale)}\n  </head>`);
      },
    },
  };
}

function routeInputs() {
  const inputs: Record<string, string> = {};

  for (const route of i18nConfig.routes) {
    inputs[route.entry] = resolve(rootDir, route.sourcePath);

    for (const localeId of route.publishedLocales) {
      const locale = publishedLocales.find((candidate) => candidate.id === localeId);
      if (!locale || locale.default || !locale.pathPrefix) continue;
      const localizedInput = resolve(rootDir, locale.pathPrefix, route.localizedPath);
      if (existsSync(localizedInput)) {
        inputs[`${locale.id}-${route.entry}`] = localizedInput;
      }
    }
  }

  return inputs;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_PATH || "/",
    plugins: [react(), localizedHtmlPlugin()],
    build: {
      rollupOptions: {
        input: routeInputs(),
      },
    },
  };
});
