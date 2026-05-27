import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { chromium } from "playwright";

const rootDir = process.cwd();
const port = Number(process.env.VISUAL_PORT || 4174);
const baseUrl = process.env.VISUAL_BASE_URL || `http://127.0.0.1:${port}`;
const outputRoot = path.resolve(rootDir, process.env.VISUAL_OUTPUT_DIR || path.join(".visual-reports", timestamp()));
const screenshotsDir = path.join(outputRoot, "screenshots");
const diffsDir = path.join(outputRoot, "diffs");
const baselineDir = process.env.VISUAL_BASELINE_DIR
  ? path.resolve(rootDir, process.env.VISUAL_BASELINE_DIR)
  : null;
const updateBaseline = process.env.VISUAL_UPDATE_BASELINE === "1";
const baselineOutputDir = path.resolve(rootDir, process.env.VISUAL_BASELINE_OUTPUT_DIR || path.join("tests", "visual-baselines"));
const maxDiffRatio = Number(process.env.VISUAL_MAX_DIFF_RATIO || 0.01);

const routeViewports = [
  { page: "home", path: "/", viewports: ["mobile-390", "tablet-768", "tablet-1024", "desktop-1400", "desktop-1632"] },
  { page: "ecosystem", path: "/ecosystem.html", viewports: ["mobile-390", "desktop-1632"] },
  { page: "markets", path: "/markets.html", viewports: ["mobile-390", "desktop-1632"] },
  { page: "roadmap", path: "/roadmap.html", viewports: ["mobile-390", "tablet-1024", "desktop-1632"] },
  { page: "open-work", path: "/open-work.html", viewports: ["mobile-390", "desktop-1632"] },
  {
    page: "open-work-detail",
    path: "/open-work-detail.html?work=forex-protocol-implementation",
    viewports: ["mobile-390", "desktop-1632"],
  },
  { page: "decentralization", path: "/decentralization.html", viewports: ["mobile-390", "desktop-1632"] },
  { page: "about", path: "/about.html", viewports: ["mobile-390", "desktop-1632"] },
  { page: "privacy", path: "/privacy.html", viewports: ["mobile-390", "desktop-1632"] },
];

const viewports = {
  "mobile-390": { width: 390, height: 1000 },
  "tablet-768": { width: 768, height: 1100 },
  "tablet-1024": { width: 1024, height: 1100 },
  "desktop-1400": { width: 1400, height: 1000 },
  "desktop-1632": { width: 1632, height: 1000 },
};

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function fileName(page, viewport) {
  return `${page}-${viewport}.png`;
}

function urlFor(routePath) {
  return new URL(routePath, baseUrl).toString();
}

async function ensureDirs() {
  await fs.mkdir(screenshotsDir, { recursive: true });
  await fs.mkdir(diffsDir, { recursive: true });
  if (updateBaseline) await fs.mkdir(baselineOutputDir, { recursive: true });
}

function startPreviewServer() {
  if (process.env.VISUAL_BASE_URL) return null;

  const child = spawn("npm", ["run", "preview", "--", "--port", String(port)], {
    cwd: rootDir,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "0" },
  });

  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  return child;
}

async function waitForServer(child) {
  const deadline = Date.now() + 30_000;
  let lastError = "";

  while (Date.now() < deadline) {
    if (child?.exitCode !== null) {
      throw new Error(`Preview server exited early with code ${child.exitCode}.`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  throw new Error(`Timed out waiting for ${baseUrl}. Last error: ${lastError}`);
}

async function settlePage(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 1ms !important;
        animation-delay: 0ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0ms !important;
        scroll-behavior: auto !important;
      }
      * {
        content-visibility: visible !important;
        contain-intrinsic-size: auto !important;
      }
    `,
  });

  await page.evaluate(async () => {
    await document.fonts.ready;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const waitForImages = async (timeoutMs = 2_500) => {
      const loaded = Promise.all([...document.images].map((image) => {
        if (!image.currentSrc || image.complete) return Promise.resolve();
        return new Promise((resolve) => {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      }));
      await Promise.race([loaded, delay(timeoutMs)]);
    };
    const maxY = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
    );

    for (let y = 0; y <= maxY; y += Math.max(480, window.innerHeight * 0.75)) {
      window.scrollTo(0, y);
      await delay(140);
    }

    await waitForImages();
    window.scrollTo(0, 0);
    await delay(240);
    await waitForImages(1_200);
  });
}

async function captureAll() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const route of routeViewports) {
      for (const viewportId of route.viewports) {
        const viewport = viewports[viewportId];
        const context = await browser.newContext({
          viewport,
          colorScheme: "light",
          deviceScaleFactor: 1,
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        const consoleMessages = [];
        page.on("console", (message) => {
          if (["error", "warning"].includes(message.type())) {
            consoleMessages.push(`${message.type()}: ${message.text()}`);
          }
        });

        await page.goto(urlFor(route.path), { waitUntil: "domcontentloaded" });
        await settlePage(page);

        const outputPath = path.join(screenshotsDir, fileName(route.page, viewportId));
        await page.screenshot({ path: outputPath, fullPage: true, animations: "disabled" });

        results.push({
          page: route.page,
          viewport: viewportId,
          url: page.url(),
          title: await page.title(),
          outputPath,
          consoleMessages,
        });

        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  return results;
}

async function compareScreenshot(result) {
  if (!baselineDir) return { status: "captured" };

  const baselinePath = path.join(baselineDir, fileName(result.page, result.viewport));
  try {
    await fs.access(baselinePath);
  } catch {
    return { status: "missing-baseline" };
  }

  const [baselineBuffer, currentBuffer] = await Promise.all([
    fs.readFile(baselinePath),
    fs.readFile(result.outputPath),
  ]);

  const baseline = PNG.sync.read(baselineBuffer);
  const current = PNG.sync.read(currentBuffer);

  if (baseline.width !== current.width || baseline.height !== current.height) {
    return {
      status: "failed",
      reason: `size changed from ${baseline.width}x${baseline.height} to ${current.width}x${current.height}`,
    };
  }

  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const diffPixels = pixelmatch(baseline.data, current.data, diff.data, baseline.width, baseline.height, {
    threshold: 0.12,
    includeAA: false,
  });
  const diffRatio = diffPixels / (baseline.width * baseline.height);

  if (diffPixels > 0) {
    await fs.writeFile(path.join(diffsDir, fileName(result.page, result.viewport)), PNG.sync.write(diff));
  }

  return {
    status: diffRatio <= maxDiffRatio ? "passed" : "failed",
    diffPixels,
    diffRatio,
    reason: diffRatio <= maxDiffRatio ? "" : `diff ratio ${formatPercent(diffRatio)} exceeds ${formatPercent(maxDiffRatio)}`,
  };
}

async function updateBaselines(results) {
  if (!updateBaseline) return;

  for (const result of results) {
    await fs.copyFile(result.outputPath, path.join(baselineOutputDir, fileName(result.page, result.viewport)));
  }
}

function formatPercent(value) {
  return `${(value * 100).toFixed(3)}%`;
}

async function writeSummary(results) {
  const compared = [];
  for (const result of results) {
    compared.push({ ...result, comparison: await compareScreenshot(result) });
  }

  await updateBaselines(results);

  const lines = [
    "# Visual regression snapshot report",
    "",
    `Created: ${new Date().toISOString()}`,
    `Base URL: ${baseUrl}`,
    `Screenshots: ${path.relative(rootDir, screenshotsDir)}`,
    baselineDir ? `Baseline: ${path.relative(rootDir, baselineDir)}` : "Baseline: none",
    `Max diff ratio: ${formatPercent(maxDiffRatio)}`,
    "",
    "| Page | Viewport | Status | Diff | Console |",
    "| --- | --- | --- | ---: | --- |",
  ];

  for (const result of compared) {
    const comparison = result.comparison;
    const diff = typeof comparison.diffRatio === "number" ? formatPercent(comparison.diffRatio) : "-";
    const consoleStatus = result.consoleMessages.length === 0 ? "clean" : `${result.consoleMessages.length} warnings/errors`;
    lines.push(`| ${result.page} | ${result.viewport} | ${comparison.status}${comparison.reason ? `: ${comparison.reason}` : ""} | ${diff} | ${consoleStatus} |`);
  }

  const consoleMessages = compared.flatMap((result) => result.consoleMessages.map((message) => `${result.page}/${result.viewport}: ${message}`));
  if (consoleMessages.length > 0) {
    lines.push("", "## Console Messages", "", ...consoleMessages.map((message) => `- ${message}`));
  }

  const failed = compared.filter((result) => result.comparison.status === "failed");
  if (failed.length > 0) {
    lines.push("", `Failed screenshots: ${failed.length}`);
  }

  const summaryPath = path.join(outputRoot, "summary.md");
  await fs.writeFile(summaryPath, `${lines.join("\n")}\n`);

  console.log(`Visual snapshots written to ${path.relative(rootDir, outputRoot)}`);
  console.log(`Visual summary: ${path.relative(rootDir, summaryPath)}`);

  if (failed.length > 0) {
    throw new Error(`${failed.length} visual screenshot comparison(s) failed.`);
  }
}

await ensureDirs();
const server = startPreviewServer();

try {
  await waitForServer(server);
  const results = await captureAll();
  await writeSummary(results);
} finally {
  if (server) {
    server.kill("SIGTERM");
  }
}
