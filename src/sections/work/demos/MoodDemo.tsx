'use client';

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { LayoutGroup, motion } from 'motion/react';
import { CloudRain, Frown, Leaf, Music2, Smile, Zap, type LucideIcon } from 'lucide-react';
import DeviceFrame from '@/components/ui/DeviceFrame';
import { springUi } from '@/components/motion/tokens';
import { useReducedMotion } from '@/components/motion/useReducedMotion';

// Demo copy only: descriptors, never real songs/artists, and no Spotify calls.
type MoodId = 'calm' | 'happy' | 'energetic' | 'melancholy' | 'stressed';

interface Mood {
  id: MoodId;
  label: string;
  Icon: LucideIcon;
  /** Glow colour at the top of the screen */
  a: string;
  /** Screen base colour */
  b: string;
  /** Darker scoped accent (energy bar, icon tint) — AA against `b` */
  ink: string;
  prompt: string;
  genre: string;
  bpm: number;
  energy: number;
}

const MOODS: Mood[] = [
  {
    id: 'calm',
    label: 'Calm',
    Icon: Leaf,
    a: '#BFE3CF',
    b: '#FFF7E3',
    ink: '#2C6B4F',
    prompt: 'What helped you feel at ease today?',
    genre: 'Lo-fi ambient',
    bpm: 72,
    energy: 25,
  },
  {
    id: 'happy',
    label: 'Happy',
    Icon: Smile,
    a: '#FFD45C',
    b: '#FFF5D6',
    ink: '#7A5200',
    prompt: 'What made you smile today?',
    genre: 'Indie pop',
    bpm: 112,
    energy: 70,
  },
  {
    id: 'energetic',
    label: 'Energetic',
    Icon: Zap,
    a: '#FFAE6B',
    b: '#FFEBDA',
    ink: '#8A3B00',
    prompt: 'Where do you want to put this energy?',
    genre: 'Upbeat electronic',
    bpm: 128,
    energy: 92,
  },
  {
    id: 'melancholy',
    label: 'Melancholy',
    Icon: CloudRain,
    a: '#BAC6EA',
    b: '#EFF1F8',
    ink: '#34437A',
    prompt: "What's weighing on you? Write it down.",
    genre: 'Soft piano',
    bpm: 64,
    energy: 18,
  },
  {
    id: 'stressed',
    label: 'Stressed',
    Icon: Frown,
    a: '#F2AFA6',
    b: '#FCEDE9',
    ink: '#8A2E22',
    prompt: 'Name one thing you can let go of tonight.',
    genre: 'Downtempo jazz',
    bpm: 84,
    energy: 38,
  },
];

const TYPE_MS = 28;
const BRAND = '#FFC738';
const INK = '#111111';

function energyWord(energy: number) {
  if (energy < 34) return 'Low';
  if (energy < 67) return 'Medium';
  return 'High';
}

interface MoodDemoProps {
  className?: string;
}

export default function MoodDemo({ className = '' }: MoodDemoProps) {
  const reduced = useReducedMotion();
  const groupId = useId();
  const [moodIndex, setMoodIndex] = useState(0);
  // How many characters of the prompt are shown. Starts complete; restarts on selection.
  const [typed, setTyped] = useState(MOODS[0].prompt.length);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const mood = MOODS[moodIndex];

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
    },
    [],
  );

  function select(index: number) {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    setMoodIndex(index);

    const full = MOODS[index].prompt.length;
    if (reduced) {
      setTyped(full);
      return;
    }
    let n = 0;
    setTyped(0);
    timerRef.current = setInterval(() => {
      n += 1;
      setTyped(n);
      if (n >= full && timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, TYPE_MS);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        next = (index + 1) % MOODS.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        next = (index - 1 + MOODS.length) % MOODS.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = MOODS.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
    optionRefs.current[next]?.focus();
  }

  const typedText = reduced ? mood.prompt : mood.prompt.slice(0, typed);
  const isTyping = !reduced && typed < mood.prompt.length;
  const colorTransition = reduced ? '' : 'transition-colors duration-700 ease-out';

  const rootStyle = {
    '--mood-a': mood.a,
    '--mood-b': mood.b,
    '--mood-ink': mood.ink,
  } as CSSProperties;

  return (
    <div className={`w-full ${className}`} style={rootStyle}>
      <DeviceFrame screenClassName={`bg-[var(--mood-b)] text-[#111] ${colorTransition}`}>
        {/* Warm glow: background-color is transitionable, so the "gradient" shifts smoothly */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -left-16 -right-16 -top-24 h-72 rounded-full bg-[var(--mood-a)] opacity-90 blur-3xl ${colorTransition}`}
        />

        <div className="relative flex flex-col gap-4 px-3 pb-4 sm:px-4">
          {/* App header */}
          <header className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm font-bold tracking-tight">
              <span
                aria-hidden="true"
                className="grid h-6 w-6 place-items-center rounded-lg"
                style={{ backgroundColor: BRAND, color: INK }}
              >
                <Music2 className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              MoodTune
            </p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-[#3d3d3d]">Today</p>
          </header>

          <div>
            <p className="text-sm text-[#3d3d3d]">Good evening,</p>
            <p id={`${groupId}-label`} className="text-xl font-bold leading-tight tracking-tight">
              How are you feeling?
            </p>
          </div>

          {/* Mood picker */}
          <LayoutGroup id={groupId}>
            <div
              role="radiogroup"
              aria-labelledby={`${groupId}-label`}
              className="grid grid-cols-5 gap-0.5 rounded-2xl bg-white/60 p-1 shadow-sm"
            >
              {MOODS.map((m, i) => {
                const checked = i === moodIndex;
                return (
                  <button
                    key={m.id}
                    ref={(el) => {
                      optionRefs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={checked}
                    tabIndex={checked ? 0 : -1}
                    onClick={() => select(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="group flex min-w-0 flex-col items-center gap-1 rounded-xl px-0 py-1.5"
                  >
                    <span className="relative grid h-9 w-9 place-items-center rounded-full">
                      {checked && (
                        <motion.span
                          layoutId="mood-pill"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full ring-2 ring-[#111] ring-offset-1 ring-offset-transparent"
                          style={{ backgroundColor: BRAND }}
                          transition={reduced ? { duration: 0 } : springUi}
                        />
                      )}
                      {!checked && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-black/15 bg-white/70 transition-colors duration-micro group-hover:bg-white"
                        />
                      )}
                      <m.Icon aria-hidden="true" className="relative h-[18px] w-[18px]" strokeWidth={checked ? 2.5 : 2} />
                    </span>
                    <span
                      className={`max-w-full truncate text-[0.625rem] leading-tight tracking-tight ${
                        checked ? 'font-bold text-[#111]' : 'font-medium text-[#3d3d3d]'
                      }`}
                    >
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Journal prompt */}
          <div className="rounded-2xl bg-white/75 px-3.5 py-3 shadow-sm">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[#3d3d3d]">Journal prompt</p>
            <p className="mt-1 min-h-[2.5rem] text-sm font-medium leading-snug">
              <span className="sr-only">{mood.prompt}</span>
              <span aria-hidden="true">
                {typedText}
                {isTyping && (
                  <span className="ml-px inline-block h-[1em] w-[2px] translate-y-[2px] bg-[#111] motion-safe:animate-pulse" />
                )}
              </span>
            </p>
          </div>

          {/* Today's tune: descriptors only */}
          <section aria-label="Today's tune" className="rounded-2xl bg-white/75 p-3.5 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-bold">Today&apos;s tune</p>
              <span
                className="rounded-full px-2 py-0.5 font-mono text-[0.625rem] font-semibold uppercase tracking-[0.08em]"
                style={{ backgroundColor: BRAND, color: INK }}
              >
                For {mood.label}
              </span>
            </div>

            <dl className="mt-2.5 grid grid-cols-2 gap-2">
              <div className="min-w-0">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[#3d3d3d]">Genre</dt>
                <dd className="truncate text-sm font-semibold">{mood.genre}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[#3d3d3d]">Tempo</dt>
                <dd className="text-sm font-semibold">{mood.bpm} BPM</dd>
              </div>
            </dl>

            <div className="mt-2.5">
              <div className="flex items-baseline justify-between">
                <span id={`${groupId}-energy`} className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[#3d3d3d]">
                  Energy
                </span>
                <span aria-hidden="true" className="text-xs font-semibold">
                  {energyWord(mood.energy)} · {mood.energy}%
                </span>
              </div>
              <div
                role="meter"
                aria-labelledby={`${groupId}-energy`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={mood.energy}
                aria-valuetext={`${energyWord(mood.energy)}, ${mood.energy} of 100`}
                className="mt-1 h-2 overflow-hidden rounded-full bg-black/10"
              >
                <div
                  className={`h-full w-full origin-left rounded-full bg-[var(--mood-ink)] ${
                    reduced ? '' : 'transition-[transform,background-color] duration-700 ease-out'
                  }`}
                  style={{ transform: `scaleX(${mood.energy / 100})` }}
                />
              </div>
            </div>
          </section>

          <p className="text-center text-xs font-bold italic tracking-tight">
            <span className="rounded-full px-3 py-1" style={{ backgroundColor: BRAND, color: INK }}>
              Track it. Feel it. Tune it.
            </span>
          </p>
        </div>
      </DeviceFrame>

      {/* Announce the result of a selection */}
      <p className="sr-only" aria-live="polite">
        {`${mood.label} selected. Today's tune: ${mood.genre}, ${mood.bpm} BPM, ${energyWord(mood.energy).toLowerCase()} energy.`}
      </p>
    </div>
  );
}
