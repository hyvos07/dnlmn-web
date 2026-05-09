import React from 'react';
import type { MDXComponents as MDXComponentsType } from 'mdx/types';
import Image from 'next/image';
import CopyButton from './CopyButton';

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (!node) return '';
  if (Array.isArray(node)) return node.map(extractTextContent).join('');
  if (typeof node === 'object' && 'props' in node) {
    const element = node as React.ReactElement<{ children?: React.ReactNode }>;
    return extractTextContent(element.props.children);
  }
  return '';
}

export function useMDXComponents(): MDXComponentsType {
  return {
    h1: ({ id, children, ...rest }) => (
      <h1
        id={id}
        className="text-2xl md:text-3xl font-bold mt-12 mb-5 text-[var(--foreground)]"
        {...rest}
      >
        {children}
      </h1>
    ),
    h2: ({ id, children, ...rest }) => (
      <h2
        id={id}
        className="text-xl md:text-2xl font-semibold mt-10 mb-4 text-[var(--foreground)] pb-1"
        {...rest}
      >
        <span className="group/heading relative inline-block">
          {children}
          <span className="absolute left-0 -bottom-1 h-[1.5px] bg-[var(--foreground)] w-0 group-hover/heading:w-full transition-all duration-300" />
          {id && (
            <a
              href={`#${id}`}
              aria-label="Link to this section"
              className="ml-2 text-zinc-600 opacity-0 translate-x-[-4px] inline-block
                         group-hover/heading:opacity-100 group-hover/heading:translate-x-0
                         transition-all duration-200"
            >
              #
            </a>
          )}
        </span>
      </h2>
    ),
    h3: ({ id, children, ...rest }) => (
      <h3
        id={id}
        className="text-lg md:text-xl font-semibold mt-8 mb-3 text-[var(--foreground)] pb-1"
        {...rest}
      >
        <span className="group/heading relative inline-block">
          {children}
          <span className="absolute left-0 -bottom-1 h-[1.5px] bg-[var(--foreground)] w-0 group-hover/heading:w-full transition-all duration-300" />
          {id && (
            <a
              href={`#${id}`}
              aria-label="Link to this section"
              className="ml-2 text-zinc-600 opacity-0 translate-x-[-4px] inline-block
                         group-hover/heading:opacity-100 group-hover/heading:translate-x-0
                         transition-all duration-200"
            >
              #
            </a>
          )}
        </span>
      </h3>
    ),
    h4: ({ id, children, ...rest }) => (
      <h4
        id={id}
        className="text-base md:text-lg font-semibold mt-8 mb-3 text-[var(--foreground)] pb-1"
        {...rest}
      >
        <span className="group/heading relative inline-block">
          {children}
          {id && (
            <a
              href={`#${id}`}
              aria-label="Link to this section"
              className="ml-2 text-zinc-600 opacity-0 translate-x-[-4px] inline-block
                         group-hover/heading:opacity-100 group-hover/heading:translate-x-0
                         transition-all duration-200"
            >
              #
            </a>
          )}
        </span>
      </h4>
    ),
    p: ({ children, ...props }) => {
      const childArray = React.Children.toArray(children);
      if (
        childArray.length === 1 &&
        React.isValidElement(childArray[0]) &&
        (childArray[0] as React.ReactElement<{ src?: string }>).props.src !== undefined
      ) {
        return <>{children}</>;
      }
      return (
        <p
          className="text-sm/8 md:text-base/8 leading-[1.8] line-height text-zinc-300/75 mb-5 font-[family-name:var(--font-plus-jakarta-sans)]"
          {...props}
        >
          {children}
        </p>
      );
    },
    a: (props) => (
      <a
        className="text-[#54b4e2] underline underline-offset-2 decoration-[#54b4e2]/40
                   hover:decoration-[#54b4e2] transition-colors duration-200"
        target={props.href?.startsWith('http') ? '_blank' : undefined}
        rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="border-l-4 border-[#54b4e2]/50 pl-6 py-2 my-6 italic text-zinc-400 text-sm md:text-base"
        {...props}
      />
    ),
    code: ({ className, ...props }: any) => {
      const isInline = !props['data-theme'];

      if (isInline) {
        return (
          <code
            className="bg-zinc-800 text-zinc-400 mx-0.5 px-1.5 py-0.5 rounded text-[0.82em] font-mono whitespace-nowrap"
            {...props}
          />
        );
      }

      return <code className={className} {...props} />;
    },
    pre: ({ className, ...props }: any) => {
      const codeContent = extractTextContent(props.children);
      const language = props['data-language'] || '';
      return (
        <div className="relative flex flex-col group">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[#27272a] bg-zinc-900/50">
            <span className="text-xs font-mono text-zinc-400 lowercase">{language}</span>
            <CopyButton code={codeContent} />
          </div>
          <pre
            className={`${className || ''} p-4 overflow-x-auto text-[13px] leading-relaxed font-mono`}
            {...props}
          />
        </div>
      );
    },
    img: (props) => {
      const { src, alt } = props as React.ImgHTMLAttributes<HTMLImageElement>;
      if (!src) return null;
      return (
        <figure className="my-8">
          <Image
            src={src}
            alt={alt || ''}
            width={1200}
            height={630}
            className="w-full rounded-lg"
            sizes="(max-width: 680px) 100vw, 680px"
          />
          {alt && (
            <figcaption className="text-center text-xs text-zinc-500 mt-3 italic">
              {alt}
            </figcaption>
          )}
        </figure>
      );
    },
    hr: () => (
      <div className="flex font-bold justify-center items-center my-10 gap-3 text-zinc-400" role="separator">
        <span>·</span>
        <span>·</span>
        <span>·</span>
      </div>
    ),
    ul: (props) => (
      <ul
        className="list-outside pl-6 mb-5 space-y-1.5 text-zinc-400 text-sm md:text-base leading-[1.8] [&_ul]:mt-1.5 [&_ul]:mb-0 [&_ol]:mt-1.5 [&_ol]:mb-0"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="list-decimal list-outside pl-6 mb-5 space-y-1.5 text-zinc-400 text-sm md:text-base leading-[1.8] [&_ul]:mt-1.5 [&_ul]:mb-0 [&_ol]:mt-1.5 [&_ol]:mb-0"
        {...props}
      />
    ),
    li: (props) => (
      <li className="pl-0.5" {...props} />
    ),
    figure: ({ children, ...props }: any) => {
      if ('data-rehype-pretty-code-figure' in props) {
        return <figure className="my-6 border border-[#27272a] rounded-lg overflow-hidden" {...props}>{children}</figure>;
      }
      return <figure {...props}>{children}</figure>;
    },
  };
}
