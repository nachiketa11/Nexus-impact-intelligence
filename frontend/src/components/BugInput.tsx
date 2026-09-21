type BugInputProps = { onSubmit: (value: string) => void; loading?: boolean }

export function BugInput({ onSubmit, loading }: BugInputProps) {
  const demoBug = 'Bluetooth disconnects after the latest One UI update'
  return (
    <form className="panel p-5 sm:p-6" onSubmit={(event) => { event.preventDefault(); const value = new FormData(event.currentTarget).get('bug')?.toString().trim(); if (value) onSubmit(value) }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Start an investigation</p>
          <h2 className="mt-2 text-lg font-semibold text-white">What changed?</h2>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Live API</span>
      </div>
      <textarea name="bug" className="mt-5 min-h-28 w-full resize-none rounded-2xl border border-white/[0.08] bg-ink/60 p-4 text-sm text-white outline-none placeholder:text-muted focus:border-samsung/60" placeholder="Describe a bug, unexpected behavior, or area to investigate…" defaultValue={demoBug} />
      <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <span className="text-xs text-muted">Investigates the seeded Samsung repositories.</span>
        <div className="flex gap-2"><button className="rounded-xl border border-samsung/40 px-4 py-2.5 text-sm font-semibold text-samsung transition hover:bg-samsung/10" type="button" onClick={() => onSubmit(demoBug)} disabled={loading}>Run Samsung Demo</button><button className="rounded-xl bg-samsung px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-samsung-bright disabled:opacity-50" type="submit" disabled={loading}>{loading ? 'Analyzing…' : 'Begin investigation'} <span className="ml-2">→</span></button></div>
      </div>
    </form>
  )
}
