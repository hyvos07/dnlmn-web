'use client';

import { useEffect, useRef } from 'react';
import ExperienceItem from './ExperienceItem';
import styles from './Timeline.module.css';

export default function Timeline({ experiences }: { experiences: Experience[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const rows = Array.from(timeline.querySelectorAll<HTMLElement>('[data-experience-row]'));
    const connectors = Array.from(timeline.querySelectorAll<HTMLElement>('[data-connector]'));
    const track = timeline.querySelector<HTMLElement>('[data-track]');
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const bounds = rows.map((row) => row.getBoundingClientRect());
      const progressPoint = window.innerHeight * 0.75;
      const revealPoint = window.innerHeight * 0.85;
      const progress = (start: number, end: number) =>
        end > start ? Math.min(1, Math.max(0, (progressPoint - start) / (end - start))) : 0;

      rows.forEach((row, index) => {
        const center = bounds[index].top + bounds[index].height / 2;
        row.dataset.reached = String(center <= progressPoint);

        // Reveal once, using the stationary row so the animation cannot affect its trigger.
        if (bounds[index].top <= revealPoint) {
          row.dataset.visible = 'true';
        }
      });

      if (track && bounds.length > 1) {
        const start = bounds[0].top + bounds[0].height / 2;
        const last = bounds[bounds.length - 1];
        const end = last.top + last.height / 2;
        track.style.top = `${start - timeline.getBoundingClientRect().top}px`;
        track.style.height = `${end - start}px`;
        track.style.setProperty('--progress', String(progress(start, end)));
      }

      connectors.forEach((connector) => {
        const { top, bottom } = connector.getBoundingClientRect();
        connector.style.setProperty('--progress', String(progress(top, bottom)));
      });

      // Keep the server-rendered content visible until scroll behavior is ready.
      timeline.dataset.animated = 'true';
    };

    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(timeline);
    rows.forEach((row) => resizeObserver.observe(row));
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      delete timeline.dataset.animated;
    };
  }, [experiences]);

  return (
    <div ref={timelineRef} className={`${styles.timeline} mx-auto relative`}>
      {experiences.length > 1 && (
        <div
          data-track
          aria-hidden="true"
          className={`${styles.track} hidden md:block absolute left-0 xl:left-1/2 xl:-translate-x-1/2 w-1`}
        >
          <div className={styles.progress} />
        </div>
      )}

      {experiences.map((exp, index) => (
        <div key={index} className="relative">
          {/* Line for sm and below screens */}
          {index > 0 && (
            <div
              data-connector
              aria-hidden="true"
              className={`${styles.track} md:hidden mx-auto w-1 h-8 relative`}
            >
              <div className={styles.progress} />
            </div>
          )}

          <div data-experience-row className={`relative xl:grid xl:grid-cols-2 md:flex md:flex-row flex items-center
                            ${index % 2 === 0 ? '' : 'xl:flex-row-reverse'} 
                            md:justify-end max-md:justify-center md:mb-10`
          }>

            <div
              aria-hidden="true"
              className={`${styles.marker} hidden md:block absolute left-0 xl:left-1/2 top-1/2 w-4 h-4 rounded-full ml-0.5 xl:ml-0 -translate-x-1/2 -translate-y-1/2 z-10`}
            />

            <div className={`${styles.card}
                            ${index % 2 === 0 ? 'xl:col-start-1 xl:pl-12' : 'xl:col-start-2 xl:pl-12'} 
                            md:w-[90%] md:max-w-xl xl:max-w-none max-md:w-full
                        `}>
              <ExperienceItem exp={exp} index={index} />
            </div>

            {/* Spacing for grid */}
            <div className="xl:block hidden" />
          </div>
        </div>
      ))}
    </div>
  );
}
