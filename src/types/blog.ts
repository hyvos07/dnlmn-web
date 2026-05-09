export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;           // ISO format: "2025-12-01"
  tags: string[];
  coverImage?: string;    // optional, relative to /public/blog/[slug]/
  mediumUrl?: string;     // optional Medium post link
  published: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  readingTime: string;    // e.g. "5 min read"
  excerpt: string;        // First 160 chars of content, stripped of markdown
}

export interface BlogPostWithContent extends BlogPost {
  content: string;        // raw MDX string
}
