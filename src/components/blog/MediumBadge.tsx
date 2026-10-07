interface MediumBadgeProps {
  mediumUrl?: string;
}

export default function MediumBadge({ mediumUrl }: MediumBadgeProps) {
  if (!mediumUrl) return null;

  return (
    <a
      href={mediumUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Read this post on Medium"
      className="flex items-center gap-4 px-6 py-4 my-8 mx-auto max-w-md
                 rounded-xl border border-line bg-bg-elev
                 hover:border-line hover:bg-bg-elev
                 transition-all duration-200 group"
    >
      {/* Medium Logo */}
      <div className="flex-shrink-0">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-fg group-hover:text-fg transition-colors duration-200"
          aria-hidden="true"
        >
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-xs text-fg-muted">Originally published on </span>
        <span className="text-sm font-semibold text-fg group-hover:text-accent-hydro transition-colors duration-200">
          Read on Medium <span aria-hidden="true">→</span>
        </span>
      </div>
    </a>
  );
}
