# AI agent readiness implementation

Created: 2026-08-01

## Scope

This task applies the useful findings in audit records 220 and 221 without changing the website's visible layout, content hierarchy, controls, motion, or interaction model.

The implementation remains a static GitHub Pages site. It does not add a server, authentication system, transaction surface, or external hosting dependency.

## Audit decisions

The two reports mixed retrieval problems with checks for products that terra-classic.money does not provide.

The implementation addresses these retrieval gaps:

- the initial HTML contained an empty React root;
- agents needed a consolidated context file;
- the site did not publish an update feed or HTML discovery links;
- `robots.txt` did not state inference and reference-use preferences;
- the build did not prevent an empty HTML shell from returning.

The implementation rejects these score-only additions:

| Audit suggestion | Decision |
|---|---|
| OAuth, OIDC, protected-resource metadata, or `auth.md` | The site has no accounts or protected API. Publishing metadata would describe a service that does not exist. |
| MCP, A2A, Agent Skills, or WebMCP | The site exposes no executable agent tools or browser action surface. |
| OpenAPI or API Catalog | The current JSON files are static datasets. They do not form an operational API contract. |
| x402, MPP, UCP, or ACP | The site has no checkout, payable API, or commerce workflow. |
| Web Bot Auth | GitHub Pages cannot sign responses for verified bot requests. |
| DNS-AID | The draft requires DNS records and DNSSEC work outside this repository. The website does not expose an agent service that needs DNS discovery. |
| HTTP `Link` headers | GitHub Pages does not provide repository-controlled response headers. HTML discovery links cover the static resources the site publishes. |
| `Accept: text/markdown` negotiation | GitHub Pages cannot vary a route response by request header. Static Markdown resources provide the supported alternative. |

## Static HTML generation

The production build now renders every configured route and published locale into the matching file in `dist`. The current matrix contains 12 routes and 12 locales, for 144 HTML files.

`src/prerender/render.tsx` owns the server-rendered route tree. `scripts/prerender-html.mjs` loads that tree through Vite, uses React's static `prerender` API to resolve all lazy Suspense sections, applies the existing reviewed rendered-text maps to localized output, and replaces the empty root in each built file.

Localized files use a compact semantic form because the client replaces them instead of hydrating them. The compactor keeps headings, paragraphs, lists, tables, links, navigation, meaningful image alternatives, and accessibility labels. It removes React resource hints, layout wrappers, classes, styles, and decorative nodes from the static copy. This reduced the localized HTML payload from about 8.2 MiB to about 4.4 MiB without removing readable page content.

Each root carries these diagnostics:

```text
data-agent-prerendered="true"
data-agent-prerender-route="..."
data-agent-prerender-locale="..."
```

English pages hydrate the static markup. Localized pages retain the current client translation system. An early head style keeps their prerendered copy hidden only while JavaScript replaces it, matching the previous translated-page loading behavior. Visitors without JavaScript receive the translated static page.

Open Work detail routes depend on a query string that GitHub Pages cannot evaluate during a build. Their static fallback presents the full Open Work package index. The client replaces it with the selected package before reveal when JavaScript runs.

The sidebar storage hook now starts from its configured route default during hydration, then reads the visitor's saved preference in a layout effect. This prevents server access to `localStorage` and preserves the saved browser state before paint.

## Discovery and policy files

The agent generator now publishes:

- `/llms.txt`, with the proposal's H1 and blockquote structure;
- `/llms-full.txt`, combining site, policy, FAQ, and Open Work context;
- `/feed.xml`, an Atom snapshot of the public route surface;
- the existing `/ai-context/*.md` files and `/data/*.json` datasets.

Every built page links to the sitemap, `llms.txt`, and Atom feed in its head.

`robots.txt` now names the current OpenAI, Anthropic, and Perplexity search or user-request crawlers. Its Content Signal permits search, answer grounding, citation, and reference use:

```text
Content-Signal: search=yes, ai-input=yes, use=reference
```

The file does not set `ai-train`. The owner has not made a training-rights decision, so the site neither grants nor restricts that use through Content Signals.

## Client diagnostics

Recoverable English hydration failures use the console label `HYDRATION_ERROR`, which gives Codex a stable error string to request from a browser trace.

Localized pages keep the existing `data-localized-dom-ready="true"` signal after the translation pass.

## Automated validation

`tests/validate-prerendered-html.mjs` checks every built route and locale for:

- the expected route and locale markers;
- matching `lang` and `dir` values;
- semantic `nav`, `main`, and H1 elements in initial HTML;
- a minimum initial text payload;
- no incomplete Suspense boundary, fallback template, or client-repair runtime;
- recognized localized text in non-English files;
- `llms.txt` and Atom discovery links.

The production build now runs:

```bash
npm run agent:prerender
AGENT_VALIDATE_DIST=1 npm run agent:validate
npm run agent:validate-prerender
```

The agent validator also checks the Atom feed, consolidated context, sitemap, crawler rules, Content Signal, and built JSON-LD.

The performance gate keeps separate limits for interactive runtime assets, prerendered HTML, and agent context files. Prerendered HTML has a 5.5 MiB cap. JavaScript, CSS, fonts, and images remain under the existing 19.75 MiB runtime cap.

The visual runner now supports an existing `VISUAL_BASE_URL` correctly. This keeps targeted diagnostics usable when Codex already has a production preview running.

## Validation record

Completed during implementation:

- TypeScript check passed.
- i18n static validation passed for 12 locales and 12 routes.
- agent context validation passed for generated public files.
- Vite production compilation passed.
- prerender generation completed for 144 files.
- prerendered HTML validation passed for 144 files after correcting the validator's root extraction boundary.
- the full `npm run check` gate passed, including the paused-route guard and rendered translation audit;
- performance budgets passed: 18.81 MiB runtime, 5.12 MiB prerendered HTML, 169.3 KiB agent context, 97.0 KiB homepage initial JavaScript, 155.8 KiB total JavaScript, and 45.2 KiB total CSS;
- browser checks passed for Home, Ecosystem, Roadmap, Analytics, Open Work detail, French Home, Ecosystem and Roadmap, Arabic Home, and the decentralization page at mobile and desktop widths;
- JavaScript-disabled checks passed for English, French, Arabic, and decentralization static content;
- the agent Lighthouse audit passed its accessibility-tree, cumulative-layout-shift, and `llms.txt` checks; WebMCP checks were correctly not applicable;
- the complete visual snapshot matrix captured 28 route/viewport combinations. It exposed two incomplete Suspense boundaries on the decentralization page; switching the renderer to React's static `prerender` API and giving the server and client the same synchronous section tree resolved them without leaving streaming repair scripts in the HTML. The route remains far below its page JavaScript budget, and the targeted mobile and desktop rerun is console-clean;
- sampled and visual-audit pages produced no remaining console warnings, console errors, page errors, or recoverable hydration errors.

There is no checked-in visual baseline, so this task can claim clean rendered captures but not a historical pixel-diff comparison. Creating an approved baseline is separate repository maintenance and would intentionally add image fixtures.

## Repository note

The root `.gitignore` ignores `docs/`. This file exists in the local project record but does not appear in normal Git status. Changing that repository-wide policy would expose a large historical documentation backlog, so this task does not alter it.
