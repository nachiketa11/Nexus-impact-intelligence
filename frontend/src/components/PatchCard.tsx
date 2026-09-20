import type { PlaceholderProps } from '../types'
export function PatchCard({ title = 'Suggested patch' }: PlaceholderProps) { return <section className="panel p-5"><p className="eyebrow">Next step</p><h2 className="mt-2 font-semibold text-white">{title}</h2><div className="mt-4 rounded-xl bg-ink/70 p-4 font-mono text-xs text-muted">// Patch suggestions will appear here</div></section> }
