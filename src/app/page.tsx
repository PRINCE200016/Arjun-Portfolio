'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { ExperienceProvider, useExperience } from '@/hooks/useExperience';
import { I18nProvider } from '@/hooks/useI18n';
import { SoundProvider, useSound } from '@/hooks/useSound';
import { useLenis } from '@/components/ui/LenisProvider';

import LoadingScreen from '@/components/ui/LoadingScreen';
import EntryScreen from '@/components/ui/EntryScreen';
import CustomCursor from '@/components/ui/CustomCursor';
import Navigation from '@/components/ui/Navigation';
import Chatbot from '@/components/Chatbot';

import HomeStation from '@/components/sections/HomeStation';
import AboutStation from '@/components/sections/AboutStation';
import SkillsStation from '@/components/sections/SkillsStation';
import ExperienceStation from '@/components/sections/ExperienceStation';
import ProjectsStation from '@/components/sections/ProjectsStation';
import ContactStation from '@/components/sections/ContactStation';

// Dynamically import WorldScene with SSR disabled for Three.js / WebGL compatibility
const WorldScene = dynamic(() => import('@/components/three/WorldScene'), {
  ssr: false,
  loading: () => null,
});

const sectionIds = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];

/* ─── Procedural Audio Synthesizer (Zero asset dependencies) ─── */
function useProceduralAudio() {
  const { enabled } = useSound();
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
  }, []);

  const playChime = useCallback((freq = 520, duration = 0.25) => {
    if (!enabled) return;
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }, [enabled, initAudio]);

  return { playChime, initAudio };
}

/* ─── Main Portfolio Content ─── */
function PortfolioApp() {
  const { loaded, setLoaded, entered, setEntered, activeSection, setActiveSection } = useExperience();
  const [loadProgress, setLoadProgress] = useState(0);
  const { playChime, initAudio } = useProceduralAudio();

  // Simulated asset and shader compilation loading
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 22 + 8;
      if (current >= 100) {
        current = 100;
        setLoadProgress(100);
        clearInterval(interval);
      } else {
        setLoadProgress(Math.floor(current));
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setLoaded(true);
  }, [setLoaded]);

  const handleEnter = useCallback(() => {
    initAudio();
    playChime(440, 0.4);
    setEntered(true);
  }, [initAudio, playChime, setEntered]);

  // Smooth navigation to station via Lenis
  const { lenis } = useLenis();
  const handleNavigate = useCallback((index: number) => {
    setActiveSection(index);
    playChime(300 + index * 80, 0.2);
    const id = sectionIds[index];
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 1.1 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [setActiveSection, playChime, lenis]);

  // IntersectionObserver to sync navigation bar with current station in view
  useEffect(() => {
    if (!entered) return;

    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveSection(index);
            }
          });
        },
        { threshold: [0.3, 0.6] }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [entered, setActiveSection]);

  return (
    <div className="relative min-h-screen bg-[#07090C] text-[#F2F5F4] overflow-x-hidden selection:bg-[#19C3B1]/20 selection:text-[#8BE9DF]">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Cinematic Overlays */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Three.js World Background */}
      <WorldScene className={entered ? 'canvas-clear' : 'canvas-blurred'} />

      {/* Loading Sequence */}
      {!loaded && (
        <LoadingScreen progress={loadProgress} onComplete={handleLoadingComplete} />
      )}

      {/* Entry Sequence */}
      {loaded && !entered && (
        <EntryScreen visible={!entered} onEnter={handleEnter} />
      )}

      {/* Persistent System Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        visible={entered}
      />

      {/* Main Experience Stations */}
      <main
        className={`scroll-container relative z-10 transition-opacity duration-1000 ${
          entered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <HomeStation />
        <AboutStation />
        <SkillsStation />
        <ExperienceStation />
        <ProjectsStation />
        <ContactStation />

        {/* Minimal Footer */}
        <footer className="py-12 border-t border-[#1E2A33]/80 relative z-10 text-center font-mono text-xs text-[#849096]">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[#19C3B1]">ARJUN RAJAWAT</span> • FULL STACK ARCHITECT
            </div>
            <div className="text-[11px] opacity-75">
              THE DEVELOPER SYSTEM • {new Date().getFullYear()}
            </div>
            <div className="flex items-center gap-4 text-xs">
              <a
                href="https://github.com/PRINCE200016"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#19C3B1] transition-colors"
              >
                GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/arjunrajawat16"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#19C3B1] transition-colors"
              >
                LINKEDIN
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Embedded Intelligent Chatbot */}
      {entered && <Chatbot />}
    </div>
  );
}

/* ─── Root Page Export with Context Providers ─── */
export default function Page() {
  return (
    <ExperienceProvider>
      <I18nProvider>
        <SoundProvider>
          <PortfolioApp />
        </SoundProvider>
      </I18nProvider>
    </ExperienceProvider>
  );
}
