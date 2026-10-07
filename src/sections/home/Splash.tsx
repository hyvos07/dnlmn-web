import Image from 'next/image';

/**
 * Furina splash, ≤1s, shown on every visit (04-plan Q7).
 * Pure CSS so it runs from first paint without waiting for JS, and can never get stuck.
 * The hero reads the remaining time via `splashRemaining()` to start its reveal as the splash leaves.
 */
export default function Splash() {
  return (
    <div data-splash aria-hidden="true" className="splash pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center bg-bg">
      <Image src="/svgs/furina.svg" alt="" width={96} height={96} priority className="splash-mark h-24 w-24" />
    </div>
  );
}

/** Seconds until the splash finishes, 0 if it's gone. Client-only. */
export function splashRemaining(): number {
  const el = document.querySelector<HTMLElement>('[data-splash]');
  const anim = el?.getAnimations()[0];
  if (!anim || anim.playState === 'finished') return 0;
  const timing = anim.effect?.getComputedTiming();
  const end = Number(timing?.endTime ?? 0);
  const now = Number(anim.currentTime ?? 0);
  return Math.max(0, (end - now) / 1000);
}
