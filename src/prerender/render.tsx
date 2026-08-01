import { StrictMode, type ReactNode } from "react";
import { prerender } from "react-dom/static";
import App from "../App";
import { SiteShell } from "../components/SiteShell";
import type { RouteId } from "../i18n/config";
import { AboutPage } from "../pages/AboutPage";
import { BrandAssetsPage } from "../pages/BrandAssetsPage";
import { DecentralizationPage } from "../pages/DecentralizationPage";
import { EcosystemPage } from "../pages/EcosystemPage";
import { MarketsPage } from "../pages/MarketsPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { OpenWorkPage } from "../pages/OpenWorkPage";
import { PrivacyPolicyPage } from "../pages/PrivacyPolicyPage";
import { RoadmapPage } from "../pages/RoadmapPage";
import { WebsiteAnalyticsPage } from "../pages/WebsiteAnalyticsPage";

type PrerenderGlobal = typeof globalThis & {
  __TC_PRERENDER_URL__?: string;
};

function shell(children: ReactNode, options: { sidebarDefaultCollapsed?: boolean; sidebarStorageKey?: string } = {}) {
  return (
    <SiteShell
      sidebarDefaultCollapsed={options.sidebarDefaultCollapsed}
      sidebarStorageKey={options.sidebarStorageKey}
    >
      {children}
    </SiteShell>
  );
}

function routeTree(routeId: RouteId) {
  switch (routeId) {
    case "home":
      return <App />;
    case "ecosystem":
      return shell(<EcosystemPage />);
    case "markets":
      return shell(<MarketsPage />);
    case "roadmap":
      return shell(<RoadmapPage />, {
        sidebarDefaultCollapsed: true,
        sidebarStorageKey: "tcm-roadmap-sidebar-collapsed",
      });
    case "decentralization":
      return shell(<DecentralizationPage />);
    case "openWork":
      return shell(<OpenWorkPage />);
    case "openWorkDetail":
      // Query-string variants cannot be generated independently on GitHub Pages.
      // The static fallback exposes the complete package index; the client replaces
      // it with the selected package when JavaScript is available.
      return shell(<OpenWorkPage />);
    case "about":
      return shell(<AboutPage />);
    case "analytics":
      return shell(<WebsiteAnalyticsPage />);
    case "privacy":
      return shell(<PrivacyPolicyPage />);
    case "brandAssets":
      return shell(<BrandAssetsPage />);
    case "notFound":
      return shell(<NotFoundPage />, { sidebarStorageKey: "tcm-sidebar-collapsed-404" });
  }
}

export async function renderRoute(routeId: RouteId, url: string) {
  const prerenderGlobal = globalThis as PrerenderGlobal;
  prerenderGlobal.__TC_PRERENDER_URL__ = url;

  try {
    const { prelude, postponed } = await prerender(<StrictMode>{routeTree(routeId)}</StrictMode>);
    if (postponed) throw new Error(`Static rendering did not finish for route ${routeId}.`);
    return new Response(prelude).text();
  } finally {
    delete prerenderGlobal.__TC_PRERENDER_URL__;
  }
}
