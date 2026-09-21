import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HubModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function HubModel({ position = [1.2, -1.2, -0.2], rotation = [0.6, -0.2, 0] }: HubModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const waveRef1 = useRef<THREE.Mesh>(null)
  const waveRef2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const mouseX = state.pointer.x * 0.2
    const mouseY = state.pointer.y * 0.2

    // Gentle hover
    groupRef.current.position.y = position[1] + Math.sin(t * 1.2 + 2.5) * 0.08 + mouseY * 0.1
    groupRef.current.position.x = position[0] + mouseX * 0.12
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.7) * 0.08

    // Radiating antenna waves
    if (waveRef1.current) {
      const s1 = 1 + ((t * 0.8) % 1.5)
      waveRef1.current.scale.set(s1, s1, s1)
      const mat = waveRef1.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(0, 0.6 - (s1 - 1) * 0.4)
    }
    if (waveRef2.current) {
      const s2 = 1 + (((t * 0.8) + 0.75) % 1.5)
      waveRef2.current.scale.set(s2, s2, s2)
      const mat = waveRef2.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.max(0, 0.6 - (s2 - 1) * 0.4)
    }
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* SmartThings Station Puck Base */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.9, 0.95, 0.22, 48]} />
        <meshStandardMaterial color="#0f172a" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Top Recessed Inductive Surface */}
      <mesh position={[0, 0.115, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.02, 48]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* SmartThings Glowing Center LED Ring */}
      <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.035, 16, 48]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={1.2}
          roughness={0.1}
        />
      </mesh>

      {/* Center Status Glow Dot */}
      <mesh position={[0, 0.13, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Radiating Wave 1 */}
      <mesh ref={waveRef1} position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 0.88, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Radiating Wave 2 */}
      <mesh ref={waveRef2} position={[0, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.85, 0.88, 48]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Hologram Beacon Node above Hub */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#6366f1" />
      </mesh>
    </group>
  )
}
