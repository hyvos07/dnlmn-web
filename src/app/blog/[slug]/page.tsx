import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import { useMDXComponents } from '@/components/blog/MDXComponents';
import MediumBadge from '@/components/blog/MediumBadge';
import Footer from '@/components/Footer';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | dnlmn',
    };
  }

  return {
    title: `${post.frontmatter.title} | dnlmn`,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      ...(post.frontmatter.coverImage && {
        images: [{ url: post.frontmatter.coverImage }],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = useMDXComponents();

  return (
    <>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-[family-name:var(--font-plus-jakarta-sans)]">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
          {/* Cover image — full width at top */}
          {post.frontmatter.coverImage && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                width={756}
                height={256}
                className="w-full aspect-[3/1] object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                draggable={false}
                priority
              />
            </div>
          )}

          {/* Date + reading time */}
          <div className="flex items-center gap-3 text-sm text-zinc-500 mb-3 md:mb-4">
            <span>{formatDate(post.frontmatter.date)}</span>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Post title */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            {post.frontmatter.title}
          </h1>

          {/* Description */}
          <p className="text-zinc-400 text-md mb-6 leading-relaxed">
            {post.frontmatter.description}
          </p>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border border-zinc-700 text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <hr className="border-zinc-800 mb-8 md:mb-10" />

          {/* Article body */}
          <BlogPostLayout>
            <MDXRemote
              source={post.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [
                      rehypePrettyCode,
                      {
                        theme: 'ayu-dark',
                        keepBackground: true,
                        defaultLang: 'plaintext',
                      }
                    ],
                  ],
                },
              }}
            />
          </BlogPostLayout>

          {/* Back link at bottom */}
          <div className="mt-8 pt-2">
            {/* Medium Badge */}
            <MediumBadge mediumUrl={post.frontmatter.mediumUrl} />
            <Link
              href="/blog"
              className="inline-flex mt-6 items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
            >
              <span aria-hidden="true">←</span> Back to all posts
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
