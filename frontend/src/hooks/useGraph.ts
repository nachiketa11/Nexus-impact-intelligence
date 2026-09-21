import { useCallback, useEffect, useState } from 'react'
import { graphService } from '../services/api'
import type { ApiError, GraphResponse } from '../types'

export function useGraph() {
  const [data, setData] = useState<GraphResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try { setData(await graphService.getGraph()) } catch (value) { setError(value as ApiError) } finally { setLoading(false) }
  }, [])
  useEffect(() => { void load() }, [load])
  return { data, loading, error, reload: load }
}
