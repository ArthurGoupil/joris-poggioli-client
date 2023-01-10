const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')

const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.jorispoggioli.com',
      },
      {
        protocol: 'http',
        hostname: 'admin.jorispoggioli.com',
      },
    ],
  }
}

module.exports = withVanillaExtract(nextConfig)
