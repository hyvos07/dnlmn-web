import ProjectShowcase from "./components/ProjectShowcase";
import allProjects from "../../json/proj.json";

const projects: Project[] = allProjects;

export default function ProjectContent() {
    return (
        <div id="proj" className="mt-16 py-16 md:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl lg:text-3xl font-semibold mb-16 text-center">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProjectShowcase
                        key={0}
                        title="Portfolio Website"
                        description="My personal portfolio website showcasing my projects and skills. You are here!"
                        type="Website"
                        technologies={[
                            { 
                                icon: "https://raw.githubusercontent.com/marwin1991/profile-technology-icons/refs/heads/main/icons/react.png",
                                title: "React",  link: ""
                            },
                            { 
                                icon: "https://user-images.githubusercontent.com/25181517/202896760-337261ed-ee92-4979-84c4-d4b829c7355d.png", 
                                title: "Tailwind CSS", link: ""
                            },
                            { 
                                icon: "/tech/three.jpg", 
                                title: "Three.js", link: ""
                            },
                            { 
                                icon: "/tech/nextjs.svg", 
                                title: "Next.js", link: ""
                            }
                        ]}
                        imageUrl="/images/projects/portofolio.png"
                        githubUrl="https://github.com/hyvos07/dnlmn-web/"
                    />
                    {projects.map((project, idx) => (<ProjectShowcase key={idx} {...project} />))}
                </div>
            </div>
        </div>
    );
}