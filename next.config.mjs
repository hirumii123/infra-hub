/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_WA_API_BASE_URL || 'http://localhost:3000'}/:path*`,
  //     },
  //   ]
  // },
};

export default nextConfig;