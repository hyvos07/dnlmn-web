// Runs below-the-fold animation setup after hydration, one idle task per caller,
// instead of inside React's hydration commit (where it all lands in one long task).
type Cancel = () => void;

let queue = Promise.resolve();

export function whenIdle(cb: () => void, timeout = 1200): Cancel {
  let cancelled = false;
  let id: number | undefined;
  let done: (() => void) | undefined;
  const ric =
    window.requestIdleCallback?.bind(window) ??
    ((fn: () => void) => window.setTimeout(fn, 16) as unknown as number);
  const cic = window.cancelIdleCallback?.bind(window) ?? window.clearTimeout.bind(window);

  // Chained so callers run in separate tasks, in mount (document) order
  queue = queue.then(
    () =>
      new Promise<void>((resolve) => {
        done = resolve;
        if (cancelled) return resolve();
        id = ric(
          () => {
            if (!cancelled) cb();
            resolve();
          },
          { timeout },
        );
      }),
  );

  return () => {
    cancelled = true;
    if (id !== undefined) cic(id);
    done?.(); // never stall the queue
  };
}
