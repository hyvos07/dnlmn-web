'use client';
import handleScroll from "@/utils/handleScroll";
import { Home, Blocks, Sparkles, Mail, ArrowDown, UserRound } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems: NavItem[] = [
    { to: 'home', label: 'Home' },
    { to: 'about', label: 'About Me' },
    { to: 'proj', label: 'Projects' },
    { to: 'exp', label: 'Experiences' },
    { to: 'cp', label: 'Contact' },
];

export default function NavBar() {
    const [active, setActive] = useState<string>(navItems[0].to);

    const handleScrollEvent = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        for (const item of navItems) {
            const section = document.getElementById(item.to);
            if (section) {
                const { offsetTop, offsetHeight } = section;
                if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                    setActive(item.to);
                    break;
                }
            }
        }
    };

    // Update current section
    useEffect(() => {
        handleScrollEvent();
        window.addEventListener('scroll', handleScrollEvent);
        return () => window.removeEventListener('scroll', handleScrollEvent);
    }, []);

    return (
        <>
            <nav className="fixed top-6 z-[900] w-full flex justify-center max-sm:hidden">
                <div className="mx-12 bg-slate-900/75 w-full max-w-[300px] backdrop-blur-md border border-slate-800 rounded-[24px]">
                    <div className="flex justify-between items-center px-8 min-h-[54px]">
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleScroll(item.to)}
                            >
                                {item.label === "Home" && <Home size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                                {item.label === "About Me" && <UserRound size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                                {item.label === "Projects" && <Blocks size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                                {item.label === "Experiences" && <Sparkles size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                                {item.label === "Contact" && <Mail size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {active === 'home' && (
                <div className="fixed bottom-10 z-[900] w-full flex justify-center max-md:hidden">
                    <button
                        onClick={() => handleScroll('about')}
                        className={
                            `animate-bounce text-zinc-300 lg:block hidden p-3
                            rounded-full bg-slate-900/75 border border-slate-800`
                        }
                    >
                        <ArrowDown size={24} strokeWidth={2} />
                    </button>
                </div>
            )}
        </>
    );
}
