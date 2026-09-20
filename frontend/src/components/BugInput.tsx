type BugInputProps = { onSubmit?: (value: string) => void }

export function BugInput({ onSubmit }: BugInputProps) {
  return (
    <form className="panel p-5 sm:p-6" onSubmit={(event) => { event.preventDefault(); onSubmit?.('') }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Start an investigation</p>
          <h2 className="mt-2 text-lg font-semibold text-white">What changed?</h2>
        </div>
        <span className="rounded-full bg-samsung/10 px-3 py-1 text-xs text-samsung">Preview</span>
      </div>
      <textarea className="mt-5 min-h-28 w-full resize-none rounded-2xl border border-white/[0.08] bg-ink/60 p-4 text-sm text-white outline-none placeholder:text-muted focus:border-samsung/60" placeholder="Describe a bug, unexpected behavior, or area to investigate…" />
      <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <span className="text-xs text-muted">Connect a repository when the investigation workflow is enabled.</span>
        <button className="rounded-xl bg-samsung px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-samsung-bright" type="submit">Begin investigation <span className="ml-2">→</span></button>
      </div>
    </form>
  )
}
