"""Export dependency graphs to JSON-compatible data."""

from __future__ import annotations

import json
from pathlib import Path

import networkx as nx


def export_json(graph: nx.DiGraph, path: str | Path) -> None:
    destination = Path(path)
    destination.parent.mkdir(parents=True, exist_ok=True)
    payload = nx.node_link_data(graph)
    destination.write_text(json.dumps(payload, indent=2, sort_keys=True), encoding="utf-8")
