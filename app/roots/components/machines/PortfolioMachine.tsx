// @ts-nocheck
'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PORTFOLIO_NODES } from '../../data/portfolio';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const INK = '#1a1916';

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

interface NodeDef {
  finalPos: THREE.Vector3;
  seed: number;
  dataIndex: number;
}

function isInternal(url: string): boolean {
  return url.startsWith('/');
}

function buildNodes(rng: () => number): NodeDef[] {
  const count = PORTFOLIO_NODES.length;
  const radius = 1.6;
  return PORTFOLIO_NODES.map((_, i) => ({
    finalPos: new THREE.Vector3(
      Math.cos((i / count) * Math.PI * 2 - Math.PI / 2) * radius,
      Math.sin((i / count) * Math.PI * 2 - Math.PI / 2) * radius,
      0,
    ),
    seed: rng() * Math.PI * 2,
    dataIndex: i,
  }));
}

function buildEdges(nodes: NodeDef[]): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    edges.push([i, (i + 1) % nodes.length]);
  }
  return edges;
}

const NODE_RADIUS = 0.28;

export function PortfolioMachine({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const linesRef = useRef<THREE.LineSegments>(null);
  const timeRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const rng = useMemo(() => seededRandom(777), []);
  const nodes = useMemo(() => buildNodes(rng), [rng]);
  const edges = useMemo(() => buildEdges(nodes), [nodes]);

  const nodeGeo = useMemo(() => new THREE.IcosahedronGeometry(NODE_RADIUS, 1), []);

  const lineGeo = useMemo(() => {
    const pos = new Float32Array(edges.length * 2 * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [edges]);

  const nodeStagger = useMemo(() => {
    return nodes.map((_, i) => ({
      emergeStart: 0.05 + i * 0.06,
      emergeEnd: 0.20 + i * 0.06,
      labelStart: 0.30 + i * 0.05,
    }));
  }, [nodes]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (!reducedMotion) {
      timeRef.current += delta;
    }
    const time = timeRef.current;

    if (!reducedMotion) {
      groupRef.current.rotation.z += delta * 0.21;
    }

    for (let i = 0; i < nodes.length; i++) {
      const nodeGroup = nodeRefs.current[i];
      if (!nodeGroup) continue;

      const node = nodes[i];
      const stagger = nodeStagger[i];

      const emergeT = reducedMotion ? 1 : smoothstep((progress - stagger.emergeStart) / (stagger.emergeEnd - stagger.emergeStart));
      const finalY = node.finalPos.y;
      const startY = finalY - 2;

      const driftX = reducedMotion ? 0 : Math.cos(time * 0.3 + node.seed) * 0.04;
      const driftY = reducedMotion ? 0 : Math.sin(time * 0.25 + node.seed * 1.3) * 0.04;
      const driftZ = reducedMotion ? 0 : Math.cos(time * 0.35 + node.seed * 0.7) * 0.015;

      nodeGroup.position.set(
        node.finalPos.x + driftX,
        startY + (finalY - startY) * emergeT + driftY,
        node.finalPos.z + driftZ,
      );

      const breathe = reducedMotion ? 1 : 1.0 + Math.sin(time * 0.8 + node.seed) * 0.04;
      const hoverScale = hoveredNode === i ? 1.15 : 1.0;
      const scale = emergeT * breathe * hoverScale;
      nodeGroup.scale.setScalar(scale);

      if (!reducedMotion) {
        nodeGroup.rotation.x += delta * 0.12;
        nodeGroup.rotation.y += delta * 0.08;
      }
    }

    const edgeGrowT = reducedMotion ? 1 : smoothstep((progress - 0.20) / 0.30);
    const pos = lineGeo.attributes.position as THREE.BufferAttribute;

    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      const nodeA = nodeRefs.current[a];
      const nodeB = nodeRefs.current[b];
      if (!nodeA || !nodeB) continue;

      const ax = nodeA.position.x, ay = nodeA.position.y, az = nodeA.position.z;
      const bx = nodeB.position.x, by = nodeB.position.y, bz = nodeB.position.z;

      const mx = (ax + bx) * 0.5;
      const my = (ay + by) * 0.5;
      const mz = (az + bz) * 0.5;

      const idx = e * 6;
      pos.array[idx]     = mx + (ax - mx) * edgeGrowT;
      pos.array[idx + 1] = my + (ay - my) * edgeGrowT;
      pos.array[idx + 2] = mz + (az - mz) * edgeGrowT;
      pos.array[idx + 3] = mx + (bx - mx) * edgeGrowT;
      pos.array[idx + 4] = my + (by - my) * edgeGrowT;
      pos.array[idx + 5] = mz + (bz - mz) * edgeGrowT;
    }
    pos.needsUpdate = true;
  });

  const globalOpacity = smoothstep(progress / 0.15);
  const nodeOpacity = 0.22 * globalOpacity;
  const edgeOpacity = smoothstep((progress - 0.20) / 0.30) * 0.14 * globalOpacity;

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {nodes.map((node, i) => {
        const stagger = nodeStagger[i];
        const labelOpacity = reducedMotion ? 1 : smoothstep((progress - stagger.labelStart) / 0.15);
        const portfolioItem = PORTFOLIO_NODES[node.dataIndex];

        return (
          <group
            key={i}
            ref={(el) => { nodeRefs.current[i] = el; }}
          >
            <mesh
              geometry={nodeGeo}
              onPointerOver={() => setHoveredNode(i)}
              onPointerOut={() => setHoveredNode(null)}
            >
              <meshBasicMaterial wireframe color={INK} transparent opacity={nodeOpacity} />
            </mesh>

            {labelOpacity > 0.01 && (
              <Html
                center
                distanceFactor={8}
                style={{
                  opacity: labelOpacity * globalOpacity,
                  transition: 'opacity 0.2s',
                  pointerEvents: labelOpacity > 0.5 ? 'auto' : 'none',
                }}
              >
                <a
                  href={portfolioItem.url}
                  className="portfolio-node-label"
                  {...(isInternal(portfolioItem.url) ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                >
                  <span className="portfolio-node-name">{portfolioItem.name}</span>
                  <span className="portfolio-node-desc">{portfolioItem.label}</span>
                </a>
              </Html>
            )}
          </group>
        );
      })}

      {edgeOpacity > 0.01 && (
        <lineSegments ref={linesRef} geometry={lineGeo}>
          <lineBasicMaterial color={INK} transparent opacity={edgeOpacity} />
        </lineSegments>
      )}
    </group>
  );
}
