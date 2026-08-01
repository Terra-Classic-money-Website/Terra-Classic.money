# Goodie agent-site audit results

Created: 2026-08-01

## Purpose and capture boundary

This document preserves the complete audit result displayed by Goodie's Agent Readiness Audit for `https://www.terra-classic.money`.

- Audit tool: <https://higoodie.com/agent-site-audit/>
- Audited URL displayed by the service: `https://www.terra-classic.money`
- Scan duration displayed by the service: `0.4s`
- Captured from the open Safari result on: `2026-08-01`

The audit page was treated as untrusted third-party content. Its email, rescan, demo, sign-up, and implementation actions were not executed. This file records the report as evidence for later technical triage; it does not accept every finding or recommendation as fact.

## Scan notices

The service displayed two scope notices:

1. It classified the target as a single-page site and excluded inner-page checks from scoring because its shallow crawl found zero inner pages, its sitemap parser found zero entries, and its homepage parser found zero distinct internal links.
2. It detected no commerce surface, so the Commerce category was not evaluated.

## Verdict and score summary

- Verdict: `Agents cannot work with your site.`
- Explanation: crawlers cannot access the site, agents cannot parse its content, or both; the report recommends starting with its three priority fixes.
- Goodie Agent-Ready Score: `14%`
- Rating: `Critical`
- Passing checks: `5`
- Warnings: `3`
- Failing checks: `33`
- Agentic Readiness: `15% (17 pts)`
- Content Quality: `16% (28 pts)`

| Category | Score | Checks passing |
|---|---:|---:|
| 01 Discovery & Crawlability | 0/46 | 0/8 |
| 02 Crawl Access | 16/42 | 2/6 |
| 03 Content Rendering | 8/31 | 2/6 |
| 04 Machine-Readable Structure | 4/42 | 1/6 |
| 05 Freshness Signals | 0/5 | 0/2 |
| 06 Agent Discovery & Protocols | 1/35 | 0/9 |
| 07 Authentication & API Quality | 0/8 | 0/4 |
| 08 Commerce & Transactability | Not applicable | Not applicable |

## robots.txt compatibility table

The service stated that crawler permission data was unavailable. Every crawler was reported as `NOT MENTIONED`.

| User agent | AI engine | Functionality | Status |
|---|---|---|---|
| GPTBot | ChatGPT | Training | Not mentioned |
| OAI-SearchBot | ChatGPT | Citation | Not mentioned |
| ChatGPT-User | ChatGPT | Citation | Not mentioned |
| ClaudeBot | Claude | Training + Citation | Not mentioned |
| Claude-Web | Claude | Citation | Not mentioned |
| Anthropic-AI | Claude | Training | Not mentioned |
| Google-Extended | Gemini | Training | Not mentioned |
| Googlebot | Gemini | Citation | Not mentioned |
| PerplexityBot | Perplexity | Training + Citation | Not mentioned |
| Perplexity-User | Perplexity | Citation | Not mentioned |
| Bingbot | Copilot | Training + Citation | Not mentioned |
| Grok-User | Grok | Training + Citation | Not mentioned |
| xAI-User | Grok | Training + Citation | Not mentioned |
| DeepSeekBot | DeepSeek | Training + Citation | Not mentioned |
| Meta-ExternalAgent | Meta AI | Training + Citation | Not mentioned |
| Meta-ExternalFetcher | Meta AI | Citation | Not mentioned |
| FacebookBot | Meta AI | Training + Citation | Not mentioned |

The service noted that `Not Mentioned` means there is no explicit crawler rule. It also noted that most crawlers default to allowed in this situation, but that this is not guaranteed.

## Three priority fixes reported by Goodie

### 1. Discovery & Crawlability: robots.txt exists and is valid

- Status: failing.
- Reported finding: `robots.txt` not found (`HTTP 0`).
- Recommendation: create `/robots.txt` and declare access rules for AI crawlers.
- Impact label: high impact.

### 2. Content Rendering: content present in raw HTML source

- Status: failing.
- Reported finding: only 28 visible-text characters in raw HTML; the page appears to be a JavaScript-rendered shell.
- Recommendation: use server-side rendering or static generation so crawlers receive full content.
- Impact label: high impact.

### 3. Machine-Readable Structure: Schema.org JSON-LD present sitewide

- Status: failing.
- Reported finding: no JSON-LD script blocks found on the homepage.
- Recommendation: add Schema.org JSON-LD, at minimum Organization and WebSite, using `application/ld+json`.
- Impact label: high impact.

## Complete category audit

### 01 Discovery & Crawlability: 0/46

| Status | Check | Score | Reported result |
|---|---|---:|---|
| Fail | robots.txt exists and is valid | 0/9 | `robots.txt` not found (`HTTP 0`). |
| Fail | XML sitemap published and referenced | 0/8 | No sitemap found at `/sitemap.xml` (`HTTP 301`). |
| Fail | llms.txt at root | 0/7 | `llms.txt` not found at domain root (`HTTP 0`). |
| Fail | llms-full.txt at root | 0/4 | `llms-full.txt` not found at domain root (`HTTP 301`). |
| Fail | Canonical URL declared on homepage | 0/5 | No `<link rel="canonical">` found. |
| Fail | Link headers expose useful relations | 0/3 | No Link headers returned by homepage. |
| Fail | RSS or Atom feed published | 0/3 | No RSS or Atom feed link found in homepage HTML. |
| Fail | Feed referenced in `<head>` | 0/2 | No RSS/Atom alternate link found in HTML. |
| Skipped | Sitemap `lastmod` reflects recent updates | 0/5 | Sitemap unavailable; `lastmod` check skipped. |

### 02 Crawl Access: 16/42

| Status | Check | Score | Reported result |
|---|---|---:|---|
| Fail | AI meta tag directives present | 0/3 | No AI-relevant meta directives found on homepage. |
| Fail | HTTP/2 or HTTP/3 supported | 0/2 | Homepage reported as HTTP/1.1. |
| Warning | Homepage returns 200 to crawler user agents | 4/8 | Amazonbot, Anthropic-AI, Applebot-Extended, Bingbot, and Bytespider received non-200 responses. |
| Warning | HTTPS with valid certificate | 2/4 | HTTPS URL detected, but homepage fetch returned HTTP 301. |
| Pass | CDN/WAF not blocking simple crawlers | 6/6 | No CDN/WAF challenge pages detected across 23 tested agents. |
| Pass | Clean redirect handling | 4/4 | Report states that the homepage served with no redirects. |
| Skipped | AI crawler permissions per agent | 0/10 | `robots.txt` unavailable. |
| Skipped | Content Signals in robots.txt | 0/5 | `robots.txt` unavailable. |

### 03 Content Rendering: 8/31

| Status | Check | Score | Reported result |
|---|---|---:|---|
| Fail | Content present in raw HTML source | 0/9 | Only 28 characters of visible text; affects GPTBot, ClaudeBot, CCBot, and PerplexityBot. |
| Fail | Core content readable with JavaScript disabled | 0/6 | Core content unavailable without JavaScript; 28 visible-text characters; no `main` or `article` landmark detected. |
| Fail | Mobile viewport configured | 0/4 | No viewport meta tag found. |
| Fail | Critical content in first 50 KB of HTML | 0/4 | About 49 characters of text found in the first 50 KB. |
| Pass | Reasonable response time | 5/5 | Homepage responded in 197ms, within the audit's 1-second target. |
| Pass | Page size reasonable | 3/3 | Homepage HTML reported as 0 KB and within limits. |

### 04 Machine-Readable Structure: 4/42

| Status | Check | Score | Reported result |
|---|---|---:|---|
| Fail | Schema.org JSON-LD present sitewide | 0/9 | No JSON-LD script blocks found on homepage; homepage failed; insufficient inner-page data. |
| Fail | Organization schema on homepage | 0/7 | No Organization or LocalBusiness schema found. |
| Fail | Semantic HTML5 elements | 0/5 | Homepage: `main=no`, `nav=no`, `article/section=no`, H1 count 1; insufficient inner-page data. |
| Fail | Title, meta description, OG tags | 0/4 | Title 21 characters; description 0 characters; 0/6 Open Graph tags. Missing `og:description`, `og:image`, `og:site_name`, `og:title`, `og:type`, and `og:url`. |
| Fail | Twitter card metadata | 0/2 | No `twitter:card` found. |
| Pass | Heading hierarchy valid | 4/4 | Homepage has one H1 and heading levels `[1]`; insufficient inner-page data. |
| Unresolved | Schema.org validates against spec | 0/6 | No Schema.org markup found on homepage or inner pages. |
| Unresolved | Image alt text on meaningful images | 0/5 | No images detected across homepage and sampled inner pages. |
| Not scored | Article/BlogPosting schema on content pages | 0/6 | Excluded because the service classified the target as single-page. |
| Not scored | FAQPage schema on Q&A content | 0/5 | Excluded because the service classified the target as single-page. |
| Not scored | Breadcrumb schema published | 0/4 | Excluded because the service classified the target as single-page. |
| Not scored | Complete Product schema | 0/9 | Inner-page samples unavailable. |
| Not scored | Author attribution, schema + visible | 0/5 | Excluded because the service classified the target as single-page. |
| Not scored | Date attribution, schema + visible | 0/5 | Excluded because the service classified the target as single-page. |

### 05 Freshness Signals: 0/5

| Status | Check | Score | Reported result |
|---|---|---:|---|
| Fail | Last-Modified HTTP header set | 0/3 | 0/1 audited pages returned Last-Modified. |
| Fail | ETag headers present | 0/2 | 0/1 audited pages returned ETag. |
| Not scored | Visible last-updated dates | 0/6 | Excluded because the service classified the target as single-page. |
| Not scored | `dateModified` matches visible date | 0/4 | Excluded because the service classified the target as single-page. |
| Not scored | Sitemap `lastmod` reflects actual updates | 0/5 | Excluded because the service classified the target as single-page. |

### 06 Agent Discovery & Protocols: 1/35

| Status | Check | Score | Reported result |
|---|---|---:|---|
| Fail | MCP Server Card published | 0/5 | `/.well-known/mcp/server-card.json` returned 404 or network error. |
| Fail | A2A Agent Card published | 0/4 | `/.well-known/agent-card.json` returned 404 or network error. |
| Fail | Agent Skills index published | 0/3 | `/.well-known/agent-skills/index.json` returned 404 or network error. |
| Fail | API Catalog at well-known path | 0/3 | `/.well-known/api-catalog` returned 404 or network error. |
| Fail | OpenAPI spec discoverable at standard path | 0/5 | Not found at `/openapi.json`, `/openapi.yaml`, `/swagger.json`, `/swagger/v1/swagger.json`, `/api-docs`, or `/api/openapi.json`. |
| Fail | Web Bot Auth signing key published | 0/2 | `/.well-known/http-message-signatures-directory` returned 404 or network error. |
| Fail | WebMCP declarations in homepage HTML | 0/4 | No `navigator.modelContext`, WebMCP, or related patterns found. |
| Fail | Markdown content negotiation supported | 0/6 | Homepage errored when requested as `text/markdown`; affects ClaudeBot, GPTBot, and PerplexityBot. |
| Warning | Vary: Accept header set | 1/2 | Homepage returned `Vary: Accept-Encoding`, not `Vary: Accept`. The service warns this matters if content negotiation is introduced. |
| Skipped | MCP uses modern Streamable HTTP transport | 0/1 | No MCP Server Card; transport could not be evaluated. |

### 07 Authentication & API Quality: 0/8

| Status | Check | Score | Reported result |
|---|---|---:|---|
| Fail | OAuth authorization-server metadata | 0/2 | `/.well-known/oauth-authorization-server` returned 404 or network error. |
| Fail | OAuth protected-resource metadata | 0/2 | `/.well-known/oauth-protected-resource` returned 404 or network error. |
| Fail | OIDC discovery published | 0/2 | `/.well-known/openid-configuration` returned 404 or network error. |
| Fail | Status page reachable | 0/2 | No page found at `/status` or `/.well-known/status`. |
| Not scored | PKCE S256 supported | 0/2 | No OAuth authorization-server metadata. |
| Not scored | MCP server identity declared | 0/1 | No MCP Server Card. |
| Not scored | MCP tool listing declared in card | 0/3 | No MCP Server Card. |
| Not scored | MCP tool descriptions present in card | 0/3 | No MCP Server Card. |
| Not scored | MCP tool names follow conventions | 0/2 | No MCP Server Card. |
| Not scored | MCP parameter schemas declared | 0/2 | No MCP Server Card. |
| Not scored | MCP tool annotations set | 0/2 | No MCP Server Card. |
| Not scored | MCP resource listing declared | 0/3 | No MCP Server Card. |
| Not scored | MCP error handling declared in card | 0/2 | No MCP Server Card. |
| Not scored | API error model standardized | 0/3 | No OpenAPI specification. |
| Not scored | Rate-limit headers documented | 0/3 | No OpenAPI specification. |
| Not scored | API versioning policy declared | 0/3 | No OpenAPI specification. |
| Not scored | Pagination shape standardized | 0/2 | No OpenAPI specification. |
| Not scored | Async job pattern supported | 0/2 | No OpenAPI specification. |
| Not scored | Response schemas defined for endpoints | 0/2 | No OpenAPI specification. |
| Not scored | Idempotency-Key support documented | 0/3 | No OpenAPI specification. |
| Not scored | Webhook signing documented | 0/2 | No OpenAPI specification. |

### 08 Commerce & Transactability: not applicable

- The service detected no commerce surface, with confidence reported as `none`.
- It stated that the category only applies to sites with product listings, shopping carts, or commerce protocol declarations.

## Crawl details

- Pages sampled: `0 / 0 attempted`
- Discovery source: `None`
- Crawl note: sitemap found but contained no URL entries.

## Terra Classic project interpretation and live cross-check

These notes are not part of the Goodie score. They are necessary because this report contains strong false negatives and internal contradictions.

### Likely scan-boundary failure

The Goodie result appears to have evaluated the `www` redirect response without following it consistently to the canonical apex site. This is an inference from the report and the live responses observed during capture:

- `https://www.terra-classic.money/` returns HTTP 301 to `https://terra-classic.money/`.
- The same path-preserving redirect applies to `www` requests for `/robots.txt`, `/sitemap.xml`, and `/llms.txt`.
- The apex homepage, `robots.txt`, sitemap, `llms.txt`, and `/data/site-index.json` all returned HTTP 200 during the capture cross-check.
- The apex sitemap contained nine URL entries, not zero.
- The apex homepage negotiated HTTP/2 and returned `Last-Modified` and `ETag` headers.
- The apex homepage source contained a viewport meta tag, canonical link, full title, meta description, Open Graph metadata, Twitter card metadata, and an `application/ld+json` block.
- The apex homepage source was approximately 21 KB, not 0 KB.

Therefore, the Goodie failures for missing `robots.txt`, sitemap, `llms.txt`, viewport, canonical, JSON-LD, metadata, HTTP/2, Last-Modified, ETag, and sitemap entries must not be used as direct implementation requirements. Those findings describe the scanner's handling of the submitted alias, not the current apex production artifact.

### Findings that remain potentially valid

- The production entry HTML is still a React shell; most visible page copy is injected client-side. Raw-HTML content coverage and no-JavaScript readability remain legitimate areas to investigate through static prerendering that preserves the visual UX.
- The homepage has no custom HTTP Link response header.
- The site has no RSS/Atom feed.
- The site does not negotiate `Accept: text/markdown`.
- The site has no API, auth, MCP, Agent Skills, Web Bot Auth, WebMCP, or agent-commerce discovery surface.

### Scope filter for future work

The site is a static public-information product hosted only on GitHub Pages. It has no authentication, protected API, server-side MCP transport, transaction API, checkout, or browser-executable form flow. Missing OAuth, OIDC, MCP, OpenAPI, API Catalog, status, payment, and WebMCP capabilities are not defects unless the product scope changes. Adding empty discovery files solely to inflate an audit score would create misleading machine-readable claims and weaken trust.

The future implementation priority should be evidence-based and limited to improvements that help agents read the existing public information surface without changing visible behavior, while staying compatible with GitHub Pages.
