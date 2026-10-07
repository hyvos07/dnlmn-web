'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import type { FeaturedProject } from '@/data/projects';
import Chip from '@/components/ui/Chip';
import { useMediaQuery } from '@/components/motion/useMediaQuery';
import { demos, DemoSkeleton } from './demos';

interface ProjectPanelProps {
  project: FeaturedProject;
  index: number;
  total: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * One featured project. Desktop (lg+): a full-viewport panel the stack slides over.
 * Mobile: a card whose demo is collapsed until tapped.
 */
export default function ProjectPanel({ project: p, index, total }: ProjectPanelProps) {
  const ref = useRef<HTMLElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const desktop = useMediaQuery('(min-width: 1024px)');
  const Demo = demos[p.slug];
  const demoId = `demo-${p.slug}`;
  const showDemo = desktop || expanded;
  const links = p.competition ? [...p.links, { label: 'ITFEST IPB', href: p.competition.href }] : p.links;

  // Load the demo chunk only once the panel is close
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        io.disconnect();
      },
      { rootMargin: '100% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      data-panel={index}
      aria-labelledby={`${p.slug}-name`}
      className="relative rounded-2xl border border-line bg-bg-elev lg:min-h-screen lg:rounded-none lg:rounded-t-[2rem] lg:border-x-0 lg:border-b-0 lg:bg-bg motion-safe:lg:sticky motion-safe:lg:top-0"
    >
      <div
        data-panel-inner
        className="relative grid grid-cols-[minmax(0,1fr)] gap-8 p-6 sm:p-8 lg:min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6 lg:px-0 lg:pb-12 lg:pt-36 xl:pl-44 xl:pt-28"
        style={{
          backgroundImage: `radial-gradient(60% 50% at 85% 30%, color-mix(in srgb, var(--accent-${p.accent}) 12%, transparent), transparent 70%)`,
        }}
      >
        {/* Header */}
        <header className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
          <p className="flex items-center gap-3 font-mono text-label uppercase text-fg-muted">
            <span aria-hidden="true" className="h-px w-8" style={{ background: `var(--accent-${p.accent})` }} />
            {pad(index + 1)} / {pad(total)} · {p.type}
          </p>
          <h3 id={`${p.slug}-name`} className="text-h2">
            {p.name}
          </h3>
          <p className="max-w-prose text-fg-muted lg:text-lg">{p.summary}</p>
          <p className="border-l-2 pl-4 font-semibold leading-relaxed" style={{ borderColor: `var(--accent-${p.accent})` }}>
            <span className="mb-1 block font-mono text-label font-normal uppercase text-fg-muted">
              {p.competition ? 'Finalist · ITFEST IPB' : 'Impact'}
            </span>
            {p.impact}
          </p>
        </header>

        {/* Demo */}
        <div className="flex min-w-0 flex-col items-center gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:justify-center">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls={demoId}
            className="flex w-full items-center justify-between rounded-xl border border-line px-4 py-3 text-left text-sm font-semibold lg:hidden"
          >
            {expanded ? 'Hide the demo' : 'Try the demo'}
            <ChevronDown aria-hidden="true" size={18} className={`transition-transform duration-micro ${expanded ? 'rotate-180' : ''}`} />
          </button>
          <div id={demoId} hidden={!showDemo} className="w-full">
            {showDemo && (nearViewport ? <Demo /> : <DemoSkeleton />)}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 lg:col-start-1 lg:row-start-2">
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-sm">
            <dt className="font-mono text-label uppercase leading-5 text-fg-muted">Role</dt>
            <dd>{p.role}</dd>
            <dt className="font-mono text-label uppercase leading-5 text-fg-muted">When</dt>
            <dd>{p.when}</dd>
            <dt className="font-mono text-label uppercase leading-5 text-fg-muted">Team</dt>
            <dd>{p.team}</dd>
          </dl>

          <p className="max-w-prose text-sm leading-relaxed text-fg-muted">
            <span className="font-semibold text-fg">{p.contribution.label}.</span> {p.contribution.text}
          </p>

          <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
            {p.stack.map((s) => (
              <li key={s}>
                <Chip>{s}</Chip>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-2">
            {links.map((l, i) => {
              // Two "Post" links become "Post 1" / "Post 2"
              const sameLabel = links.filter((x) => x.label === l.label).length > 1;
              const label = sameLabel ? `${l.label} ${links.slice(0, i + 1).filter((x) => x.label === l.label).length}` : l.label;
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} — ${p.name} (opens in a new tab)`}
                    className="group inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors duration-micro hover:border-fg"
                  >
                    {label}
                    <ArrowUpRight aria-hidden="true" size={14} className="transition-transform duration-micro group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              );
            })}
          </ul>

          {p.media && (
            <figure className="flex items-center gap-4">
              <Image
                src={p.media.src}
                alt={p.media.alt}
                width={p.media.width}
                height={p.media.height}
                sizes="96px"
                className="h-20 w-24 shrink-0 rounded-lg border border-line object-cover"
              />
              <figcaption className="font-mono text-label uppercase text-fg-muted">{p.media.caption}</figcaption>
            </figure>
          )}
        </div>
      </div>

      {/* Dims as the next panel slides over (desktop, scrubbed by ProjectStack) */}
      <div data-panel-dim aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] bg-bg opacity-0" />
    </article>
  );
}
