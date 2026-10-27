import ProjectShowcase from "./components/ProjectShowcase";
import allProjects from "../../json/proj.json";

const projects: Project[] = allProjects;

export default function ProjectContent() {
  return (
    <div id="proj" className="mt-16 py-16 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-semibold mb-16 text-center">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (<ProjectShowcase key={project.id} {...project} />))}
        </div>
      </div>
    </div>
  );
}
