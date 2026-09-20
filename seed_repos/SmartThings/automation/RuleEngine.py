"""Automation rules evaluated against shared DeviceBridge state."""

from seed_repos.SmartThings.bridge.DeviceBridge import DeviceBridge


class RuleEngine:
    def __init__(self, device_bridge: DeviceBridge | None = None) -> None:
        self.device_bridge = device_bridge or DeviceBridge()

    def run_arrival_rule(self, phone_device_id: str) -> bool:
        state = self.device_bridge.device_state(phone_device_id)
        if state["ecosystem_ready"]:
            return self.device_bridge.publish_scene(phone_device_id, "arrival")
        return False
