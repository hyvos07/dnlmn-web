import Furina from "@/sections/1_home/components/Furina";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950 text-white font-[family-name:var(--font-plus-jakarta-sans)]">
      <div className="flex flex-col text-center items-center">
        <Furina />
        <p className="font-extrabold text-sm text-zinc-300 m-2">
          There is nothing here.
        </p>
        <p className="font-medium text-sm text-zinc-300">
          Only you and this little rotateable creature.
        </p>
      </div>
    </div>
  );
}