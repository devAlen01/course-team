/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  transpilePackages: ["swagger-ui-react"],
};

module.exports = nextConfig;
