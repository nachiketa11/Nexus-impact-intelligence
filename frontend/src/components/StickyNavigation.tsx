import type { Page } from '../types'
import type { useHealth } from '../hooks/useHealth'

interface StickyNavigationProps {
  page: Page
  onSelectPage: (page: Page) => void
  health: ReturnType<typeof useHealth>
}

export function StickyNavigation({ page, onSelectPage, health }: StickyNavigationProps) {
  const isHealthy = health.data?.status === 'healthy'

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#05070a]/80 backdrop-blur-2xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
        {/* Brand & Platform Identifier */}
        <div className="flex items-center gap-3.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-samsung/40 bg-gradient-to-br from-samsung/20 to-cyan-500/10 text-samsung shadow-[0_0_15px_rgba(30,136,255,0.25)]">
            <span className="text-base font-black tracking-tighter">N</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-[0.25em] text-white">SAMSUNG</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-samsung-bright">PRISM</span>
            </div>
            <p className="text-[10px] font-medium tracking-widest text-muted">NEXUS IMPACT INTELLIGENCE</p>
          </div>
        </div>

        {/* Center Navigation Tabs (One UI Squircle Pills) */}
        <nav className="flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-[#0b101c]/90 p-1 backdrop-blur-md">
          <button
            onClick={() => onSelectPage('dashboard')}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              page === 'dashboard'
                ? 'bg-gradient-to-r from-samsung to-[#0070f3] text-white shadow-[0_0_20px_rgba(30,136,255,0.35)]'
                : 'text-muted hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <span>⌂</span>
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => onSelectPage('investigation')}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              page === 'investigation'
                ? 'bg-gradient-to-r from-samsung to-[#0070f3] text-white shadow-[0_0_20px_rgba(30,136,255,0.35)]'
                : 'text-muted hover:bg-white/[0.05] hover:text-white'
            }`}
          >
            <span>⌕</span>
            <span>Investigation</span>
          </button>
        </nav>

        {/* Right: Live SystemStatus with /health Endpoint */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/[0.06] bg-[#0c1220]/80 px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              {isHealthy && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  health.loading
                    ? 'bg-amber-400'
                    : isHealthy
                    ? 'bg-emerald-400'
                    : 'bg-rose-500'
                }`}
              />
            </span>
            <span className="text-xs font-medium text-slate-300">
              {health.loading
                ? 'Checking API…'
                : isHealthy
                ? 'Core Systems Healthy'
                : 'API Offline'}
            </span>
            {health.error && (
              <button
                onClick={() => void health.check()}
                className="text-xs font-medium text-samsung hover:underline"
              >
                Retry
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
