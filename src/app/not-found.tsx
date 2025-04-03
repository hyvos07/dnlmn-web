import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white font-[family-name:var(--font-plus-jakarta-sans)]">
            <div className="flex flex-col text-center items-center">
                <Image
                    src="/images/furina.gif"
                    alt="Furina"
                    width={128}
                    height={128}
                    className="w-32 h-32 mb-8 opacity-80"
                    draggable="false"
                />
                <p className="font-extrabold text-sm text-zinc-400 mb-2">
                    There is nothing here.
                </p>
                <p className="font-medium text-sm text-zinc-400">
                    Only you and this little creature.
                </p>
            </div>
        </div>
    );
}