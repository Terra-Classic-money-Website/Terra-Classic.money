import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const ignoredDirectories = new Set([".git", "node_modules"]);
const metadataFileNames = new Set([".DS_Store"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  let removed = 0;

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) {
        removed += await walk(absolute);
      }
      continue;
    }

    if (entry.isFile() && metadataFileNames.has(entry.name)) {
      await fs.rm(absolute);
      removed += 1;
    }
  }

  return removed;
}

const removed = await walk(rootDir);
console.log(`Removed ${removed} local metadata file${removed === 1 ? "" : "s"}.`);
