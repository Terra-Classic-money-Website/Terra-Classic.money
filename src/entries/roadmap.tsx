import { mountPage } from "./mountPage";
import { RoadmapPage } from "../pages/RoadmapPage";

mountPage(<RoadmapPage />, {
  sidebarDefaultCollapsed: true,
  sidebarStorageKey: "tcm-roadmap-sidebar-collapsed",
});
