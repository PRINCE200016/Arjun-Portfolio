'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n, availableLanguages } from '@/hooks/useI18n';
import { useSound } from '@/hooks/useSound';

interface NavigationProps {
  activeSection: number;
  onNavigate: (index: number) => void;
  visible: boolean;
}

const sectionKeys = ['home', 'about', 'skills', 'experience', 'projects', 'contact'] as const;

export default function Navigation({ activeSection, onNavigate, visible }: NavigationProps) {
  const { t, lang, setLang } = useI18n();
  const { enabled: soundEnabled, toggle: toggleSound } = useSound();
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (!visible) return null;

  const currentLangOption = availableLanguages.find(l => l.code === lang);

  return (
    <>
      {/* Top Navigation Bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-10 py-5 pointer-events-auto"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left: Audio EQ Bars */}
        <button
          onClick={toggleSound}
          className="flex items-center gap-3 group focus:outline-none"
          aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
        >
          <div className="eq-bars">
            {[...Array(6)].map((_, i) => (
              <span key={i} className={`eq-bar ${soundEnabled ? 'active' : ''}`} />
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white transition-colors hidden sm:inline">
            {soundEnabled ? t.entry.soundOn : t.entry.soundOff}
          </span>
        </button>

        {/* Right: Language + Hamburger */}
        <div className="flex items-center gap-6">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="font-mono text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded border border-white/10 hover:border-white/30 transition-all bg-black/40 backdrop-blur-md"
            >
              <span>{currentLangOption?.flag}</span>
              <span>{currentLangOption?.code.toUpperCase()}</span>
              <span className="text-[9px] text-white/50">▼</span>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-40 bg-[#0a0a0c]/95 border border-white/15 rounded-md shadow-2xl py-1 backdrop-blur-xl z-50"
                >
                  {availableLanguages.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => { setLang(opt.code); setLangOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-xs font-mono tracking-wider transition-colors flex items-center gap-2 ${
                        lang === opt.code ? 'text-white bg-white/10 font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{opt.flag}</span>
                      <span>{opt.nativeName}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-end gap-1.5 w-8 h-8 group focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className={`h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
            <span className={`h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'w-4 group-hover:w-6'}`} />
            <span className={`h-[1px] bg-white transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5 group-hover:w-6'}`} />
          </button>
        </div>
      </motion.header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex items-center justify-center pointer-events-auto"
          >
            <div className="flex flex-col items-center gap-7">
              {sectionKeys.map((key, index) => (
                <button
                  key={key}
                  onClick={() => { onNavigate(index); setMenuOpen(false); }}
                  className={`font-serif text-2xl sm:text-4xl tracking-[0.3em] uppercase transition-all duration-300 ${
                    activeSection === index
                      ? 'text-white scale-110 drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                      : 'text-white/40 hover:text-white hover:scale-105'
                  }`}
                >
                  {t.nav[key]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Vertical Dot Nav */}
      <motion.ul
        className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4 pointer-events-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        aria-label="Section dots"
      >
        {sectionKeys.map((key, index) => {
          const isActive = activeSection === index;
          return (
            <li key={key} className="relative group">
              <button
                onClick={() => onNavigate(index)}
                className="w-5 h-5 flex items-center justify-center focus:outline-none"
                aria-label={`Jump to ${t.nav[key]}`}
              >
                <span
                  className={`block rounded-full transition-all duration-400 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-white shadow-[0_0_12px_#ffffff]'
                      : 'w-1.5 h-1.5 bg-white/25 group-hover:bg-white/60 group-hover:scale-125'
                  }`}
                />
              </button>
              <span className="absolute right-7 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-black/80 border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {t.nav[key]}
              </span>
            </li>
          );
        })}
      </motion.ul>

      {/* Left Edge Badge */}
      <div className="awwwards-ribbon hidden lg:block">
        <a
          href="https://github.com/PRINCE200016"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-4 px-2 rounded-r-lg bg-[#121212]/90 border border-l-0 border-white/15 text-white shadow-xl hover:bg-[#1a1a1a] transition-colors"
        >
          <span className="font-serif text-[11px] font-bold tracking-widest rotate-90 my-3 text-white/90">
            {t.nav.engineerBadge || 'ENGINEER'}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#19C3B1] animate-pulse" />
        </a>
      </div>
    </>
  );
}
