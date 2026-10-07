import type { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  active?: boolean;
  className?: string;
}

/** Mono label chip for stacks, skills and course codes. */
export default function Chip({ children, active = false, className = '' }: ChipProps) {
  return (
    <span
      data-active={active || undefined}
      className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-label uppercase transition-colors duration-micro ${
        active ? 'border-accent text-fg' : 'border-line text-fg-muted'
      } ${className}`}
    >
      {children}
    </span>
  );
}
