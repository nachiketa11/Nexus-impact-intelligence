"""Shared SmartThings bridge for GalaxyPhone and GalaxyWatch devices."""

from seed_repos.GalaxyPhone.sync.SyncService import SyncService
from seed_repos.GalaxyWatch.connector.WatchConnector import WatchConnector


class DeviceBridge:
    def __init__(
        self,
        phone_sync: SyncService | None = None,
        watch_connector: WatchConnector | None = None,
    ) -> None:
        self.phone_sync = phone_sync or SyncService()
        self.watch_connector = watch_connector or WatchConnector(self.phone_sync)

    def device_state(self, phone_device_id: str) -> dict[str, object]:
        phone_synced = phone_device_id in self.phone_sync.active_devices
        watch_connected = self.watch_connector.connect_to_phone(phone_device_id)
        return {
            "phone_synced": phone_synced,
            "watch_connected": watch_connected,
            "ecosystem_ready": phone_synced and watch_connected,
        }

    def publish_scene(self, phone_device_id: str, scene_name: str) -> bool:
        state = self.device_state(phone_device_id)
        return bool(state["ecosystem_ready"]) and bool(scene_name)
