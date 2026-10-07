'use client';
import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motionConditions, type MotionConditionFlags } from '@/components/motion/media';
import { dur, ease } from '@/components/motion/tokens';

/** Single portrait with a mask reveal and a subtle parallax (desktop). */
export default function Portrait() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frame = ref.current;
      const img = frame?.querySelector('img');
      if (!frame || !img) return;
      const mm = gsap.matchMedia();
      mm.add(motionConditions, (ctx) => {
        const { desktop, reduce } = ctx.conditions as MotionConditionFlags;
        const reveal = { trigger: frame, start: 'top 80%', once: true };
        if (reduce) {
          gsap.from(frame, { opacity: 0, duration: dur.reduced, scrollTrigger: reveal });
          return;
        }
        gsap.fromTo(
          frame,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: ease.inOut, scrollTrigger: reveal },
        );
        if (desktop) {
          gsap.fromTo(
            img,
            { yPercent: -6, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1.12,
              ease: 'none',
              scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        }
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-bg-elev">
      <Image
        src="/images/self/portrait.webp"
        alt="Daniel Liman"
        fill
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 60vw, 90vw"
        className="object-cover"
      />
    </div>
  );
}
