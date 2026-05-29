import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@nexcord-oss/connect'],
};

export default nextConfig;