import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "kasi.wizards.co.in",
      },
    ],
  },
};

export default nextConfig;