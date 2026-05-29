import type { NextConfig } from 'next';
import webpack from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  transpilePackages: ['@nexcord-oss/connect'],
  webpack: (config) => {
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^@react-native-async-storage\/async-storage$/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /^pino-pretty$/,
      }),
    );
    return config;
  },
};

export default nextConfig;