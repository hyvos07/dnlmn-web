'use client';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, X, XCircle } from 'lucide-react';
import { useReducedMotion } from '@/components/motion/useReducedMotion';
import { springUi } from '@/components/motion/tokens';

export interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error';
}

/** Bottom-right toast with a polite live region. Auto-dismisses after 5s. */
export default function Toast({ toast, onClose }: { toast: ToastState | null; onClose: () => void }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-4 right-4 z-[950] max-w-[calc(100vw-2rem)]">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
            transition={reducedMotion ? { duration: 0.2 } : springUi}
            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-line bg-bg-elev py-3 pl-4 pr-2 shadow-2xl shadow-black/50"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 aria-hidden="true" size={18} className="shrink-0 text-accent-hydro" />
            ) : (
              <XCircle aria-hidden="true" size={18} className="shrink-0 text-accent-gallery" />
            )}
            <p className="text-sm">{toast.message}</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-fg-muted hover:bg-line hover:text-fg"
            >
              <X aria-hidden="true" size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
