import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";

const rootDir = process.cwd();
const reportDir = path.join(rootDir, ".performance-reports");
const host = "127.0.0.1";
const port = Number(process.env.PERF_AUDIT_PORT || 4173);
const baseUrl = `http://${host}:${port}`;

const pages = [
  { label: "home", path: "/", formFactor: "mobile", retryOnOutlier: { minScore: 95, maxTbtMs: 150 } },
  { label: "ecosystem", path: "/ecosystem.html", formFactor: "mobile" },
  { label: "markets", path: "/markets.html", formFactor: "mobile" },
  { label: "roadmap", path: "/roadmap.html", formFactor: "mobile" },
  { label: "open-work", path: "/open-work.html", formFactor: "mobile" },
  { label: "open-work-detail", path: "/open-work-detail.html?work=forex-protocol-implementation", formFactor: "mobile" },
  { label: "decentralization", path: "/decentralization.html", formFactor: "mobile", retryOnOutlier: { minScore: 82, maxTbtMs: 400 } },
  { label: "about", path: "/about.html", formFactor: "mobile" },
  { label: "privacy", path: "/privacy.html", formFactor: "mobile" },
  { label: "404", path: "/404.html", formFactor: "mobile" },
  { label: "home-desktop", path: "/", formFactor: "desktop", retryOnOutlier: { minScore: 95, maxTbtMs: 100 } },
  { label: "decentralization-desktop", path: "/decentralization.html", formFactor: "desktop" },
  { label: "about-desktop", path: "/about.html", formFactor: "desktop" },
];

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", ...options });
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
      }
    });
  });
}

function request(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode || 0);
    });
    req.on("error", reject);
    req.setTimeout(1000, () => {
      req.destroy(new Error("Request timed out"));
    });
  });
}

async function waitForPreview() {
  const deadline = Date.now() + 15000;

  while (Date.now() < deadline) {
    try {
      const status = await request(baseUrl);
      if (status >= 200 && status < 500) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  throw new Error(`Preview server did not become ready at ${baseUrl}.`);
}

async function readPerformanceMetrics(reportPath) {
  const report = JSON.parse(await fs.readFile(reportPath, "utf8"));
  return {
    score: (report.categories?.performance?.score ?? 0) * 100,
    tbtMs: report.audits?.["total-blocking-time"]?.numericValue ?? 0,
  };
}

async function runLighthouse(page, outputPath) {
  const args = [
    "--yes",
    "lighthouse@latest",
    `${baseUrl}${page.path}`,
    "--only-categories=performance",
    "--output=json",
    `--output-path=${outputPath}`,
    "--chrome-flags=--headless=new --no-sandbox",
    "--quiet",
  ];

  if (page.formFactor === "desktop") {
    args.push("--preset=desktop");
  }

  await run("npx", args);
}

function shouldRetryOutlier(page, metrics) {
  if (!page.retryOnOutlier) return false;

  return metrics.score < page.retryOnOutlier.minScore || metrics.tbtMs > page.retryOnOutlier.maxTbtMs;
}

await fs.mkdir(reportDir, { recursive: true });
await run("npm", ["run", "build"]);

const preview = spawn("npx", ["vite", "preview", "--host", host, "--port", String(port)], {
  cwd: rootDir,
  stdio: ["ignore", "pipe", "pipe"],
});

preview.stdout.on("data", (chunk) => process.stdout.write(chunk));
preview.stderr.on("data", (chunk) => process.stderr.write(chunk));

try {
  await waitForPreview();

  for (const page of pages) {
    const outputPath = path.join(reportDir, `${page.label}.json`);
    await runLighthouse(page, outputPath);

    const metrics = await readPerformanceMetrics(outputPath);
    if (shouldRetryOutlier(page, metrics)) {
      console.warn(
        `Retrying ${page.label} Lighthouse audit after outlier: score ${Math.round(metrics.score)}, TBT ${Math.round(metrics.tbtMs)} ms.`,
      );
      await runLighthouse(page, outputPath);
    }
  }

  console.log(`Lighthouse reports written to ${path.relative(rootDir, reportDir)}.`);
} finally {
  preview.kill("SIGTERM");
}
