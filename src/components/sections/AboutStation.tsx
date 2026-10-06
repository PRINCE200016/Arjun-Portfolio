'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { journeyData, skillCategories } from '@/data/portfolioData';
import { GraduationCap, Wrench, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

export default function AboutStation() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<'education' | 'skills'>('education');
  const [expandedId, setExpandedId] = useState<string | null>('d-table-experience');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const journeyItems = (t.about.journey || []).map((item, idx) => {
    const raw = journeyData[idx] || {};
    return {
      ...raw,
      ...item,
    };
  });

  const skillCats = (t.about.skillCategories || []).map((cat, idx) => {
    const raw = skillCategories[idx] || {};
    return {
      ...raw,
      ...cat,
    };
  });

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 sm:py-32 flex items-center justify-center px-4 sm:px-8 lg:px-16"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: 3D placeholder */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center min-h-[450px]">
            <div className="text-center opacity-30 font-mono text-[10px] tracking-[0.3em] uppercase mt-auto">
              {t.about.intellectLabel}
            </div>
          </div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-[0.3em] text-white font-normal uppercase inline-block border-b border-white/20 pb-2">
                {t.about.heading}
              </h2>
            </div>

            <p className="font-serif text-sm sm:text-base leading-relaxed text-white/70 italic max-w-2xl">
              &ldquo;{t.about.bio}&rdquo;
            </p>

            {/* Tabs */}
            <div className="flex items-center gap-8 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2 font-serif text-sm sm:text-base tracking-[0.2em] uppercase transition-all pb-2 -mb-3 border-b-2 ${
                  activeTab === 'education'
                    ? 'border-white text-white font-bold'
                    : 'border-transparent text-white/40 hover:text-white/80'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                {t.about.tabTimeline}
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`flex items-center gap-2 font-serif text-sm sm:text-base tracking-[0.2em] uppercase transition-all pb-2 -mb-3 border-b-2 ${
                  activeTab === 'skills'
                    ? 'border-white text-white font-bold'
                    : 'border-transparent text-white/40 hover:text-white/80'
                }`}
              >
                <Wrench className="w-4 h-4" />
                {t.about.tabSkills}
              </button>
            </div>

            {/* Tab 1: Timeline */}
            {activeTab === 'education' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-5"
              >
                {journeyItems.map((item) => {
                  const isExpanded = expandedId === item.id;
                  return (
                    <div
                      key={item.id}
                      className="border-b border-white/5 pb-4 hover:border-white/15 transition-colors"
                    >
                      <div
                        onClick={() => toggleExpand(item.id)}
                        className="flex items-start justify-between cursor-pointer group"
                      >
                        <div>
                          <span className="font-mono text-xs text-[#19C3B1] tracking-widest block mb-0.5">
                            {item.year}
                          </span>
                          <h3 className="font-serif text-base sm:text-lg text-white group-hover:text-[#8BE9DF] transition-colors">
                            {item.institution} — {item.title}
                          </h3>
                        </div>
                        <button className="text-white/40 group-hover:text-white p-1" aria-label="Toggle details">
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </div>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3 pl-2 border-l border-white/20 text-xs sm:text-sm text-white/60 font-mono space-y-2"
                        >
                          <p>{item.details}</p>
                          {item.tags && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.tags.map((tag: string) => (
                                <span key={tag} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-white/70">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          {item.certificate && (
                            <a
                              href={item.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-[#19C3B1] hover:underline pt-1"
                            >
                              {t.about.verifiedCertificate} <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            )}

            {/* Tab 2: Skills Grid */}
            {activeTab === 'skills' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {skillCats.map((cat) => (
                  <div
                    key={cat.title}
                    className="p-4 rounded-lg bg-black/40 border border-white/10 hover:border-white/25 transition-all"
                  >
                    <h4 className="font-serif text-xs tracking-widest text-[#8BE9DF] uppercase mb-2">
                      {cat.title}
                    </h4>
                    <p className="font-mono text-[10px] text-white/50 mb-3 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills?.map((skill: string) => (
                        <span
                          key={skill}
                          className="px-2 py-1 rounded bg-white/5 text-[11px] font-mono text-white/80 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
