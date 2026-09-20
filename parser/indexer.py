"""Index Python files from one or more simulated repositories."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from .chunker import chunk_functions
from .tree_sitter_parser import PythonParser


class RepositoryIndexer:
    def __init__(self, root: str | Path, parser: PythonParser | None = None) -> None:
        self.root = Path(root)
        self.parser = parser or PythonParser()

    def index(self) -> dict[str, Any]:
        files: list[dict[str, Any]] = []
        for repository_path in sorted(path for path in self.root.iterdir() if path.is_dir()):
            for file_path in sorted(repository_path.rglob("*.py")):
                source = file_path.read_text(encoding="utf-8")
                metadata = self.parser.parse(source)
                relative_file = file_path.relative_to(repository_path).as_posix()
                files.append(
                    {
                        "repository": repository_path.name,
                        "file": relative_file,
                        "path": str(file_path),
                        "symbols": metadata["symbols"],
                        "imports": metadata["imports"],
                        "calls": metadata["calls"],
                        "chunks": chunk_functions(
                            source, metadata, repository_path.name, relative_file
                        ),
                    }
                )
        return {"repositories": files}

    def write(self, output: str | Path) -> dict[str, Any]:
        metadata = self.index()
        destination = Path(output)
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(json.dumps(metadata, indent=2, sort_keys=True), encoding="utf-8")
        return metadata
