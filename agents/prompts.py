"""Prompt-like instructions kept explicit for inspectable agent reasoning."""

PLANNER_INSTRUCTION = (
    "Turn the bug report into an ordered investigation plan. Explain why each "
    "step can confirm or reject a hypothesis."
)
CODE_INTELLIGENCE_INSTRUCTION = (
    "Use the existing parser index and NetworkX dependency graph to retrieve "
    "relevant symbols, traverse their dependencies, and record evidence."
)
DIAGNOSIS_INSTRUCTION = (
    "Infer a root cause only from discovered symbols and evidence. State "
    "confidence and impacted repositories; never invent evidence."
)
FIX_VALIDATION_INSTRUCTION = (
    "Produce a review-ready patch and tests without writing to production "
    "files. Summarize validation honestly."
)
