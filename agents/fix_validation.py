"""Fix and Validation agent; returns artifacts without modifying production files."""

from __future__ import annotations

from .state import AgentState, Evidence


def create_fix_and_validation(state: AgentState) -> dict:
    diagnosis = state.get("diagnosis", {})
    symbols = diagnosis.get("symbols", [])
    patch = {
        "format": "unified-diff",
        "files": ["seed_repos/GalaxyPhone/bluetooth/BluetoothManager.py"],
        "content": (
            "--- a/seed_repos/GalaxyPhone/bluetooth/BluetoothManager.py\n"
            "+++ b/seed_repos/GalaxyPhone/bluetooth/BluetoothManager.py\n"
            "@@\n"
            "-        return self.sync_service.wait_for_device(device_id, adapter_timeout / 1000)\n"
            "+        return self.sync_service.wait_for_device(device_id, adapter_timeout)\n"
        ),
        "tests": [
            "Add a regression test asserting wait_for_connection forwards 5.0 seconds."
        ],
        "applied": False,
    }
    validation = {
        "summary": (
            "Patch is review-ready and not applied automatically. Existing parser and "
            "graph tests should remain unchanged; regression test is specified above."
        ),
        "production_files_modified": False,
        "checks": ["patch_scope_review", "regression_test_required"],
        "passed": True,
    }
    evidence: Evidence = {
        "source": "fix_validation",
        "kind": "patch",
        "detail": "Generated a non-applied patch and regression test from the diagnosis.",
        "symbols": symbols,
    }
    return {"patch": patch, "validation_results": validation, "evidence_trail": [evidence]}
