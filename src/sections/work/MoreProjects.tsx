'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { whenIdle } from '@/components/motion/idle';
import { ArrowUpRight, Github } from 'lucide-react';
import { moreOnGithub, moreProjects } from '@/data/projects';
import Chip from '@/components/ui/Chip';
import { motionConditions, type MotionConditionFlags } from '@/components/motion/media';
import { dur, ease, stagger } from '@/components/motion/tokens';
import LiveClock from './demos/LiveClock';

const card =
  'group relative flex h-full flex-col gap-4 rounded-2xl border border-line bg-bg-elev p-6 transition-transform duration-micro ease-out hover:-translate-y-1 focus-within:-translate-y-1 motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0';

function Arrow() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      size={18}
      className="text-fg-muted opacity-60 transition-all duration-micro group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg group-hover:opacity-100"
    />
  );
}

/** Compact row after the featured stack: Ngawasin (live WIB clock), Dissonance, GitHub. */
export default function MoreProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const [ngawasin, dissonance] = moreProjects;

  useGSAP(
    (_, contextSafe) => {
      let mm: gsap.MatchMedia | undefined;
      // Set up after hydration, off the critical path
      const cancel = whenIdle(
        contextSafe!(() => {
          mm = gsap.matchMedia();
          mm.add(motionConditions, (ctx) => {
            const { reduce } = ctx.conditions as MotionConditionFlags;
            gsap.from('[data-more-card]', {
              opacity: 0,
              y: reduce ? 0 : 24,
              duration: reduce ? dur.reduced : dur.reveal,
              ease: ease.out,
              stagger: reduce ? 0 : stagger * 1.5,
              scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
            });
          });
        }),
      );
      return () => {
        cancel();
        mm?.revert();
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} data-accent="neutral" className="pt-20 lg:pt-28">
      <h3 className="mb-8 font-mono text-label uppercase text-fg-muted">More projects</h3>
      <ul className="grid gap-4 md:grid-cols-3">
        {[ngawasin, dissonance].map((p) => (
          <li key={p.name} data-more-card>
            <article className={card}>
              <div className="flex items-start justify-between gap-4">
                <h4 className="text-h3">
                  {/* Whole card is clickable via the stretched link */}
                  <a href={p.links[0].href} target="_blank" rel="noopener noreferrer" className="rounded-sm after:absolute after:inset-0 after:rounded-2xl">
                    {p.name}
                  </a>
                </h4>
                <Arrow />
              </div>
              {p === ngawasin && <LiveClock />}
              <p className="text-sm leading-relaxed text-fg-muted">{p.line}</p>
              <ul className="mt-auto flex flex-wrap gap-1.5" aria-label="Stack">
                {p.stack.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>
              {p.links.length > 1 && (
                <ul className="relative z-10 flex gap-4 text-sm">
                  {p.links.slice(1).map((l) => (
                    <li key={l.href}>
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="rounded-sm text-fg-muted underline-offset-4 hover:text-fg hover:underline">
                        {l.label} <span aria-hidden="true">↗</span>
                        <span className="sr-only"> — {p.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        ))}
        <li data-more-card>
          <article className={card}>
            <div className="flex items-start justify-between gap-4">
              <Github aria-hidden="true" size={28} />
              <Arrow />
            </div>
            <h4 className="mt-auto text-h3">
              <a href={moreOnGithub.href} target="_blank" rel="noopener noreferrer" className="rounded-sm after:absolute after:inset-0 after:rounded-2xl">
                {moreOnGithub.label.replace(' →', '')}
              </a>
            </h4>
            <p className="font-mono text-label uppercase text-fg-muted">github.com/hyvos07</p>
          </article>
        </li>
      </ul>
    </div>
  );
}
