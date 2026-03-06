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
        hostname: 'lightcoral-newt-645489.hostingersite.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
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

  // API Proxy: use env BACKEND_API_URL (no trailing slash). Courses always go through Next.js route for consistent response shape.
  async rewrites() {
    const backend = process.env.BACKEND_API_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3031' : null)
    if (backend) {
      return [
        // User management
        { source: '/api/users/:path*', destination: `${backend}/api/users/:path*` },
        // Admin authentication
        { source: '/api/admin/:path*', destination: `${backend}/api/admin/:path*` },
        // Brochure management (courses handled by Next.js route so response is normalized)
        { source: '/api/brochure/:path*', destination: `${backend}/api/brochure/:path*` },
        // Gallery management
        { source: '/api/gallery/:path*', destination: `${backend}/api/gallery/:path*` },
        // Media management
        { source: '/api/media/:path*', destination: `${backend}/api/media/:path*` },
        // Newsletter
        { source: '/api/newsletter/:path*', destination: `${backend}/api/newsletter/:path*` },
        // Deploy team training
        { source: '/api/deploy-team-training/:path*', destination: `${backend}/api/deploy-team-training/:path*` },
        // Batches
        { source: '/api/batches/:path*', destination: `${backend}/api/batches/:path*` },
        // Blogs
        { source: '/api/blogs/:path*', destination: `${backend}/api/blogs/:path*` },
        // Help center
        { source: '/api/helpcenter/:path*', destination: `${backend}/api/helpcenter/:path*` },
        // Enquiries
        { source: '/api/enquiries/:path*', destination: `${backend}/api/enquiries/:path*` },
      ]
    }
    return []
  },
};

export default nextConfig;
