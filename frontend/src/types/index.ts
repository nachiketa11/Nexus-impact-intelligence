export type Page = 'dashboard' | 'investigation'

export type PlaceholderProps = {
  title?: string
  description?: string
}

export interface ApiError {
  error: string
  recoverable: boolean
  next_step: string
}

export interface HealthResponse {
  status: string
}

export interface GraphNode {
  id: string
  repository?: string
  file?: string
  function?: string
  kind?: string
}

export interface GraphEdge {
  source: string
  target: string
  kind?: string
  module?: string
}

export interface GraphResponse {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface InvestigationResponse {
  investigation_plan: Record<string, unknown>[]
  evidence_trail: Record<string, unknown>[]
  impacted_repositories: string[]
  diagnosis: Record<string, unknown>
  patch: Record<string, unknown>
  validation: Record<string, unknown>
}
