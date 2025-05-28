/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/agent/:path*',
        destination: 'http://localhost:3001/agent/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 