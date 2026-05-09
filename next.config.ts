import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
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
      'miro.medium.com',
    ],
  },
};

export default nextConfig;
