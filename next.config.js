/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ibb.co',
      },
      {
        protocol: 'https',
        hostname: 'web.whatsapp.com',
      },
    ],
  },
  /* config options here */
};

module.exports = nextConfig; 