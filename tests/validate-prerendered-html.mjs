import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const config = JSON.parse(await fs.readFile(path.join(rootDir, "src/i18n/site-i18n.json"), "utf8"));
const defaultLocale = config.locales.find((locale) => locale.default);
const publishedLocales = config.locales.filter((locale) => locale.published);
const failures = [];

if (!defaultLocale) throw new Error("The default locale is missing from the i18n configuration.");

function htmlPathFor(locale, route) {
  return locale.default || !locale.pathPrefix
    ? path.join(distDir, route.sourcePath)
    : path.join(distDir, locale.pathPrefix, route.localizedPath);
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

function rootFragment(html) {
  return html.match(/<div\s+id=["']root["'][^>]*>([\s\S]*)<\/div>\s*<\/body>/i)?.[1] || "";
}

function plainText(html) {
  return decodeHtml(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function fail(message) {
  failures.push(message);
}

let checkedPages = 0;

for (const route of config.routes) {
  for (const localeId of route.publishedLocales) {
    const locale = publishedLocales.find((candidate) => candidate.id === localeId);
    if (!locale) continue;

    const relativePath = path.relative(distDir, htmlPathFor(locale, route));
    const html = await fs.readFile(htmlPathFor(locale, route), "utf8");
    const fragment = rootFragment(html);
    const text = plainText(fragment);
    const minimumTextLength = route.robots === "noindex,follow" ? 80 : 300;

    if (!new RegExp(`<html\\s+lang=["']${locale.htmlLang.replace("-", "\\-")}["']\\s+dir=["']${locale.dir}["']`, "i").test(html)) {
      fail(`${relativePath} is missing the configured language and direction.`);
    }
    if (!html.includes('data-agent-prerendered="true"')) fail(`${relativePath} is missing the prerender marker.`);
    if (!html.includes(`data-agent-prerender-route="${route.id}"`)) fail(`${relativePath} has the wrong prerender route marker.`);
    if (!html.includes(`data-agent-prerender-locale="${locale.id}"`)) fail(`${relativePath} has the wrong prerender locale marker.`);
    if (/<!--\$(?:\?|!)-->|<template[^>]+(?:data-msg|id=["']B:)|\$RB=|\$RV=|Switched to client rendering/.test(html)) {
      fail(`${relativePath} contains an incomplete Suspense boundary or client-repair runtime.`);
    }
    if (!fragment.includes("<main")) fail(`${relativePath} is missing semantic main content in initial HTML.`);
    if (!fragment.includes("<nav")) fail(`${relativePath} is missing navigation in initial HTML.`);
    if (!fragment.includes("<h1")) fail(`${relativePath} is missing an H1 in initial HTML.`);
    if (text.length < minimumTextLength) fail(`${relativePath} has only ${text.length} initial-HTML text characters; expected at least ${minimumTextLength}.`);
    if (!html.includes('rel="alternate" type="text/markdown"') || !html.includes('href="https://terra-classic.money/llms.txt"')) {
      fail(`${relativePath} is missing the AI-readable index discovery link.`);
    }
    if (!html.includes('rel="alternate" type="application/atom+xml"') || !html.includes('href="https://terra-classic.money/feed.xml"')) {
      fail(`${relativePath} is missing the Atom discovery link.`);
    }

    if (!locale.default) {
      const translations = JSON.parse(await fs.readFile(path.join(rootDir, "src/i18n/content", locale.id, "renderedText.json"), "utf8"));
      const translatedValues = Object.entries(translations)
        .filter(([source, translated]) => source !== translated && typeof translated === "string" && translated.length >= 8)
        .map(([, translated]) => translated);
      const translatedMatches = translatedValues.filter((translated) => text.includes(translated)).length;
      const minimumMatches = route.robots === "noindex,follow" ? 2 : 5;
      if (translatedMatches < minimumMatches) {
        fail(`${relativePath} has only ${translatedMatches} recognized localized text values; expected at least ${minimumMatches}.`);
      }
    }

    checkedPages += 1;
  }
}

if (failures.length > 0) {
  console.error("Prerendered HTML validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Prerendered HTML validation passed for ${checkedPages} localized pages.`);
