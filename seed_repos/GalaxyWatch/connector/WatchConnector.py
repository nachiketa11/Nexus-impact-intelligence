"""GalaxyWatch connection behavior backed by GalaxyPhone synchronization."""

from seed_repos.GalaxyPhone.sync.SyncService import SyncService


class WatchConnector:
    def __init__(self, phone_sync: SyncService | None = None) -> None:
        # This import-level dependency is the phone sync contract used by Watch.
        self.phone_sync = phone_sync or SyncService()
        self.reconnect_attempts = 0

    def connect_to_phone(self, phone_device_id: str) -> bool:
        if self.phone_sync.wait_for_device(phone_device_id, 5.0):
            self.reconnect_attempts = 0
            return True
        self.reconnect_attempts += 1
        return False

    def reconnect(self, phone_device_id: str, attempts: int = 3) -> bool:
        for _ in range(attempts):
            if self.connect_to_phone(phone_device_id):
                return True
        return False
