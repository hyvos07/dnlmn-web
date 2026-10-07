'use client';
import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { motionConditions, type MotionConditionFlags } from './media';
import { dur, ease, stagger } from './tokens';

interface SplitRevealProps {
  as?: 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3';
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  /** Play on mount instead of when scrolled into view */
  immediate?: boolean;
}

/** Masked line-by-line reveal (GSAP SplitText). Reduced motion: a short opacity fade. */
export default function SplitReveal({
  as = 'div',
  children,
  className,
  id,
  delay = 0,
  immediate = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Typed as a div for the ref; the rendered tag can be any of the allowed text elements
  const Tag = as as 'div';

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add(motionConditions, (ctx) => {
        const { reduce } = ctx.conditions as MotionConditionFlags;
        const scrollTrigger = immediate ? undefined : { trigger: el, start: 'top 85%', once: true };

        if (reduce) {
          gsap.from(el, { opacity: 0, duration: dur.reduced, delay, scrollTrigger });
          return;
        }

        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          // spans keep the markup valid inside headings
          tag: 'span',
          // Line splits keep the text intact for screen readers; 'auto' would add aria-label to a role-less element
          aria: 'none',
          autoSplit: true,
          // Returning the tween lets SplitText carry its progress over when it re-splits on resize
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 100,
              duration: dur.reveal,
              ease: ease.out,
              stagger,
              delay,
              scrollTrigger,
            }),
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
