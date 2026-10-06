'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { useSound } from '@/hooks/useSound';

export default function HomeStation() {
  const { t } = useI18n();
  const { enabled: soundEnabled, toggle: toggleSound } = useSound();

  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 select-none overflow-hidden"
    >
      {/* Sound toggle */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <button
          onClick={toggleSound}
          className="sound-circle-btn group cursor-pointer focus:outline-none"
        >
          <div className="sound-ring">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors ${soundEnabled ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-white/60'}`} />
          </div>
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 group-hover:text-white transition-colors uppercase">
            {soundEnabled ? t.entry.soundOn : t.entry.soundOff}
          </span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl tracking-[0.35em] text-white font-normal uppercase leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
          ARJUN RAJAWAT
        </h1>

        <p className="font-serif text-xs sm:text-sm tracking-[0.35em] text-white/60 uppercase mt-4 sm:mt-6 mb-10">
          | {t.entry.role} |
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleScrollToContact}
            className="frosted-pill-btn group cursor-pointer focus:outline-none"
          >
            <span>{t.contact.heading}</span>
          </button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1 h-2 bg-white/70 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
