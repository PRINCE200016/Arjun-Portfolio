'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';
import { journeyData } from '@/data/portfolioData';

export default function ExperienceStation() {
  const { t } = useI18n();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const journeyItems = (t.about.journey || []).map((item, idx) => {
    const raw = journeyData[idx] || {};
    return {
      ...raw,
      ...item,
    };
  });

  return (
    <section
      id="experience"
      className="section-panel relative"
      style={{ minHeight: '100vh' }}
      aria-label="Experience"
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        <span className="bg-text select-none uppercase" aria-hidden="true">
          {t.experience.bgText || t.experience.heading}
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.p
            variants={itemVariants}
            className="font-mono text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: 'var(--ds-primary)' }}
          >
            {t.experience.station}
          </motion.p>

          <motion.div variants={itemVariants} className="accent-line" />

          <motion.h2
            variants={itemVariants}
            className="font-headline text-3xl md:text-4xl font-bold mb-12"
            style={{ color: 'var(--ds-text)' }}
          >
            {t.experience.heading}
          </motion.h2>

          {/* Timeline */}
          <div className="relative pl-8 md:pl-12">
            <div className="timeline-line" />

            {journeyItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative mb-12 last:mb-0"
              >
                {/* Node dot */}
                <div
                  className="timeline-node"
                  style={{
                    top: '6px',
                    background: item.type === 'Work' || item.type === 'कार्य' || item.type === 'Travail' || item.type === 'Trabajo' || item.type === 'Beruf' || item.type === '実務経験'
                      ? 'var(--ds-primary)'
                      : 'var(--ds-primary-light)',
                    boxShadow: '0 0 12px rgba(25,195,177,0.5)',
                  }}
                />

                {/* Card */}
                <div className="glass-panel p-5 md:p-6 ml-4 md:ml-6">
                  {/* Type badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="tag-pill">
                      {item.type}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-[0.1em]"
                      style={{ color: 'var(--ds-muted)' }}
                    >
                      {item.year}
                    </span>
                  </div>

                  <h3
                    className="font-headline text-lg font-semibold mb-1"
                    style={{ color: 'var(--ds-text)' }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="font-mono text-xs tracking-[0.05em] mb-3"
                    style={{ color: 'var(--ds-primary)' }}
                  >
                    {item.institution}
                  </p>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--ds-muted)' }}
                  >
                    {item.details}
                  </p>

                  {/* Certificate link */}
                  {item.certificate && (
                    <a
                      href={item.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ds-btn mt-4 text-[10px] inline-block"
                      style={{ padding: '0.4rem 0.8rem' }}
                    >
                      {t.about.verifiedCertificate || 'CERTIFICATE'}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
