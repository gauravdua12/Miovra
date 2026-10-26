import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "png", "webp", "avif"];
const IMAGE_DIR = path.join(process.cwd(), "public", "images");

/**
 * Finds a photo in public/images by base name ("banner-home" -> "/images/banner-home.jpg").
 * Returns null when no file exists yet, so callers render a labelled placeholder instead.
 */
export function resolveImage(base: string | undefined): string | null {
  if (!base) return null;
  for (const ext of EXTENSIONS) {
    const file = `${base}.${ext}`;
    if (fs.existsSync(path.join(IMAGE_DIR, file))) return `/images/${file}`;
  }
  return null;
}
