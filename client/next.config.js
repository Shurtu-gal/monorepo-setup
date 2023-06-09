/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = withPWA({
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // Currently false change afterwards
    appDir: false,
  },
});

module.exports = nextConfig;
