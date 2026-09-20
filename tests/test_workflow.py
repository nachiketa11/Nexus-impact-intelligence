from agents.workflow import run_workflow


def test_workflow_orders_four_agents_and_keeps_reasoning_visible() -> None:
    result = run_workflow("BluetoothManager wait_for_connection uses the wrong timeout unit.")

    assert [step["step"] for step in result["investigation_plan"]][:2] == [
        "Locate the failing behavior",
        "Inspect timing and state contracts",
    ]
    sources = [item["source"] for item in result["evidence_trail"]]
    assert sources.index("planner") < sources.index("code_intelligence")
    assert sources.index("code_intelligence") < sources.index("diagnosis")
    assert sources.index("diagnosis") < sources.index("fix_validation")
