// Source of truth: docs/redesign/02-content.md
import type { AccentKey, LinkItem } from "./types";

export interface FeaturedProject {
  slug: string;
  name: string;
  type: string;
  when: string;
  role: string;
  stack: string[];
  team: string;
  summary: string;
  impact: string;
  /** "What Daniel did" or "What Daniel learned" */
  contribution: { label: "What I did" | "What I learned"; text: string };
  features?: string[];
  process?: string[];
  tagline?: string;
  competition?: LinkItem;
  links: LinkItem[];
  accent: AccentKey;
  /** Crop from docs/redesign/assets shown beside the demo */
  media?: { src: string; alt: string; width: number; height: number; caption: string };
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "gallery-csui",
    name: "Gallery Exhibition CSUI",
    type: "Web platform",
    when: "Jan – Jun 2026",
    role: "Developer (Web + Backend), DevOps",
    stack: ["Next.js", "React", "Django"],
    team: "Semester-long group project (Scrum)",
    summary:
      "A web platform where Fasilkom UI students showcase course projects through online galleries and exhibition pages, with online and offline voting as a form of appraisal.",
    impact:
      "Used at the CSUI Game Playtesting Showcase on June 6, 2026, helping Game Development students present their work while visitors discovered and voted for favorite games online and on-site.",
    contribution: {
      label: "What I did",
      text: "Worked across web frontend, backend, deployment, CI/CD and QA. Followed Scrum for a full semester — sprint planning, feature breakdown, review, testing and deployment — in a larger team.",
    },
    features: ["Exhibition & gallery pages", "Offline voting (QR)", "Online voting", "Likes & comments", "Leaderboard"],
    links: [
      { label: "Live", href: "https://gallery.ppl.cs.ui.ac.id" },
      { label: "Post", href: "https://www.instagram.com/p/DZLCTZ_kvgj" },
      { label: "Post", href: "https://www.instagram.com/p/DZIRUEcj9BE" },
    ],
    accent: "gallery",
    media: {
      src: "/images/projects/gallery-csui/showcase.webp",
      alt: "The Gallery Exhibition team at the CSUI Game Playtesting Showcase",
      width: 952,
      height: 721,
      caption: "CSUI Game Playtesting Showcase · June 6, 2026",
    },
  },
  {
    slug: "temankuliah",
    name: "TemanKuliah",
    type: "Mobile app",
    when: "2024 – 2025, launched September 2025",
    role: "Mobile Developer",
    stack: ["Flutter", "Dart", "Django"],
    team: "6 developers, RISTEK Fasilkom UI",
    summary:
      "An all-in-one academic companion for Universitas Indonesia students — GPA calculator, course reviews, and a discussion forum. A full revamp and rebrand of RISTEK's earlier app, UlasKelas.",
    impact: "300+ active users. Live on Google Play and the App Store.",
    contribution: {
      label: "What I did",
      text: "Focused on the Discussion Forum and GPA Calculator features. The main challenge was modernizing the app while keeping the transition smooth for existing UlasKelas users — which meant coding for scalability inside a professional team workflow.",
    },
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.ristek.ulaskelas" },
      { label: "App Store", href: "https://apps.apple.com/id/app/temankuliah/id1603376343" },
    ],
    accent: "temankuliah",
    media: {
      src: "/images/projects/temankuliah/app.webp",
      alt: "TemanKuliah onboarding screen on a phone, with its feature list",
      width: 896,
      height: 967,
      caption: "TemanKuliah by RISTEK Fasilkom UI",
    },
  },
  {
    slug: "moodtune",
    name: "MoodTune",
    type: "Mobile app",
    when: "August 2025",
    role: "Mobile Developer, DevOps",
    stack: ["Flutter", "Dart", "NestJS", "Generative AI", "Spotify API"],
    // CONFIRM: team size wording — default per 04-plan Q3
    team: "A small team of Fasilkom UI students",
    summary:
      "A daily journal app that combines Generative AI with mood tracking, mood analytics, and personalized daily music recommendations powered by Spotify.",
    impact: "Self-initiated; advanced to the final stage of ITFEST IPB.",
    contribution: {
      label: "What I learned",
      text: "Managing time under strict competition deadlines, collaborating in a small team, and pitching confidently to judges.",
    },
    tagline: "Track it. Feel it. Tune it.",
    competition: {
      label: "ITFEST IPB Software Development Competition — Finalist",
      href: "https://itfestmicroipb.com/",
    },
    links: [
      { label: "GitHub", href: "https://github.com/mobilekenatilang/moodtune" },
      { label: "Post", href: "https://www.instagram.com/p/DNUyC2fxCyX/" },
      { label: "Pitch deck", href: "https://drive.google.com/file/d/1JIzUCu5G5J3u342U2GJXg2GW_etRo0B5/view" },
    ],
    accent: "moodtune",
    media: {
      src: "/images/projects/moodtune/pitch.webp",
      alt: "Pitching MoodTune on stage at ITFEST IPB",
      width: 532,
      height: 928,
      caption: "Pitching MoodTune at ITFEST IPB",
    },
  },
  {
    slug: "rakyat-bisa",
    name: "Rakyat Bisa!",
    type: "Product design (research → prototype)",
    when: "June 2025",
    role: "Product Designer, Product Analyst",
    stack: ["Figma"],
    team: "6 members, course project",
    summary:
      "A digital platform concept that gives marginalized communities in Indonesia access to online entrepreneurship courses and workshops.",
    impact:
      "Full human-centered design process, from user research and interviews to a high-fidelity Figma prototype.",
    contribution: {
      label: "What I learned",
      text: "Applying structured design thinking and turning research insights into design solutions ready for development.",
    },
    process: [
      "User research and interviews",
      "Value Proposition Canvas",
      "User Journey Mapping",
      "Task Analysis",
      "Requirements",
      "Design system and high-fidelity prototype",
    ],
    links: [
      {
        label: "Prototype",
        href: "https://www.figma.com/proto/gMG8pjDLrpxlWcymZ54qb9/Rakyat-Bisa-?node-id=9518-1358&t=pmFFx4GJbsJcJu1P-0&scaling=scale-down&content-scaling=fixed&page-id=9518%3A1357&starting-point-node-id=9518%3A1358",
      },
      { label: "Pitch deck", href: "https://www.figma.com/deck/lBIP1WbphAbhDuvrWqHWzC" },
    ],
    accent: "rakyatbisa",
  },
];

export interface MoreProject {
  name: string;
  line: string;
  stack: string[];
  links: LinkItem[];
}

export const moreProjects: MoreProject[] = [
  {
    name: "Ngawasin",
    line: "Real-time clock + persistent notes for lab supervision and exam proctoring — built for my own TA work.",
    stack: ["Astro", "React", "Tailwind"],
    links: [
      { label: "Live", href: "https://ngawasin.dnlmn.dev" },
      { label: "GitHub", href: "https://github.com/hyvos07/ngawasin" },
    ],
  },
  {
    name: "Dissonance",
    line: "Individual game jam entry (Game Development course).",
    stack: ["Godot (GDScript)"],
    links: [{ label: "GitHub", href: "https://github.com/hyvos07/dissonance" }],
  },
];

export const moreOnGithub: LinkItem = { label: "More on GitHub →", href: "https://github.com/hyvos07" };
