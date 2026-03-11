import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, copyFileSync } from "fs";
import { join, extname, basename } from "path";

const DIRS = [
  "public/images/mau-2",
  "public/images/mau-3",
];
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 85;

let totalBefore = 0;
let totalAfter = 0;

for (const dir of DIRS) {
  let files;
  try {
    files = readdirSync(dir);
  } catch {
    console.log(`Skipping ${dir} (not found)`);
    continue;
  }

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const src = join(dir, file);
    const stat = statSync(src);
    if (stat.isDirectory()) continue;

    const sizeBefore = stat.size;
    totalBefore += sizeBefore;

    // backup original if not already backed up
    const bakDir = join(dir, "_originals");
    mkdirSync(bakDir, { recursive: true });
    const bakPath = join(bakDir, file);
    try { statSync(bakPath); } catch { copyFileSync(src, bakPath); }

    try {
      const img = sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true });

      if (ext === ".png") {
        await img.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toFile(src + ".tmp");
      } else {
        await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(src + ".tmp");
      }

      // Replace original with compressed
      const { renameSync } = await import("fs");
      renameSync(src + ".tmp", src);

      const sizeAfter = statSync(src).size;
      totalAfter += sizeAfter;
      const pct = (((sizeBefore - sizeAfter) / sizeBefore) * 100).toFixed(1);
      console.log(`✓ ${file}: ${(sizeBefore/1024/1024).toFixed(1)}MB → ${(sizeAfter/1024).toFixed(0)}KB (-${pct}%)`);
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`);
    }
  }
}

console.log(`\nTổng: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB (-${(((totalBefore-totalAfter)/totalBefore)*100).toFixed(1)}%)`);
console.log("Ảnh gốc đã backup vào _originals/");
