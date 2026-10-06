'use client';

import { useRef, useMemo, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { GalleryProject } from '@/data/galleryProjects';

export const CARD_W = 4.8;
export const CARD_H = 2.8;
export const CARD_D = 0.08;
export const CARD_GAP = 5.2;

function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 240;
  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#8BE9DF"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function WirePolyhedra() {
  const r0 = useRef<THREE.Mesh>(null);
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (r0.current) { r0.current.rotation.x += dt * 0.15; r0.current.rotation.y += dt * 0.2; }
    if (r1.current) { r1.current.rotation.y += dt * 0.18; r1.current.rotation.z += dt * 0.12; }
    if (r2.current) { r2.current.rotation.x -= dt * 0.14; r2.current.rotation.z += dt * 0.16; }
    if (r3.current) { r3.current.rotation.y -= dt * 0.12; r3.current.rotation.x += dt * 0.18; }
  });

  const m = <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />;

  return (
    <group>
      <mesh ref={r0} position={[-11, 2.5, -9]}><icosahedronGeometry args={[1.3, 0]} />{m}</mesh>
      <mesh ref={r1} position={[11.5, -1.5, -11]}><dodecahedronGeometry args={[1.5, 0]} />{m}</mesh>
      <mesh ref={r2} position={[-9.5, -2.5, -8]}><octahedronGeometry args={[1.1, 0]} />{m}</mesh>
      <mesh ref={r3} position={[9, 3.2, -13]}><tetrahedronGeometry args={[1.2, 0]} />{m}</mesh>
    </group>
  );
}

interface SlabProps {
  project: GalleryProject;
  index: number;
  currentProgressRef: React.MutableRefObject<number>;
  onClickCard: (idx: number) => void;
  onOpenModal: () => void;
}

function ProjectSlab({ project, index, currentProgressRef, onClickCard, onOpenModal }: SlabProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const faceMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useTexture(project.image);
  const { gl } = useThree();

  useEffect(() => {
    if (!texture) return;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = gl.capabilities?.getMaxAnisotropy?.() || 16;
    texture.needsUpdate = true;
  }, [texture, gl]);

  const boxGeo = useMemo(() => new THREE.BoxGeometry(CARD_W, CARD_H, CARD_D), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const offset = index - currentProgressRef.current;
    const absOffset = Math.abs(offset);

    // Continuous 3D positioning
    const x = offset * CARD_GAP;
    const z = -Math.pow(absOffset, 1.18) * 1.55;
    const rotY = -Math.sign(offset) * Math.min(absOffset * 0.42, 0.65);
    const scale = 1 / (1 + absOffset * 0.16);

    // Gentle floating motion on the active card
    const floatY = Math.max(0, 1 - absOffset) * Math.sin(state.clock.elapsedTime * 1.5) * 0.045;

    groupRef.current.position.set(x, floatY, z);
    groupRef.current.rotation.set(0, rotY, 0);
    groupRef.current.scale.set(scale, scale, scale);

    // Dynamic brightness & glow
    const isActive = absOffset < 0.35;
    const brightness = Math.max(0.3, 1 - absOffset * 0.42);

    if (faceMatRef.current) {
      faceMatRef.current.color.setScalar(brightness);
    }

    if (lineMatRef.current) {
      lineMatRef.current.opacity = isActive ? 0.75 : Math.max(0.12, 0.45 - absOffset * 0.2);
      lineMatRef.current.color.set(isActive ? '#19C3B1' : '#6ba8a1');
    }
  });

  const handleClick = useCallback(
    (e: { stopPropagation: () => void }) => {
      e.stopPropagation();
      const offset = Math.abs(index - currentProgressRef.current);
      if (offset < 0.35) {
        onOpenModal();
      } else {
        onClickCard(index);
      }
    },
    [index, currentProgressRef, onClickCard, onOpenModal]
  );

  return (
    <group ref={groupRef} onClick={handleClick}>
      <mesh geometry={boxGeo}>
        <meshBasicMaterial attach="material-0" color="#080c10" />
        <meshBasicMaterial attach="material-1" color="#080c10" />
        <meshBasicMaterial attach="material-2" color="#080c10" />
        <meshBasicMaterial attach="material-3" color="#080c10" />
        <meshBasicMaterial
          ref={faceMatRef}
          attach="material-4"
          map={texture}
          color="#ffffff"
          toneMapped={false}
        />
        <meshBasicMaterial attach="material-5" color="#080c10" />
      </mesh>

      {/* Sleek edge highlights */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial ref={lineMatRef} color="#19C3B1" transparent opacity={0.5} />
      </lineSegments>

      {/* Decorative top browser/workstation bar */}
      <mesh position={[0, CARD_H / 2 - 0.04, CARD_D / 2 + 0.002]}>
        <planeGeometry args={[CARD_W * 0.99, 0.08]} />
        <meshBasicMaterial color="#0b1015" transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

function CameraParallax({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame((_, dt) => {
    if (!mouseRef.current) return;
    const targetX = mouseRef.current.x * 0.12;
    const targetY = mouseRef.current.y * 0.08;

    // Smooth camera damping
    camera.position.x += (targetX - camera.position.x) * Math.min(1, dt * 3);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, dt * 3);
    camera.position.z += (4.85 - camera.position.z) * Math.min(1, dt * 3);
    camera.lookAt(targetX * 0.2, targetY * 0.2, 0);
  });

  return null;
}

interface GallerySceneProps {
  projects: GalleryProject[];
  targetProgressRef: React.MutableRefObject<number>;
  currentProgressRef: React.MutableRefObject<number>;
  onActiveIndexChange: (idx: number) => void;
  onSelectCard: (idx: number) => void;
  onOpenModal: () => void;
  mouseRef: React.RefObject<{ x: number; y: number }>;
}

export default function GalleryScene({
  projects,
  targetProgressRef,
  currentProgressRef,
  onActiveIndexChange,
  onSelectCard,
  onOpenModal,
  mouseRef,
}: GallerySceneProps) {
  const lastActiveIndex = useRef(-1);

  useFrame((_, dt) => {
    // Framerate-independent spring damping for buttery smooth movement
    const target = targetProgressRef.current;
    const current = currentProgressRef.current;
    const factor = 1 - Math.exp(-9.5 * Math.min(dt, 0.05));
    currentProgressRef.current += (target - current) * factor;

    const rounded = Math.round(currentProgressRef.current);
    if (rounded !== lastActiveIndex.current && rounded >= 0 && rounded < projects.length) {
      lastActiveIndex.current = rounded;
      onActiveIndexChange(rounded);
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 6, 6]} intensity={0.6} />
      <pointLight position={[0, 0, 2]} intensity={0.5} color="#8BE9DF" distance={8} />

      <BackgroundParticles />
      <WirePolyhedra />

      {projects.map((project, idx) => (
        <ProjectSlab
          key={project.id}
          project={project}
          index={idx}
          currentProgressRef={currentProgressRef}
          onClickCard={onSelectCard}
          onOpenModal={onOpenModal}
        />
      ))}

      <CameraParallax mouseRef={mouseRef} />
    </>
  );
}
