// next.config.js
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  transpilePackages: ["swagger-ui-react"],
};

module.exports = nextConfig;
