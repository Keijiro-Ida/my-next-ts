import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "books.google.com",
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true, // ← これを追加
  },
};

export default nextConfig;
