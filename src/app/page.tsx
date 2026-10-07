import NavBar from "@/components/nav/NavBar";
import SectionShell from "@/components/motion/SectionShell";
import SplitReveal from "@/components/motion/SplitReveal";
import AccentController from "@/components/motion/AccentController";
import { sections } from "@/data/sections";
import { profile, socials, education } from "@/data/profile";
import { featuredProjects } from "@/data/projects";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  url: profile.siteUrl,
  jobTitle: profile.role,
  sameAs: [socials.github.href, socials.linkedin.href, socials.x.href, socials.instagram.href],
  // CONFIRM: employer (BCA) omitted from JSON-LD per 04-plan Q6
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
};

// Phase 1 placeholders — each section's real content lands in Phases 2–5.
const placeholders: Record<string, string> = {
  home: "Hero, particle field and load sequence — Phase 2",
  about: "About copy, photo, Spotify card and toolbox — Phase 2",
  work: "Pinned project panels and demos — Phase 3",
  experience: "Scrubbed timeline, role track and sorting visualizer — Phase 4",
  writing: "Latest posts — Phase 5",
  contact: "Copy email, form and footer — Phase 5",
};

const headings: Record<string, React.ReactNode> = {
  about: "About",
  work: "Selected work",
  experience: "Experience",
  writing: "Writing",
  contact: "Let's build something.",
};

function Placeholder({ text, tall = true }: { text: string; tall?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-line p-8 text-center font-mono text-label uppercase text-fg-muted ${
        tall ? "min-h-[70vh]" : "min-h-[50vh]"
      }`}
    >
      {text}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <NavBar />
      <main>
        {sections.map((s) => {
          if (s.id === "home") {
            return (
              <SectionShell
                key={s.id}
                {...s}
                headingLevel="h1"
                headingReveal="none"
                heading={
                  <SplitReveal as="span" immediate className="block">
                    <span className="block">{profile.firstName}</span>
                    <span className="block">{profile.lastName}</span>
                  </SplitReveal>
                }
                className="flex min-h-svh flex-col justify-center"
              >
                <Placeholder text={placeholders.home} tall={false} />
              </SectionShell>
            );
          }

          if (s.id === "work") {
            return (
              <SectionShell key={s.id} {...s} heading={headings.work}>
                <div className="flex flex-col gap-10">
                  {featuredProjects.map((p, i) => (
                    <div key={p.slug} data-accent={p.accent} className="flex flex-col gap-4">
                      <p className="flex items-center gap-3 font-mono text-label uppercase text-fg-muted">
                        <span aria-hidden="true" className="h-px w-8 bg-accent" />
                        {String(i + 1).padStart(2, "0")} · {p.type}
                      </p>
                      <h3 className="text-h3">{p.name}</h3>
                      <Placeholder text={`${p.name} panel + demo — Phase 3`} />
                    </div>
                  ))}
                  <div data-accent="neutral" className="flex flex-col gap-4">
                    <h3 className="text-h3">More projects</h3>
                    <Placeholder text="Ngawasin, Dissonance, GitHub — Phase 4" tall={false} />
                  </div>
                </div>
              </SectionShell>
            );
          }

          return (
            <SectionShell key={s.id} {...s} heading={headings[s.id]} fadeTail={s.id !== "contact"}>
              <Placeholder text={placeholders[s.id]} />
            </SectionShell>
          );
        })}
      </main>
      <AccentController />
    </>
  );
}
