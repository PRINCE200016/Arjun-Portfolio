'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { Code2, Globe, Cpu, GitBranch, Database, Cloud } from 'lucide-react';

const serviceIcons = [Code2, Globe, Cpu, GitBranch, Database, Cloud];

export default function SkillsStation() {
  const { t } = useI18n();

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 sm:py-32 flex items-center justify-center px-4 sm:px-8 lg:px-16"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Services */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.3em] text-white font-normal uppercase inline-block border-b border-white/20 pb-2">
                {t.skills.heading}
              </h2>
            </div>

            <p className="font-serif text-sm sm:text-base leading-relaxed text-white/70 italic max-w-2xl">
              &ldquo;{t.skills.intro}&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
              {t.skills.services.map((srv, idx) => {
                const Icon = serviceIcons[idx];
                return (
                  <div
                    key={idx}
                    className="p-5 rounded-lg bg-[#0e0e11]/80 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-white/5 border border-white/10 group-hover:border-white/40 text-white/80 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm tracking-wider text-white mb-2 leading-snug">
                      {srv.title}
                    </h3>
                    <p className="font-mono text-[11px] text-white/50 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: 3D placeholder */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center min-h-[450px]">
            <div className="text-center opacity-30 font-mono text-[10px] tracking-[0.3em] uppercase mt-auto">
              {t.skills.logicLabel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
