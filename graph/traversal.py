"""Graph traversal helpers."""

from __future__ import annotations

import networkx as nx


def bfs(graph: nx.DiGraph, start: str) -> list[str]:
    """Return nodes reached from start in breadth-first order."""
    if start not in graph:
        return []
    return list(nx.bfs_tree(graph, start).nodes)
