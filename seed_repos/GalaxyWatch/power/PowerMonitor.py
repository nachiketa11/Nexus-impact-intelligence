"""Battery model for the simulated GalaxyWatch."""


class PowerMonitor:
    def __init__(self, starting_percent: float = 100.0) -> None:
        self.battery_percent = starting_percent

    def record_reconnect_attempt(self) -> None:
        self.battery_percent = max(0.0, self.battery_percent - 0.5)

    def apply_connector_usage(self, reconnect_attempts: int) -> None:
        for _ in range(reconnect_attempts):
            self.record_reconnect_attempt()
