'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { dur } from './tokens';

/**
 * Swaps the page accent (`--accent` on <html>) to the `data-accent` of whatever is
 * at the viewport center. Nested accents (project panels inside Work) win over
 * their parent section. Also renders the soft glow that follows `--accent`.
 */
export default function AccentController() {
  useGSAP(() => {
    const root = document.documentElement;
    const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let current = '';
    const triggers: ScrollTrigger[] = [];

    const update = () => {
      // Document order puts children after their parents, so the last active one is the deepest.
      const active = triggers.filter((st) => st.isActive).pop();
      const key = (active?.trigger as HTMLElement | undefined)?.dataset.accent;
      if (!key || key === current) return;
      current = key;
      const color = getComputedStyle(root).getPropertyValue(`--accent-${key}`).trim();
      gsap.to(root, {
        '--accent': color,
        duration: reduced() ? dur.reduced : dur.accent,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    for (const el of gsap.utils.toArray<HTMLElement>('[data-accent]')) {
      triggers.push(
        ScrollTrigger.create({ trigger: el, start: 'top center', end: 'bottom center', onToggle: update }),
      );
    }
    update();
  });

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          'radial-gradient(70% 55% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)',
      }}
    />
  );
}
