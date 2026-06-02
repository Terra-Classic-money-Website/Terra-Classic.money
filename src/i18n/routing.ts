import { defaultLocale, getPublishedLocale, localizedRoutes, publishedLocales, type LocaleId } from "./config";

function trimBasePath(pathname: string) {
  const base = import.meta.env.BASE_URL || "/";
  if (base === "/" || !pathname.startsWith(base)) return pathname;
  return `/${pathname.slice(base.length)}`;
}

function normalizePathname(pathname: string) {
  const trimmed = trimBasePath(pathname).replace(/^\/+/, "");
  return trimmed || "index.html";
}

function stripLocalePrefix(pathname: string) {
  const normalized = normalizePathname(pathname);

  for (const locale of publishedLocales) {
    if (locale.default || !locale.pathPrefix) continue;
    if (normalized === locale.pathPrefix) return { locale: locale.id, path: "index.html" };
    if (normalized.startsWith(`${locale.pathPrefix}/`)) {
      return {
        locale: locale.id,
        path: normalized.slice(locale.pathPrefix.length + 1) || "index.html",
      };
    }
  }

  return { locale: defaultLocale.id, path: normalized };
}

export function getCurrentLocaleId(pathname = typeof window !== "undefined" ? window.location.pathname : "/"): LocaleId {
  const { locale } = stripLocalePrefix(pathname);
  return locale as LocaleId;
}

export function getCurrentRoutePath(pathname = typeof window !== "undefined" ? window.location.pathname : "/") {
  return stripLocalePrefix(pathname).path;
}

export function getRouteForPath(pathname = typeof window !== "undefined" ? window.location.pathname : "/") {
  const routePath = getCurrentRoutePath(pathname);
  return localizedRoutes.find((route) => route.sourcePath === routePath || route.localizedPath === routePath);
}

export function withLocalePath(path: string, localeId = getCurrentLocaleId()) {
  if (path.startsWith("http") || path.startsWith("mailto:")) return path;

  const locale = getPublishedLocale(localeId) || defaultLocale;
  if (path.startsWith("#")) {
    const localeRoot = locale.default || !locale.pathPrefix ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}${locale.pathPrefix}/`;
    return `${localeRoot}${path}`;
  }

  const [withoutHash, hash = ""] = path.split("#");
  const [withoutQuery, query = ""] = withoutHash.split("?");
  const cleanPath = withoutQuery.replace(/^\/+/, "") || "index.html";
  const route = localizedRoutes.find((candidate) => (
    candidate.sourcePath === cleanPath || candidate.localizedPath === cleanPath
  ));
  const routePath = route?.localizedPath || cleanPath;
  const localizedPath = locale.default || !locale.pathPrefix ? routePath : `${locale.pathPrefix}/${routePath}`;
  const suffix = `${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;

  if (!locale.default && locale.pathPrefix && routePath === "index.html") {
    return `${import.meta.env.BASE_URL}${locale.pathPrefix}/${suffix}`;
  }
  if (localizedPath === "index.html") return `${import.meta.env.BASE_URL}${suffix}`;
  return `${import.meta.env.BASE_URL}${localizedPath}${suffix}`;
}

export function equivalentPathForLocale(localeId: LocaleId, currentUrl = typeof window !== "undefined" ? window.location.href : "/") {
  const url = new URL(currentUrl, "https://terra-classic.money");
  const currentRoutePath = getCurrentRoutePath(url.pathname);
  const route = localizedRoutes.find((candidate) => (
    candidate.sourcePath === currentRoutePath || candidate.localizedPath === currentRoutePath
  ));

  if (!route || !route.publishedLocales.includes(localeId)) return null;

  const basePath = route.localizedPath === "index.html" ? "" : route.localizedPath;
  const localized = withLocalePath(basePath || "index.html", localeId);
  return `${localized}${url.search}${url.hash}`;
}

export function matchSupportedLocale(preferredLanguages: readonly string[]) {
  for (const preferredLanguage of preferredLanguages) {
    const normalized = preferredLanguage.toLowerCase();
    const exactMatch = publishedLocales.find((locale) => locale.id.toLowerCase() === normalized);
    if (exactMatch) return exactMatch.id;

    const baseLanguage = normalized.split("-")[0];
    const baseMatch = publishedLocales.find((locale) => locale.id.toLowerCase().split("-")[0] === baseLanguage);
    if (baseMatch) return baseMatch.id;
  }

  return defaultLocale.id;
}
