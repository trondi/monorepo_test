import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@repo/ui', '@repo/shared'],
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname, '../../'),
  },
};

export default nextConfig;
