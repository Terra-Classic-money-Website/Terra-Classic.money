import { chromeContent as enChromeContent } from "./en/chrome";
import { chromeContent as arChromeContent } from "./ar/chrome";
import { chromeContent as deChromeContent } from "./de/chrome";
import { chromeContent as esChromeContent } from "./es/chrome";
import { chromeContent as frChromeContent } from "./fr/chrome";
import { chromeContent as hiChromeContent } from "./hi/chrome";
import { chromeContent as idChromeContent } from "./id/chrome";
import { chromeContent as plChromeContent } from "./pl/chrome";
import { chromeContent as ptBrChromeContent } from "./pt-BR/chrome";
import { chromeContent as thChromeContent } from "./th/chrome";
import { chromeContent as trChromeContent } from "./tr/chrome";
import { chromeContent as zhCnChromeContent } from "./zh-CN/chrome";
import { defaultLocale, type LocaleId } from "../config";

const chromeContentByLocale = {
  en: enChromeContent,
  tr: trChromeContent,
  id: idChromeContent,
  de: deChromeContent,
  hi: hiChromeContent,
  th: thChromeContent,
  ar: arChromeContent,
  "pt-BR": ptBrChromeContent,
  "zh-CN": zhCnChromeContent,
  pl: plChromeContent,
  es: esChromeContent,
  fr: frChromeContent,
} as const;

export function getChromeContent(localeId: LocaleId) {
  return chromeContentByLocale[localeId] || chromeContentByLocale[defaultLocale.id];
}
