"""Build a NetworkX symbol dependency graph from parser metadata."""

from __future__ import annotations

from typing import Any

import networkx as nx


def _node(repository: str, file: str, function: str) -> str:
    return f"{repository}:{file}:{function}"


def build_graph(index: dict[str, Any]) -> nx.DiGraph:
    graph = nx.DiGraph()
    symbol_nodes: dict[tuple[str, str], list[str]] = {}
    files = index.get("repositories", [])
    for item in files:
        for symbol in item["symbols"]:
            node = _node(item["repository"], item["file"], symbol["name"])
            graph.add_node(node, repository=item["repository"], file=item["file"], function=symbol["name"], kind=symbol["kind"])
            symbol_nodes.setdefault((item["repository"], symbol["name"]), []).append(node)

    def resolve(name: str, current_repo: str) -> str | None:
        short = name.rsplit(".", 1)[-1]
        candidates = symbol_nodes.get((current_repo, short), [])
        if candidates:
            return candidates[0]
        matches = [node for (repo, symbol), nodes in symbol_nodes.items() if symbol == short for node in nodes]
        return matches[0] if len(matches) == 1 else None

    for item in files:
        source_module = _node(item["repository"], item["file"], "__module__")
        for imported in item["imports"]:
            target = resolve(imported["name"] or imported["module"].rsplit(".", 1)[-1], item["repository"])
            if target and target != source_module:
                graph.add_edge(source_module, target, kind="import", module=imported["module"])
        for call in item["calls"]:
            source = _node(item["repository"], item["file"], call["caller"])
            target = resolve(call["name"], item["repository"])
            if target and target != source:
                graph.add_edge(source, target, kind="call")
    return graph
