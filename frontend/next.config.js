/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true
  },
  // Configuración específica para Cloudflare Pages
  experimental: {
    // Habilitar características compatibles con Cloudflare Pages
    esmExternals: true
  }
}

module.exports = nextConfig
