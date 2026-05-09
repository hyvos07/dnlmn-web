import type { ReactNode } from 'react';

interface BlogPostLayoutProps {
  children: ReactNode;
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return (
    <article className="prose-invert max-w-[680px] w-full mx-auto">
      {children}
    </article>
  );
}
