import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <div id="blog" className="mt-16 py-16 md:px-8 w-full">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-16 text-center">My Blog</h2>

        {posts.length > 0 ? (
          <div className="flex flex-col w-full">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} variant="preview" />
            ))}
          </div>
        ) : (
          <p className="text-center text-zinc-400">No posts yet. Stay tuned!</p>
        )}

        <div className="flex justify-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       border border-zinc-600 text-zinc-200 text-sm font-medium
                       hover:bg-white hover:text-black hover:border-white transition-all duration-200"
          >
            View all articles <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
