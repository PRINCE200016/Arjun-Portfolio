'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n, availableLanguages, type Lang } from '@/hooks/useI18n';
import { useSound } from '@/hooks/useSound';

interface EntryScreenProps {
  visible: boolean;
  onEnter: () => void;
}

export default function EntryScreen({ visible, onEnter }: EntryScreenProps) {
  const { t, lang, setLang } = useI18n();
  const { enabled: soundEnabled, toggle: toggleSound } = useSound();
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Lang>(lang);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('arjun-lang');
      if (!saved) {
        setShowLangPicker(true);
      }
    }
  }, []);

  const handleLangSelect = (code: Lang) => {
    setSelectedLang(code);
    setLang(code);
  };

  const handleLangConfirm = () => {
    if (selectedLang) {
      setLang(selectedLang);
      setShowLangPicker(false);
    }
  };

  const handleStart = () => {
    onEnter();
  };

  const soundLabel = soundEnabled ? t.entry.soundOn : t.entry.soundOff;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-auto bg-transparent select-none"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* ──── Language Picker Overlay ──── */}
          <AnimatePresence>
            {showLangPicker && (
              <motion.div
                key="lang-picker"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
                style={{
                  background: 'rgba(0,0,0,0.85)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.5 }}
                  className="flex flex-col items-center gap-6 px-6 max-w-sm w-full"
                >
                  {/* Globe icon + heading */}
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl">🌐</span>
                    <h2 className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-white/90 uppercase text-center">
                      {t.entry.chooseLang}
                    </h2>
                    <p className="font-mono text-[11px] tracking-widest text-white/50 uppercase text-center">
                      {t.entry.selectLang}
                    </p>
                  </div>

                  {/* Language grid */}
                  <div className="grid grid-cols-2 gap-3 w-full">
                    {availableLanguages.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => handleLangSelect(opt.code)}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                          lang === opt.code
                            ? 'border-[#19C3B1] bg-[#19C3B1]/10 shadow-[0_0_20px_rgba(25,195,177,0.25)]'
                            : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xl">{opt.flag}</span>
                        <div className="flex flex-col">
                          <span className="font-sans text-sm text-white/90 leading-tight">{opt.nativeName}</span>
                          <span className="font-mono text-[10px] text-white/40 leading-tight">{opt.name}</span>
                        </div>
                        {lang === opt.code && (
                          <span className="ml-auto text-[#19C3B1] text-lg">✓</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Confirm */}
                  <button
                    onClick={handleLangConfirm}
                    className="w-full py-3 rounded-xl font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 bg-[#19C3B1]/20 border border-[#19C3B1]/60 text-[#19C3B1] hover:bg-[#19C3B1]/30 cursor-pointer"
                  >
                    {t.entry.continue}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ──── Sound Toggle ──── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 sm:mb-12"
          >
            <button
              onClick={toggleSound}
              className="sound-circle-btn group cursor-pointer focus:outline-none"
              aria-label="Toggle sound"
            >
              <div className="sound-ring">
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${soundEnabled ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-white/60'}`} />
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 group-hover:text-white transition-colors uppercase">
                {soundLabel}
              </span>
            </button>
          </motion.div>

          {/* ──── Central Hero Block ──── */}
          <div className="flex flex-col items-center text-center px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.4 }}
              className="relative"
            >
              <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl tracking-[0.35em] text-white font-normal uppercase leading-tight">
                ARJUN<br />
                RAJAWAT
              </h1>

              {/* Binary matrix decoration */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-12 hidden sm:flex flex-col text-[10px] font-mono text-white/20 select-none text-left tracking-widest leading-relaxed pointer-events-none">
                <span className="text-[#19C3B1]/40">01100</span>
                <span>10110</span>
                <span className="text-white/40">11110</span>
              </div>
            </motion.div>

            {/* Role subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="font-serif text-xs sm:text-sm tracking-[0.35em] text-white/60 uppercase mt-4 sm:mt-6 mb-10"
            >
              | {t.entry.role} |
            </motion.p>

            {/* Language change link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mb-6"
            >
              <button
                onClick={() => setShowLangPicker(true)}
                className="font-mono text-[10px] tracking-[0.25em] text-white/40 hover:text-white/90 transition-colors uppercase flex items-center gap-1.5 cursor-pointer"
              >
                🌐 {availableLanguages.find(l => l.code === lang)?.nativeName ?? 'English'}
                <span className="text-white/30">· {t.entry.change}</span>
              </button>
            </motion.div>

            {/* Enter button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <button
                onClick={handleStart}
                className="frosted-pill-btn group cursor-pointer focus:outline-none"
              >
                <span>{t.entry.enter}</span>
              </button>
            </motion.div>
          </div>

          {/* ──── Privacy Banner ──── */}
          <AnimatePresence>
            {!cookieAccepted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="privacy-bar"
              >
                <p className="font-mono text-[11px] text-white/60 text-center tracking-wider">
                  {t.privacy.message}{' '}
                  <span className="underline text-white cursor-pointer">{t.privacy.policy}</span>.
                </p>
                <button
                  onClick={() => setCookieAccepted(true)}
                  className="font-mono text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {t.privacy.accept}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
