import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // ~13KB of CSS gzipped: inlining it removes two render-blocking requests on mobile.
    inlineCss: true,
  },
  images: {
    // AVIF first (smallest on mobile), WebP fallback.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1280],
    imageSizes: [96, 160, 256, 384, 480],
    qualities: [70, 80],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
