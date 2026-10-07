'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Renders `fallback` until the wrapper is within `margin` of the viewport, then `children`. */
export default function WhenNear({
  children,
  fallback,
  margin = '50% 0px',
  className,
}: {
  children: ReactNode;
  fallback: ReactNode;
  margin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNear(true);
        io.disconnect();
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <div ref={ref} className={className}>
      {near ? children : fallback}
    </div>
  );
}
