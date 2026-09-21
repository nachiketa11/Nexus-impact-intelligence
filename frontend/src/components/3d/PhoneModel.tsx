import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface PhoneModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  hovered?: boolean
}

export function PhoneModel({ position = [-1.8, 0.2, 0], rotation = [0.1, 0.35, -0.05] }: PhoneModelProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    // Smooth floating motion + pointer tracking
    const mouseX = state.pointer.x * 0.3
    const mouseY = state.pointer.y * 0.3
    groupRef.current.position.y = position[1] + Math.sin(t * 1.4) * 0.12 + mouseY * 0.2
    groupRef.current.position.x = position[0] + mouseX * 0.2
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.8) * 0.08 + mouseX * 0.4
    groupRef.current.rotation.x = rotation[0] + Math.cos(t * 1.1) * 0.05 - mouseY * 0.3
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Phone Titanium Outer Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 2.6, 0.1]} />
        <meshStandardMaterial
          color="#1e293b"
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Titanium Chamfer Edge Accent */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.31, 2.61, 0.105)]} />
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </lineSegments>

      {/* Screen Front (Glossy Dark AMOLED) */}
      <mesh position={[0, 0, 0.055]}>
        <planeGeometry args={[1.22, 2.5]} />
        <meshStandardMaterial
          color="#060913"
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Dynamic Screen Glowing UI / Wallpaper */}
      <mesh position={[0, 0, 0.056]}>
        <planeGeometry args={[1.14, 2.42]} />
        <meshBasicMaterial color="#0b1329" />
      </mesh>

      {/* One UI Dynamic Ambient Glow Header */}
      <mesh position={[0, 0.8, 0.057]}>
        <planeGeometry args={[0.95, 0.5]} />
        <meshBasicMaterial color="#1e40af" transparent opacity={0.35} />
      </mesh>

      {/* UI Pill Card 1 (Bluetooth Connected) */}
      <mesh position={[0, 0.25, 0.058]}>
        <planeGeometry args={[0.9, 0.32]} />
        <meshBasicMaterial color="#1e88ff" transparent opacity={0.85} />
      </mesh>

      {/* UI Pill Card 2 (Galaxy Watch Stream) */}
      <mesh position={[0, -0.2, 0.058]}>
        <planeGeometry args={[0.9, 0.38]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.9} />
      </mesh>

      {/* UI Pill Card 2 Cyan Accent Line */}
      <mesh position={[-0.35, -0.2, 0.059]}>
        <planeGeometry args={[0.04, 0.24]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* UI Wave Graph Line */}
      <mesh position={[0.05, -0.2, 0.059]}>
        <planeGeometry args={[0.65, 0.04]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
      </mesh>

      {/* UI Pill Card 3 (SmartThings Station Sync) */}
      <mesh position={[0, -0.72, 0.058]}>
        <planeGeometry args={[0.9, 0.38]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.9} />
      </mesh>

      {/* UI Pill Card 3 Blue Accent Line */}
      <mesh position={[-0.35, -0.72, 0.059]}>
        <planeGeometry args={[0.04, 0.24]} />
        <meshBasicMaterial color="#6366f1" />
      </mesh>

      {/* Front Camera Punch-hole */}
      <mesh position={[0, 1.15, 0.058]}>
        <circleGeometry args={[0.035, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Triple Camera Island on Back */}
      <group position={[0.3, 0.75, -0.06]}>
        <mesh position={[0, 0, -0.015]}>
          <boxGeometry args={[0.42, 0.9, 0.03]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Lenses */}
        <mesh position={[0, 0.25, -0.035]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
          <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.035]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 32]} />
          <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.25, -0.035]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
          <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* Floating Hologram Beacon Node above Phone */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#1e88ff" />
      </mesh>
      <mesh position={[0, 1.6, 0]}>
        <ringGeometry args={[0.1, 0.13, 32]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
