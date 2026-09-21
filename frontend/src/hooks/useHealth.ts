import { useCallback, useEffect, useState } from 'react'
import { healthService } from '../services/api'
import type { ApiError, HealthResponse } from '../types'

export function useHealth() {
  const [data, setData] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const check = useCallback(async () => {
    setLoading(true)
    setError(null)
    try { setData(await healthService.check()) } catch (value) { setError(value as ApiError) } finally { setLoading(false) }
  }, [])
  useEffect(() => { void check() }, [check])
  return { data, loading, error, check }
}
