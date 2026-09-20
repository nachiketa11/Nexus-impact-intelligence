"""Backend configuration."""

from __future__ import annotations

from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
SEED_REPOSITORIES = PROJECT_ROOT / "seed_repos"
