"""Code Intelligence agent backed by the Phase 3 parser and graph."""

from __future__ import annotations

import re
from pathlib import Path

from graph.builder import build_graph
from graph.traversal import bfs
from parser.indexer import RepositoryIndexer

from .state import AgentState, Evidence


def _terms(report: str) -> set[str]:
    return {term.lower() for term in re.findall(r"[A-Za-z_][A-Za-z0-9_]+", report)}


def investigate_code(state: AgentState, root: str | Path = "seed_repos") -> dict:
    """Reuse the repository index and dependency graph to gather evidence."""
    index = RepositoryIndexer(root).index()
    graph = build_graph(index)
    terms = _terms(state["bug_report"])
    files = []
    for item in index["repositories"]:
        searchable = " ".join(
            [item["repository"], item["file"]]
            + [symbol["name"] for symbol in item["symbols"]]
        ).lower()
        if any(term in searchable for term in terms):
            files.append(item)
    if not files:
        files = [item for item in index["repositories"] if "bluetooth" in item["file"].lower()]

    chunks = [chunk for item in files for chunk in item["chunks"]]
    starts = [
        f"{item['repository']}:{item['file']}:{symbol['name']}"
        for item in files
        for symbol in item["symbols"]
        if symbol["name"].lower() in terms or item["file"].lower() in terms
    ]
    if not starts:
        starts = [
            f"{item['repository']}:{item['file']}:__module__"
            for item in files
        ]
    traversals = {start: bfs(graph, start) for start in starts if start in graph}
    nodes = {node for result in traversals.values() for node in result}
    # Include consumers of shared symbols as well as their direct dependencies.
    for node in list(nodes):
        nodes.update(graph.predecessors(node))
    impacted = sorted(
        {graph.nodes[node]["repository"] for node in nodes}
        | {item["repository"] for item in files}
    )
    evidence: list[Evidence] = [
        {
            "source": "code_intelligence",
            "kind": "retrieval",
            "detail": f"Retrieved {len(chunks)} function chunks from {len(files)} files.",
            "symbols": [
                f"{item['repository']}:{item['file']}:{chunk['function']}"
                for item in files
                for chunk in item["chunks"]
            ],
        },
        {
            "source": "code_intelligence",
            "kind": "graph_traversal",
            "detail": f"Traversed {len(nodes)} graph nodes from {len(traversals)} start symbols.",
            "symbols": sorted(nodes),
        },
    ]
    return {
        "retrieved_chunks": chunks,
        "graph_results": {"starts": starts, "traversals": traversals},
        "impacted_repositories": impacted,
        "evidence_trail": evidence,
    }
