import { chromeContent as enChromeContent } from "./en/chrome";
import { chromeContent as deChromeContent } from "./de/chrome";
import { chromeContent as idChromeContent } from "./id/chrome";
import { chromeContent as trChromeContent } from "./tr/chrome";
import { defaultLocale, type LocaleId } from "../config";

const chromeContentByLocale = {
  en: enChromeContent,
  tr: trChromeContent,
  id: idChromeContent,
  de: deChromeContent,
} as const;

export function getChromeContent(localeId: LocaleId) {
  return chromeContentByLocale[localeId] || chromeContentByLocale[defaultLocale.id];
}
