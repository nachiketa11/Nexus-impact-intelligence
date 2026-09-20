from seed_repos.GalaxyPhone.bluetooth.BluetoothManager import BluetoothManager
from seed_repos.GalaxyPhone.sync.SyncService import SyncService


def test_bluetooth_manager_starts_phone_sync() -> None:
    sync_service = SyncService()
    manager = BluetoothManager(sync_service)

    assert manager.connect("GalaxyWatch-7") is True
    assert "GalaxyWatch-7" in sync_service.active_devices
