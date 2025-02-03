// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["image.tmdb.org"],
//     unoptimized: true,
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["swagger-ui-react"],
};

export default nextConfig;
