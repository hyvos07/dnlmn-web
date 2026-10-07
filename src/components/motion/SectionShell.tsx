'use client';
import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import type { AccentKey } from '@/data/types';
import { formatIndex } from '@/data/sections';
import { motionConditions, type MotionConditionFlags } from './media';
import { dur, ease } from './tokens';

interface SectionShellProps {
  id: string;
  index: number;
  label: string;
  accent: AccentKey;
  heading: ReactNode;
  headingLevel?: 'h1' | 'h2';
  /** 'wipe' = clip-path handoff reveal; 'none' when the heading animates itself (e.g. hero) */
  headingReveal?: 'wipe' | 'none';
  /** Fade the last element up as the section leaves (off for the final section) */
  fadeTail?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Wraps a home-page section: id + data-accent for AccentController and NavBar,
 * the big index numeral, and the heading handoff wipe.
 */
export default function SectionShell({
  id,
  index,
  label,
  accent,
  heading,
  headingLevel = 'h2',
  headingReveal = 'wipe',
  fadeTail = true,
  className = '',
  children,
}: SectionShellProps) {
  const ref = useRef<HTMLElement>(null);
  const Heading = headingLevel;
  const nn = formatIndex(index);

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const header = section.querySelector<HTMLElement>('[data-shell-heading]');
      const numeral = section.querySelector<HTMLElement>('[data-shell-numeral]');
      const body = section.querySelector<HTMLElement>('[data-shell-body]');
      const tail = body?.lastElementChild ?? null;

      const mm = gsap.matchMedia();
      mm.add(motionConditions, (ctx) => {
        const { desktop, mobile, reduce } = ctx.conditions as MotionConditionFlags;
        const reveal = { trigger: header, start: 'top 80%', once: true };

        if (header && headingReveal === 'wipe') {
          if (reduce) {
            gsap.from(header, { opacity: 0, duration: dur.reduced, scrollTrigger: reveal });
          } else if (desktop) {
            // Same direction everywhere: revealed from the bottom edge up
            gsap.fromTo(
              header,
              { clipPath: 'inset(100% 0% 0% 0%)', y: 40 },
              { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1, ease: ease.inOut, scrollTrigger: reveal },
            );
          } else if (mobile) {
            gsap.from(header, { opacity: 0, y: 24, duration: dur.reveal, ease: ease.out, scrollTrigger: reveal });
          }
        }

        if (!desktop) return;

        if (numeral) {
          gsap.fromTo(
            numeral,
            { yPercent: -15 },
            {
              yPercent: 35,
              ease: 'none',
              scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        }

        if (fadeTail && tail) {
          gsap.to(tail, {
            y: -40,
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'bottom 45%', end: 'bottom 5%', scrub: true },
          });
        }
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id={id}
      data-accent={accent}
      data-section={id}
      data-section-index={index}
      data-section-label={label}
      aria-labelledby={`${id}-heading`}
      className={`relative py-24 lg:py-40 ${className}`}
    >
      <div className="relative mx-auto w-full max-w-content px-6 md:px-12 xl:px-20">
        {/* Decorative numeral drawn via ::before so it isn't text content */}
        <span
          aria-hidden="true"
          data-shell-numeral
          data-n={nn}
          className="pointer-events-none absolute -top-8 right-6 select-none font-mono text-display text-fg opacity-[0.06] before:content-[attr(data-n)] md:right-12 lg:-top-20 xl:right-20"
        />

        <header data-shell-heading className="relative">
          <p className="mb-5 flex items-center gap-3 font-mono text-label uppercase text-fg-muted">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {nn} — {label}
          </p>
          <Heading id={`${id}-heading`} className={headingLevel === 'h1' ? 'text-display' : 'text-h2'}>
            {heading}
          </Heading>
        </header>

        <div data-shell-body className="relative mt-12 lg:mt-16">
          {children}
        </div>
      </div>
    </section>
  );
}
