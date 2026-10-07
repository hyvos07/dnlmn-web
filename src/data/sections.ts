// Home page section map: single source for SectionShell and the NavBar indicator.
// "More projects" lives inside the Work section, so indices run 00–05 without gaps.
import type { AccentKey } from "./types";

export interface SectionMeta {
  id: string;
  index: number;
  label: string;
  accent: AccentKey;
}

export const sections: SectionMeta[] = [
  { id: "home", index: 0, label: "Home", accent: "hydro" },
  { id: "about", index: 1, label: "About", accent: "hydro" },
  { id: "work", index: 2, label: "Work", accent: "neutral" },
  { id: "experience", index: 3, label: "Experience", accent: "bca" },
  { id: "writing", index: 4, label: "Writing", accent: "neutral" },
  { id: "contact", index: 5, label: "Contact", accent: "hydro" },
];

export const formatIndex = (index: number) => index.toString().padStart(2, "0");
