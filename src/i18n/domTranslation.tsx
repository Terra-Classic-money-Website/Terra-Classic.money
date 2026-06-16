import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { defaultLocale, getPublishedLocale, type LocaleId } from "./config";
import { getCurrentLocaleId } from "./routing";

type TextMap = Record<string, string>;

const TRANSLATABLE_ATTRIBUTES = ["aria-label", "alt", "title", "placeholder"] as const;
const SKIP_TEXT_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"]);

async function getRenderedTextTranslations(localeId: LocaleId): Promise<TextMap | null> {
  if (localeId === "ar") {
    const module = await import("./content/ar/renderedText.json");
    return module.default;
  }

  if (localeId === "tr") {
    const module = await import("./content/tr/renderedText.json");
    return module.default;
  }

  if (localeId === "id") {
    const module = await import("./content/id/renderedText.json");
    return module.default;
  }

  if (localeId === "de") {
    const module = await import("./content/de/renderedText.json");
    return module.default;
  }

  if (localeId === "hi") {
    const module = await import("./content/hi/renderedText.json");
    return module.default;
  }

  if (localeId === "th") {
    const module = await import("./content/th/renderedText.json");
    return module.default;
  }

  if (localeId === "pt-BR") {
    const module = await import("./content/pt-BR/renderedText.json");
    return module.default;
  }

  if (localeId === "zh-CN") {
    const module = await import("./content/zh-CN/renderedText.json");
    return module.default;
  }

  if (localeId === "pl") {
    const module = await import("./content/pl/renderedText.json");
    return module.default;
  }

  return null;
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function shouldSkipTextNode(node: Text) {
  let parent = node.parentElement;
  while (parent) {
    if (SKIP_TEXT_TAGS.has(parent.tagName)) return true;
    parent = parent.parentElement;
  }
  return false;
}

function translateTextNodes(root: ParentNode, translations: TextMap) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue || !normalizeText(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      if (shouldSkipTextNode(node as Text)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node = walker.nextNode() as Text | null;
  while (node) {
    const rawValue = node.nodeValue || "";
    const original = normalizeText(rawValue);
    const translated = translations[original];
    if (translated && translated !== original) {
      const leadingWhitespace = rawValue.match(/^\s*/)?.[0] || "";
      const trailingWhitespace = rawValue.match(/\s*$/)?.[0] || "";
      node.nodeValue = `${leadingWhitespace}${translated}${trailingWhitespace}`;
    }
    node = walker.nextNode() as Text | null;
  }
}

function translateAttributes(root: ParentNode, translations: TextMap) {
  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll("*"))] : Array.from(root.querySelectorAll("*"));

  for (const element of elements) {
    for (const attribute of TRANSLATABLE_ATTRIBUTES) {
      const value = element.getAttribute(attribute);
      if (!value) continue;
      const translated = translations[normalizeText(value)];
      if (translated && translated !== value) element.setAttribute(attribute, translated);
    }
  }
}

function translateDom(root: ParentNode, translations: TextMap) {
  translateTextNodes(root, translations);
  translateAttributes(root, translations);
}

function DomTranslator({ translations }: { translations: TextMap }) {
  useLayoutEffect(() => {
    let observer: MutationObserver | null = null;
    let readyTimer: number | null = null;

    const scheduleReady = () => {
      if (readyTimer !== null) window.clearTimeout(readyTimer);
      delete document.documentElement.dataset.localizedDomReady;
      readyTimer = window.setTimeout(() => {
        document.documentElement.dataset.localizedDomReady = "true";
        readyTimer = null;
      }, 200);
    };

    translateDom(document.body, translations);
    scheduleReady();

    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          const parent = mutation.target.parentElement;
          if (parent) translateDom(parent, translations);
          continue;
        }

        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType === Node.TEXT_NODE) {
            const parent = node.parentElement;
            if (parent) translateDom(parent, translations);
            continue;
          }

          if (node.nodeType === Node.ELEMENT_NODE) {
            translateDom(node as Element, translations);
          }
        }
      }

      scheduleReady();
    });

    observer.observe(document.body, {
      characterData: true,
      childList: true,
      subtree: true,
    });

    return () => {
      if (readyTimer !== null) window.clearTimeout(readyTimer);
      observer?.disconnect();
      delete document.documentElement.dataset.localizedDomReady;
    };
  }, [translations]);

  return null;
}

function LocaleLoadError() {
  return (
    <main style={{ padding: "32px", fontFamily: "system-ui, sans-serif" }}>
      <p>Localized content could not be loaded. Please refresh the page.</p>
    </main>
  );
}

export function LocalizedDomTextProvider({ children }: { children: ReactNode }) {
  const localeId = getCurrentLocaleId();
  const locale = getPublishedLocale(localeId) || defaultLocale;
  const [translations, setTranslations] = useState<TextMap | null>(() => localeId === defaultLocale.id ? {} : null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale.htmlLang;
    document.documentElement.dir = locale.dir;
  }, [locale.dir, locale.htmlLang]);

  useEffect(() => {
    if (localeId === defaultLocale.id) return;

    let cancelled = false;
    void getRenderedTextTranslations(localeId)
      .then((loadedTranslations) => {
        if (!cancelled) setTranslations(loadedTranslations || {});
      })
      .catch((error) => {
        console.warn("LOCALIZED_TEXT_LOAD_FAILED", error);
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [localeId]);

  if (failed) return <LocaleLoadError />;
  if (localeId !== defaultLocale.id && !translations) return null;

  return (
    <>
      {localeId !== defaultLocale.id && translations ? <DomTranslator translations={translations} /> : null}
      {children}
    </>
  );
}
