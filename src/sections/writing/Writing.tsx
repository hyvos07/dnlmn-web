import Link from 'next/link';
import SectionShell from '@/components/motion/SectionShell';
import BlogCard from '@/components/blog/BlogCard';
import type { SectionMeta } from '@/data/sections';
import type { BlogPost } from '@/types/blog';
import { writing } from '@/data/profile';

export default function Writing({ section, posts }: { section: SectionMeta; posts: BlogPost[] }) {
  return (
    <SectionShell {...section} heading="Writing">
      <p className="-mt-6 mb-12 max-w-prose text-lg text-fg-muted lg:-mt-8">{writing.line}</p>

      {posts.length > 0 ? (
        <div className="flex flex-col border-t border-line pt-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="preview" />
          ))}
        </div>
      ) : (
        <p className="text-fg-muted">No posts yet. Stay tuned!</p>
      )}

      <div className="mt-12">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors duration-micro hover:border-fg"
        >
          All articles
          <span aria-hidden="true" className="transition-transform duration-micro group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </SectionShell>
  );
}
