"""Orchestration services for the HTTP API."""

from __future__ import annotations

from pathlib import Path
from typing import Any

from graph.builder import build_graph
from parser.indexer import RepositoryIndexer
from agents.workflow import run_workflow


class ServiceError(Exception):
    """An expected service failure that can be rendered as an API error."""

    def __init__(self, error: str, recoverable: bool, next_step: str) -> None:
        super().__init__(error)
        self.error = error
        self.recoverable = recoverable
        self.next_step = next_step


class InvestigationService:
    def __init__(self, root: str | Path) -> None:
        self.root = Path(root)

    def investigate(self, bug: str) -> dict[str, Any]:
        try:
            result = run_workflow(bug, self.root)
        except (OSError, ValueError, UnicodeError) as exc:
            raise ServiceError(
                f"Parser failure while investigating the bug: {exc}",
                True,
                "Check the seeded repository files and retry the investigation.",
            ) from exc
        except Exception as exc:
            raise ServiceError(
                f"Agent failure while investigating the bug: {exc}",
                True,
                "Retry the request; if it persists, inspect the agent workflow logs.",
            ) from exc

        return {
            "investigation_plan": result.get("investigation_plan", []),
            "evidence_trail": result.get("evidence_trail", []),
            "impacted_repositories": result.get("impacted_repositories", []),
            "diagnosis": result.get("diagnosis", {}),
            "patch": result.get("patch", {}),
            "validation": result.get("validation_results", {}),
        }

    def graph(self) -> dict[str, list[dict[str, Any]]]:
        try:
            index = RepositoryIndexer(self.root).index()
            graph = build_graph(index)
            nodes = [
                {"id": node, **attributes}
                for node, attributes in graph.nodes(data=True)
            ]
            edges = [
                {"source": source, "target": target, **attributes}
                for source, target, attributes in graph.edges(data=True)
            ]
            return {"nodes": nodes, "edges": edges}
        except (OSError, ValueError, UnicodeError) as exc:
            raise ServiceError(
                f"Parser failure while building the graph: {exc}",
                True,
                "Check the seeded repository files and retry the graph request.",
            ) from exc
        except Exception as exc:
            raise ServiceError(
                f"Graph failure while building the dependency graph: {exc}",
                True,
                "Retry the request; if it persists, inspect graph construction logs.",
            ) from exc
