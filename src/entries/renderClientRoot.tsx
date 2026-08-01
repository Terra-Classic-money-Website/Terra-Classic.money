import { type ReactNode } from "react";
import { flushSync } from "react-dom";
import { createRoot, hydrateRoot } from "react-dom/client";
import { defaultLocale } from "../i18n/config";
import { getCurrentLocaleId } from "../i18n/routing";

export function renderClientRoot(node: ReactNode, { forceClientRender = false } = {}) {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("The application root element is missing.");

  const canHydrate = rootElement.dataset.agentPrerendered === "true"
    && getCurrentLocaleId() === defaultLocale.id
    && !forceClientRender;

  if (canHydrate) {
    hydrateRoot(rootElement, node, {
      onRecoverableError(error) {
        console.error("HYDRATION_ERROR", error);
      },
    });
    return;
  }

  const root = createRoot(rootElement);
  if (forceClientRender) {
    flushSync(() => root.render(node));
    document.documentElement.classList.remove("tc-client-replace");
  } else {
    root.render(node);
  }
}
