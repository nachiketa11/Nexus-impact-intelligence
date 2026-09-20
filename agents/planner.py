"""Planner agent."""

from __future__ import annotations

from .state import AgentState, Evidence


def plan_investigation(state: AgentState) -> dict:
    """Create an ordered, visible investigation plan from a bug report."""
    report = state["bug_report"]
    plan = [
        {
            "step": "Locate the failing behavior",
            "action": "Find source files and symbols named or implied by the report.",
            "reasoning": "The failing entry point anchors all later graph traversal.",
        },
        {
            "step": "Inspect timing and state contracts",
            "action": "Compare timeout units and the arguments passed to synchronization APIs.",
            "reasoning": "A unit mismatch can explain an early timeout without changing the dependency graph.",
        },
        {
            "step": "Trace downstream impact",
            "action": "Traverse callers and dependencies across repositories.",
            "reasoning": "Consumers of the failing contract identify the actual blast radius.",
        },
    ]
    evidence: Evidence = {
        "source": "planner",
        "kind": "plan",
        "detail": f"Report: {report}; ordered plan with {len(plan)} steps",
        "symbols": [],
    }
    return {"investigation_plan": plan, "evidence_trail": [evidence], "replan_count": 0}


def replan_investigation(state: AgentState) -> dict:
    """Add a focused step once when code evidence is insufficient."""
    plan = list(state.get("investigation_plan", []))
    plan.append(
        {
            "step": "Broaden symbol and log correlation",
            "action": "Search related logs and callers for the timeout contract.",
            "reasoning": "Initial retrieval was insufficient to establish a symbol-backed cause.",
        }
    )
    evidence: Evidence = {
        "source": "planner",
        "kind": "replan",
        "detail": "Added one focused retrieval step because evidence was insufficient.",
        "symbols": [],
    }
    return {
        "investigation_plan": plan,
        "replan_count": state.get("replan_count", 0) + 1,
        "evidence_trail": [evidence],
    }
