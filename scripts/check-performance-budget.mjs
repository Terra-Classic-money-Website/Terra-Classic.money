import fs from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";

const rootDir = process.cwd();
const distDir = path.join(rootDir, "dist");
const distAssetsDir = path.join(distDir, "assets");

const budgets = {
  totalRuntimeDistBytes: 19.75 * 1024 * 1024,
  agentContextBytes: 160 * 1024,
  largestRuntimeAssetBytes: 900 * 1024,
  largestDownloadAssetBytes: 20 * 1024 * 1024,
  homeInitialJsGzipBytes: 97 * 1024,
  maxInitialJsGzipBytes: 125 * 1024,
  maxInitialCssGzipBytes: 28 * 1024,
  totalJsGzipBytes: 160 * 1024,
  totalCssGzipBytes: 46 * 1024,
};

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(absolute));
    } else if (entry.isFile()) {
      files.push(absolute);
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MiB`;
}

async function assertDistExists() {
  try {
    await fs.access(distAssetsDir);
  } catch {
    throw new Error("dist/assets was not found. Run `npm run build` before `npm run perf:budget`.");
  }
}

await assertDistExists();

const files = await walk(distDir);
const fileStats = await Promise.all(files.map(async (file) => {
  const stats = await fs.stat(file);
  return {
    file,
    relative: path.relative(distDir, file),
    bytes: stats.size,
  };
}));

const metadataFileNames = new Set([".DS_Store", "Thumbs.db", "desktop.ini", "ehthumbs.db"]);

function isLocalMetadataFile(fileName) {
  return metadataFileNames.has(fileName) || fileName.startsWith("._");
}

function isDownloadAsset(file) {
  return file.relative.startsWith("assets/brand-assets/");
}

function isAgentContextFile(file) {
  return (
    file.relative === "llms.txt" ||
    file.relative.startsWith("ai-context/") ||
    /^data\/(site-index|ecosystem|markets|roadmap|open-work|policies|faq)\.json$/.test(file.relative)
  );
}

const runtimeFileStats = fileStats.filter((file) => !isDownloadAsset(file) && !isAgentContextFile(file));
const downloadAssetStats = fileStats.filter(isDownloadAsset);
const agentContextStats = fileStats.filter(isAgentContextFile);
const totalRuntimeDistBytes = runtimeFileStats.reduce((sum, file) => sum + file.bytes, 0);
const totalDownloadAssetBytes = downloadAssetStats.reduce((sum, file) => sum + file.bytes, 0);
const totalAgentContextBytes = agentContextStats.reduce((sum, file) => sum + file.bytes, 0);
const largestRuntimeAsset = runtimeFileStats.reduce((largest, file) => (file.bytes > largest.bytes ? file : largest), runtimeFileStats[0]);
const largestDownloadAsset = downloadAssetStats.reduce((largest, file) => (file.bytes > largest.bytes ? file : largest), downloadAssetStats[0] || { relative: "none", bytes: 0 });
const metadataFiles = fileStats.filter((file) => isLocalMetadataFile(path.basename(file.file)));
const jsFiles = fileStats.filter((file) => file.relative.startsWith("assets/") && file.relative.endsWith(".js"));
const cssFiles = fileStats.filter((file) => file.relative.startsWith("assets/") && file.relative.endsWith(".css"));
const htmlFiles = fileStats.filter((file) => file.relative.endsWith(".html"));

function isLazyLocaleChunk(file) {
  return /^assets\/renderedText-[A-Za-z0-9_-]+\.js$/.test(file.relative);
}

async function gzipTotal(filesToMeasure) {
  let total = 0;
  for (const file of filesToMeasure) {
    total += zlib.gzipSync(await fs.readFile(file.file)).length;
  }
  return total;
}

const lazyLocaleJsFiles = jsFiles.filter(isLazyLocaleChunk);
const budgetedJsFiles = jsFiles.filter((file) => !isLazyLocaleChunk(file));
const jsGzipBytes = await gzipTotal(budgetedJsFiles);
const lazyLocaleJsGzipBytes = await gzipTotal(lazyLocaleJsFiles);
const cssGzipBytes = await gzipTotal(cssFiles);
const fileByRelativePath = new Map(fileStats.map((file) => [file.relative, file]));
const pageInitialJs = [];
const pageInitialCss = [];

for (const file of htmlFiles) {
  const html = await fs.readFile(file.file, "utf8");
  const initialJsPaths = new Set();
  const initialCssPaths = new Set();

  for (const match of html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+\.js)"/g)) {
    initialJsPaths.add(match[1].replace(/^\//, ""));
  }
  for (const match of html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+\.js)"/g)) {
    initialJsPaths.add(match[1].replace(/^\//, ""));
  }
  for (const match of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/g)) {
    initialCssPaths.add(match[1].replace(/^\//, ""));
  }

  let gzipBytes = 0;
  for (const relativePath of initialJsPaths) {
    const jsFile = fileByRelativePath.get(relativePath);
    if (jsFile) gzipBytes += zlib.gzipSync(await fs.readFile(jsFile.file)).length;
  }

  pageInitialJs.push({
    page: file.relative,
    gzipBytes,
  });

  let cssGzipBytes = 0;
  for (const relativePath of initialCssPaths) {
    const cssFile = fileByRelativePath.get(relativePath);
    if (cssFile) cssGzipBytes += zlib.gzipSync(await fs.readFile(cssFile.file)).length;
  }

  pageInitialCss.push({
    page: file.relative,
    gzipBytes: cssGzipBytes,
  });
}

const homeInitialJs = pageInitialJs.find((page) => page.page === "index.html");
const largestInitialJsPage = pageInitialJs.reduce((largest, page) => (page.gzipBytes > largest.gzipBytes ? page : largest), pageInitialJs[0]);
const largestInitialCssPage = pageInitialCss.reduce((largest, page) => (page.gzipBytes > largest.gzipBytes ? page : largest), pageInitialCss[0]);

const failures = [];

if (totalRuntimeDistBytes > budgets.totalRuntimeDistBytes) {
  failures.push(`Runtime dist size ${formatBytes(totalRuntimeDistBytes)} exceeds ${formatBytes(budgets.totalRuntimeDistBytes)}.`);
}

if (totalAgentContextBytes > budgets.agentContextBytes) {
  failures.push(`AI agent context size ${formatBytes(totalAgentContextBytes)} exceeds ${formatBytes(budgets.agentContextBytes)}.`);
}

if (largestRuntimeAsset.bytes > budgets.largestRuntimeAssetBytes) {
  failures.push(`Largest runtime file ${largestRuntimeAsset.relative} is ${formatBytes(largestRuntimeAsset.bytes)}, above ${formatBytes(budgets.largestRuntimeAssetBytes)}.`);
}

if (largestDownloadAsset.bytes > budgets.largestDownloadAssetBytes) {
  failures.push(`Largest downloadable brand asset ${largestDownloadAsset.relative} is ${formatBytes(largestDownloadAsset.bytes)}, above ${formatBytes(budgets.largestDownloadAssetBytes)}.`);
}

if (homeInitialJs && homeInitialJs.gzipBytes > budgets.homeInitialJsGzipBytes) {
  failures.push(`Homepage initial JS gzip ${formatBytes(homeInitialJs.gzipBytes)} exceeds ${formatBytes(budgets.homeInitialJsGzipBytes)}.`);
}

if (largestInitialJsPage.gzipBytes > budgets.maxInitialJsGzipBytes) {
  failures.push(`${largestInitialJsPage.page} initial JS gzip ${formatBytes(largestInitialJsPage.gzipBytes)} exceeds ${formatBytes(budgets.maxInitialJsGzipBytes)}.`);
}

if (largestInitialCssPage.gzipBytes > budgets.maxInitialCssGzipBytes) {
  failures.push(`${largestInitialCssPage.page} initial CSS gzip ${formatBytes(largestInitialCssPage.gzipBytes)} exceeds ${formatBytes(budgets.maxInitialCssGzipBytes)}.`);
}

if (jsGzipBytes > budgets.totalJsGzipBytes) {
  failures.push(`Built JS gzip total ${formatBytes(jsGzipBytes)} exceeds ${formatBytes(budgets.totalJsGzipBytes)}.`);
}

if (cssGzipBytes > budgets.totalCssGzipBytes) {
  failures.push(`Built CSS gzip total ${formatBytes(cssGzipBytes)} exceeds ${formatBytes(budgets.totalCssGzipBytes)}.`);
}

if (metadataFiles.length > 0) {
  failures.push(`Build output contains local metadata files: ${metadataFiles.map((file) => file.relative).join(", ")}.`);
}

console.log("Performance budget summary:");
console.log(`- Runtime dist: ${formatBytes(totalRuntimeDistBytes)} / ${formatBytes(budgets.totalRuntimeDistBytes)}`);
console.log(`- AI agent context: ${formatBytes(totalAgentContextBytes)} / ${formatBytes(budgets.agentContextBytes)}`);
console.log(`- Downloadable brand assets: ${formatBytes(totalDownloadAssetBytes)}`);
console.log(`- Largest runtime file: ${largestRuntimeAsset.relative} (${formatBytes(largestRuntimeAsset.bytes)}) / ${formatBytes(budgets.largestRuntimeAssetBytes)}`);
console.log(`- Largest downloadable brand asset: ${largestDownloadAsset.relative} (${formatBytes(largestDownloadAsset.bytes)}) / ${formatBytes(budgets.largestDownloadAssetBytes)}`);
console.log(`- Homepage initial JS gzip: ${formatBytes(homeInitialJs?.gzipBytes || 0)} / ${formatBytes(budgets.homeInitialJsGzipBytes)}`);
console.log(`- Largest page initial JS gzip: ${largestInitialJsPage.page} (${formatBytes(largestInitialJsPage.gzipBytes)}) / ${formatBytes(budgets.maxInitialJsGzipBytes)}`);
console.log(`- Largest page initial CSS gzip: ${largestInitialCssPage.page} (${formatBytes(largestInitialCssPage.gzipBytes)}) / ${formatBytes(budgets.maxInitialCssGzipBytes)}`);
console.log(`- JS gzip total: ${formatBytes(jsGzipBytes)} / ${formatBytes(budgets.totalJsGzipBytes)}`);
console.log(`- Lazy locale JS gzip: ${formatBytes(lazyLocaleJsGzipBytes)}`);
console.log(`- CSS gzip total: ${formatBytes(cssGzipBytes)} / ${formatBytes(budgets.totalCssGzipBytes)}`);
console.log("- Page initial CSS gzip:");
for (const page of [...pageInitialCss].sort((a, b) => b.gzipBytes - a.gzipBytes)) {
  console.log(`  - ${page.page}: ${formatBytes(page.gzipBytes)}`);
}

if (failures.length > 0) {
  console.error("\nPerformance budget failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
