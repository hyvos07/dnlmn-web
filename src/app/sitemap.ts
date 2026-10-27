import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/blog` },
    ...getAllPosts().map(post => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    })),
  ];
}
