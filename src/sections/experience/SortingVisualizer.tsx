'use client';
import { useEffect, useId, useMemo, useState } from 'react';
import { ChevronDown, Pause, Play, RotateCcw, Shuffle, StepForward } from 'lucide-react';
import { useReducedMotion } from '@/components/motion/useReducedMotion';
import { insertionSortSteps, shuffled } from './sortSteps';

const BAR_COUNT = 12;
// Fixed so server and client render the same first frame
const INITIAL_SEED = 20251007;
// Milliseconds per step at 1× speed
const BASE_STEP_MS = 640;

const buttonClass =
  'inline-flex items-center gap-1.5 rounded-full border border-line bg-bg px-3 py-1.5 font-mono text-label uppercase text-fg transition-colors duration-micro hover:border-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-line';

interface SortingVisualizerProps {
  className?: string;
}

/** Insertion-sort demo for the Teaching Assistant entry. Local state only. */
export default function SortingVisualizer({ className = '' }: SortingVisualizerProps) {
  const reduced = useReducedMotion();
  const speedId = useId();

  const [seed, setSeed] = useState(INITIAL_SEED);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);

  const steps = useMemo(() => insertionSortSteps(shuffled(BAR_COUNT, seed)), [seed]);
  const last = steps.length - 1;
  const step = steps[Math.min(index, last)];
  const atEnd = index >= last;

  // Derived so it stops by itself at the end and under reduced motion
  const running = playing && !atEnd && !reduced;
  const stepMs = Math.round(BASE_STEP_MS / speed);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setIndex((i) => Math.min(i + 1, last));
    }, stepMs);
    return () => window.clearInterval(id);
  }, [running, stepMs, last]);

  const togglePlay = () => {
    if (running) {
      setPlaying(false);
      return;
    }
    if (atEnd) setIndex(0);
    setPlaying(true);
  };

  const stepOnce = () => {
    setPlaying(false);
    setIndex((i) => (i >= last ? 0 : i + 1));
  };

  const reshuffle = () => {
    let next = seed;
    while (next === seed) next = Math.floor(Math.random() * 0xffffffff);
    setPlaying(false);
    setIndex(0);
    setSeed(next);
  };

  // Screen readers hear the caption only when it settles (paused, stepped, done) —
  // never on every tick while playing.
  const announcement = running ? 'Playing insertion sort' : step.note;

  const compared = step.compare;
  const isCompared = (i: number) => compared !== null && (i === compared[0] || i === compared[1]);

  return (
    <figure className={`w-full min-w-0 max-w-[520px] ${className}`}>
      <div className="rounded-2xl border border-line bg-bg-elev p-3 sm:p-4">
        {/* Bars */}
        <div
          role="img"
          aria-label={`Bars, left to right: ${step.array.join(', ')}`}
          className="flex h-44 items-stretch gap-[3px] sm:gap-1"
        >
          {step.array.map((value, i) => {
            const active = isCompared(i);
            const sorted = step.done || i < step.sortedUpTo;
            const fill = active
              ? 'bg-accent'
              : sorted
                ? 'bg-fg'
                : 'bg-[color-mix(in_srgb,var(--fg-muted)_55%,transparent)]';
            return (
              <div key={i} className="flex min-w-0 flex-1 flex-col items-center" aria-hidden="true">
                {/* Comparison caret — shape cue in addition to color */}
                <ChevronDown
                  className={`h-3.5 w-3.5 shrink-0 text-accent ${active ? 'opacity-100' : 'opacity-0'}`}
                  strokeWidth={3}
                />
                <div className="relative w-full flex-1">
                  <div
                    className={`absolute inset-0 origin-bottom rounded-t-[3px] ${fill} ${
                      reduced ? '' : 'transition-[transform,background-color] duration-micro ease-out'
                    }`}
                    style={{ transform: `scaleY(${value / BAR_COUNT})` }}
                  />
                </div>
                <span
                  className={`mt-1 font-mono text-[10px] leading-none tabular-nums ${
                    active ? 'font-bold text-fg underline decoration-accent decoration-2 underline-offset-2' : 'text-fg-muted'
                  }`}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Caption (visual, updates every step) */}
        <div className="mt-3 flex items-baseline justify-between gap-3 font-mono text-xs">
          <p className="min-w-0 truncate text-fg" aria-hidden="true">
            {step.note}
          </p>
          <span className="shrink-0 tabular-nums text-fg-muted" aria-hidden="true">
            {Math.min(index, last)}/{last}
          </span>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>

        {/* Controls */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            disabled={reduced}
            aria-pressed={running}
            className={buttonClass}
          >
            {running ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
            {running ? 'Pause' : 'Play'}
          </button>
          <button type="button" onClick={stepOnce} className={buttonClass}>
            {atEnd ? (
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <StepForward className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {atEnd ? 'Restart' : 'Step'}
          </button>
          <button type="button" onClick={reshuffle} className={buttonClass}>
            <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
            Shuffle
          </button>

          <div className="flex min-w-[9rem] flex-1 items-center gap-2">
            <label htmlFor={speedId} className="font-mono text-label uppercase text-fg-muted">
              Speed
            </label>
            <input
              id={speedId}
              type="range"
              min={1}
              max={4}
              step={1}
              value={speed}
              disabled={reduced}
              onChange={(e) => setSpeed(Number(e.target.value))}
              aria-valuetext={`${speed}× speed`}
              className="h-1 min-w-0 flex-1 cursor-pointer [accent-color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span className="w-6 text-right font-mono text-xs tabular-nums text-fg" aria-hidden="true">
              {speed}×
            </span>
          </div>
        </div>

        {reduced && (
          <p className="mt-2 font-mono text-xs text-fg-muted">
            Reduced motion is on — use Step to walk through the sort.
          </p>
        )}
      </div>

      <figcaption className="mt-2 font-mono text-xs text-fg-muted">
        What I teach: DSA &amp; Design and Analysis of Algorithms
      </figcaption>
    </figure>
  );
}
