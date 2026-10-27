import ProjectShowcase from "./components/ProjectShowcase";
import allProjects from "../../json/proj.json";
import ScrollReveal, { RevealItem } from '@/components/ScrollReveal';

const projects: Project[] = allProjects;

export default function ProjectContent() {
  return (
    <ScrollReveal id="proj" className="mt-16 py-16 md:px-8">
      <div className="max-w-6xl mx-auto">
        <RevealItem delay={0}>
          <h2 className="text-2xl lg:text-3xl font-semibold mb-16 text-center">My Projects</h2>
        </RevealItem>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Equal-height grid cells share a trigger line, revealing each responsive row together. */}
          {projects.map((project) => (
            <RevealItem key={project.id} contentClassName="h-full">
              <ProjectShowcase {...project} />
            </RevealItem>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
