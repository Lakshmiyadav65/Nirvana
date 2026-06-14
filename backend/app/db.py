"""MongoDB (Motor) connection, index management, and the FastAPI dependency.

``tz_aware=True`` ensures datetimes read back from Mongo are aware UTC, so
``slot_start`` round-trips as a canonical instant.
"""
from __future__ import annotations

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from .config import get_settings

_client: AsyncIOMotorClient | None = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        s = get_settings()
        _client = AsyncIOMotorClient(
            s.mongo_uri,
            tz_aware=True,
            serverSelectionTimeoutMS=5000,
        )
    return _client


def get_database() -> AsyncIOMotorDatabase:
    return get_client()[get_settings().mongo_db]


async def get_db() -> AsyncIOMotorDatabase:
    """FastAPI dependency. Overridden in tests with a mongomock database."""
    return get_database()


async def ensure_indexes(db: AsyncIOMotorDatabase) -> None:
    """Create indexes idempotently. The unique compound index is the authority
    that makes double-booking impossible; it MUST exist before serving traffic."""
    await db.bookings.create_index(
        [("plan_id", 1), ("slot_start", 1)], unique=True, name="uq_plan_slot"
    )
    await db.bookings.create_index([("slot_start", 1)], name="ix_slot_start")
    await db.bookings.create_index([("plan_id", 1)], name="ix_plan_id")


async def ping(db: AsyncIOMotorDatabase) -> bool:
    await db.command("ping")
    return True


def close_client() -> None:
    global _client
    if _client is not None:
        _client.close()
        _client = None
