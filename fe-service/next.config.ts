import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Fix workspace root detection
  experimental: {
    turbo: {
      root: './fe-service'
    }
  }
};

export default nextConfig;