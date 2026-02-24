import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createNoise3D } from '../../utils/noise'

const GOLD = '#c9a84c'
const GLOW_GOLD = '#c9a84c'

// ƶ shape dimensions
const BAR_WIDTH = 1.4
const BAR_THICKNESS = 0.25
const DEPTH = 0.3
const TOTAL_HEIGHT = 1.8

// Wireframe density
const SEGS_PER_UNIT = 16
const DEPTH_STEPS = 6

// Derived
const INNER_HEIGHT = TOTAL_HEIGHT - 2 * BAR_THICKNESS
const DIAG_LENGTH = Math.sqrt(BAR_WIDTH ** 2 + INNER_HEIGHT ** 2)
const TOP_Y = (TOTAL_HEIGHT - BAR_THICKNESS) / 2
const BOTTOM_Y = -TOP_Y

// Vertical strokes (Zcash ƶ)
const STROKE_HEIGHT = 0.35

// Diagonal horizontal width (perpendicular thickness ≈ BAR_THICKNESS * 0.85)
const DIAG_THICK = BAR_THICKNESS * 0.85
const DIAG_HW = (DIAG_THICK * DIAG_LENGTH) / INNER_HEIGHT

// Half dimensions
const hw = BAR_WIDTH / 2
const ht = BAR_THICKNESS / 2
const hs = BAR_THICKNESS / 2

// Key Y coordinates
const tTop = TOP_Y + ht
const tBot = TOP_Y - ht
const bTop = BOTTOM_Y + ht
const bBot = BOTTOM_Y - ht
const sTop = tTop + STROKE_HEIGHT
const sBot = bBot - STROKE_HEIGHT

/** Add subdivided segment points to array */
function addSeg(
  pts: [number, number][],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const segs = Math.max(1, Math.round(len * SEGS_PER_UNIT))
  for (let i = 1; i <= segs; i++) {
    const t = i / segs
    pts.push([x1 + dx * t, y1 + dy * t])
  }
}

/** Build the ƶ outline as an array of 2D points */
function buildOutline(): [number, number][] {
  const pts: [number, number][] = [[-hw, tTop]]

  // Top bar upper edge → top stroke → continue right
  addSeg(pts, -hw, tTop, -hs, tTop)
  addSeg(pts, -hs, tTop, -hs, sTop)
  addSeg(pts, -hs, sTop, hs, sTop)
  addSeg(pts, hs, sTop, hs, tTop)
  addSeg(pts, hs, tTop, hw, tTop)

  // Right side of top bar
  addSeg(pts, hw, tTop, hw, tBot)

  // Diagonal right edge → bottom bar
  addSeg(pts, hw, tBot, -hw + DIAG_HW, bTop)

  // Top of bottom bar (right portion)
  addSeg(pts, -hw + DIAG_HW, bTop, hw, bTop)

  // Right side of bottom bar
  addSeg(pts, hw, bTop, hw, bBot)

  // Bottom bar lower edge → bottom stroke → continue left
  addSeg(pts, hw, bBot, hs, bBot)
  addSeg(pts, hs, bBot, hs, sBot)
  addSeg(pts, hs, sBot, -hs, sBot)
  addSeg(pts, -hs, sBot, -hs, bBot)
  addSeg(pts, -hs, bBot, -hw, bBot)

  // Left side of bottom bar
  addSeg(pts, -hw, bBot, -hw, bTop)

  // Diagonal left edge → top bar
  addSeg(pts, -hw, bTop, hw - DIAG_HW, tBot)

  // Bottom of top bar (left portion)
  addSeg(pts, hw - DIAG_HW, tBot, -hw, tBot)

  // Closes back to first point via index wrapping
  return pts
}

/** Build tube geometry from outline — walls only, uniform grid wireframe */
function buildTubeGeo(outline: [number, number][]): THREE.BufferGeometry {
  const n = outline.length
  const layers = DEPTH_STEPS + 1
  const halfD = DEPTH / 2

  const positions: number[] = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < layers; j++) {
      const pt = outline[i]!
      positions.push(pt[0], pt[1], -halfD + (DEPTH * j) / DEPTH_STEPS)
    }
  }

  const indices: number[] = []
  for (let i = 0; i < n; i++) {
    const next = (i + 1) % n
    for (let j = 0; j < DEPTH_STEPS; j++) {
      const a = i * layers + j
      const b = i * layers + j + 1
      const c = next * layers + j + 1
      const d = next * layers + j
      indices.push(a, d, c, a, c, b)
    }
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3),
  )
  geo.setIndex(indices)
  geo.center()
  return geo
}

interface ShieldMeshProps {
  morphProgress: number
  reducedMotion: boolean
}

export function ShieldMesh({ morphProgress, reducedMotion }: ShieldMeshProps) {
  const groupRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  const noise3D = useMemo(() => createNoise3D(42), [])

  const { geo, base } = useMemo(() => {
    const outline = buildOutline()
    const geometry = buildTubeGeo(outline)

    return {
      geo: geometry,
      base: new Float32Array(geometry.getAttribute('position').array),
    }
  }, [])

  const mainMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color(GOLD),
        transparent: true,
        opacity: 1,
      }),
    [],
  )

  const glowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color(GLOW_GOLD),
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
    [],
  )

  const bloomMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color(GLOW_GOLD),
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      }),
    [],
  )

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Dynamic x-position: keep bloom+morph+rotation within frustum
    const maxExtent = 1.05
    const safeX = state.viewport.width / 2 - maxExtent
    groupRef.current.position.x = Math.max(0, Math.min(1.2, safeX))

    timeRef.current += delta
    const time = timeRef.current

    groupRef.current.scale.setScalar(1.0 + morphProgress * 0.06)

    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.15
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.04

      const amp = 0.012
      const pos = geo.getAttribute('position') as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      for (let i = 0; i < arr.length; i += 3) {
        const bx = base[i]!
        const by = base[i + 1]!
        const bz = base[i + 2]!
        arr[i] = bx + noise3D(bx * 3, by * 3, time * 0.4) * amp
        arr[i + 1] = by + noise3D(bx * 3 + 50, by * 3, time * 0.4) * amp
        arr[i + 2] = bz + noise3D(bx * 3 + 100, by * 3, time * 0.4) * amp
      }
      pos.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      <mesh geometry={geo} material={mainMat} />
      <group scale={1.06}>
        <mesh geometry={geo} material={glowMat} />
      </group>
      <group scale={1.15}>
        <mesh geometry={geo} material={bloomMat} />
      </group>
    </group>
  )
}
