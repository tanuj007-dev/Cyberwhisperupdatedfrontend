/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cloudinary-url',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
    // Enable optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'framer-motion'],
  },

  // Compression
  compress: true,

  // Generate ETags for caching
  generateEtags: true,

  // Production optimizations
  productionBrowserSourceMaps: false,
  poweredByHeader: false,

  // Improve build performance
  onDemandEntries: {
    maxInactiveAge: 15000,
    pagesBufferLength: 5,
  },

  // API Proxy to bypass CORS (dev only; production uses backend URL directly)
  async rewrites() {
    if (process.env.NODE_ENV === 'development' && !process.env.BACKEND_API_URL) {
      return [
        { source: '/api/users/:path*', destination: 'http://localhost:3031/api/users/:path*' },
      ];
    }
    return [];
  },
};

export default nextConfig;
