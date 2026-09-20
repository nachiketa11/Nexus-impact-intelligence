# GalaxyWatch Architecture

`WatchConnector` consumes the GalaxyPhone `SyncService` contract to determine
whether the phone is synchronized. Failed connection attempts increment
`reconnect_attempts`; `PowerMonitor` converts those attempts into battery drain.

```text
GalaxyPhone.sync.SyncService
             |
             v
       WatchConnector -----> PowerMonitor
```

The dependency is intentional: a phone Bluetooth timeout produces watch
reconnects, which can be observed as increased power consumption.
