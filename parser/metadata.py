"""Serialization helpers for parsed symbol metadata."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any


def write_metadata(metadata: dict[str, Any], path: str | Path) -> None:
    output = Path(path)
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(metadata, indent=2, sort_keys=True), encoding="utf-8")


def read_metadata(path: str | Path) -> dict[str, Any]:
    return json.loads(Path(path).read_text(encoding="utf-8"))
