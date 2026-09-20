from agents.workflow import run_workflow


def test_agents_produce_symbol_backed_diagnosis_and_non_applied_patch() -> None:
    result = run_workflow("Bluetooth connection times out after five milliseconds.")

    assert result["diagnosis"]["confidence"] == "high"
    assert "BluetoothManager.py" in result["patch"]["files"][0]
    assert result["patch"]["applied"] is False
    assert result["validation_results"]["production_files_modified"] is False
    assert result["evidence_trail"]
    assert all(item["symbols"] is not None for item in result["evidence_trail"])


def test_impacted_repositories_are_from_graph_evidence() -> None:
    result = run_workflow("Bluetooth timeout affects the watch synchronization flow.")

    assert "GalaxyPhone" in result["impacted_repositories"]
    assert "GalaxyWatch" in result["impacted_repositories"]
    assert result["graph_results"]["traversals"]
