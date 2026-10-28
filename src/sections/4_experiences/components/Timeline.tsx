'use client';

import { useEffect, useRef } from 'react';
import ExperienceItem from './ExperienceItem';
import styles from './Timeline.module.css';

const SMOOTHING_MS = 100;

export default function Timeline({ experiences }: { experiences: Experience[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const rows = Array.from(timeline.querySelectorAll<HTMLElement>('[data-experience-row]'));
    const connectors = Array.from(timeline.querySelectorAll<HTMLElement>('[data-connector]'));
    const track = timeline.querySelector<HTMLElement>('[data-track]');
    if (rows.length === 0) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rowBounds: { top: number; center: number }[] = [];
    const connectorStates = connectors.map((element) => ({ element, top: 0, bottom: 0, value: 0 }));
    let frame: number | null = null;
    let lastTime: number | null = null;
    let needsMeasurement = true;
    let displayedPoint = 0;

    const progress = (point: number, start: number, end: number) =>
      end > start ? Math.min(1, Math.max(0, (point - start) / (end - start))) : 0;

    const measure = () => {
      const scrollY = window.scrollY;
      const timelineTop = timeline.getBoundingClientRect().top + scrollY;
      rowBounds = rows.map((row) => {
        const bounds = row.getBoundingClientRect();
        return { top: bounds.top + scrollY, center: bounds.top + scrollY + bounds.height / 2 };
      });
      connectorStates.forEach((connector) => {
        const bounds = connector.element.getBoundingClientRect();
        connector.top = bounds.top + scrollY;
        connector.bottom = bounds.bottom + scrollY;
      });

      if (track && rowBounds.length > 1) {
        const start = rowBounds[0].center;
        const end = rowBounds[rowBounds.length - 1].center;
        track.style.top = `${start - timelineTop}px`;
        track.style.height = `${end - start}px`;
      }
    };

    const update = (time: number) => {
      frame = null;
      const measured = needsMeasurement;
      if (measured) {
        measure();
        needsMeasurement = false;
      }

      const progressPoint = window.scrollY + window.innerHeight * 0.75;
      const revealPoint = window.scrollY + window.innerHeight * 0.85;
      const start = rowBounds[0].center;
      const end = rowBounds[rowBounds.length - 1].center;
      // Clamp offscreen travel so scrolling elsewhere does not keep this animation running.
      const targetPoint = Math.min(end + 1, Math.max(start - 1, progressPoint));
      const elapsed = lastTime === null ? 1000 / 60 : Math.min(64, time - lastTime);
      const blend = 1 - Math.exp(-elapsed / SMOOTHING_MS);
      const snap = measured || reducedMotion.matches;

      displayedPoint = snap ? targetPoint : displayedPoint + (targetPoint - displayedPoint) * blend;
      if (Math.abs(targetPoint - displayedPoint) < 0.25) displayedPoint = targetPoint;
      let animating = displayedPoint !== targetPoint;

      rows.forEach((row, index) => {
        const reached = String(rowBounds[index].center <= displayedPoint);
        if (row.dataset.reached !== reached) row.dataset.reached = reached;

        // Reveal once, using the stationary row so the animation cannot affect its trigger.
        if (row.dataset.visible !== 'true' && rowBounds[index].top <= revealPoint) {
          row.dataset.visible = 'true';
        }
      });

      if (track) {
        track.style.setProperty('--progress', String(progress(displayedPoint, start, end)));
      }

      connectorStates.forEach((connector) => {
        const target = progress(progressPoint, connector.top, connector.bottom);
        // Smooth each short mobile connector too, even when one wheel step crosses it entirely.
        connector.value = snap ? target : connector.value + (target - connector.value) * blend;
        if (Math.abs(target - connector.value) < 0.001) connector.value = target;
        if (connector.value !== target) animating = true;
        connector.element.style.setProperty('--progress', String(connector.value));
      });

      // Keep the server-rendered content visible until scroll behavior is ready.
      timeline.dataset.animated = 'true';

      if (animating) {
        lastTime = time;
        frame = window.requestAnimationFrame(update);
      } else {
        lastTime = null;
      }
    };

    const scheduleUpdate = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    const invalidateMeasurements = () => {
      needsMeasurement = true;
      scheduleUpdate();
    };

    update(performance.now());
    const resizeObserver = new ResizeObserver(invalidateMeasurements);
    resizeObserver.observe(timeline);
    rows.forEach((row) => resizeObserver.observe(row));
    // Content loading above the timeline can move it without changing its own height.
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', invalidateMeasurements);
    reducedMotion.addEventListener('change', scheduleUpdate);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', invalidateMeasurements);
      reducedMotion.removeEventListener('change', scheduleUpdate);
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
