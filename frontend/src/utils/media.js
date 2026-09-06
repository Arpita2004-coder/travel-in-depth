import mediaManifest from "../mediaManifest.json";

/**
 * Normalizes a local path and retrieves its Cloudinary CDN URL from the media manifest.
 * Handles variations like leading slashes (e.g., "/videos/v1.mp4" or "videos/v1.mp4").
 *
 * @param {string} localPath - Relative local path (e.g., "videos/v1.mp4", "/videos/v1.mp4", "assets/hawamahal.jpg")
 * @returns {string} Cloudinary secure URL or the original localPath as a fallback
 */
export function getMediaUrl(localPath) {
  if (!localPath) return "";

  // If already an absolute URL (http/https), return as is
  if (localPath.startsWith("http://") || localPath.startsWith("https://")) {
    return localPath;
  }

  // Strip leading slash or ./ for manifest lookup
  const normalizedKey = localPath.replace(/^(\.\/|\/)/, "");

  if (mediaManifest && mediaManifest[normalizedKey]) {
    return mediaManifest[normalizedKey];
  }

  console.warn(
    `[media] Path "${localPath}" (normalized: "${normalizedKey}") not found in mediaManifest.json. Falling back to local path.`
  );
  return localPath;
}

export default getMediaUrl;
