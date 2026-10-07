// Pure insertion-sort trace for the Teaching Assistant sorting visualizer.
// No imports and no DOM — safe to run on the server, the client or plain Node.

export type SortStepKind = 'start' | 'compare' | 'swap' | 'place' | 'done';

export type SortStep = {
  kind: SortStepKind;
  /** Snapshot of the array at this step (never shared with other steps) */
  array: number[];
  /** Indices being compared (or just swapped), left index first */
  compare: [number, number] | null;
  /** Indices `< sortedUpTo` form the sorted prefix */
  sortedUpTo: number;
  done: boolean;
  /** Short human-readable caption, e.g. "Comparing 7 and 3" */
  note: string;
};

/**
 * Records every comparison and swap of (adjacent-swap) insertion sort.
 * The first step is the untouched input, the last step is `done` with the
 * array sorted ascending. Stable: equal values are never swapped.
 */
export function insertionSortSteps(input: readonly number[]): SortStep[] {
  const a = input.slice();
  const n = a.length;
  const steps: SortStep[] = [];

  const push = (
    kind: SortStepKind,
    compare: [number, number] | null,
    sortedUpTo: number,
    note: string,
  ) => {
    steps.push({ kind, array: a.slice(), compare, sortedUpTo, done: kind === 'done', note });
  };

  push('start', null, Math.min(n, 1), n > 1 ? `Ready: ${n} unsorted bars` : 'Ready');

  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      const left = a[j - 1];
      const right = a[j];
      push('compare', [j - 1, j], i, `Comparing ${left} and ${right}`);
      if (left > right) {
        a[j - 1] = right;
        a[j] = left;
        push('swap', [j - 1, j], i, `${left} > ${right}, swap`);
        j--;
      } else {
        break;
      }
    }
    push('place', null, i + 1, `${a[j]} is in place`);
  }

  push('done', null, n, 'Sorted ✓');
  return steps;
}

/** Small seeded PRNG (mulberry32) — returns floats in [0, 1). */
function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic permutation of 1..n (Fisher–Yates driven by mulberry32). */
export function shuffled(n: number, seed: number): number[] {
  const size = Math.max(0, Math.floor(n));
  const out = Array.from({ length: size }, (_, i) => i + 1);
  const rand = mulberry32(seed);
  for (let i = size - 1; i > 0; i--) {
    const k = Math.floor(rand() * (i + 1));
    const tmp = out[i];
    out[i] = out[k];
    out[k] = tmp;
  }
  return out;
}
