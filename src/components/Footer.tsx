import { GitHubIcon, InstagramIcon, LinkedInIcon, XIcon } from './icons/SocialIcons';
import { socialLinks } from '@/lib/social';

const profiles = [
  { label: 'GitHub', href: socialLinks.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: socialLinks.linkedin, Icon: LinkedInIcon },
  { label: 'X', href: socialLinks.x, Icon: XIcon },
  { label: 'Instagram', href: socialLinks.instagram, Icon: InstagramIcon },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-around gap-x-6 gap-y-3 px-6 py-5 sm:px-12">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-wide text-zinc-400 sm:justify-start">
          <span>© {new Date().getFullYear()} Daniel Liman</span>
          <span aria-hidden="true">·</span>
          <a
            href="https://github.com/hyvos07/dnlmn-web"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54b4e2]"
          >
            Source code
          </a>
        </p>
        <nav aria-label="Social profiles">
          <ul className="flex items-center gap-2 text-zinc-400 sm:gap-3">
            {profiles.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex rounded-md p-1.5 transition-colors hover:text-[var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#54b4e2]"
                >
                  <Icon width={16} height={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
