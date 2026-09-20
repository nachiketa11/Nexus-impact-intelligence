"""Shared state and evidence structures for the agent workflow."""

from __future__ import annotations

from operator import add
from typing import Annotated, TypedDict


class Evidence(TypedDict):
    source: str
    kind: str
    detail: str
    symbols: list[str]


class AgentState(TypedDict, total=False):
    bug_report: str
    investigation_plan: list[dict[str, str]]
    retrieved_chunks: list[dict]
    graph_results: dict
    evidence_trail: Annotated[list[Evidence], add]
    diagnosis: dict
    impacted_repositories: list[str]
    patch: dict
    validation_results: dict
    replan_count: int
