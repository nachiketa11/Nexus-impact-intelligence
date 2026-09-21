import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface WatchModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function WatchModel({ position = [1.6, 0.9, 0.4], rotation = [-0.15, -0.4, 0.1] }: WatchModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const mouseX = state.pointer.x * 0.25
    const mouseY = state.pointer.y * 0.25
    // Floating with slightly offset phase from phone
    groupRef.current.position.y = position[1] + Math.sin(t * 1.6 + 1.2) * 0.1 + mouseY * 0.15
    groupRef.current.position.x = position[0] + mouseX * 0.15
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.9) * 0.1 + mouseX * 0.3
    groupRef.current.rotation.z = rotation[2] + Math.cos(t * 1.3) * 0.05
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Outer Rotating Bezel Ring */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.18, 48]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Titanium Bezel Edge Trim */}
      <mesh position={[0, 0, 0.095]}>
        <torusGeometry args={[0.68, 0.03, 16, 48]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Watch AMOLED Display Surface */}
      <mesh position={[0, 0, 0.096]}>
        <circleGeometry args={[0.64, 48]} />
        <meshStandardMaterial color="#050814" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Outer Glowing Progress Arc (Cyan/Electric Blue) */}
      <mesh position={[0, 0, 0.098]}>
        <ringGeometry args={[0.54, 0.59, 48, 1, 0, Math.PI * 1.6]} />
        <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
      </mesh>

      {/* Inner Battery/Sync Arc */}
      <mesh position={[0, 0, 0.098]}>
        <ringGeometry args={[0.45, 0.48, 48, 1, Math.PI * 0.5, Math.PI * 1.2]} />
        <meshBasicMaterial color="#1e88ff" side={THREE.DoubleSide} />
      </mesh>

      {/* Center Digital Clock Display Simulation */}
      <mesh position={[0, 0.08, 0.099]}>
        <planeGeometry args={[0.42, 0.18]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Heart Rate / Health Metric Pill */}
      <mesh position={[0, -0.22, 0.099]}>
        <planeGeometry args={[0.36, 0.12]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.85} />
      </mesh>

      {/* Watch Top Strap */}
      <mesh position={[0, 0.95, -0.06]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[0.62, 0.8, 0.1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Watch Bottom Strap */}
      <mesh position={[0, -0.95, -0.06]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[0.62, 0.8, 0.1]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Watch Crown Button */}
      <mesh position={[0.73, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.1, 24]} />
        <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Secondary Quick Button */}
      <mesh position={[0.71, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.06, 0.12, 0.08]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Hologram Beacon Node above Watch */}
      <mesh position={[0, 1.2, 0.2]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
    </group>
  )
}
