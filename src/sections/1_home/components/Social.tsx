import { FileText, Mail } from "lucide-react";
import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from '@/components/icons/SocialIcons';
import { socialLinks } from '@/lib/social';

export default function Social() {
  return (
    <ul className="flex flex-wrap gap-3 sm:gap-6 text-zinc-200 mt-1.5">
      <li className="p-1">
        <a className="group rounded-lg text-zinc-300 hover:text-zinc-100 duration-300 relative" href={socialLinks.github} target="_blank" aria-label="Github">
          <GitHubIcon width={26} height={26} className="stroke-current sm:w-7 sm:h-7" aria-hidden="true" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Github
          </div>
        </a>
      </li>
      <li className="p-1">
        <a className="group rounded-lg text-zinc-300 hover:text-zinc-100 duration-300 relative" href={socialLinks.linkedin} target="_blank" aria-label="LinkedIn">
          <LinkedInIcon width={26} height={26} className="stroke-current sm:w-7 sm:h-7" aria-hidden="true" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            LinkedIn
          </div>
        </a>
      </li>
      <li className="p-1">
        <a className="group rounded-lg text-zinc-300 hover:text-zinc-100 duration-300 relative" href={socialLinks.x} target="_blank" aria-label="Twitter/X">
          <XIcon width={28} height={28} className="stroke-current sm:w-[30px] sm:h-[30px]" aria-hidden="true" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Twitter/X
          </div>
        </a>
      </li>
      <li className="p-1">
        <a className="group rounded-lg text-zinc-300 hover:text-zinc-100 duration-300 relative" href={socialLinks.instagram} target="_blank" aria-label="Instagram">
          <InstagramIcon width={24} height={24} className="sm:w-7 sm:h-7" aria-hidden="true" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Instagram
          </div>
        </a>
      </li>
      <li className="p-1">
        <a className="group rounded-lg text-zinc-300 hover:text-zinc-100 duration-300 relative" href="https://docs.google.com/document/d/10mnUjUjKWp9L2lqlMg3ukI3YosSuUOoIwBpSsa4VICA" target="_blank" aria-label="Resume">
          <FileText size={26} className="sm:w-7 sm:h-7" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Resume
          </div>
        </a>
      </li>
      <li className="p-1">
        <a className="group rounded-lg text-zinc-300 hover:text-zinc-100 duration-300 relative" href="mailto:hey@dnlmn.dev" target="_blank" aria-label="Email">
          <Mail size={26} className="sm:w-7 sm:h-7" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-zinc-800 text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Email
          </div>
        </a>
      </li>
    </ul>
  );
}
