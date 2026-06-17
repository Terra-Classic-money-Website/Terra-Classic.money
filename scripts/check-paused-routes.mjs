import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();

const pausedRoutes = [
  {
    id: "decentralizationScorecard",
    sourcePath: "decentralization-scorecard.html",
    reason: "Decentralization Scorecard is paused and must not be published to main.",
  },
];

const configPath = path.join(rootDir, "src", "i18n", "site-i18n.json");
const config = JSON.parse(await fs.readFile(configPath, "utf8"));
const failures = [];

async function exists(relativePath) {
  try {
    await fs.access(path.join(rootDir, relativePath));
    return true;
  } catch {
    return false;
  }
}

for (const pausedRoute of pausedRoutes) {
  const configuredRoute = config.routes.find((route) => (
    route.id === pausedRoute.id ||
    route.sourcePath === pausedRoute.sourcePath ||
    route.localizedPath === pausedRoute.sourcePath
  ));

  if (configuredRoute) {
    failures.push(
      `${pausedRoute.reason} Remove route "${configuredRoute.id}" from src/i18n/site-i18n.json before publishing.`,
    );
  }

  if (await exists(path.join("dist", pausedRoute.sourcePath))) {
    failures.push(
      `${pausedRoute.reason} Build output dist/${pausedRoute.sourcePath} exists.`,
    );
  }
}

if (failures.length > 0) {
  console.error("Paused route guard failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Paused route guard passed for ${pausedRoutes.length} paused route${pausedRoutes.length === 1 ? "" : "s"}.`);
