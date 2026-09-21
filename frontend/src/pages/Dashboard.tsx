import { SamsungHero } from '../components/SamsungHero'
import { BugInput } from '../components/BugInput'
import { StatCard } from '../components/StatCard'
import { InvestigationTimeline } from '../components/InvestigationTimeline'
import type { useBugAnalysis } from '../hooks/useBugAnalysis'

type DashboardProps = {
  onOpenInvestigation: () => void
  analysis: ReturnType<typeof useBugAnalysis>
}

export function Dashboard({ onOpenInvestigation, analysis }: DashboardProps) {
  const submit = (bug: string) => {
    void analysis
      .analyzeBug(bug)
      .then(onOpenInvestigation)
      .catch(() => undefined)
  }

  const runSamsungDemo = () => {
    submit('Bluetooth disconnects after the latest One UI update')
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Sprint A: Samsung Command Center Hero with 3D Holographic Ecosystem */}
      <SamsungHero onRunDemo={runSamsungDemo} loading={analysis.loading} />

      {/* Rest of the page unchanged */}
      <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Workspace telemetry</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            System Operations & Metrics
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Continuous cross-repository impact telemetry and active agent workflow status.
          </p>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Open investigations"
          value={analysis.data ? '01' : '00'}
          detail={analysis.loading ? `${analysis.stage} in progress` : 'Live backend workflow'}
        />
        <StatCard
          label="Evidence indexed"
          value={analysis.data ? String(analysis.data.evidence_trail.length) : '—'}
          detail="From repository analysis"
          accent="text-white"
        />
        <StatCard
          label="Workflow"
          value={analysis.data ? 'Ready' : 'Idle'}
          detail="Planner → patch validation"
          accent="text-emerald-400"
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <BugInput onSubmit={submit} loading={analysis.loading} />
        <InvestigationTimeline />
      </div>

      {analysis.loading && (
        <div className="mt-6 rounded-3xl border border-samsung/20 bg-samsung/[0.06] p-5 text-sm text-slate-300">
          Running <span className="font-semibold text-samsung">{analysis.stage}</span>… Sequential agent progress will appear here.
        </div>
      )}

      {analysis.error && (
        <div className="mt-6 rounded-3xl border border-rose-400/20 bg-rose-400/[0.06] p-5 text-sm text-rose-200">
          <p>{analysis.error.error}</p>
          <p className="mt-2 text-xs">{analysis.error.next_step}</p>
        </div>
      )}
    </div>
  )
}
