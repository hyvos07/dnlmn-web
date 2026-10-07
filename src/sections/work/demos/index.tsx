'use client';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

function DemoSkeleton() {
  return (
    <div className="flex aspect-[4/5] w-full max-w-[420px] items-center justify-center rounded-2xl border border-line bg-bg-elev">
      <span className="font-mono text-label uppercase text-fg-muted">Loading demo…</span>
    </div>
  );
}

// Each demo is its own chunk, loaded only when its panel is near the viewport (or expanded on mobile).
export const demos: Record<string, ComponentType> = {
  'gallery-csui': dynamic(() => import('./VoteDemo'), { ssr: false, loading: DemoSkeleton }),
  temankuliah: dynamic(() => import('./GpaDemo'), { ssr: false, loading: DemoSkeleton }),
  moodtune: dynamic(() => import('./MoodDemo'), { ssr: false, loading: DemoSkeleton }),
  'rakyat-bisa': dynamic(() => import('./CompareSliderDemo'), { ssr: false, loading: DemoSkeleton }),
};

export { DemoSkeleton };
