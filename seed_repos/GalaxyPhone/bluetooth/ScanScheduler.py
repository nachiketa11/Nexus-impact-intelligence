"""Periodic Bluetooth scan scheduling."""

from seed_repos.GalaxyPhone.bluetooth.BluetoothManager import BluetoothManager


class ScanScheduler:
    def __init__(self, manager: BluetoothManager) -> None:
        self.manager = manager

    def scan_and_connect(self, device_id: str) -> bool:
        return self.manager.connect(device_id)
