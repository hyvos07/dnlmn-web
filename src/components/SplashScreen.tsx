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

    // Content appear!
    tl.to(contentRef.current, { 
      opacity: 1,
      duration: 1.4
    });

    // Rectangle and content exit!
    tl.to(".loading-rectangle", {
      y: "-100%",
    });

    tl.to(contentRef.current, { 
      y: "-300%", 
      opacity: 0, 
      duration: 1.5
    }, "<");

    tl.set(document.documentElement, { 
      cursor: "default" 
    }, "<0.5");

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="fixed flex justify-center items-center top-0 left-0 right-0 w-full h-full z-[999]">
      <div className="loading-rectangle w-full h-full bg-slate-900" />
      <div ref={contentRef} className="absolute flex flex-col items-center gap-8 opacity-0 z-10">
        <img 
          src="/svgs/furina.svg"
          alt="Logo"
          className="w-32 h-32"
        />
        <div className="text-2xl text-white font-semibold">
          Presented by the Opera Epiclese
        </div>
      </div>
    </div>
  );
};