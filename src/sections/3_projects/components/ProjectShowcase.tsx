import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectShowcase(project: Project) {
    return (
        <div className="flex flex-col h-full w-full rounded-xl overflow-hidden bg-black border border-zinc-800 hover:border-zinc-700 transition duration-200">
            <div className="w-full aspect-[16/9] relative">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="py-6 px-8 flex flex-col flex-grow">
                <div className="flex gap-2 md:justify-between items-center mb-4">
                    <h3 className="md:text-xl font-semibold">{project.title}</h3>
                    <div className="text-blue-500 bg-blue-900 bg-opacity-30 px-3 py-1.5 rounded-full">
                        <p className="text-blue-200 text-xs">{project.type}</p>
                    </div>
                </div>
                <p className="text-gray-400 text-sm flex-grow pr-4">
                    {project.description}
                </p>
                <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center">
                        {project.technologies.map((tech, index) => (
                            <div key={index} className="w-8 h-8 flex justify-center items-center relative group">
                                <img
                                    src={tech.icon}
                                    alt={tech.title}
                                    width={20}
                                    height={20}
                                />
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {tech.title}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4 items-center">
                        {project.demoUrl && (
                            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink width={20} height={20} className="opacity-80 hover:opacity-100 transition duration-200" />
                            </Link>
                        )}
                        {project.githubUrl && (
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github stroke-current opacity-80 hover:opacity-100 transition duration-200">
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}