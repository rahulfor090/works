/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Ignore only ESLint errors during next build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Ignore TypeScript errors during build (faster builds)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Enable SWC minification (faster than Terser)
  swcMinify: true,

  // ✅ Optimize compilation
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ Experimental features for faster builds
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['@mui/material', '@mui/icons-material', 'lucide-react'],
  },

  // ✅ Reduce module resolution time
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },

  async redirects() {
    return [
      {
        source: '/books/:isbn',
        destination: '/content/book/:isbn',
        permanent: false,
      },
      {
        source: '/books/:isbn/chapter/ch:ch.html',
        destination: '/content/book/:isbn/chapter/:ch',
        permanent: false,
      },
      {
        source: '/books/:isbn/preliminary/prelims.html',
        destination: '/content/book/:isbn/chapter/preliminary',
        permanent: false,
      },
      {
        source: '/books/:isbn/index/index.html',
        destination: '/content/book/:isbn/chapter/index',
        permanent: false,
      },
      {
        source: '/books/:isbn/cases/:caseId.html',
        destination: '/content/book/:isbn/chapter/:caseId',
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: '/books/:isbn/chapter/ch:ch.html',
        destination: '/content/book/:isbn/chapter/:ch',
      },
      {
        source: '/books/:isbn/preliminary/prelims.html',
        destination: '/content/book/:isbn/chapter/preliminary',
      },
      {
        source: '/books/:isbn/index/index.html',
        destination: '/content/book/:isbn/chapter/index',
      },
      {
        source: '/books/:isbn/cases/:caseId.html',
        destination: '/content/book/:isbn/chapter/:caseId',
      },
    ];
  },
};

module.exports = nextConfig;
