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
  const structuredDataTag = route.robots ? "" : structuredDataScript(route, locale);

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
    structuredDataTag,
  ].filter(Boolean).join("\n");
}

function schemaPageType(routeId: string) {
  const collectionPages = new Set(["ecosystem", "markets", "openWork", "brandAssets"]);

  if (routeId === "about") return "AboutPage";
  if (routeId === "decentralization") return "Article";
  if (routeId === "privacy") return "WebPage";
  if (routeId === "openWorkDetail") return "Article";
  if (collectionPages.has(routeId)) return "CollectionPage";
  return "WebPage";
}

function routeDataLinks(routeId: string) {
  const linksByRoute: Record<string, string[]> = {
    home: ["/data/site-index.json", "/data/faq.json", "/ai-context/site.md"],
    ecosystem: ["/data/ecosystem.json"],
    markets: ["/data/markets.json"],
    roadmap: ["/data/roadmap.json"],
    openWork: ["/data/open-work.json", "/ai-context/open-work.md"],
    openWorkDetail: ["/data/open-work.json"],
    about: ["/data/policies.json", "/ai-context/policies.md"],
    privacy: ["/data/policies.json"],
    brandAssets: ["/data/site-index.json"],
  };

  return (linksByRoute[routeId] || ["/data/site-index.json"]).map((href) => `${i18nConfig.siteUrl}${href}`);
}

function structuredDataScript(route: RouteConfig, locale: LocaleConfig) {
  const meta = route.meta[locale.id] || route.meta[defaultLocale.id];
  const canonicalUrl = absoluteUrlFor(locale, route);
  const pageType = schemaPageType(route.id);
  const pageNodeType = pageType === "WebPage" ? "WebPage" : [pageType, "WebPage"];
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "WebSite",
      "@id": `${i18nConfig.siteUrl}/#website`,
      url: `${i18nConfig.siteUrl}/`,
      name: "terra-classic.money",
      description: "Independent, community-maintained information website for Terra Classic, LUNC, and USTC.",
      inLanguage: locale.htmlLang,
      publisher: { "@id": `${i18nConfig.siteUrl}/#maintainers` },
    },
    {
      "@type": "Organization",
      "@id": `${i18nConfig.siteUrl}/#maintainers`,
      name: "terra-classic.money community maintainers",
      url: `${i18nConfig.siteUrl}/about.html`,
      description: "Independent community maintainers of the Terra Classic public information website.",
    },
    {
      "@type": pageNodeType,
      "@id": `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: meta.title,
      description: meta.description,
      isPartOf: { "@id": `${i18nConfig.siteUrl}/#website` },
      inLanguage: locale.htmlLang,
      significantLink: routeDataLinks(route.id),
    },
  ];

  if (locale.id === defaultLocale.id) {
    const itemList = routeItemList(route.id, canonicalUrl);
    if (itemList) graph.push(itemList);
  }

  if (route.id === "home" && locale.id === defaultLocale.id) {
    const faqQuestions = readGeneratedFaqQuestions();
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      url: canonicalUrl,
      inLanguage: locale.htmlLang,
      isPartOf: { "@id": `${canonicalUrl}#webpage` },
      mainEntity: faqQuestions,
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `    <script type="application/ld+json">${json}</script>`;
}

function routeItemList(routeId: string, canonicalUrl: string) {
  if (routeId === "ecosystem") {
    const data = readGeneratedJson<{ categories?: Array<{ id: string; title: string; description: string; entries?: unknown[] }> }>("ecosystem.json");
    return itemListNode(
      `${canonicalUrl}#ecosystem-categories`,
      "Terra Classic ecosystem categories",
      canonicalUrl,
      (data?.categories || []).map((category) => ({
        name: category.title,
        description: `${category.description}. ${category.entries?.length || 0} listed resources.`,
        url: `${canonicalUrl}#${category.id}`,
      })),
    );
  }

  if (routeId === "markets") {
    const data = readGeneratedJson<{
      assetGroups?: Array<{ title: string; categories?: Array<{ id: string; title: string; description: string; entries?: unknown[] }> }>;
    }>("markets.json");
    return itemListNode(
      `${canonicalUrl}#market-categories`,
      "LUNC and USTC market information categories",
      canonicalUrl,
      (data?.assetGroups || []).flatMap((assetGroup) =>
        (assetGroup.categories || []).map((category) => ({
          name: `${assetGroup.title}: ${category.title}`,
          description: `${category.description}. ${category.entries?.length || 0} informational routes.`,
          url: `${canonicalUrl}#${assetGroup.title.toLowerCase()}-${category.id}`,
        })),
      ),
    );
  }

  if (routeId === "roadmap") {
    const data = readGeneratedJson<{ rows?: Array<{ id: string; project: string; category?: string; source?: string }> }>("roadmap.json");
    return itemListNode(
      `${canonicalUrl}#roadmap-projects`,
      "Terra Classic public roadmap rows",
      canonicalUrl,
      (data?.rows || []).map((row) => ({
        name: row.project,
        description: [row.category, row.source].filter(Boolean).join(" - "),
        url: `${canonicalUrl}#${row.id}`,
      })),
    );
  }

  if (routeId === "openWork") {
    const data = readGeneratedJson<{ openPackages?: Array<{ title: string; summary: string; detailUrl: string; status?: string }> }>("open-work.json");
    return itemListNode(
      `${canonicalUrl}#open-work-packages`,
      "Terra Classic open work packages",
      canonicalUrl,
      (data?.openPackages || []).map((workPackage) => ({
        name: workPackage.title,
        description: [workPackage.summary, workPackage.status].filter(Boolean).join(" - "),
        url: workPackage.detailUrl,
      })),
    );
  }

  if (routeId === "brandAssets") {
    return itemListNode(
      `${canonicalUrl}#brand-asset-groups`,
      "Terra Classic downloadable brand asset groups",
      canonicalUrl,
      [
        {
          name: "Full logos",
          description: "Logo sets combining the Terra Classic sign with each brand wordmark.",
          url: `${canonicalUrl}#full-logos`,
        },
        {
          name: "Signs",
          description: "Standalone Terra Classic, LUNC, USTC, and protocol signs.",
          url: `${canonicalUrl}#signs`,
        },
        {
          name: "Key visuals",
          description: "Ready-to-use visual compositions for ecosystem materials.",
          url: `${canonicalUrl}#key-visuals`,
        },
      ],
    );
  }

  return null;
}

function itemListNode(id: string, name: string, url: string, items: Array<{ name: string; description?: string; url?: string }>) {
  if (items.length === 0) return null;

  return {
    "@type": "ItemList",
    "@id": id,
    name,
    url,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: item.name,
        description: item.description || undefined,
        url: item.url || url,
      },
    })),
  };
}

function readGeneratedJson<T>(fileName: string) {
  const filePath = resolve(rootDir, "public/data", fileName);
  if (!existsSync(filePath)) return null;

  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch {
    return null;
  }
}

function readGeneratedFaqQuestions() {
  const faqPath = resolve(rootDir, "public/data/faq.json");
  if (!existsSync(faqPath)) return [];

  try {
    const faq = JSON.parse(readFileSync(faqPath, "utf8")) as {
      groups?: Array<{ page?: string; items?: Array<{ question?: string; answer?: string }> }>;
    };
    return (faq.groups || [])
      .filter((group) => group.page === "home")
      .flatMap((group) => group.items || [])
      .filter((item) => item.question && item.answer)
      .map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      }));
  } catch {
    return [];
  }
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
