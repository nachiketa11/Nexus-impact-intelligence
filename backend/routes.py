"""Thin HTTP routes for the NEXUS backend."""

from __future__ import annotations

from fastapi import APIRouter, Request

from .schemas import BugRequest, BugResponse, GraphResponse, HealthResponse
from .services import InvestigationService


router = APIRouter()


def _service(request: Request) -> InvestigationService:
    return request.app.state.investigation_service


@router.get("/health", response_model=HealthResponse)
def health() -> HealthResponse:
    return HealthResponse(status="healthy")


@router.get("/graph", response_model=GraphResponse)
def graph(request: Request) -> GraphResponse:
    return GraphResponse(**_service(request).graph())


@router.post("/bug", response_model=BugResponse)
def investigate_bug(payload: BugRequest, request: Request) -> BugResponse:
    return BugResponse(**_service(request).investigate(payload.bug))
