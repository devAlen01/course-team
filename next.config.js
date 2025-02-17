/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Отключает строгий режим React (по желанию)
  swcMinify: true, // Включает оптимизацию кода

  eslint: {
    ignoreDuringBuilds: true, // Игнорировать ошибки ESLint при билде
  },
  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true, // Игнорировать ошибки TypeScript при билде
  },

  output: "standalone", // Позволяет работать как SSR, без статического экспорта

  experimental: {
    appDir: true, // Включает поддержку папки "app" (если используешь Next 14+)
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://your-backend.com/api/:path*", // Проксирование API-запросов
      },
    ];
  },
};

module.exports = nextConfig;
