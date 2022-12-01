const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const { withPlaiceholder } = require("@plaiceholder/next");


const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jorispoggioli.com',
      },
    ],
  }
}

module.exports = withPlaiceholder(withVanillaExtract(nextConfig))
