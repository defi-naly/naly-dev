// @ts-nocheck
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const INK = '#1a1916';
const NODE_COUNT = 64;
const K_NEIGHBORS = 6;

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

function fibonacci(n: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

function starPositions(n: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  points.push(new THREE.Vector3(0, 0, 0));
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 1; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
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

function starEdges(n: number): number[] {
  const indices: number[] = [];
  for (let i = 1; i < n; i++) {
    indices.push(0, i);
  }
  return indices;
}

interface NodeData {
  rotSpeed: { x: number; y: number };
  seed: number;
}

export function SovereigntyMachine({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const starLinesRef = useRef<THREE.LineSegments>(null);
  const meshLinesRef = useRef<THREE.LineSegments>(null);

  const decentralized = useMemo(() => fibonacci(NODE_COUNT, 1.8), []);
  const centralized = useMemo(() => starPositions(NODE_COUNT, 1.8), []);

  const starEdgeIndices = useMemo(() => starEdges(NODE_COUNT), []);
  const meshEdgeIndices = useMemo(() => kNearestEdges(decentralized, K_NEIGHBORS), [decentralized]);
  const denseEdgeIndices = useMemo(() => kNearestEdges(decentralized, 14), [decentralized]);

  const nodeGeo = useMemo(() => new THREE.IcosahedronGeometry(0.06, 1), []);

  const starLineGeo = useMemo(() => {
    const pos = new Float32Array(starEdgeIndices.length * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [starEdgeIndices]);

  const meshLineGeo = useMemo(() => {
    const pos = new Float32Array(meshEdgeIndices.length * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [meshEdgeIndices]);

  const denseLineGeo = useMemo(() => {
    const pos = new Float32Array(denseEdgeIndices.length * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [denseEdgeIndices]);

  const timeRef = useRef(0);
  const failedNodesRef = useRef<Set<number>>(new Set());
  const failTimerRef = useRef(0);

  const nodeData = useMemo<NodeData[]>(() => {
    const rng = seededRandom(500);
    const data: NodeData[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      data.push({
        rotSpeed: {
          x: 0.15 + rng() * 0.35,
          y: 0.15 + rng() * 0.35,
        },
        seed: rng() * Math.PI * 2,
      });
    }
    return data;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    timeRef.current += delta;
    const time = timeRef.current;

    groupRef.current.rotation.y += delta * 0.04;

    const morphT = smoothstep((progress - 0.35) / 0.25);

    const sunT = smoothstep((progress - 0.80) / 0.20);
    const endT = smoothstep((progress - 1.55) / 0.20);
    const sunScale = (1.0 - sunT * 0.55) * (1 - endT * 0.6);
    const sunTargetX = -2.0;
    const sunTargetY = 1.5;
    groupRef.current.scale.setScalar(sunScale);
    groupRef.current.position.set(
      sunTargetX * sunT,
      0.2 + sunTargetY * sunT + endT * 0.8,
      0,
    );

    const currentPositions: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const cp = centralized[i];
      const dp = decentralized[i];
      const seed = nodeData[i].seed;

      const driftX = Math.cos(time * 0.3 + seed) * 0.06;
      const driftY = Math.sin(time * 0.25 + seed * 1.3) * 0.06;
      const driftZ = Math.cos(time * 0.35 + seed * 0.7) * 0.06;

      const baseX = cp.x + (dp.x - cp.x) * morphT + driftX;
      const baseY = cp.y + (dp.y - cp.y) * morphT + driftY;
      const baseZ = cp.z + (dp.z - cp.z) * morphT + driftZ;

      currentPositions.push(new THREE.Vector3(baseX, baseY, baseZ));
    }

    if (progress > 0.75 && progress < 0.80) {
      failTimerRef.current += delta;
      if (failTimerRef.current > 2.5) {
        failTimerRef.current = 0;
        failedNodesRef.current.clear();
        const n1 = 1 + Math.floor(Math.random() * (NODE_COUNT - 1));
        failedNodesRef.current.add(n1);
        if (Math.random() > 0.5) {
          const n2 = 1 + Math.floor(Math.random() * (NODE_COUNT - 1));
          failedNodesRef.current.add(n2);
        }
      }
      if (failTimerRef.current > 1.5) {
        failedNodesRef.current.clear();
      }
    } else {
      failedNodesRef.current.clear();
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      const nodeGroup = nodeRefs.current[i];
      if (!nodeGroup) continue;

      const pos = currentPositions[i];
      nodeGroup.position.set(pos.x, pos.y, pos.z);

      let scale = 0.8 * (1 - morphT) + 1.2 * morphT;

      if (i === 0) {
        const birthT = smoothstep((progress - 0.06) / 0.08);
        scale *= 5 * (1 - birthT) + 1 * birthT;
      }

      if (failedNodesRef.current.has(i)) {
        scale *= 0.3;
      }

      nodeGroup.scale.set(scale, scale, scale);

      const nd = nodeData[i];
      nodeGroup.rotation.x += delta * nd.rotSpeed.x;
      nodeGroup.rotation.y += delta * nd.rotSpeed.y;
    }

    const hubGroup = nodeRefs.current[0];
    if (hubGroup) {
      const hubMat = (hubGroup.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
      if (progress > 0.24 && progress < 0.40) {
        const flash = Math.sin(time * 4) * 0.5 + 0.5;
        hubMat.color.set(flash > 0.6 ? '#cc2222' : INK);
      } else {
        hubMat.color.set(INK);
      }
    }

    const growT = smoothstep((progress - 0.18) / 0.12);

    const starPos = starLineGeo.attributes.position as THREE.BufferAttribute;
    const hubPos = currentPositions[0];
    for (let i = 0; i < starEdgeIndices.length; i += 2) {
      starPos.setXYZ(i, hubPos.x, hubPos.y, hubPos.z);
      const spokeIdx = starEdgeIndices[i + 1];
      const sp = currentPositions[spokeIdx];
      starPos.setXYZ(i + 1,
        hubPos.x + (sp.x - hubPos.x) * growT,
        hubPos.y + (sp.y - hubPos.y) * growT,
        hubPos.z + (sp.z - hubPos.z) * growT,
      );
    }
    starPos.needsUpdate = true;

    const meshPos = meshLineGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < meshEdgeIndices.length; i++) {
      const nodeIdx = meshEdgeIndices[i];
      const p = currentPositions[nodeIdx];
      meshPos.setXYZ(i, p.x, p.y, p.z);
    }
    meshPos.needsUpdate = true;

    const densePos = denseLineGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < denseEdgeIndices.length; i++) {
      const nodeIdx = denseEdgeIndices[i];
      const p = currentPositions[nodeIdx];
      densePos.setXYZ(i, p.x, p.y, p.z);
    }
    densePos.needsUpdate = true;
  });

  const endFade = 1 - smoothstep((progress - 1.55) / 0.20);
  const nodeSunFade = 1 - smoothstep((progress - 0.80) / 0.15);
  const hubOpacity = smoothstep((progress - 0.06) / 0.08) * 0.18 * endFade * nodeSunFade;
  const spokeOpacity = smoothstep((progress - 0.12) / 0.10) * 0.18 * endFade * nodeSunFade;
  const starOpacity = progress > 0.1
    ? (1 - smoothstep((progress - 0.35) / 0.25)) * 0.12
    : 0;
  const meshOpacity = smoothstep((progress - 0.35) / 0.25) * 0.12 * endFade;
  const denseOpacity = smoothstep((progress - 0.60) / 0.15) * 0.08 * endFade;

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {nodeData.map((_, i) => (
        <group key={i} ref={(el) => { nodeRefs.current[i] = el; }}>
          <mesh geometry={nodeGeo}>
            <meshBasicMaterial wireframe color={INK} transparent opacity={i === 0 ? hubOpacity : spokeOpacity} />
          </mesh>
        </group>
      ))}

      {starOpacity > 0.01 && (
        <lineSegments ref={starLinesRef} geometry={starLineGeo}>
          <lineBasicMaterial color={INK} transparent opacity={starOpacity} />
        </lineSegments>
      )}

      {meshOpacity > 0.01 && (
        <lineSegments ref={meshLinesRef} geometry={meshLineGeo}>
          <lineBasicMaterial color={INK} transparent opacity={meshOpacity} />
        </lineSegments>
      )}

      {denseOpacity > 0.01 && (
        <lineSegments geometry={denseLineGeo}>
          <lineBasicMaterial color={INK} transparent opacity={denseOpacity} />
        </lineSegments>
      )}
    </group>
  );
}
