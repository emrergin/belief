const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // basePath: '/belief',
  output: 'standalone',
  assetPrefix: isProd ? '/belief/' : undefined,
};

module.exports = nextConfig;
