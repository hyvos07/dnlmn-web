'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SplashScreen() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power4.inOut" },
      onComplete: () => {
        if (wrapperRef.current) {
          wrapperRef.current.remove();
        }
      },
    });

    // Pause
    tl.to(contentRef.current, {
      duration: 0.5
    });

    // All Dissolve
    tl.to(".splash-layer", {
      y: "-100%",
      duration: 1
    });
    
    tl.to(contentRef.current, {
      y: "-400%",
      opacity: 0,
      duration: 1
    }, "<");

    // Delete layer
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="fixed flex justify-center items-center top-0 left-0 right-0 w-full h-full z-[999]">
      <div className="splash-layer w-full h-full bg-[#091226] backdrop-blur-md" />
      <div ref={contentRef} className="absolute flex flex-col items-center gap-8 z-10">
        <img
          src="/svgs/furina.svg"
          alt="Logo"
          className="w-32 h-32"
        />
        {/* <div className="text-xl md:text-2xl text-white font-semibold mx-10 text-center">
          Loading...
        </div> */}
      </div>
    </div>
  );
};