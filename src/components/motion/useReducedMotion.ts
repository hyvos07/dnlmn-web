'use client';
import { useContext } from 'react';
import { MotionContext } from './MotionProvider';

// Our app-wide hook. Not to be confused with `useReducedMotion` from `motion/react` —
// don't import both into the same file.
export function useReducedMotion() {
  return useContext(MotionContext).reducedMotion;
}

export function useScrollTo() {
  return useContext(MotionContext).scrollToId;
}

export function useScrollLock() {
  return useContext(MotionContext).setScrollLocked;
}
