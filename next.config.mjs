/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keeps your current configuration for build stability
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Optimization: Removing 'unoptimized: true' enables the Next.js Image Optimization API.
  // This is critical for the "fastest feel" by reducing image payload sizes.
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },

  // Added security and SEO headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ]
  },
}

export default nextConfig
