import { Suspense, Component, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { PhoneModel } from './PhoneModel'
import { WatchModel } from './WatchModel'
import { HubModel } from './HubModel'
import { HolographicLinks } from './HolographicLinks'
import { AmbientParticles } from './AmbientParticles'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('Hero3D WebGL context fallback triggered:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function HologramScene() {
  return (
    <>
      {/* Cinematic Studio Lighting */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" castShadow />
      <pointLight position={[-4, 2, 2]} intensity={2.2} color="#1e88ff" distance={10} />
      <pointLight position={[4, -2, 2]} intensity={2.0} color="#00f0ff" distance={10} />
      <pointLight position={[0, 4, -2]} intensity={1.5} color="#6366f1" distance={8} />

      {/* Procedural 3D Samsung Ecosystem Elements */}
      <PhoneModel />
      <WatchModel />
      <HubModel />

      {/* Holographic Laser Streams & Pulse Particles */}
      <HolographicLinks />

      {/* Ambient Stardust Field */}
      <AmbientParticles count={240} />
    </>
  )
}

function FallbackEcosystem() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080d1a]/60 p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,136,255,0.15),transparent_70%)]" />
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="rounded-2xl border border-samsung/30 bg-samsung/10 p-5 backdrop-blur-md">
          <div className="text-2xl">📱</div>
          <p className="mt-2 text-xs font-semibold text-white">Galaxy Phone</p>
          <p className="text-[10px] text-samsung">One UI 6.1</p>
        </div>
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-5 backdrop-blur-md">
          <div className="text-2xl">⌚</div>
          <p className="mt-2 text-xs font-semibold text-white">Galaxy Watch</p>
          <p className="text-[10px] text-cyan-300">WearOS Core</p>
        </div>
        <div className="rounded-2xl border border-indigo-400/30 bg-indigo-400/10 p-5 backdrop-blur-md">
          <div className="text-2xl">⚡</div>
          <p className="mt-2 text-xs font-semibold text-white">SmartThings Hub</p>
          <p className="text-[10px] text-indigo-300">Station Bridge</p>
        </div>
      </div>
    </div>
  )
}

export function Hero3D() {
  return (
    <div className="relative h-[380px] w-full lg:h-[500px] xl:h-[560px]">
      {/* Background Soft Glow Aura */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-samsung/20 blur-[90px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[240px] w-[240px] rounded-full bg-cyan-400/15 blur-[80px]" />

      <CanvasErrorBoundary fallback={<FallbackEcosystem />}>
        <Suspense fallback={<FallbackEcosystem />}>
          <Canvas
            camera={{ position: [0, 0.2, 5.8], fov: 42 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="h-full w-full cursor-grab active:cursor-grabbing"
          >
            <HologramScene />
          </Canvas>
        </Suspense>
      </CanvasErrorBoundary>

      {/* Floating Device Status Badge Overlay in 3D Canvas */}
      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-wrap items-center gap-2 rounded-2xl border border-white/[0.08] bg-[#070b14]/70 px-3.5 py-2 backdrop-blur-xl">
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[11px] font-medium tracking-wider text-slate-300">
          TRI-NODE HOLOGRAPHIC ECOSYSTEM ACTIVE
        </span>
      </div>
    </div>
  )
}
