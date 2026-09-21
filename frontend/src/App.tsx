import { useState } from 'react'
import { Dashboard } from './pages/Dashboard'
import { Investigation } from './pages/Investigation'
import type { Page } from './types'
import { useHealth } from './hooks/useHealth'
import { useBugAnalysis } from './hooks/useBugAnalysis'
import { StatusIndicator } from './components/StatusIndicator'

const navigation: { id: Page; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '⌂' },
  { id: 'investigation', label: 'Investigation', icon: '⌕' },
]

function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const health = useHealth()
  const analysis = useBugAnalysis()

  return (
    <div className="min-h-screen lg:flex">
      <aside className="border-b border-white/[0.06] bg-[#0d121d]/80 px-5 py-5 backdrop-blur-xl lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-b-0 lg:border-r lg:px-6">
        <div className="flex items-center justify-between lg:block">
          <div>
            <p className="text-xl font-bold tracking-[0.2em] text-white">NEXUS</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.22em] text-muted">Impact Intelligence</p>
          </div>
          <StatusIndicator {...health} onRetry={() => void health.check()} />
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-samsung/30 bg-samsung/10 text-samsung lg:mt-10">✦</div>
        </div>
        <nav className="mt-6 flex gap-2 overflow-x-auto lg:mt-12 lg:block lg:space-y-2">
          {navigation.map((item) => (
            <button
              className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition lg:w-full ${
                page === item.id ? 'bg-samsung text-white shadow-lg shadow-samsung/20' : 'text-muted hover:bg-white/[0.05] hover:text-white'
              }`}
              key={item.id}
              onClick={() => setPage(item.id)}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto hidden rounded-2xl border border-white/[0.06] bg-panel p-4 lg:block">
          <p className="eyebrow">Workspace</p>
          <p className="mt-2 text-sm text-white">Samsung / Core Systems</p>
          <p className="mt-1 text-xs text-muted">Foundation preview</p>
        </div>
      </aside>
      <main className="w-full px-5 py-7 sm:px-8 lg:ml-64 lg:px-12 lg:py-10 xl:px-16">
        {page === 'dashboard' ? <Dashboard onOpenInvestigation={() => setPage('investigation')} analysis={analysis} /> : <Investigation analysis={analysis} />}
      </main>
    </div>
  )
}

export default App
