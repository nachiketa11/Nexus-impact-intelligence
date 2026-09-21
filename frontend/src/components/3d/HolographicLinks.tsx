import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function HolographicLinks() {
  const pulseRef1 = useRef<THREE.Mesh>(null)
  const pulseRef2 = useRef<THREE.Mesh>(null)
  const pulseRef3 = useRef<THREE.Mesh>(null)

  // Beacon Positions
  const phonePos = useMemo(() => new THREE.Vector3(-1.8, 1.8, 0), [])
  const watchPos = useMemo(() => new THREE.Vector3(1.6, 2.1, 0.6), [])
  const hubPos = useMemo(() => new THREE.Vector3(1.2, -0.4, -0.2), [])

  // Bezier Curves
  const curvePhoneToWatch = useMemo(() => {
    const mid = new THREE.Vector3(-0.1, 2.4, 0.4)
    return new THREE.QuadraticBezierCurve3(phonePos, mid, watchPos)
  }, [phonePos, watchPos])

  const curvePhoneToHub = useMemo(() => {
    const mid = new THREE.Vector3(-0.4, 0.4, 0.1)
    return new THREE.QuadraticBezierCurve3(phonePos, mid, hubPos)
  }, [phonePos, hubPos])

  const curveWatchToHub = useMemo(() => {
    const mid = new THREE.Vector3(2.0, 0.8, 0.2)
    return new THREE.QuadraticBezierCurve3(watchPos, mid, hubPos)
  }, [watchPos, hubPos])

  // Geometries for the lines
  const pointsPhoneToWatch = useMemo(() => curvePhoneToWatch.getPoints(32), [curvePhoneToWatch])
  const pointsPhoneToHub = useMemo(() => curvePhoneToHub.getPoints(32), [curvePhoneToHub])
  const pointsWatchToHub = useMemo(() => curveWatchToHub.getPoints(32), [curveWatchToHub])

  const lineGeo1 = useMemo(() => new THREE.BufferGeometry().setFromPoints(pointsPhoneToWatch), [pointsPhoneToWatch])
  const lineGeo2 = useMemo(() => new THREE.BufferGeometry().setFromPoints(pointsPhoneToHub), [pointsPhoneToHub])
  const lineGeo3 = useMemo(() => new THREE.BufferGeometry().setFromPoints(pointsWatchToHub), [pointsWatchToHub])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Pulse 1: Phone -> Watch
    if (pulseRef1.current) {
      const u1 = (t * 0.45) % 1
      const pos1 = curvePhoneToWatch.getPoint(u1)
      pulseRef1.current.position.copy(pos1)
    }

    // Pulse 2: Phone -> Hub
    if (pulseRef2.current) {
      const u2 = ((t * 0.4) + 0.3) % 1
      const pos2 = curvePhoneToHub.getPoint(u2)
      pulseRef2.current.position.copy(pos2)
    }

    // Pulse 3: Watch -> Hub
    if (pulseRef3.current) {
      const u3 = ((t * 0.5) + 0.6) % 1
      const pos3 = curveWatchToHub.getPoint(u3)
      pulseRef3.current.position.copy(pos3)
    }
  })

  return (
    <group>
      {/* Hologram Curve 1: Phone <-> Watch */}
      <primitive object={new THREE.Line(lineGeo1, new THREE.LineBasicMaterial({ color: '#1e88ff', transparent: true, opacity: 0.45 }))} />
      {/* Hologram Curve 2: Phone <-> Hub */}
      <primitive object={new THREE.Line(lineGeo2, new THREE.LineBasicMaterial({ color: '#00f0ff', transparent: true, opacity: 0.4 }))} />
      {/* Hologram Curve 3: Watch <-> Hub */}
      <primitive object={new THREE.Line(lineGeo3, new THREE.LineBasicMaterial({ color: '#6366f1', transparent: true, opacity: 0.35 }))} />

      {/* Traveling Photon Light Pulses */}
      <mesh ref={pulseRef1}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>
      <mesh ref={pulseRef2}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#1e88ff" />
      </mesh>
      <mesh ref={pulseRef3}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#a5b4fc" />
      </mesh>
    </group>
  )
}
