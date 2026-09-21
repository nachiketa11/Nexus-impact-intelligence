import { lazy, Suspense } from 'react'

const Hero3D = lazy(() => import('./3d/Hero3D').then((m) => ({ default: m.Hero3D })))

interface SamsungHeroProps {
  onRunDemo: () => void
  loading?: boolean
}

function Hero3DFallback() {
  return (
    <div className="relative flex h-[380px] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/[0.08] bg-[#080d1a]/60 p-8 lg:h-[500px]">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-samsung/40 bg-samsung/10 text-samsung animate-pulse">
          ⚡
        </div>
        <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
          Initializing 3D Ecosystem Engine…
        </p>
      </div>
    </div>
  )
}

export function SamsungHero({ onRunDemo, loading }: SamsungHeroProps) {
  return (
    <section className="relative mb-12 overflow-hidden rounded-[32px] border border-white/[0.08] bg-gradient-to-b from-[#0e1726]/80 via-[#070c18]/90 to-[#05070a] p-6 shadow-2xl backdrop-blur-2xl sm:p-10 lg:p-12">
      {/* Background Micro Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Top Ambient Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-samsung/15 blur-[120px]" />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
        {/* Left Column: Oversized Typography & Dominant CTA */}
        <div className="lg:col-span-7">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-samsung/30 bg-samsung/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-samsung animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-samsung-bright">
              SAMSUNG PRISM // AGENTIC CODE INTELLIGENCE
            </span>
          </div>

          {/* Oversized Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Cross-Device <br />
            <span className="bg-gradient-to-r from-white via-[#7AA5FF] to-[#00F0FF] bg-clip-text text-transparent">
              Impact Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Samsung’s internal platform for investigating cross-device software failures across{' '}
            <span className="font-semibold text-white">Galaxy Phone</span>,{' '}
            <span className="font-semibold text-white">Galaxy Watch</span>, and{' '}
            <span className="font-semibold text-white">SmartThings</span>.
          </p>

          {/* THE DOMINANT CTA */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              onClick={onRunDemo}
              disabled={loading}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-samsung to-[#0070f3] px-8 py-4 text-base font-bold text-white shadow-[0_0_40px_rgba(30,136,255,0.45)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(30,136,255,0.7)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
            >
              {/* Button Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs">
                {loading ? '⚡' : '▶'}
              </span>
              <span>{loading ? 'Investigating Ecosystem…' : 'Run Samsung Demo'}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>

            {/* Quick Context Tag */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Target: Bluetooth sync timeout after One UI update</span>
            </div>
          </div>

          {/* Device Ecosystem Status Pills */}
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/[0.08] pt-6">
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-wider text-muted">Device 01</p>
              <p className="mt-1 text-xs font-semibold text-white">Galaxy S24 Ultra</p>
              <p className="text-[10px] text-emerald-400">● Seeded Repo</p>
            </div>
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-wider text-muted">Device 02</p>
              <p className="mt-1 text-xs font-semibold text-white">Galaxy Watch6</p>
              <p className="text-[10px] text-emerald-400">● Seeded Repo</p>
            </div>
            <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-3 text-center sm:text-left">
              <p className="text-[10px] uppercase tracking-wider text-muted">Device 03</p>
              <p className="mt-1 text-xs font-semibold text-white">SmartThings Hub</p>
              <p className="text-[10px] text-emerald-400">● Seeded Repo</p>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Holographic Ecosystem */}
        <div className="relative lg:col-span-5">
          <Suspense fallback={<Hero3DFallback />}>
            <Hero3D />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
