import type { NextConfig } from "next";

// Tuned for a small server (1 GB RAM, 1 OCPU):
// - Photos are served as-is (they're already web-sized) instead of being resized on the server,
//   so no image library runs there and Caddy can serve them straight from disk.
// - The build output is plain JavaScript with no native modules, so one build runs on x86 and ARM.
const nextConfig: NextConfig = {
  output: "standalone",
  images: { unoptimized: true },
  // Pre-rendered pages are read from disk (the OS caches them); keep Next's own page cache small.
  cacheMaxMemorySize: 8 * 1024 * 1024,
  outputFileTracingExcludes: { "*": ["node_modules/@img/**", "node_modules/sharp/**"] },
};

export default nextConfig;
