import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        fg: "var(--fg)",
        "fg-muted": "var(--fg-muted)",
        line: "var(--line)",
        accent: {
          DEFAULT: "var(--accent)",
          hydro: "var(--accent-hydro)",
          gallery: "var(--accent-gallery)",
          "gallery-2": "var(--accent-gallery-2)",
          temankuliah: "var(--accent-temankuliah)",
          moodtune: "var(--accent-moodtune)",
          rakyatbisa: "var(--accent-rakyatbisa)",
          bca: "var(--accent-bca)",
          neutral: "var(--accent-neutral)",
        },
        // Legacy names used by the old sections and blog pages
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["clamp(3rem, 8vw, 7.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "800" }],
        h2: ["clamp(2rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        h3: ["clamp(1.375rem, 2.2vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        label: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.08em" }],
      },
      maxWidth: {
        content: "1200px",
        prose: "65ch",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      transitionDuration: {
        micro: "200ms",
        reveal: "800ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
