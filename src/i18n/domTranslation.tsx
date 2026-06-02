import { useLayoutEffect } from "react";
import { defaultLocale, type LocaleId } from "./config";
import { getCurrentLocaleId } from "./routing";

type TextMap = Record<string, string>;

const TRANSLATABLE_ATTRIBUTES = ["aria-label", "alt", "title", "placeholder"] as const;
const SKIP_TEXT_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE"]);

async function getRenderedTextTranslations(localeId: LocaleId): Promise<TextMap | null> {
  if (localeId === "tr") {
    const module = await import("./content/tr/renderedText.json");
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
    const original = normalizeText(node.nodeValue || "");
    const translated = translations[original];
    if (translated && translated !== original) {
      node.nodeValue = node.nodeValue?.replace(original, translated) || translated;
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

export function LocalizedDomText() {
  useLayoutEffect(() => {
    const localeId = getCurrentLocaleId();
    if (localeId === defaultLocale.id) return;

    let cancelled = false;
    let observer: MutationObserver | null = null;

    void getRenderedTextTranslations(localeId).then((translations) => {
      if (cancelled || !translations) return;

      translateDom(document.body, translations);

      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
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
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, []);

  return null;
}
