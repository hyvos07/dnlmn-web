'use client';
import { useSyncExternalStore } from 'react';

const TIME_ZONE = 'Asia/Jakarta';

// Built once; Intl formatters are relatively expensive to create.
const partsFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIME_ZONE,
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

// ── Shared one-second clock store (one timer for every mounted clock) ──

let nowSec: number | null = null;
let timer: number | undefined;
const listeners = new Set<() => void>();

function tick() {
  nowSec = Math.floor(Date.now() / 1000);
  listeners.forEach((l) => l());
  // Re-align to the next second boundary so the display never drifts
  timer = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 10);
}

function stop() {
  window.clearTimeout(timer);
  timer = undefined;
}

function onVisibility() {
  if (document.hidden) stop();
  else if (timer === undefined) tick();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    document.addEventListener('visibilitychange', onVisibility);
    if (!document.hidden) tick();
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    }
  };
}

const getSnapshot = () => nowSec;
// Server and hydration render the placeholder
const getServerSnapshot = () => null;

function format(sec: number) {
  const date = new Date(sec * 1000);
  const p: Record<string, string> = {};
  for (const { type, value } of partsFormatter.formatToParts(date)) p[type] = value;
  const hms = `${p.hour}:${p.minute}:${p.second}`;
  return {
    hms,
    iso: `${p.year}-${p.month}-${p.day}T${hms}+07:00`,
    dateLine: dateFormatter.format(date),
  };
}

interface LiveClockProps {
  className?: string;
}

/** Live WIB clock for the Ngawasin card. Display only — never announced per second. */
export default function LiveClock({ className = '' }: LiveClockProps) {
  const sec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = sec === null ? null : format(sec);

  return (
    <div
      role="group"
      aria-label="Live clock, Western Indonesia Time (WIB, UTC+7)"
      className={`font-mono ${className}`}
    >
      <time
        dateTime={t?.iso}
        aria-live="off"
        className="block text-4xl font-semibold leading-none tracking-tight text-fg tabular-nums"
      >
        {t?.hms ?? '--:--:--'}
      </time>
      <div className="mt-2 flex items-baseline gap-3 text-label uppercase text-fg-muted">
        <span>WIB · UTC+7</span>
        <span className="tabular-nums" aria-hidden={t === null}>
          {t?.dateLine ?? '—'}
        </span>
      </div>
    </div>
  );
}
