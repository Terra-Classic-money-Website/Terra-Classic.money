import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../App";
import { initializeAnalytics } from "../analytics";
import { LocalizedDomTextProvider } from "../i18n/domTranslation";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/chrome.css";
import "../styles/components.css";
import "../styles/visual-panels.css";
import "../styles/pages/home.css";
import "../styles/community.css";

initializeAnalytics();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocalizedDomTextProvider>
      <App />
    </LocalizedDomTextProvider>
  </StrictMode>,
);
