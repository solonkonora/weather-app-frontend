/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'github.com',
      'images.unsplash.com', 
    ], // Allow images from these sources
  },
};

export default nextConfig;


