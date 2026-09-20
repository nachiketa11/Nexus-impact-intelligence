# SmartThings Architecture

`DeviceBridge` is the shared ecosystem boundary. It evaluates GalaxyPhone sync
state and asks the GalaxyWatch connector whether the watch can reach the phone.
`RuleEngine` depends on that bridge and only publishes scenes when the combined
ecosystem state is ready.

```text
GalaxyPhone.sync.SyncService --> DeviceBridge <-- GalaxyWatch.connector.WatchConnector
                                      |
                                      v
                                RuleEngine
```
