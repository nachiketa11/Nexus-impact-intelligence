import { DependencyGraph } from '../components/DependencyGraph'
import { DiagnosisCard } from '../components/DiagnosisCard'
import { EvidenceTrail } from '../components/EvidenceTrail'
import { InvestigationTimeline } from '../components/InvestigationTimeline'
import { PatchCard } from '../components/PatchCard'
import { ValidationCard } from '../components/ValidationCard'
import { useGraph } from '../hooks/useGraph'
import type { useBugAnalysis } from '../hooks/useBugAnalysis'

export function Investigation({ analysis }: { analysis: ReturnType<typeof useBugAnalysis> }) {
  const graph = useGraph()
  const diagnosis = analysis.data?.diagnosis
  const patch = analysis.data?.patch
  return <div className="mx-auto max-w-6xl"><header className="mb-8"><p className="eyebrow">Investigation workspace</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Bluetooth sync timeout</h1><p className="mt-3 text-sm text-muted">A focused view for tracing impact, evidence, and resolution.</p></header><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><InvestigationTimeline /><DependencyGraph {...graph} onRetry={() => void graph.reload()} /></div>{analysis.loading && <div className="mt-6 rounded-2xl border border-samsung/20 bg-samsung/[0.06] p-4 text-sm text-samsung">Stage: {analysis.stage}…</div>}<div className="mt-6 grid gap-6 md:grid-cols-2"><EvidenceTrail data={analysis.data?.evidence_trail} /><DiagnosisCard data={diagnosis} /></div><div className="mt-6 grid gap-6 md:grid-cols-2"><PatchCard data={patch} /><ValidationCard /></div></div>
}
