import { Mail } from "lucide-react";

export default function Social() {
    return (
        <ul className="flex gap-4 text-zinc-200">
            <li className="p-1">
                <a className="group rounded-lg text-zinc-400 hover:text-zinc-100 duration-300" href="https://github.com/hyvos07" target="_blank" aria-label="Github">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github stroke-current">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                        <path d="M9 18c-4.51 2-5-2-7-2"/>
                    </svg>
                </a>
            </li>
            <li className="p-1">
                <a className="group rounded-lg text-zinc-400 hover:text-zinc-100 duration-300" href="https://linkedin.com/in/danielliman" target="_blank" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin stroke-current">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect width="4" height="12" x="2" y="9"/>
                        <circle cx="4" cy="4" r="2"/>
                    </svg>
                </a>
            </li>
            <li className="p-1">
                <a className="group rounded-lg text-zinc-400 hover:text-zinc-100 duration-300" href="https://x.com/hyvos_" target="_blank" aria-label="Twitter/X">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256" stroke="currentColor" className="lucide lucide-github stroke-current">
                        <g fill="currentColor">
                            <path d="M208 216h-48L48 40h48Z" opacity=".2"/>
                            <path d="m214.75 211.71l-62.6-98.38l61.77-67.95a8 8 0 0 0-11.84-10.76l-58.84 64.72l-40.49-63.63A8 8 0 0 0 96 32H48a8 8 0 0 0-6.75 12.3l62.6 98.37l-61.77 68a8 8 0 1 0 11.84 10.76l58.84-64.72l40.49 63.63A8 8 0 0 0 160 224h48a8 8 0 0 0 6.75-12.29M164.39 208L62.57 48h29l101.86 160Z"/>
                        </g>
                    </svg>
                </a>
            </li>
            {/* <li className="p-1">
                <a className="group rounded-lg text-zinc-400 hover:text-zinc-100 duration-300" href="/" target="" aria-label="Resume">
                    <FileText size={24} />
                </a>
            </li> */}
            <li className="p-1">
                <a className="group rounded-lg text-zinc-400 hover:text-zinc-100 duration-300" href="mailto:daniel.liman07@gmail.com" target="_blank" aria-label="Email">
                    <Mail size={24} />
                </a>
            </li>
        </ul>
    );
}