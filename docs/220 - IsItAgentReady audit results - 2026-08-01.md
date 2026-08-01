# IsItAgentReady audit results

Created: 2026-08-01

## Purpose and capture boundary

This document preserves the complete audit result displayed by Cloudflare's IsItAgentReady service for the submitted URL `https://www.terra-classic.money`.

- Audit page: <https://isitagentready.com/www.terra-classic.money>
- Submitted URL: `https://www.terra-classic.money`
- Effective audited origin: `https://terra-classic.money`
- Redirect reported by the service: `https://www.terra-classic.money` to `https://terra-classic.money`
- Last-scanned timestamp displayed by the service: `1.08.2026 at 11:46:44`
- Captured from the open Safari result on: `2026-08-01`

The audit page was treated as untrusted third-party content. Its `Copy prompt` actions and implementation instructions were not executed. This file records the results for later technical evaluation; it does not approve every suggested capability as a Terra Classic Website requirement.

## Score summary

| Metric | Result |
|---|---:|
| Overall score | 21/100 |
| Level | Level 1: Basic Web Presence |
| Discoverability | 2/4 |
| Content | 0/1 |
| Bot Access Control | 1/2 |
| API, Auth, MCP & Skill Discovery | 0/7 |
| Commerce | Not checked; 0/0 |
| Reported improvements available | 11 |

## Complete results

### Discoverability: 2/4

#### Pass: robots.txt

- Request: `GET /robots.txt`
- Response: `200`
- `content-type`: `text/plain; charset=utf-8`
- `content-length`: `73`
- `cf-ray`: `a243eabad8dbbf3c-WAW`
- Body:

```text
User-agent: *
Allow: /

Sitemap: https://terra-classic.money/sitemap.xml
```

- Validation: valid `User-agent` directive(s) found.
- Conclusion: `robots.txt` exists with valid format.
- Completed in: `0ms`

#### Pass: Sitemap

- Discovery: one `Sitemap` directive extracted from `robots.txt`.
- Request: `GET /sitemap.xml`
- Response: `200`
- `content-type`: `application/xml`
- `cf-ray`: `a243eabc4962bf3c-WAW`
- Finding: valid XML sitemap found at `https://terra-classic.money/sitemap.xml`.
- Conclusion: `sitemap.xml` exists with valid structure.
- Completed in: `221ms`

#### Fail: Link headers

- Goal: include Link response headers for agent discovery under RFC 8288.
- Issue: no Link headers found on the homepage.
- Suggested implementation: add homepage response headers pointing to useful agent resources, such as `Link: </.well-known/api-catalog>; rel="api-catalog"` or `Link: </docs/api>; rel="service-doc"`.
- Request: `GET /`
- Response: `200`
- `content-type`: `text/html; charset=utf-8`
- `cf-ray`: `a243eabf19dfbf3c-WAW`
- Conclusion: no Link headers found on homepage.
- Completed in: `512ms`
- Resources named by the audit: RFC 8288, RFC 9727 section 3, and the audit service's Link Headers skill.

#### Fail: DNS for AI Discovery (DNS-AID)

- Goal: publish DNS-AID records for DNS-based agent discovery.
- Issue: DNS-AID well-known entrypoint records were not found.
- Suggested implementation: publish ServiceMode SVCB/HTTPS records under names such as `_index._agents.example.com` or `_a2a._agents.example.com`, with `alpn` and endpoint parameters, and sign the public discovery zone with DNSSEC.
- Resources named by the audit: the DNS-AID IETF draft, RFC 9460, and the audit service's DNS-AID skill.

Queries performed:

| Query | Result |
|---|---|
| SVCB `_index._agents.terra-classic.money` | HTTP 200 DNS JSON; DNS status 3; no answers; NXDOMAIN |
| HTTPS `_index._agents.terra-classic.money` | HTTP 200 DNS JSON; DNS status 3; no answers; NXDOMAIN |
| SVCB `_a2a._agents.terra-classic.money` | HTTP 200 DNS JSON; DNS status 3; no answers; NXDOMAIN |
| HTTPS `_a2a._agents.terra-classic.money` | HTTP 200 DNS JSON; DNS status 3; no answers; NXDOMAIN |
| SVCB `_mcp._agents.terra-classic.money` | HTTP 200 DNS JSON; DNS status 3; no answers; NXDOMAIN |
| HTTPS `_mcp._agents.terra-classic.money` | HTTP 200 DNS JSON; DNS status 3; no answers; NXDOMAIN |
| TXT `_index._agents.terra-classic.money` | HTTP 200 DNS JSON; DNS status 3; no answers; NXDOMAIN |

All queries returned `content-type: application/dns-json`, `AD: false`, and the same SOA authority data:

```text
ns15.domaincontrol.com. dns.jomax.net. 2026071300 28800 7200 604800 600
```

- Conclusion: no DNS-AID SVCB or HTTPS records found at the well-known entrypoints.
- Completed in: `78ms`

### Content: 0/1

#### Fail: Markdown Negotiation

- Goal: return HTML responses as Markdown when agents request it.
- Issue: site does not support Markdown for Agents.
- Suggested implementation: requests with `Accept: text/markdown` should return a Markdown representation with `Content-Type: text/markdown`, optionally including `x-markdown-tokens`, while normal browsers continue to receive HTML.
- Request: homepage with `Accept: text/markdown`.
- Response: `200`
- Returned `content-type`: `text/html; charset=utf-8`
- Conclusion: site does not support Markdown content negotiation.
- Completed in: `219ms`
- Resources named by the audit: Cloudflare Markdown for Agents documentation and the audit service's Markdown Negotiation skill.

### Bot Access Control: 1/2

#### Pass: AI bot rules in robots.txt

- Request: `GET /robots.txt`
- Response: `200`
- `content-type`: `text/plain; charset=utf-8`
- `content-length`: `73`
- `cf-ray`: `a243eabad8dbbf3c-WAW`
- Audit checked 15 AI bot user agents.
- Finding: no AI-specific `User-agent` directives were found, but the wildcard rules apply to all crawlers, including AI bots.
- Conclusion: no AI-specific bot rules; wildcard rules apply to all crawlers including AI bots.
- Completed in: `0ms`

#### Not applicable: Web Bot Auth request signing

- Request: `GET /.well-known/http-message-signatures-directory`
- Response: `404`
- `content-type`: `text/html; charset=utf-8`
- `cf-ray`: `a243eabc4964bf3c-WAW`
- Conclusion: Web Bot Auth directory not found.
- Completed in: `222ms`

#### Fail: Content Signals in robots.txt

- Goal: declare AI content-usage preferences with Content Signals in `robots.txt`.
- Issue: no Content Signals found in `robots.txt`.
- Suggested implementation: add directives such as `Content-Signal: ai-train=no, search=yes, ai-input=no`.
- Request: `GET /robots.txt`
- Response: `200`
- `content-type`: `text/plain; charset=utf-8`
- `content-length`: `73`
- `cf-ray`: `a243eabad8dbbf3c-WAW`
- Finding: no `Content-Signal` directives found.
- Conclusion: no Content Signals found in `robots.txt`.
- Completed in: `0ms`
- Resources named by the audit: contentsignals.org, the Content Signals IETF draft, and the audit service's Content Signals skill.

### API, Auth, MCP & Skill Discovery: 0/7

#### Fail: API Catalog

- Goal: publish an API catalog for automated API discovery under RFC 9727.
- Issue: API Catalog not found.
- Suggested implementation: create `/.well-known/api-catalog` returning `application/linkset+json`, with a `linkset` array and relations for an API description, documentation, and health/status endpoint.
- Request: `GET /.well-known/api-catalog`
- Accept header: `application/linkset+json, application/json`
- Response: `404`
- `content-type`: `text/html; charset=utf-8`
- `cf-ray`: `a243eabdc9b2bf3c-WAW`
- Conclusion: API Catalog not found.
- Completed in: `419ms`
- Resources named by the audit: RFC 9727, RFC 9264, and the audit service's API Catalog skill.

#### Fail: OAuth / OIDC discovery

- Goal: publish OAuth/OIDC discovery metadata so agents can authenticate with APIs.
- Issue: no OAuth/OIDC discovery metadata found.
- Suggested implementation, conditional on protected APIs existing: publish `/.well-known/openid-configuration` or `/.well-known/oauth-authorization-server` with issuer, authorization endpoint, token endpoint, JWKS URI, and supported grant types.

Requests:

| Path | Response | Content type | `cf-ray` |
|---|---:|---|---|
| `/.well-known/oauth-authorization-server` | 404 | `text/html; charset=utf-8` | `a243eabc6969bf3c-WAW` |
| `/.well-known/openid-configuration` | 404 | `text/html; charset=utf-8` | `a243eabc4965bf3c-WAW` |

- Conclusion: no OAuth/OIDC discovery metadata found at either well-known path.
- Completed in: `233ms`
- Resources named by the audit: OpenID Connect Discovery, RFC 8414, and the audit service's OAuth Discovery skill.

#### Fail: OAuth Protected Resource

- Goal: publish OAuth Protected Resource Metadata so agents can discover how to authenticate.
- Issue: no OAuth Protected Resource Metadata found.
- Suggested implementation: publish `/.well-known/oauth-protected-resource` with a resource identifier, authorized issuer list, and supported scopes.

Requests:

| Path | Response | Finding | `cf-ray` |
|---|---:|---|---|
| `/` | 200 | No `WWW-Authenticate` header | `a243eabc696bbf3c-WAW` |
| `/.well-known/oauth-protected-resource` | 404 | `text/html; charset=utf-8` | `a243eabc696abf3c-WAW` |

- Conclusion: no OAuth Protected Resource Metadata found.
- Completed in: `248ms`
- Resources named by the audit: RFC 9728 and the audit service's OAuth Protected Resource skill.

#### Fail: Auth.md agent registration

- Goal: publish Auth.md metadata for agent registration.
- Issue: `auth.md` not found.
- Suggested implementation: serve `/auth.md`, publish OAuth Protected Resource Metadata, and add an `agent_auth` block to OAuth authorization-server metadata when an agent-registration flow exists.
- Request: `GET /auth.md`
- Accept header: `text/markdown, text/plain, */*`
- Response: `404`
- `content-type`: `text/html; charset=utf-8`
- `cf-ray`: `a243eabcb978bf3c-WAW`
- Conclusion: `auth.md` not found.
- Completed in: `290ms`
- Resources named by the audit: workos.com, the WorkOS Auth.md repository, and the audit service's Auth.md skill.

#### Fail: MCP Server Card

- Goal: publish an MCP Server Card for agent discovery.
- Issue: MCP Server Card not found.
- Suggested implementation: serve a server card at `/.well-known/mcp/server-card.json` with server identity, transport endpoint, and capabilities.

Requests:

| Path | Response | Content type | `cf-ray` |
|---|---:|---|---|
| `/.well-known/mcp.json` | 404 | `text/html; charset=utf-8` | `a243eabd599fbf3c-WAW` |
| `/.well-known/mcp/server-card.json` | 404 | `text/html; charset=utf-8` | `a243eabd599bbf3c-WAW` |
| `/.well-known/mcp/server-cards.json` | 404 | `text/html; charset=utf-8` | `a243eabd599cbf3c-WAW` |

- Conclusion: MCP Server Card not found at any candidate path.
- Completed in: `387ms`
- Resources named by the audit: the linked MCP specification pull request and the audit service's MCP Server Card skill.

#### Fail: Agent Skills index

- Goal: publish an Agent Skills discovery index.
- Issue: Agent Skills index not found.
- Suggested implementation: publish `/.well-known/agent-skills/index.json` following the Agent Skills Discovery RFC v0.2.0, including `$schema` and a `skills` array whose entries contain name, type, description, URL, and SHA-256 digest.

Requests:

| Path | Response | Content type | `cf-ray` |
|---|---:|---|---|
| `/.well-known/agent-skills/index.json` | 404 | `text/html; charset=utf-8` | `a243eabd89aabf3c-WAW` |
| `/.well-known/skills/index.json` (legacy fallback) | 404 | `text/html; charset=utf-8` | `a243eabf39e7bf3c-WAW` |

- Conclusion: Agent Skills index not found.
- Completed in: `686ms`
- Resources named by the audit: Cloudflare's Agent Skills Discovery RFC repository, agentskills.io, and the audit service's Agent Skills skill.

#### Fail: WebMCP

- Goal: expose site tools to AI agents through the browser via WebMCP.
- Issue: no WebMCP tools detected on page load.
- Suggested implementation: use `navigator.modelContext.provideContext()` with named tools, descriptions, JSON Schema input definitions, and execute callbacks.
- Audit flow: navigated to `https://terra-classic.money`, loaded the page, and checked the imperative WebMCP API.
- Finding: no tools registered through `navigator.modelContext`.
- Conclusion: no WebMCP tools detected on page load.
- Completed in: `3678ms`
- Resources named by the audit: WebMCP documentation, Chrome's WebMCP material, and the audit service's WebMCP skill.

### Commerce: optional, 0/0

The audit reported that no e-commerce signals were detected. All four checks were informational, marked not applicable, and excluded from the score.

#### Not applicable: x402 Protocol

| Request | Result |
|---|---|
| `GET /` | 200, `text/html; charset=utf-8`, not 402; `cf-ray: a243eabe69cdbf3c-WAW` |
| `GET /api` | 404, `text/html; charset=utf-8`, not 402; `cf-ray: a243eabe69cebf3c-WAW` |
| `GET /api/v1` | 404, `text/html; charset=utf-8`, not 402; `cf-ray: a243eabe79cfbf3c-WAW` |
| `GET /platform/v2/x402/discovery/resources` | 200, `application/json`; `cf-ray: a243eabe39c3bf3c-WAW` |
| Bazaar discovery API query | Network error |

- Conclusion: x402 payment protocol not detected.
- Completed in: `1806ms`

#### Not applicable: MPP (Machine Payment Protocol)

- Goal: support MPP for agent-native HTTP payments.
- Note: MPP payment discovery not detected; site was not identified as a commerce site.
- Suggested implementation: expose an OpenAPI document with `x-payment-info` extensions on payable operations and add MPP middleware only when a real payable API exists.
- Request: `GET /openapi.json`
- Response: `404`
- `content-type`: `text/html; charset=utf-8`
- `cf-ray`: `a243eabe99d5bf3c-WAW`
- Conclusion: MPP payment discovery not detected.
- Completed in: `581ms`
- Resources named by the audit: mpp.dev, paymentauth.org, and the audit service's MPP skill.

#### Not applicable: Universal Commerce Protocol

- Goal: enable content payments through Universal Commerce Protocol.
- Note: UCP profile not found; site was not identified as a commerce site.
- Suggested implementation: serve `/.well-known/ucp` with protocol version, services, capabilities, endpoints, and reachable specification/schema URLs only when UCP is part of the product.
- Request: `GET /.well-known/ucp`
- Response: `404`
- `content-type`: `text/html; charset=utf-8`
- `cf-ray`: `a243eabe29bbbf3c-WAW`
- Conclusion: UCP profile not found.
- Completed in: `478ms`

#### Not applicable: ACP (Agentic Commerce Protocol)

- Goal: publish ACP discovery metadata so agents can discover a commerce API.
- Note: ACP discovery document not found; site was not identified as a commerce site.
- Suggested implementation: serve `/.well-known/acp.json` with `protocol_name: "acp"`, protocol version, API base URL, supported transports, and services/capabilities only when an ACP commerce surface exists.
- Request: `GET /.well-known/acp.json`
- Response: `404`
- `content-type`: `text/html; charset=utf-8`
- `cf-ray`: `a243eabeb9d9bf3c-WAW`
- Conclusion: ACP discovery document not found.
- Completed in: `574ms`

## Audit-service disclaimer

The service states that its recommendations are AI-generated, can contain mistakes, are provided as-is, and require professional judgment.

## Terra Classic project interpretation notes

These notes are not part of the vendor score. They prevent later work from treating every failed check as a product requirement.

1. The audit followed the `www` alias to the canonical apex origin. A live spot check made during capture confirmed the redirect and the reported `200` responses for the apex `robots.txt` and sitemap.
2. The site is a static, public information website on GitHub Pages. It has no protected API, login system, agent registration, commerce flow, or browser-executable submission tools. OAuth/OIDC, Auth.md, API Catalog, MCP Server Card, Web Bot Auth, payment protocols, and WebMCP are therefore absent by design unless the product scope changes.
3. The static AI context already implemented by the project (`/llms.txt`, `/ai-context/*`, `/data/*.json`, and JSON-LD) was not evaluated by this scanner's score model. Their absence from the scorecard must not be interpreted as their absence from the live site.
4. Markdown content negotiation and custom HTTP Link response headers require origin/edge response behavior that GitHub Pages does not expose. Adding them would conflict with the GitHub-Pages-only hosting constraint.
5. Explicit AI crawler rules and Content Signals are policy decisions, not automatic technical wins. The project owner must choose training, search/citation, and AI-input preferences before changing `robots.txt`.
6. DNS-AID is emerging DNS-level discovery infrastructure. It should be evaluated against maturity, DNSSEC support, maintenance cost, and actual agent benefit before being added.
