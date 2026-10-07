import { Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { profile, socials } from '@/data/profile';

function XIcon({ className, width, height }: { className?: string; width?: number; height?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={width} height={height} fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.36 5.77L17.75 3Zm-1.08 16.18h1.7L7.4 4.73H5.58l11.09 14.45Z" />
    </svg>
  );
}

const items = [
  { ...socials.github, Icon: Github },
  { ...socials.linkedin, Icon: Linkedin },
  { ...socials.x, Icon: XIcon },
  { ...socials.instagram, Icon: Instagram },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: Mail },
];

export default function SocialLinks({ className = '', size = 20 }: { className?: string; size?: number }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {items.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-fg-muted transition-colors duration-micro hover:bg-bg-elev hover:text-fg"
          >
            <Icon className="shrink-0" width={size} height={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
