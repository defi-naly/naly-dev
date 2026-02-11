import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createNoise3D } from '../../utils/noise';

const INK = '#1a1916';
const NODE_COUNT = 48;
const K_NEIGHBORS = 7;
const BIG_INNER_RADIUS = 1.5;
const SMALL_INNER_RADIUS = 0.28;

function smoothstep(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function fibonacciSphere(n: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ));
  }
  return points;
}

function kNearestEdges(positions: THREE.Vector3[], k: number): number[] {
  const indices: number[] = [];
  const added = new Set<string>();
  for (let i = 0; i < positions.length; i++) {
    const dists = positions.map((p, j) => ({ j, d: positions[i].distanceTo(p) }))
      .filter((x) => x.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    for (const { j } of dists) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!added.has(key)) {
        added.add(key);
        indices.push(i, j);
      }
    }
  }
  return indices;
}

function createNodeGeo(radius: number): THREE.BufferGeometry {
  return new THREE.IcosahedronGeometry(radius, 3);
}

interface SmallNode {
  innerGeo: THREE.BufferGeometry;
  target: THREE.Vector3;
  rotSpeed: { x: number; y: number };
  breathPhase: number;
}

export function DefiMachine({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const bigInnerRef = useRef<THREE.Mesh>(null);
  const nodeGroupRefs = useRef<(THREE.Group | null)[]>([]);
  const timeRef = useRef(0);

  const noise3D = useMemo(() => createNoise3D(77), []);
  // --- Big genesis icosahedron ---
  const bigInnerGeo = useMemo(() => new THREE.IcosahedronGeometry(BIG_INNER_RADIUS, 4), []);
  const bigInnerBase = useMemo(() => {
    const pos = bigInnerGeo.attributes.position as THREE.BufferAttribute;
    return new Float32Array(pos.array);
  }, [bigInnerGeo]);

  // --- Node positions and shapes (all 48) ---
  const nodeTargets = useMemo(() => {
    const pts = fibonacciSphere(NODE_COUNT, 2.0);
    // Genesis node recedes to the back of the network, not upward
    pts[0] = new THREE.Vector3(0, 0, 2.0);
    return pts;
  }, []);

  // Nodes 1–47 get small geometry; node 0 is the big genesis
  const smallNodes: SmallNode[] = useMemo(() => {
    const rand = seededRandom(500);
    return nodeTargets.map((target) => {
      const innerGeo = createNodeGeo(SMALL_INNER_RADIUS);
      return {
        innerGeo,
        target,
        rotSpeed: { x: 0.2 + rand() * 0.4, y: 0.15 + rand() * 0.35 },
        breathPhase: rand() * Math.PI * 2,
      };
    });
  }, [nodeTargets]);

  // --- Network edges (all 28 nodes) ---
  const edgeIndices = useMemo(() => kNearestEdges(nodeTargets, K_NEIGHBORS), [nodeTargets]);

  const edgeLineGeo = useMemo(() => {
    // Each edge pair needs 4 vertices for grow-from-midpoint effect (2 segments per edge)
    // But simpler: use standard 2-vertex-per-edge, grow via position lerp
    const pos = new Float32Array(edgeIndices.length * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [edgeIndices]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;

    // Slow rotation
    groupRef.current.rotation.y += delta * 0.04;
    groupRef.current.rotation.x += delta * 0.01;

    // --- Phase progress values ---
    const shrinkT = smoothstep((progress - 0.30) / 0.25);   // genesis shrink + move to target
    const emergeT = smoothstep((progress - 0.30) / 0.25);   // nodes 1-27 emerge from center
    const edgeGrowT = smoothstep((progress - 0.55) / 0.15); // edges grow from midpoints
    const dissolveT = smoothstep((progress - 0.90) / 0.10); // everything dissolves
    // Contraction factor: at dissolve, nodes lerp back toward center
    const contractT = dissolveT;

    // --- Big inner icosahedron vertex noise drift ---
    if (bigInnerRef.current) {
      // Noise amplitude tapers down as it shrinks
      const noiseAmp = 0.02 * (1 - shrinkT * 0.8);
      const pos = bigInnerGeo.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        const bx = bigInnerBase[i];
        const by = bigInnerBase[i + 1];
        const bz = bigInnerBase[i + 2];
        arr[i] = bx + noise3D(bx * 2, by * 2, time * 0.2) * noiseAmp;
        arr[i + 1] = by + noise3D(bx * 2 + 50, by * 2, time * 0.2) * noiseAmp;
        arr[i + 2] = bz + noise3D(bx * 2 + 100, by * 2, time * 0.2) * noiseAmp;
      }
      pos.needsUpdate = true;
    }

    // --- Current positions for all 28 nodes (for edge computation) ---
    const currentPositions: THREE.Vector3[] = [];

    // Node 0: genesis position (from shrinkT lerp + drift, contracting back at dissolve)
    const t0 = nodeTargets[0];
    const drift0X = Math.sin(time * 0.5 + smallNodes[0].breathPhase) * 0.03;
    const drift0Y = Math.cos(time * 0.4 + smallNodes[0].breathPhase * 1.3) * 0.03;
    const drift0Z = Math.sin(time * 0.45 + smallNodes[0].breathPhase * 0.7) * 0.03;
    const base0X = t0.x * shrinkT;
    const base0Y = t0.y * shrinkT;
    const base0Z = t0.z * shrinkT;
    currentPositions.push(new THREE.Vector3(
      (base0X + drift0X) * (1 - contractT),
      (base0Y + drift0Y) * (1 - contractT),
      (base0Z + drift0Z) * (1 - contractT),
    ));

    // Nodes 1–27: small node groups
    for (let i = 1; i < NODE_COUNT; i++) {
      const grpIdx = i - 1; // nodeGroupRefs index
      const grp = nodeGroupRefs.current[grpIdx];
      const node = smallNodes[i];
      if (!grp) {
        currentPositions.push(node.target.clone().multiplyScalar(emergeT));
        continue;
      }

      // Lerp from center to target, then contract back at dissolve
      const basePx = node.target.x * emergeT;
      const basePy = node.target.y * emergeT;
      const basePz = node.target.z * emergeT;

      // Positional drift
      const driftX = Math.sin(time * 0.5 + node.breathPhase) * 0.03;
      const driftY = Math.cos(time * 0.4 + node.breathPhase * 1.3) * 0.03;
      const driftZ = Math.sin(time * 0.45 + node.breathPhase * 0.7) * 0.03;

      // Contract toward center during dissolve
      const px = (basePx + driftX) * (1 - contractT);
      const py = (basePy + driftY) * (1 - contractT);
      const pz = (basePz + driftZ) * (1 - contractT);

      grp.position.set(px, py, pz);

      // Scale: emerge + breathing, shrink during contraction
      const breathe = 1.0 + Math.sin(time * 0.8 + node.breathPhase) * 0.04;
      grp.scale.setScalar(emergeT * breathe * (1 - contractT * 0.5));

      // Self-rotation
      grp.rotation.x += delta * node.rotSpeed.x;
      grp.rotation.y += delta * node.rotSpeed.y;

      currentPositions.push(new THREE.Vector3(px, py, pz));
    }

    // --- Update edge line positions (grow from midpoint outward) ---
    const edgePos = edgeLineGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < edgeIndices.length; i += 2) {
      const idxA = edgeIndices[i];
      const idxB = edgeIndices[i + 1];
      const pA = currentPositions[idxA];
      const pB = currentPositions[idxB];

      // Midpoint
      const mx = (pA.x + pB.x) * 0.5;
      const my = (pA.y + pB.y) * 0.5;
      const mz = (pA.z + pB.z) * 0.5;

      // Grow from midpoint outward
      const startX = mx + (pA.x - mx) * edgeGrowT;
      const startY = my + (pA.y - my) * edgeGrowT;
      const startZ = mz + (pA.z - mz) * edgeGrowT;

      const endX = mx + (pB.x - mx) * edgeGrowT;
      const endY = my + (pB.y - my) * edgeGrowT;
      const endZ = mz + (pB.z - mz) * edgeGrowT;

      edgePos.setXYZ(i, startX, startY, startZ);
      edgePos.setXYZ(i + 1, endX, endY, endZ);
    }
    edgePos.needsUpdate = true;

    // Also update genesis mesh positions to include drift + contraction
    if (bigInnerRef.current) {
      bigInnerRef.current.position.set(
        (t0.x * shrinkT + drift0X) * (1 - contractT),
        (t0.y * shrinkT + drift0Y) * (1 - contractT),
        (t0.z * shrinkT + drift0Z) * (1 - contractT),
      );
      bigInnerRef.current.scale.setScalar(
        (1.0 + ((SMALL_INNER_RADIUS / BIG_INNER_RADIUS) - 1.0) * shrinkT) * (1 - contractT * 0.5)
      );
      bigInnerRef.current.rotation.x += delta * 0.25;
      bigInnerRef.current.rotation.y += delta * 0.20;

    }

  });

  // --- Opacity calculations ---

  // Big inner: fade in 0.0–0.15, persist, dissolve 0.90–1.0
  const bigInnerOpacity = smoothstep(progress / 0.18) * 0.18 * (1 - smoothstep((progress - 0.90) / 0.10));

  // Small node inner (nodes 1–27): fade in 0.30–0.45, dissolve 0.90–1.0
  const smallInnerOpacity = progress < 0.30
    ? 0
    : smoothstep((progress - 0.30) / 0.15) * 0.22 * (1 - smoothstep((progress - 0.90) / 0.10));

  // Network edges: fade in 0.55–0.70, dissolve 0.90–1.0
  const edgeOpacity = progress < 0.55
    ? 0
    : smoothstep((progress - 0.55) / 0.15) * 0.22 * (1 - smoothstep((progress - 0.90) / 0.10));

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Big genesis icosahedron (node 0) */}
      {bigInnerOpacity > 0.01 && (
        <mesh ref={bigInnerRef} geometry={bigInnerGeo}>
          <meshBasicMaterial wireframe color={INK} transparent opacity={bigInnerOpacity} />
        </mesh>
      )}

      {/* Small nodes — nodes 1–47 only */}
      {smallNodes.slice(1).map((node, i) => (
        <group
          key={`node-${i + 1}`}
          ref={(el: THREE.Group | null) => { nodeGroupRefs.current[i] = el; }}
        >
          {smallInnerOpacity > 0.01 && (
            <mesh geometry={node.innerGeo}>
              <meshBasicMaterial wireframe color={INK} transparent opacity={smallInnerOpacity} />
            </mesh>
          )}
        </group>
      ))}

      {/* Network edges */}
      {edgeOpacity > 0.01 && (
        <lineSegments geometry={edgeLineGeo}>
          <lineBasicMaterial color={INK} transparent opacity={edgeOpacity} />
        </lineSegments>
      )}
    </group>
  );
}
