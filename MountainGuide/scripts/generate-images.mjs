#!/usr/bin/env node

import { GoogleGenAI } from "@google/genai";
import { writeFile, readFile, mkdir, access } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "output");
const PROMPTS_FILE = join(__dirname, "image-prompts.json");

const DELAY_MS = 7000; // 7s delay = ~8.5 req/min (limit is 10/min)
const MAX_RETRIES = 3;

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("Error: GEMINI_API_KEY environment variable is required.");
    console.error("Get your key at https://aistudio.google.com/apikey");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  let start = 0;
  let count = Infinity;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--start" && args[i + 1]) {
      start = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === "--count" && args[i + 1]) {
      count = parseInt(args[i + 1], 10);
      i++;
    }
  }

  const prompts = JSON.parse(await readFile(PROMPTS_FILE, "utf-8"));
  const slice = prompts.slice(start, start + count);

  console.log(`Loaded ${prompts.length} total prompts.`);
  console.log(`Processing ${slice.length} images (start=${start}, count=${count})`);

  await mkdir(OUTPUT_DIR, { recursive: true });

  const ai = new GoogleGenAI({ apiKey });

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < slice.length; i++) {
    const entry = slice[i];
    const outputPath = join(OUTPUT_DIR, `${entry.imageName}.png`);

    if (await fileExists(outputPath)) {
      console.log(`[${start + i + 1}/${prompts.length}] SKIP ${entry.imageName} (already exists)`);
      skipped++;
      continue;
    }

    console.log(`[${start + i + 1}/${prompts.length}] Generating ${entry.imageName}...`);

    let success = false;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const response = await ai.models.generateImages({
          model: "imagen-4.0-generate-001",
          prompt: entry.prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: "image/png",
          },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
          const imageBytes = response.generatedImages[0].image.imageBytes;
          const buffer = Buffer.from(imageBytes, "base64");
          await writeFile(outputPath, buffer);
          console.log(`  ✓ Saved ${entry.imageName}.png (${(buffer.length / 1024).toFixed(0)} KB)`);
          generated++;
          success = true;
          break;
        } else {
          console.error(`  ✗ No image returned for ${entry.imageName}`);
        }
      } catch (err) {
        const is429 = err.message?.includes("429") || err.message?.includes("RESOURCE_EXHAUSTED");
        if (is429 && attempt < MAX_RETRIES) {
          const wait = 30 * attempt;
          console.log(`  ⏳ Rate limited, waiting ${wait}s (attempt ${attempt}/${MAX_RETRIES})...`);
          await new Promise((r) => setTimeout(r, wait * 1000));
          continue;
        }
        console.error(`  ✗ Failed ${entry.imageName}: ${err.message}`);
      }
    }
    if (!success) failed++;

    // Rate limit delay (skip on last item)
    if (i < slice.length - 1) {
      await new Promise((r) => setTimeout(r, DELAY_MS));
    }
  }

  console.log("\n--- Summary ---");
  console.log(`Generated: ${generated}`);
  console.log(`Skipped:   ${skipped}`);
  console.log(`Failed:    ${failed}`);
  console.log(`Total:     ${slice.length}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
