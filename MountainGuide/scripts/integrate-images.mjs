#!/usr/bin/env node

import { readFile, writeFile, copyFile, readdir, access } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "output");
const PROMPTS_FILE = join(__dirname, "image-prompts.json");
const ASSETS_DIR = join(__dirname, "..", "MountainGuide", "Assets.xcassets");

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const prompts = JSON.parse(await readFile(PROMPTS_FILE, "utf-8"));

  // Get list of generated images
  let outputFiles;
  try {
    outputFiles = new Set(await readdir(OUTPUT_DIR));
  } catch {
    console.error("Error: output/ directory not found. Run generate-images.mjs first.");
    process.exit(1);
  }

  let integrated = 0;
  let skipped = 0;
  let missing = 0;

  for (const entry of prompts) {
    const pngName = `${entry.imageName}.png`;

    if (!outputFiles.has(pngName)) {
      console.log(`MISSING ${entry.imageName} (not generated yet)`);
      missing++;
      continue;
    }

    const srcPath = join(OUTPUT_DIR, pngName);
    const imagesetDir = join(ASSETS_DIR, entry.path);
    const destPath = join(imagesetDir, pngName);
    const contentsPath = join(imagesetDir, "Contents.json");

    // Check imageset directory exists
    if (!(await fileExists(contentsPath))) {
      console.log(`SKIP ${entry.imageName} (no imageset directory at ${entry.path})`);
      skipped++;
      continue;
    }

    // Copy image to imageset
    await copyFile(srcPath, destPath);

    // Update Contents.json to reference the image at 2x
    const contents = {
      images: [
        {
          idiom: "universal",
          scale: "1x",
        },
        {
          filename: pngName,
          idiom: "universal",
          scale: "2x",
        },
        {
          idiom: "universal",
          scale: "3x",
        },
      ],
      info: {
        author: "xcode",
        version: 1,
      },
    };

    await writeFile(contentsPath, JSON.stringify(contents, null, 2) + "\n");
    console.log(`✓ ${entry.imageName} → ${entry.path}`);
    integrated++;
  }

  console.log("\n--- Summary ---");
  console.log(`Integrated: ${integrated}`);
  console.log(`Missing:    ${missing} (not yet generated)`);
  console.log(`Skipped:    ${skipped} (no imageset directory)`);
  console.log(`Total:      ${prompts.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
