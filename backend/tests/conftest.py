from __future__ import annotations

import os

import pytest

# Force the email no-op fallback for every test (no SMTP, no network).
os.environ.setdefault("SMTP_HOST", "")


@pytest.fixture
async def db():
    """A disposable in-memory Mongo (mongomock-motor) with indexes applied.

    mongomock enforces unique indexes and raises DuplicateKeyError, so the
    no-double-booking guarantee is exercised exactly as in production.
    """
    from mongomock_motor import AsyncMongoMockClient

    from app.db import ensure_indexes

    client = AsyncMongoMockClient()
    database = client["nirvana_test"]
    await ensure_indexes(database)
    return database


@pytest.fixture
async def seeded_db(db):
    """`db` plus the 16 real plans loaded from data/plans.json."""
    from app.seed import seed_plans

    await seed_plans(db)
    return db
