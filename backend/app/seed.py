"""Seed the 16 plans from ``data/plans.json`` into Mongo.

Idempotent: ``replace_one(upsert=True)`` keyed by ``_id`` (the slug) means
re-running never duplicates. UTF-8 smart quotes (U+2019) are preserved.

Run standalone:  ``python -m app.seed``
"""
from __future__ import annotations

import asyncio
import json
import logging
from pathlib import Path

from motor.motor_asyncio import AsyncIOMotorDatabase

from .config import get_settings
from .db import close_client, get_database

logger = logging.getLogger("nirvana.seed")

DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "plans.json"


def load_plans() -> list[dict]:
    with open(DATA_FILE, encoding="utf-8") as f:
        return json.load(f)


async def seed_plans(db: AsyncIOMotorDatabase) -> int:
    """Upsert every plan by slug. Returns the number processed."""
    plans = load_plans()
    for plan in plans:
        doc = dict(plan)
        doc["_id"] = doc.pop("id")  # slug becomes the primary key
        await db.plans.replace_one({"_id": doc["_id"]}, doc, upsert=True)
    return len(plans)


async def _main() -> None:
    logging.basicConfig(level=logging.INFO)
    db = get_database()
    count = await seed_plans(db)
    logger.info("Seeded %s plans into database '%s'.", count, get_settings().mongo_db)
    close_client()


if __name__ == "__main__":
    asyncio.run(_main())
