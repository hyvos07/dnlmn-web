// Source of truth: docs/redesign/02-content.md
import type { LinkItem } from "./types";

export const profile = {
  name: "Daniel Liman",
  firstName: "Daniel",
  lastName: "Liman",
  handle: "dnlmn",
  role: "Software Engineer",
  location: "Jakarta, Indonesia",
  focus: "Mobile apps and web applications, end-to-end",
  curiosity: ["Data Science", "AI", "DevOps"],
  // CONFIRM: public email — default hey@dnlmn.dev (confirmed for the redesign)
  email: "hey@dnlmn.dev",
  siteUrl: "https://dnlmn.dev",
} as const;

export const socials = {
  github: { label: "GitHub", href: "https://github.com/hyvos07", handle: "hyvos07" },
  linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/danielliman", handle: "danielliman" },
  x: { label: "X", href: "https://x.com/hyvos_", handle: "@hyvos_" },
  instagram: { label: "Instagram", href: "https://instagram.com/daniel.liman07", handle: "daniel.liman07" },
} as const satisfies Record<string, LinkItem & { handle: string }>;

// CONFIRM: resume — public/cv.pdf doesn't exist yet, so keep the Google Docs link
export const resume: LinkItem = {
  label: "Resume",
  href: "https://docs.google.com/document/d/10mnUjUjKWp9L2lqlMg3ukI3YosSuUOoIwBpSsa4VICA",
};

export const hero = {
  positioning:
    "Software engineer building mobile and web products end-to-end — from research and design to Flutter, Next.js and Django code in production.",
  currently: { role: "Application Developer Intern", org: "BCA" },
} as const;

export const education = {
  school: "Universitas Indonesia",
  degree: "Bachelor of Computer Science",
  faculty: "Faculty of Computer Science (Fasilkom UI)",
  period: "2023 – Present",
  gpa: "3.84",
  // CONFIRM: GPA display — hidden for now (04-plan Q2)
  showGpa: false,
  href: "https://cs.ui.ac.id/",
} as const;

// GPA clause omitted while education.showGpa is false.
export const about =
  "Computer Science student at Universitas Indonesia. I've shipped apps used by hundreds of students, led a Flutter study group at RISTEK, and teach algorithms and databases to 200+ students a year as a TA. I like building things that make systems smarter and people's work easier — and I'm increasingly drawn to DevOps, data and AI.";

export const writing = {
  line: "Writing about what I learn while building and deploying things.",
} as const;

export const contact = {
  heading: "Let’s build something.",
  sub: "Open to internships, collaborations and interesting projects.",
} as const;

export const seo = {
  title: "Daniel Liman — Software Engineer | dnlmn",
  description:
    "Daniel Liman (dnlmn) is a software engineer from Universitas Indonesia building mobile and web products end-to-end with Flutter, Next.js and Django.",
  ogImage: "/images/banner-tall.png",
} as const;
