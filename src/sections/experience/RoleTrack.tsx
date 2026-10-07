'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { whenIdle } from '@/components/motion/idle';
import { motionConditions, type MotionConditionFlags } from '@/components/motion/media';
import { dur, ease } from '@/components/motion/tokens';

/** Role progression as a small 3-step track that fills in as the entry enters. */
export default function RoleTrack({ steps }: { steps: string[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    (_, contextSafe) => {
      let mm: gsap.MatchMedia | undefined;
      // Set up after hydration, off the critical path
      const cancel = whenIdle(
        contextSafe!(() => {
          mm = gsap.matchMedia();
          mm.add(motionConditions, (ctx) => {
            const { reduce } = ctx.conditions as MotionConditionFlags;
            if (reduce) return;
            const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } });
            tl.from('[data-track-line]', { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: ease.inOut }, 0);
            tl.from('[data-track-step]', { opacity: 0, y: 12, duration: dur.reveal, ease: ease.out, stagger: 0.25 }, 0.1);
            tl.from('[data-track-dot]', { scale: 0, duration: 0.4, ease: 'back.out(2)', stagger: 0.25 }, 0.15);
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
    <ol ref={ref} aria-label="Role progression" className="relative grid grid-cols-3 gap-2 pt-1">
      <span aria-hidden="true" data-track-line className="absolute left-1.5 right-[calc(33%-0.375rem)] top-[0.6875rem] h-px bg-accent" />
      {steps.map((step, i) => (
        <li key={step} data-track-step className="relative flex flex-col gap-3">
          <span
            aria-hidden="true"
            data-track-dot
            className={`relative z-10 block h-3 w-3 rounded-full border-2 border-accent ${i === steps.length - 1 ? 'bg-accent' : 'bg-bg'}`}
          />
          <span className={`text-sm ${i === steps.length - 1 ? 'font-semibold text-fg' : 'text-fg-muted'}`}>
            {step}
            {i === steps.length - 1 && <span className="sr-only"> (current)</span>}
          </span>
        </li>
      ))}
    </ol>
  );
}
