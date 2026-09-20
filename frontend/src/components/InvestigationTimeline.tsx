import type { PlaceholderProps } from '../types'

export function InvestigationTimeline({ title = 'Investigation timeline' }: PlaceholderProps) {
  return <section className="panel p-5"><div className="flex items-center justify-between"><h2 className="font-semibold text-white">{title}</h2><span className="text-xs text-muted">Placeholder</span></div><div className="mt-6 space-y-5"><div className="flex gap-4"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-samsung shadow-[0_0_14px_#5B8CFF]" /><div><p className="text-sm text-white">Investigation workspace initialized</p><p className="mt-1 text-xs text-muted">Ready for evidence and agent updates</p></div></div><div className="flex gap-4 opacity-50"><span className="mt-1 h-2.5 w-2.5 rounded-full border border-muted" /><p className="text-sm text-muted">Timeline events will appear here</p></div></div></section>
}
