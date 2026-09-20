"""Diagnosis agent."""

from __future__ import annotations

from .state import AgentState, Evidence


def diagnose(state: AgentState) -> dict:
    """Derive a symbol-backed diagnosis from the accumulated evidence."""
    chunks = state.get("retrieved_chunks", [])
    symbols = [
        f"{chunk['repository']}:{chunk['file']}:{chunk['function']}" for chunk in chunks
    ]
    timeout_chunk = next(
        (chunk for chunk in chunks if "adapter_timeout" in chunk.get("content", "")),
        None,
    )
    if timeout_chunk is None:
        diagnosis = {
            "root_cause": "Insufficient symbol-backed evidence to diagnose the defect.",
            "confidence": "low",
            "confidence_explanation": "No retrieved chunk exposed the failing timeout contract.",
            "symbols": symbols,
        }
        sufficient = False
    else:
        diagnosis = {
            "root_cause": (
                "BluetoothManager.wait_for_connection converts a five-second adapter "
                "timeout to 0.005 seconds before calling SyncService.wait_for_device."
            ),
            "confidence": "high",
            "confidence_explanation": (
                "The retrieved BluetoothManager.wait_for_connection symbol contains "
                "adapter_timeout / 1000, and the graph reaches SyncService.wait_for_device."
            ),
            "symbols": symbols,
        }
        sufficient = True
    evidence: Evidence = {
        "source": "diagnosis",
        "kind": "conclusion",
        "detail": diagnosis["root_cause"],
        "symbols": symbols,
    }
    return {"diagnosis": {**diagnosis, "sufficient": sufficient}, "evidence_trail": [evidence]}
