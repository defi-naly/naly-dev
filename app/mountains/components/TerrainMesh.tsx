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

/* ── Mountain Scene ── */
const MountainScene = () => {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const noise = createNoise2D(42);
    const seg = 90;
    const size = 22;
    const half = size / 2;

    const getHeight = (wx: number, wz: number): number => {
      const ridgeWidth = 2.2;
      const backbone = Math.exp(-(wz * wz) / (2 * ridgeWidth * ridgeWidth));

      const peakProfile =
        1.0  * Math.exp(-(wx * wx) / 5) +
        0.7  * Math.exp(-((wx + 3) * (wx + 3)) / 4) +
        0.65 * Math.exp(-((wx - 3.5) * (wx - 3.5)) / 4.5) +
        0.5  * Math.exp(-((wx + 6.5) * (wx + 6.5)) / 3.5) +
        0.45 * Math.exp(-((wx - 7) * (wx - 7)) / 4) +
        0.25 * Math.exp(-((wx + 9.5) * (wx + 9.5)) / 3) +
        0.2  * Math.exp(-((wx - 10) * (wx - 10)) / 3);

      const base = Math.pow(backbone, 0.7) * peakProfile;

      const dist = Math.sqrt(wx * wx + wz * wz);
      const maxDist = half * 0.95;
      const edgeFade = Math.max(0, 1 - Math.pow(dist / maxDist, 4.5));

      const angle = Math.atan2(wz, wx);
      const spurNoise = noise(Math.cos(angle) * 2.5, Math.sin(angle) * 2.5);
      const spur = 0.75 + 0.25 * spurNoise;
      const distFromBackbone = Math.abs(wz);
      const spurInfluence = Math.min(distFromBackbone / 3, 1);
      const spurFactor = 1 - spurInfluence * (1 - spur);

      let fbm = 0;
      let freq = 0.15;
      let amp = 1;
      let maxAmp = 0;
      for (let o = 0; o < 3; o++) {
        fbm += noise(wx * freq, wz * freq) * amp;
        maxAmp += amp;
        freq *= 2.0;
        amp *= 0.42;
      }
      fbm /= maxAmp;
      fbm = fbm * 0.25 + 0.75;

      return base * spurFactor * fbm * edgeFade * 8;
    };

    const plane = new THREE.PlaneGeometry(size, size, seg, seg);
    plane.rotateX(-Math.PI / 2);

    const pos = plane.attributes.position;
    const maxH = 8;

    for (let i = 0; i < pos.count; i++) {
      const wx = pos.getX(i);
      const wz = pos.getZ(i);
      const h = getHeight(wx, wz);
      pos.setY(i, h);
    }
    pos.needsUpdate = true;
    plane.computeVertexNormals();

    const wire = new THREE.WireframeGeometry(plane);

    const wirePos = wire.attributes.position;
    const colorArr = new Float32Array(wirePos.count * 3);

    for (let i = 0; i < wirePos.count; i++) {
      const wx = wirePos.getX(i);
      const h = wirePos.getY(i);
      const wz = wirePos.getZ(i);

      const hNorm = Math.min(h / maxH, 1);
      const brightness = 0.04 + hNorm * 0.55;

      const heightFade = Math.min(h / 1.2, 1);

      const edgeDist = Math.sqrt(wx * wx + wz * wz);
      const edgeFade = Math.max(0, 1 - Math.pow(edgeDist / (half * 0.9), 3));

      const b = brightness * edgeFade * heightFade;
      colorArr[i * 3] = b;
      colorArr[i * 3 + 1] = b * 0.96;
      colorArr[i * 3 + 2] = b * 0.88;
    }

    wire.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));
    return wire;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.018;
      groupRef.current.rotation.x = -0.35 + Math.sin(t * 0.12) * 0.025;
    }
  });

  return (
    <group ref={groupRef} position={[0, -4.2, 0]} rotation={[-0.35, 0, 0]}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.7} />
      </lineSegments>
    </group>
  );
};

export default function TerrainMesh() {
  return (
    <div className="absolute inset-0" style={{ zIndex: 0 }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 50% 45%, hsl(220 20% 12% / 0.6), transparent 70%)',
        }}
      />
      <Canvas
        camera={{ position: [0, 2.2, 12], fov: 50 }}
        style={{ touchAction: 'none', background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <MountainScene />
      </Canvas>
    </div>
  );
}
