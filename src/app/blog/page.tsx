import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blog | dnlmn',
  description: 'Thoughts on tech, building, and life — by Daniel Liman.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
    <div className="min-h-screen bg-bg text-fg">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-12 pt-28 md:pb-20 md:pt-32">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg transition-colors duration-200 mb-12"
        >
          <span aria-hidden="true">←</span> Back
        </Link>

        {/* Page header */}
        <div className="mb-14">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            My Blog
          </h1>
          <p className="text-fg-muted text-md">
            This is the place where I dump my stories as a developer (or as a compsci student, idk).
          </p>
        </div>

        {/* Posts list */}
        {posts.length > 0 ? (
          <div className="flex flex-col w-full">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} variant="full" />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-fg-muted text-lg mb-2">No posts yet.</p>
            <p className="text-fg-muted text-sm">
              Check back soon — I&apos;m working on something!
            </p>
          </div>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
}
