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
    esmExternals: true
  },
  // 🚀 Ajustes para que Cloudflare Pages maneje las rutas correctamente
  output: "export",  // Indica que Next.js debe generar archivos estáticos
  trailingSlash: true // Asegura que las rutas terminen en "/"
};

module.exports = nextConfig;
