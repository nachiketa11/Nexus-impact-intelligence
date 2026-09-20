"""Phone synchronization service shared with ecosystem integrations."""


class SyncService:
    def __init__(self) -> None:
        self.active_devices: set[str] = set()

    def start_sync(self, device_id: str, timeout_seconds: float) -> bool:
        if timeout_seconds <= 0:
            return False
        self.active_devices.add(device_id)
        return True

    def stop_sync(self, device_id: str) -> None:
        self.active_devices.discard(device_id)

    def wait_for_device(self, device_id: str, timeout_seconds: float) -> bool:
        return device_id in self.active_devices and timeout_seconds > 0
