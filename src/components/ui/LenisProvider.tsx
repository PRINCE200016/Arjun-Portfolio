'use client';

/**
 * LenisProvider
 * ─────────────
 * Rock-solid smooth scroll provider for the entire website.
 * • Pure requestAnimationFrame driver for 100% frame synchronization.
 * • Official lenis.css integration to prevent any native CSS smooth scroll collision.
 * • React Context with live instance state so useLenis() works anywhere.
 */

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type LenisContextValue = {
  lenis: Lenis | null;
};

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Instantiate Lenis with silky-smooth inertia
    const lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // Let mobile touch scroll naturally with native 120Hz physics
      touchMultiplier: 1.5,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    setLenis(lenisInstance);

    // Sync Lenis with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Direct, jitter-free requestAnimationFrame loop
    let rafId: number;
    let isMounted = true;

    function raf(time: number) {
      if (!isMounted) return;
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  );
}
