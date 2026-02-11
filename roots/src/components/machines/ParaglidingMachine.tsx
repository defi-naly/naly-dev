import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { createNoise2D, createNoise3D, fbm } from '../../utils/noise';

const INK = '#1a1916';

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

// Parametric Klein bottle immersion → EdgesGeometry
function createKleinBottleGeometry(targetRadius: number, uSegs = 32, vSegs = 24): THREE.EdgesGeometry {
  const positions: number[] = [];
  const verts: number[][] = [];

  for (let ui = 0; ui <= uSegs; ui++) {
    for (let vi = 0; vi <= vSegs; vi++) {
      const u = (ui / uSegs) * Math.PI * 2;
      const v = (vi / vSegs) * Math.PI * 2;

      let x: number, y: number, z: number;

      if (u < Math.PI) {
        x = 3 * Math.cos(u) * (1 + Math.sin(u)) + 2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
        z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
      } else {
        x = 3 * Math.cos(u) * (1 + Math.sin(u)) + 2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
        z = -8 * Math.sin(u);
      }
      y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

      verts.push([x, y, z]);
    }
  }

  // Normalize to target radius
  let maxR = 0;
  for (const v of verts) {
    const r = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (r > maxR) maxR = r;
  }
  const scale = targetRadius / (maxR || 1);

  for (const v of verts) {
    positions.push(v[0] * scale, v[1] * scale, v[2] * scale);
  }

  // Build quad faces
  const faceIndices: number[] = [];
  for (let ui = 0; ui < uSegs; ui++) {
    for (let vi = 0; vi < vSegs; vi++) {
      const a = ui * (vSegs + 1) + vi;
      const b = a + 1;
      const c = (ui + 1) * (vSegs + 1) + vi;
      const d = c + 1;
      faceIndices.push(a, b, d, a, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(faceIndices);
  geo.computeVertexNormals();
  return new THREE.EdgesGeometry(geo);
}

// Parametric Mobius strip → EdgesGeometry
function createMobiusGeometry(targetRadius: number, uSegs = 48, vSegs = 8): THREE.EdgesGeometry {
  const positions: number[] = [];
  const width = 0.4;
  const verts: number[][] = [];

  for (let ui = 0; ui <= uSegs; ui++) {
    for (let vi = 0; vi <= vSegs; vi++) {
      const u = (ui / uSegs) * Math.PI * 2;
      const v = (vi / vSegs) * 2 - 1; // -1 to 1

      const r = 1 + v * width * Math.cos(u / 2);
      const x = r * Math.cos(u);
      const y = r * Math.sin(u);
      const z = v * width * Math.sin(u / 2);

      verts.push([x, y, z]);
    }
  }

  // Normalize to target radius
  let maxR = 0;
  for (const v of verts) {
    const r = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (r > maxR) maxR = r;
  }
  const scale = targetRadius / (maxR || 1);

  for (const v of verts) {
    positions.push(v[0] * scale, v[1] * scale, v[2] * scale);
  }

  // Build quad faces
  const faceIndices: number[] = [];
  for (let ui = 0; ui < uSegs; ui++) {
    for (let vi = 0; vi < vSegs; vi++) {
      const a = ui * (vSegs + 1) + vi;
      const b = a + 1;
      const c = (ui + 1) * (vSegs + 1) + vi;
      const d = c + 1;
      faceIndices.push(a, b, d, a, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(faceIndices);
  geo.computeVertexNormals();
  return new THREE.EdgesGeometry(geo);
}

// Parametric Enneper minimal surface → EdgesGeometry
function createEnneperGeometry(targetRadius: number, segs = 32): THREE.EdgesGeometry {
  const positions: number[] = [];
  const verts: number[][] = [];
  const range = 1.6; // parameter range

  for (let ui = 0; ui <= segs; ui++) {
    for (let vi = 0; vi <= segs; vi++) {
      const u = (ui / segs) * 2 * range - range;
      const v = (vi / segs) * 2 * range - range;

      const x = u - (u * u * u) / 3 + u * v * v;
      const y = v - (v * v * v) / 3 + v * u * u;
      const z = u * u - v * v;

      verts.push([x, y, z]);
    }
  }

  // Normalize to target radius
  let maxR = 0;
  for (const v of verts) {
    const r = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (r > maxR) maxR = r;
  }
  const scale = targetRadius / (maxR || 1);

  for (const v of verts) {
    positions.push(v[0] * scale, v[1] * scale, v[2] * scale);
  }

  // Build quad faces
  const faceIndices: number[] = [];
  for (let ui = 0; ui < segs; ui++) {
    for (let vi = 0; vi < segs; vi++) {
      const a = ui * (segs + 1) + vi;
      const b = a + 1;
      const c = (ui + 1) * (segs + 1) + vi;
      const d = c + 1;
      faceIndices.push(a, b, d, a, d, c);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(faceIndices);
  geo.computeVertexNormals();
  return new THREE.EdgesGeometry(geo);
}

// 4 projects — each gets a unique wireframe shape
const PROJECTS: { id: string; name: string; label: string; url?: string }[] = [
  { id: 'beets', name: 'BEETS', label: 'DEX · LST · Validator', url: 'https://beets.fi' },
  { id: 'balancer', name: 'BALANCER', label: 'Custom AMM Infrastructure', url: 'https://balancer.fi' },
  { id: 'tipz', name: 'TIPZ', label: 'Privacy-First Micro-Tipping' },
  { id: 'terminal', name: 'TERMINAL', label: 'Interactive Dashboards', url: 'https://app.naly.dev' },
];


export function ParaglidingMachine({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const terrainRef = useRef<THREE.LineSegments>(null);
  const cylinderRef = useRef<THREE.LineSegments>(null);
  const ballRef = useRef<THREE.Group>(null);
  const projectRefs = useRef<(THREE.Group | null)[]>([]);

  const noise2D = useMemo(() => createNoise2D(42), []);
  const noise3D = useMemo(() => createNoise3D(99), []);

  // Terrain with FBM displacement and thermal trigger bowl
  const terrainGeo = useMemo(() => {
    const plane = new THREE.PlaneGeometry(8, 8, 48, 48);
    const pos = plane.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      let z = fbm(noise2D, x * 0.4, y * 0.4, 4) * 0.8;

      // Thermal trigger bowl depression
      const dist = Math.sqrt((x - 1) ** 2 + (y - 1) ** 2);
      if (dist < 1.5) {
        z -= (1.5 - dist) * 0.15;
      }
      pos.setZ(i, z);
    }
    plane.rotateX(-Math.PI / 2);
    return new THREE.EdgesGeometry(plane);
  }, [noise2D]);

  // Thermal cylinder geometry (mutable for per-frame deformation)
  const cylinderSegments = 24;
  const cylinderRings = 32;
  const cylinderHeight = 4;
  const ceilingHeight = 3.2;

  const cylinderGeo = useMemo(() => {
    const positions: number[] = [];
    const indices: number[] = [];

    for (let r = 0; r < cylinderRings; r++) {
      const t = r / (cylinderRings - 1);
      const y = t * cylinderHeight;
      const baseRadius = 0.4 + t * 0.2; // wider at top
      const baseIdx = r * cylinderSegments;

      for (let s = 0; s < cylinderSegments; s++) {
        const angle = (s / cylinderSegments) * Math.PI * 2;
        positions.push(Math.cos(angle) * baseRadius, y, Math.sin(angle) * baseRadius);

        // Ring connections
        indices.push(baseIdx + s, baseIdx + (s + 1) % cylinderSegments);
        // Vertical connections
        if (r < cylinderRings - 1) {
          indices.push(baseIdx + s, baseIdx + cylinderSegments + s);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setIndex(indices);
    return geo;
  }, []);

  // Store cylinder base positions for deformation
  const cylinderBasePositions = useMemo(() => {
    const pos = cylinderGeo.attributes.position as THREE.Float32BufferAttribute;
    return new Float32Array(pos.array);
  }, [cylinderGeo]);

  // Single ball geometry
  const ballGeo = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.08, 1));
  }, []);

  // 4 unique project wireframe geometries — denser, larger
  const projectGeos = useMemo(() => [
    new THREE.EdgesGeometry(new THREE.LatheGeometry(                               // BEETS — hyperboloid
      Array.from({ length: 48 }, (_, i) => {
        const t = (i / 47) * 2 - 1; // -1 to 1
        const r = Math.sqrt(1 + t * t) * 0.13;
        return new THREE.Vector2(r, t * 0.22);
      }), 32,
    )),
    createEnneperGeometry(0.3),                                                    // BALANCER — Enneper surface
    createKleinBottleGeometry(0.3),                                        // TIPZ — Klein bottle
    createMobiusGeometry(0.3),                                             // TERMINAL — Möbius strip
  ], []);

  const timeRef = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;

    // Slow rotation — fades to stop as projects appear
    const rotSlowdown = smoothstep((progress - 0.80) / 0.10);
    groupRef.current.rotation.y += delta * 0.04 * (1 - rotSlowdown);

    // During settle, zero out accumulated rotation so projects face camera evenly
    // (prevents perspective-based size differences at settled positions)
    const settleRot = smoothstep((progress - 0.88) / 0.08);
    if (settleRot > 0) {
      groupRef.current.rotation.y *= (1 - settleRot);
    }

    // Terrain rise from flat (18-33%)
    const terrainMorph = smoothstep((progress - 0.18) / 0.15);
    if (terrainRef.current) terrainRef.current.scale.set(1, terrainMorph, 1);

    // Thermal column height grows (38-63%), capped at ceiling
    const columnGrow = smoothstep((progress - 0.38) / 0.25);
    const visibleHeight = columnGrow * ceilingHeight;

    // Deform cylinder: pulsing + turbulence + bulge
    if (cylinderRef.current && progress > 0.38) {
      const pos = cylinderGeo.attributes.position as THREE.Float32BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        const bx = cylinderBasePositions[i * 3];
        const by = cylinderBasePositions[i * 3 + 1];
        const bz = cylinderBasePositions[i * 3 + 2];

        // Only show vertices up to visible height
        if (by > visibleHeight) {
          pos.setXYZ(i, bx, visibleHeight, bz);
          continue;
        }

        const angle = Math.atan2(bz, bx);
        const baseR = Math.sqrt(bx * bx + bz * bz);
        const t = by / cylinderHeight;

        // Pulsing radius oscillation
        const pulse = 1 + 0.08 * Math.sin(time * 2.5 + by * 0.5);

        // Turbulent deformation
        const turb = noise3D(angle * 2, by * 0.8, time * 0.4) * 0.15;

        // Bulge at mid-height
        const bulge = Math.sin(t * Math.PI) * 0.1;

        const r = (baseR + turb + bulge) * pulse;

        pos.setXYZ(i,
          Math.cos(angle) * r,
          by,
          Math.sin(angle) * r,
        );
      }
      pos.needsUpdate = true;
    }

    // Ball: drift → spiral (scroll-driven climb) — fades with thermal
    if (ballRef.current && progress > 0.30) {
      const cx = 1, cz = 1; // thermal center

      const driftT = smoothstep((progress - 0.30) / 0.20);
      const spiralT = smoothstep((progress - 0.50) / 0.10);
      const climbT = smoothstep((progress - 0.50) / 0.35);

      const startX = -2.5, startZ = 0;
      const driftPosX = startX + (cx - startX) * driftT;
      const driftPosZ = startZ + (cz - startZ) * driftT;
      const driftPosY = 0.3 + Math.sin(time * 0.5) * 0.08;

      const spiralHeight = 0.3 + climbT * (visibleHeight - 0.6);
      const spiralAngle = time * 0.8;
      const orbitRadius = 0.28;
      const spiralPosX = Math.cos(spiralAngle) * orbitRadius + cx;
      const spiralPosZ = Math.sin(spiralAngle) * orbitRadius + cz;
      const spiralPosY = spiralHeight;

      const x = driftPosX + (spiralPosX - driftPosX) * spiralT;
      const y = driftPosY + (spiralPosY - driftPosY) * spiralT;
      const z = driftPosZ + (spiralPosZ - driftPosZ) * spiralT;

      ballRef.current.position.set(x, y, z);
      ballRef.current.rotation.x = time * 0.6;
      ballRef.current.rotation.y = time * 0.4;
    }

    // Project wireframes: emerge from thermal center → orbit → settle
    const orbitCenterY = 2.4;
    const orbitRadiusX = 1.4;
    const orbitRadiusZ = 0.8;
    const baseSpeed = 0.6;

    // Settle transition: orbit → evenly spaced horizontal (0.88–0.96)
    const settleT = smoothstep((progress - 0.88) / 0.08);

    for (let i = 0; i < PROJECTS.length; i++) {
      const pg = projectRefs.current[i];
      if (!pg) continue;

      // Phase A — Emerge from center (0.82–0.88, staggered per shape)
      const stagger = i * 0.02;
      const emergeT = smoothstep((progress - (0.82 + stagger)) / 0.06);

      // Phase B — Orbit ramps up after emerge completes
      const orbitT = smoothstep((progress - (0.88 + stagger)) / 0.06);

      // Orbit slows as projects settle into final positions
      const orbitSlow = 1 - settleT * 0.85;

      const phase = (i / 4) * Math.PI * 2;
      const angle = time * baseSpeed * orbitSlow * orbitT + phase;
      const bobY = Math.sin(time * 0.4 + i * 1.5) * 0.06;

      // Radius expands from 0 → full during emerge
      const radiusScale = emergeT;
      const orbX = Math.cos(angle) * orbitRadiusX * radiusScale;
      const orbY = orbitCenterY + bobY * emergeT;
      const orbZ = Math.sin(angle) * orbitRadiusZ * radiusScale;

      // Settled positions: evenly spread across horizontal
      const settledX = -1.8 + (i / 3) * 3.6; // [-1.8, -0.6, 0.6, 1.8]
      const settledY = orbitCenterY;
      const settledZ = 0;

      pg.position.set(
        orbX + (settledX - orbX) * settleT,
        orbY + (settledY - orbY) * settleT,
        orbZ + (settledZ - orbZ) * settleT,
      );

      // Scale from 0 → 1 during emerge
      pg.scale.setScalar(emergeT);

      // Rotation builds gradually — ease-in: slow start, builds momentum
      const spinRamp = emergeT * emergeT;
      const sx = [0.6, 0.35, 0.5, 0.75][i];
      const sy = [0.3, 0.55, 0.7, 0.2][i];
      const sz = [0.15, 0.4, 0.07, 0.35][i];
      pg.rotation.x += delta * sx * spinRamp;
      pg.rotation.y += delta * sy * spinRamp;
      pg.rotation.z += delta * sz * spinRamp;
    }

  });

  // Opacity calculations
  // Thermal + ball fade during 0.75–0.85
  const thermalFade = 1 - smoothstep((progress - 0.75) / 0.10);
  const terrainOpacity = smoothstep((progress - 0.10) / 0.08) * 0.3;
  const cylinderOpacity = progress > 0.38 ? smoothstep((progress - 0.38) / 0.1) * 0.35 * thermalFade : 0;
  const ballOpacity = progress > 0.30 ? smoothstep((progress - 0.30) / 0.1) * 0.3 * thermalFade : 0;

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Terrain — persists through end */}
      <lineSegments ref={terrainRef} geometry={terrainGeo}>
        <lineBasicMaterial color={INK} transparent opacity={terrainOpacity} />
      </lineSegments>

      {/* Thermal column — fades at 0.75 */}
      {cylinderOpacity > 0.01 && (
        <lineSegments ref={cylinderRef} geometry={cylinderGeo} position={[1, 0, 1]}>
          <lineBasicMaterial color={INK} transparent opacity={cylinderOpacity} />
        </lineSegments>
      )}

      {/* Drifting / spiralling ball — fades with thermal */}
      {ballOpacity > 0.01 && (
        <group ref={ballRef}>
          <lineSegments geometry={ballGeo}>
            <lineBasicMaterial color={INK} transparent opacity={ballOpacity} />
          </lineSegments>
        </group>
      )}

      {/* Project wireframes — fade in after thermal clears */}
      {PROJECTS.map((project, i) => {
        const stagger = i * 0.02;
        const pOpacity = smoothstep((progress - (0.82 + stagger)) / 0.08) * 0.3;

        return (
          <group
            key={project.id}
            ref={(el) => { projectRefs.current[i] = el; }}
          >
            <lineSegments geometry={projectGeos[i]}>
              <lineBasicMaterial color={INK} transparent opacity={pOpacity} />
            </lineSegments>
          </group>
        );
      })}

      {/* Project labels — stationary, evenly spaced across horizontal */}
      {PROJECTS.map((project, i) => {
        const stagger = i * 0.02;
        const labelOp = smoothstep((progress - (0.86 + stagger)) / 0.08);
        const labelX = -1.8 + (i / 3) * 3.6;

        return labelOp > 0.01 ? (
          <Html
            key={`label-${project.id}`}
            center
            position={[labelX, 1.85, 0]}
            distanceFactor={7}
            style={{
              opacity: labelOp,
              pointerEvents: labelOp > 0.5 ? 'auto' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-node-label"
              >
                <span className="portfolio-node-name">{project.name}</span>
                <span className="portfolio-node-desc">{project.label}</span>
              </a>
            ) : (
              <span className="portfolio-node-label">
                <span className="portfolio-node-name">{project.name}</span>
                <span className="portfolio-node-desc">{project.label} · Coming Soon</span>
              </span>
            )}
          </Html>
        ) : null;
      })}
    </group>
  );
}
