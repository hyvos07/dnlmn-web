export default function Footer() {
  return (
    <footer className="relative mt-auto w-full">
      <div className="h-[1px] w-full bg-gradient-to-r from-slate-800/75 via-slate-700/80 to-slate-800/75" />
      <div className="flex justify-center bg-slate-900/10 py-5 max-sm:">
        <div className="flex justify-center items-center text-xs tracking-wide w-full px-24 max-sm:flex-col max-sm:gap-1">
          <p className="text-slate-400/75">
            © {new Date().getFullYear()} dnlmn - All rights reserved.
          </p>
          <a href="https://github.com/hyvos07/dnlmn-web" target="_blank" className="underline pl-1 text-slate-400/75">
            Source code
          </a>
        </div>
      </div>
    </footer>
  );
}