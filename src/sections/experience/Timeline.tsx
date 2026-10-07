'use client';
import { useRef } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { whenIdle } from '@/components/motion/idle';
import { ArrowUpRight } from 'lucide-react';
import { compfestHref, experience } from '@/data/experience';
import Chip from '@/components/ui/Chip';
import WhenNear from '@/components/ui/WhenNear';
import { motionConditions, type MotionConditionFlags } from '@/components/motion/media';
import { dur, ease } from '@/components/motion/tokens';
import RoleTrack from './RoleTrack';

function VisualizerSkeleton() {
  return (
    <div className="flex h-72 items-center justify-center rounded-2xl border border-line bg-bg-elev font-mono text-label uppercase text-fg-muted">
      Loading visualizer…
    </div>
  );
}

const SortingVisualizer = dynamic(() => import('./SortingVisualizer'), { ssr: false, loading: VisualizerSkeleton });

/** Vertical timeline; the line fills with --accent as you scroll and each dot fills when reached. */
export default function Timeline() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const list = ref.current;
      if (!list) return;
      let mm: gsap.MatchMedia | undefined;
      // Set up after hydration, off the critical path
      const cancel = whenIdle(
        contextSafe!(() => {
          mm = gsap.matchMedia();
          mm.add(motionConditions, (ctx) => {
            const { reduce } = ctx.conditions as MotionConditionFlags;

            if (reduce) {
              gsap.set('[data-timeline-fill]', { scaleY: 1 });
              gsap.set('[data-timeline-dot]', { backgroundColor: 'var(--accent)' });
              gsap.utils.toArray<HTMLElement>('[data-entry]').forEach((entry) => {
                gsap.from(entry, { opacity: 0, duration: dur.reduced, scrollTrigger: { trigger: entry, start: 'top 85%', once: true } });
              });
              return;
            }

            gsap.fromTo(
              '[data-timeline-fill]',
              { scaleY: 0 },
              { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 60%', end: 'bottom 60%', scrub: true } },
            );

            gsap.utils.toArray<HTMLElement>('[data-entry]').forEach((entry) => {
              const dot = entry.querySelector('[data-timeline-dot]');
              const head = entry.querySelector('[data-entry-head]');
              const body = entry.querySelector('[data-entry-body]');
              // Dot fills when the scrubbed line reaches it
              gsap.to(dot, {
                backgroundColor: 'var(--accent)',
                scale: 1.25,
                duration: dur.micro,
                scrollTrigger: { trigger: entry, start: 'top 60%', toggleActions: 'play none none reverse' },
              });
              const tl = gsap.timeline({ scrollTrigger: { trigger: entry, start: 'top 80%', once: true } });
              tl.fromTo(
                head,
                { clipPath: 'inset(100% 0% 0% 0%)', y: 24 },
                { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 0.9, ease: ease.inOut, clearProps: 'clipPath' },
              );
              tl.from(body, { opacity: 0, y: 16, duration: dur.reveal, ease: ease.out }, 0.3);
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
    <ol ref={ref} className="relative flex flex-col gap-20 pl-8 md:pl-14">
      <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-line md:left-[11px]" />
      <span
        aria-hidden="true"
        data-timeline-fill
        className="absolute bottom-2 left-[5px] top-2 w-px origin-top scale-y-0 bg-accent md:left-[11px]"
      />

      {experience.map((e) => (
        <li key={e.org} data-entry data-accent={e.accent} className="relative">
          <span
            aria-hidden="true"
            data-timeline-dot
            className="absolute -left-8 top-2 h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg md:-left-14 md:ml-[6px]"
          />

          <div data-entry-head className="flex flex-wrap items-start justify-between gap-x-8 gap-y-3">
            <div className="flex items-center gap-4">
              <Image src={e.logo} alt="" width={44} height={44} className="h-11 w-11 shrink-0 rounded-lg bg-fg object-contain p-1" />
              <div>
                <h3 className="text-h3">{e.role}</h3>
                <a
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 rounded-sm text-fg-muted hover:text-fg"
                >
                  {e.org}
                  <ArrowUpRight aria-hidden="true" size={14} className="transition-transform duration-micro group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
            <p className="font-mono text-label uppercase text-fg-muted">{e.period}</p>
          </div>

          <div data-entry-body className="mt-6 grid gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-5 lg:col-span-7">
              {e.unit && <p className="text-sm text-fg-muted">{e.unit}</p>}
              {e.progression && <RoleTrack steps={e.progression} />}
              <ul className="flex max-w-prose flex-col gap-2.5">
                {e.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-fg-muted" />
                    <span>
                      {point.includes('COMPFEST UI') ? (
                        <>
                          {point.split('COMPFEST UI')[0]}
                          <a href={compfestHref} target="_blank" rel="noopener noreferrer" className="rounded-sm underline underline-offset-4 hover:text-accent">
                            COMPFEST UI
                          </a>
                          {point.split('COMPFEST UI')[1]}
                        </>
                      ) : (
                        point
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              {e.courses && (
                <ul className="flex flex-wrap gap-2" aria-label="Courses">
                  {e.courses.map((c) => (
                    <li key={c.code}>
                      <Chip className="normal-case">
                        {c.name} <span className="ml-2 opacity-70">{c.code}</span>
                      </Chip>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {e.courses && (
              <div className="lg:col-span-5">
                <WhenNear fallback={<VisualizerSkeleton />}>
                  <SortingVisualizer />
                </WhenNear>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
