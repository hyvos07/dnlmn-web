import { ReactNode } from "react";

export default function InterestItem({ icon, title, desc } : { icon: ReactNode, title: string, desc: string }) {
    return (
        <div className="flex items-center gap-4 w-full">
            <div className='items-center rounded-xl text-xl transition-transform hover:rotate-12'>
                {icon}
            </div>
            <div className="flex flex-col gap-1 text-left">
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-xs text-zinc-400/80">{desc}</p>
            </div>
        </div>
    );
}