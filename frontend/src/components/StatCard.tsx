type StatCardProps = { label: string; value: string; detail: string; accent?: string }

export function StatCard({ label, value, detail, accent = 'text-samsung' }: StatCardProps) {
  return <div className="panel p-5"><p className="eyebrow">{label}</p><p className={`mt-4 text-3xl font-semibold ${accent}`}>{value}</p><p className="mt-2 text-xs text-muted">{detail}</p></div>
}
