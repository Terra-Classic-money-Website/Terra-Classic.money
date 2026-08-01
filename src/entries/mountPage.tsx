import { StrictMode, type ReactNode } from "react";
import { initializeAnalytics } from "../analytics";
import { SiteShell } from "../components/SiteShell";
import { LocalizedDomTextProvider } from "../i18n/domTranslation";
import { renderClientRoot } from "./renderClientRoot";

export function mountPage(
  children: ReactNode,
  options: {
    sidebarDefaultCollapsed?: boolean;
    sidebarStorageKey?: string;
    forceClientRender?: boolean;
  } = {},
) {
  initializeAnalytics();

  renderClientRoot(
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
    { forceClientRender: options.forceClientRender },
  );
}
