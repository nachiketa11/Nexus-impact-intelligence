"""Create function-level source chunks from parser metadata."""

from __future__ import annotations

from pathlib import Path
from typing import Any


def chunk_functions(
    source: str, metadata: dict[str, Any], repository: str, file: str
) -> list[dict[str, Any]]:
    """Return one chunk for each function or method in a parsed file."""
    lines = source.splitlines()
    chunks = []
    for symbol in metadata["symbols"]:
        if symbol["kind"] != "function":
            continue
        start = symbol["start_line"]
        end = symbol["end_line"]
        chunks.append(
            {
                "repository": repository,
                "file": file,
                "function": symbol["name"],
                "start_line": start,
                "end_line": end,
                "content": "\n".join(lines[start - 1 : end]),
            }
        )
    return chunks


def chunk_file(path: str | Path, repository: str, parser: Any) -> list[dict[str, Any]]:
    file_path = Path(path)
    source = file_path.read_text(encoding="utf-8")
    return chunk_functions(source, parser.parse(source), repository, str(file_path))
