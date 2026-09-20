"""FastAPI application for the NEXUS Impact Intelligence workflow."""

from __future__ import annotations

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from .config import SEED_REPOSITORIES
from .routes import router
from .schemas import ErrorResponse
from .services import InvestigationService, ServiceError


app = FastAPI(
    title="NEXUS Impact Intelligence API",
    description="Expose the existing LangGraph investigation workflow and dependency graph.",
    version="5.0.0",
)
app.state.investigation_service = InvestigationService(SEED_REPOSITORIES)
app.include_router(router)


def _error_response(
    error: str, recoverable: bool, next_step: str, status_code: int
) -> JSONResponse:
    payload = ErrorResponse(
        error=error, recoverable=recoverable, next_step=next_step
    ).model_dump()
    return JSONResponse(status_code=status_code, content=payload)


@app.exception_handler(RequestValidationError)
async def validation_error_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    del request
    return _error_response(
        "Invalid request.",
        True,
        "Provide a non-empty 'bug' string in the request body.",
        422,
    )


@app.exception_handler(ServiceError)
async def service_error_handler(request: Request, exc: ServiceError) -> JSONResponse:
    del request
    return _error_response(exc.error, exc.recoverable, exc.next_step, 500)


@app.exception_handler(Exception)
async def unexpected_error_handler(request: Request, exc: Exception) -> JSONResponse:
    del request
    return _error_response(
        f"Unexpected backend failure: {exc}",
        False,
        "Inspect server logs before retrying the request.",
        500,
    )
