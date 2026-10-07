'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { hero, profile, resume } from '@/data/profile';
import SocialLinks from '@/components/ui/SocialLinks';
import { motionConditions, type MotionConditionFlags } from '@/components/motion/media';
import { dur, ease, stagger } from '@/components/motion/tokens';
import { useScrollTo } from '@/components/motion/useReducedMotion';
import ParticleField from './ParticleField';
import { splashRemaining } from './Splash';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const exitRef = useRef(0);
  const [particlesOn, setParticlesOn] = useState(false);
  const scrollToId = useScrollTo();

  useGSAP(
    () => {
      const section = ref.current;
      if (!section) return;
      const name = section.querySelector<HTMLElement>('[data-hero-name]');
      const rest = section.querySelectorAll<HTMLElement>('[data-hero-fade]');
      // Start as the splash slides away
      const delay = Math.max(0, splashRemaining() - 0.45);

      const mm = gsap.matchMedia();
      mm.add(motionConditions, (ctx) => {
        const { desktop, reduce } = ctx.conditions as MotionConditionFlags;

        if (reduce) {
          gsap.from([name, ...rest], { opacity: 0, duration: dur.reduced, delay });
          gsap.delayedCall(delay, () => setParticlesOn(true));
          return;
        }

        const tl = gsap.timeline({ delay, onComplete: () => setParticlesOn(true) });
        SplitText.create(name, {
          type: 'lines',
          mask: 'lines',
          tag: 'span',
          aria: 'none',
          autoSplit: true,
          onSplit: (self) => {
            tl.from(self.lines, { yPercent: 105, duration: 1, ease: ease.out, stagger: 0.12 }, 0);
          },
        });
        tl.from(rest, { opacity: 0, y: 24, duration: dur.reveal, ease: ease.out, stagger }, 0.35);
        // Particles fade in while the copy settles
        tl.call(() => setParticlesOn(true), [], 0.6);

        if (desktop) {
          // Exit: name scales down and fades, particles converge to the bottom edge
          gsap.to(name, {
            scale: 0.92,
            opacity: 0.15,
            transformOrigin: 'left bottom',
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
          });
        }
        gsap.to(exitRef, {
          current: 1,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="home"
      data-section="home"
      data-accent="hydro"
      aria-labelledby="home-heading"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden pb-16 pt-28"
    >
      <ParticleField exitRef={exitRef} visible={particlesOn} />
      {/* Keep text readable over the field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_25%_55%,var(--bg)_0%,transparent_100%)] opacity-80"
      />

      <div className="relative mx-auto w-full max-w-content px-6 md:px-12 xl:px-20">
        <p data-hero-fade className="mb-6 flex items-center gap-3 font-mono text-label uppercase text-fg-muted">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {profile.role} — {profile.location}
        </p>

        <h1 id="home-heading" data-hero-name className="text-display">
          <span className="block">{profile.firstName}</span>
          <span className="block">{profile.lastName}</span>
        </h1>

        <p data-hero-fade className="mt-8 max-w-[38rem] text-lg leading-relaxed text-fg-muted md:text-xl">
          {hero.positioning}
        </p>

        <p data-hero-fade className="mt-6 font-mono text-label uppercase text-fg">
          <span className="text-fg-muted">Currently:</span> {hero.currently.role} at {hero.currently.org}
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToId('work');
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-semibold text-bg transition-transform duration-micro hover:-translate-y-0.5"
          >
            See my work
            <ArrowDown aria-hidden="true" size={16} className="transition-transform duration-micro group-hover:translate-y-0.5" />
          </a>
          <a
            href={resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors duration-micro hover:border-fg"
          >
            {resume.label}
            <ArrowUpRight aria-hidden="true" size={16} className="transition-transform duration-micro group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div data-hero-fade className="mt-8 -ml-2.5">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
