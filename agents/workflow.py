"""LangGraph orchestration for the four NEXUS agents."""

from __future__ import annotations

from pathlib import Path
from typing import Literal

from langgraph.graph import END, START, StateGraph

from .code_intelligence import investigate_code
from .diagnosis import diagnose
from .fix_validation import create_fix_and_validation
from .planner import plan_investigation, replan_investigation
from .state import AgentState


def _needs_replan(state: AgentState) -> Literal["replan", "fix"]:
    if not state.get("diagnosis", {}).get("sufficient", False) and not state.get("replan_count", 0):
        return "replan"
    return "fix"


def build_workflow(root: str | Path = "seed_repos"):
    graph = StateGraph(AgentState)
    graph.add_node("planner", plan_investigation)
    graph.add_node("code_intelligence", lambda state: investigate_code(state, root))
    graph.add_node("diagnosis_agent", diagnose)
    graph.add_node("replan", replan_investigation)
    graph.add_node("fix_validation", create_fix_and_validation)
    graph.add_edge(START, "planner")
    graph.add_edge("planner", "code_intelligence")
    graph.add_edge("code_intelligence", "diagnosis_agent")
    graph.add_conditional_edges(
        "diagnosis_agent",
        _needs_replan,
        {"replan": "replan", "fix": "fix_validation"},
    )
    graph.add_edge("replan", "code_intelligence")
    graph.add_edge("fix_validation", END)
    return graph.compile()


def run_workflow(bug_report: str, root: str | Path = "seed_repos") -> AgentState:
    return build_workflow(root).invoke({"bug_report": bug_report})
