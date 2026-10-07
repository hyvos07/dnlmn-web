import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      // Spotify album art (About → Spotify card)
      { protocol: 'https', hostname: 'i.scdn.co' },
      // Medium-hosted covers and images in imported blog posts
      { protocol: 'https', hostname: 'miro.medium.com' },
    ],
  },
};

export default nextConfig;
