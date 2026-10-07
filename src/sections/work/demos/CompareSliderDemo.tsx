'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import { animate, type AnimationPlaybackControls } from 'motion/react';
import { easeCss } from '@/components/motion/tokens';
import { useReducedMotion } from '@/components/motion/useReducedMotion';

// The slider value is "progress through the process": 0 = all research, 100 = all prototype.
// The prototype wipes in from the left as the handle moves right.
const STEPS = [
  { label: 'Interviews', at: 0 },
  { label: 'Value Proposition Canvas', at: 33 },
  { label: 'User Journey', at: 67 },
  { label: 'Prototype', at: 100 },
] as const;

const SIZES = '(min-width: 1024px) 480px, 90vw';

function clamp(value: number) {
  return Math.min(100, Math.max(0, value));
}

function nearestStep(value: number) {
  let best = 0;
  for (let i = 1; i < STEPS.length; i++) {
    if (Math.abs(STEPS[i].at - value) < Math.abs(STEPS[best].at - value)) best = i;
  }
  return best;
}

interface CompareSliderDemoProps {
  className?: string;
}

export default function CompareSliderDemo({ className = '' }: CompareSliderDemoProps) {
  const reduced = useReducedMotion();
  const [pos, setPos] = useState(50);
  const areaRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  const active = nearestStep(pos);
  const rounded = Math.round(pos);

  useEffect(() => () => animRef.current?.stop(), []);

  function stopAnim() {
    animRef.current?.stop();
    animRef.current = null;
  }

  function setInstant(value: number) {
    stopAnim();
    setPos(clamp(value));
  }

  function goTo(value: number) {
    stopAnim();
    if (reduced) {
      setPos(value);
      return;
    }
    animRef.current = animate(pos, value, {
      duration: 0.5,
      ease: easeCss.out,
      onUpdate: setPos,
    });
  }

  function valueFromPointer(clientX: number) {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return pos;
    return ((clientX - rect.left) / rect.width) * 100;
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    // Keep focus on the handle (a mouse press on the area would otherwise blur it)
    if (event.pointerType === 'mouse') event.preventDefault();
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    handleRef.current?.focus({ preventScroll: true });
    setInstant(valueFromPointer(event.clientX));
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    setInstant(valueFromPointer(event.clientX));
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const map: Record<string, number> = {
      ArrowLeft: pos - 5,
      ArrowDown: pos - 5,
      ArrowRight: pos + 5,
      ArrowUp: pos + 5,
      PageDown: pos - 20,
      PageUp: pos + 20,
      Home: 0,
      End: 100,
    };
    if (!(event.key in map)) return;
    event.preventDefault();
    setInstant(map[event.key]);
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={areaRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-[4/5] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-line bg-bg-elev [touch-action:pan-y]"
      >
        {/* After-state underneath: research boards */}
        <div className="absolute inset-0">
          <Image
            src="/images/projects/rakyat-bisa/research.webp"
            alt="Rakyat Bisa! research boards in Figma: requirement exploration and value proposition canvases, user personas and user journey map templates."
            fill
            sizes={SIZES}
            draggable={false}
            className="object-cover"
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/75 px-2.5 py-1 font-mono text-label uppercase text-white">
            Research
          </span>
        </div>

        {/* Prototype, revealed from the left via clip-path */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image
            src="/images/projects/rakyat-bisa/prototype.webp"
            alt="Rakyat Bisa! high-fidelity Figma prototype flow: intro, login and onboarding screens leading to home, modules, community, mentoring and profile screens."
            fill
            sizes={SIZES}
            draggable={false}
            className="object-cover"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-black/75 px-2.5 py-1 font-mono text-label uppercase text-white">
            Prototype
          </span>
        </div>

        {/* Handle: the layer moves with transform; the knob shifts so it stays inside at both ends */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transform: `translateX(${pos}%)` }}
        >
          <div className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.35)]" />
          <div className="absolute left-0 top-1/2" style={{ transform: `translate(${-pos}%, -50%)` }}>
            <div
              ref={handleRef}
              role="slider"
              tabIndex={0}
              aria-label="Compare research and prototype"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={rounded}
              aria-valuetext={`${rounded}% — ${STEPS[active].label}`}
              aria-orientation="horizontal"
              onKeyDown={onKeyDown}
              className="pointer-events-auto grid h-10 w-10 cursor-ew-resize place-items-center rounded-full border-2 border-white bg-accent-rakyatbisa text-white shadow-lg shadow-black/40"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Progress track aligned with the image */}
      <div aria-hidden="true" className="relative mx-[6px] mt-4 h-3">
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-line" />
        <div
          className="absolute inset-x-0 top-1/2 h-0.5 origin-left rounded-full bg-accent-rakyatbisa"
          style={{ transform: `translateY(-50%) scaleX(${pos / 100})` }}
        />
        {STEPS.map((step, i) => (
          <span
            key={step.label}
            className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${
              i === active
                ? 'border-white bg-accent-rakyatbisa'
                : pos >= step.at
                  ? 'border-accent-rakyatbisa bg-accent-rakyatbisa'
                  : 'border-line bg-bg'
            }`}
            style={{ left: `${step.at}%` }}
          />
        ))}
      </div>

      {/* Step markers */}
      <ol className="mt-3 grid grid-cols-4 gap-1.5" aria-label="Design process steps">
        {STEPS.map((step, i) => {
          const current = i === active;
          return (
            <li key={step.label} className="min-w-0">
              <button
                type="button"
                onClick={() => goTo(step.at)}
                aria-current={current ? 'step' : undefined}
                className={`flex h-full w-full flex-col items-start gap-1 rounded-xl border px-2 py-2 text-left transition-colors duration-micro ease-out ${
                  current
                    ? 'border-accent-rakyatbisa bg-accent-rakyatbisa text-white'
                    : 'border-line text-fg-muted hover:border-fg-muted hover:text-fg'
                }`}
              >
                <span className="flex items-center gap-1 font-mono text-[0.625rem] tracking-[0.08em]">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full ${current ? 'bg-white' : 'border border-current'}`}
                  />
                  0{i + 1}
                </span>
                <span className={`text-[0.6875rem] leading-tight ${current ? 'font-bold' : 'font-medium'}`}>
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="sr-only" aria-live="polite">
        {`Step ${active + 1} of ${STEPS.length}: ${STEPS[active].label}`}
      </p>
    </div>
  );
}
