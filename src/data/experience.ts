// Source of truth: docs/redesign/02-content.md (newest first)
import type { AccentKey } from "./types";

export interface Course {
  name: string;
  code: string;
}

export interface Experience {
  org: string;
  shortOrg: string;
  role: string;
  period: string;
  unit?: string;
  /** Role progression, oldest → newest (RISTEK) */
  progression?: string[];
  points: string[];
  courses?: Course[];
  href: string;
  logo: string;
  accent: AccentKey;
}

export const experience: Experience[] = [
  {
    org: "PT Bank Central Asia Tbk",
    shortOrg: "BCA",
    role: "Application Developer Intern",
    period: "Jun 2026 – Present",
    unit: "Group Strategic Information Technology — Payment & API Integration (PAI) division",
    points: [
      "Supports development of systems that connect front-facing banking services with legacy core banking systems.",
    ],
    href: "https://bca.co.id/",
    logo: "/images/bca.png",
    accent: "bca",
  },
  {
    org: "RISTEK Fasilkom UI",
    shortOrg: "RISTEK",
    role: "Mobile Development SIG",
    period: "Mar 2024 – Present",
    // CONFIRM: Vice Director start date — showing the progression only (04-plan Q4)
    progression: ["Member", "Lead (2025)", "Vice Director"],
    points: [
      "Built expertise in Flutter — data persistence, API integration, state management, clean architecture — over 2+ years of hands-on work.",
      "Collaborated in teams of 5–7 developers to design and deliver multiple mobile apps (incl. TemanKuliah).",
      "As lead (2025), organized and taught an internal class on Clean Architecture in Flutter for 6+ members.",
      "Organized Pekan RISTEK's Open Class program to promote the SIG.",
    ],
    href: "https://ristek.cs.ui.ac.id/",
    logo: "/images/ristek.png",
    accent: "neutral",
  },
  {
    org: "Fasilkom UI",
    shortOrg: "Fasilkom UI",
    role: "Teaching Assistant",
    period: "Jan 2025 – Present",
    points: [
      "Designs and prepares assignments and tutorials for 200+ students every year.",
      "Represented the Database TA team at a COMPFEST UI internal workshop on database fundamentals.",
    ],
    courses: [
      { name: "Data Structures & Algorithms", code: "CSGE602040" },
      { name: "Database", code: "CSGE602070" },
      { name: "Advanced Programming", code: "CSCM602223" },
      { name: "Design & Analysis of Algorithms", code: "CSCM603142" },
    ],
    href: "https://cs.ui.ac.id/",
    logo: "/images/csui.png",
    accent: "neutral",
  },
];

export const compfestHref = "https://compfest.id/";
