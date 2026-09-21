import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'

function GalaxyPhone() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.18 - 0.35
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08
  })
  return (
    <group ref={group} position={[-1.65, 0.1, 0]} rotation={[0.04, -0.4, 0.04]}>
      <mesh castShadow>
        <boxGeometry args={[1.45, 2.65, 0.16]} />
        <meshStandardMaterial color="#182a4c" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.27, 2.3, 0.03]} />
        <meshStandardMaterial color="#061226" emissive="#0b2d5d" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 0.95, 0.125]}>
        <boxGeometry args={[0.18, 0.03, 0.02]} />
        <meshBasicMaterial color="#7aa5ff" />
      </mesh>
      <mesh position={[0.42, 0.78, 0.14]}>
        <sphereGeometry args={[0.17, 16, 16]} />
        <meshBasicMaterial color="#5b8cff" />
      </mesh>
    </group>
  )
}

function GalaxyWatch() {
  const group = useRef<Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.1
    group.current.rotation.y = state.clock.elapsedTime * 0.15
  })
  return (
    <group ref={group} position={[1.65, 0.4, 0.1]} rotation={[0.2, 0.1, -0.15]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.72, 0.72, 0.22, 32]} />
        <meshStandardMaterial color="#273552" metalness={0.85} roughness={0.18} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]}>
        <circleGeometry args={[0.57, 32]} />
        <meshStandardMaterial color="#08172e" emissive="#123f7a" emissiveIntensity={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.15]}>
        <torusGeometry args={[0.42, 0.025, 8, 32]} />
        <meshBasicMaterial color="#62a5ff" />
      </mesh>
    </group>
  )
}

function SmartThingsHub() {
  const mesh = useRef<Mesh>(null)
  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.y = state.clock.elapsedTime * 0.25
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.65 + 1) * 0.1 - 0.9
  })
  return (
    <mesh ref={mesh} position={[0, -0.9, -0.2]} castShadow>
      <icosahedronGeometry args={[0.75, 1]} />
      <meshStandardMaterial color="#203355" metalness={0.65} roughness={0.26} emissive="#102a52" emissiveIntensity={0.65} />
    </mesh>
  )
}

function Particles() {
  const positions = useMemo(() => {
    const values = new Float32Array(180 * 3)
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (Math.random() - 0.5) * 9
      values[index + 1] = (Math.random() - 0.5) * 5.5
      values[index + 2] = (Math.random() - 0.5) * 4
    }
    return values
  }, [])
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#7aa5ff" size={0.018} transparent opacity={0.6} />
    </points>
  )
}

export function Hero3D() {
  return (
    <div className="hero-canvas" aria-label="Procedural Galaxy phone, Galaxy Watch, and SmartThings Hub models">
      <Canvas camera={{ position: [0, 0, 6], fov: 38 }} dpr={[1, 2]} gl={{ antialias: true }} shadows>
        <ambientLight intensity={0.8} />
        <pointLight position={[3, 3, 4]} intensity={16} color="#7aa5ff" />
        <pointLight position={[-4, -2, 2]} intensity={10} color="#315cff" />
        <Particles />
        <GalaxyPhone />
        <GalaxyWatch />
        <SmartThingsHub />
      </Canvas>
    </div>
  )
}
