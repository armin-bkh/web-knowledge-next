/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['miro.medium.com', 'upload.wikimedia.org', 'reactjs.org'],
  },
}

module.exports = nextConfig
