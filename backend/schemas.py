"""Pydantic API contracts."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field


class BugRequest(BaseModel):
    bug: str = Field(..., min_length=1, description="Description of the bug to investigate.")


class BugResponse(BaseModel):
    investigation_plan: list[dict[str, Any]]
    evidence_trail: list[dict[str, Any]]
    impacted_repositories: list[str]
    diagnosis: dict[str, Any]
    patch: dict[str, Any]
    validation: dict[str, Any]


class GraphResponse(BaseModel):
    nodes: list[dict[str, Any]]
    edges: list[dict[str, Any]]


class HealthResponse(BaseModel):
    status: str


class ErrorResponse(BaseModel):
    error: str
    recoverable: bool
    next_step: str
