import { useState } from 'react'
import { Dashboard } from './pages/Dashboard'
import { Investigation } from './pages/Investigation'
import type { Page } from './types'
import { useHealth } from './hooks/useHealth'
import { useBugAnalysis } from './hooks/useBugAnalysis'
import { StickyNavigation } from './components/StickyNavigation'

function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const health = useHealth()
  const analysis = useBugAnalysis()

  return (
    <div className="min-h-screen bg-[#05070a] text-[#f4f7fb]">
      {/* Sticky Minimal Navigation with Live SystemStatus via /health */}
      <StickyNavigation page={page} onSelectPage={setPage} health={health} />

      {/* Main Command Center Canvas */}
      <main className="w-full px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
        {page === 'dashboard' ? (
          <Dashboard
            onOpenInvestigation={() => setPage('investigation')}
            analysis={analysis}
          />
        ) : (
          <Investigation analysis={analysis} />
        )}
      </main>
    </div>
  )
}

export default App
