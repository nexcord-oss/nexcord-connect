import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@nexcord-oss/connect'],
  webpack: (config) => {
    config.resolve.modules = [
      ...(config.resolve.modules || ['node_modules']),
      '../../node_modules',
    ];
    return config;
  },
};

export default nextConfig;