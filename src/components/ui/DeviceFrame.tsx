import type { ReactNode } from 'react';

interface DeviceFrameProps {
  children: ReactNode;
  className?: string;
  /** Screen background — demos style their own content inside */
  screenClassName?: string;
}

/** Phone bezel around a mobile demo. Width is set by the parent (max ~360px). */
export default function DeviceFrame({ children, className = '', screenClassName = 'bg-bg' }: DeviceFrameProps) {
  return (
    <div className={`mx-auto w-full max-w-[340px] rounded-[2.5rem] border border-line bg-bg-elev p-2.5 shadow-2xl shadow-black/40 ${className}`}>
      <div className={`relative overflow-hidden rounded-[2rem] ${screenClassName}`}>
        <div aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="pt-10">{children}</div>
      </div>
    </div>
  );
}
