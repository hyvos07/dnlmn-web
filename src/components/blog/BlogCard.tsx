'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  variant: 'preview' | 'full';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function BlogCard({ post, variant }: BlogCardProps) {
  const isPreview = variant === 'preview';

  return (
    // The whole card is wrapped in a `group` div so all children can respond to hover
    <Link
      href={`/blog/${post.slug}`}
      className="group border-b border-zinc-800 py-8 first:pt-0 last:border-b-0 block"
      aria-label={`Read blog post: ${post.frontmatter.title}`}
    >
      <div className="flex gap-5 md:gap-8">
        {post.frontmatter.coverImage && (
          <div className="flex-shrink-0 w-[100px] h-[100px] md:w-[160px] md:h-[130px] relative rounded-lg overflow-hidden">
            <Image
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title}
              fill
              sizes="(max-width: 768px) 100px, 160px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              draggable={false}
            />
          </div>
        )}

        {/* Right: content */}
        <div className="flex flex-col flex-grow min-w-0 justify-between">
          {/* Date + reading time */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-500 mb-1.5">
            <span>{formatDate(post.frontmatter.date)}</span>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Title */}
          <h3 className={`font-bold text-[var(--foreground)] leading-snug mb-1.5 ${
            isPreview ? 'text-base md:text-lg' : 'text-lg md:text-xl'
          }`}>
            {post.frontmatter.title}
          </h3>

          {/* Description */}
          <p className={`text-zinc-400 leading-relaxed mb-3 max-sm:hidden ${
            isPreview ? 'text-sm line-clamp-1' : 'text-sm line-clamp-2'
          }`}>
            {post.frontmatter.description || post.excerpt}
          </p>

          {/* Bottom row: Read more + tags */}
          <div className="flex items-center justify-between">
            {/* "Read more" underline also animates on group hover */}
            <span className="inline-flex items-center gap-1 text-sm font-medium text-[#54b4e2] relative w-fit">
              Read more
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="absolute left-0 bottom-0 h-[1px] bg-[#54b4e2] w-0 group-hover:w-[calc(100%-1.25rem)] transition-all duration-300" />
            </span>

            <div className="flex items-center gap-2 max-sm:hidden">
              {post.frontmatter.tags.map((tag, index) => (
                <span
                  key={tag}
                  className={`text-xs px-2.5 py-1 rounded-full border border-zinc-700 text-zinc-400 ${
                    index >= 2 ? 'md:hidden xl:block' : ''
                  }`}
                >
                  {tag}
                </span>
              ))}
              {post.frontmatter.tags.length > 2 && (
                <span className="hidden md:block xl:hidden text-xs px-2.5 py-1 rounded-full border border-zinc-700 text-zinc-400">
                  +{post.frontmatter.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
