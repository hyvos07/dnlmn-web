import 'server-only';

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { BlogPost, BlogPostWithContent, BlogFrontmatter } from '@/types/blog';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

function stripMarkdown(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '')   // code blocks
    .replace(/`[^`]*`/g, '')           // inline code
    .replace(/!\[.*?\]\(.*?\)/g, '')   // images
    .replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links → text only
    .replace(/#{1,6}\s+/g, '')         // headings
    .replace(/[*_~]{1,3}/g, '')        // bold/italic/strikethrough
    .replace(/>\s+/g, '')              // blockquotes
    .replace(/-{3,}/g, '')             // horizontal rules
    .replace(/\n{2,}/g, ' ')           // multiple newlines
    .replace(/\n/g, ' ')              // newlines
    .trim();
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));

  const posts: BlogPost[] = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const frontmatter = data as BlogFrontmatter;

      if (!frontmatter.published) {
        return null;
      }

      const stats = readingTime(content);
      const stripped = stripMarkdown(content);
      const excerpt = stripped.length > 160 ? stripped.slice(0, 160) + '…' : stripped;

      return {
        slug,
        frontmatter,
        readingTime: stats.text,
        excerpt,
      };
    })
    .filter((post): post is BlogPost => post !== null);

  posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as BlogFrontmatter;

  if (!frontmatter.published) {
    return null;
  }

  const stats = readingTime(content);
  const stripped = stripMarkdown(content);
  const excerpt = stripped.length > 160 ? stripped.slice(0, 160) + '…' : stripped;

  return {
    slug,
    frontmatter,
    readingTime: stats.text,
    excerpt,
    content,
  };
}

export function getLatestPosts(count: number): BlogPost[] {
  return getAllPosts().slice(0, count);
}
