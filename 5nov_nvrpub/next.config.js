/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Redirect base book path to the app TOC page
      {
        source: '/books/:isbn',
        destination: '/content/book/:isbn',
        permanent: false,
      },
      // Ensure static chapter HTML routes to the chapter viewer
      {
        source: '/books/:isbn/chapter/ch:ch.html',
        destination: '/content/book/:isbn/chapter/:ch',
        permanent: false,
      },
      // Prelims HTML to viewer
      {
        source: '/books/:isbn/preliminary/prelims.html',
        destination: '/content/book/:isbn/chapter/preliminary',
        permanent: false,
      },
      // Index HTML to viewer
      {
        source: '/books/:isbn/index/index.html',
        destination: '/content/book/:isbn/chapter/index',
        permanent: false,
      },
      // Cases HTML to viewer
      {
        source: '/books/:isbn/cases/:caseId.html',
        destination: '/content/book/:isbn/chapter/:caseId',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      // Map public chapter HTML to themed chapter viewer route
      {
        source: '/books/:isbn/chapter/ch:ch.html',
        destination: '/content/book/:isbn/chapter/:ch',
      },
      // Prelims
      {
        source: '/books/:isbn/preliminary/prelims.html',
        destination: '/content/book/:isbn/chapter/preliminary',
      },
      // Index
      {
        source: '/books/:isbn/index/index.html',
        destination: '/content/book/:isbn/chapter/index',
      },
      // Cases
      {
        source: '/books/:isbn/cases/:caseId.html',
        destination: '/content/book/:isbn/chapter/:caseId',
      },
    ]
  },
}

module.exports = nextConfig
