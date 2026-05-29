import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@nexcord-oss/connect'],
  webpack: (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || ['node_modules']),
      path.resolve(__dirname, '../../node_modules'),
    ];
    return config;
  },
};

export default nextConfig;