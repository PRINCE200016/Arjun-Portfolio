'use client';

import { useState, useRef, useCallback, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { galleryProjects } from '@/data/galleryProjects';
import ProjectInfoPanel from './projects3d/ProjectInfoPanel';
import ProjectModal from './projects3d/ProjectModal';

// Load the R3F scene client-side only
const GalleryScene = dynamic(() => import('./projects3d/GalleryScene'), {
  ssr: false,
  loading: () => null,
});

// ─── Canvas skeleton shown while R3F initializes ────────────────────────
function CanvasSkeleton() {
  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-2xl"
      style={{ background: 'rgba(11,14,18,0.4)' }}
    >
      <div className="flex gap-4 items-center">
        <div
          className="rounded-xl border border-white/10 animate-pulse"
          style={{ width: '420px', height: '240px', background: 'rgba(255,255,255,0.04)' }}
        />
      </div>
    </div>
  );
}

export default function ProjectsStation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Drag state
  const isPointerDown = useRef(false);
  const dragStartX = useRef(0);
  const dragStartProgress = useRef(0);
  const hasDragged = useRef(false);

  // Mouse parallax tracking (passive)
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Arrow key navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      if (e.key === 'ArrowLeft') {
        const next = Math.max(0, targetProgressRef.current - 1);
        targetProgressRef.current = Math.round(next);
        setActiveIndex(Math.round(next));
      }
      if (e.key === 'ArrowRight') {
        const next = Math.min(galleryProjects.length - 1, targetProgressRef.current + 1);
        targetProgressRef.current = Math.round(next);
        setActiveIndex(Math.round(next));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Continuous Pointer Dragging
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only primary mouse button or touch
    if (e.button !== 0) return;
    isPointerDown.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    dragStartProgress.current = targetProgressRef.current;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) {
      hasDragged.current = true;
    }
    // Continuous smooth slide matching drag distance
    const sensitivity = Math.max(260, window.innerWidth * 0.28);
    const progressDelta = -dx / sensitivity;
    const newProgress = Math.max(
      -0.2,
      Math.min(galleryProjects.length - 0.8, dragStartProgress.current + progressDelta)
    );
    targetProgressRef.current = newProgress;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    // Inertial snap to nearest integer card
    const snapped = Math.round(targetProgressRef.current);
    const clamped = Math.max(0, Math.min(galleryProjects.length - 1, snapped));
    targetProgressRef.current = clamped;
    setActiveIndex(clamped);
  }, []);

  // Wheel horizontal swipe
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10;
    if (isHorizontal) {
      e.stopPropagation();
      const delta = e.deltaX * 0.003;
      targetProgressRef.current = Math.max(
        0,
        Math.min(galleryProjects.length - 1, targetProgressRef.current + delta)
      );

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        const snapped = Math.round(targetProgressRef.current);
        const clamped = Math.max(0, Math.min(galleryProjects.length - 1, snapped));
        targetProgressRef.current = clamped;
        setActiveIndex(clamped);
      }, 120);
    }
  }, []);

  // Direct index changes from UI controls
  const handleSelect = useCallback((idx: number) => {
    targetProgressRef.current = idx;
    setActiveIndex(idx);
  }, []);

  const handlePrev = useCallback(() => {
    const next = Math.max(0, activeIndex - 1);
    targetProgressRef.current = next;
    setActiveIndex(next);
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    const next = Math.min(galleryProjects.length - 1, activeIndex + 1);
    targetProgressRef.current = next;
    setActiveIndex(next);
  }, [activeIndex]);

  const handleOpenModal = useCallback(() => setModalOpen(true), []);
  const handleCloseModal = useCallback(() => setModalOpen(false), []);

  const activeProject = galleryProjects[activeIndex] || galleryProjects[0];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen lg:h-screen lg:max-h-[1080px] flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 select-none"
    >
      {/* ── Compact Header (Fits in single frame) ── */}
      <div className="text-center pt-2 pb-1 px-4 flex-shrink-0">
        <div className="flex items-center justify-center gap-3 mb-1">
          <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-[#19C3B1]/60" />
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#19C3B1] uppercase">
            STATION 04 • SELECTED ARCHITECTURE
          </p>
          <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-[#19C3B1]/60" />
        </div>
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-normal uppercase tracking-[0.25em] text-white"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Projects
        </h2>
        <p
          className="text-xs sm:text-sm text-white/50 italic max-w-lg mx-auto leading-tight mt-1 hidden sm:block"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          &ldquo;Every line of code is a decision — engineered for scale, reliability, and precision.&rdquo;
        </p>
      </div>

      {/* ── 3D Large Responsive Stage ── */}
      <div
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full flex-1 min-h-[320px] max-h-[50vh] sm:max-h-[54vh] select-none my-auto"
        style={{
          touchAction: 'pan-y',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <Suspense fallback={<CanvasSkeleton />}>
          <Canvas
            camera={{ position: [0, 0, 4.85], fov: 42, near: 0.1, far: 50 }}
            dpr={[1, 2]}
            frameloop="always"
            gl={{
              antialias: true,
              powerPreference: 'high-performance',
              alpha: true,
            }}
            style={{ background: 'transparent' }}
          >
            <GalleryScene
              projects={galleryProjects}
              targetProgressRef={targetProgressRef}
              currentProgressRef={currentProgressRef}
              onActiveIndexChange={setActiveIndex}
              onSelectCard={handleSelect}
              onOpenModal={handleOpenModal}
              mouseRef={mouseRef}
            />
          </Canvas>
        </Suspense>

        {/* Drag Hint at center bottom */}
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/40"
          aria-hidden="true"
        >
          <span className="hidden sm:inline">← DRAG TO SLIDE • CLICK ACTIVE CARD FOR CASE STUDY →</span>
          <span className="sm:hidden">← SWIPE CARDS →</span>
        </div>
      </div>

      {/* ── Compact Project Info & Controls (Bottom of the 1-frame view) ── */}
      <div className="w-full flex-shrink-0 pb-2 pt-1">
        <ProjectInfoPanel
          project={activeProject}
          activeIndex={activeIndex}
          total={galleryProjects.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onSelect={handleSelect}
          onOpenModal={handleOpenModal}
        />
      </div>

      {/* ── Full-Screen Case Study Modal ── */}
      <ProjectModal
        project={modalOpen ? activeProject : null}
        onClose={handleCloseModal}
      />
    </section>
  );
}
