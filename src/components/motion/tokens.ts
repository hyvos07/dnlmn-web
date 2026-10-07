// Motion tokens shared by GSAP and Motion. Mirrors 03-design-and-motion.md.

export const ease = {
  out: "power3.out",
  inOut: "expo.inOut",
} as const;

// CSS / Motion equivalents of the GSAP eases above
export const easeCss = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.87, 0, 0.13, 1],
} as const;

export const dur = {
  micro: 0.2,
  reveal: 0.8,
  accent: 0.4,
  reduced: 0.2,
} as const;

export const stagger = 0.06;

export const springUi = { type: "spring", stiffness: 380, damping: 32 } as const;
