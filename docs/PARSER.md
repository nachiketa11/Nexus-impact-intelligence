# Code Intelligence Parser

Phase 3 indexes the Python repositories under `seed_repos/` with Tree-sitter.
`PythonParser` extracts function and class definitions, imports, and calls with
one-based source line numbers. `RepositoryIndexer` combines that metadata with
function-level chunks and can write the complete result as JSON.

`graph.builder.build_graph` converts the index into a NetworkX directed graph.
Each node is named `repository:file:function`; import and call relationships
are resolved from discovered symbols. `graph.traversal.bfs` performs
breadth-first traversal, and `graph.export.export_json` writes a node-link JSON
representation.

From the repository root:

```python
from parser.indexer import RepositoryIndexer
from graph.builder import build_graph

index = RepositoryIndexer("seed_repos").write("artifacts/index.json")
graph = build_graph(index)
```

No repository relationship is hardcoded: edges are derived from Python import
and call syntax and the symbols discovered in the indexed files.
