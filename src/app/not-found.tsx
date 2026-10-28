import Furina from "@/sections/1_home/components/Furina";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white font-[family-name:var(--font-plus-jakarta-sans)]">
      <div className="flex flex-col text-center items-center">
        <Furina />
        <p className="font-extrabold text-sm text-zinc-300 m-2">
          There is nothing here.
        </p>
        <p className="font-medium text-sm text-zinc-300">
          Only you and this little creature.
        </p>
        <Link
          href="/"
          aria-label="Maybe you should go back?"
          className="group inline-grid font-medium text-xs text-zinc-400/75 m-4 transition-colors duration-200 hover:text-zinc-300 focus-visible:text-zinc-300 motion-reduce:transition-none"
        >
          <span aria-hidden="true" className="col-start-1 row-start-1 justify-self-center whitespace-nowrap group-hover:invisible group-focus-visible:invisible">
            Maybe you should go back?
          </span>
          <span aria-hidden="true" className="invisible col-start-1 row-start-1 justify-self-center whitespace-nowrap underline underline-offset-4 group-hover:visible group-focus-visible:visible">
            Maybe I should go back!
          </span>
        </Link>
      </div>
    </div>
  );
}
