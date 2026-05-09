'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface SliderProps {
  items: { icon: string; title: string }[];
  speed?: number;
  gap?: number;
}

export default function Slider({
  items,
  speed = 20,
  gap = 32,
}: SliderProps): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);
  const reqRef = useRef<number>(0);
  const exactScrollLeft = useRef<number>(0);
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Dragging & Momentum state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDistance = useRef(0);
  const lastDragTime = useRef(0);
  const lastDragX = useRef(0);
  const momentumVelocity = useRef(0); // pixels per ms

  const itemWidth = 56;
  const totalWidth = items.length * (itemWidth + gap);
  const pixelsPerSecond = totalWidth / speed;

  const handleInteraction = () => {
    setIsInteracting(true);
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2000);
  };

  useEffect(() => {
    if (scrollRef.current && exactScrollLeft.current === 0) {
      const initialPos = totalWidth * 2;
      scrollRef.current.scrollLeft = initialPos;
      exactScrollLeft.current = initialPos;
    }
  }, [totalWidth]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      
      if (el) {
        if (isDragging.current) {
          exactScrollLeft.current = el.scrollLeft;

          if (exactScrollLeft.current >= totalWidth * 3) {
            exactScrollLeft.current -= totalWidth;
            el.scrollLeft = exactScrollLeft.current;
          } else if (exactScrollLeft.current <= totalWidth * 2) {
            exactScrollLeft.current += totalWidth;
            el.scrollLeft = exactScrollLeft.current;
          }
        } else if (Math.abs(momentumVelocity.current) > 0.05) {
          exactScrollLeft.current += momentumVelocity.current * dt;
          momentumVelocity.current *= 0.95; // Friction

          if (exactScrollLeft.current >= totalWidth * 3) {
            exactScrollLeft.current -= totalWidth;
          } else if (exactScrollLeft.current <= totalWidth * 2) {
            exactScrollLeft.current += totalWidth;
          }
          
          el.scrollLeft = exactScrollLeft.current;
          handleInteraction();
        } else if (!isHovered && !isInteracting) {
          momentumVelocity.current = 0;
          exactScrollLeft.current += pixelsPerSecond * (dt / 1000);
          
          if (exactScrollLeft.current >= totalWidth * 3) {
            exactScrollLeft.current -= totalWidth;
          } else if (exactScrollLeft.current <= totalWidth * 2) {
            exactScrollLeft.current += totalWidth;
          }
          
          el.scrollLeft = exactScrollLeft.current;
        } else {
          exactScrollLeft.current = el.scrollLeft;

          if (exactScrollLeft.current >= totalWidth * 3) {
            exactScrollLeft.current -= totalWidth;
            el.scrollLeft = exactScrollLeft.current;
          } else if (exactScrollLeft.current <= totalWidth * 2) {
            exactScrollLeft.current += totalWidth;
            el.scrollLeft = exactScrollLeft.current;
          }
        }
      }
      reqRef.current = requestAnimationFrame(loop);
    };

    reqRef.current = requestAnimationFrame(loop);
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [isHovered, isInteracting, pixelsPerSecond, totalWidth]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only left click
    isDragging.current = true;
    dragDistance.current = 0;
    momentumVelocity.current = 0;
    if (scrollRef.current) {
      startX.current = e.pageX;
      lastDragX.current = e.pageX;
      lastDragTime.current = performance.now();
    }
    handleInteraction();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX;
    const dx = x - lastDragX.current;
    
    if (dragDistance.current <= 5) {
      dragDistance.current += Math.abs(dx);
      if (dragDistance.current > 5) {
        scrollRef.current.scrollLeft -= (x - startX.current);
      }
    } else {
      scrollRef.current.scrollLeft -= dx;
    }

    const now = performance.now();
    const dtTime = now - lastDragTime.current;
    if (dtTime > 0) {
      momentumVelocity.current = -dx / dtTime;
    }
    
    lastDragX.current = x;
    lastDragTime.current = now;

    handleInteraction();
  };

  const handlePointerUp = () => {
    isDragging.current = false;
    const dt = performance.now() - lastDragTime.current;
    if (dt > 50) {
      momentumVelocity.current = 0;
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragDistance.current > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const renderWagon = (wagonIndex: number) => (
    <React.Fragment key={wagonIndex}>
      {items.map((item, index) => (
        <div
          key={`${wagonIndex}-${index}`}
          className="relative group w-14 h-14 p-1 transition-all duration-300 opacity-80 hover:opacity-100 flex-shrink-0 cursor-grab active:cursor-grabbing select-none"
        >
          <Image
            src={item.icon}
            alt={item.title}
            width={56}
            height={56}
            className="w-full h-full object-contain transition-all duration-300 group-hover:blur-[2px] icon-tilt select-none"
            draggable="false"
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 select-none">
            <span className="text-[10px] font-medium text-white bg-black/60 px-1.5 py-0.5 rounded text-center leading-tight shadow-sm whitespace-nowrap">
              {item.title}
            </span>
          </div>
        </div>
      ))}
    </React.Fragment>
  );

  return (
    <div className="w-full overflow-hidden select-none touch-pan-y">
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        @keyframes tilt {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(-7deg) scale(0.95); }
        }
        .group:hover .icon-tilt { animation: tilt 0.3s ease-out forwards; }
      `}</style>
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto overflow-y-hidden hide-scroll w-full cursor-grab active:cursor-grabbing"
        style={{
          gap: `${gap}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
        onWheel={handleInteraction}
        onClickCapture={handleClickCapture}
      >
        {Array.from({ length: 6 }).map((_, i) => renderWagon(i))}
      </div>
    </div>
  );
}