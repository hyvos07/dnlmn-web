'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { profile } from '@/data/profile';
import { useReducedMotion } from '@/components/motion/useReducedMotion';
import { dur, easeCss } from '@/components/motion/tokens';

/** Copy-email button: the label morphs to "Copied ✓" for 2s. */
export default function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const variants = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { y: '110%', opacity: 0 }, animate: { y: '0%', opacity: 1 }, exit: { y: '-110%', opacity: 0 } };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
        <a href={`mailto:${profile.email}`} className="rounded-sm underline-offset-8 hover:underline">
          {profile.email}
        </a>
      </p>
      <button
        type="button"
        onClick={copy}
        className="inline-flex w-44 items-center justify-center gap-2 overflow-hidden rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors duration-micro hover:border-fg"
      >
        <span className="relative inline-flex h-5 items-center overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={copied ? 'copied' : 'copy'}
              {...variants}
              transition={{ duration: reducedMotion ? dur.reduced : 0.35, ease: easeCss.out }}
              className="inline-flex items-center gap-2"
            >
              {copied ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
              {copied ? 'Copied ✓' : 'Copy email'}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  );
}
