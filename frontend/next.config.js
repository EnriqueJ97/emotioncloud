/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true
  },
  experimental: {
    esmExternals: true
  },
  output: "export", // 🔥 Asegura que Next.js genere HTML estático para Cloudflare Pages
  trailingSlash: true // 🔥 Asegura que las rutas sean compatibles con Cloudflare
};

module.exports = nextConfig;
