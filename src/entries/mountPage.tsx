import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { initializeAnalytics } from "../analytics";
import { SiteShell } from "../components/SiteShell";
import { LocalizedDomTextProvider } from "../i18n/domTranslation";

export function mountPage(
  children: ReactNode,
  options: {
    sidebarDefaultCollapsed?: boolean;
    sidebarStorageKey?: string;
  } = {},
) {
  initializeAnalytics();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <LocalizedDomTextProvider>
        <SiteShell
          sidebarDefaultCollapsed={options.sidebarDefaultCollapsed}
          sidebarStorageKey={options.sidebarStorageKey}
        >
          {children}
        </SiteShell>
      </LocalizedDomTextProvider>
    </StrictMode>,
  );
}
