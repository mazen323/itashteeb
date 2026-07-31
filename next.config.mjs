/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // project photos are hosted on Unsplash for now
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
