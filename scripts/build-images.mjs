import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "asset-sources", "assets");
const outputDir = path.join(rootDir, "public", "assets");
const force = process.env.FORCE_ASSET_BUILD === "1";
const concurrency = Number(process.env.ASSET_BUILD_CONCURRENCY || 4);

const shared = { webpQuality: 88 };

const images = [
  { source: "hero-orb-figma.png", width: 1848, ...shared },
  { source: "what-main-orb.png", width: 1700, ...shared },
  { source: "what-left-orb.png", width: 1200, ...shared },
  { source: "what-right-orb.png", width: 1200, ...shared },
  { source: "what-surface.png", ...shared },
  { source: "protocol-staking-figma.png", ...shared },
  { source: "protocol-swap-figma.png", ...shared },
  { source: "protocol-forex-figma.png", ...shared },
  { source: "strength-orb.png", width: 900, ...shared },
  { source: "native-lunc-bg.png", ...shared },
  { source: "stats-small-planets.png", ...shared },
  { source: "stats-big-planet.png", ...shared },
  { source: "founder-story-portrait.png", ...shared },
  { source: "community-agora-figma.png", ...shared },
  { source: "community-discord-figma.png", ...shared },
  { source: "capability-staking-figma.png", ...shared },
  { source: "capability-forex-figma.png", ...shared },
  { source: "capability-defi-figma.png", ...shared },
  { source: "capability-build-figma.png", ...shared },
  { source: "capability-ecosystem-figma.png", ...shared },
  { source: "capability-layer2-figma.png", ...shared },
  { source: "capability-nft-figma.png", ...shared },
  { source: "about-hero-planet2.png", ...shared },
  { source: "about-terraform-labs-logo.png", ...shared },
  { source: "about-open-source-planet.png", ...shared },
  { source: "about-open-source-planet-full.png", ...shared },
  { source: "about-contribute-foreground.png", ...shared },
];

function replaceExtension(fileName, extension) {
  return fileName.replace(/\.[^.]+$/, extension);
}

async function encodeImage({ source, width, webpQuality }) {
  const sourcePath = path.join(sourceDir, source);
  const outputPath = path.join(outputDir, replaceExtension(source, ".webp"));
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

  await transformer
    .webp({ quality: webpQuality, effort: 6, smartSubsample: true })
    .toFile(outputPath);

  return { outputPath, skipped: false };
}

await fs.mkdir(outputDir, { recursive: true });

const outputs = [];
for (let index = 0; index < images.length; index += concurrency) {
  outputs.push(...await Promise.all(images.slice(index, index + concurrency).map(encodeImage)));
}

const generated = outputs.filter((output) => !output.skipped).length;
const skipped = outputs.length - generated;

console.log(`Optimized image assets: ${generated} generated, ${skipped} already current.`);
