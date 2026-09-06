import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(
    "Error: Missing Cloudinary environment variables.\n" +
      "Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env"
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const FRONTEND_DIR = path.resolve(__dirname, "../../frontend");
const PUBLIC_DIR = path.join(FRONTEND_DIR, "public");
const ASSETS_DIR = path.join(FRONTEND_DIR, "src/assets");
const MANIFEST_FILE = path.join(FRONTEND_DIR, "src/mediaManifest.json");

const MIN_IMAGE_SIZE_BYTES = 50 * 1024; // 50KB threshold for images

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".avi", ".mkv"]);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * Recursively find all files in a directory
 */
function getFilesRecursively(dir) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const dirent of list) {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (dirent.isFile()) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Collect candidate files to upload
 */
function collectMediaFiles() {
  const allCandidates = [];

  // 1. All videos in frontend/public/videos
  const videosDir = path.join(PUBLIC_DIR, "videos");
  if (fs.existsSync(videosDir)) {
    const videoFiles = getFilesRecursively(videosDir);
    for (const filePath of videoFiles) {
      const ext = path.extname(filePath).toLowerCase();
      if (VIDEO_EXTENSIONS.has(ext)) {
        const stats = fs.statSync(filePath);
        // Relative to public directory (e.g. "videos/hero.mp4")
        const relPath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");
        allCandidates.push({
          fullPath: filePath,
          manifestKey: relPath,
          resourceType: "video",
          folder: "travel-in-depth/videos",
          size: stats.size,
        });
      }
    }
  }

  // 2. Images in frontend/public (root and subfolders, excluding videos)
  if (fs.existsSync(PUBLIC_DIR)) {
    const publicFiles = getFilesRecursively(PUBLIC_DIR);
    for (const filePath of publicFiles) {
      if (filePath.startsWith(videosDir)) continue;
      const ext = path.extname(filePath).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        const stats = fs.statSync(filePath);
        const relPath = path.relative(PUBLIC_DIR, filePath).replace(/\\/g, "/");
        if (stats.size >= MIN_IMAGE_SIZE_BYTES) {
          allCandidates.push({
            fullPath: filePath,
            manifestKey: relPath,
            resourceType: "image",
            folder: "travel-in-depth/images",
            size: stats.size,
          });
        } else {
          allCandidates.push({
            fullPath: filePath,
            manifestKey: relPath,
            resourceType: "image",
            size: stats.size,
            skipped: true,
            reason: `< ${formatBytes(MIN_IMAGE_SIZE_BYTES)} (icon/logo)`,
          });
        }
      }
    }
  }

  // 3. Images in frontend/src/assets
  if (fs.existsSync(ASSETS_DIR)) {
    const assetFiles = getFilesRecursively(ASSETS_DIR);
    for (const filePath of assetFiles) {
      const ext = path.extname(filePath).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        const stats = fs.statSync(filePath);
        // Relative to src (e.g. "assets/hawamahal.jpg")
        const relPath = path.relative(path.join(FRONTEND_DIR, "src"), filePath).replace(/\\/g, "/");
        if (stats.size >= MIN_IMAGE_SIZE_BYTES) {
          allCandidates.push({
            fullPath: filePath,
            manifestKey: relPath,
            resourceType: "image",
            folder: "travel-in-depth/images",
            size: stats.size,
          });
        } else {
          allCandidates.push({
            fullPath: filePath,
            manifestKey: relPath,
            resourceType: "image",
            size: stats.size,
            skipped: true,
            reason: `< ${formatBytes(MIN_IMAGE_SIZE_BYTES)} (icon/logo)`,
          });
        }
      }
    }
  }

  return allCandidates;
}

async function runMigration() {
  console.log("==================================================");
  console.log(" Starting Media Migration to Cloudinary");
  console.log("==================================================");

  const candidates = collectMediaFiles();
  const toUpload = candidates.filter((c) => !c.skipped);
  const skippedFiles = candidates.filter((c) => c.skipped);

  console.log(`Found ${candidates.length} total media files:`);
  console.log(` - ${toUpload.length} to upload`);
  console.log(` - ${skippedFiles.length} small icons/logos skipped`);
  console.log("");

  // Existing manifest if any
  let manifest = {};
  if (fs.existsSync(MANIFEST_FILE)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf-8"));
    } catch {
      manifest = {};
    }
  }

  let totalUploadedBytes = 0;
  let uploadCount = 0;

  for (let i = 0; i < toUpload.length; i++) {
    const item = toUpload[i];
    const baseName = path.basename(item.fullPath, path.extname(item.fullPath));
    // Clean public_id: replace special chars / spaces with underscores
    const sanitizedPublicId = baseName.replace(/[^a-zA-Z0-9-_]/g, "_");

    console.log(
      `[${i + 1}/${toUpload.length}] Uploading (${item.resourceType}, ${formatBytes(item.size)}): ${item.manifestKey}...`
    );

    try {
      const result = await cloudinary.uploader.upload(item.fullPath, {
        resource_type: item.resourceType,
        folder: item.folder,
        public_id: sanitizedPublicId,
        overwrite: true,
      });

      manifest[item.manifestKey] = result.secure_url;
      totalUploadedBytes += item.size;
      uploadCount++;

      console.log(`   --> Uploaded: ${result.secure_url}`);
    } catch (err) {
      console.error(`   [!] Failed to upload ${item.manifestKey}:`, err.message || err);
    }
  }

  // Write manifest to frontend/src/mediaManifest.json
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2), "utf-8");

  console.log("\n==================================================");
  console.log(" Migration Summary");
  console.log("==================================================");
  console.log(`Files uploaded:       ${uploadCount} / ${toUpload.length}`);
  console.log(`Files skipped (<50KB): ${skippedFiles.length}`);
  console.log(`Total data migrated:  ${formatBytes(totalUploadedBytes)}`);
  console.log(`Manifest written to:  ${MANIFEST_FILE}`);
  console.log("==================================================\n");
}

runMigration().catch((err) => {
  console.error("Migration fatal error:", err);
  process.exit(1);
});
