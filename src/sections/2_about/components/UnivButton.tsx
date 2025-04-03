'use client';
import { useState } from 'react';
import Image from "next/image";

export default function UnivButton() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='flex lg:gap-4 gap-3 text-sm max-md:text-xs items-center px-1.5'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <a href="https://cs.ui.ac.id/en/" target="_blank" rel="noreferrer">
                <Image
                    src={isHovered ? "/svgs/logo/MakaraPacil.svg" : "/svgs/logo/MakaraUI.svg"}
                    alt="Makara"
                    width={40}
                    height={40}
                    className="lg:w-10 lg:h-10 w-9 h-9"
                />
            </a>
            <div className="flex flex-col gap-1 text-left">
                <p className="font-semibold">University of Indonesia</p>
                <p className="text-zinc-500">Faculty of Computer Science</p>
            </div>
        </div>
    );
}