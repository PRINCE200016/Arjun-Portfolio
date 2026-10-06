'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

interface LoadingScreenProps {
  progress: number;
  onComplete: () => void;
}

export default function LoadingScreen({ progress, onComplete }: LoadingScreenProps) {
  const { t } = useI18n();
  const [statusIndex, setStatusIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const hasCompletedRef = useRef(false);

  const statuses = t.loading.status;

  useEffect(() => {
    const idx = Math.min(
      Math.floor((progress / 100) * statuses.length),
      statuses.length - 1
    );
    setStatusIndex(idx);
  }, [progress, statuses.length]);

  useEffect(() => {
    if (progress >= 100 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;
      const timer = setTimeout(() => {
        setDismissed(true);
        setTimeout(onComplete, 600);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Name */}
          <motion.h1
            className="font-headline text-lg tracking-[0.3em] uppercase mb-12"
            style={{ color: 'var(--ds-text)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t.loading.title}
          </motion.h1>

          {/* Status text */}
          <motion.p
            className="font-mono text-xs tracking-[0.15em] uppercase mb-8"
            style={{ color: 'var(--ds-muted)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            key={statusIndex}
          >
            {statuses[statusIndex]}
          </motion.p>

          {/* Progress bar */}
          <div className="flex items-center gap-4">
            <span
              className="font-mono text-xs"
              style={{ color: 'var(--ds-muted)', minWidth: '2ch' }}
            >
              {String(Math.round(progress)).padStart(2, '0')}
            </span>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span
              className="font-mono text-xs"
              style={{ color: 'var(--ds-muted)' }}
            >
              100
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
