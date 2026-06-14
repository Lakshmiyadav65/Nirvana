"""Plan read operations. Plans are seeded from ``data/plans.json`` and served
in the exact frontend ``Project`` (camelCase) shape; ``_id`` is the slug."""
from __future__ import annotations

from motor.motor_asyncio import AsyncIOMotorDatabase

from ..errors import PlanNotFound


def serialize_plan(doc: dict) -> dict:
    """Map the Mongo document to the wire shape (``_id`` -> ``id``)."""
    out = dict(doc)
    out["id"] = out.pop("_id")
    return out


async def list_plans(db: AsyncIOMotorDatabase) -> list[dict]:
    docs = await db.plans.find({}).to_list(length=1000)
    return [serialize_plan(d) for d in docs]


async def get_plan(db: AsyncIOMotorDatabase, plan_id: str) -> dict:
    doc = await db.plans.find_one({"_id": plan_id})
    if not doc:
        raise PlanNotFound(f"No plan with id '{plan_id}'.")
    return serialize_plan(doc)
