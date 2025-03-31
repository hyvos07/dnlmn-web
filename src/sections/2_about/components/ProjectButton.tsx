'use client';
import handleScroll from "@/utils/handleScroll";
import { ArrowRight } from "lucide-react";

export default function ProjectButton() {
    return (
        <button
            className="group flex rounded-xl p-6 justify-between border border-zinc-700 lg:w-[360px]"
            onClick={() => handleScroll('proj')}
        >
            <p className="text-sm font-semibold">Projects and Experiences</p>
            <div className="group-hover:rotate-90 transition-transform">
                <ArrowRight size={20} />
            </div>
        </button>
    );
}