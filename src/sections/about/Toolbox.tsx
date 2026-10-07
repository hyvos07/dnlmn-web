import { languages, skills } from '@/data/skills';

/** Grouped skills as mono chips (never a logo wall). Hovering a group lights up its chips. */
export default function Toolbox() {
  return (
    <div>
      <h3 className="mb-5 font-mono text-label uppercase text-fg-muted">Toolbox</h3>
      <ul className="divide-y divide-line border-y border-line">
        {skills.map(({ group, items }) => (
          <li key={group} className="group grid gap-3 py-4 sm:grid-cols-[9rem_1fr] sm:items-baseline">
            <span className="text-sm font-semibold text-fg-muted transition-colors duration-micro group-hover:text-fg">
              {group}
            </span>
            <ul className="flex flex-wrap gap-1.5" aria-label={group}>
              {items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line px-3 py-1 font-mono text-label uppercase text-fg-muted transition-colors duration-micro group-hover:border-accent group-hover:text-fg"
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-fg">
        <span className="font-mono text-label uppercase text-fg-muted">Languages</span>{' '}
        {languages.map((l, i) => (
          <span key={l.name}>
            {i > 0 && ' · '}
            {l.name} <span className="text-fg-muted">({l.level})</span>
          </span>
        ))}
      </p>
    </div>
  );
}
