import { ArrowUpRight } from 'lucide-react';
import SectionShell from '@/components/motion/SectionShell';
import SplitReveal from '@/components/motion/SplitReveal';
import type { SectionMeta } from '@/data/sections';
import { about, education } from '@/data/profile';
import Portrait from './Portrait';
import SpotifyCard from './SpotifyCard';
import Toolbox from './Toolbox';

export default function About({ section }: { section: SectionMeta }) {
  return (
    <SectionShell {...section} heading="About">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-7">
          <SplitReveal as="p" className="max-w-prose text-xl leading-relaxed md:text-2xl md:leading-relaxed">
            {about}
          </SplitReveal>

          <a
            href={education.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start justify-between gap-6 border-t border-line pt-5"
          >
            <span>
              <span className="block font-mono text-label uppercase text-fg-muted">Education · {education.period}</span>
              <span className="mt-2 block text-lg font-semibold">{education.school}</span>
              <span className="block text-fg-muted">
                {education.degree}, {education.faculty}
                {education.showGpa && ` · GPA ${education.gpa}`}
              </span>
            </span>
            <ArrowUpRight aria-hidden="true" className="mt-1 shrink-0 text-fg-muted transition-transform duration-micro group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
          </a>

          <Toolbox />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="mx-auto w-full max-w-[380px] lg:max-w-none">
            <Portrait />
          </div>
          <SpotifyCard />
        </div>
      </div>
    </SectionShell>
  );
}
