export default function Footer() {
  return (
    <footer className="relative mt-auto w-full">
      <div className="flex justify-center py-8">
        <div className="flex justify-center items-center text-xs tracking-wide w-full px-4 md:px-20 max-sm:flex-col max-sm:gap-2">
          <p className="text-gray-300/75">
            © {new Date().getFullYear()} dnlmn - All rights reserved.
          </p>
          <a href="https://github.com/hyvos07/dnlmn-web" target="_blank" className="underline pl-1 text-neutral-300/75">
            Source code
          </a>
        </div>
      </div>
    </footer>
  );
}
