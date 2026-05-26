import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: env.VITE_BASE_PATH || "/",
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          decentralization: resolve(__dirname, "decentralization.html"),
          ecosystem: resolve(__dirname, "ecosystem.html"),
          markets: resolve(__dirname, "markets.html"),
          openWork: resolve(__dirname, "open-work.html"),
          openWorkDetail: resolve(__dirname, "open-work-detail.html"),
          roadmap: resolve(__dirname, "roadmap.html"),
          about: resolve(__dirname, "about.html"),
        },
      },
    },
  };
});
