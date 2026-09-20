# Agent Workflow

Phase 4 uses four collaborating agents orchestrated by LangGraph:

- **Planner** turns a bug report into an ordered investigation plan and keeps
  the reasoning for each step visible.
- **Code Intelligence** reuses `parser.RepositoryIndexer` and
  `graph.build_graph`; it retrieves function chunks, traverses dependencies,
  and derives impacted repositories.
- **Diagnosis** uses only retrieved evidence and discovered symbols to state a
  root cause and confidence. It can request one focused replan when evidence
  is insufficient.
- **Fix & Validation** creates a review-ready unified diff, regression-test
  proposal, and validation summary. It never writes production files.

## Shared State and Evidence Trail

`agents/state.py` defines the LangGraph state: `bug_report`,
`investigation_plan`, `retrieved_chunks`, `graph_results`, `evidence_trail`,
`diagnosis`, `impacted_repositories`, `patch`, and `validation_results`.
Evidence uses an append reducer, so every agent contributes structured
`source`, `kind`, `detail`, and `symbols` entries rather than replacing
context.

The normal flow is:

`Bug Report -> BluetoothManager.py -> SyncService.py -> WatchConnector.py -> Diagnosis -> Patch`

The workflow is `Planner -> Code Intelligence -> Diagnosis -> Fix &
Validation`, with one conditional replan edge from Diagnosis back through Code
Intelligence.
