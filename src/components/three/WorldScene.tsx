'use client';

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, PerformanceMonitor, AdaptiveDpr, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useExperience } from '@/hooks/useExperience';

/* ─── Undulating Particle Wave Terrain (Hero centerpiece) ─── */
function UndulatingWaveTerrain({ visible }: { visible: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const countX = 90;
  const countY = 60;
  const total = countX * countY;

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(total * 3);
    const initial = new Float32Array(total * 3);
    let i = 0;
    for (let ix = 0; ix < countX; ix++) {
      for (let iy = 0; iy < countY; iy++) {
        const x = (ix - countX / 2) * 0.55;
        const z = (iy - countY / 2) * 0.55 - 4;
        const y = Math.sin(x * 0.4) * Math.cos(z * 0.4) * 0.8 - 1.5;

        pos[i * 3] = x;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = z;

        initial[i * 3] = x;
        initial[i * 3 + 1] = y;
        initial[i * 3 + 2] = z;
        i++;
      }
    }
    return [pos, initial];
  }, [total]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const attr = geom.attributes.position as THREE.BufferAttribute;
    const time = state.clock.elapsedTime * 0.8;

    for (let i = 0; i < total; i++) {
      const x = initialPositions[i * 3];
      const z = initialPositions[i * 3 + 2];
      const wave =
        Math.sin(x * 0.25 + time) * 1.2 +
        Math.cos(z * 0.35 + time * 0.7) * 0.9 +
        Math.sin((x + z) * 0.2 + time * 0.5) * 0.6;

      attr.setY(i, initialPositions[i * 3 + 1] + wave);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={[0, -0.5, -2]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#ffffff"
        transparent
        opacity={visible ? 0.45 : 0.08}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── About Section Visual (3D Head & Lamp/Lightbulb Models) ─── */

// About-section camera sits at z = -2, head sits at z = -8  →  6 units apart.
const HEAD_Z = -8;
const HEAD_DISTANCE = 6;

// Centre of the EMPTY LEFT AREA next to the text, in screen coords
// (-1 = left edge of screen, 0 = centre, +1 = right edge).
// If your text column changes width, tweak only this number.
const HEAD_NDC_X = -0.5;

// Vertical position of the head's centre (-1 = bottom of screen, 0 = middle, +1 = top).
// More negative = head moves DOWN.
const HEAD_NDC_Y = -0.35;

// Overall size multiplier for head + lamp. Lower = smaller, higher = bigger.
const HEAD_SIZE = 0.7;

/**
 * Loads a GLTF, clones it, then scales it so it fits inside
 * maxHeight × maxWidth (width is measured rotation-safe, so even while
 * spinning it never leaves its box) and centers it on the origin.
 */
function useFittedModel(url: string, maxHeight: number, maxWidth: number) {
  const { scene } = useGLTF(url);

  return useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const footprint = Math.hypot(size.x, size.z) || 1; // rotation-safe width
    const s = Math.min(maxHeight / (size.y || 1), maxWidth / footprint);

    clone.scale.setScalar(s);
    clone.position.set(-center.x * s, -center.y * s, -center.z * s);
    clone.traverse((obj) => {
      obj.frustumCulled = false;
    });
    return clone;
  }, [scene, maxHeight, maxWidth]);
}

function HeadModel({ height, width }: { height: number; width: number }) {
  const model = useFittedModel('/models/head/Head.gltf', height, width);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

function LampModel({ height, width, y }: { height: number; width: number; y: number }) {
  const model = useFittedModel('/models/head/scene3.gltf', height, width);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, y, 0]}>
      <primitive object={model} />
    </group>
  );
}

function HeadWithLightbulb({ visible }: { visible: boolean }) {
  const size = useThree((s) => s.size);
  const fov = useThree((s) => (s.camera as THREE.PerspectiveCamera).fov);

  // Work out where the empty left area is (in world units) and how big the
  // head may be, from the current screen size. Fully responsive.
  const layout = useMemo(() => {
    const aspect = size.width / size.height;
    const visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * HEAD_DISTANCE;
    const visibleW = visibleH * aspect;
    const narrow = aspect < 1.2; // phone / portrait: no empty side space, centre it

    const headH = visibleH * 0.45 * HEAD_SIZE;
    const lampH = headH * 0.3;
    const maxW = visibleW * (narrow ? 0.5 : 0.3) * HEAD_SIZE;

    return {
      x: narrow ? 0 : HEAD_NDC_X * (visibleW / 2),
      y: HEAD_NDC_Y * (visibleH / 2),
      headH,
      lampH,
      maxW,
      lampY: headH / 2 + lampH * 0.6,
    };
  }, [size.width, size.height, fov]);

  if (!visible) return null;

  return (
    <group position={[layout.x, layout.y, HEAD_Z]}>
      <Suspense fallback={null}>
        <HeadModel height={layout.headH} width={layout.maxW} />
        <LampModel height={layout.lampH} width={layout.maxW * 0.5} y={layout.lampY} />
      </Suspense>

      {/* Lights local to the head so it isn't dark */}
      <pointLight position={[0, 2.2, 1.5]} intensity={30} color="#93C5FD" distance={14} decay={2} />
      <pointLight position={[-3, 0.5, 3]} intensity={12} color="#FFFFFF" distance={14} decay={2} />
      <directionalLight position={[3, 3, 5]} intensity={1.2} color="#FFFFFF" />
    </group>
  );
}

useGLTF.preload('/models/head/Head.gltf');
useGLTF.preload('/models/head/scene3.gltf');

/* ─── 3D Particle Brain with Rotating Gears (Services centerpiece) ─── */
function BrainWithGears({ visible }: { visible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const gear1Ref = useRef<THREE.Group>(null);
  const gear2Ref = useRef<THREE.Group>(null);

  const brainParticles = useMemo(() => {
    const count = 1100;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const hemisphere = Math.random() > 0.5 ? 1 : -1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.1 + Math.random() * 0.35;

      const x = (r * Math.sin(phi) * Math.cos(theta) * 0.85 + hemisphere * 0.3);
      const y = r * Math.cos(phi) * 0.75;
      const z = r * Math.sin(phi) * Math.sin(theta) * 1.1;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (gear1Ref.current) gear1Ref.current.rotation.z += delta * 0.5;
    if (gear2Ref.current) gear2Ref.current.rotation.z -= delta * 0.7;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[3.8, 0, -28]} visible={visible}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[brainParticles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color="#DDDDDD"
          transparent
          opacity={0.35}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.9, 1.95, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>

      <group ref={gear1Ref} position={[-0.1, 0.1, 0]}>
        <mesh>
          <torusGeometry args={[0.5, 0.08, 8, 24]} />
          <meshStandardMaterial color="#FFFFFF" wireframe transparent opacity={0.5} />
        </mesh>
      </group>

      <group ref={gear2Ref} position={[0.45, -0.2, 0.1]}>
        <mesh>
          <torusGeometry args={[0.35, 0.06, 8, 20]} />
          <meshStandardMaterial color="#FFFFFF" wireframe transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/* ─── Floating Wireframe Polyhedra (Projects centerpiece) ─── */
function FloatingPolyhedra({ visible }: { visible: boolean }) {
  const g1 = useRef<THREE.Mesh>(null);
  const g2 = useRef<THREE.Mesh>(null);
  const g3 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (g1.current) {
      g1.current.rotation.x += delta * 0.2;
      g1.current.rotation.y += delta * 0.3;
    }
    if (g2.current) {
      g2.current.rotation.y += delta * 0.25;
      g2.current.rotation.z += delta * 0.15;
    }
    if (g3.current) {
      g3.current.rotation.x -= delta * 0.18;
      g3.current.rotation.z += delta * 0.22;
    }
  });

  return (
    <group position={[0, 0, -42]} visible={visible}>
      <mesh ref={g1} position={[-6, 1.5, -2]}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.18} />
      </mesh>

      <mesh ref={g2} position={[0, -2, -4]}>
        <dodecahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.18} />
      </mesh>

      <mesh ref={g3} position={[6.5, 2, -3]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

/* ─── Camera Rig smoothly following active section ─── */
function CosmicCameraRig({ activeSection }: { activeSection: number }) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const sectionTargets: [number, number, number][] = [
    [0, 0, 7],       // 0: Home
    [0, 0, -2],      // 1: About — camera sits ~6 units IN FRONT of the head (head is at z=-8, x=+2.6 → right side)
    [1.5, 0, -21],   // 2: Services / Skills
    [0, 0, -35],     // 3: Experience
    [0, 0, -42],     // 4: Projects
    [0, 0, -50],     // 5: Contact
  ];

  useFrame(() => {
    const target = sectionTargets[activeSection] || sectionTargets[0];
    const mx = mouseRef.current.x * 0.6;
    const my = mouseRef.current.y * 0.4;

    camera.position.x += (target[0] + mx - camera.position.x) * 0.035;
    camera.position.y += (target[1] + my - camera.position.y) * 0.035;
    camera.position.z += (target[2] - camera.position.z) * 0.035;

    camera.lookAt(target[0] * 0.2, target[1] * 0.2, target[2] - 10);
  });

  return null;
}

/* ─── Main Scene Composition ─── */
function SceneContent() {
  const { activeSection } = useExperience();

  return (
    <>
      <PerformanceMonitor onDecline={() => { }} />
      <AdaptiveDpr pixelated />

      <ambientLight intensity={0.25} color="#A0A0A0" />
      <pointLight position={[0, 6, 0]} intensity={2.0} color="#FFFFFF" distance={45} decay={2} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#E0E0E0" />

      <fog attach="fog" args={['#030303', 8, 65]} />
      <Stars radius={90} depth={60} count={3000} factor={2.8} saturation={0} fade speed={0.4} />

      <UndulatingWaveTerrain visible={true} />
      <HeadWithLightbulb visible={true} />
      <BrainWithGears visible={true} />
      <FloatingPolyhedra visible={true} />

      <CosmicCameraRig activeSection={activeSection} />
    </>
  );
}

/* ─── World Canvas Export ─── */
interface WorldSceneProps {
  className?: string;
}

export default function WorldScene({ className }: WorldSceneProps) {
  return (
    <div className={`canvas-container fixed inset-0 z-0 ${className || ''}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55, near: 0.1, far: 180 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        style={{ background: '#020202' }}
        onCreated={({ gl, invalidate }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.0;
          const onVis = () => { if (!document.hidden) invalidate(); };
          document.addEventListener('visibilitychange', onVis, { passive: true });
        }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}