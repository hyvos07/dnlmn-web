'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function Slider({
    items,
    speed = 20,
    gap = 32,
}: SliderProps): React.ReactElement {
    const [isHovered, setIsHovered] = useState(false);

    const itemWidth = 56;
    const totalWidth = (itemWidth + gap) * items.length;

    const slideAnimation = `
      @keyframes slide {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${totalWidth}px);
        }
      }
      
      @keyframes tilt {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(-7deg);
        }
      }
      
      .icon-tilt:hover {
        animation: tilt 0.3s ease-out forwards;
      }
    `;

    const itemsWagon = (
        <div
            className="inline-flex overflow-hidden"
            style={{
                gap: `${gap}px`,
                animation: `slide ${speed}s linear infinite`,
                animationPlayState: isHovered ? 'paused' : 'running',
            }}
        >
            {items.map((item, index) => (
                <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 p-1 icon-tilt transition-all duration-300 opacity-80 hover:opacity-100"
                >
                    <Image
                        src={item.icon}
                        alt={item.title}
                        width={56}
                        height={56}
                        className="w-full h-full"
                        draggable="false"
                        onContextMenu={(e) => e.preventDefault()}
                    />
                </a>
            ))}
        </div>
    );

    return (
        <div
            className="w-full overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <style>{slideAnimation}</style>
            <div className="inline-flex whitespace-nowrap gap-8">
                {itemsWagon}
                {itemsWagon}
                {itemsWagon}
                {itemsWagon}
            </div>
        </div>
    );
};