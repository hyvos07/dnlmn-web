'use client';

import { useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Crown, Plus, ScanLine, Wifi, WifiOff } from 'lucide-react';
import BrowserFrame from '@/components/ui/BrowserFrame';
import { dur, easeCss, springUi } from '@/components/motion/tokens';
import { useReducedMotion } from '@/components/motion/useReducedMotion';

type ExhibitId = 'lantern' | 'tidebound' | 'echo';
type Mode = 'online' | 'offline';

interface Exhibit {
  id: ExhibitId;
  title: string;
  tag: string;
  /** Decorative CSS gradient standing in for a game thumbnail */
  thumb: string;
  /** Seed for the decorative ticket pattern */
  seed: number;
}

// Fictional exhibits — this is a toy, not real Gallery data.
const EXHIBITS: readonly Exhibit[] = [
  {
    id: 'lantern',
    title: 'Lantern Drift',
    tag: 'Puzzle · 2P',
    thumb:
      'radial-gradient(circle at 70% 30%, #FFE08A 0 12%, transparent 13%), linear-gradient(140deg, #F59E0B 0%, #E5484D 55%, #26337A 100%)',
    seed: 17,
  },
  {
    id: 'tidebound',
    title: 'Tidebound',
    tag: 'Roguelite · 1P',
    thumb:
      'repeating-linear-gradient(170deg, transparent 0 6px, rgba(255,255,255,0.18) 6px 8px), linear-gradient(160deg, #22D3EE 0%, #2563EB 55%, #26337A 100%)',
    seed: 42,
  },
  {
    id: 'echo',
    title: 'Echo Garden',
    tag: 'Rhythm · Co-op',
    thumb:
      'radial-gradient(circle at 30% 70%, #BEF264 0 14%, transparent 15%), radial-gradient(circle at 75% 35%, rgba(255,255,255,0.35) 0 10%, transparent 11%), linear-gradient(135deg, #10B981 0%, #6D28D9 100%)',
    seed: 93,
  },
];

const SEED_VOTES: Record<ExhibitId, number> = { lantern: 12, tidebound: 9, echo: 7 };

/** Highest votes first; ties keep the original exhibit order (sort is stable). */
function rank(votes: Record<ExhibitId, number>) {
  return [...EXHIBITS].sort((a, b) => votes[b.id] - votes[a.id]);
}

/* ---------- Decorative QR-like grid (NOT a real QR code) ---------- */

const QR_SIZE = 21;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function finderCell(lx: number, ly: number) {
  if (lx > 6 || ly > 6) return false; // separator ring stays light
  const ring = lx === 0 || lx === 6 || ly === 0 || ly === 6;
  const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4;
  return ring || core;
}

/** Deterministic 21×21 grid as a single SVG path, with the three finder squares. */
function qrPath(seed: number) {
  const rand = mulberry32(seed);
  let d = '';
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      let dark: boolean;
      if (x < 8 && y < 8) dark = finderCell(x, y);
      else if (x >= QR_SIZE - 8 && y < 8) dark = finderCell(x - (QR_SIZE - 7), y);
      else if (x < 8 && y >= QR_SIZE - 8) dark = finderCell(x, y - (QR_SIZE - 7));
      else if (y === 6) dark = x % 2 === 0; // timing patterns
      else if (x === 6) dark = y % 2 === 0;
      else dark = rand() > 0.52;
      if (dark) d += `M${x} ${y}h1v1h-1z`;
    }
  }
  return d;
}

/* ---------- Pieces ---------- */

function RollingCount({ value, reduced }: { value: number; reduced: boolean }) {
  if (reduced) return <span className="tabular-nums">{value}</span>;
  return (
    <span className="relative inline-flex overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="inline-block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: dur.micro * 1.5, ease: easeCss.out }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Thumb({ exhibit }: { exhibit: Exhibit }) {
  return (
    <span
      aria-hidden="true"
      className="h-11 w-11 shrink-0 rounded-lg ring-1 ring-inset ring-white/10"
      style={{ background: exhibit.thumb }}
    />
  );
}

interface VoteDemoProps {
  className?: string;
}

export default function VoteDemo({ className = '' }: VoteDemoProps) {
  const reduced = useReducedMotion();
  const uid = useId();
  const [votes, setVotes] = useState<Record<ExhibitId, number>>(SEED_VOTES);
  const [mode, setMode] = useState<Mode>('online');
  const [selected, setSelected] = useState<ExhibitId>('lantern');
  const [scans, setScans] = useState(0);
  const [status, setStatus] = useState('Vote as often as you like — it’s a toy.');

  const ranked = rank(votes);
  const top = votes[ranked[0].id];
  const selectedExhibit = EXHIBITS.find((e) => e.id === selected) ?? EXHIBITS[0];
  const ticketPath = useMemo(() => qrPath(selectedExhibit.seed), [selectedExhibit.seed]);

  const layoutTransition = reduced ? { duration: 0 } : springUi;
  const fadeTransition = { duration: reduced ? 0 : dur.micro, ease: easeCss.out };

  function castVote(id: ExhibitId, via: 'tap' | 'scan') {
    const next = { ...votes, [id]: votes[id] + 1 };
    setVotes(next);
    const place = rank(next).findIndex((e) => e.id === id) + 1;
    const title = EXHIBITS.find((e) => e.id === id)?.title ?? '';
    setStatus(
      `${via === 'scan' ? 'Ticket scanned. ' : ''}${title} now has ${next[id]} votes, rank ${place}.`,
    );
    if (via === 'scan') setScans((n) => n + 1);
  }

  return (
    <BrowserFrame url="gallery.ppl.cs.ui.ac.id" className={className}>
      <div className="flex flex-col gap-4 p-4 text-fg">
        {/* App header + mode toggle */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <p className="flex items-center gap-2 text-sm font-bold leading-tight">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-accent-gallery" />
            Gallery Exhibition
            <span className="font-mono text-[0.6875rem] font-normal text-fg-muted">CSUI</span>
          </p>

          <div
            role="group"
            aria-label="Voting mode"
            className="flex rounded-full border border-line bg-bg p-0.5"
          >
            {(['online', 'offline'] as const).map((m) => {
              const active = mode === m;
              const Icon = m === 'online' ? Wifi : WifiOff;
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMode(m)}
                  className={`relative flex min-h-8 items-center gap-1.5 rounded-full px-3 text-xs font-semibold capitalize transition-colors duration-micro ease-out ${
                    active ? 'text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={`${uid}-mode-pill`}
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-accent-gallery-2 ring-1 ring-inset ring-white/15"
                      transition={layoutTransition}
                    />
                  )}
                  <Icon aria-hidden="true" className="relative h-3.5 w-3.5" />
                  <span className="relative">{m}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live leaderboard */}
        <section aria-labelledby={`${uid}-board`} className="rounded-xl border border-line bg-bg p-3">
          <p
            id={`${uid}-board`}
            className="mb-2 font-mono text-label uppercase text-fg-muted"
          >
            Live leaderboard
          </p>
          <ol className="flex flex-col gap-1.5">
            {ranked.map((exhibit, i) => (
              <motion.li
                key={exhibit.id}
                layout
                transition={layoutTransition}
                className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-center gap-2 text-sm"
              >
                <span className="flex items-center gap-0.5 font-mono text-xs text-fg-muted">
                  {i + 1}
                  {i === 0 && (
                    <Crown aria-hidden="true" className="h-3.5 w-3.5 text-[#FFC738]" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="truncate font-medium">{exhibit.title}</span>
                  <span aria-hidden="true" className="block h-1 overflow-hidden rounded-full bg-line">
                    <motion.span
                      className="block h-full origin-left rounded-full bg-accent-gallery"
                      initial={false}
                      animate={{ scaleX: votes[exhibit.id] / top }}
                      transition={reduced ? { duration: 0 } : springUi}
                    />
                  </span>
                </span>
                <span className="font-mono text-xs text-fg-muted">
                  <RollingCount value={votes[exhibit.id]} reduced={reduced} />
                  <span className="sr-only"> votes</span>
                </span>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Exhibits — vote buttons online, exhibit picker offline */}
        <fieldset className="flex min-w-0 flex-col gap-2">
          <legend className="mb-2 font-mono text-label uppercase text-fg-muted">
            {mode === 'online' ? 'Exhibits' : 'Pick an exhibit'}
          </legend>
          {EXHIBITS.map((exhibit) => {
            const body = (
              <>
                <Thumb exhibit={exhibit} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold">{exhibit.title}</span>
                  <span className="truncate font-mono text-[0.6875rem] text-fg-muted">{exhibit.tag}</span>
                </span>
                <span className="shrink-0 rounded-full bg-[color-mix(in_srgb,var(--accent-gallery)_16%,transparent)] px-2 py-0.5 font-mono text-xs">
                  <RollingCount value={votes[exhibit.id]} reduced={reduced} />
                  <span className="text-fg-muted"> votes</span>
                </span>
              </>
            );

            if (mode === 'online') {
              return (
                <div
                  key={exhibit.id}
                  className="flex items-center gap-3 rounded-xl border border-line bg-bg p-2"
                >
                  {body}
                  <button
                    type="button"
                    onClick={() => castVote(exhibit.id, 'tap')}
                    aria-label={`Vote for ${exhibit.title}`}
                    className="inline-flex min-h-8 shrink-0 items-center gap-1 rounded-full bg-accent-gallery px-3 text-xs font-semibold text-white transition-transform duration-micro ease-out hover:brightness-110 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
                  >
                    <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                    Vote
                  </button>
                </div>
              );
            }

            const checked = selected === exhibit.id;
            return (
              <label
                key={exhibit.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-bg p-2 transition-colors duration-micro ease-out ${
                  checked ? 'border-accent-gallery' : 'border-line hover:border-fg-muted'
                }`}
              >
                <input
                  type="radio"
                  name={`${uid}-exhibit`}
                  value={exhibit.id}
                  checked={checked}
                  onChange={() => setSelected(exhibit.id)}
                  className="h-4 w-4 shrink-0 accent-[var(--accent-gallery)]"
                />
                {body}
              </label>
            );
          })}
        </fieldset>

        {/* Offline ticket */}
        <AnimatePresence initial={false}>
          {mode === 'offline' && (
            <motion.div
              key="ticket"
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={fadeTransition}
              className="flex items-center gap-3 rounded-xl bg-[#F7F5EF] p-3 text-[#141833]"
            >
              <div className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-md bg-white p-1">
                <svg
                  aria-hidden="true"
                  viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
                  className="h-full w-full"
                  shapeRendering="crispEdges"
                >
                  <path d={ticketPath} fill="#141833" />
                </svg>
                {!reduced && scans > 0 && (
                  <motion.span
                    key={scans}
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-0.5 bg-accent-gallery shadow-[0_0_8px_var(--accent-gallery)]"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: 86, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.6, ease: easeCss.out }}
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5 border-l border-dashed border-[#141833]/30 pl-3">
                <p className="font-mono text-label uppercase text-[#4A4F6A]">Scan to vote</p>
                <p className="truncate text-sm font-bold">{selectedExhibit.title}</p>
                <button
                  type="button"
                  onClick={() => castVote(selected, 'scan')}
                  className="inline-flex min-h-8 w-fit items-center gap-1.5 rounded-full bg-accent-gallery-2 px-3 text-xs font-semibold text-white transition-transform duration-micro ease-out hover:brightness-125 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100"
                >
                  <ScanLine aria-hidden="true" className="h-3.5 w-3.5" />
                  Simulate scan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <p aria-live="polite" className="min-h-4 text-xs text-fg">
          {status}
        </p>

        <p className="border-t border-line pt-3 font-mono text-[0.6875rem] text-fg-muted">
          Demo — the real platform runs at gallery.ppl.cs.ui.ac.id
        </p>
      </div>
    </BrowserFrame>
  );
}
