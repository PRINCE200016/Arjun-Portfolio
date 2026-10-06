'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  Layers,
  AlertTriangle,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import Image from 'next/image';
import { GalleryProject } from '@/data/galleryProjects';
import { useLenis } from '@/components/ui/LenisProvider';

interface ProjectModalProps {
  project: GalleryProject | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();

  // Portal needs the browser's document, so only render after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Pause Lenis and lock body scroll safely when modal is open
  useEffect(() => {
    if (project) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [project, lenis]);

  const stopProp = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6"
          style={{
            background: 'rgba(4, 6, 9, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            ref={contentRef}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            initial={{ scale: 0.94, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={stopProp}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl modal-scrollbar"
            style={{
              background: '#090D12',
              border: '1px solid rgba(25, 195, 177, 0.28)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 35px rgba(25, 195, 177, 0.12)',
            }}
          >
            {/* ── Top Fixed Navigation Bar ── */}
            <div
              className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 border-b backdrop-blur-md"
              style={{
                background: 'rgba(9, 13, 18, 0.92)',
                borderColor: 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19C3B1] animate-pulse" />
                <span className="font-mono text-[11px] tracking-wider text-white/60 uppercase">
                  Case Study • {project.shortTitle}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub Repository"
                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Case Study"
                  className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/15 text-white/70 hover:text-white ml-1 cursor-pointer"
                  style={{ border: '1px solid rgba(255, 255, 255, 0.15)' }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Hero Image & Showcase ── */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/8] overflow-hidden bg-black/60">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D12] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* ── Main Case Study Body ── */}
            <div className="p-6 sm:p-8 space-y-7">
              {/* Header Info */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {project.role && (
                    <span
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full"
                      style={{
                        background: 'rgba(25, 195, 177, 0.12)',
                        border: '1px solid rgba(25, 195, 177, 0.3)',
                        color: '#8BE9DF',
                      }}
                    >
                      {project.role}
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-white/40 tracking-wider">
                    PRODUCTION ARCHITECTURE
                  </span>
                </div>

                <h1
                  className="text-2xl sm:text-3xl font-bold text-white tracking-wide"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {project.title}
                </h1>
              </div>

              {/* Executive Overview */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#19C3B1] uppercase mb-2">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Executive Overview</span>
                </div>
                <p className="text-sm sm:text-base text-white/75 font-sans leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Real Performance Metrics / Benchmarks */}
              {project.metrics && project.metrics.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#19C3B1] uppercase mb-3">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Engineering Benchmarks & Verified Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="rounded-xl p-3.5 text-center transition-all hover:border-[#19C3B1]/50"
                        style={{
                          background: 'rgba(15, 23, 30, 0.7)',
                          border: '1px solid rgba(25, 195, 177, 0.18)',
                        }}
                      >
                        <div className="text-[#8BE9DF] font-bold text-lg sm:text-xl font-mono tracking-tight">
                          {m.value}
                        </div>
                        <div className="text-[11px] text-white/50 font-mono mt-0.5 uppercase tracking-wider">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* The Problem & Solution */}
              {project.problemSolved && (
                <div
                  className="rounded-xl p-4 sm:p-5"
                  style={{
                    background: 'rgba(255, 170, 0, 0.04)',
                    border: '1px solid rgba(255, 170, 0, 0.18)',
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-amber-400 uppercase mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>The Problem & Core Challenge Solved</span>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {project.problemSolved}
                  </p>
                </div>
              )}

              {/* Systems Architecture */}
              {project.architecture && (
                <div
                  className="rounded-xl p-4 sm:p-5"
                  style={{
                    background: 'rgba(15, 22, 30, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#19C3B1] uppercase mb-2">
                    <Layers className="w-4 h-4 text-[#19C3B1]" />
                    <span>System Architecture & Pipeline</span>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {project.architecture}
                  </p>
                </div>
              )}

              {/* Key Capabilities */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div>
                  <h2 className="text-xs font-mono tracking-widest text-[#19C3B1] uppercase mb-3">
                    Key Technical Capabilities
                  </h2>
                  <div className="space-y-2">
                    {project.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg"
                        style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#19C3B1] shrink-0 mt-0.5" />
                        <span className="text-sm text-white/75 leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deep Dive Implementation Details */}
              {project.details && project.details.length > 0 && (
                <div>
                  <h2 className="text-xs font-mono tracking-widest text-[#19C3B1] uppercase mb-3">
                    Implementation Deep-Dive
                  </h2>
                  <div className="space-y-2.5">
                    {project.details.map((detail, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-lg border border-white/5"
                        style={{ background: 'rgba(15, 20, 26, 0.5)' }}
                      >
                        <p className="text-sm text-white/70 leading-relaxed font-mono">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div>
                <h2 className="text-xs font-mono tracking-widest text-white/50 uppercase mb-3">
                  Technologies & Frameworks
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className="text-xs font-mono font-medium px-3 py-1 rounded-full"
                      style={{
                        color: tag.color,
                        background: `${tag.color}15`,
                        border: `1px solid ${tag.color}35`,
                      }}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Prominent Bottom Action Section (Direct Links for User) ── */}
              <div
                className="mt-8 pt-6 border-t rounded-xl p-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4"
                style={{
                  borderColor: 'rgba(25, 195, 177, 0.25)',
                  background: 'linear-gradient(180deg, rgba(25, 195, 177, 0.06) 0%, rgba(10, 15, 20, 0.8) 100%)',
                }}
              >
                <div>
                  <h3
                    className="text-lg font-semibold text-white tracking-wide"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Ready to Explore {project.shortTitle}?
                  </h3>
                  <p className="text-xs text-white/55 font-mono mt-0.5">
                    Inspect the live application or review the complete codebase on GitHub.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-[#19C3B1]/20 cursor-pointer"
                      style={{
                        background: '#19C3B1',
                        color: '#07090C',
                      }}
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10 text-white cursor-pointer"
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.25)',
                        background: 'rgba(255, 255, 255, 0.05)',
                      }}
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Code</span>
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-full text-xs font-mono text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}