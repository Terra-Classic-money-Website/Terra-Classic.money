import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "asset-sources", "assets");
const outputDir = path.join(rootDir, "public", "assets");
const force = process.env.FORCE_ASSET_BUILD === "1";
const concurrency = Number(process.env.ASSET_BUILD_CONCURRENCY || 4);

const defaults = {
  webpQuality: 88,
  avifQuality: 76,
  formats: ["webp", "avif"],
};

const highFidelityRaster = {
  webpQuality: 96,
  avifQuality: 90,
};

const whatAvatarImages = Array.from({ length: 8 }, (_, index) => ({
  source: `what-avatar-${index + 1}.png`,
  fallbackWidth: 112,
  widths: [112],
  ...highFidelityRaster,
}));

const protocolUiImages = [
  "protocol-blue-confirmed.png",
  "protocol-deposit-ui-figma.png",
  "protocol-mint-ui-figma.png",
  "protocol-staking-confirmed.png",
  "protocol-staking-ui-figma.png",
  "protocol-swap-ui-figma.png",
  "protocol-validator-ui-figma.png",
].map((source) => ({
  source,
  fallbackWidth: 384,
  widths: [384],
  ...highFidelityRaster,
}));

const nativeTokenImages = [
  "native-token-autc.png",
  "native-token-catc.png",
  "native-token-chtc.png",
  "native-token-cntc.png",
  "native-token-dktc.png",
  "native-token-eutc.png",
  "native-token-gbtc.png",
  "native-token-hktc.png",
  "native-token-idtc.png",
  "native-token-intc.png",
  "native-token-jptc.png",
  "native-token-mntc.png",
  "native-token-mytc.png",
  "native-token-notc.png",
  "native-token-phtc.png",
  "native-token-sdtc.png",
  "native-token-setc.png",
  "native-token-sgtc.png",
  "native-token-thtc.png",
  "native-token-twtc.png",
].map((source) => ({
  source,
  fallbackWidth: 60,
  widths: [60],
  ...highFidelityRaster,
}));

const supportLogoImages = [
  ["support-binance.png", 104],
  ["support-kraken.png", 94],
  ["support-mexc.png", 97],
  ["support-htx.png", 49],
  ["support-cosmos.png", 107],
  ["support-solidproof.png", 116],
  ["support-certik.png", 89],
  ["support-keplr.png", 72],
  ["support-trust.png", 81],
].map(([source, fallbackWidth]) => ({
  source,
  fallbackWidth,
  widths: [fallbackWidth],
  ...highFidelityRaster,
}));

const imageMatrix = [
  { source: "hero-orb-figma.png", fallbackWidth: 1848, widths: [480, 768, 1024, 1848] },
  { source: "what-main-orb.png", fallbackWidth: 1700, widths: [320, 720, 1024, 1700] },
  { source: "what-left-orb.png", fallbackWidth: 1200, widths: [320, 720, 1200] },
  { source: "what-right-orb.png", fallbackWidth: 1200, widths: [320, 720, 1200] },
  { source: "what-surface.png", fallbackWidth: 1205, widths: [480, 768, 1205] },
  { source: "capability-staking-figma.png", fallbackWidth: 1071, widths: [360, 720, 1071] },
  { source: "capability-forex-figma.png", fallbackWidth: 1003, widths: [360, 720, 1003] },
  { source: "capability-defi-figma.png", fallbackWidth: 622, widths: [360, 622] },
  { source: "capability-build-figma.png", fallbackWidth: 941, widths: [360, 720, 941] },
  { source: "capability-ecosystem-figma.png", fallbackWidth: 859, widths: [360, 720, 859] },
  { source: "capability-layer2-figma.png", fallbackWidth: 985, widths: [360, 720, 985] },
  { source: "capability-nft-figma.png", fallbackWidth: 1000, widths: [360, 720, 1000] },
  { source: "protocol-staking-figma.png", fallbackWidth: 1391, widths: [480, 768, 1391] },
  { source: "protocol-swap-figma.png", fallbackWidth: 1400, widths: [480, 768, 1400] },
  { source: "protocol-forex-figma.png", fallbackWidth: 1373, widths: [480, 768, 1373] },
  { source: "quantum-readiness-orb.png", fallbackWidth: 1200, widths: [480, 768, 1200], webpQuality: 88, avifQuality: 64 },
  { source: "quantum-readiness-blue-orb.png", fallbackWidth: 412, widths: [258, 412], ...highFidelityRaster },
  { source: "quantum-readiness-yellow-orb.png", fallbackWidth: 383, widths: [255, 383], ...highFidelityRaster },
  { source: "quantum-readiness-roadmap-ui.png", fallbackWidth: 384, widths: [384], ...highFidelityRaster },
  { source: "quantum-readiness-rfc-ui.png", fallbackWidth: 333, widths: [333], ...highFidelityRaster },
  { source: "strength-orb.png", fallbackWidth: 900, widths: [360, 720, 900] },
  { source: "native-lunc-bg.png", fallbackWidth: 385, widths: [192, 385] },
  { source: "stats-small-planets.png", fallbackWidth: 1161, widths: [360, 720, 1161] },
  { source: "stats-big-planet.png", fallbackWidth: 270, widths: [180, 270] },
  { source: "founder-story-portrait.png", fallbackWidth: 768, widths: [360, 512, 768] },
  { source: "community-agora-figma.png", fallbackWidth: 2080, widths: [128, 256, 512, 2080] },
  { source: "community-discord-figma.png", fallbackWidth: 740, widths: [64, 128, 256, 740] },
  { source: "about-hero-planet2.png", fallbackWidth: 1067, widths: [640, 768, 1067] },
  { source: "about-terraform-labs-logo.png", fallbackWidth: 699, widths: [240, 699] },
  { source: "about-open-source-planet.png", fallbackWidth: 801, widths: [360, 720, 801] },
  { source: "about-open-source-planet-full.png", fallbackWidth: 801, widths: [360, 720, 801] },
  { source: "about-contribute-foreground.png", fallbackWidth: 947, widths: [360, 720, 947] },
  ...whatAvatarImages,
  ...protocolUiImages,
  ...nativeTokenImages,
  ...supportLogoImages,
].map((image) => ({ ...defaults, ...image }));

function replaceExtension(fileName, extension) {
  return fileName.replace(/\.[^.]+$/, extension);
}

function outputNameFor({ source, fallbackWidth }, width, format) {
  const baseName = replaceExtension(source, "");
  const suffix = width === fallbackWidth ? "" : `-${width}`;
  return `${baseName}${suffix}.${format}`;
}

function createImageTasks() {
  const taskByOutput = new Map();

  for (const image of imageMatrix) {
    const widths = [...new Set([...image.widths, image.fallbackWidth])].sort((a, b) => a - b);

    for (const width of widths) {
      for (const format of image.formats) {
        const output = outputNameFor(image, width, format);
        taskByOutput.set(output, {
          ...image,
          width,
          format,
          output,
        });
      }
    }
  }

  return [...taskByOutput.values()];
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function pruneStaleMatrixOutputs(tasks) {
  const expectedOutputs = new Set(tasks.map((task) => task.output));
  const baseNames = imageMatrix.map((image) => replaceExtension(image.source, ""));
  const familyPattern = new RegExp(`^(?:${baseNames.map(escapeRegExp).join("|")})(?:-\\d+)?\\.(?:webp|avif)$`);
  const entries = await fs.readdir(outputDir).catch(() => []);
  let removed = 0;

  for (const entry of entries) {
    if (!familyPattern.test(entry) || expectedOutputs.has(entry)) continue;
    await fs.unlink(path.join(outputDir, entry));
    removed += 1;
  }

  return removed;
}

async function encodeImage({ source, output, width, format, webpQuality, avifQuality }) {
  const sourcePath = path.join(sourceDir, source);
  const outputPath = path.join(outputDir, output);
  const [sourceStat, outputStat] = await Promise.all([
    fs.stat(sourcePath),
    fs.stat(outputPath).catch(() => null),
  ]);

  if (!force && outputStat && outputStat.mtimeMs >= sourceStat.mtimeMs) {
    return { outputPath, skipped: true };
  }

  const transformer = sharp(sourcePath).rotate();

  if (width) {
    transformer.resize({ width, withoutEnlargement: true });
  }

  if (format === "avif") {
    await transformer.avif({ quality: avifQuality, effort: 6 }).toFile(outputPath);
  } else {
    await transformer.webp({ quality: webpQuality, effort: 6, smartSubsample: true }).toFile(outputPath);
  }

  return { outputPath, skipped: false };
}

await fs.mkdir(outputDir, { recursive: true });

const images = createImageTasks();
const pruned = await pruneStaleMatrixOutputs(images);
const outputs = [];
for (let index = 0; index < images.length; index += concurrency) {
  outputs.push(...await Promise.all(images.slice(index, index + concurrency).map(encodeImage)));
}

const generated = outputs.filter((output) => !output.skipped).length;
const skipped = outputs.length - generated;

console.log(`Optimized image assets: ${generated} generated, ${skipped} already current, ${pruned} stale removed.`);
