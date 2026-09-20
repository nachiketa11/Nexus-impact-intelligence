# NEXUS API

The Phase 5 backend exposes the existing LangGraph investigation workflow through
FastAPI. Start it from the project root with:

```bash
uvicorn backend.app:app --reload
```

Interactive Swagger documentation is available at `http://localhost:8000/docs`.

## Endpoints

### `GET /health`

Response:

```json
{"status": "healthy"}
```

### `GET /graph`

Returns the existing NetworkX dependency graph as JSON:

```json
{
  "nodes": [
    {
      "id": "GalaxyPhone:sync/SyncService.py:SyncService",
      "repository": "GalaxyPhone",
      "file": "sync/SyncService.py",
      "function": "SyncService",
      "kind": "class"
    }
  ],
  "edges": [
    {
      "source": "GalaxyWatch:connector/WatchConnector.py:__module__",
      "target": "GalaxyPhone:sync/SyncService.py:SyncService",
      "kind": "import",
      "module": "GalaxyPhone.sync.SyncService"
    }
  ]
}
```

### `POST /bug`

Request:

```json
{"bug": "Galaxy Watch disconnects after One UI update"}
```

The response preserves the workflow's investigation plan, append-only evidence
trail, impacted repositories, diagnosis, review-ready patch, and validation:

```json
{
  "investigation_plan": [],
  "evidence_trail": [],
  "impacted_repositories": ["GalaxyPhone", "GalaxyWatch"],
  "diagnosis": {
    "root_cause": "BluetoothManager.wait_for_connection converts a five-second adapter timeout to 0.005 seconds before calling SyncService.wait_for_device.",
    "confidence": "high"
  },
  "patch": {
    "format": "unified-diff",
    "applied": false
  },
  "validation": {
    "passed": true,
    "production_files_modified": false
  }
}
```

Invalid requests and parser, graph, or agent failures return:

```json
{
  "error": "Invalid request.",
  "recoverable": true,
  "next_step": "Provide a non-empty 'bug' string in the request body."
}
```
