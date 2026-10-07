'use client';
import { createContext, useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Registered once for the whole app
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
}

export interface MotionContextValue {
  reducedMotion: boolean;
  /** Scrolls to an element id — through Lenis when it's running, natively otherwise */
  scrollToId: (id: string) => void;
  /** Stops/starts page scrolling (e.g. while the mobile menu is open) */
  setScrollLocked: (locked: boolean) => void;
}

export const MotionContext = createContext<MotionContextValue>({
  reducedMotion: false,
  scrollToId: () => {},
  setScrollLocked: () => {},
});

// Lenis only runs on the home page; blog and 404 keep native scroll.
const SMOOTH_SCROLL_ROUTES = new Set(['/']);

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );

  const smoothScroll = !reducedMotion && SMOOTH_SCROLL_ROUTES.has(pathname);

  // Lenis ↔ ScrollTrigger sync, driven by the GSAP ticker
  useEffect(() => {
    if (!smoothScroll) return;

    const lenis = new Lenis({ autoRaf: false });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [smoothScroll]);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [reducedMotion],
  );

  const setScrollLocked = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = locked ? 'hidden' : '';
  }, []);

  const value = useMemo(
    () => ({ reducedMotion, scrollToId, setScrollLocked }),
    [reducedMotion, scrollToId, setScrollLocked],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
