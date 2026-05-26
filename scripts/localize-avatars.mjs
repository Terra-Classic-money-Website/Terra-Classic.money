import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const sourceFiles = [
  path.join(rootDir, "src/data/ecosystem.ts"),
  path.join(rootDir, "src/data/markets.ts"),
  path.join(rootDir, "src/data/roadmap.ts"),
];
const outputDir = path.join(rootDir, "public/assets/avatars");
const avatarPattern = /"?avatar"?\s*:\s*["'](https?:\/\/[^"']+)["']/g;

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48) || "avatar";
}

function filenameForUrl(url) {
  const parsed = new URL(url);
  const baseName = path.basename(parsed.pathname) || parsed.hostname;
  const hash = crypto.createHash("sha256").update(url).digest("hex").slice(0, 10);
  return `avatar-${slugify(baseName)}-${hash}.webp`;
}

async function collectAvatarUrls() {
  const fileContents = await Promise.all(sourceFiles.map(async (file) => ({
    file,
    content: await fs.readFile(file, "utf8"),
  })));
  const urls = new Set();

  for (const { content } of fileContents) {
    for (const match of content.matchAll(avatarPattern)) {
      urls.add(match[1]);
    }
  }

  return {
    fileContents,
    urls: [...urls],
  };
}

async function downloadAvatar(url, outputPath) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "terra-classic-money-avatar-localizer/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  const input = Buffer.from(await response.arrayBuffer());
  await sharp(input)
    .rotate()
    .resize(128, 128, {
      fit: "cover",
      withoutEnlargement: true,
    })
    .webp({ quality: 90, effort: 6 })
    .toFile(outputPath);
}

async function localizeAvatars() {
  const { fileContents, urls } = await collectAvatarUrls();

  if (urls.length === 0) {
    console.log("No remote avatar URLs found.");
    return;
  }

  await fs.mkdir(outputDir, { recursive: true });

  const replacements = new Map();
  let generated = 0;

  for (const url of urls) {
    const filename = filenameForUrl(url);
    const relativeAsset = `avatars/${filename}`;
    const outputPath = path.join(outputDir, filename);

    try {
      await fs.access(outputPath);
    } catch {
      await downloadAvatar(url, outputPath);
      generated += 1;
    }

    replacements.set(url, relativeAsset);
  }

  for (const { file, content } of fileContents) {
    let nextContent = content;

    for (const [url, relativeAsset] of replacements) {
      nextContent = nextContent.replaceAll(url, relativeAsset);
    }

    if (nextContent !== content) {
      await fs.writeFile(file, nextContent);
    }
  }

  console.log(`Localized avatar assets: ${generated} generated, ${urls.length} mapped.`);
}

await localizeAvatars();
