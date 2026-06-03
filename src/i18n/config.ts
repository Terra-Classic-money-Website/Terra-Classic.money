import rawConfig from "./site-i18n.json";

export type LocaleId = "en" | "tr" | "id" | "de" | "hi" | "th" | "pt-BR";

export type LocaleConfig = {
  id: LocaleId;
  label: string;
  nativeLabel: string;
  shortLabel: string;
  htmlLang: string;
  dir: "ltr" | "rtl";
  pathPrefix: string;
  default: boolean;
  published: boolean;
};

export type RouteId =
  | "home"
  | "ecosystem"
  | "markets"
  | "roadmap"
  | "decentralization"
  | "openWork"
  | "openWorkDetail"
  | "about"
  | "analytics"
  | "privacy"
  | "brandAssets"
  | "notFound";

export type RouteMeta = {
  title: string;
  description: string;
};

export type LocalizedRoute = {
  id: RouteId;
  sourcePath: string;
  localizedPath: string;
  entry: string;
  robots?: string;
  publishedLocales: LocaleId[];
  meta: Record<LocaleId, RouteMeta>;
};

type SiteI18nConfig = {
  siteUrl: string;
  locales: LocaleConfig[];
  targetLocales: Array<{
    id: string;
    label: string;
    nativeLabel: string;
    htmlLang: string;
    status: string;
  }>;
  routes: LocalizedRoute[];
};

export const i18nConfig = rawConfig as SiteI18nConfig;
export const locales = i18nConfig.locales;
export const publishedLocales = locales.filter((locale) => locale.published);
export const defaultLocale = locales.find((locale) => locale.default) || locales[0];
export const localizedRoutes = i18nConfig.routes;

export function getLocale(localeId: string | null | undefined) {
  return locales.find((locale) => locale.id === localeId);
}

export function getPublishedLocale(localeId: string | null | undefined) {
  return publishedLocales.find((locale) => locale.id === localeId);
}

export function getRouteBySourcePath(sourcePath: string) {
  const normalized = sourcePath.replace(/^\/+/, "") || "index.html";
  return localizedRoutes.find((route) => route.sourcePath === normalized || route.localizedPath === normalized);
}
