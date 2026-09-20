# Simulated Commit History

## 2026-08-19 - `a31f7c2` - Add phone sync service

Introduced the synchronization service used by Bluetooth connections.

## 2026-08-27 - `c8029be` - Schedule Bluetooth scans

Added scheduled device discovery and connection handling.

## 2026-09-03 - `f19d441` - Integrate sync with Bluetooth manager

Connected Bluetooth lifecycle events to the phone synchronization layer.

## 2026-09-11 - `d65e8aa` - Tune adapter wait behavior

Adjusted adapter waiting logic. A timeout-unit regression remains under
investigation in crash logs.
