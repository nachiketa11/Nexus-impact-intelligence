import type { PlaceholderProps } from '../types'
export function DiagnosisCard({ title = 'Diagnosis' }: PlaceholderProps) { return <section className="panel p-5"><p className="eyebrow">Agent output</p><h2 className="mt-2 font-semibold text-white">{title}</h2><p className="mt-4 text-sm leading-6 text-muted">Potential root-cause analysis will be summarized in this card.</p></section> }
