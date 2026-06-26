import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";

const rootDir = process.cwd();
const reportDir = path.join(rootDir, ".agent-reports");
const host = "127.0.0.1";
const port = Number(process.env.AGENT_AUDIT_PORT || 4174);
const baseUrl = `http://${host}:${port}`;
const outputPath = path.join(reportDir, "home-agentic.json");

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit", ...options });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

function request(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode || 0,
          contentType: res.headers["content-type"] || "",
          body: Buffer.concat(chunks).toString("utf8"),
        });
      });
    });
    req.on("error", reject);
    req.setTimeout(1000, () => req.destroy(new Error("Request timed out")));
  });
}

async function waitForPreview() {
  const deadline = Date.now() + 15000;

  while (Date.now() < deadline) {
    try {
      const response = await request(baseUrl);
      if (response.statusCode >= 200 && response.statusCode < 500) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  throw new Error(`Preview server did not become ready at ${baseUrl}.`);
}

function auditSummary(report) {
  const auditIds = [
    "agent-accessibility-tree",
    "cumulative-layout-shift",
    "llms-txt",
    "webmcp-form-coverage",
    "webmcp-registered-tools",
    "webmcp-schema-validity",
  ];

  return auditIds
    .filter((auditId) => report.audits[auditId])
    .map((auditId) => {
      const audit = report.audits[auditId];
      return {
        id: auditId,
        title: audit.title,
        score: audit.score,
        mode: audit.scoreDisplayMode,
        displayValue: audit.displayValue || "",
      };
    });
}

await fs.mkdir(reportDir, { recursive: true });
await run("npm", ["run", "build"]);
await run("npm", ["run", "agent:validate"], {
  env: { ...process.env, AGENT_VALIDATE_DIST: "1" },
});

const preview = spawn("npx", ["vite", "preview", "--host", host, "--port", String(port)], {
  cwd: rootDir,
  stdio: ["ignore", "pipe", "pipe"],
});

preview.stdout.on("data", (chunk) => process.stdout.write(chunk));
preview.stderr.on("data", (chunk) => process.stderr.write(chunk));

try {
  await waitForPreview();

  const llmsResponse = await request(`${baseUrl}/llms.txt`);
  if (llmsResponse.statusCode !== 200) {
    throw new Error(`/llms.txt returned HTTP ${llmsResponse.statusCode}.`);
  }
  if (!llmsResponse.contentType.includes("text/plain")) {
    throw new Error(`/llms.txt returned unexpected content type: ${llmsResponse.contentType}`);
  }
  if (!llmsResponse.body.startsWith("# ") || /<html[\s>]/i.test(llmsResponse.body)) {
    throw new Error("/llms.txt is not a valid Markdown agent file.");
  }

  const dataResponse = await request(`${baseUrl}/data/site-index.json`);
  if (dataResponse.statusCode !== 200 || !dataResponse.contentType.includes("application/json")) {
    throw new Error(`/data/site-index.json returned ${dataResponse.statusCode} ${dataResponse.contentType}.`);
  }

  await run("npx", [
    "--yes",
    "lighthouse@latest",
    `${baseUrl}/`,
    "--output=json",
    `--output-path=${outputPath}`,
    "--chrome-flags=--headless=new --no-sandbox",
    "--quiet",
  ]);

  const report = JSON.parse(await fs.readFile(outputPath, "utf8"));
  const rows = auditSummary(report);
  console.log("AI agent readability audit summary:");
  console.table(rows);

  const llmsAudit = report.audits["llms-txt"];
  const accessibilityTreeAudit = report.audits["agent-accessibility-tree"];
  const clsAudit = report.audits["cumulative-layout-shift"];

  const failures = [];
  if (llmsAudit && llmsAudit.score !== 1) failures.push("Lighthouse llms.txt audit did not pass.");
  if (accessibilityTreeAudit && accessibilityTreeAudit.score !== 1) failures.push("Lighthouse accessibility tree audit did not pass.");
  if (clsAudit && typeof clsAudit.score === "number" && clsAudit.score < 0.9) failures.push("Cumulative Layout Shift score is below 0.9.");

  if (failures.length > 0) {
    console.error("\nAI agent readability audit failed:");
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(`AI agent readability report written to ${path.relative(rootDir, outputPath)}.`);
} finally {
  preview.kill("SIGTERM");
}
