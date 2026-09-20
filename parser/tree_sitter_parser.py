"""Parse Python source code into symbols, imports, calls, and source ranges."""

from __future__ import annotations

from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

from tree_sitter import Language, Parser
import tree_sitter_python


@dataclass(frozen=True)
class Symbol:
    name: str
    kind: str
    start_line: int
    end_line: int
    parent: str | None = None


@dataclass(frozen=True)
class Import:
    module: str
    name: str | None
    line: int


@dataclass(frozen=True)
class FunctionCall:
    name: str
    line: int
    caller: str


class PythonParser:
    """Extract Python relationships using the Python Tree-sitter grammar."""

    def __init__(self) -> None:
        self._parser = Parser(Language(tree_sitter_python.language()))

    def parse(self, source: str) -> dict[str, Any]:
        tree = self._parser.parse(source.encode("utf-8"))
        symbols: list[Symbol] = [
            Symbol("__module__", "module", 1, max(1, source.count("\n") + 1))
        ]
        imports: list[Import] = []
        calls: list[FunctionCall] = []

        def visit(node: Any, scope: str = "__module__") -> None:
            current_scope = scope
            if node.type in {"function_definition", "class_definition"}:
                name_node = node.child_by_field_name("name")
                if name_node is not None:
                    name = name_node.text.decode("utf-8")
                    kind = "function" if node.type == "function_definition" else "class"
                    symbols.append(
                        Symbol(
                            name,
                            kind,
                            node.start_point[0] + 1,
                            node.end_point[0] + 1,
                            scope if scope != "__module__" else None,
                        )
                    )
                    current_scope = name

            if node.type == "import_statement":
                for child in node.named_children:
                    text = child.text.decode("utf-8")
                    imports.append(Import(text.split(" as ")[0], None, node.start_point[0] + 1))
            elif node.type == "import_from_statement":
                import_parts = [
                    child.text.decode("utf-8")
                    for child in node.named_children
                    if child.type in {"dotted_name", "identifier"}
                ]
                if import_parts:
                    module = import_parts[0]
                    imported_names = import_parts[1:] or [None]
                    imports.extend(
                        Import(module, name, node.start_point[0] + 1)
                        for name in imported_names
                    )

            if node.type == "call":
                function_node = node.child_by_field_name("function")
                if function_node is not None:
                    calls.append(
                        FunctionCall(
                            function_node.text.decode("utf-8"),
                            node.start_point[0] + 1,
                            current_scope,
                        )
                    )
            for child in node.named_children:
                visit(child, current_scope)

        visit(tree.root_node)
        return {
            "symbols": [asdict(symbol) for symbol in symbols],
            "imports": [asdict(item) for item in imports],
            "calls": [asdict(item) for item in calls],
        }

    def parse_file(self, path: str | Path) -> dict[str, Any]:
        file_path = Path(path)
        result = self.parse(file_path.read_text(encoding="utf-8"))
        result["file"] = str(file_path)
        return result
