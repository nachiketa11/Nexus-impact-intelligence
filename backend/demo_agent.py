"""Run the complete seeded Bluetooth defect workflow."""

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from agents.workflow import run_workflow


if __name__ == "__main__":
    result = run_workflow(
        "GalaxyWatch Bluetooth connection times out after 5 milliseconds instead of 5 seconds."
    )
    print(json.dumps(result, indent=2))
