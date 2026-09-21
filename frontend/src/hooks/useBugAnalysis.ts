import { useState } from 'react'
import { bugService } from '../services/api'
import type { ApiError, InvestigationResponse } from '../types'

export function useBugAnalysis() {
  const [data, setData] = useState<InvestigationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)
  const [stage, setStage] = useState('')
  async function analyzeBug(bug: string) {
    setLoading(true); setError(null); setData(null)
    const stages = ['Planner', 'Code Intelligence', 'Diagnosis', 'Patch']
    let index = 0
    setStage(stages[index])
    const timer = window.setInterval(() => { index = Math.min(index + 1, stages.length - 1); setStage(stages[index]) }, 700)
    try { const result = await bugService.analyzeBug(bug); setData(result); setStage('Complete'); return result }
    catch (value) { setError(value as ApiError); throw value }
    finally { window.clearInterval(timer); setLoading(false) }
  }
  return { data, loading, error, stage, analyzeBug }
}
