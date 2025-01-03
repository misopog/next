import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.lanyard.rest',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
