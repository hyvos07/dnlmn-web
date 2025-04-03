import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'i.scdn.co',
      'raw.githubusercontent.com',
      'www.vectorlogo.zone',
      'upload.wikimedia.org',
      'www.svgrepo.com',
      'user-images.githubusercontent.com',
      'cdn.worldvectorlogo.com',
      'github.com',
    ],
  },
  swcMinify: true,
  legacyBrowsers: false,
};

export default nextConfig;
