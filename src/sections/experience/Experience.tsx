import SectionShell from '@/components/motion/SectionShell';
import type { SectionMeta } from '@/data/sections';
import Timeline from './Timeline';

export default function Experience({ section }: { section: SectionMeta }) {
  return (
    <SectionShell {...section} heading="Experience">
      <Timeline />
    </SectionShell>
  );
}
