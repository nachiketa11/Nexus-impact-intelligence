# GalaxyPhone Architecture

`BluetoothManager` owns device connection state and delegates synchronization to
`sync/SyncService.py`. `ScanScheduler` invokes the manager for scheduled scans.

```text
ScanScheduler
     |
     v
BluetoothManager -----> SyncService
```

The phone sync service is an ecosystem boundary. GalaxyWatch and SmartThings
reference this behavior rather than duplicating synchronization state.
