from seed_repos.GalaxyWatch.connector.WatchConnector import WatchConnector
from seed_repos.GalaxyWatch.power.PowerMonitor import PowerMonitor
from seed_repos.GalaxyPhone.sync.SyncService import SyncService


def test_failed_phone_reconnects_affect_battery() -> None:
    connector = WatchConnector(SyncService())
    power = PowerMonitor(80.0)

    assert connector.reconnect("GalaxyPhone", attempts=2) is False
    power.apply_connector_usage(connector.reconnect_attempts)

    assert power.battery_percent == 79.0
