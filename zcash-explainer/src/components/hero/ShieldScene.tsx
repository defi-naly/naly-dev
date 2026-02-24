import { Canvas } from '@react-three/fiber'
import { ShieldMesh } from './ShieldMesh'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ShieldSceneProps {
  morphProgress: number
}

export function ShieldScene({ morphProgress }: ShieldSceneProps) {
  const reduced = useReducedMotion()

  return (
    <Canvas
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 1 }}
    >
      <ShieldMesh morphProgress={morphProgress} reducedMotion={reduced} />
    </Canvas>
  )
}
