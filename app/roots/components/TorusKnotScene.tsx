// @ts-nocheck
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from '../lib/noise';

const INK = '#1a1916';
const SPHERE_RADIUS = 1.5;

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

export function TorusKnotScene({ progress = 0 }: { progress?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const noise3D = useMemo(() => createNoise3D(55), []);
  const timeRef = useRef(0);

  const baseGeo = useMemo(() => {
    return new THREE.TorusKnotGeometry(0.8, 0.28, 128, 24, 2, 3);
  }, []);

  const basePositions = useMemo(() => {
    const pos = baseGeo.attributes.position as THREE.BufferAttribute;
    return new Float32Array(pos.array);
  }, [baseGeo]);

  const spherePositions = useMemo(() => {
    const result = new Float32Array(basePositions.length);
    for (let i = 0; i < basePositions.length; i += 3) {
      const x = basePositions[i];
      const y = basePositions[i + 1];
      const z = basePositions[i + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      if (len > 0) {
        result[i] = (x / len) * SPHERE_RADIUS;
        result[i + 1] = (y / len) * SPHERE_RADIUS;
        result[i + 2] = (z / len) * SPHERE_RADIUS;
      }
    }
    return result;
  }, [basePositions]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;

    meshRef.current.rotation.y += delta * 0.08;
    meshRef.current.rotation.x += delta * 0.03;

    const collapseT = smoothstep((progress - 0.25) / 0.75);

    const pos = baseGeo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const noiseAmp = 0.02 * (1 - collapseT * 0.8);

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];

      const knotX = bx + noise3D(bx * 2, by * 2, time * 0.2) * noiseAmp;
      const knotY = by + noise3D(bx * 2 + 50, by * 2, time * 0.2) * noiseAmp;
      const knotZ = bz + noise3D(bx * 2 + 100, by * 2, time * 0.2) * noiseAmp;

      const sx = spherePositions[i];
      const sy = spherePositions[i + 1];
      const sz = spherePositions[i + 2];

      arr[i] = knotX + (sx - knotX) * collapseT;
      arr[i + 1] = knotY + (sy - knotY) * collapseT;
      arr[i + 2] = knotZ + (sz - knotZ) * collapseT;
    }
    pos.needsUpdate = true;
  });

  const fadeOut = smoothstep((progress - 0.70) / 0.30);
  const opacity = 0.12 * (1 - fadeOut);

  if (opacity < 0.001) return null;

  return (
    <mesh ref={meshRef} geometry={baseGeo} position={[0, 0.2, 0]}>
      <meshBasicMaterial wireframe color={INK} transparent opacity={opacity} />
    </mesh>
  );
}
