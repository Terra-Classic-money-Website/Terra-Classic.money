import { mountPage } from "./mountPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/chrome.css";
import "../styles/components.css";
import "../styles/visual-panels.css";
import "../styles/pages/not-found.css";

mountPage(<NotFoundPage />, {
  sidebarStorageKey: "tcm-sidebar-collapsed-404",
});
