/**
 * Convert all jpg/png images in public/images to webp,
 * then update references in src/ code and JSON files.
 *
 * Usage: node scripts/convert-to-webp.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");
const SRC_DIR = path.join(ROOT, "src");

const IMAGE_EXTS = [".jpg", ".jpeg", ".png"];

// ── 1. Find all images (skip _originals and nested mau-2/mau-2) ──
function findImages(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "_originals") continue;
      // skip nested mau-2/mau-2
      if (full.endsWith(path.join("mau-2", "mau-2"))) continue;
      findImages(full, results);
    } else if (IMAGE_EXTS.includes(path.extname(entry.name).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

// ── 2. Convert images ──
async function convertImages() {
  const images = findImages(IMAGES_DIR);
  console.log(`Found ${images.length} images to convert.\n`);

  const renames = []; // { oldRef, newRef } for code updates

  for (const imgPath of images) {
    const ext = path.extname(imgPath);
    const webpPath = imgPath.replace(ext, ".webp");
    const relOld = "/" + path.relative(path.join(ROOT, "public"), imgPath).replace(/\\/g, "/");
    const relNew = relOld.replace(ext, ".webp");

    // Skip if webp already exists and is newer
    if (fs.existsSync(webpPath)) {
      const srcStat = fs.statSync(imgPath);
      const dstStat = fs.statSync(webpPath);
      if (dstStat.mtimeMs >= srcStat.mtimeMs) {
        console.log(`  ⏩ Skip (webp exists): ${relOld}`);
        renames.push({ oldRef: relOld, newRef: relNew });
        continue;
      }
    }

    try {
      await sharp(imgPath).webp({ quality: 82 }).toFile(webpPath);
      const oldSize = fs.statSync(imgPath).size;
      const newSize = fs.statSync(webpPath).size;
      const pct = ((1 - newSize / oldSize) * 100).toFixed(1);
      console.log(`  ✅ ${relOld} → .webp  (${(oldSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB, -${pct}%)`);
      renames.push({ oldRef: relOld, newRef: relNew });
    } catch (err) {
      console.error(`  ❌ Error converting ${relOld}:`, err.message);
    }
  }

  return renames;
}

// ── 3. Update references in src/ files ──
function updateReferences(renames) {
  const extensions = [".ts", ".tsx", ".json", ".js", ".jsx", ".css"];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules") continue;
        walk(full);
      } else if (extensions.includes(path.extname(entry.name))) {
        let content = fs.readFileSync(full, "utf-8");
        let changed = false;
        for (const { oldRef, newRef } of renames) {
          if (content.includes(oldRef)) {
            content = content.replaceAll(oldRef, newRef);
            changed = true;
          }
        }
        if (changed) {
          fs.writeFileSync(full, content, "utf-8");
          console.log(`  📝 Updated: ${path.relative(ROOT, full)}`);
        }
      }
    }
  }

  console.log(`\nUpdating references in src/...`);
  walk(SRC_DIR);
  // Also check index.html
  const indexHtml = path.join(ROOT, "index.html");
  if (fs.existsSync(indexHtml)) {
    let content = fs.readFileSync(indexHtml, "utf-8");
    let changed = false;
    for (const { oldRef, newRef } of renames) {
      if (content.includes(oldRef)) {
        content = content.replaceAll(oldRef, newRef);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(indexHtml, content, "utf-8");
      console.log(`  📝 Updated: index.html`);
    }
  }
}

// ── Main ──
async function main() {
  console.log("🖼️  Converting images to WebP...\n");
  const renames = await convertImages();
  updateReferences(renames);
  console.log("\n✨ Done! All images converted and references updated.");
}

main().catch(console.error);
