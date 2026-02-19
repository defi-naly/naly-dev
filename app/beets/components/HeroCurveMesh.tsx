// @ts-nocheck
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Bonding Curve Geometry ── */
const SEGMENTS_X = 80;
const SEGMENTS_Y = 40;
const X_RANGE = 4;
const Y_RANGE = 2;
const SCALE = 0.6;

function createBondingCurveGeometry(): THREE.BufferGeometry {
  const countX = SEGMENTS_X + 1;
  const countY = SEGMENTS_Y + 1;
  const totalVertices = countX * countY;
  const positions = new Float32Array(totalVertices * 3);
  const indices: number[] = [];

  for (let i = 0; i <= SEGMENTS_X; i++) {
    const u = ((i / SEGMENTS_X) * 2 - 1) * X_RANGE;
    for (let j = 0; j <= SEGMENTS_Y; j++) {
      const v = ((j / SEGMENTS_Y) * 2 - 1) * Y_RANGE;

      // Bonding curve surface: z = k / (x^2 + 1) with wave displacement
      const x = u * SCALE;
      const y = v * SCALE;
      const z =
        (2.5 / (u * u * 0.3 + 1)) * SCALE +
        Math.sin(u * 1.2) * 0.15 * SCALE +
        Math.cos(v * 2) * 0.08 * SCALE;

      const idx = (i * countY + j) * 3;
      positions[idx] = x;
      positions[idx + 1] = z - 0.8;
      positions[idx + 2] = y;
    }
  }

  for (let i = 0; i < SEGMENTS_X; i++) {
    for (let j = 0; j < SEGMENTS_Y; j++) {
      const a = i * countY + j;
      const b = (i + 1) * countY + j;
      const c = (i + 1) * countY + (j + 1);
      const d = i * countY + (j + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/* ── Scene ── */
function CurveScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  const baseGeo = useMemo(() => createBondingCurveGeometry(), []);

  const basePositions = useMemo(() => {
    const pos = baseGeo.attributes.position as THREE.BufferAttribute;
    return new Float32Array(pos.array);
  }, [baseGeo]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;

    meshRef.current.rotation.y += delta * 0.06;

    // Subtle breathing on Z
    const pos = baseGeo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const time = timeRef.current;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      arr[i + 1] =
        by + Math.sin(bx * 2 + time * 0.4) * 0.02 + Math.cos(time * 0.3) * 0.01;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={baseGeo} position={[0, 0, 0]} rotation={[-0.3, 0, 0]}>
      <meshBasicMaterial wireframe color="#00ffff" transparent opacity={0.18} />
    </mesh>
  );
}

export default function HeroCurveMesh() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0, 255, 255, 0.04), transparent 70%)',
        }}
      />
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        style={{ touchAction: 'none', background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <CurveScene />
      </Canvas>
    </div>
  );
}
