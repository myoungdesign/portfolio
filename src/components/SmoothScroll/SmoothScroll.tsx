'use client';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useEffect } from 'react';

/**
 * Wraps the app in a Lenis smooth-scroll instance and snaps the viewport to
 * whole-page increments (every 100vh) so the Hero → next-section transition
 * lands cleanly.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      // Heavier feel — slower, more "purposeful" easing (jonprinzdesigns-ish).
      duration: 1.4,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential out
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Snap to nearest viewport-height boundary after the user finishes scrolling.
    let snapTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleScroll = () => {
      if (snapTimeout) clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        const vh = window.innerHeight;
        const current = window.scrollY;
        const target = Math.round(current / vh) * vh;
        if (Math.abs(target - current) > 2) {
          lenis.scrollTo(target, { duration: 1.2 });
        }
      }, 140);
    };
    lenis.on('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(rafId);
      if (snapTimeout) clearTimeout(snapTimeout);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
