import type { ApiError, GraphResponse, HealthResponse, InvestigationResponse } from '../types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options?.headers },
    })
  } catch {
    throw { error: 'Unable to reach the NEXUS backend.', recoverable: true, next_step: 'Start the FastAPI server with uvicorn backend.app:app --reload and retry.' } satisfies ApiError
  }

  if (!response.ok) {
    const error = await response.json().catch(() => null) as ApiError | null
    throw error ?? { error: `Backend request failed (${response.status}).`, recoverable: true, next_step: 'Retry the request or inspect the backend logs.' }
  }
  return response.json() as Promise<T>
}

export const healthService = {
  check: () => request<HealthResponse>('/health'),
}

export const graphService = {
  getGraph: () => request<GraphResponse>('/graph'),
}

export const bugService = {
  analyzeBug: (bug: string) => request<InvestigationResponse>('/bug', {
    method: 'POST',
    body: JSON.stringify({ bug }),
  }),
}
