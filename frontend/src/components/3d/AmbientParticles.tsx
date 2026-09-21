import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface AmbientParticlesProps {
  count?: number
}

export function AmbientParticles({ count = 220 }: AmbientParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const cols = new Float32Array(count * 3)
    const colorChoices = [
      new THREE.Color('#1e88ff'),
      new THREE.Color('#00f0ff'),
      new THREE.Color('#6366f1'),
      new THREE.Color('#38bdf8'),
      new THREE.Color('#e0e7ff'),
    ]

    for (let i = 0; i < count; i++) {
      // Spread across 3D bounding box
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8

      const col = colorChoices[Math.floor(Math.random() * colorChoices.length)]
      cols[i * 3] = col.r
      cols[i * 3 + 1] = col.g
      cols[i * 3 + 2] = col.b
    }

    return { positions: pos, colors: cols }
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.02
    pointsRef.current.rotation.x = Math.sin(t * 0.015) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}
