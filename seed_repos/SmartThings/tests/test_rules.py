from seed_repos.SmartThings.bridge.DeviceBridge import DeviceBridge
from seed_repos.SmartThings.automation.RuleEngine import RuleEngine
from seed_repos.GalaxyPhone.sync.SyncService import SyncService


def test_arrival_rule_requires_shared_ecosystem_state() -> None:
    sync_service = SyncService()
    engine = RuleEngine(DeviceBridge(phone_sync=sync_service))

    assert engine.run_arrival_rule("GalaxyPhone") is False

    sync_service.start_sync("GalaxyPhone", timeout_seconds=5.0)
    assert engine.run_arrival_rule("GalaxyPhone") is True
