'use client';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { FeaturedProject } from '@/data/projects';
import { motionConditions, type MotionConditionFlags } from '@/components/motion/media';
import { useScrollTo } from '@/components/motion/useReducedMotion';
import ProjectPanel from './ProjectPanel';

const markerId = (slug: string) => `project-${slug}`;

/**
 * The four featured projects. On lg+ (motion allowed) panels are `position: sticky`,
 * so each one slides up over the previous while the outgoing panel scales to 0.94 and dims.
 *
 * Sticky elements report their stuck position, so accent swaps, the index and scroll targets
 * use invisible in-flow markers (one per panel, same box as the panel's flow position).
 */
export default function ProjectStack({ projects }: { projects: FeaturedProject[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inStack, setInStack] = useState(false);
  const scrollToId = useScrollTo();

  // Size markers to their panels; let tall panels scroll fully before they stick.
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const panels = [...root.querySelectorAll<HTMLElement>('[data-panel]')];
    const markers = [...root.querySelectorAll<HTMLElement>('[data-marker]')];
    let raf = 0;

    const measure = () => {
      const gap = parseFloat(getComputedStyle(root).rowGap) || 0;
      const vh = window.innerHeight;
      let top = 0;
      panels.forEach((panel, i) => {
        const h = panel.offsetHeight;
        markers[i].style.top = `${top}px`;
        markers[i].style.height = `${h}px`;
        panel.style.top = `${Math.min(0, vh - h)}px`;
        top += h + gap;
      });
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        measure();
        ScrollTrigger.refresh();
      });
    };

    measure();
    const ro = new ResizeObserver(schedule);
    panels.forEach((p) => ro.observe(p));
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, []);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', root);
      const markers = gsap.utils.toArray<HTMLElement>('[data-marker]', root);

      // The sticky index would otherwise hang below the stack onto the next content
      ScrollTrigger.create({
        trigger: root,
        start: 'top 55%',
        end: () => `bottom ${window.innerHeight * 0.5 + 120}px`,
        onToggle: (self) => setInStack(self.isActive),
      });

      markers.forEach((marker, i) => {
        ScrollTrigger.create({
          trigger: marker,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => self.isActive && setActive(i),
        });
      });

      const mm = gsap.matchMedia();
      mm.add(motionConditions, (ctx) => {
        const { desktop } = ctx.conditions as MotionConditionFlags;
        if (!desktop) return;
        markers.slice(1).forEach((marker, i) => {
          const outgoing = panels[i];
          const scrub = { trigger: marker, start: 'top bottom', end: 'top top', scrub: true };
          gsap.fromTo(
            outgoing.querySelector('[data-panel-inner]'),
            { scale: 1 },
            { scale: 0.94, transformOrigin: '50% 0%', ease: 'none', scrollTrigger: scrub },
          );
          gsap.fromTo(outgoing.querySelector('[data-panel-dim]'), { opacity: 0 }, { opacity: 0.7, ease: 'none', scrollTrigger: scrub });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  // Tabbing into a covered panel brings it to the front
  const onFocus = (e: React.FocusEvent) => {
    const panel = (e.target as HTMLElement).closest<HTMLElement>('[data-panel]');
    if (!panel) return;
    const i = Number(panel.dataset.panel);
    if (i !== active && window.matchMedia('(min-width: 1024px)').matches) scrollToId(markerId(projects[i].slug));
  };

  return (
    <div ref={ref} onFocus={onFocus} className="relative flex flex-col gap-6 lg:gap-0">
      {/* Project index: vertical in the left gutter on xl, a row on lg */}
      <div className="pointer-events-none sticky top-0 z-30 hidden h-0 lg:block">
        <nav
          aria-label="Featured projects"
          aria-hidden={!inStack || undefined}
          inert={!inStack}
          className={`absolute left-0 top-[4.5rem] transition-opacity duration-micro xl:top-[50vh] xl:-translate-y-1/2 ${
            inStack ? 'pointer-events-auto opacity-100' : 'opacity-0'
          }`}
        >
          <ol className="flex gap-5 xl:flex-col xl:gap-3">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <a
                  href={`#${markerId(p.slug)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(markerId(p.slug));
                  }}
                  aria-current={active === i ? 'true' : undefined}
                  className="group flex items-center gap-2 rounded-sm font-mono text-label uppercase text-fg-muted transition-colors duration-micro hover:text-fg aria-[current=true]:text-fg"
                >
                  <span
                    aria-hidden="true"
                    className="h-px w-3 bg-line transition-all duration-micro group-aria-[current=true]:w-6"
                    style={active === i ? { background: `var(--accent-${p.accent})` } : undefined}
                  />
                  {String(i + 1).padStart(2, '0')} {p.name.replace('Exhibition ', '').replace('!', '')}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {projects.map((p) => (
        <div
          key={p.slug}
          id={markerId(p.slug)}
          data-marker
          data-accent={p.accent}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0"
        />
      ))}

      {projects.map((p, i) => (
        <ProjectPanel key={p.slug} project={p} index={i} total={projects.length} />
      ))}
    </div>
  );
}
