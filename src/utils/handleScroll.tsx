'use client';

export default function handleScroll(to: string) {
    const section = document.getElementById(to);
    if (section) {
        const offset = section.offsetTop - 50;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
};