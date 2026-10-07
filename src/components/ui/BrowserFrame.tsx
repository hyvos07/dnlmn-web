import type { ReactNode } from 'react';

interface BrowserFrameProps {
  url: string;
  children: ReactNode;
  className?: string;
}

/** Minimal browser chrome around a web demo. */
export default function BrowserFrame({ url, children, className = '' }: BrowserFrameProps) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-bg-elev shadow-2xl shadow-black/40 ${className}`}>
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <div aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
          <span className="h-2.5 w-2.5 rounded-full bg-line" />
        </div>
        <p className="min-w-0 flex-1 truncate rounded-md bg-bg px-3 py-1 text-center font-mono text-[0.6875rem] text-fg-muted">
          {url}
        </p>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
