from graph.builder import build_graph
from graph.traversal import bfs
from parser.indexer import RepositoryIndexer


def test_graph_contains_cross_repository_edges_and_supports_bfs() -> None:
    graph = build_graph(RepositoryIndexer("seed_repos").index())
    cross_repo_edges = [
        (source, target)
        for source, target in graph.edges
        if source.split(":", 1)[0] != target.split(":", 1)[0]
    ]

    assert cross_repo_edges
    start = "GalaxyWatch:connector/WatchConnector.py:__module__"
    assert "GalaxyPhone:sync/SyncService.py:SyncService" in bfs(graph, start)
