'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryProject } from '@/data/galleryProjects';

interface ProjectInfoPanelProps {
  project: GalleryProject;
  activeIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  onOpenModal: () => void;
}

export default function ProjectInfoPanel({
  project,
  activeIndex,
  total,
  onPrev,
  onNext,
  onSelect,
  onOpenModal,
}: ProjectInfoPanelProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 text-center">
      {/* ── Navigation Track & Indicators ── */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
        <button
          onClick={onPrev}
          disabled={activeIndex === 0}
          aria-label="Previous project"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 disabled:opacity-20 hover:bg-white/10 hover:border-[#19C3B1]/60 active:scale-95 cursor-pointer"
          style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(15,22,28,0.7)' }}
        >
          <ChevronLeft className="w-4 h-4 text-white/80" />
        </button>

        {/* Dots + Numerical Counter */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(10,15,20,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              aria-label={`Go to project ${i + 1}`}
              className="group py-1 cursor-pointer"
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? 22 : 6,
                  height: 6,
                  background: i === activeIndex ? '#19C3B1' : 'rgba(255,255,255,0.22)',
                  boxShadow: i === activeIndex ? '0 0 10px rgba(25,195,177,0.8)' : 'none',
                }}
              />
            </button>
          ))}
          <span className="font-mono text-[10px] text-white/40 ml-1.5 pl-2 border-l border-white/10 select-none">
            0{activeIndex + 1} / 0{total}
          </span>
        </div>

        <button
          onClick={onNext}
          disabled={activeIndex === total - 1}
          aria-label="Next project"
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full transition-all duration-200 disabled:opacity-20 hover:bg-white/10 hover:border-[#19C3B1]/60 active:scale-95 cursor-pointer"
          style={{ border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(15,22,28,0.7)' }}
        >
          <ChevronRight className="w-4 h-4 text-white/80" />
        </button>
      </div>

      {/* ── Active Project Metadata (Crossfade with zero layout jump) ── */}
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="flex flex-col items-center gap-2"
      >
        {/* Title */}
        <div className="flex items-center justify-center gap-2">
          <h3
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white tracking-wide"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {project.title}
          </h3>
        </div>

        {/* Short Description */}
        <p
          className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed line-clamp-2"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 my-0.5 max-w-xl">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className="text-[10px] sm:text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full"
              style={{
                color: tag.color,
                background: 'rgba(255,255,255,0.04)',
                border: `1px solid ${tag.color}33`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-[0.16em] uppercase px-4 py-1.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(25,195,177,0.35)] cursor-pointer"
            style={{
              border: '1px solid rgba(25,195,177,0.5)',
              background: 'rgba(25,195,177,0.12)',
              color: '#8BE9DF',
            }}
          >
            <Sparkles className="w-3 h-3 text-[#19C3B1]" />
            <span>Case Study</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Live Project"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-white/80 hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.03)' }}
            >
              <ExternalLink className="w-3 h-3" />
              <span>Live Demo</span>
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Source Code"
              className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-white/80 hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              style={{ border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.03)' }}
            >
              <Github className="w-3 h-3" />
              <span>Code</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
