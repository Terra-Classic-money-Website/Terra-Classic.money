import { mountPage } from "./mountPage";
import { RoadmapPage } from "../pages/RoadmapPage";
import "../styles/tokens.css";
import "../styles/base.css";
import "../styles/chrome.css";
import "../styles/components.css";
import "../styles/pages/roadmap.css";

mountPage(<RoadmapPage />, {
  sidebarDefaultCollapsed: true,
  sidebarStorageKey: "tcm-roadmap-sidebar-collapsed",
});
