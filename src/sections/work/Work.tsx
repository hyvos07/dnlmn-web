import SectionShell from '@/components/motion/SectionShell';
import type { SectionMeta } from '@/data/sections';
import { featuredProjects } from '@/data/projects';
import ProjectStack from './ProjectStack';
import MoreProjects from './MoreProjects';

export default function Work({ section }: { section: SectionMeta }) {
  return (
    <SectionShell {...section} heading="Selected work">
      <ProjectStack projects={featuredProjects} />
      <MoreProjects />
    </SectionShell>
  );
}
