import type { ApiError, HealthResponse } from '../types'

export function StatusIndicator({ data, loading, error, onRetry }: { data: HealthResponse | null; loading: boolean; error: ApiError | null; onRetry: () => void }) {
  const healthy = data?.status === 'healthy'
  return <div className="flex items-center gap-2 text-xs text-muted">
    <span className={`h-2 w-2 rounded-full ${healthy ? 'bg-emerald-400' : error ? 'bg-rose-400' : 'bg-amber-400'}`} />
    <span>{loading ? 'Checking backend…' : healthy ? 'Backend connected' : 'Backend unavailable'}</span>
    {error && <button className="text-samsung hover:text-white" onClick={onRetry}>Retry</button>}
  </div>
}
