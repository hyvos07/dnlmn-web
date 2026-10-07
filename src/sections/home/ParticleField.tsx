'use client';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/components/motion/useReducedMotion';

interface ParticleFieldProps {
  /** 0 → 1 as the hero scrolls away; points converge toward the bottom edge */
  exitRef?: React.RefObject<number>;
  /** Fade the canvas in once the hero reveal has played */
  visible: boolean;
}

const ACCENT_SHARE = 0.06;

/**
 * Pointer-reactive dot field behind the hero. Plain Canvas 2D (no Three.js).
 * Desktop: pointer pushes points away with spring-back. Touch: reacts to scroll velocity.
 * Pauses offscreen / when the tab is hidden; reduced motion renders one static frame.
 */
export default function ParticleField({ exitRef, visible }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    // Struct-of-arrays keeps the hot loop cheap
    let count = 0;
    let homeX = new Float32Array(0);
    let homeY = new Float32Array(0);
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let vx = new Float32Array(0);
    let vy = new Float32Array(0);
    let phase = new Float32Array(0);
    let accent = new Uint8Array(0);

    const seed = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      count = width < 768 ? 600 : Math.min(2400, Math.round((width * height) / 650));
      homeX = new Float32Array(count);
      homeY = new Float32Array(count);
      x = new Float32Array(count);
      y = new Float32Array(count);
      vx = new Float32Array(count);
      vy = new Float32Array(count);
      phase = new Float32Array(count);
      accent = new Uint8Array(count);

      // Jittered grid so the field looks even without clumping
      const cols = Math.ceil(Math.sqrt((count * width) / height));
      const rows = Math.ceil(count / cols);
      for (let i = 0; i < count; i++) {
        const cx = (i % cols) + Math.random() * 0.9;
        const cy = Math.floor(i / cols) + Math.random() * 0.9;
        homeX[i] = x[i] = (cx / cols) * width;
        homeY[i] = y[i] = (cy / rows) * height;
        phase[i] = Math.random() * Math.PI * 2;
        accent[i] = Math.random() < ACCENT_SHARE ? 1 : 0;
      }
    };

    let fg = '#F2F0E6';
    let accentColor = '#5B8CFF';
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      fg = cs.getPropertyValue('--fg').trim() || fg;
      accentColor = cs.getPropertyValue('--accent').trim() || accentColor;
    };

    const pointer = { x: -9999, y: -9999, active: false };
    let scrollKick = 0;
    let lastScrollY = window.scrollY;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const exit = exitRef?.current ?? 0;

      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass === 0 ? fg : accentColor;
        ctx.globalAlpha = pass === 0 ? 0.32 : 0.85;
        for (let i = 0; i < count; i++) {
          if (accent[i] !== pass) continue;
          const size = pass === 0 ? 1.4 : 1.9;
          ctx.fillRect(x[i], y[i] + (height - y[i]) * exit * exit, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const step = (time: number) => {
      const t = time / 1000;
      const radius = 120;
      const r2 = radius * radius;
      for (let i = 0; i < count; i++) {
        // Slow drift around the home position
        const tx = homeX[i] + Math.sin(t * 0.35 + phase[i]) * 6;
        const ty = homeY[i] + Math.cos(t * 0.3 + phase[i]) * 6 + scrollKick * Math.sin(phase[i]);
        let ax = (tx - x[i]) * 0.02;
        let ay = (ty - y[i]) * 0.02;

        if (pointer.active) {
          const dx = x[i] - pointer.x;
          const dy = y[i] - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.01) {
            const force = (1 - d2 / r2) * 2.4;
            const d = Math.sqrt(d2);
            ax += (dx / d) * force;
            ay += (dy / d) * force;
          }
        }

        vx[i] = (vx[i] + ax) * 0.86;
        vy[i] = (vy[i] + ay) * 0.86;
        x[i] += vx[i];
        y[i] += vy[i];
      }
      scrollKick *= 0.92;
    };

    seed();
    readColors();

    if (reducedMotion) {
      draw();
      const onResize = () => {
        seed();
        draw();
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    let raf = 0;
    let running = false;
    let onScreen = true;
    let frame = 0;

    const loop = (time: number) => {
      step(time);
      // Pick up accent changes a few times a second, not every frame
      if (frame++ % 15 === 0) readColors();
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || !onScreen || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onScroll = () => {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      if (coarse) scrollKick = Math.max(-40, Math.min(40, scrollKick + dy * 0.6));
    };
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(seed, 150);
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    start();

    return () => {
      stop();
      io.disconnect();
      window.clearTimeout(resizeTimer);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [reducedMotion, exitRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full transition-opacity duration-[1200ms] ease-out motion-reduce:duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
