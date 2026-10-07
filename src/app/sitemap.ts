import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPost = posts[0] ? new Date(posts[0].frontmatter.date) : new Date();

  return [
    { url: profile.siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${profile.siteUrl}/blog`, lastModified: latestPost, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${profile.siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
