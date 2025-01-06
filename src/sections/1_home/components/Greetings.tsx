'use client';
// import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';

const GREETINGS_LIST = [
    'Hello!',
    'Bonjour!',
    'Guten Tag!',
    'Ciao!',
    'Olá!',
    'こんにちは!',
    '你好!',
    '안녕하세요!',
    'Halo!',
];

export default function Greetings() {
    // const [displayedText, setDisplayedText] = useState('');
    // const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
    // const [isDeleting, setIsDeleting] = useState(false);
    // const [charIndex, setCharIndex] = useState(0);

    // useEffect(() => {
    //     const currentGreeting = GREETINGS_LIST[currentGreetingIndex].text;

    //     if (!isDeleting && charIndex < currentGreeting.length) {
    //         setTimeout(() => {
    //             setDisplayedText(currentGreeting.substring(0, charIndex + 1));
    //             setCharIndex(charIndex + 1);
    //         }, 80);
    //     } else if (isDeleting && charIndex > 0) {
    //         setTimeout(() => {
    //             setDisplayedText(currentGreeting.substring(0, charIndex - 1));
    //             setCharIndex(charIndex - 1);
    //         }, 40);
    //     } else if (!isDeleting && charIndex === currentGreeting.length) {
    //         setTimeout(() => setIsDeleting(true), 1500);
    //     } else if (isDeleting && charIndex === 0) {
    //         setIsDeleting(false);
    //         setCurrentGreetingIndex((currentGreetingIndex + 1) % GREETINGS_LIST.length);
    //     }
    // }, [charIndex, isDeleting, currentGreetingIndex]);

    return (
        <p className="text-4xl lg:text-6xl font-bold min-h-[2.5rem] lg:min-h-[4rem]">
            <Typewriter 
                words={GREETINGS_LIST}
                loop={true}
            />
        </p>
    );
}