import type { NextConfig } from "next";

/**
 * Saat di-deploy ke GitHub Pages sebagai project site
 * (https://<user>.github.io/<repo>), setel NEXT_PUBLIC_BASE_PATH ke "/<repo>".
 * Untuk domain kustom atau user site, biarkan kosong.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
