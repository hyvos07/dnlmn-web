// Source of truth: docs/redesign/02-content.md — grouped, never a logo wall

export interface SkillGroup {
  group: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  { group: "Mobile", items: ["Flutter", "Dart"] },
  { group: "Web", items: ["Next.js", "React", "Astro", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"] },
  { group: "Backend", items: ["Django", "Python", "Spring Boot", "Java", "NestJS", "Go"] },
  { group: "Data", items: ["PostgreSQL", "Oracle DB", "Supabase", "SQL"] },
  { group: "DevOps & Cloud", items: ["Kubernetes", "OpenShift", "AWS", "ELK Stack", "CI/CD", "Git"] },
  { group: "Design", items: ["Figma"] },
  { group: "Also", items: ["C++", "Rust"] },
];

export const languages = [
  { name: "Bahasa Indonesia", level: "native" },
  { name: "English", level: "professional" },
  { name: "Japanese", level: "elementary" },
] as const;
