// @ts-nocheck
'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Inline 2D Simplex Noise ── */
const GRAD2 = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]];
const F2 = 0.5 * (Math.sqrt(3) - 1);
const G2 = (3 - Math.sqrt(3)) / 6;

function dot2(g: number[], x: number, y: number) { return g[0] * x + g[1] * y; }

function buildPerm(seed: number) {
  const perm = new Uint8Array(512);
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  let s = seed;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
}

function createNoise2D(seed = 42) {
  const perm = buildPerm(seed);
  return (xin: number, yin: number): number => {
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255, jj = j & 255;
    let n0 = 0, n1 = 0, n2 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) { t0 *= t0; n0 = t0 * t0 * dot2(GRAD2[perm[ii + perm[jj]] % 8], x0, y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) { t1 *= t1; n1 = t1 * t1 * dot2(GRAD2[perm[ii + i1 + perm[jj + j1]] % 8], x1, y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) { t2 *= t2; n2 = t2 * t2 * dot2(GRAD2[perm[ii + 1 + perm[jj + 1]] % 8], x2, y2); }
    return 70 * (n0 + n1 + n2);
  };
}

function createNoise3D(seed = 42) {
  const noise2d = createNoise2D(seed);
  return (x: number, y: number, z: number): number => {
    return (noise2d(x, y) + noise2d(y, z) + noise2d(z, x)) / 3;
  };
}

/* ── Enneper Minimal Surface ── */

const SEGMENTS = 64;       // resolution in each direction
const RANGE = 1.6;         // parameter range [-R, R] — controls ruffle amount
const SCALE = 0.7;         // smaller to fit hero

function createEnneperGeometry(): THREE.BufferGeometry {
  const count = SEGMENTS + 1;
  const totalVertices = count * count;
  const positions = new Float32Array(totalVertices * 3);
  const indices: number[] = [];

  for (let i = 0; i <= SEGMENTS; i++) {
    const u = ((i / SEGMENTS) * 2 - 1) * RANGE;
    for (let j = 0; j <= SEGMENTS; j++) {
      const v = ((j / SEGMENTS) * 2 - 1) * RANGE;

      // Enneper surface parametric equations
      const x = (u - (u * u * u) / 3 + u * v * v) * SCALE;
      const y = (v - (v * v * v) / 3 + v * u * u) * SCALE;
      const z = (u * u - v * v) * SCALE;

      const idx = (i * count + j) * 3;
      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;
    }
  }

  // Build triangle indices
  for (let i = 0; i < SEGMENTS; i++) {
    for (let j = 0; j < SEGMENTS; j++) {
      const a = i * count + j;
      const b = (i + 1) * count + j;
      const c = (i + 1) * count + (j + 1);
      const d = i * count + (j + 1);
      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/* ── Bloom Scene ── */
const BloomScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const noise3D = useMemo(() => createNoise3D(55), []);
  const timeRef = useRef(0);

  const baseGeo = useMemo(() => createEnneperGeometry(), []);

  // Store base positions for noise displacement
  const basePositions = useMemo(() => {
    const pos = baseGeo.attributes.position as THREE.BufferAttribute;
    return new Float32Array(pos.array);
  }, [baseGeo]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;

    // Full rotation across Y and Z
    meshRef.current.rotation.y += delta * 0.1;
    meshRef.current.rotation.z -= delta * 0.12;

    // Subtle noise-driven vertex drift — organic breathing
    const pos = baseGeo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const noiseAmp = 0.04;

    for (let i = 0; i < arr.length; i += 3) {
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const bz = basePositions[i + 2];

      arr[i]     = bx + noise3D(bx * 2, by * 2, time * 0.15) * noiseAmp;
      arr[i + 1] = by + noise3D(bx * 2 + 50, by * 2, time * 0.15) * noiseAmp;
      arr[i + 2] = bz + noise3D(bx * 2 + 100, by * 2, time * 0.15) * noiseAmp;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={baseGeo} position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
      <meshBasicMaterial
        wireframe
        color="#ffffff"
        transparent
        opacity={0.28}
      />
    </mesh>
  );
};

const WireframeMesh = () => {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255, 255, 255, 0.06), transparent 70%)',
        }}
      />
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ touchAction: 'none', background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <BloomScene />
      </Canvas>
    </div>
  );
};

export default WireframeMesh;
