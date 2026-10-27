'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import styles from '@/styles/ScrollReveal.module.css';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className = '', id }: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) return;

    const items = Array.from(container.querySelectorAll<HTMLElement>('[data-reveal-item]'));
    let observer: IntersectionObserver;

    const observeItems = () => {
      observer?.disconnect();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = 'true';
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: `0px 0px -${window.innerHeight * 0.15}px 0px`, threshold: 0 });

      items.forEach((item) => {
        if (item.dataset.visible === 'true') return;

        // Measure the stationary wrapper, so the animation cannot move its trigger.
        // Items above the reveal point also stay visible on anchor navigation.
        if (item.getBoundingClientRect().top <= window.innerHeight * 0.85) {
          item.dataset.visible = 'true';
        } else {
          observer.observe(item);
        }
      });
    };

    observeItems();

    const revealFocusedItem = (event: FocusEvent) => {
      const item = (event.target as HTMLElement).closest<HTMLElement>('[data-reveal-item]');
      if (item) {
        item.dataset.visible = 'true';
        observer.unobserve(item);
      }
    };

    // Enable hiding only after observation is ready; server-rendered content stays readable.
    container.dataset.animated = 'true';
    container.addEventListener('focusin', revealFocusedItem);
    window.addEventListener('resize', observeItems);

    return () => {
      observer.disconnect();
      container.removeEventListener('focusin', revealFocusedItem);
      window.removeEventListener('resize', observeItems);
      delete container.dataset.animated;
    };
  }, []);

  return (
    <div ref={containerRef} id={id} className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
}

export function RevealItem({ children, className = '', contentClassName = '', delay = 120 }: RevealItemProps) {
  return (
    <div
      data-reveal-item
      className={`${styles.item} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      <div className={`${styles.content} ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
