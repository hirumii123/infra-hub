/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_WA_API_BASE_URL || 'http://localhost:3001'}/:path*`, 
      },
    ]
  },
};

export default nextConfig;