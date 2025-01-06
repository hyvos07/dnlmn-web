'use client';
import { Home, Blocks, Sparkles, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

interface NavItem {
    to: string;
    label: string;
}

const navItems: NavItem[] = [
    { to: 'home', label: 'Home' },
    { to: 'proj', label: 'Projects' },
    { to: 'exp', label: 'Experiences' },
    { to: 'cp', label: 'Contact' },
];

export default function NavBar() {
    const [active, setActive] = useState<string>(navItems[0].to);

    const handleScroll = (to: string) => {
        const section = document.getElementById(to);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Update current section
    useEffect(() => {
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

        window.addEventListener('scroll', handleScrollEvent);
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    return (
        <nav className="fixed top-6 z-[900] w-full flex justify-center">
            <div className="mx-12 bg-slate-900/75 w-full max-w-[250px] backdrop-blur-md border border-slate-800 rounded-[24px]">
                <div className="flex justify-between items-center px-8 min-h-[54px]">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleScroll(item.to)}
                        >
                            {item.label === "Home" && <Home size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                            {item.label === "Projects" && <Blocks size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                            {item.label === "Experiences" && <Sparkles size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                            {item.label === "Contact" && <Mail size={24} strokeWidth={1.75} color={active === item.to ? "#54b4e2" : "white"} />}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
