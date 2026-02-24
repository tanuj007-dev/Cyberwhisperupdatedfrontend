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
        hostname: 'darkred-mouse-801836.hostingersite.com',
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

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    serverActions: {
      bodySizeLimit: '200mb',
    },
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
        // User management
        { source: '/api/users/:path*', destination: 'http://localhost:3031/api/users/:path*' },
        // Admin authentication
        { source: '/api/admin/:path*', destination: 'http://localhost:3031/api/admin/:path*' },
        // Courses management
        { source: '/api/courses/:path*', destination: 'http://localhost:3031/api/courses/:path*' },
        // Brochure management
        { source: '/api/brochure/:path*', destination: 'http://localhost:3031/api/brochure/:path*' },
        // Gallery management
        { source: '/api/gallery/:path*', destination: 'http://localhost:3031/api/gallery/:path*' },
        // Media management
        { source: '/api/media/:path*', destination: 'http://localhost:3031/api/media/:path*' },
        // Newsletter
        { source: '/api/newsletter/:path*', destination: 'http://localhost:3031/api/newsletter/:path*' },
        // Deploy team training
        { source: '/api/deploy-team-training/:path*', destination: 'http://localhost:3031/api/deploy-team-training/:path*' },
        // Batches
        { source: '/api/batches/:path*', destination: 'http://localhost:3031/api/batches/:path*' },
        // Blogs
        { source: '/api/blogs/:path*', destination: 'http://localhost:3031/api/blogs/:path*' },
        // Help center
        { source: '/api/helpcenter/:path*', destination: 'http://localhost:3031/api/helpcenter/:path*' },
        // Enquiries
        { source: '/api/enquiries/:path*', destination: 'http://localhost:3031/api/enquiries/:path*' },
      ];
    }
    return [];
  },
};

export default nextConfig;
