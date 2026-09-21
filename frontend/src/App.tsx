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
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#0b0f17]/70 px-5 py-4 backdrop-blur-2xl sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-samsung/40 bg-samsung/10 text-samsung">✦</div>
            <div><p className="text-sm font-bold tracking-[0.22em] text-white">NEXUS</p><p className="text-[9px] uppercase tracking-[0.2em] text-muted">Impact Intelligence</p></div>
          </div>
          <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 md:flex">
          {navigation.map((item) => (
            <button
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                page === item.id ? 'bg-white/[0.12] text-white' : 'text-muted hover:text-white'
              }`}
              key={item.id}
              onClick={() => setPage(item.id)}
            >
              {item.label}
            </button>
          ))}
          </nav>
          <StatusIndicator {...health} onRetry={() => void health.check()} />
        </div>
      </header>
      <main className="w-full px-5 py-7 sm:px-8 lg:px-12 lg:py-10 xl:px-16">
        {page === 'dashboard' ? <Dashboard onOpenInvestigation={() => setPage('investigation')} analysis={analysis} /> : <Investigation analysis={analysis} />}
      </main>
    </div>
  )
}

export default App
