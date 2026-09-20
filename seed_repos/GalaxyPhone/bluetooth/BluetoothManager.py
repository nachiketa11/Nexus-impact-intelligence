"""Bluetooth coordination for the simulated GalaxyPhone repository."""

from seed_repos.GalaxyPhone.sync.SyncService import SyncService


class BluetoothManager:
    """Discovers nearby devices and hands connections to the phone sync layer."""

    def __init__(self, sync_service: SyncService | None = None) -> None:
        self.sync_service = sync_service or SyncService()
        self.connected_device: str | None = None

    def connect(self, device_id: str, timeout_seconds: float = 5.0) -> bool:
        """Connect a device and start synchronization."""
        self.connected_device = device_id
        return self.sync_service.start_sync(device_id, timeout_seconds)

    def disconnect(self) -> None:
        if self.connected_device:
            self.sync_service.stop_sync(self.connected_device)
            self.connected_device = None

    def wait_for_connection(self, device_id: str) -> bool:
        """Wait for a connection event from the Bluetooth adapter."""
        # Bug: the adapter event is waited for using milliseconds as seconds,
        # so a normal five-second timeout expires after only five milliseconds.
        adapter_timeout = 5
        return self.sync_service.wait_for_device(device_id, adapter_timeout / 1000)
