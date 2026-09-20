from parser.indexer import RepositoryIndexer


def test_index_discovers_symbols_imports_and_chunks() -> None:
    index = RepositoryIndexer("seed_repos").index()
    phone = next(item for item in index["repositories"] if item["file"].endswith("BluetoothManager.py"))

    assert any(symbol["name"] == "BluetoothManager" for symbol in phone["symbols"])
    assert any(item["name"] == "SyncService" for item in phone["imports"])
    assert any(chunk["function"] == "connect" and chunk["start_line"] > 0 for chunk in phone["chunks"])
