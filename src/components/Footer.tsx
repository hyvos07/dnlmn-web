import SocialLinks from '@/components/ui/SocialLinks';

export default function Footer() {
  return (
    <footer className="relative mt-auto w-full border-t border-line">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-4 px-6 py-8 md:flex-row md:items-center md:px-12 xl:px-20">
        <p className="font-mono text-label uppercase text-fg-muted">
          © {new Date().getFullYear()} Daniel Liman ·{' '}
          <a
            href="https://github.com/hyvos07/dnlmn-web"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm underline underline-offset-4 hover:text-fg"
          >
            Source code
          </a>
        </p>
        <SocialLinks className="-ml-2.5 md:ml-0" size={18} />
      </div>
    </footer>
  );
}
