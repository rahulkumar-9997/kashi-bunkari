import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    htmlLimitedBots: /.*/,
    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: "https://kasi.wizards.co.in/api/:path*",
        },
      ];
    },

    images: {
      qualities: [75, 100],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "kasi.wizards.co.in",
        },
      ],
    },
};

export default nextConfig;