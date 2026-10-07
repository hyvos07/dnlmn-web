'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'motion/react';
import { sections, formatIndex } from '@/data/sections';
import { resume } from '@/data/profile';
import { useReducedMotion, useScrollLock, useScrollTo } from '@/components/motion/useReducedMotion';
import { dur, easeCss } from '@/components/motion/tokens';

const links = sections.filter((s) => s.id !== 'home');

export default function NavBar() {
  const [active, setActive] = useState(sections[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const scrollToId = useScrollTo();
  const setScrollLocked = useScrollLock();

  const pathname = usePathname();
  const isHome = pathname === '/';
  // Off the home page the indicator names the route (blog → Writing) and the bar shows reading progress
  const currentId = isHome ? active : pathname.startsWith('/blog') ? 'writing' : 'home';
  const current = sections.find((s) => s.id === currentId) ?? sections[0];

  // Active section + in-section progress. Progress is written straight to the bar's transform.
  useGSAP(
    () => {
    const setProgress = gsap.quickSetter(barRef.current, 'scaleX');
    setProgress(0);

    if (!isHome) {
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => setProgress(self.progress) });
      return;
    }

    for (const el of gsap.utils.toArray<HTMLElement>('[data-section]')) {
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) setActive(el.dataset.section ?? 'home');
        },
        onUpdate: (self) => {
          if (self.isActive) setProgress(self.progress);
        },
      });
    }
    },
    { dependencies: [isHome, pathname], revertOnUpdate: true },
  );

  // Mobile menu: lock scroll, focus the first link, close on Escape and restore focus
  useEffect(() => {
    if (!menuOpen) return;
    setScrollLocked(true);
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      setScrollLocked(false);
    };
  }, [menuOpen, setScrollLocked]);

  // On the home page links scroll (through Lenis); elsewhere they navigate to /#id
  const goTo = (id: string) => (e: React.MouseEvent) => {
    if (menuOpen) {
      setMenuOpen(false);
      setScrollLocked(false);
    }
    if (!isHome) return;
    e.preventDefault();
    scrollToId(id);
  };

  const labelMotion = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { y: '100%' }, animate: { y: '0%' }, exit: { y: '-100%' } };

  return (
    <header className="fixed inset-x-0 top-0 z-[900]">
      <nav
        aria-label="Primary"
        className="relative border-b border-line bg-[color-mix(in_srgb,var(--bg)_72%,transparent)] backdrop-blur-md"
      >
        <div className="mx-auto flex h-14 max-w-content items-center justify-between gap-6 px-6 md:px-12 xl:px-20">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/#home" onClick={goTo('home')} aria-label="Daniel Liman — home" className="shrink-0 rounded-sm">
              <Image src="/svgs/furina.svg" alt="" width={28} height={28} className="h-7 w-7" />
            </Link>

            {/* Section indicator. Screen readers get the same info from aria-current on the links. */}
            <div aria-hidden="true" className="relative h-4 overflow-hidden font-mono text-label uppercase">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current.id}
                  className="block whitespace-nowrap"
                  {...labelMotion}
                  transition={{ duration: reducedMotion ? dur.reduced : 0.6, ease: easeCss.out }}
                >
                  {formatIndex(current.index)} — {current.label}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <ul className="hidden items-center gap-7 text-sm lg:flex">
            {links.map((s) => (
              <li key={s.id}>
                <Link
                  href={`/#${s.id}`}
                  onClick={goTo(s.id)}
                  aria-current={active === s.id ? 'location' : undefined}
                  className="rounded-sm text-fg-muted transition-colors duration-micro hover:text-fg aria-[current=location]:text-fg"
                >
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={resume.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-4 py-1.5 transition-colors duration-micro hover:border-fg"
              >
                {resume.label} <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-sm font-mono text-label uppercase lg:hidden"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>

        {/* In-section progress */}
        <div
          ref={barRef}
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-accent"
        />
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
            transition={{ duration: dur.micro, ease: easeCss.out }}
            className="fixed inset-x-0 bottom-0 top-14 overflow-y-auto bg-bg px-6 py-10 md:px-12 lg:hidden"
          >
            <ul className="flex flex-col gap-6">
              {links.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/#${s.id}`}
                    onClick={goTo(s.id)}
                    aria-current={active === s.id ? 'location' : undefined}
                    className="flex items-baseline gap-4 rounded-sm text-h3"
                  >
                    <span className="font-mono text-label text-fg-muted">{formatIndex(s.index)}</span>
                    {s.label}
                  </Link>
                </li>
              ))}
              <li className="mt-4">
                <a
                  href={resume.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-line px-5 py-2"
                >
                  {resume.label} <span aria-hidden="true">&nbsp;↗</span>
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
