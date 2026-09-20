import { DependencyGraph } from '../components/DependencyGraph'
import { DiagnosisCard } from '../components/DiagnosisCard'
import { EvidenceTrail } from '../components/EvidenceTrail'
import { InvestigationTimeline } from '../components/InvestigationTimeline'
import { PatchCard } from '../components/PatchCard'
import { ValidationCard } from '../components/ValidationCard'

export function Investigation() {
  return <div className="mx-auto max-w-6xl"><header className="mb-8"><p className="eyebrow">Investigation workspace</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Bluetooth sync timeout</h1><p className="mt-3 text-sm text-muted">A focused view for tracing impact, evidence, and resolution.</p></header><div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"><InvestigationTimeline /><DependencyGraph /></div><div className="mt-6 grid gap-6 md:grid-cols-2"><EvidenceTrail /><DiagnosisCard /></div><div className="mt-6 grid gap-6 md:grid-cols-2"><PatchCard /><ValidationCard /></div></div>
}
