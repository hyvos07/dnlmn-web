import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import SectionShell from '@/components/motion/SectionShell';
import type { SectionMeta } from '@/data/sections';
import { contact, socials } from '@/data/profile';
import ContactForm from './ContactForm';
import CopyEmail from './CopyEmail';

export default function Contact({ section }: { section: SectionMeta }) {
  return (
    <SectionShell
      {...section}
      fadeTail={false}
      heading={
        <span className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <Image src="/svgs/furina.svg" alt="" width={64} height={64} className="h-12 w-12 lg:h-16 lg:w-16" />
          {contact.heading}
        </span>
      }
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <p className="max-w-prose text-lg text-fg-muted">{contact.sub}</p>
          <CopyEmail />
          <ul className="flex flex-wrap gap-3">
            {[
              { ...socials.linkedin, Icon: Linkedin },
              { ...socials.github, Icon: Github },
            ].map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition-colors duration-micro hover:border-fg"
                >
                  <Icon aria-hidden="true" size={16} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </SectionShell>
  );
}
