// gsap.matchMedia() conditions shared by every scroll animation.
// `desktop` and `mobile` only match when motion is allowed; `reduce` gets fades only.
export const motionConditions = {
  desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
  mobile: '(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
} as const;

export interface MotionConditionFlags {
  desktop?: boolean;
  mobile?: boolean;
  reduce?: boolean;
}
